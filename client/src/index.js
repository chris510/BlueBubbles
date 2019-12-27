import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { MyThemeProvider } from './components/theme/theme_context';

ReactDOM.render(
  <MyThemeProvider>
    <App />
  </MyThemeProvider>,
  document.querySelector('#root')
);