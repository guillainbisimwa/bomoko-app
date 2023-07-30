import React from 'react';
import { View, StyleSheet} from 'react-native';
//Components
import { LoginForm } from './components';

export const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LoginForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
