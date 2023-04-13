import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Income, Login } from '../screens';
import Tabs from './Tab';

const MyStack = createNativeStackNavigator();

const Auth = () => {
  return (
    <NavigationContainer>
      <MyStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <MyStack.Screen name="Login" component={Login} />
        <MyStack.Screen name="Tab" component={Tabs} />
        {/* <MyStack.Screen name="Income" component={Income} /> */}
      </MyStack.Navigator>
    </NavigationContainer>
  );
};

export default Auth;
