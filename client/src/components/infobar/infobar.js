import React from 'react';
import Link from 'react-router-dom'
import './infobar.css';
import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';

const InfoBar = ({ room }) => (
  <div className="infobar-container">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online image"/>
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/"><img src={closeIcon} alt="close image"/></a>
    </div>
  </div>
)

export default InfoBar;