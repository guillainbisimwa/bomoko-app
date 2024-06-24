import React, { useEffect, useRef, useState } from 'react';
import { Alert, View, StyleSheet, ImageBackground, Dimensions, ScrollView, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Button, TextInput, } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
import { encode } from 'base-64'; // Import the encode function from base-64
import qs from 'qs';
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
import axios from 'axios';
import { GenerateOTPCode } from '../../../constants/generateReferenceCode';
import { BASE_URL } from '../../../constants/utils';


const { width, height } = Dimensions.get('window');

export const ForgetPassword = ({ navigation }) => {

  const phoneInput = useRef(null);

  const { error, isLoading, success, user } = useSelector((state) => state.user);

  const [value, setValue] = useState("");
  const [valid, setValid] = useState(false);
  const [formattedValue, setFormattedValue] = useState("");

  const [load, setLoad] = useState(false);
  const [tokenOrange, setTokenOrange] = useState('');

    

  const sendCode = async (userData) => {

    try {
      console.log(process.env.ACCOUNT_SID);
      console.log(process.env.AUTH_TOKEN);
      const accountSid = process.env.ACCOUNT_SID;
      const authToken = process.env.AUTH_TOKEN;
      const serviceSid = process.env.SERVICE_SID
      const sid = process.env.SERVICE_SID
      const otp = GenerateOTPCode();
      const customEndpoint = `${process.env.TWILIO}`;


      const requestData = {
        customFriendlyName: 'Afintech',
        To: formattedValue, // Add the phone number you want to send the verification code to
        Channel: 'sms',
        From: '+15067132942',
        // From: '+243891979018',
        Body: `Bonjour, bienvenue sur AFINTECH. Votre code de validation est ${otp}. www.afrintech.org`
      };

      const base64Credentials = encode(`${accountSid}:${authToken}`);
      const authHeader = {
        Authorization: `Basic ${base64Credentials}`,
      };

      const response = await axios.post(customEndpoint,
        qs.stringify(requestData), { headers: authHeader });

      console.log('Verification request sent successfully:', response.data);
      setLoad(false)

       navigation.navigate('OTP', {
          number: formattedValue,
          type: 'reinit',
          otpCode: otp,
          userData
      })

    } catch (error) {
      setLoad(false)
      console.error('Error sending verification request:', error.response ? error.response.data : error.message);
      Toast.error('Service des SMS indisponible', 'bottom')
    }
  };

  const getUserByMobile = async (mobileNumber) => {
    try {
      const response = await axios.get(`${BASE_URL}auth/mobile/${encodeURIComponent(mobileNumber)}`);
      const userData = response.data;

      // Handle the user data or set state as needed
      // For example, you can set a state with the user data
      // setState(userData);

      return userData; // You can modify this to return the necessary data
    } catch (error) {
      // Handle errors, e.g., log or set an error state
      console.error('Error fetching user data:', error.message);
      throw error; // Propagate the error if needed
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
              source={require('./../../../assets/json/animation_lks5k3jp.json')}
              autoPlay
              loop
            />
            <Block margin={[0, 0, 20, 0]}>
              <Text white bold h2>Mot de passe oublié?</Text>
              <Text white>
                Ne vous inquiétez pas, cela peut arriver ! Entrez votre numéro de téléphone et recevez un code
              </Text>
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
                borderColor: valid ? COLORS.darkgreen : "transparent",
                borderWidth: 2,
                width: '100%'
              }}
            />

            <Block style={{ marginTop: 15, marginBottom: 20 }} flex={1} row center space="between">


              <Button  mode="contained"  loading={load} disabled={!!load}
                onPress={async () => {
                  setLoad(true);
                  Keyboard.dismiss();

                  console.log("valid", valid);
                  console.log("formattedValue", formattedValue);
                  console.log("value", value);

                  if (valid) {

                    // Check internet connections
                    const netInfo = await NetInfo.fetch();
                    // console.log("netInfo.isConnected", netInfo.isConnected);
                    if (!netInfo.isConnected) {
                      Alert.alert("Pas de connexion Internet", "Veuillez vérifier votre connexion Internet et réessayer.");
                      return;
                    }

                    getUserByMobile(formattedValue)
                      .then(async(userData) => {

                        if (userData?.msg === "User not found!") {
                          Toast.warn('Numéro de téléphone non reconnu', 'bottom')
                        }
                        else {
                          sendCode(userData);
                         

                        }
                      })
                      .catch((error) => {
                        // Handle errors, e.g., show an error message
                        console.error('Error:', error.message);
                        Toast.warn('Verifier Votre internet', 'bottom')
                        setLoad(false)

                      });
                  }
                  else {
                    setLoad(false)
                    Toast.error('Numéro de téléphone incorrect', 'bottom');
                  }
                }} style={styles.button}>
                Reinitialiser
              </Button>
            </Block>

          </View>
        </Block>


      </ScrollView>
      <Block center>
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {
        }}>
          <Text style={{ color: COLORS.gray }}
            onPress={() => navigation.goBack()} > Avez-vous un compte? </Text>
          <Text bold style={{ color: COLORS.white }}
            onPress={() => navigation.goBack()} > se connecter</Text>
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
    width: '100%',
    padding: 5
  }
});
