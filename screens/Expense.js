import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Text } from '../components';
import { AuthScreen } from './AuthScreen/AuthScreen';
import { LoginScreen } from './LoginScreen/LoginScreen';

const Expense = ({ navigation }) => {
  const user = useSelector((state) => state.user);

  if (!user?.token) {
    return <LoginScreen />;
  }
  return (
    <View>
      <Text> Expense</Text>
    </View>
  );
};

export default Expense;
