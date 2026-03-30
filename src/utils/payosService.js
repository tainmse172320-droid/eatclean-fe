import axios from 'axios';

// Tạo payment link — luôn gọi qua Vercel Serverless Function /api/create-payment-link
// để tránh lộ API keys và tránh lỗi CORS
export const createPaymentLink = async (orderData) => {
  try {
    const response = await axios.post('/api/create-payment-link', { orderData });
    const result = response.data;

    if (result.code !== '00') {
      throw new Error(result.desc || 'PayOS trả về lỗi');
    }
    return result;
  } catch (error) {
    const msg = error.response?.data?.desc || error.message || 'Tạo link thanh toán thất bại';
    console.error('PayOS Error:', msg);
    throw new Error(msg);
  }
};

// Lấy trạng thái đơn hàng từ PayOS
export const getPaymentStatus = async (orderCode) => {
  try {
    const response = await axios.get(`/api/payment-status?orderCode=${orderCode}`);
    return response.data;
  } catch (error) {
    console.error('Get payment status error:', error);
    throw error;
  }
};

export default { createPaymentLink, getPaymentStatus };
