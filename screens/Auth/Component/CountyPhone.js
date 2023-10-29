import React, { useState } from "react";
import { Dimensions, ImageBackground, View, StyleSheet, TouchableOpacity } from "react-native";
import { Block, Text } from "../../../components";
const { height, width } = Dimensions.get('window');
import CountryPicker from 'react-native-country-picker-modal'
import { Button } from "react-native-paper";
import { COLORS, SIZES } from "../../../constants";
import { MaterialIcons } from "@expo/vector-icons";

const CountyPhone = () => {
    const [countryCode, setCountryCode] = useState('FR');
    const [country, setCountry] = useState({"callingCode": ["243"], "cca2": "CD", "currency": ["CDF"], "flag": "flag-cd", "name": "DR Congo", "region": "Africa", "subregion": "Middle Africa"})
    const [withCountryNameButton, setWithCountryNameButton] = useState(
        false,
    )
    const [withFlag, setWithFlag] = useState(true)
    const [withEmoji, setWithEmoji] = useState(true)
    const [withFilter, setWithFilter] = useState(true)
    const [withAlphaFilter, setWithAlphaFilter] = useState(false)
    const [withCallingCode, setWithCallingCode] = useState(false)
    const [withModal, setWithModal] = useState(true);
    const [visible, setVisible] = useState(false);
    const onSelect = (country) => {
        setCountryCode(country.cca2)
        setCountry(country)
        console.log(country);
    }
    const switchVisible = () => setVisible(!visible);


    return <Block>
        <ImageBackground
            style={{ flex: 1, position: 'absolute', height, width }}
            source={require('./../../../assets/login1_bg.png')}
            blurRadius={10}
        ></ImageBackground>

        <Block center middle style={styles.m_5}>
            <Text bold h2>Votre numéro de téléphone</Text>
            <Text center>Veuillez confirmer votre code pays et saisir votre numéro de téléphone</Text>
            <TouchableOpacity style={styles.customInput}  onPress={switchVisible}>
                <View  style={styles.insideCustomInput}>
                <CountryPicker
                    {...{
                        countryCode,
                        withFilter,
                        withFlag,
                        withCountryNameButton,
                        withAlphaFilter,
                        withCallingCode,
                        withEmoji,
                        onSelect,
                        withModal,
                        preferredCountries: ['CD'],
                        modalProps: { visible },
                        onClose: () => setVisible(false),
                        onOpen: () => setVisible(true),
                    }}
                    visible
                />

                <Text>{country.name}</Text>
                </View>
                
                <MaterialIcons color={COLORS.darkgray} size={SIZES.base * 3} 
                name={'arrow-forward'}  />

            </TouchableOpacity>


        </Block>
    </Block>
}


const styles = StyleSheet.create({
    customInput: {
        borderColor: COLORS.darkgray,
        borderWidth: 1,
        width: '100%',
        padding: 8,
        borderRadius: 8,
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        justifyContent: 'space-between'
    },
    m_5: {
        margin: 30
    },
    insideCustomInput: {
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }

});


export default CountyPhone;
