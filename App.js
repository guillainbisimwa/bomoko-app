import 'react-native-gesture-handler';
import React from 'react';
import { store } from './redux/Store';
import { Provider } from 'react-redux';
import Routes from './Routes';

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
