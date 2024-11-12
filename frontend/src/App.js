import React, { useState, useEffect } from 'react';
import AdminPanel from './components/AdminPanel';
import PDFViewer from './components/PDFViewer';
import AdminLogin from './components/AdminLogin';

function App() {
  const [isAdmin, setIsAdmin] = useState(() => JSON.parse(localStorage.getItem('isAdmin')) || false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => JSON.parse(localStorage.getItem('isAuthenticated')) || false);

  useEffect(() => {
    localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
  }, [isAdmin]);

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const handleLogin = (email, password) => {
    if (email === 'admin@gmail.com' && password === 'admin') {
      setIsAuthenticated(true);
      alert('Login successful');
    } else {
      alert('Incorrect email or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isAuthenticated');
    localStorage.setItem('pageNumber', 1);
    alert('Logged out successfully');
  };

  return (
    <div className="App">
      <h1>Real-Time PDF Co-Viewer</h1>
      <button className="switch-button" onClick={() => setIsAdmin(!isAdmin)}>
        {isAdmin ? 'Switch to Viewer' : 'Switch to Admin'}
       
      </button>
      {isAdmin ? (
        isAuthenticated ? (
          <AdminPanel onLogout={handleLogout} />
        ) : (
          <AdminLogin onLogin={handleLogin} />
        )
      ) : (
        <PDFViewer />
      )}
    </div>
  );
}

export default App;
