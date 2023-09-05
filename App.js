import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native'; // Add this import
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

AppRegistry.registerComponent('African Fintech', () => App); // Add this line

export default App;
