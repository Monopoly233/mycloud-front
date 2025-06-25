import React from 'react';
import './Header.css';

const Header = ({ onUpload, onLogout }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>🔄 My Cloud</h1>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={onUpload}
          >
            📤 Upload File
          </button>
          <button 
            className="btn btn-secondary"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 