import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Platform, Alert } from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { Block, Text } from './../../components';
import Ionicons from '@expo/vector-icons/Ionicons';
import Constants from 'expo-constants';

import { COLORS, FONTS, SIZES, icons } from './../../constants';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddProduct = () => {
  const [description, setDescription] = useState('');
  const [total, setTotal] = useState('');
  const [images, setImages] = useState([]);

  const [loadPic, setLoadPic] = useState(false);


  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const cameraRollStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraRollStatus.status !== 'granted' || cameraStatus.status !== 'granted') {
          alert('Sorry,  we need these permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleSaveAddProduct = async () => {
    try {
      console.log('Add', images);
      console.log('Add');

    } catch (e) {
      console.log('error', e);
    }
  };

  function renderHeader() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.white,
          marginBottom: SIZES.padding,
          borderBottomColor: COLORS.gray,
          borderBottomWidth: 1,
        }}
      >
        <View style={{ paddingVertical: SIZES.padding / 2 }}>
          <Text style={{ color: COLORS.primary, ...FONTS.h2 }}>Bomoko Cash</Text>
          <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}>(Produits et Services)</Text>
        </View>
      </View>
    );
  }

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: 'Images',
      aspect: [4, 3],
      base64: true,
    });

    if (!result.canceled) {

      let imgCb2V2 = [...images];
      imgCb2V2.push(result.assets[0].uri);
      setImages([...imgCb2V2]);
    }
  };

const pickImage = async () => {
  try {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Use proper syntax for mediaTypes
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const { uri, type, base64 } = result.assets[0];
      const name = `${Math.floor(Math.random() * 900) + 100}_${Date.now()}`;

      let base64Img = `data:image/jpg;base64,${base64}`; // result.assets[0].base64

      const source = {
        uri,
        type,
        name,
        base64Img,
      };

      //await onCloudinarySaveCb(source);
      console.log("------------");
      let imgCb = await onCloudinarySaveCb(source);
      let imgCb2 = [...images];

      imgCb2.push(imgCb);
      setImages(imgCb2); // Use proper syntax for setting the state
      console.log(images);
    }
  } catch (error) {
    // Handle any errors that might occur during image picking
    console.error('Error while picking image:', error);
  }
};


  const onCloudinarySaveCb = async (obj) => {
    setLoadPic(true)
    var pic = "";
        let apiUrl =
          'https://api.cloudinary.com/v1_1/micity/image/upload';
        let data = {
          file: obj.base64Img,
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
};

  const removePic = (id) => {
    var removed = images.filter((value) => value !== id);
    setImages(removed);

    var removedV2 = images.filter((value) => value !== id);
    setImages(removedV2);
  };

  const info = () =>
    Alert.alert(`Warning`, `You can't upload more than 3 pictures!`, [
      {
        text: 'Okay',
        style: 'cancel',
      },
    ]);

  const addAddProduct = () => {
    return (
      <>
        <View style={styles.dropdownContainer}></View>
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          style={styles.input}
          multiline
          numberOfLines={2}
          required
        />
        <TextInput
          label="Montant"
          value={total}
          onChangeText={setTotal}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
          required
        />
        <Button
          elevated
          mode="contained"
          onPress={handleSaveAddProduct}
          style={styles.button}
          icon={({ size, color }) => (
            <Ionicons name="save-outline" size={20} color={COLORS.white} />
          )}
        >
          Ajouter
        </Button>
      </>
    );
  };

  const renderImage = () => {
    return (
      <Block flex={1}>
        <Block row space="between">
          <TouchableOpacity
            style={styles.btn}
            onPress={() => (images.length >= 3 ? info() : pickImage())}
          >
            <Ionicons name="cloud-upload" size={30} color={COLORS.white} style={styles.icon} />
            {/* {loadPic?
              <ActivityIndicator size="small" color={Colors.danger} />: <></>} */}
            <Text style={{ color: COLORS.white }}>Téléverser</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => (images.length >= 3 ? info() : takePhoto())}
          >
            <Ionicons name="camera" size={30} color={COLORS.white} style={styles.icon} />
            {/* {loadPic?
              <ActivityIndicator animating={true} color={COLORS.peach} />: <></>} */}
               

            <Text style={{ color: COLORS.white }}>Capture une photo</Text>
          </TouchableOpacity>
        </Block>
      </Block>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header section */}
        {renderHeader()}

        {renderImage()}

        <Block flex={1}>
          <Block style={styles.imgContainer}>
            {images.map((img, key) => (
              <View key={key}>
                <Ionicons
                  color={COLORS.red}
                  size={SIZES.base * 6}
                  name={'close-circle'}
                  style={styles.cancel}
                  onPress={() => removePic(img)}
                />
                <Block style={styles.bg}>
                  <Image source={{ uri: img }} style={styles.img} />
                </Block>
              </View>
            ))}
            <ActivityIndicator animating={loadPic} color={COLORS.peach} />
          </Block>
        </Block>

        {addAddProduct()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  icon: {
    marginHorizontal: 5,
  },
  scrollContainer: {
    //flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  button: {
    marginTop: 32,
    backgroundColor: COLORS.primary,
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: SIZES.padding,
  },
  hasErrors: {
    borderBottomColor: COLORS.purple,
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
  dropdownContainer: {
    borderWidth: 1.4,
    borderColor: '#aaa',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    padding: 8,
  },
  imgContainer: {
    marginVertical: SIZES.base,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  img: {
    width: SIZES.width / 4,
    height: SIZES.width / 4,
    borderRadius: SIZES.radius,
    opacity: 0.8,
    borderColor: COLORS.black,
    borderWidth: 3,
  },
  bg: {
    borderRadius: SIZES.radius,
    marginRight: SIZES.base * 1.7,
  },
  btn: {
    backgroundColor: COLORS.peach,
    padding: SIZES.base,
    width: SIZES.width / 2.5,
    borderRadius: SIZES.radius,
    elevation: 2,
    marginTop: SIZES.base * 1.8,
    flexDirection: 'row',
    alignItems: 'center',
    ///height: SIZES.base * 7,
  },
  cancel: {
    position: 'absolute',
    zIndex: 100,
    margin: 10,
  },
});

export default AddProduct;
