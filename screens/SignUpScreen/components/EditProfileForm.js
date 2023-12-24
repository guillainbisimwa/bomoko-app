import React, { useCallback, useEffect, useState } from 'react';
import { Alert, View, StyleSheet, ScrollView, ImageBackground, Dimensions, 
  KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native';
import { Button, TextInput, ActivityIndicator, Snackbar, } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { COLORS, FONTS } from '../../../constants';
import { editUser } from '../../../redux/userSlice';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Block, Text } from "../../../components";
import Container, { Toast } from 'toastify-react-native';
import { logoutUser } from '../../../redux/authReducer';


const { height, width } = Dimensions.get('window');

export const EditProfileForm = ({ navigation }) => {
  console.log();
  const dispatch = useDispatch();
  const [connectedUser, setConnectedUser] = useState(null);

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


   // Use the useFocusEffect hook to execute reloadScreen when the screen gains focus
   useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
       
        try {
          const value = await AsyncStorage.getItem('user');
          if (value !== null) {
            // Data found, reload the screen
            reloadScreen(value);
          }
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
    console.log('Screen reloaded');
    const parsedValue = JSON.parse(value);
    console.log("parsedValue", parsedValue);
    if (parsedValue.user && parsedValue.user.user) {
      setConnectedUser(parsedValue.user.user);
      setNom(parsedValue.user.user.name)
      setEmail(parsedValue.user.user.email)
      setMobile(parsedValue.user.user.mobile)
      setSelectedImage(parsedValue.user.user.profile_pic)
      setId(parsedValue.user.user.userId)
      //console.log('Async State:', parsedValue.user.user);
    }
  };

  // Use useEffect or any other method to handle the success state and display the alert
    useEffect(() => {
      //console.log("userSignUp", userSignUp);
        // Fetch user details from API
        console.log(onSuccess);
        console.log(onError);
        console.log(isLoadingSignUp);
        console.log(errorSignUp);
        console.log(userSignUp);
       
      if (onSuccess  && isLoadingSignUp) {
        // Alert.alert("Success", "Login successful!");
        navigation.navigate('LoginScreen'); 
      }
      if (onError) {
        // Toast.error        
      }
      
    }, [successSignUp, onError, isLoadingSignUp]);

const handleSignUp = async () => {
  try {
    // Check internet connections
    const netInfo = await NetInfo.fetch();
    // console.log("netInfo.isConnected", netInfo.isConnected);
    if (!netInfo.isConnected) {
      Alert.alert("Pas de connexion Internet", "Veuillez vérifier votre connexion Internet et réessayer.");
      return;
    }

    // Handle login functionality
    console.log({
      ...connectedUser,
      userId: id,
      id: id,
      username:name,
      name,
      email,
      // mobile,
      // role,
      // cover_url:'', 
      profile_pic: selectedImage
    });
    await dispatch(editUser({
      ...connectedUser,
      userId: id,
      id: id,
      username:name,
      name,
      email,
      mobile,
      role,
      cover_url:'', 
      profile_pic: selectedImage
    }));

    await Toast.success('Le profile a été modifié!', 'bottom');
    dispatch(logoutUser());

    navigation.navigate('LoginScreen'); 

    setOnSuccess(onSuccess);
    setOnError(true);
 
  } catch (error) {
    Alert.alert("Attention", "Une erreur est survenue.");
    setOnError(false)

    console.error("Error occurred during login:", error);
  }
};

const handleImageSelection = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 4],
    quality: 1,
    base64: true,
  });

  console.log(result);


  if (!result.canceled) {
    const base64Img = `data:image/jpg;base64,${result.assets[0].base64}`; // result.assets[0].base64
    let imgCb = await onCloudinarySaveCb(base64Img);
    //setSelectedImage(result.assets[0].uri);
    setSelectedImage(imgCb);
  }
};

const onCloudinarySaveCb = async (base64Img) => {
  try{
  setLoadPic(true)
  var pic = "";
      let apiUrl =
        'https://api.cloudinary.com/v1_1/micity/image/upload';
      let data = {
        file: base64Img,
        upload_preset: 'ml_default'
      };

      await fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      })
        .then(async response => {
          let data = await response.json();
          //console.log(data);
          if (await data.secure_url) {
              //console.log('Upload successful');
              setLoadPic(false);
              pic = await data.secure_url;
          }
        })
        .catch(err => {
          console.log('Cannot upload');
          setLoadPic(false);
          console.log(err);
        });
    return pic;
  }catch(e){
    setLoadPic(false);
    console.log("Error while onCloudinarySave", e);
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
      <Container position="top" style={{ width: '100%' }} duration={6000} />
     
        <View
          style={{
            alignItems: "center",
            marginVertical: 22,
          }}
        >
          <TouchableOpacity  onPress={handleImageSelection}>
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
        <TextInput error={onError} keyboardType="default" label="Nom d'utilisateur" value={name} onChangeText={setNom} style={styles.input} />
        
        <TextInput error={onError} keyboardType="default" 
        label="E-mail" value={email} 
        onChangeText={setEmail} style={styles.input} />

      <TextInput editable={false} keyboardType="default" 
        label="Téléphone" value={mobile} 
        onChangeText={setMobile} style={styles.input} />

          {/* <ActivityIndicator  animating={isLoadingSignUp} color={COLORS.red} /> */}

        
        <Button mode="contained" onPress={handleSignUp} style={styles.button}
        loading={loadPic || isLoadingSignUp} disabled={loadPic || isLoadingSignUp} >
          MODIFIER
        </Button>

        <Text white bold style={{ marginVertical: 20}} 
      onPress={()=> navigation.goBack()} > Annuler</Text>

      
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
