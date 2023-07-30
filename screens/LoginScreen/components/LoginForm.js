import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Button, TextInput, RadioButton, Text, Menu, Divider } from 'react-native-paper';

import LottieView from 'lottie-react-native';
import { COLORS, FONTS } from '../../../constants';

const { height, width } = Dimensions.get('window');

export const LoginForm = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
 
  const handleLogin = () => {
    // Handle login functionality
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('./../../../assets/login1_bg.png')}
        blurRadius={10}
      ></ImageBackground>
      <View style={styles.contentContainer}>
        <LottieView
          style={styles.animation}
          source={require('./../../../assets/json/lf30_kj1v7uim.json')}
          autoPlay
          loop
        />
        <TextInput keyboardType="phone-pad" label="Telephone" value={phone} onChangeText={setPhone} style={styles.input} />
        <TextInput
          label="Mots de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Login
        </Button>

        <Text style={{ marginVertical: 20, color: COLORS.white, ...FONTS.h2}} 
      onPress={()=> navigation.goBack()} > Retour</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    height,
    width,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 300,
    height: 300,
  },
  input: {
    width: '70%',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding:10,
    width: '70%',
  },
});
