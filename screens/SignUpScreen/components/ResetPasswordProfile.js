import React, { useCallback, useEffect, useState } from 'react';
import { Alert, View, StyleSheet, ScrollView, ImageBackground, Dimensions, 
  KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native';
import { Button, TextInput, ActivityIndicator, Snackbar, } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
import { MaterialIcons } from "@expo/vector-icons";

import { COLORS, FONTS } from '../../../constants';
import { useFocusEffect } from '@react-navigation/native';
import { Block, Text } from "../../../components";


const { height, width } = Dimensions.get('window');

export const ResetPasswordProfile = ({ navigation, route }) => {
  console.log();
  const dispatch = useDispatch();
  const [connectedUser, setConnectedUser] = useState(null);
  const { user } = route.params;


  const { errorSignUp, isLoadingSignUp, successSignUp, userSignUp } = useSelector((state) => state.user);
  const [loadPic, setLoadPic] = useState(false);
  const [onSuccess, setOnSuccess] = useState(false);
  const [onError, setOnError] = useState(false);

  const [id, setId] = useState();
  const [name, setNom] = useState();

  const [email, setEmail] = useState( );
  const [mobile, setMobile] = useState();
  const [role, setRole] = useState('user');

  const [visible, setVisible] = useState(false);

  const [selectedImage, setSelectedImage] = useState();

  const [password, setPassword] = useState('');//test2

  const [passwordError, setPasswordError] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');//test2

  const [confirmPasswordError, setConfirmPasswordError] = useState(false);


   // Use the useFocusEffect hook to execute reloadScreen when the screen gains focus
   useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
       
        try {
          reloadScreen(user);
        } catch (error) {
          console.error('Error retrieving data:', error);
        }
      };

      // Fetch data when the screen gains focus
      fetchData();

      // Return a cleanup function
      return () => {
        // You can perform cleanup here if needed
        console.log('Cleanup function');
      };
    }, []) // Empty dependency array to run this effect only once when the screen mounts
  );


  // Function to handle screen reload
  const reloadScreen = (value) => {
    // You can put your screen reload logic here
    console.log('Screen reloaded', value);
    const parsedValue = value;//JSON.parse(value);
    if (parsedValue) {
      setConnectedUser(parsedValue);
      setNom(parsedValue.username)
      setEmail(parsedValue.email)
      setMobile(parsedValue.mobile)
      setSelectedImage(parsedValue.profile_pic)
      setId(parsedValue._id)
      console.log('Async State:', parsedValue);
    }
  };

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  // Use useEffect or any other method to handle the success state and display the alert
    // useEffect(() => {
    //   //console.log("userSignUp", userSignUp);
    //     // Fetch user details from API
    //     console.log(onSuccess);
    //     console.log(onError);
    //     console.log(isLoadingSignUp);
    //     console.log(errorSignUp);
    //     console.log(userSignUp);
       
    //   if (onSuccess  && isLoadingSignUp) {
    //     // Alert.alert("Success", "Login successful!");
    //     navigation.navigate('LoginScreen'); 
    //   }
    //   if (onError) {
    //     onToggleSnackBar()
    //   }
      
    // }, [successSignUp, onError, isLoadingSignUp]);

const handleResetPassword = async () => {
  try {
    // Check internet connections
    const netInfo = await NetInfo.fetch();
    // console.log("netInfo.isConnected", netInfo.isConnected);
    if (!netInfo.isConnected) {
      Alert.alert("Pas de connexion Internet", "Veuillez vérifier votre connexion Internet et réessayer.");
      return;
    }

    if(password.length > 3 && (password == confirmPassword)){
      // Handle login functionality
      console.log({
        id: id,
        password
      });
    }
    else {
      Alert.alert("Attention", "Veillez valider le mot de passe!");
    }

    

    // dispatch(editUser({
    //   ...connectedUser,
    //   userId: connectedUser._id,
    //   id: connectedUser._id,
    //   username:name,
    //   name,
    //   email,
    //   mobile,
    //   role,
    //   cover_url:'', 
    //   profile_pic: selectedImage
    // }));

    setOnSuccess(onSuccess);
    setOnError(true);
 
  } catch (error) {
    Alert.alert("Attention", "Une erreur est survenue.");
    setOnError(false)

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
     
        <View
          style={{
            alignItems: "center",
            marginVertical: 22,
          }}
        >
          <TouchableOpacity >
            <Image
              source={{ uri: selectedImage }}
              style={{
                height: 170,
                width: 170,
                borderRadius: 85,
                borderWidth: 2,
                borderColor: COLORS.primary,
                backgroundColor: COLORS.gray
              }}
            />
            <ActivityIndicator animating={loadPic} color='red' size={20} style={{position:'absolute', top:80, left:80}} /> 

            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 10,
                zIndex: 9999,
              }}
            >
              <MaterialIcons
                name="photo-camera"
                size={32}
                color={COLORS.primary}
              />
            </View>
          </TouchableOpacity>
        </View>

        <Block center margin={[0, 20, 20, 0]}>
              <Text white bold h2>Reinitialiser votre mot de passe!</Text>
              <Text white center>
              Veuillez saisir un mot de passe que vous n'oublierez probablement pas de sitôt !
              </Text>
        </Block>
       

        <TextInput error={onError} editable={false} keyboardType="default" label="Nom d'utilisateur" value={name} onChangeText={setNom} style={styles.input} />
        
        {/* <TextInput error={onError} keyboardType="default" 
        label="E-mail" value={email} 
        onChangeText={setEmail} style={styles.input} />

      <TextInput error={onError} keyboardType="default" 
        label="Téléphone" value={mobile} 
        onChangeText={setMobile} style={styles.input} /> */}

          {/* <ActivityIndicator  animating={isLoadingSignUp} color={COLORS.red} /> */}

          <TextInput
              label="Mots de passe"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              error={passwordError}
            />

          <TextInput
              label="Confirmer le Mots de passe"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              style={styles.input}
              error={confirmPasswordError}
            />

        
        <Button mode="contained" onPress={handleResetPassword} style={styles.button}
        loading={loadPic || isLoadingSignUp} disabled={loadPic || isLoadingSignUp} >
          Reinitialiser!
        </Button>

        <Text white bold style={{ marginVertical: 20}} 
      onPress={()=> navigation.goBack()} > Annuler</Text>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{ backgroundColor: COLORS.peach}}
        action={{
          label: 'Annuler',
          onPress: () => {
            // Do something
          },
        }}
        >
        {onError}
        
      </Snackbar>
      </View>
    </View>
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
    height:'200%',
    width,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    // paddingTop: 20,
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
});
