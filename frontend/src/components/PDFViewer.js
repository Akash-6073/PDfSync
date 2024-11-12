// src/components/PDFViewer.js
import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import socket from '../socket';

const PDFViewer = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const sessionId = 'session-1';

  useEffect(() => {
    socket.emit('joinSession', { sessionId, userType: 'viewer' });

    const handleUpdatePage = ({ pageNumber }) => {
      setPageNumber(pageNumber);
      setLoading(false);
    };

    socket.on('updatePage', handleUpdatePage);

    return () => {
      socket.off('updatePage', handleUpdatePage);
    };
  }, [sessionId]);

  return (
    <div className="PDFViewer">
      <h2>PDF Viewer</h2>
      {loading ? (
        <div style={{color:"black"}}>
          <span class="loader"></span> <br />
          Syncing pages...
        </div>
      ) : (
        <div>
          {/* <Document file={samplePDF}>
            <Page pageNumber={pageNumber} />
          </Document> */}
          <p>Current Page: {pageNumber}</p>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
