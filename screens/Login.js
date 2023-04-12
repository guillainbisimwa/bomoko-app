import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  ActivityIndicator,
  StyleSheet,
  Text as text2,
  View,
  Image,
} from 'react-native';
import { Button, Block, Input, Text } from '../components';
import { COLORS, icons, SIZES } from '../constants';

const Login = () => {
  const [loading, setLoading] = useState(false);
  //const [errors, setErrors] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [load, setLoad] = useState(false);

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  return (
    <KeyboardAvoidingView style={styles.login}>
      <Block flex={1} color="white" animated>
        <Block flex={1}>
          <Block flex={1} center middle>
            <Image style={styles.logo} source={icons.app_icon} />
            <Text primary h1 bold center>
              SE CONNECTER
            </Text>
          </Block>
        </Block>
        <Block flex={2} style={styles.center}>
          <Input
            placeholder="Email"
            error={errors.email}
            defaultValue={email}
            onChangeText={(text) => setEmail(text)}
            style={[styles.input]}
          />

          <Input
            secure
            placeholder="Password"
            error={errors.password}
            defaultValue={password}
            onChangeText={(text) => setPassword(text)}
            style={[styles.input, styles.mt]}
          />
          <Block style={styles.mt}>
            <Button color="#db7020" round>
              <Text white bold h4 center>
                Connexion
              </Text>
            </Button>
          </Block>
          <Block center>
            <Button color="white">
              <Text grey caption center style={{ textDecorationLine: 'underline' }}>
                Besoin d'un compte?
              </Text>
            </Button>
            {loading ? <ActivityIndicator size="large" color={COLORS.secondary} /> : <></>}
          </Block>
        </Block>
        <Block center>
          <Button color="white">
            <Text grey caption center style={{ textDecorationLine: 'underline' }}>
              Mots de passe oublie?
            </Text>
          </Button>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: SIZES.padding * 2,
  },
  hasErrors: {
    borderBottomColor: COLORS.purple,
  },
  login: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 80,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: COLORS.white,
  },
  logo: {
    height: 50,
    width: 50,
    marginBottom: 20,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mt: {
    marginTop: 35,
  },
  center: {
    margin: 35,
  },
});

export default Login;
