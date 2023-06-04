import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
//Icon
import LottieView from 'lottie-react-native';
//PropTypes check
import PropTypes from 'prop-types';
import { COLORS } from '../../../constants';

const { height, width } = Dimensions.get('window');

export const AuthBody = ({}) => {
  return (
    <>
      <ImageBackground
        style={{ flex: 1, position: 'absolute', height, width }}
        source={require('./../../../assets/login1_bg.png')}
        blurRadius={10}
      ></ImageBackground>
      <View
        style={{
          position: 'absolute',
          top: 100,
          backgroundColor: '#fff',
          borderRadius: 50,
          elevation: 5,
        }}
      >
        <Image style={styles.logo} source={require('./../../../assets/img/logo1.png')} />
      </View>
      <LottieView
        source={require('./../../../assets/json/welcome.json')}
        autoPlay
        loop
        resizeMode="contain"
        style={{ height: 195 }}
      />
      <TouchableOpacity>
        <View style={styles.signinContainer}>
          <Text style={styles.text}>SE CONNECTER</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={[
            styles.signinContainer,
            {
              backgroundColor: COLORS.primary,
              marginTop: 15,
              borderWidth: 0,
            },
          ]}
        >
          <Text style={[styles.text, { color: '#ffffff' }]}>CREER UN COMPTE</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

AuthBody.propTypes = {
  //navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  signinContainer: {
    height: 60,
    width: width - 40,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.darkgreen,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
  logo: {
    resizeMode: 'contain',
    width: 250,
    height: 100,
  },
});
