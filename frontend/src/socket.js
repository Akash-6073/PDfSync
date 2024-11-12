// src/socket.js
import { io } from 'socket.io-client';

const socket = io('https://slidesync.onrender.com', {
  path: '/socket.io',
  withCredentials: true, // Enable credentials if needed
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

export default socket;