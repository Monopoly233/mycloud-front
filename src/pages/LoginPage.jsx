import React, { useState } from 'react';
import { APP_CONFIG } from '../config';
import './LoginPage.css';

const LoginPage = ({ onLogin, loading, message }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🔄 {APP_CONFIG.APP_NAME}</h1>
          <p>{APP_CONFIG.APP_DESCRIPTION}</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {message && <div className="message error">{message}</div>}
      </div>
    </div>
  );
};

export default LoginPage; 