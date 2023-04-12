import React from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { COLORS } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rounded: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 200,
    width: 200,
  },
  bg:{
    width: "100%",
    height: "100%",
  },
});

const InitialLoader = () => (
  <ImageBackground
      source={require('../assets/login1_bg.png')}
      style={styles.bg}>
  <View style={styles.container}>
    <View style={styles.rounded}>
      <Image source={require('../assets/app-icon.png')} style={styles.logo} />
      <ActivityIndicator animating color={COLORS.peach} />
    </View>
  </View>
</ImageBackground>

);

export default InitialLoader;
