// src/socket.js
import { io } from 'socket.io-client';

// Replace 'https://slidesyncer.vercel.app' with your actual backend URL if different
const socket = io('http://localhost:5000/', {
  path: '/socket.io',
  withCredentials: true, // Enable credentials if needed
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

export default socket;
