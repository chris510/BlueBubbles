import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { MyThemeProvider } from './components/theme/theme_context';

import SocketContext from './components/socket_context';
import io from 'socket.io-client'

import './stylesheets/index.scss';
const serverEndPoint = 'localhost:5000'
let socket = io(serverEndPoint);


ReactDOM.render(
  <SocketContext.Provider value={socket}>
    <MyThemeProvider>
      <App />
    </MyThemeProvider>
  </SocketContext.Provider>,
  document.querySelector('#root')
);