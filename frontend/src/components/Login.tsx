import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import type { User } from '../types';

interface LoginProps {
  setUser: (user: User) => void;
}

const Login = ({ setUser }: LoginProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'CUSTOMER'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData.email, formData.password, formData.role);
      if (response.data.success) {
        setUser(response.data.data);
        // Navigate based on role
        switch (formData.role) {
          case 'ADMIN':
            navigate('/admin');
            break;
          case 'TOUR_GUIDE':
            navigate('/tour-guide');
            break;
          case 'CUSTOMER':
            navigate('/customer');
            break;
          default:
            navigate('/');
        }
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Login</h3>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    className="form-select"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="CUSTOMER">Customer</option>
                    <option value="TOUR_GUIDE">Tour Guide</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>

              {formData.role === 'ADMIN' && (
                <div className="mt-3 alert alert-info">
                  <small>Default Admin: admin@tours.com / admin123</small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;