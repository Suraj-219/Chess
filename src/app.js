const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const { Chess } = require('chess.js');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const chess = new Chess();
let players = {};
let currentPlayer = 'W';

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Chess Game' });
});

io.on('connection', (socket) => {
  console.log('🟢 New client connected:', socket.id);
//   socket.on('disconnect', () => {
//     console.log('🔴 Client disconnected:', socket.id);
//   });
});


module.exports = server;