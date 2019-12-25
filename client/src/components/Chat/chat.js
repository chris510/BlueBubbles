import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const serverEndPoint = 'localhost:5000'

  useEffect(() => {
    // gives us the url
    // const data = queryString.parse(location.search);
    const { name, room } = queryString.parse(location.search);
    // console.log(data);
    // console.log(location.search);

    socket = io(serverEndPoint);
    // console.log(socket);
    
    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, ({ error }) => {
      // alert(error);
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [serverEndPoint, location.search]);

  return (
    <div>
      Chat
    </div>
  )
}

export default Chat;