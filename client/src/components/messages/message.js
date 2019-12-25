import React from 'react';
import ReactEmoji from 'react-emoji';
import './message.css'

const Message = ({message: {user, text}, name}) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();
  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser ? (
      <div className="message-container justifyEnd">
        <p className="sentText">{trimmedName}</p>
        <div className="messageBox backgroundBlue">
          <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
        </div>
      </div>
    ) : (
      <div className="message-container justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sentText pl-10">{user}</p>
    </div>
    )
  )
}

export default Message;