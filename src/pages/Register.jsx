import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      navigate('/');
    } catch (error) {
      console.error('Register error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
      <h1 className="text-3xl font-bold text-center mb-2">🥗 EAT CLEAN</h1>
      <h2 className="text-xl font-semibold text-center mb-6 text-gray-700">
        {t('createAccount')}
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            {t('name')}
          </label>
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
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            {t('emailAddress')}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            {t('password')}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            {t('confirmPassword')}
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full mt-6"
        >
          {loading ? 'Creating account...' : t('register')}
        </button>
      </form>

      <p className="text-center text-gray-600 mt-6">
        {t('alreadyHaveAccount')}{' '}
        <Link to="/login" className="text-primary-600 font-semibold hover:underline">
          {t('login')}
        </Link>
      </p>
    </div>
  );
};

export default Register;
