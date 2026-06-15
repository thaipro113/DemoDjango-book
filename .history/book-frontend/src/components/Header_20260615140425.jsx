import React, { useState } from 'react';
import { BookOpen, Sun, Moon, Settings, Plus, LogOut, User } from 'lucide-react';

export default function Header({
  isDarkMode,
  setIsDarkMode,
  showSettings,
  setShowSettings,
  onAddClick,
  username,
  onLogout
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="app-header">
      <div className="brand-section">
        <div className="brand-logo">
          <BookOpen size={24} />
        </div>
        <div>
          <h1 className="brand-title" style={{ fontSize: '1.5rem', margin: 0 }}>Book Admin</h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Quản lý thư viện thông minh</p>
        </div>
      </div>

      <div className="header-controls">
        <button 
          className="btn btn-secondary btn-icon-only" 
          onClick={() => setIsDarkMode(!isDarkMode)}
          title="Đổi giao diện"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        
        <button 
          className={`btn btn-secondary ${showSettings ? 'active' : ''}`}
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings size={18} />
          <span>API Config</span>
        </button>

        <button className="btn btn-primary" onClick={onAddClick}>
          <Plus size={18} />
          <span>Thêm Sách</span>
        </button>

        {username && (
          <div className="user-profile-menu" style={{ position: 'relative' }}>
            <button 
              className="btn btn-secondary" 
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <User size={16} />
              <span>{username}</span>
            </button>

            {showUserMenu && (
              <div 
                className="user-dropdown" 
                style={{ 
                  position: 'absolute', 
                  right: 0, 
                  top: '100%', 
                  marginTop: '8px', 
                  background: 'var(--bg-secondary)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '8px', 
                  boxShadow: 'var(--shadow-md)', 
                  zIndex: 1000, 
                  minWidth: '160px',
                  padding: '8px 0'
                }}
              >
                <div style={{ padding: '8px 16px', fontSize: '0.8rem', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)', wordBreak: 'break-all' }}>
                  Tài khoản: <br />
                  <strong style={{ color: 'var(--text-primary)' }}>{username}</strong>
                </div>
                <button 
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout();
                  }}
                  style={{ 
                    width: '100%', 
                    padding: '10px 16px', 
                    background: 'none', 
                    border: 'none', 
                    textAlign: 'left', 
                    color: 'var(--danger)', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    fontSize: '0.9rem'
                  }}
                >
                  <LogOut size={200} />
                  <span>Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
