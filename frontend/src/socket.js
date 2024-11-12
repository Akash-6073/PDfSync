// src/socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Adjust if hosted elsewhere
export default socket;
