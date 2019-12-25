const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.port || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('This is a new connection!');

  socket.on('join', ({ name, room }, callback) => {
    console.log(name, room)
    console.log(socket.id)
    const { error, user } = addUser({id: socket.id, name, room});

    if (error) return callback(error);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}`})
    socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined!`})
    socket.join(user.room);

    callback();
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    debugger

    io.to(user.room).emit('message', { user: user.name, text: message })
    callback();
  })

  socket.on('disconnect', () => {
    console.log('User left.')
  })
  
})

app.use(router);

server.listen(PORT, () => console.log(`Sever has started on ${PORT}`));