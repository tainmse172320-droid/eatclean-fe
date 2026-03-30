import { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes, FaChartLine, FaUtensils, FaClipboard, FaUsers, FaArrowLeft, FaHome } from 'react-icons/fa';

const AdminLayout = () => {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/');
    }
  }, [isAdmin, loading, navigate]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const menuItems = [
    { icon: FaChartLine, label: t('dashboard'), path: '/admin/dashboard' },
    { icon: FaUtensils, label: t('products'), path: '/admin/meals' },
    { icon: FaClipboard, label: t('orderManagement'), path: '/admin/orders' },
    { icon: FaUsers, label: t('users'), path: '/admin/users' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-900 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <Link to="/" className="text-xl font-bold hover:text-primary-400 transition">
                🥗 EAT CLEAN
              </Link>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-800 rounded"
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Back to Website Button */}
        <div className="p-4 border-b border-gray-800">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 transition"
          >
            <FaHome className="text-lg" />
            {sidebarOpen && <span>{t('home')}</span>}
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              <item.icon className="text-lg" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white shadow-sm p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Control Panel</h2>
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-primary-600 flex items-center gap-2 transition"
          >
            <FaArrowLeft /> Back to Website
          </Link>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

