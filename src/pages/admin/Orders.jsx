import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const statusLabels = {
  confirmed: 'Đã xác nhận',
  preparing: 'Đang chuẩn bị',
  delivering: 'Đang giao',
  completed: 'Hoàn thành',
  cancelled: 'Đã huỷ'
};

const paymentLabels = {
  pending: 'Chờ thanh toán',
  paid: 'Đã thanh toán',
  failed: 'Thất bại'
};

const statusColors = {
  confirmed: 'bg-blue-100 text-blue-700',
  preparing: 'bg-yellow-100 text-yellow-700',
  delivering: 'bg-orange-100 text-orange-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700'
};

const paymentColors = {
  pending: 'bg-gray-100 text-gray-700',
  paid: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700'
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  // Đọc đơn hàng THẬT từ localStorage (do user đặt qua Checkout)
  const fetchOrders = () => {
    setLoading(true);
    try {
      const stored = JSON.parse(localStorage.getItem('mockOrders') || '[]');
      // Sắp xếp mới nhất lên đầu
      const sorted = [...stored].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const filtered = filter ? sorted.filter(o => o.orderStatus === filter) : sorted;
      setOrders(filtered);
    } catch (e) {
      console.error('Error loading orders:', e);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = (orderId, newStatus) => {
    try {
      const stored = JSON.parse(localStorage.getItem('mockOrders') || '[]');
      const updated = stored.map(o =>
        o._id === orderId ? { ...o, orderStatus: newStatus, updatedAt: new Date().toISOString() } : o
      );
      localStorage.setItem('mockOrders', JSON.stringify(updated));
      toast.success('Cập nhật trạng thái đơn hàng thành công!');
      fetchOrders();
    } catch (e) {
      toast.error('Lỗi khi cập nhật đơn hàng');
    }
  };

  const updatePayment = (orderId, newStatus) => {
    try {
      const stored = JSON.parse(localStorage.getItem('mockOrders') || '[]');
      const updated = stored.map(o =>
        o._id === orderId ? { ...o, paymentStatus: newStatus, updatedAt: new Date().toISOString() } : o
      );
      localStorage.setItem('mockOrders', JSON.stringify(updated));
      toast.success('Cập nhật thanh toán thành công!');
      fetchOrders();
    } catch (e) {
      toast.error('Lỗi khi cập nhật thanh toán');
    }
  };

  const filterButtons = [
    { value: '', label: 'Tất cả' },
    { value: 'confirmed', label: 'Đã xác nhận' },
    { value: 'preparing', label: 'Đang chuẩn bị' },
    { value: 'delivering', label: 'Đang giao' },
    { value: 'completed', label: 'Hoàn thành' },
    { value: 'cancelled', label: 'Đã huỷ' },
  ];

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quản lý Đơn hàng</h2>
        <span className="text-sm text-gray-500">{orders.length} đơn hàng</span>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {filterButtons.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              filter === value
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-12 text-center">
          <p className="text-4xl mb-4">📦</p>
          <p className="text-gray-500 text-lg font-semibold">Chưa có đơn hàng nào</p>
          <p className="text-gray-400 text-sm mt-2">Đơn hàng từ khách hàng sẽ xuất hiện ở đây sau khi họ đặt hàng</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-600">Mã đơn</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Khách hàng</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Tổng tiền</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Trạng thái</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Thanh toán</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Ngày đặt</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <>
                    <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-bold text-primary-600">{order.orderNumber}</td>
                      <td className="px-4 py-3">
                        <p className="font-semibold">{order.shippingInfo?.name || order.user?.name || 'Khách'}</p>
                        <p className="text-xs text-gray-400">{order.shippingInfo?.phone || ''}</p>
                      </td>
                      <td className="px-4 py-3 font-bold text-green-600">
                        {(order.totalPrice || 0).toLocaleString('vi-VN')}đ
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={order.orderStatus}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          className={`rounded-lg px-2 py-1 text-xs font-semibold border-0 cursor-pointer ${statusColors[order.orderStatus] || 'bg-gray-100'}`}
                        >
                          {Object.entries(statusLabels).map(([val, lbl]) => (
                            <option key={val} value={val}>{lbl}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={order.paymentStatus}
                          onChange={(e) => updatePayment(order._id, e.target.value)}
                          className={`rounded-lg px-2 py-1 text-xs font-semibold border-0 cursor-pointer ${paymentColors[order.paymentStatus] || 'bg-gray-100'}`}
                        >
                          {Object.entries(paymentLabels).map(([val, lbl]) => (
                            <option key={val} value={val}>{lbl}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN', {
                          day: '2-digit', month: '2-digit', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        }) : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                          className="text-primary-600 hover:underline text-xs font-semibold"
                        >
                          {expandedOrder === order._id ? 'Ẩn ▲' : 'Xem ▼'}
                        </button>
                      </td>
                    </tr>
                    {expandedOrder === order._id && (
                      <tr key={order._id + '-detail'} className="bg-primary-50">
                        <td colSpan={7} className="px-6 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Thông tin giao hàng */}
                            <div>
                              <p className="font-bold text-sm mb-2 text-gray-700">📍 Thông tin giao hàng</p>
                              <div className="text-xs text-gray-600 space-y-1">
                                <p><span className="font-semibold">Người nhận:</span> {order.shippingInfo?.name}</p>
                                <p><span className="font-semibold">SĐT:</span> {order.shippingInfo?.phone}</p>
                                <p><span className="font-semibold">Email:</span> {order.shippingInfo?.email}</p>
                                <p><span className="font-semibold">Địa chỉ:</span> {order.shippingInfo?.address}, {order.shippingInfo?.ward}, {order.shippingInfo?.district}, {order.shippingInfo?.city}</p>
                                {order.shippingInfo?.note && <p><span className="font-semibold">Ghi chú:</span> {order.shippingInfo.note}</p>}
                              </div>
                            </div>
                            {/* Các món đã đặt */}
                            <div>
                              <p className="font-bold text-sm mb-2 text-gray-700">🍱 Món đã đặt ({order.items?.length || 0} món)</p>
                              <div className="space-y-2">
                                {(order.items || []).map((item, idx) => (
                                  <div key={idx} className="flex items-center gap-3 bg-white rounded-lg p-2">
                                    {item.meal?.image && (
                                      <img src={item.meal.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                                    )}
                                    <div className="flex-1">
                                      <p className="text-xs font-semibold">{item.name || item.meal?.nameVi || item.meal?.name}</p>
                                      <p className="text-xs text-gray-500">x{item.quantity} × {(item.price || 0).toLocaleString('vi-VN')}đ</p>
                                    </div>
                                    <p className="text-xs font-bold text-green-600">
                                      {((item.price || 0) * item.quantity).toLocaleString('vi-VN')}đ
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="mt-3 pt-2 border-t flex justify-between">
                                <span className="text-xs font-semibold text-gray-600">Phương thức TT:</span>
                                <span className="text-xs font-bold">{order.paymentMethod === 'cod' ? '💵 COD' : order.paymentMethod === 'bank-transfer' ? '🏦 Chuyển khoản' : order.paymentMethod}</span>
                              </div>
                              <div className="flex justify-between mt-1">
                                <span className="text-xs font-semibold text-gray-600">Tổng cộng:</span>
                                <span className="text-sm font-bold text-green-600">{(order.totalPrice || 0).toLocaleString('vi-VN')}đ</span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
