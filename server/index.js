const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const router = require('./router');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.port || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);
app.use(cors);

io.on('connection', (socket) => {
  console.log('This is a new connection!');

  socket.on('join', ({ name, room }, callback) => {
    console.log(name, room)

    const { error, user } = addUser({id: socket.id, name, room});
    
    let usersInRoom = getUsersInRoom(room);
    usersInRoom.forEach((user) => {
      if (user.name === name) console.log('username taken!')
    })

    // console.log(user);
    if (error) return callback(error);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}`})
    socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined!`})
    socket.join(user.room);

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});

    callback();
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message })
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)})

    callback();
  })

  socket.on('disconnect', () => {
    let user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', {user: 'admin', 'text': `${user.name} has left`})
    }
  })
  
})



server.listen(PORT, () => console.log(`Sever has started on ${PORT}`));