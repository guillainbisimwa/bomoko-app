import React, { useEffect, useRef, useState } from 'react';
import { Alert, View, StyleSheet, ImageBackground, Dimensions, ScrollView, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Button, TextInput, } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";

import LottieView from 'lottie-react-native';
import { COLORS, FONTS } from '../../../constants';
import { loginUser } from '../../../redux/userSlice';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Container, { Toast } from 'toastify-react-native';
import PhoneInput from 'react-native-phone-number-input';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Block, Text } from '../../../components';

const { width, height } = Dimensions.get('window');

export const LoginForm = ({ navigation }) => {
  const dispatch = useDispatch();

  const phoneInput = useRef(null);

  const { error, isLoading, success, user } = useSelector((state) => state.user);

  const [value, setValue] = useState("");
  const [valid, setValid] = useState(false);
  const [formattedValue, setFormattedValue] = useState("");

  const [listenerError, setListenerError] = useState(false);

  const [phone, setPhone] = useState(''); //12345678
  const [password, setPassword] = useState('');//test2

  const [passwordError, setPasswordError] = useState(false);

  const navigationV2 = useNavigation();

  // Use useEffect or any other method to handle the success state and display the alert
  useEffect(() => {
    checkLoginStatus();
    if (error && !success && listenerError) {
      console.log("====>", error);
      // Toast.warn("Verifier votre internet!", 'bottom');

      Toast.error("Une erreur s'est produite", 'bottom');
      setValid(false);
      setPasswordError(true)

    }
  }, [success, error]);

  const hasErrorKey = (obj) => {
    return obj && typeof obj === 'object' && 'error' in obj;
  }

  const checkLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('user');

      //console.log('value-user', value);
      if (value !== null) {
        navigationV2.navigate('Main');
      } else {
        // Toast.error("Une erreur s'est produite!-", 'bottom')
        console.log("error", error);
        console.log("success", success);
      }
    } catch (error) {
      console.log('Error retrieving installation status:', error);
      Toast.error("Une erreur s'est produite!", 'bottom');
    }
  };

  const handleLogin = async () => {
    try {
      // Check internet connections
      Keyboard.dismiss();
      const netInfo = await NetInfo.fetch();
      // console.log("netInfo.isConnected", netInfo.isConnected);
      if (!netInfo.isConnected) {
        Alert.alert("Pas de connexion Internet", "Veuillez vérifier votre connexion Internet et réessayer.");
        return;
      }

      if (!password || !formattedValue) {
        // At least one of the required fields is missing
        // You can display an error message or take appropriate action
        console.log('Please fill in all required fields.');
        // Alert.alert("Attention", "Veuillez completer tous les champs et réessayer.");
        Toast.error('Veuillez completer tous les champs', 'bottom');
        // setValid(false);
        setPasswordError(true);
      } else {
        if (!valid) {
          //setValid(false);
          Toast.error('Numéro de téléphone incorrect', 'bottom')
          return
        } else {
          //setValid(false);
        }

        if (password.length < 3 || password.length > 20) {
          setPasswordError(true);
          Toast.error('Mots de passe invalide', 'bottom')
          return
        } else {
          setPasswordError(false);
        }

        // Handle login functionality
        dispatch(loginUser({ mobile: formattedValue, password })).then((data) => {
          console.log('data', data);
          if (hasErrorKey(data)) {
            Toast.error("Une erreur s'est produite!!", 'bottom');
          }

        }).catch((err) => {
          Toast.error("Une erreur s'est produite!", 'bottom');
          console.log('err', err);
        })
        // console.log('--->>>>>>',signUpResult);
        // console.log('------------------------------------------');
        // Handle login functionality
        // setListenerError()
        // if (error) {
        //   // SignUp successful, now dispatch login
        //   // dispatch(loginUser({ mobile, password }));
        //   // await navigation.navigate('Main');
        //   Toast.error("Une erreur s'est produite!!", 'bottom');

        // } else {
        //   // Handle signUp failure if needed
        //   setPasswordError(true);
        //   Toast.error("Une erreur s'est produite!!", 'bottom');
        // }
      }

    } catch (error) {
      // Alert.alert("Attention", "Error occurred during login.");
      Toast.error("Une erreur s'est produite", 'bottom')
      console.error("Error occurred during login:", error);
    }
  };

  return (

    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1, position: "absolute", height, width }}
        source={require('./../../../assets/login1_bg.png')}
        blurRadius={10}
      ></ImageBackground>
      <Container position="top" style={{ width: '100%' }} duration={6000} />

      <ScrollView >
        <Block style={styles.m_5}>

          <View>
            <LottieView
              style={styles.animation}
              source={require('./../../../assets/json/lf30_kj1v7uim.json')}
              autoPlay
              loop
            />
            <Block center margin={[0, 0, 20, 0]}>
              <Text white bold h2>CONNECTER</Text>
            </Block>

            <PhoneInput
              ref={phoneInput}
              defaultValue={value}
              defaultCode="CD"
              layout="first"
              onChangeText={(text) => {
                const checkValid = phoneInput.current?.isValidNumber(text);
                setValid(checkValid ? checkValid : false);
                setValue(text);
                // setLoad(false)
              }}
              onChangeFormattedText={(text) => {
                setFormattedValue(text);
              }}
              containerStyle={{
                borderColor: !valid ? COLORS.peach : "transparent",
                borderWidth: 2,
                width: '100%'
              }}
            />

            <TextInput
              label="Mots de passe"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              error={passwordError}
            />

            <Block row right >
              <Text >

                <TouchableOpacity>
                  <Text color={COLORS.gray}> Mot de passe oublié?</Text></TouchableOpacity>
              </Text>
            </Block>


            <Block style={{ marginTop: 15, marginBottom: 20 }} flex={1} row center space="between">


              <Button disabled={isLoading} mode="contained" loading={isLoading}
                onPress={handleLogin} style={styles.button}>
                Se connecter
              </Button>
            </Block>

          </View>
        </Block>


      </ScrollView>
      <Block center>
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {
        }}>
          <Text style={{ color: COLORS.gray }}
            onPress={() => navigation.goBack()} > Nouveau utilisateur? </Text>
          <Text bold style={{ color: COLORS.white }}
            onPress={() => navigation.goBack()} > s'enregistrer</Text>
        </TouchableOpacity>
      </Block>

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainCon: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    height: '200%',
    width,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  animation: {
    width: 300,
    height: 300,
  },
  input: {
    //width: '80%',
    marginTop: 15,
    marginBottom: 10,
  },

  m_5: {
    marginLeft: 30,
    marginRight: 30,
  },
  btnContainer: {
    //flex:2,
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  circularButton: {
    padding: 2,
  },
  button: {
    width: '100%'
  }
});
