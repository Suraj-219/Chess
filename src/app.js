const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const { Chess } = require('chess.js');
const path = require('path');
const { log } = require('console');

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

   if (!players.white) {
     players.white = socket.id;
     socket.emit("playerRole", "W");
   } else if (!players.black) {
     players.black = socket.id;
     socket.emit("playerRole", "B");
   } else {
     socket.emit("spectatorRole");
   }

   socket.on("disconnect", function(){
     if(socket.id === players.white ) {
      delete players.white;
    }
     else if(socket.id === players.black) {
      delete players.black;
    }
   });

   socket.on("move", (move) => {
    try{
      if (chess.turn() === "W" && socket.id != players.white) return;
      if (chess.turn() === "B" && socket.id != players.black) return;

      const result = chess.move(move);
      if(result){
        currentPlayer = chess.turn();
        io.emit("move", move);
        io.emit("boatdState", chess.fen());
      } else {
        console.log("Invalid move : ", move);
        socket.emit("invalidMove", move);
      }
    }
    catch(err){}
   });

});

module.exports = server;