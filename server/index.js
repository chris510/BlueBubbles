const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.port || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('This is a new connection!');

  socket.on('join', ( { name, room }, callback) => {
    console.log(name, room)

    // const error = true;

    // if (error) {
    //   callback({ error: 'error' });
    // };

  })

  socket.on('disconnect', () => {
    console.log('User left.')
  })
  
})

app.use(router);

server.listen(PORT, () => console.log(`Sever has started on ${PORT}`));