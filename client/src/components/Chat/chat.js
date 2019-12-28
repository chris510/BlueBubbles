import React, { useState, useEffect, useContext } from 'react';
import queryString from 'query-string';
// import io from 'socket.io-client';

import './chat.css';

import InfoBar from '../infobar/infobar';
import Input from '../input/input';
import Messages from '../messages/messages';
import People from '../people/people';
import SocketContext from '../socket_context';

// let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const serverEndPoint = 'localhost:5000'
  let socket = useContext(SocketContext)

  useEffect(() => {
    // gives us the url
    // const data = queryString.parse(location.search);
    let { name, room } = queryString.parse(location.search);
    console.log(location.search)
    // socket = io(serverEndPoint);
    setName(name);
    setRoom(room);
    // localStorage.setItem('id', `${socket.id}`);

    // socket = io(serverEndPoint);
    // setName(name);
    // setRoom(room);
    // localStorage.setItem('name', `${name}`);
    // localStorage.setItem('room', `${room}`);
    // console.log(name);
    // console.log(room);
    
    socket.emit('join', { name, room }, (error) => {
      if (error) alert(error);
      // console.log(socket);
      console.log(socket.id)
      localStorage.setItem('id', `${socket.id}`);
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  
  }, [serverEndPoint, location.search]);

  useEffect(() => {

    socket.on('message', (message) => {
      setMessages([...messages, message]);
    })

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    })
    return () => {
      socket.emit('disconnect');
      socket.off();
    }

  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
      <InfoBar room={room}/>
      <Messages messages={messages} name={name}/>
      <Input 
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
      </div>
    <People users={users}/>
    </div>
  )
}

export default Chat;