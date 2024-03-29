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
import { COLORS, FONTS } from '../../../constants';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

export const AuthBody = ({navigation}) => {
  const navigationV2 = useNavigation();
  return (
    <>
      <ImageBackground
        style={{ flex: 1, position: 'absolute', height, width }}
        source={require('./../../../assets/login1_bg.png')}
        blurRadius={10}
      ></ImageBackground>
      
      <LottieView
        source={require('./../../../assets/json/welcome.json')}
        autoPlay
        loop
        resizeMode="contain"
        style={{ height: 195 }}
      />
      <TouchableOpacity onPress={()=> navigation.navigate('LoginScreen')} >
        <View style={styles.signinContainer}>
          <Text style={styles.text}>SE CONNECTER</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity  onPress={()=> navigation.navigate('CountyPhone')}  >
      {/* SignUpScreen */}
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
      <Text style={{ marginVertical: 20, color: COLORS.white, ...FONTS.h2}} 
      onPress={()=> navigationV2.navigate('Main')} > Retour</Text>
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
    height: 50,
  },
});
