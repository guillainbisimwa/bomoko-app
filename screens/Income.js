import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Text } from '../components';
import { AuthScreen } from './AuthScreen/AuthScreen';
import { LoginScreen } from './LoginScreen/LoginScreen';

const Income = ({ navigation }) => {
  const user = useSelector((state) => state.user);

  if (!user?.token) {
    return <LoginScreen />;
  }
  return (
    <View>
      <Text> Income</Text>
    </View>
  );
};

export default Income;
