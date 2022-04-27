require('dotenv').config()

const app = require('./app.js');
const server = require('http').createServer(app);
const socket = require('socket.io');
const io = socket(server);

const PORT = process.env.PORT || 8000;


const handlers = require('./server/handlers');




// Handle socket from web clients
io.on('connection', client => {  // client = socket

  console.log('a user connected');

  // * Listen to any events from client and call the appropriate handler functions
  io.emit('join', handlers.handleJoin(client));


  client.on('disconnect', () => {
    io.emit('leave', handlers.handleDisconnect(client));
  });


  client.on('error', (err) => {
    console.log('received error from client', client.id);
    console.log(err);
  })

  client.on('user_creates_lobby', () => {
    io.emit('createLobby', handlers.handleCreateLobby(client))
  })

  client.on('user_joins_lobby', (code) => {
    const room = io.sockets.adapter.rooms.get(code)
    io.emit('joinLobby', handlers.handleJoinLobby(client, code, room))
  })

  client.on('user_starts_game', (code) => {
    const room = io.sockets.adapter.rooms.get(code)
    io.emit('startGame', handlers.handleStartGame(client, code, room))
  })

});


server.listen(PORT, () => console.log(`server should be running at http://localhost:${PORT}/`));


module.exports = { io, PORT };