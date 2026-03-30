export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).json({ code: '99', desc: 'Method Not Allowed' });

  const { orderCode } = req.query;
  if (!orderCode) return res.status(400).json({ code: '99', desc: 'Missing orderCode' });

  const CLIENT_ID = process.env.PAYOS_CLIENT_ID;
  const API_KEY   = process.env.PAYOS_API_KEY;

  if (!CLIENT_ID || !API_KEY) {
    return res.status(500).json({ code: '99', desc: 'Thiếu PayOS credentials' });
  }

  try {
    const payosRes = await fetch(`https://api-merchant.payos.vn/v2/payment-requests/${orderCode}`, {
      headers: { 'x-client-id': CLIENT_ID, 'x-api-key': API_KEY },
    });
    const result = await payosRes.json();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ code: '99', desc: err.message });
  }
}
