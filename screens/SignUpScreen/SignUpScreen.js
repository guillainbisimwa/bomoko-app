import React from 'react';
import { View, StyleSheet} from 'react-native';
//Components
import { SignUpForm } from './components';

export const SignUpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SignUpForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
