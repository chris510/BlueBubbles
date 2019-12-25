import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './join.css';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const handleSignIn = e => {
    //If the name or room is not inputted, button doesn't do anything
    return (!name || !room ) ? e.preventDefault() : null
  }

  return (
    <div className="join-wrapper">
      <div className="join-container">
        <h1 className="join-header">Join</h1>
        <div><input placeholder="Name" className="joinInput" type="text" onChange={(e) => setName(e.target.value)} /></div>
        <div><input placeholder="Room" className="joinInput" type="text" onChange={(e) => setRoom(e.target.value)} /></div>
        <Link onClick={handleSignIn} to={`/chat?name=${name}&room=${room}`}>
          <button className="sign-in-button" type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  )
}

export default Join;