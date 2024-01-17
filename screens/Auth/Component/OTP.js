import React, { useRef, useState } from "react";
import {
    Dimensions,
    ImageBackground,
    View,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Block, Text } from "../../../components";
const { height, width } = Dimensions.get("window");
import { Button } from "react-native-paper";
import { COLORS, SIZES } from "../../../constants";
import OTPTextInput from "react-native-otp-textinput";
import Container, { Toast } from 'toastify-react-native';


const OTP = ({ navigation, route }) => {
    const [code, setCode] = useState('');

    const { number, type, otpCode, userData } = route.params;
    console.log("userData", otpCode);

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
                        Verification
                    </Text>
                    <Text style={{ color: 'red' }} center>
                        code test: 0000
                    </Text>
                    <Text style={styles.input} center>
                        Merci de confirmer le code de validation envoyé au {number}
                    </Text>

                    <OTPTextInput
                        textInputStyle={{ borderWidth: 1, color: !code == '0000' ? COLORS.peach : COLORS.darkgreen }}
                        handleTextChange={setCode}
                        inputCount={4}
                        inputCellLength={1}
                        tintColor={COLORS.black}
                        keyboardType="numeric"

                    />


                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text bold color={COLORS.white}>
                                Annuler
                            </Text>
                        </TouchableOpacity>

                        {
                            type == 'account' ?
                                <Button
                                    style={styles.circularButton}
                                    icon="arrow-right"
                                    mode="contained"
                                    onPress={() => {
                                        if (code === otpCode) {
                                            setCode('')
                                            navigation.navigate('Account', {
                                                number: number,
                                                code: otpCode
                                            });
                                        }
                                    }}
                                >
                                    Suivant
                                </Button> :

                                <Button
                                    style={styles.circularButton}
                                    icon="arrow-right"
                                    mode="contained"
                                    onPress={() => {

                                        console.log("code", code);
                                        if (code === otpCode) {
                                            setCode('')
                                            console.log('reinit')
                                            navigation.navigate('ResetPasswordProfile', { user: userData})
                                        }else{
                                            Toast.error('Code invalide', 'top')
                                        }
                                    }}
                                >
                                    Suivant
                                </Button>

                        }


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
        marginTop: 100
    },
    m_5: {
        margin: 30,
    },
    input: {
        marginTop: 5,
        marginBottom: 35,
    },
    btnContainer: {
        marginTop: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

export default OTP;
