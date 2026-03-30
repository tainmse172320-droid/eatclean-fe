import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const { t } = useTranslation();
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      district: user?.address?.district || '',
      ward: user?.address?.ward || ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateProfile(formData);
      setEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-bold mb-8">{t('profile')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2 card p-8">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center text-white text-3xl">
                👤
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-500 capitalize">Role: {user?.role}</p>
              </div>
            </div>

            {editing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">{t('name')}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">{t('phone')}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

                <div className="border-t pt-6 mt-6">
                  <h3 className="font-bold mb-4">Address</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Street</label>
                      <input
                        type="text"
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">City</label>
                        <input
                          type="text"
                          name="address.city"
                          value={formData.address.city}
                          onChange={handleChange}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">District</label>
                        <input
                          type="text"
                          name="address.district"
                          value={formData.address.district}
                          onChange={handleChange}
                          className="input-field"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Ward</label>
                      <input
                        type="text"
                        name="address.ward"
                        value={formData.address.ward}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6 pt-6 border-t">
                  <button type="submit" disabled={loading} className="btn-primary">
                    {loading ? 'Saving...' : t('save')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="btn-outline"
                  >
                    {t('cancel')}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t('emailAddress')}</p>
                  <p className="font-semibold">{user?.email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">{t('phone')}</p>
                  <p className="font-semibold">{user?.phone || 'Not provided'}</p>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-bold mb-4">Address</h3>
                  {user?.address?.street ? (
                    <p className="text-gray-700">
                      {user.address.street}
                      {user.address.ward && `, ${user.address.ward}`}
                      {user.address.district && `, ${user.address.district}`}
                      {user.address.city && `, ${user.address.city}`}
                    </p>
                  ) : (
                    <p className="text-gray-500">No address provided</p>
                  )}
                </div>

                <div className="pt-6 border-t">
                  <button
                    onClick={() => setEditing(true)}
                    className="btn-primary"
                  >
                    {t('edit')} Profile
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div className="card p-6 text-center">
              <p className="text-3xl font-bold text-primary-600">0</p>
              <p className="text-gray-600 text-sm mt-2">Total Orders</p>
            </div>
            <div className="card p-6 text-center">
              <p className="text-3xl font-bold text-primary-600">0</p>
              <p className="text-gray-600 text-sm mt-2">Total Spent</p>
            </div>
            <div className="card p-6 text-center">
              <p className="text-3xl font-bold text-primary-600">0</p>
              <p className="text-gray-600 text-sm mt-2">Loyalty Points</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
