// src/socket.js
import { io } from 'socket.io-client';

const socket = io('https://slidesyncer.vercel.app/', {
    withCredentials: true,
    path: '/socket.io',
});

export default socket;
