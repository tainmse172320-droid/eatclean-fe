import crypto from 'crypto';

export default async function handler(req, res) {
  // CORS headers cho local dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ code: '99', desc: 'Method Not Allowed' });

  const { orderData } = req.body;
  if (!orderData) return res.status(400).json({ code: '99', desc: 'Missing orderData' });

  // Đọc keys từ biến môi trường Vercel
  const CLIENT_ID  = process.env.PAYOS_CLIENT_ID;
  const API_KEY    = process.env.PAYOS_API_KEY;
  const CHECKSUM_KEY = process.env.PAYOS_CHECKSUM_KEY;

  if (!CLIENT_ID || !API_KEY || !CHECKSUM_KEY) {
    console.error('❌ Thiếu PayOS credentials trong Environment Variables');
    return res.status(500).json({
      code: '99',
      desc: 'Server chưa cấu hình PayOS. Vui lòng thêm PAYOS_CLIENT_ID, PAYOS_API_KEY, PAYOS_CHECKSUM_KEY vào Vercel Environment Variables.'
    });
  }

  try {
    const origin = req.headers.origin || req.headers.host || 'https://your-app.vercel.app';
    const baseUrl = origin.startsWith('http') ? origin : `https://${origin}`;

    const orderCode = Number(String(orderData.orderCode).replace(/\D/g, '').slice(-9)) || Math.floor(Math.random() * 900000000) + 100000000;

    const payload = {
      orderCode,
      amount: Math.round(orderData.amount),
      description: `EC${orderCode}`.substring(0, 25), // PayOS giới hạn 25 ký tự
      buyerName: orderData.buyerName || 'Khach Hang',
      buyerEmail: orderData.buyerEmail || '',
      buyerPhone: orderData.buyerPhone || '',
      buyerAddress: orderData.buyerAddress || '',
      returnUrl: `${baseUrl}/checkout/success`,
      cancelUrl:  `${baseUrl}/checkout/cancel`,
      expiredAt:  Math.floor(Date.now() / 1000) + 900, // hết hạn sau 15 phút
    };

    // Tạo chữ ký theo đúng thứ tự alphabet của PayOS
    const signFields = {
      amount:      payload.amount,
      cancelUrl:   payload.cancelUrl,
      description: payload.description,
      orderCode:   payload.orderCode,
      returnUrl:   payload.returnUrl,
    };
    const dataString = Object.keys(signFields)
      .sort()
      .map(k => `${k}=${signFields[k]}`)
      .join('&');

    const signature = crypto.createHmac('sha256', CHECKSUM_KEY).update(dataString).digest('hex');

    // Gọi PayOS API
    const payosRes = await fetch('https://api-merchant.payos.vn/v2/payment-requests', {
      method: 'POST',
      headers: {
        'x-client-id': CLIENT_ID,
        'x-api-key':   API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...payload, signature }),
    });

    const result = await payosRes.json();

    if (result.code !== '00') {
      console.error('PayOS API lỗi:', result);
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error('Lỗi server PayOS:', err);
    return res.status(500).json({ code: '99', desc: err.message || 'Internal Server Error' });
  }
}
