import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="join-wrapper">
      <div className="join-container">
          <h1>Join</h1>
          <div><input placeholder="Name" className="joinInput" type="text" onChange={(e) => setName(e.target.value)}> /></input></div>
          <div><input placeholder="Room" className="joinInput" type="text" onChange={(e) => setRoom(e.target.value)}> /></input></div>
          <Link onClick={e => (!name || !room ) ? e.preventDefault(): null} to={`/chat?name=${name}&room=${room}`}>
            <button className="sign-in-button" type="submit">Sign In</button>
          </Link>
      </div>
    </div>
  )
}

export default Join