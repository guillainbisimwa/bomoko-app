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



const CountyPhone = ({ navigation }) => {
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [load, setLoad] = useState(false);
    const phoneInput = useRef(null);
    
    const sendCode = async () => {
        
        try {
            console.log(process.env.ACCOUNT_SID);
            console.log(process.env.AUTH_TOKEN);
            const accountSid = process.env.ACCOUNT_SID;
            const authToken = process.env.AUTH_TOKEN;
            const serviceSid = process.env.SERVICE_SID
    
            // const twilioEndpoint = `https://verify.twilio.com/v2/Services/${serviceSid}/Verifications`;
            const customEndpoint = 'https://api.twilio.com/2010-04-01/Accounts/ACbd9d562b452a2c62459200227432468e/Messages.json'
    
            const requestData = {
                // customFriendlyName: 'Afintech',
                To: formattedValue, // Add the phone number you want to send the verification code to
                //Channel: 'sms',
                From : '+13343758571',
                Body: 'Bonjour, bienvenue sur AFINTECH. Votre code de validation est 0000. www.afrintech.org'
            };
    
            const base64Credentials = encode(`${accountSid}:${authToken}`);
            const authHeader = {
                Authorization: `Basic ${base64Credentials}`,
            };
    
            const response = await axios.post(customEndpoint,  
                qs.stringify(requestData), { headers: authHeader });
    
            console.log('Verification request sent successfully:', response.data);
        } catch (error) {
            console.error('Error sending verification request:', error.response ? error.response.data : error.message);
        }
    };

    const getUserByMobile = async (mobileNumber) => {
        try {
          const response = await axios.get(`https://bomoko-backend.onrender.com/auth/mobile/${encodeURIComponent(mobileNumber)}`);
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
            <Container position="top"style={{width: '100%'}} duration={6000}/>

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
                            onPress={() => {
                                setLoad(true);
                                Keyboard.dismiss();

                                console.log("valid", valid);
                                console.log("formattedValue", formattedValue);
                                console.log("value", value);
                              
                                if (valid) {
                                    
                                    getUserByMobile(formattedValue)
                                    .then((userData) => {
                                        
                                        if (userData?.msg === "User not found!") {
                                            // Perform your action here
                                            Toast.success('Numéro de téléphone correct', 'bottom')

                                            sendCode();
                                            setLoad(false)
                                            navigation.navigate('OTP', {
                                                number: formattedValue,
                                                code: '0000'
                                            }) 
                                            console.log('User data:', userData);
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
                                    });
                                   
                                }
                                else{
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