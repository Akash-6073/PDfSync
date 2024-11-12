// socket.js
let sessions = {}; // Store session data by session ID

function setupSockets(io) {
  io.on('connection', (socket) => {
    let currentSession = null;

    // Join a session and send current page state immediately
    socket.on('joinSession', ({ sessionId, userType }) => {
      currentSession = sessionId;
      socket.join(sessionId);

      // Initialize session if it doesn't exist
      if (!sessions[sessionId]) {
        sessions[sessionId] = { pageNumber: 1 };  // Default to page 1
      }

      // Send the latest page number to the new viewer or admin
      socket.emit('updatePage', { pageNumber: sessions[sessionId].pageNumber });
    });

    // Listen for page changes from the admin and broadcast them
    socket.on('pageChange', ({ sessionId, pageNumber }) => {
      if (sessions[sessionId]) {
        sessions[sessionId].pageNumber = pageNumber;
        io.in(sessionId).emit('updatePage', { pageNumber });
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      if (currentSession && sessions[currentSession]) {
        // Clean up session if no clients are connected
        if (io.sockets.adapter.rooms.get(currentSession)?.size === 0) {
          delete sessions[currentSession];
        }
      }
    });
  });
}

module.exports = { setupSockets };
