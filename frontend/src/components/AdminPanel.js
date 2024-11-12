import React, { useState, useEffect } from 'react';
import socket from '../socket';
import { Document, Page } from 'react-pdf';

const AdminPanel = ({ onLogout }) => {
  const sessionId = 'session-1';

  const [pageNumber, setPageNumber] = useState(() => {
    return Number(localStorage.getItem('pageNumber')) || 1;
  });

  useEffect(() => {
    localStorage.setItem('pageNumber', pageNumber);
  }, [pageNumber]);

  const changePage = (offset) => {
    const newPage = pageNumber + offset;
    setPageNumber(newPage);
    socket.emit('pageChange', { sessionId, pageNumber: newPage });
  };

  useEffect(() => {
    socket.emit('joinSession', { sessionId, userType: 'admin' });
    const handleUpdatePage = ({ pageNumber }) => {
      setPageNumber(pageNumber);
      localStorage.setItem('pageNumber', pageNumber);
    };

    socket.on('updatePage', handleUpdatePage);

    return () => {
      socket.off('updatePage', handleUpdatePage);
    };
  }, [sessionId]);

  const handleLogout = () => {
    localStorage.setItem('pageNumber', 1);
    setPageNumber(1);
    socket.emit('pageChange', { sessionId, pageNumber: 1 });
    onLogout();
  };

  return (
    <div className="AdminPanel">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <div className="page-navigation">
        <button onClick={() => changePage(-1)} disabled={pageNumber <= 1}>Previous</button>
        <span> Page {pageNumber} </span>
        <button onClick={() => changePage(1)}>Next</button>
      </div>
    </div>
  );
};

export default AdminPanel;
