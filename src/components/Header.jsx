import React from 'react';
import './Header.css';

const Header = ({ onUpload, onLogout }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>🔄 我的云盘</h1>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={onUpload}
          >
            📤 上传文件
          </button>
          <button 
            className="btn btn-secondary"
            onClick={onLogout}
          >
            退出
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 