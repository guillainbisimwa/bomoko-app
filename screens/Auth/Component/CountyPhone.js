import React, { useRef, useState } from "react";
import {
    Dimensions,
    ImageBackground,
    View,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    ToastAndroid,
} from "react-native";
import { Block, Text } from "../../../components";
const { height, width } = Dimensions.get("window");
import { Button } from "react-native-paper";
import PhoneInput from "react-native-phone-number-input";
import { COLORS, SIZES } from "../../../constants";
import axios from "axios";
import { encode } from 'base-64'; // Import the encode function from base-64
import qs from 'qs';
import Config from "react-native-config";
import Container, { Toast } from 'toastify-react-native';
import NetInfo from "@react-native-community/netinfo";
import { GenerateOTPCode } from "../../../constants/generateReferenceCode";


const CountyPhone = ({ navigation }) => {
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [load, setLoad] = useState(false);
    const phoneInput = useRef(null);

    async function getToken(formattedValue, otp, userData) {
        const tokenOrangeSms = process.env.TOKEN_ORANGE_SMS;

        const credentials = tokenOrangeSms;
        const url = 'https://api.orange.com/oauth/v3/token';

        try {
            const response = await axios.post(
                url,
                'grant_type=client_credentials',
                {
                    headers: {
                        'Authorization': `Basic ${credentials}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            const result = await response.data;
            console.log('Access Token:', result);
            // setTokenOrange(result.access_token);
            await send(formattedValue, `Bonjour, bienvenue sur AFINTECH. Votre code de validation est ${otp}. www.afrintech.org`, otp,  userData, result.access_token);

        } catch (error) {
            setLoad(false)
            Toast.error(`Service des SMS indisponible`, 'bottom');
            ToastAndroid.show(`Service des SMS indisponible ${error}`, ToastAndroid.LONG);

            console.error('Error getting access token:', error);
        }
    }

    async function send(receiver, message, otp, userData, token) {
        const receiverAddress = "tel:" + receiver;
        const senderAddress = "tel:+243891979018"; // Replace with your actual sender address
        const credentials = `Bearer ${token}`; // Replace with your actual access token
      
        const headers = {
          'Authorization': credentials,
          'Content-Type': 'application/json'
        };
      
        const body = {
          outboundSMSMessageRequest: {
            address: receiverAddress,
            senderAddress: senderAddress,
            senderName: "Afintech",
            outboundSMSTextMessage: {
              message: message
            }
          }
        };
      
        const url = 'https://api.orange.com/smsmessaging/v1/outbound/' + encodeURIComponent(senderAddress) + '/requests';
      
        await axios.post(url, body, { headers: headers })
          .then(response => {
            if (response.status === 201) {
                console.log();
                console.log();
                console.log('sent', response);
                console.log();
                console.log();
                setLoad(false)
                navigation.navigate('OTP', {
                    number: formattedValue,
                    type: 'account',
                    otpCode: otp,
                    userData
                })

            } else {
                console.log();
                console.log();

                console.log('contractsB');
                console.log();
                console.log();

            }
          })
          .catch(error => {

            setLoad(false)
            Toast.error(`Service des SMS indisponible`, 'bottom')
            ToastAndroid.show(`Service des SMS indisponible ${error}`, ToastAndroid.LONG);

        
            console.error('Error sending SMS:', error);
            console.log();
            console.log();

            // res.render('contractsB');
          });
      }
      

    const sendCode = async (userData) => {

        try {
            console.log(process.env.ACCOUNT_SID);
            console.log(process.env.AUTH_TOKEN);
            const accountSid = process.env.ACCOUNT_SID;
            const authToken = process.env.AUTH_TOKEN;
            const serviceSid = process.env.SERVICE_SID
            const otp = GenerateOTPCode();
            const customEndpoint = `https://verify.twilio.com/v2/Services/${serviceSid}/Verifications`;
            // const customEndpoint = 'https://api.twilio.com/2010-04-01/Accounts/ACbd9d562b452a2c62459200227432468e/Messages.json'

            const requestData = {
                customFriendlyName: 'Afintech',
                To: formattedValue, // Add the phone number you want to send the verification code to
                Channel: 'sms',
                // From: '+13343758571',
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
        console.log("userData: ");

        try {
            const response = await axios.get(`https://bomoko-backend.onrender.com/auth/mobile/${encodeURIComponent(mobileNumber)}`);
            const userData = response.data;

            // Handle the user data or set state as needed
            // For example, you can set a state with the user data
            // setState(userData);
            console.log("userData",userData);

            return userData; // You can modify this to return the necessary data
        } catch (error) {
            // Handle errors, e.g., log or set an error state
            console.error('Error fetching user data:', error.message);
            throw error; // Propagate the error if needed
        }
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.mainCon}
        >
            <ImageBackground
                style={{ flex: 1, position: "absolute", height, width }}
                source={require("./../../../assets/login1_bg.png")}
                blurRadius={10}
            ></ImageBackground>

            <View style={styles.container}>
                <Container position="top" style={{ width: '100%' }} duration={6000} />

                <Block middle style={styles.m_5}>
                    <Text center bold h2>
                        Votre numéro de téléphone
                    </Text>
                    <Text style={styles.input} center>
                        Veuillez confirmer votre code pays et saisir votre numéro de
                        téléphone
                    </Text>

                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={value}
                        defaultCode="CD"
                        layout="first"
                        onChangeText={(text) => {
                            const checkValid = phoneInput.current?.isValidNumber(text);
                            setValid(checkValid ? checkValid : false);
                            setValue(text);
                            setLoad(false)
                        }}
                        onChangeFormattedText={(text) => {
                            setFormattedValue(text);
                        }}
                        containerStyle={{
                            borderColor: !valid ? COLORS.peach : "transparent",
                            borderWidth: 2,
                        }}
                    />
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text bold color={COLORS.white}>
                                Annuler
                            </Text>
                        </TouchableOpacity>

                        <Button
                            loading={load}
                            disabled={!!load}
                            style={styles.circularButton}
                            icon="arrow-right"
                            mode="contained"
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
                                        .then(async (userData) => {

                                            if (userData?.msg === "User not found!") {
                                                // Toast.success('Numéro de téléphone correct', 'bottom')
                                                // addNumberToTwillo();
                                                // sendCode();
                                                const otp = GenerateOTPCode();

                                                await getToken(formattedValue, otp, userData);
                                                // await send(formattedValue, `Bonjour, bienvenue sur AFINTECH. Votre code de validation est ${otp}. www.afrintech.org`, otp,  userData);
            
                                                // console.log('User data:', userData);
                                            }
                                            else {
                                                Toast.warn('Numéro de téléphone existe', 'bottom')
                                                console.log(userData, "exists");
                                                setLoad(false)
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
                            }}
                        >
                            Suivant
                        </Button>
                    </View>
                </Block>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    mainCon: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    m_5: {
        margin: 30,
    },
    input: {
        marginTop: 5,
        marginBottom: 15,
    },
    btnContainer: {
        marginTop: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

export default CountyPhone;
