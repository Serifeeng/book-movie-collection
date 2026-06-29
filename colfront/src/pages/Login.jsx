import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { useToast } from '../components/common/Toast';
import { Library, LogIn, UserPlus, Mail, Lock, User } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await authService.login(email, password);
        showToast('Giriş başarılı! Hoş geldiniz.', 'success');
      } else {
        await authService.register(username, email, password);
        showToast('Kayıt başarılı! Hoş geldiniz.', 'success');
      }
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.';
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Floating decorative elements */}
      <div className="login-bg-decor">
        <div className="decor-circle decor-1"></div>
        <div className="decor-circle decor-2"></div>
        <div className="decor-circle decor-3"></div>
      </div>

      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="login-logo">
            <Library size={32} />
          </div>
          <h1>Koleksiyonum</h1>
          <p className="login-subtitle">Kitap ve Film Takip Portalı</p>
        </div>

        {/* Tab toggle */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            <LogIn size={16} />
            <span>Giriş Yap</span>
          </button>
          <button
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            <UserPlus size={16} />
            <span>Kayıt Ol</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="input-group">
              <User size={18} className="input-icon" />
              <input
                id="register-username"
                type="text"
                placeholder="Kullanıcı adı"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={!isLogin}
                minLength={3}
              />
            </div>
          )}
          <div className="input-group">
            <Mail size={18} className="input-icon" />
            <input
              id="login-email"
              type="email"
              placeholder="E-posta adresi"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input
              id="login-password"
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <button type="submit" className="login-submit" disabled={loading} id="auth-submit-btn">
            {loading ? (
              <span className="loader-spinner"></span>
            ) : isLogin ? (
              <>
                <LogIn size={18} />
                <span>Giriş Yap</span>
              </>
            ) : (
              <>
                <UserPlus size={18} />
                <span>Kayıt Ol</span>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="login-footer-text">
          {isLogin ? "Hesabınız yok mu? " : "Zaten bir hesabınız var mı? "}
          <button className="toggle-auth" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
