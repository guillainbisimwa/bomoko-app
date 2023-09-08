import React, { useEffect, useState } from 'react';
import { Alert, View, StyleSheet, ImageBackground, Dimensions,ScrollView, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput, Text, Snackbar, } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";

import LottieView from 'lottie-react-native';
import { COLORS, FONTS } from '../../../constants';
import { loginUser } from '../../../redux/userSlice';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export const LoginForm = ({ navigation }) => {
  const dispatch = useDispatch();

  const { error, isLoading, success, user } = useSelector((state) => state.user);

  const [phone, setPhone] = useState('12345678');
  const [password, setPassword] = useState('test2');

  const [visible, setVisible] = useState(false);
  
  const navigationV2 = useNavigation();

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  // Use useEffect or any other method to handle the success state and display the alert
    useEffect(() => {
      checkLoginStatus();
      if (error) {
        console.log(error);
        onToggleSnackBar()
      }
    }, [success, error]);

    const checkLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
  
        //console.log('value-user', value);
        if (value !== null) {
           navigationV2.navigate('Main');
        } else {
        }
      } catch (error) {
        console.log('Error retrieving installation status:', error);
      }
    };
    
const handleLogin = async () => {
  try {
    // Check internet connections
    const netInfo = await NetInfo.fetch();
    // console.log("netInfo.isConnected", netInfo.isConnected);
    if (!netInfo.isConnected) {
      Alert.alert("Pas de connexion Internet", "Veuillez vérifier votre connexion Internet et réessayer.");
      return;
    }

    // Handle login functionality
    dispatch(loginUser({mobile: phone, password}))
 
  } catch (error) {
    Alert.alert("Attention", "Error occurred during login.");

    console.error("Error occurred during login:", error);
  }
};


  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
        <TextInput error={error} keyboardType='phone-pad' label="Numéro de téléphone" value={phone} onChangeText={setPhone} style={styles.input} />
        <TextInput
          label="Mots de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          error={error}
        />
        {
          visible? <Text style={{color:COLORS.red}} >Mots de passe ou Numéro de téléphone invalide </Text>:<></>
        }
       
        <Button disabled={isLoading} mode="contained" loading={isLoading} onPress={handleLogin} style={styles.button}>
          Se connecter
        </Button>

        <Text style={{ marginVertical: 20, color: COLORS.white, ...FONTS.h2}} 
      onPress={()=> navigation.goBack()} > Retour</Text>

      </View>
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      style={{ backgroundColor: COLORS.peach}}
      wrapperStyle={{ bottom: 30 }}
    >
       Mots de passe ou Numéro de téléphone invalide
      </Snackbar>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    height:'200%',
    width,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '70%',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    //padding:10,
    width: '70%',
  },
});
