import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './chat.css';

import InfoBar from '../infobar/infobar';
import Input from '../input/input';
import Messages from '../messages/messages';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const serverEndPoint = 'localhost:5000'

  useEffect(() => {
    // gives us the url
    // const data = queryString.parse(location.search);
    const { name, room } = queryString.parse(location.search);
    // console.log(data);
    // console.log(location.search);

    socket = io(serverEndPoint);
    console.log(socket);
    
    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, () => {
      // if (error) alert(error);
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
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  console.log(message, messages);

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
    </div>
  )
}

export default Chat;