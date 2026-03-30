import { useEffect, useState } from 'react';
import { mockMeals, mockUsers } from '../../utils/mockData';
import { FaUsers, FaClipboard, FaUtensils, FaMoneyBillWave, FaArrowUp } from 'react-icons/fa';

const statusColors = {
  confirmed: 'bg-blue-100 text-blue-700',
  preparing: 'bg-yellow-100 text-yellow-700',
  delivering: 'bg-orange-100 text-orange-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700'
};

const statusLabels = {
  confirmed: 'Đã xác nhận',
  preparing: 'Đang chuẩn bị',
  delivering: 'Đang giao',
  completed: 'Hoàn thành',
  cancelled: 'Đã huỷ'
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    try {
      // Đọc đơn hàng THẬT từ localStorage
      const realOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
      const totalRevenue = realOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
      const recent = [...realOrders]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setStats({
        totalOrders: realOrders.length,
        totalRevenue,
        totalMeals: mockMeals.length,
        totalUsers: mockUsers.length,
        completedOrders: realOrders.filter(o => o.orderStatus === 'completed').length,
        pendingOrders: realOrders.filter(o => ['confirmed', 'preparing'].includes(o.orderStatus)).length,
      });
      setRecentOrders(recent);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
    </div>
  );

  const statCards = [
    { title: 'Tổng đơn hàng', value: stats.totalOrders, icon: FaClipboard, color: 'bg-blue-100 text-blue-600', sub: `${stats.pendingOrders} đang xử lý` },
    { title: 'Tổng doanh thu', value: `${stats.totalRevenue.toLocaleString('vi-VN')}đ`, icon: FaMoneyBillWave, color: 'bg-green-100 text-green-600', sub: `${stats.completedOrders} đơn hoàn thành` },
    { title: 'Món ăn', value: stats.totalMeals, icon: FaUtensils, color: 'bg-orange-100 text-orange-600', sub: 'Tổng sản phẩm' },
    { title: 'Người dùng', value: stats.totalUsers, icon: FaUsers, color: 'bg-purple-100 text-purple-600', sub: 'Tài khoản đã đăng ký' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Tổng quan</h1>
        <p className="text-gray-500 text-sm mt-1">Dữ liệu cập nhật từ đơn hàng thực tế</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-xl ${card.color}`}>
                <card.icon className="text-xl" />
              </div>
              <FaArrowUp className="text-green-400 text-xs" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            <p className="text-sm font-semibold text-gray-600 mt-1">{card.title}</p>
            <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-800">Đơn hàng gần đây</h2>
          <a href="/admin/orders" className="text-primary-600 text-sm font-semibold hover:underline">Xem tất cả →</a>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-3xl mb-3">📦</p>
            <p className="text-gray-500 font-semibold">Chưa có đơn hàng nào</p>
            <p className="text-gray-400 text-sm mt-1">Đơn hàng sẽ xuất hiện khi khách đặt hàng</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b">
                <tr>
                  <th className="pb-3 font-semibold text-gray-600">Mã đơn</th>
                  <th className="pb-3 font-semibold text-gray-600">Khách hàng</th>
                  <th className="pb-3 font-semibold text-gray-600">Tổng tiền</th>
                  <th className="pb-3 font-semibold text-gray-600">Trạng thái</th>
                  <th className="pb-3 font-semibold text-gray-600">Ngày đặt</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 font-bold text-primary-600">{order.orderNumber}</td>
                    <td className="py-3 text-gray-700">{order.shippingInfo?.name || 'Khách'}</td>
                    <td className="py-3 font-bold text-green-600">{(order.totalPrice || 0).toLocaleString('vi-VN')}đ</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[order.orderStatus] || 'bg-gray-100 text-gray-600'}`}>
                        {statusLabels[order.orderStatus] || order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500 text-xs">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
