const PayOS = require('@payos/node');

const CLIENT_ID = 'd5fe5160-6ca0-4ffb-b62d-45f48d2e377a';
const API_KEY = 'ca29bcd7-8cbe-4361-b688-c47bd107e913';
const CHECKSUM_KEY = '220e01854054e3989602cea4a1b36f498529611c';

const payos = new PayOS(CLIENT_ID, API_KEY, CHECKSUM_KEY);

async function run() {
  const payload = {
    orderCode: Math.floor(Date.now() / 1000),
    amount: 50000,
    description: 'Test API',
    cancelUrl: 'http://localhost:5173/cancel',
    returnUrl: 'http://localhost:5173/success',
  };

  try {
    const paymentLinkRes = await payos.createPaymentLink(payload);
    console.log('SDK SUCCESS:', paymentLinkRes);
  } catch (error) {
    console.error('SDK ERROR:', error.message || error);
  }
}

run();
