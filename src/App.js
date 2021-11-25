import React from 'react';
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import Home from './screens/Home';

function App() {
  return (
    <Provider store={Store}>
      <Home />
    </Provider>
  )
}

export default App;
