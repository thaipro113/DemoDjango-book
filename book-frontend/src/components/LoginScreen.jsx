import React, { useState } from 'react';
import { BookOpen, User, Lock, Mail, LogIn, UserPlus, Settings } from 'lucide-react';

export default function LoginScreen({
  loginLoading,
  loginError,
  setLoginError,
  handleLogin,
  handleRegister,
  apiUrl,
  setApiUrl,
  showSettings,
  setShowSettings,
  toasts
}) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const getLoginUrl = () => {
    try {
      if (apiUrl.includes('/api/')) {
        const idx = apiUrl.indexOf('/api/');
        return apiUrl.substring(0, idx) + '/token';
      }
      const urlObj = new URL(apiUrl);
      return `${urlObj.origin}/token`;
    } catch (e) {
      return 'http://localhost:8000/token';
    }
  };

  const getRegisterUrl = () => {
    try {
      if (apiUrl.includes('/api/')) {
        const idx = apiUrl.lastIndexOf('/');
        return apiUrl.substring(0, idx) + '/register';
      }
      const urlObj = new URL(apiUrl);
      return `${urlObj.origin}/api/register`;
    } catch (e) {
      return 'http://localhost:8000/api/register';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (isRegisterMode) {
      if (password !== confirmPassword) {
        setLoginError('Mật khẩu xác nhận không khớp.');
        return;
      }
      const success = await handleRegister(username, email, password);
      if (success) {
        setIsRegisterMode(false);
        setPassword('');
        setConfirmPassword('');
      }
    } else {
      await handleLogin(username, password);
    }
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setLoginError('');
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="login-container">
      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <BookOpen size={24} />
          </div>
          <h2 className="login-title">
            {isRegisterMode ? 'Đăng Ký Tài Khoản' : 'Đăng Nhập Hệ Thống'}
          </h2>
          <p className="login-subtitle">Chương trình quản lý thư viện</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="input-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={14} />
              Tên đăng nhập
            </label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Nhập tên tài khoản..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {isRegisterMode && (
            <div className="input-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={14} />
                Email
              </label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="Nhập email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}

          <div className="input-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={14} />
              Mật khẩu
            </label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isRegisterMode && (
            <div className="input-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={14} />
                Xác nhận mật khẩu
              </label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Nhập lại mật khẩu..."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          {loginError && (
            <p style={{ color: 'var(--danger)', fontSize: '0.85rem', textAlign: 'center', fontWeight: '500' }}>
              {loginError}
            </p>
          )}

          <button type="submit" className="btn btn-primary" disabled={loginLoading} style={{ marginTop: '8px' }}>
            {loginLoading ? (
              <div className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }}></div>
            ) : isRegisterMode ? (
              <>
                <UserPlus size={18} />
                <span>Đăng Ký</span>
              </>
            ) : (
              <>
                <LogIn size={18} />
                <span>Đăng Nhập</span>
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '12px' }}>
          <button 
            type="button" 
            onClick={toggleMode}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--primary-color)', 
              cursor: 'pointer', 
              fontSize: '0.875rem',
              fontWeight: 500
            }}
          >
            {isRegisterMode ? 'Đã có tài khoản? Đăng nhập ngay' : 'Chưa có tài khoản? Đăng ký ngay'}
          </button>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', textAlign: 'center', marginTop: '16px' }}>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => setShowSettings(!showSettings)}
            style={{ width: '100%' }}
          >
            <Settings size={16} />
            <span>{showSettings ? 'Ẩn Cài Đặt API' : 'Cấu Hình Cổng API'}</span>
          </button>
        </div>

        {showSettings && (
          <div className="settings-panel" style={{ marginTop: '8px' }}>
            <div className="input-group">
              <label>API Endpoint</label>
              <input 
                type="text" 
                className="form-control" 
                value={apiUrl} 
                onChange={(e) => setApiUrl(e.target.value)}
              />
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {isRegisterMode ? (
                <>
                  Đăng ký gửi yêu cầu tới: <br />
                  <code style={{ fontSize: '11px', display: 'block', marginTop: '4px', wordBreak: 'break-all' }}>
                    {getRegisterUrl()}
                  </code>
                </>
              ) : (
                <>
                  Đăng nhập gửi yêu cầu tới: <br />
                  <code style={{ fontSize: '11px', display: 'block', marginTop: '4px', wordBreak: 'break-all' }}>
                    {getLoginUrl()}
                  </code>
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
