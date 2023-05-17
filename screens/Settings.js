import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { AuthScreen } from './AuthScreen/AuthScreen';

const Settings = ({ navigation }) => {
  const user = useSelector((state) => state.user);

  if (!user?.token) {
    return <AuthScreen />;
  }
  return (
    <View>
      <Text> Settings</Text>
    </View>
  );
};

export default Settings;
