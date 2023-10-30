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
import PhoneInput from "react-native-phone-number-input";
import { COLORS, SIZES } from "../../../constants";

const CountyPhone = ({ navigation }) => {
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);

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
                            setShowMessage(true);
                            setValid(checkValid ? checkValid : false);
                            setValue(text);
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
                            style={styles.circularButton}
                            icon="arrow-right"
                            mode="contained"
                            onPress={() => {
                                console.log("valid", valid);
                                console.log("formattedValue", formattedValue);
                                console.log("value", value);
                                if (valid) {
                                    navigation.navigate('Account', {
                                        number: formattedValue,
                                        code: '1234'
                                    }) 
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
