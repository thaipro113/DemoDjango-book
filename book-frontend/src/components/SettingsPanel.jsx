import React from 'react';

function SettingsPanel({ showSettings, apiUrl, setApiUrl, authToken, setAuthToken }) {
  if (!showSettings) return null;

  return (
    <div className="settings-panel">
      <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Cấu hình kết nối API</h3>
      <div className="settings-row">
        <div className="input-group" style={{ flex: 1, minWidth: '280px' }}>
          <label>API Endpoint</label>
          <input 
            type="text" 
            className="form-control" 
            value={apiUrl} 
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder="Ví dụ: http://localhost:8000/api/book"
          />
        </div>
        <div className="input-group" style={{ flex: 1, minWidth: '280px' }}>
          <label>JWT Access Token (Tùy chọn)</label>
          <input 
            type="text" 
            className="form-control" 
            value={authToken} 
            onChange={(e) => setAuthToken(e.target.value)}
            placeholder="Điền JWT token nếu backend cần xác thực"
          />
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;
