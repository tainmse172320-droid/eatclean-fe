import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { FaCopy, FaCheckCircle, FaQrcode, FaUniversity, FaWallet } from 'react-icons/fa';
import { createPaymentLink } from '../utils/payosService';

const MOCK_MODE = true;

// Bank account info
const BANK_INFO = {
  bankName: 'Vietcombank',
  bankBranch: 'Chi nhánh TP.HCM',
  accountNumber: '1234567890',
  accountName: 'CONG TY TNHH EAT CLEAN',
  swiftCode: 'BFTVVNVX'
};

const Checkout = () => {
  const { t, i18n } = useTranslation();
  const isVi = i18n.language === 'vi';
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [qrCode, setQrCode] = useState(null);
  const [copied, setCopied] = useState(false);
  const [payosQrCode, setPayosQrCode] = useState(null);
  const [payosCheckoutUrl, setPayosCheckoutUrl] = useState(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: user?.address?.street || '',
    city: user?.address?.city || '',
    district: user?.address?.district || '',
    ward: user?.address?.ward || '',
    note: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Copy to clipboard function
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate order number for payment content
  const generateOrderNumber = () => {
    return 'EC' + Date.now().toString().slice(-8);
  };

  // Generate VietQR URL
  const generateQRCode = (amount, orderNumber) => {
    // VietQR format: https://img.vietqr.io/image/{BANK_ID}-{ACCOUNT_NUMBER}-{TEMPLATE}.png?amount={AMOUNT}&addInfo={INFO}&accountName={NAME}
    const bankId = 'VCB'; // Vietcombank
    const accountNumber = BANK_INFO.accountNumber;
    const template = 'compact2'; // QR template style
    const info = encodeURIComponent(`DH ${orderNumber}`);
    const accountName = encodeURIComponent(BANK_INFO.accountName);
    
    return `https://img.vietqr.io/image/${bankId}-${accountNumber}-${template}.png?amount=${amount}&addInfo=${info}&accountName=${accountName}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address || !formData.city) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);

      const shippingInfo = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        district: formData.district,
        ward: formData.ward,
        note: formData.note
      };

      // Handle PayOS payment
      if (paymentMethod === 'payos') {
        // orderCode phải là số nguyên dương, tối đa 9 chữ số
        const orderCodeInt = Math.floor(Math.random() * 900000000) + 100000000;

        try {
          toast.info('Đang kết nối PayOS...');
          const paymentLink = await createPaymentLink({
            orderCode: orderCodeInt,
            amount: cart.totalPrice,
            buyerName: formData.name,
            buyerEmail: formData.email,
            buyerPhone: formData.phone,
            buyerAddress: `${formData.address}, ${formData.district}, ${formData.city}`,
          });

          // Lưu đơn hàng vào localStorage
          const newOrder = {
            _id: 'order' + Date.now(),
            orderCode: orderCodeInt,
            orderNumber: 'EC' + orderCodeInt,
            user: user ? { _id: user._id, name: user.name, email: user.email } : { name: formData.name },
            items: cart.items.map(item => ({
              meal: item.meal,
              name: item.meal.nameVi || item.meal.name,
              price: item.meal.price,
              quantity: item.quantity,
              calories: item.meal.calories
            })),
            totalPrice: cart.totalPrice,
            totalCalories: cart.totalCalories || 0,
            shippingInfo,
            paymentMethod: 'payos',
            paymentStatus: 'pending',
            orderStatus: 'confirmed',
            payosCheckoutUrl: paymentLink.data?.checkoutUrl || null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          const existingOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
          existingOrders.push(newOrder);
          localStorage.setItem('mockOrders', JSON.stringify(existingOrders));

          clearCart();
          toast.success('Đơn hàng tạo thành công!');

          const checkoutUrl = paymentLink.data?.checkoutUrl;
          const qrCode = paymentLink.data?.qrCode;

          // Log để debug
          console.log('PayOS response data:', paymentLink.data);

          if (!checkoutUrl && !qrCode) {
            throw new Error('PayOS không trả về link thanh toán. Kiểm tra lại API Keys.');
          }

          // Luôn hiển thị màn hình QR + nút mở PayOS
          // checkoutUrl là link trang thanh toán PayOS thật
          // qrCode là chuỗi dữ liệu để tạo ảnh QR
          setPayosCheckoutUrl(checkoutUrl || null);
          setPayosQrCode(qrCode || checkoutUrl); // dùng checkoutUrl làm QR data nếu không có qrCode riêng
          setLoading(false);
          return;
        } catch (error) {
          console.error('PayOS Error:', error);
          toast.error(error.message || 'Không thể tạo link thanh toán PayOS');
          setLoading(false);
        }
        return;
      }

      if (MOCK_MODE) {
        // Mock mode: create order in localStorage
        const mockOrder = {
          _id: 'order' + Date.now(),
          orderNumber: 'EC' + Date.now(),
          user: {
            _id: user._id,
            name: user.name,
            email: user.email
          },
          items: cart.items.map(item => ({
            meal: item.meal,
            name: item.meal.name,
            price: item.meal.price,
            quantity: item.quantity,
            calories: item.meal.calories
          })),
          totalPrice: cart.totalPrice,
          totalCalories: cart.totalCalories,
          shippingInfo,
          paymentMethod,
          paymentStatus: 'pending',
          orderStatus: 'confirmed',
          createdAt: new Date(),
          updatedAt: new Date()
        };

        // Save to localStorage
        const existingOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
        existingOrders.push(mockOrder);
        localStorage.setItem('mockOrders', JSON.stringify(existingOrders));

        // Clear cart
        await clearCart();

        toast.success('Order placed successfully! (Mock Mode)');
        setTimeout(() => {
          navigate(`/orders/${mockOrder._id}`);
        }, 1500);
      } else {
        const { data } = await api.post('/orders', {
          shippingInfo,
          paymentMethod
        });

        if (data.data.qrCode) {
          setQrCode(data.data.qrCode);
        }

        toast.success('Order placed successfully!');
        setTimeout(() => {
          navigate(`/orders/${data.data._id}`);
        }, 2000);
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to place order';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (payosQrCode) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container-custom max-w-2xl mx-auto text-center">
          <div className="card p-8 font-sans border-2 border-indigo-200 bg-white">
            <FaQrcode className="text-6xl text-indigo-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2 text-indigo-900">
              {isVi ? 'Vui Lòng Thanh Toán' : 'Please Complete Payment'}
            </h1>
            <p className="text-gray-600 mb-6">
              {isVi
                ? 'Đơn hàng đã được ghi nhận. Quét mã QR hoặc bấm nút bên dưới để thanh toán qua PayOS.'
                : 'Order recorded. Scan QR or click button below to pay via PayOS.'}
            </p>

            {/* Nút mở PayOS - ưu tiên hiện trước */}
            {payosCheckoutUrl && (
              <div className="mb-6">
                <button
                  onClick={() => window.open(payosCheckoutUrl, '_blank')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-xl text-lg w-full transition flex items-center justify-center gap-3"
                >
                  💳 {isVi ? 'Thanh toán qua PayOS' : 'Pay via PayOS'}
                </button>
                <p className="text-xs text-gray-400 mt-2">
                  {isVi ? 'Mở trang thanh toán PayOS trong tab mới' : 'Opens PayOS payment page in new tab'}
                </p>
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <hr className="flex-1 border-gray-200" />
              <span className="text-sm text-gray-400">{isVi ? 'hoặc quét mã QR' : 'or scan QR code'}</span>
              <hr className="flex-1 border-gray-200" />
            </div>

            {/* QR Code */}
            <div className="bg-white p-4 rounded-xl border-2 border-gray-100 shadow-sm inline-block mb-6">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(payosQrCode)}`}
                alt="PayOS QR Code"
                className="w-56 h-56 mx-auto"
              />
            </div>

            <div className="space-y-3 max-w-md mx-auto">
              <button
                onClick={() => navigate('/orders')}
                className="btn-outline w-full py-3 text-sm"
              >
                {isVi ? '✅ Đã chuyển khoản xong → Xem đơn hàng' : '✅ Paid → View Orders'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container-custom py-12 text-center">
        <p className="text-gray-600">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-bold mb-8">{t('checkout')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Info */}
            <div className="card p-6">
              <h2 className="font-bold text-xl mb-6">{t('shippingInfo')}</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">{t('fullName')} *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">{t('phone')} *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">{t('email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">{t('address')} *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">{t('city')} *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">{t('district')}</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">{t('ward')}</label>
                    <input
                      type="text"
                      name="ward"
                      value={formData.ward}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">{t('note')}</label>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    rows="3"
                    className="input-field resize-none"
                  ></textarea>
                </div>

                {/* Payment Method */}
                <div className="mt-8 pt-8 border-t">
                  <h3 className="font-bold text-lg mb-4">{t('paymentMethod')}</h3>

                  <div className="space-y-3">
                    {[
                      { value: 'cod', label: t('cod'), icon: '💵' },
                      { value: 'payos', label: t('qrCode'), icon: '📱' }
                    ].map((method) => (
                      <label key={method.value} className="flex items-center cursor-pointer p-4 border-2 rounded-lg hover:bg-gray-50 transition">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.value}
                          checked={paymentMethod === method.value}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-3 w-5 h-5"
                        />
                        <span className="text-2xl mr-3">{method.icon}</span>
                        <span className="font-semibold">{method.label}</span>
                      </label>
                    ))}
                  </div>

                  {/* Bank Transfer block removed */}

                  {/* Old QR code removed, replaced by PayOS */}

                  {/* COD Information */}
                  {paymentMethod === 'cod' && (
                    <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        <FaCheckCircle className="inline mr-2 text-green-600" />
                        You will pay <strong className="text-lg">{cart.totalPrice.toLocaleString()}đ</strong> in cash when receiving your order
                      </p>
                    </div>
                  )}

                  {/* PayOS Payment */}
                  {paymentMethod === 'payos' && (
                    <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-4">
                        <FaQrcode className="text-purple-600 text-xl" />
                        <h4 className="font-bold text-lg text-purple-900">
                          {t('scanQRCode') || 'QR Code Payment'}
                        </h4>
                      </div>

                      <div className="bg-white p-4 rounded-lg mb-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Payment Amount:</span>
                          <span className="font-bold text-2xl text-purple-600">{cart.totalPrice.toLocaleString()}đ</span>
                        </div>
                        <hr />
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center text-green-700">
                            <FaCheckCircle className="mr-2" /> Fast & Secure
                          </p>
                          <p className="flex items-center text-green-700">
                            <FaCheckCircle className="mr-2" /> Multiple payment methods
                          </p>
                          <p className="flex items-center text-green-700">
                            <FaCheckCircle className="mr-2" /> Instant confirmation
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-purple-100 rounded-lg border border-purple-300">
                        <p className="text-sm text-purple-900">
                          {isVi 
                            ? 'Bấm "Đặt Hàng" để tạo mã QR thanh toán an toàn.'
                            : 'Click "Place Order" to generate your secure payment QR code.'}
                        </p>
                        <ul className="text-sm text-purple-900 mt-2 space-y-1 ml-4 list-disc">
                          <li>{isVi ? 'Hỗ trợ quét ứng dụng ngân hàng' : 'Supports all banking apps'}</li>
                          <li>{isVi ? 'Nhận thanh toán 24/7' : '24/7 instant confirmation'}</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full mt-6 py-4 text-lg"
                >
                  {loading ? 'Processing...' : t('placeOrder')}
                </button>
              </form>
            </div>
          </div>

          {/* Summary */}
          <div className="card p-6 h-fit sticky top-24">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {cart.items.map((item) => (
                <div key={item.meal._id} className="flex justify-between text-sm">
                  <span>{isVi ? item.meal.nameVi : item.meal.name} x {item.quantity}</span>
                  <span>{(item.meal.price * item.quantity).toLocaleString('vi-VN')}đ</span>
                </div>
              ))}
            </div>

            <hr className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>{cart.totalPrice.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Total Cal:</span>
                <span>{cart.totalCalories}</span>
              </div>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-primary-600">{cart.totalPrice.toLocaleString('vi-VN')}đ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
