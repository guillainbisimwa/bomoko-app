import React, { useState } from 'react';
import {
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard,
    ToastAndroid,
    NetInfo,
    AsyncStorage,
    Alert,
    ScrollView
} from 'react-native';
import { Block, Text, Button as GaButton, theme, Checkbox } from 'galio-framework';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

const Login = () => {
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();
    const [phone_valid, setPhone_valid] = useState(true);
    const [password_valid, setPassword_valid] = useState(true);
    const [isloading, setIsloading] = useState(true);

    validatePassword(string) = () => {
        return string.trim().length > 5;
    }

    validatePassword_ = () => {
        var password = password;
        var password_valid = this.validatePassword(password);

        setPassword(password)
        setPassword_valid(password_valid)
    }

    validatePhone(string) = () => {
        return string.trim().length > 12;
    }

    validatePhone_ = () => {
        var phone = phone;
        var phone_valid = this.validatePhone(phone);

        setPhone(phone)
        setPhone_valid(phone_valid)
    }

    handleChangePhone = phone => setPhone(phone);
    handleChangePassword = password => setPassword(password);

    return (
        <DismissKeyboard>
            <Block flex middle>
                <ImageBackground
                    source={Images.RegisterBackground}
                    style={styles.imageBackgroundContainer}
                    imageStyle={styles.imageBackground}
                >
                    <Block flex middle>

                        <Block style={styles.registerContainer}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Block flex middle>


                                    <Block style={styles.registerContainer1}>
                                        <Block flex space="evenly">
                                            <Block flex={0.4} middle style={styles.socialConnect}>
                                                <Block flex={0.5} middle>
                                                    <Text
                                                        style={{
                                                            fontFamily: 'montserrat-regular',
                                                            textAlign: 'center',
                                                            marginTop: 20,
                                                            marginBottom: 15
                                                        }}
                                                        color="#333"
                                                        size={24}
                                                    >
                                                        Se connecter
                                                    </Text>
                                                </Block>

                                                <Block flex={0.5} row middle space="between" style={{ marginBottom: 18 }}>
                                                    <GaButton
                                                        round
                                                        loading={isloading}
                                                        onlyIcon
                                                        shadowless
                                                        icon="lock"
                                                        iconFamily="Font-Awesome"
                                                        iconColor={theme.COLORS.WHITE}
                                                        iconSize={theme.SIZES.BASE * 1.625}
                                                        color={nowTheme.COLORS.WARNING}
                                                        style={[styles.social, styles.shadow]}
                                                    />
                                                </Block>
                                            </Block>

                                            <Block flex={1} middle space="between">
                                                <Block center flex={0.9}>
                                                    <Block flex space="between">
                                                        <Block>
                                                            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                                                                <Input
                                                                    type="phone-pad"
                                                                    placeholder="Téléphone: +243111111111"
                                                                    style={[styles.inputs, {
                                                                        borderColor: phone_valid
                                                                            ? '#E3E3E3'
                                                                            : '#a11'
                                                                    }]}
                                                                    onChangeText={this.handleChangePhone}
                                                                    value={phone}
                                                                    iconContent={
                                                                        <Icon
                                                                            size={16}
                                                                            color="#ADB5BD"
                                                                            name="phone"
                                                                            family="Font-Awesome"
                                                                            style={styles.inputIcons}
                                                                        />
                                                                    }
                                                                />
                                                            </Block>
                                                            <Block width={width * 0.8}>
                                                                <Input
                                                                    style={[styles.inputs, {
                                                                        borderColor: password_valid
                                                                            ? '#E3E3E3'
                                                                            : '#a11'
                                                                    }]}
                                                                    onChangeText={this.handleChangePassword}
                                                                    value={password}
                                                                    placeholder="Mots de passe"
                                                                    password
                                                                    viewPass
                                                                    iconContent={
                                                                        <Icon
                                                                            size={16}
                                                                            color="#ADB5BD"
                                                                            name="key"
                                                                            family="Font-Awesome"
                                                                            style={styles.inputIcons}
                                                                        />
                                                                    }
                                                                />
                                                            </Block>
                                                            <Block
                                                                style={{ fontFamily: 'montserrat-regular', justifyContent: 'center', }}
                                                                row

                                                            >
                                                                <Text
                                                                    style={{
                                                                        fontFamily: 'montserrat-regular',
                                                                        textAlign: 'center'
                                                                    }}
                                                                    muted
                                                                    size={16}
                                                                >
                                                                    Etes-vous nouveau?
                                                                </Text>
                                                            </Block>
                                                            <Block
                                                                style={{ justifyContent: 'center' }}
                                                                row
                                                            >
                                                                <Text
                                                                    color="#506ddc"
                                                                    style={{
                                                                        fontFamily: 'montserrat-regular',
                                                                    }}
                                                                    muted
                                                                    size={16}
                                                                    onPress={() => navigation.navigate('Singin')}
                                                                >
                                                                    Creer votre compte ici
                                                                </Text>

                                                            </Block>
                                                        </Block>
                                                        <Block center>
                                                            <Button color="primary" round style={styles.createButton}
                                                                loading={isloading}
                                                                onPress={this.submitLogin.bind(this)}
                                                            >
                                                                <Text
                                                                    style={{ fontFamily: 'montserrat-bold' }}
                                                                    size={14}
                                                                    color={nowTheme.COLORS.WHITE}
                                                                >
                                                                    Se connecter
                                                                </Text>
                                                            </Button>
                                                        </Block>
                                                    </Block>
                                                </Block>
                                            </Block>
                                        </Block>
                                        <Block center
                                            style={{ justifyContent: 'center' }}
                                            row
                                        >
                                        </Block>
                                    </Block>
                                </Block>
                            </ScrollView>
                        </Block>
                    </Block>
                </ImageBackground>
                <KeyboardSpacer />
            </Block>
        </DismissKeyboard>
    );
}


const styles = StyleSheet.create({
    imageBackgroundContainer: {
        width: width,
        height: height,
        padding: 0,
        zIndex: 1
    },
    imageBackground: {
        width: width,
        height: height
    },
    registerContainer: {
        marginTop: 55,
        width: width * 0.9,
        height: height < 812 ? height * 0.8 : height * 0.8,
        backgroundColor: nowTheme.COLORS.WHITE,
        borderRadius: 4,
        shadowColor: nowTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1,
        overflow: 'hidden'
    },
    socialConnect: {
        backgroundColor: nowTheme.COLORS.WHITE
        // borderBottomWidth: StyleSheet.hairlineWidth,
        // borderColor: "rgba(136, 152, 170, 0.3)"
    },
    socialButtons: {
        width: 120,
        height: 40,
        backgroundColor: '#fff',
        shadowColor: nowTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1
    },
    socialTextButtons: {
        color: nowTheme.COLORS.PRIMARY,
        fontWeight: '800',
        fontSize: 14
    },
    inputIcons: {
        marginRight: 12,
        color: nowTheme.COLORS.ICON_INPUT
    },
    inputs: {
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 21.5
    },
    passwordCheck: {
        paddingLeft: 2,
        paddingTop: 6,
        paddingBottom: 15
    },
    createButton: {
        width: width * 0.5,
        marginTop: 25,
        marginBottom: 40
    },
    social: {
        width: theme.SIZES.BASE * 3.5,
        height: theme.SIZES.BASE * 3.5,
        borderRadius: theme.SIZES.BASE * 1.75,
        justifyContent: 'center',
        marginHorizontal: 10,
        elevation: 5
    }
});

export default Login;
