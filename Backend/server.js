// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const { setupSockets } = require('./socket');
const cors = require('cors');

const app = express();
const server = http.createServer(app);


// Set up CORS for Express
app.use(cors({
  origin: '*',  
  methods: ['GET', 'POST'],
  credentials: true
}));


// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Route all other requests to the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Set up Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',  
   methods: ['GET', 'POST'],
    credentials: true
  }
});

// Initialize Socket.io connections and events
setupSockets(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
