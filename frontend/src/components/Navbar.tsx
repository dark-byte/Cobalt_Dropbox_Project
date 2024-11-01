import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar: React.FC = () => {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
    toast.success('Logged out successfully.');
    navigate('/');
  };

  return (
    <nav>
      {isDashboard ? (
        <>
          <div className="left-section">
            <h1 className="dashboard-title">Dashboard</h1>
          </div>
          <div className="right-section">
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="left-section">
            <Link to="/">Home</Link>
            {token && <Link to="/dashboard">Dashboard</Link>}
          </div>
          <div className="right-section">
            {token ? (
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="auth-link">Login</Link>
                <Link to="/register" className="auth-link">Register</Link>
              </>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;