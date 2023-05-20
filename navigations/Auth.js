import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AuthScreen } from '../screens/AuthScreen/AuthScreen';
import { LoginScreen } from '../screens/LoginScreen/LoginScreen';

const MyStack = createNativeStackNavigator();

const Auth = () => {
  return (
    <NavigationContainer>
      <MyStack.Navigator initialRouteName="AuthScreen" screenOptions={{ headerShown: false }}>
        <MyStack.Screen name="AuthScreen" component={AuthScreen} />
        <MyStack.Screen name="LoginScreen" component={LoginScreen} />
      </MyStack.Navigator>
    </NavigationContainer>
  );
};

export default Auth;
