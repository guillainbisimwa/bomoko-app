import React, { useEffect, useState } from 'react';
import { Alert, View, StyleSheet, ImageBackground, Dimensions,ScrollView, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput, Text, ActivityIndicator, Snackbar, } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";

import LottieView from 'lottie-react-native';
import { COLORS, FONTS } from '../../../constants';
import { loginUser } from '../../../redux/userSlice';

const { height, width } = Dimensions.get('window');

export const LoginForm = ({ navigation }) => {
  const dispatch = useDispatch();

  const { error, isLoading, success, user } = useSelector((state) => state.user);

  const [name, setNom] = useState('');
  const [password, setPassword] = useState('');

  const [visible, setVisible] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);

  const onToggleSnackBarSuccess = () => setVisibleSuccess(!visibleSuccess);
  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  const onDismissSnackBarSuccess = () => setVisibleSuccess(false);

  // Use useEffect or any other method to handle the success state and display the alert
    useEffect(() => {
      if (success) {
        //Alert.alert("Success", "Login successful!");
        onToggleSnackBarSuccess();
        setTimeout(() => {
          navigation.goBack(null); // First go back
          navigation.goBack(null); // Second go back
        }
        , 2000);
       
      }
      if (error) {
        onToggleSnackBar()
      }
      
    }, [success, error]);

const handleLogin = async () => {
  try {
    // Check internet connections
    const netInfo = await NetInfo.fetch();
    // console.log("netInfo.isConnected", netInfo.isConnected);
    if (!netInfo.isConnected) {
      Alert.alert("No Internet Connection", "Please check your internet connection and try again.");
      return;
    }

    // Handle login functionality
    dispatch(loginUser({username:name, password}))
    //dispatch(loginUser({username:"bvenceslas", password: "1234567890"}))
 
  } catch (error) {
    Alert.alert("Attention", "Error occurred during login.");

    console.error("Error occurred during login:", error);
  }
};


  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={{}}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('./../../../assets/login1_bg.png')}
        blurRadius={10}
      ></ImageBackground>
      <View style={styles.contentContainer}>
        <LottieView
          style={styles.animation}
          source={require('./../../../assets/json/lf30_kj1v7uim.json')}
          autoPlay
          loop
        />
        <TextInput error={error} keyboardType="default" label="Nom d'utilisateur" value={name} onChangeText={setNom} style={styles.input} />
        <TextInput
          label="Mots de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          error={error}
        />
          <ActivityIndicator  animating={isLoading} color={COLORS.red} />

        
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Login
        </Button>

        <Text style={{ marginVertical: 20, color: COLORS.white, ...FONTS.h2}} 
      onPress={()=> navigation.goBack()} > Retour</Text>

      
      </View>
    </View>
    <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{ backgroundColor: COLORS.peach}}
        wrapperStyle={{ bottom: 30 }}
        action={{
          label: 'Annuler',
          onPress: () => {
            // Do something
          },
        }}
        >
        {error}
      
        
      </Snackbar>
      <Snackbar
        visible={visibleSuccess}
        onDismiss={onDismissSnackBarSuccess}
        style={{ backgroundColor: COLORS.darkgreen}}
        wrapperStyle={{ bottom: 30 }}
        
        action={{
          label: 'Annuler',
          onPress: () => {
            // Do something
          },
        }}
        >
        Login avec success
        
      </Snackbar>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    height,
    width,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 300,
    height: 300,
  },
  input: {
    width: '70%',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding:10,
    width: '70%',
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
