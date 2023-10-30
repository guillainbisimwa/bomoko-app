import React, { useRef, useState } from "react";
import { Dimensions, ImageBackground, View, StyleSheet, TouchableOpacity } from "react-native";
import { Block, Text } from "../../../components";
const { height, width } = Dimensions.get('window');
import { Button, TextInput } from "react-native-paper";
import { COLORS, SIZES } from "../../../constants";
import PhoneInput from "react-native-phone-number-input";


const CountyPhone = () => {
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);

    return <Block>
        <ImageBackground
            style={{ flex: 1, position: 'absolute', height, width }}
            source={require('./../../../assets/login1_bg.png')}
            blurRadius={10}
        ></ImageBackground>

        <Block center middle style={styles.m_5}>
            <Text bold h2>Votre numéro de téléphone</Text>
            <Text style={styles.input} center>Veuillez confirmer votre code pays et saisir votre numéro de téléphone</Text>

            {showMessage && (
                <View style={styles.message}>
                    <Text>Value : {value}</Text>
                    <Text>Formatted Value : {formattedValue}</Text>
                    <Text>Valid : {valid ? "true" : "false"}</Text>
                </View>
            )}
            <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="CD"
                layout="first"
                onChangeText={(text) => {
                    setValue(text);
                }}
                onChangeFormattedText={(text) => {
                    setFormattedValue(text);
                }}
                // withDarkTheme
                withShadow
                autoFocus
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    const checkValid = phoneInput.current?.isValidNumber(value);
                    setShowMessage(true);
                    setValid(checkValid ? checkValid : false);
                }}
            >
                <Text>Check</Text>
            </TouchableOpacity>
        </Block>
    </Block>
}


const styles = StyleSheet.create({
    m_5: {
        margin: 30,
    },
    input: {
        marginTop: 5,
        marginBottom: 15,

    },
});


export default CountyPhone;
