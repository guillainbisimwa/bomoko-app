import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Platform, Alert } from 'react-native';
import { TextInput, Button, ActivityIndicator, RadioButton, Checkbox, Snackbar } from 'react-native-paper';
import { Block, Text } from './../../components';
import Ionicons from '@expo/vector-icons/Ionicons';
import Constants from 'expo-constants';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import NetInfo from "@react-native-community/netinfo";

import { COLORS, FONTS, SIZES, icons } from './../../constants';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { DatePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { editProduct } from '../../redux/prodReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const EditProduct = ({route, navigation}) => {
  const { owner, username, productService } = route.params;
  const navigationV2 = useNavigation();
  
  const dispatch = useDispatch();
  const { error, isLoading, successUpdate } = useSelector((state) => state.products);

  const [name, setName] = useState(productService.name);
  const [amount, setAmount] = useState(productService.amount+'');
  const [tauxInt, setTauxInt] = useState(productService.tauxInt+'');
  
  const [initialAmount, setInitialAmount] = useState(productService.initialAmount+'');
  const [type, setType] = useState(productService.type);

  const [description, setDescription] = useState(productService.detail);
  const [images, setImages] = useState([...productService.images]);

  const [loadPic, setLoadPic] = useState(false);
  const [checkedDevise, setCheckedDevise] = useState(productService.currency);

  // DATE RANGE PICKER
  const [range, setRange] = useState({ startDate: new Date(productService.startDate), endDate: 
    new Date(productService.endDate)});

  const [open, setOpen] = useState(false);

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setRange({ startDate, endDate });
    },
    [setOpen, setRange]
  );

  // Fonction pour convertir la date en format français
  const formatDateToFrench = (date) => {
    return format(new Date(date), 'dd MMMM yyyy', { locale: fr });
  };

  // Location  
  const [checkedGoma, setCheckedGoma] = useState(true);
  const [checkedBukavu, setCheckedBukavu] = useState(false);
  const [checkedKinshasa, setCheckedKinshasa] = useState(false);

  // Snackbar

  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const onToggleSnackBar = () => setVisible(!visible);


  useEffect(() => {
    console.log("");
    console.log("productService", successUpdate);

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

  const handleSaveEditProduct = async () => {
    try {
      const netInfo = await NetInfo.fetch();
      // console.log("netInfo.isConnected", netInfo.isConnected);
      if (!netInfo.isConnected) {
        Alert.alert("Pas de connexion Internet", "Veuillez vérifier votre connexion Internet et réessayer.");
        return;
      }
 
      var img_prod = "https://raw.githubusercontent.com/guillainbisimwa/bomoko-app/add-product/assets/img/prod.jpg";
      var img_serv = "https://raw.githubusercontent.com/guillainbisimwa/bomoko-app/add-product/assets/img/serv.jpg";

      //console.log(p);
      dispatch(editProduct({
        ...productService,
        id: productService._id,
        name: name,
        detail: description,
        location: [checkedGoma?'Goma':'',
          checkedBukavu?'Bukavu':'', checkedKinshasa?'Kinshasa':'' ],
        amount: parseInt(amount),
        tauxInt: parseInt(tauxInt),
        images: images.length == 0 ? (type == 'produit'? [img_prod]:[img_serv]): images,
        initialAmount: parseInt(initialAmount),
        type: type,
        currency: checkedDevise,
        startDate: `${range.startDate}`,
        endDate: `${range.endDate}`,
      }));

       // Check if the product was saved successfully
      if (!error) {
        // Navigate back to the previous screen
        navigationV2.navigate('Main');
        //navigation.goBack();
        
      }else {
        onToggleSnackBar()
      }

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
          <Text style={{ color: COLORS.primary, ...FONTS.h2 }}>Afintech</Text>
          <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}>(Produits et Services)</Text>
        </View>
      </View>
    );
  }

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
      let base64Img = `data:image/jpg;base64,${result.assets[0].base64}`; // result.assets[0].base64

      console.log("------------");
      let imgCb = await onCloudinarySaveCb(base64Img);
      let imgCb2 = [...images];

      imgCb2.push(imgCb);
      setImages(imgCb2); // Use proper syntax for setting the state
      console.log(images);
    }
  } catch(e) {
      setLoadPic(false);
      console.log("Error while picking image", e);
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

  const addEditProduct = () => {
    return (
      <>
        <View style={styles.dropdownContainer}></View>

        <Block style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop:10 }}>
          <Block>
            <Text  style={{ ...FONTS.h3, color: COLORS.darkgray }}>TYPE</Text>
            <RadioButton.Group onValueChange={(value) => setType(value)} value={type}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="produit" color="red" /> 
                <Text>Produit</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="service" color="blue" /> 
                <Text>Service</Text>
              </View>
            </RadioButton.Group>
          </Block>

          <Block>
          <Text  style={{ ...FONTS.h3, color: COLORS.darkgray }}>DEVISE</Text>
            <RadioButton.Group onValueChange={(value) => setCheckedDevise(value)} value={checkedDevise}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="USD" color="red" /> 
                <Text>USD</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="CDF" color="blue" /> 
                <Text>CDF</Text>
              </View>
            </RadioButton.Group>
          </Block>
        </Block>
   
        <TextInput
          label={`Nom de votre ${type}`}
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
          keyboardType='default'
          required
        />

        <TextInput
          label={`Description votre ${type}`}
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          style={styles.input}
          multiline
          numberOfLines={2}
          keyboardType='default'
          required
        />
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}> */}
          <TextInput
            label={`Montant disponible (${checkedDevise})`}
            value={initialAmount}
            onChangeText={setInitialAmount}
            mode="outlined"
            keyboardType="numeric"
            style={[styles.input, ]} //styles.input_49
          />

        <TextInput
          label={`Besoin de financement (${checkedDevise})`}
          value={amount}
          onChangeText={setAmount}
          mode="outlined"
          keyboardType="numeric"
          style={[styles.input, ]} //styles.input_49
          //prefix="USD"
        />

         <TextInput
          label={`Taux d'intérêt en %`}
          value={tauxInt}
          onChangeText={setTauxInt}
          mode="outlined"
          keyboardType="numeric"
          style={[styles.input, ]} 
        />
       
        <SafeAreaProvider>
          <View style={{justifyContent: 'center', flex: 1, alignItems: 'center', 
          marginVertical:20,}}>
            <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined" style={{ 
              padding: 7, width:"100%"}}>
              Modifier la durée de votre campagne
            </Button>
            <DatePickerModal
              locale="fr"
              mode="range"
              visible={open}
              onDismiss={onDismiss}
              startDate={range.startDate}
              endDate={range.endDate}
              onConfirm={onConfirm}
            />

        {range.startDate && range.endDate && (
          <Text style={{ marginTop: 20 }}>
            Campagne du : {formatDateToFrench(range.startDate)} au {formatDateToFrench(range.endDate)}
          </Text>
        )}
          </View>
        </SafeAreaProvider>

        <View style={{ flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
          <Checkbox value="paris" color="#AF4C50" status={checkedGoma ? 'checked' : 'unchecked'}
      onPress={() => {
        setCheckedGoma(!checkedGoma);
      }}/>
          <Text>Goma</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
          <Checkbox value="newyork" color="#4CAF50" status={checkedBukavu ? 'checked' : 'unchecked'}
      onPress={() => {
        setCheckedBukavu(!checkedBukavu);
      }}/>
          <Text>Bukavu</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
          <Checkbox value="newyork" color="#504CAF" status={checkedKinshasa ? 'checked' : 'unchecked'}
      onPress={() => {
        setCheckedKinshasa(!checkedKinshasa);
      }}/>
          <Text>Kinshasa</Text>
        </View>
        
    </View>

        <Button
          elevated
          mode="contained"
          onPress={handleSaveEditProduct}
          style={styles.button}
          icon={({ size, color }) => (
            <Ionicons name="save-outline" size={20} color={COLORS.white} />
          )}

        loading={isLoading}
        >
          Modifier 
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
            <Text style={{ color: COLORS.white }}>Téléverser une image</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.btn}
            onPress={() => (images.length >= 3 ? info() : takePhoto())}
          >
            <Ionicons name="camera" size={30} color={COLORS.white} style={styles.icon} />
           
            <Text style={{ color: COLORS.white }}>Capturer une photo</Text>
          </TouchableOpacity> */}
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

        {addEditProduct()}

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
  input_49: {
    width: "49%"
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
   // width: SIZES.width / 2.5,
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

export default EditProduct;

// {
//   "name": "Nettoyage de vitres",
//   "detail": "Nous offrons des s"
//   "location": ["1","2"],
//   "amount": 300,
//   "initialAmount": 250,
//   "type": "service",
//   "currency": "USD",
//   "timeline": [
//     {
//       "title": "Creation du Produit/service",
//       "details": "Le produit- cree par @"
//     }
//   ],
//   "startDate": "2023-10-02T12:00:00Z",
//   "endDate": "2023-10-05T12:00:00Z",
//   "owner": "64c80f4e28a8242d951dea1d",
// }
