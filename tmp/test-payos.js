import axios from 'axios';
import crypto from 'crypto';

const CLIENT_ID = 'd5fe5160-6ca0-4ffb-b62d-45f48d2e377a';
const API_KEY = 'ca29bcd7-8cbe-4361-b688-c47bd107e913';

async function testKey(checksumKey) {
  const payload = {
    orderCode: Math.floor(Date.now() / 1000),
    amount: 50000,
    description: 'Test API',
    cancelUrl: 'http://localhost:5173/cancel',
    returnUrl: 'http://localhost:5173/success',
  };

  const signatureData = {
    amount: payload.amount,
    cancelUrl: payload.cancelUrl,
    description: payload.description,
    orderCode: payload.orderCode,
    returnUrl: payload.returnUrl
  };

  const sortedKeys = Object.keys(signatureData).sort();
  const dataString = sortedKeys.map(key => `${key}=${signatureData[key]}`).join('&');
  const signature = crypto.createHmac('sha256', checksumKey).update(dataString).digest('hex');

  try {
    const response = await axios.post(
      'https://api-merchant.payos.vn/v2/payment-requests',
      {
        ...payload,
        signature
      },
      {
        headers: {
          'x-client-id': CLIENT_ID,
          'x-api-key': API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(`Key ${checksumKey.slice(-4)} -> Code: ${response.data.code}, Desc: ${response.data.desc}`);
  } catch (error) {
    console.log(`Key ${checksumKey.slice(-4)} -> Catch: ${error.response?.data?.desc || error.message}`);
  }
}

async function run() {
  await testKey('220e01854054e3989602cea4a1b36f498529611c');
  await testKey('220e01854054e3989602cea4a1b36f4985296110');
  await testKey('220e01854054e3989602cea4a1b36f498529611a');
  await testKey('220e01854054e3989602cea4a1b36f498529611e');
}
run();
