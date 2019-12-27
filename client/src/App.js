import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import Join from './components/join/join';
import Chat from './components/chat/chat';

import { useTheme } from './components/theme/theme_context';
import styled, { withTheme } from 'styled-components';
import { buttonBackgroundColor, buttonTextColor } from './components/theme/theme';;

const App = ( props ) => {

  const themeToggle = useTheme();

  const Button = styled.button`
    background: ${buttonBackgroundColor};
    border: none;
    border-radius: 0.3em;
    box-shadow: none;
    color: ${buttonTextColor};
    cursor: pointer;
    font-size: 1em;
    padding: 0.5em 1em;
  `;
  
  return (
  <div className="app">
    <Button onClick={() => themeToggle.toggle()}>
      {props.theme.mode === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </Button>
    <BrowserRouter>
        <Route path="/" exact component={Join} />
        <Route path="/chat" exact component={Chat} />
    </BrowserRouter>
  </div>
  )
}

export default withTheme(App);