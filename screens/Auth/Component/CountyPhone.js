import React, { useState } from "react";
import { Dimensions, ImageBackground, View, StyleSheet } from "react-native";
import { Block, Text } from "../../../components";
const { height, width } = Dimensions.get('window');
import CountryPicker from 'react-native-country-picker-modal'
import { Button } from "react-native-paper";
import { COLORS } from "../../../constants";


const CountyPhone = () => {
    const [countryCode, setCountryCode] = useState('FR');
    const [country, setCountry] = useState(null)
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
        console.log(country.callingCode);
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
            <View style={styles.customInput}>
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
                        modalProps: { visible },
                        onClose: () => setVisible(false),
                        onOpen: () => setVisible(true),
                    }}
                    visible
                />
            </View>


            <Button
                onPress={switchVisible}
            >Open modal from outside using visible props</Button>

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
    },
    m_5: {
        margin: 30
    }

});


export default CountyPhone;
