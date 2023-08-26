import React from 'react';
import { View, StyleSheet} from 'react-native';
import { EditProfileForm } from './components';

export const EditProfile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <EditProfileForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
