import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../../services/authService';
import { BookOpen, Film, LogOut, Heart, Sun, Moon, Library, CheckCircle } from 'lucide-react';

const Navbar = ({ stats }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = authService.getCurrentUser();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Brand */}
        <div className="nav-brand" onClick={() => navigate('/')}>
          <Library className="nav-logo-icon" size={24} />
          <span>Koleksiyonum</span>
        </div>

        {/* Stats deck for portfolio appeal */}
        {stats && (
          <div className="nav-stats">
            <div className="nav-stat-item" title="Toplam Öğe">
              <span className="stat-label">Tümü</span>
              <span className="stat-value">{stats.total || 0}</span>
            </div>
            <div className="nav-stat-item" title="Kitaplar">
              <BookOpen size={14} className="stat-icon-book" />
              <span className="stat-value">{stats.books || 0}</span>
            </div>
            <div className="nav-stat-item" title="Filmler">
              <Film size={14} className="stat-icon-movie" />
              <span className="stat-value">{stats.movies || 0}</span>
            </div>
            <div className="nav-stat-item" title="Tamamlananlar">
              <CheckCircle size={14} className="stat-icon-completed" />
              <span className="stat-value">{stats.statusCounts?.completed || 0}</span>
            </div>
          </div>
        )}

        {/* Navigation Actions */}
        <div className="nav-actions">
          {/* Favorites link */}
          <button 
            className={`nav-btn fav-btn ${location.pathname === '/favorites' ? 'active' : ''}`}
            onClick={() => navigate(location.pathname === '/favorites' ? '/' : '/favorites')}
            title="Favorilerim"
          >
            <Heart size={18} fill={location.pathname === '/favorites' ? 'currentColor' : 'none'} />
            <span className="btn-text">
              {location.pathname === '/favorites' ? 'Dashboard' : 'Favoriler'}
            </span>
          </button>

          {/* Theme toggle */}
          <button 
            className="nav-btn theme-toggle" 
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Açık Tema' : 'Karanlık Tema'}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* User profile & logout */}
          {user && (
            <div className="user-profile">
              <div className="user-info">
                <span className="user-icon">
                  {user.username.charAt(0).toUpperCase()}
                </span>
                <span className="username">{user.username}</span>
              </div>
              <button className="logout-btn" onClick={handleLogout} title="Çıkış Yap">
                <LogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
