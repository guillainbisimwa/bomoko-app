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

import { Button, Icon, Input } from '../../components';
import { Images, nowTheme } from '../../constants';


const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

const Reset = () => {
    const [code, setCode] = useState("");

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

                                            <Block flex={1} middle space="between">
                                                <Block center flex={0.9}>
                                                    <Block flex space="between">
                                                        <Block>
                                                            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                                                                <Input
                                                                    type="phone-pad"
                                                                    placeholder="Code"
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


                                                        </Block>
                                                        <Block center>
                                                            <Button color="primary" round style={styles.createButton}
                                                                loading={isloading}
                                                                onPress={this.submitReset.bind(this)}
                                                            >
                                                                <Text
                                                                    style={{ fontFamily: 'montserrat-bold' }}
                                                                    size={14}
                                                                    color={nowTheme.COLORS.WHITE}
                                                                >
                                                                    Valider
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

    inputIcons: {
        marginRight: 12,
        color: nowTheme.COLORS.ICON_INPUT
    },
    inputs: {
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 21.5
    },

    createButton: {
        width: width * 0.5,
        marginTop: 25,
        marginBottom: 40
    },

});

export default Reset;
