// src/App.js
import React, { useState, useEffect } from 'react';
import socket from './socket';
import AdminPanel from './components/AdminPanel';
import PDFViewer from './components/PDFViewer';
import AdminLogin from './components/AdminLogin';

function App() {
  const [isAdmin, setIsAdmin] = useState(() => JSON.parse(localStorage.getItem('isAdmin')) || false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => JSON.parse(localStorage.getItem('isAuthenticated')) || false);
  const [currentPage, setCurrentPage] = useState(() => Number(localStorage.getItem('pageNumber')) || 1);

  // Save states in local storage
  useEffect(() => {
    localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAdmin, isAuthenticated]);

  // Listen for page changes from the server
  useEffect(() => {
    socket.on('updatePage', ({ pageNumber }) => {
      setCurrentPage(pageNumber);
      localStorage.setItem('pageNumber', pageNumber);
    });

    return () => {
      socket.off('updatePage');
    };
  }, []);

  // Emit page changes if admin
  const changePage = (newPage) => {
    setCurrentPage(newPage);
    localStorage.setItem('pageNumber', newPage);
    if (isAdmin) {
      socket.emit('pageChange', { sessionId: 'session-1', pageNumber: newPage });
    }
  };

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
    setCurrentPage(1);
    localStorage.setItem('pageNumber', 1);
    socket.emit('pageChange', { sessionId: 'session-1', pageNumber: 1 });
    alert('Logged out successfully');
  };

  return (
    <div className="App">
      <h1>Real-Time PDF Co-Viewer</h1>
      <button onClick={() => setIsAdmin(!isAdmin)} className="switch-button">
        {isAdmin ? 'Switch to Viewer' : 'Switch to Admin'}
      </button>
      {isAdmin ? (
        isAuthenticated ? (
          <AdminPanel onLogout={handleLogout} changePage={changePage} currentPage={currentPage} />
        ) : (
          <AdminLogin onLogin={handleLogin} />
        )
      ) : (
        <PDFViewer currentPage={currentPage} />
      )}
    </div>
  );
}

export default App;
