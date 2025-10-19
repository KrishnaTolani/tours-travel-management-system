import { Link, useNavigate } from 'react-router-dom';
import type { User } from '../types';

interface NavbarProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const Navbar = ({ user, setUser }: NavbarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'ADMIN': return '/admin';
      case 'TOUR_GUIDE': return '/tour-guide';
      case 'CUSTOMER': return '/customer';
      default: return '/';
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
      <div className="container-fluid px-4">
        <Link className="navbar-brand" to="/">🌍 Tours & Travel</Link>
        
        <div className="navbar-nav ms-auto">
          {!user ? (
            <>
              <Link className="nav-link" to="/register">Register Customer</Link>
              <Link className="nav-link" to="/login">Login</Link>
            </>
          ) : (
            <>
              <Link className="nav-link" to={getDashboardLink()}>Dashboard</Link>
              <span className="nav-link">Welcome, {user.name}</span>
              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;