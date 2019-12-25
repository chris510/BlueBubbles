import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import Join from './components/Join/join';
import Chat from './components/Chat/chat';

const App = () => (
  <BrowserRouter>
    <Route path="/" exact component={Join} />
    <Route path="/chat" exact component={Chat} />
  </BrowserRouter>
);

export default App;