# ♟️ Real-Time Multiplayer Chess Game

A real-time multiplayer chess application built using Node.js, Express, Socket.IO, and Chess.js, featuring drag-and-drop gameplay, automatic role assignment (White / Black / Spectator), and synchronized board state across clients.

---

## 🚀 Features
### 🎮 Gameplay
- Real-time chess gameplay using Socket.IO
- Drag & drop chess pieces
- Legal move validation using chess.js
- Automatic board flipping for Black player
- Unicode chess pieces for clean UI
- Smooth animations on piece movement

### 👥 Player Roles
- First user → White player
- Second user → Black player
- Additional users → Spectators (read-only mode)

### 🔒 Move Validation
- Server strictly validates:
 - Correct playyer turn
 - Legal chess moves
- Invalid moves are rejected instantly

--- 

## 🧱 Tech Stack
### Frontend
- HTML5
- CSS3 (Custom styling + animations)
- Tailwind CSS (utility classes)
- Vanilla JavaScript
- Socket.IO Client
- Chess.js (game logic)

### Backend
- Node.js
- Express.js
- Socket.IO
- Chess.js (authoritative game state)
- EJS (templating)

---

## 📁 Project Structure
chess-game/
│
├── public/
│   ├── assets/
│   │   └── index.js        # Client-side JS (Socket + Board logic)
│   ├── index.css           # Chessboard styling
│
├── views/
│   └── index.ejs           # Main HTML template
│
├── src/
│   └── app.js              # Express + Socket.IO server
│
├── server.js               # Server entry point
├── package.json
└── README.md

---

## ⚙️ How It Works
### 1️⃣ Server Logic
- Maintains a single authoritative chess board
- Assigns roles (w, b, spectator)
- Validates moves before broadcasting
- Syncs board state to all clients

## 2️⃣ Client Logic
- Renders board using chess.board()
- Converts board positions to algebraic notation
- Emits moves via Socket.IO
- Updates board on server broadcasts

---

## 🔁 Socket.IO Events
### Client → Server
| Event  | Description                                  |
| ------ | -------------------------------------------- |
| `move` | Sends a chess move `{ from, to, promotion }` |

### Server → Client
| Event           | Description                      |
| --------------- | -------------------------------- |
| `playerRole`    | Assigns player role (`w` or `b`) |
| `spectatorRole` | Assigns spectator mode           |
| `move`          | Broadcasts a valid move          |
| `boardState`    | Sends FEN string for full sync   |

---

## ▶️ Running the Project
### 1️⃣ Install Dependencies
npm install

### 2️⃣ Start Server
node server.js

### 3️⃣ Open Browser
http://localhost:3000

