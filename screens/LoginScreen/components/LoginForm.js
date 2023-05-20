import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Button, TextInput, RadioButton, Text, Menu, Divider } from 'react-native-paper';

import LottieView from 'lottie-react-native';

const { height, width } = Dimensions.get('window');

export const LoginForm = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [sex, setSex] = useState('male');
  const [birthDate, setBirthDate] = useState('');
  const [state, setState] = useState('');
  const [stateMenuVisible, setStateMenuVisible] = useState(false);

  const handleLogin = () => {
    // Handle login functionality
  };

  const toggleStateMenu = () => {
    setStateMenuVisible(!stateMenuVisible);
  };

  const selectState = (selectedState) => {
    setState(selectedState);
    setStateMenuVisible(false);
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
        <TextInput label="Nom" value={name} onChangeText={setName} style={styles.input} />
        <TextInput label="Telephone" value={phone} onChangeText={setPhone} style={styles.input} />
        <TextInput
          label="Mots de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        {/* <Text style={styles.label}>Sex:</Text> */}
        {/* <View style={styles.radioButtonsContainer}>
          <RadioButton
            value="male"
            status={sex === 'male' ? 'checked' : 'unchecked'}
            onPress={() => setSex('male')}
          />
          <Text style={styles.radioButtonText}>Male</Text>
          <RadioButton
            value="female"
            status={sex === 'female' ? 'checked' : 'unchecked'}
            onPress={() => setSex('female')}
          />
          <Text style={styles.radioButtonText}>Female</Text>
        </View> */}
        {/* <TextInput
          label="Birth Date"
          value={birthDate}
          onChangeText={setBirthDate}
          style={styles.input}
        /> */}
        {/* <Menu
          visible={stateMenuVisible}
          onDismiss={toggleStateMenu}
          anchor={
            <TextInput
              label="State"
              value={state}
              onTouchStart={toggleStateMenu}
              style={styles.input}
            />
          }
        >
          <Menu.Item onPress={() => selectState('New York')} title="New York" />
          <Menu.Item onPress={() => selectState('California')} title="California" />
          <Menu.Item onPress={() => selectState('Texas')} title="Texas" />
        </Menu> */}
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Login
        </Button>
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
    width: '70%',
  },
});
