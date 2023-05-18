import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { useFonts } from 'expo-font';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from './navigations/Tab';
import InitialLoader from './screens/InitialLoader';
import Onboard from './navigations/Onboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setInstalled } from './redux/appReducer';
import { LoginScreen } from './screens/LoginScreen/LoginScreen';
import { AuthScreen } from './screens/AuthScreen/AuthScreen';
import { resetAllCat } from './redux/catReducer';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};

const Stack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
    //AsyncStorage.clear();
    checkInstallationStatus();
    checkCategories();
  }, []);

  const checkInstallationStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('isInstalled');
      if (value !== null && value === 'true') {
        dispatch(setInstalled());
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log('Error retrieving installation status:', error);
      setLoading(false);
    }
  };

  const checkCategories = async () => {
    try {
      const value = await AsyncStorage.getItem('categories');
      console.log('----------', value);

      if (value !== null) {
        // dispatch(addCat(JSON.parse(value)));
        dispatch(resetAllCat(JSON.parse(value)));
      } else {
        // setLoading(false);
      }
    } catch (error) {
      console.log('Error retrieving categories status:', error);
      setLoading(false);
    }
  };

  const isInstalled = useSelector((state) => state.app.isInstalled);

  const [loaded] = useFonts({
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  if (loading) {
    return <InitialLoader />;
  }
  if (isInstalled) {
    return (
      <NavigationContainer theme={theme}>
        {/* <StatusBar barStyle=""></StatusBar> */}

        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'Tab'}
        >
          <Stack.Screen name="Tab" component={Tabs} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (!isInstalled) {
    return <Onboard />;
  }
  return <InitialLoader />;
};

export default App;
