// src/components/AdminLogin.js
import React, { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <h2 className="login-heading">Admin Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" style={{textAlign:"left"}} className="form-label">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="admin@gmail.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" style={{textAlign:"left"}} className="form-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="admin"
              required
            />
          </div>
          <div className='form-group'>

          <button type="submit" className="login-button">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;