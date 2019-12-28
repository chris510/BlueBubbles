import React, { useContext } from "react";
import styled, { ThemeProvider } from 'styled-components';
import { backgroundColor, textColor } from './theme';
import SocketContext from "../socket_context";

const ThemeToggleContext = React.createContext();
export const useTheme = () => React.useContext(ThemeToggleContext);

export const MyThemeProvider = ({ children }) => {
  const mode = localStorage.getItem('mode');
  const [themeState, setThemeState] = React.useState({
    mode: mode
  });
  let socket = useContext(SocketContext);
  console.log(socket);

  const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${backgroundColor};
    color: ${textColor};
  `;

  const toggle = () => {
    const mode = (themeState.mode === 'light' ? `dark` : `light`);
    localStorage.setItem('mode', `${mode}`)
    setThemeState({ 
      mode: mode 
    });
    let id = localStorage.getItem('id');
    console.log('this is the id', id)
    console.log(socket);
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  };

  return (
    <ThemeToggleContext.Provider value={{ toggle: toggle }}>
      <ThemeProvider
        theme={{
          mode: themeState.mode
        }}
      >
        <Wrapper>
          {children}
        </Wrapper>
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};

export default ThemeProvider;
