import React from 'react';

import './input.css';

const Input = ({message, setMessage, sendMessage}) => (
  <form className="input-form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
    />
    <button className="send-message-btn" onClick={(e) => sendMessage(e)}>Send</button>
  </form>
)

export default Input;