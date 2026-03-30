import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CheckoutCancel() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const orderCode = searchParams.get('orderCode');
  const reason = searchParams.get('reason') || 'user_cancelled';

  useEffect(() => {
    const handleCancel = async () => {
      try {
        if (orderCode) {
          // Hủy payment link trên PayOS
          await cancelPaymentLink(orderCode);
        }
      } catch (error) {
        console.error('Error cancelling payment:', error);
      }
    };

    handleCancel();
  }, [orderCode]);

  return (
    <div className="container-custom py-20">
      <div className="max-w-md mx-auto text-center bg-white rounded-lg shadow-lg p-8">
        {/* Cancel Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-5xl">✕</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-red-600 mb-2">
          {t('paymentCancelled') || 'Thanh toán bị hủy'}
        </h1>

        <p className="text-gray-600 mb-4">
          {reason === 'expired'
            ? t('paymentExpired') || 'Link thanh toán đã hết hạn'
            : t('paymentCancelledDesc') || 'Bạn đã hủy thanh toán này'}
        </p>

        {orderCode && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">{t('orderCode') || 'Mã đơn hàng'}:</p>
            <p className="font-mono text-sm">{orderCode}</p>
          </div>
        )}

        <p className="text-sm text-gray-500 mb-8">
          {t('tryAgain') || 'Vui lòng thử lại hoặc liên hệ với chúng tôi nếu bạn cần hỗ trợ'}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/checkout')}
            className="flex-1 btn-primary"
          >
            {t('tryAgain') || 'Thử lại'}
          </button>
          <button
            onClick={() => navigate('/menu')}
            className="flex-1 px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition"
          >
            {t('continueShopping') || 'Tiếp tục mua'}
          </button>
        </div>

        {/* Support */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">{t('needHelp') || 'Cần hỗ trợ?'}:</p>
          <p className="text-sm font-semibold text-gray-700">support@eatclean.vn</p>
        </div>
      </div>
    </div>
  );
}
