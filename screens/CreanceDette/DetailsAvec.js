import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {ImageBackground, View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Block from '../Product/Block';
import { COLORS, FONTS, SIZES, icons } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../../components';
import { Divider, Button, Snackbar, Modal, Card, ActivityIndicator, Provider, Menu } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAvec } from '../../redux/avecReducer';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsAvec = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const { avecs, status, error }= useSelector((state) => state.avecs); 

  const [showFullContent, setShowFullContent] = useState(false);
  const [statusLocal, setStatusLocal] = useState(false);
  const [connectedUser, setConnectedUser] = useState(null);


  const [visible, setVisible] = useState(false);  
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleMenuGouv, setVisibleMenuGouv] = useState(false);
  const [visibleMenuArg, setVisibleMenuArg] = useState(false);

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
    if (parsedValue.user && parsedValue.user.user) {
      setConnectedUser(parsedValue.user.user);
      console.log('Async State:', parsedValue.user.user);
    }
  };

  const onDismissSnackBar = () => setVisible(false);
  const onToggleSnackBar = () => setVisible(!visible);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const openMenuGouv = () => setVisibleMenuGouv(true);
  const closeMenuGouv = () => setVisibleMenuGouv(false);


  const openMenuArg = () => setVisibleMenuArg(true);
  const closeMenuArg = () => setVisibleMenuArg(false);


  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);
  
// ref
const bottomSheetModalRef = useRef(null);

// variables
const snapPoints = useMemo(() => ["25%"], []);

// backdrop on modal open
const [isOpen, setIsOpen] = useState(false);

const openModal = useCallback(() => {
  bottomSheetModalRef.current?.present();
  setTimeout(() => {
    setIsOpen(true);
  }, 5);
}, []);

const handleClosePress = useCallback(() => {
  bottomSheetModalRef.current?.close();
}, []);

  // Modal Delete AVEC
  const hideModalDel = () => handleClosePress();

  const handleDelete = async () => {
    dispatch(deleteAvec({
      id: await route.params.avec._id
    }));
    console.log("--");
    console.log(await status);
    console.log(await error);
     // Check if the product was deleted successfully
    if (await status == 'succeeded') {
      // Navigate back to the previous screen

      await navigation.navigate('Main');
    }else {
      onToggleSnackBar()
    }
  }
  

  const handleAdhesion = async () => {

    // Push current user to member array

    // Reuse the soumettreProduct function
    dispatch(soumettreProduct({
      ...route.params.avec,
      id: route.params.avec._id,
      membres: [
        ...route.params.avec.membres,
        {
          user: JSON.parse(token)?.user?.user?.userId,
          admission_req: 'PENDING', 
          contribution_amount: 0,
          contribution_status: 'PENDING', 
        }
      ]
    }));

     // Check if the product was deleted successfully
    if (!error) {
      // Navigate back to the previous screen
      //navigation.navigate('Main');

    }else {
      onToggleSnackBar()
    }
  };

  const renderImage = () => {
    return (
      <ImageBackground
        source={require('./../../assets/img/debt.png')}
        resizeMode="cover"
        style={{ width: SIZES.width, height: 120, justifyContent: 'flex-end' }}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 120,
          }}
        ></LinearGradient>
      </ImageBackground>
    );
  };

  const renderTopDetails = () => {
    return (
      <Block card style={styles.topdetails} >
        
        <View style={styles.containerTitle}>
          {/* First Column */}
          <View style={styles.columnTitle1}>
            <Text  numberOfLines={2} style={styles.titleTitle}>{route.params.avec.name}</Text>
            {
            // "PENDING","SUBMITED", "REJECTED", "ACCEPTED", "BANNED"
            route.params.avec.status == "PENDING"?
              <Text color={COLORS.red} >[Bruillon]</Text>:
            route.params.avec.status == "SUBMITED"?
              <Text color={COLORS.red} >[en attente de validation]</Text>:
              <Text color={COLORS.darkgreen}>[Validé]</Text>
          }
          </View>

          {/* Second Column */}
          <View style={styles.columnTitle2}>
            <Button compact mode="contained">
              + 0 CDF
            </Button>
          </View>
        </View>
     
        <Block row space='between'>

        <Menu
          visible={visibleMenuGouv}
          onDismiss={closeMenuGouv}
          anchor={

            <Block center>
       <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.darkgreen,
              height: 55,
              width: 55,
              borderRadius: 25,
            }}
            onPress={openMenuGouv}
          >
            <Image
              source={icons.cashbook}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
          <Text style={styles.titleMenu}>Gouvernance</Text>

        </Block>
          }>
      
              <Menu.Item leadingIcon="calendar" title="Réunion hebdomadaire" onPress={()=> console.log()}/>
              <Menu.Item leadingIcon="account-group" title="5 membres du bureau" onPress={()=> console.log()}/>
              <Menu.Item leadingIcon="book-open-variant" title="Règlement intérieur" onPress={()=> console.log()}/>

        </Menu>

        <Menu
          visible={visibleMenuArg}
          onDismiss={closeMenuArg}
          anchor={

            <Block center>
        <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.peach,
              height: 55,
              width: 55,
              borderRadius: 25,
            }}
            onPress={openMenuArg}
          >
            <Image
              source={icons.cash}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
          <Text style={styles.titleMenu}>Argent</Text>

        </Block>
          }>
      
              <Menu.Item leadingIcon="call-received" title="Deconnexion" />
              
              <Menu.Item leadingIcon="call-made" title="Se connecter" /> 
              <Menu.Item leadingIcon="list-status" title="Se connecter" /> 
              <Menu.Item leadingIcon="cellphone-lock" title="Se connecter" /> 
              <Menu.Item leadingIcon="format-list-numbered" title="Se connecter" /> 
              

        </Menu>

        <Menu
          visible={visibleMenu}
          onDismiss={closeMenu}
          anchor={

            <Block center>
        <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.blue,
              height: 55,
              width: 55,
              borderRadius: 25,
            }}
            onPress={openMenu}
          >
            <Image
              source={icons.investment}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
          <Text style={styles.titleMenu}>Credit/épargne</Text>

        </Block>
          }>
      
              <Menu.Item leadingIcon="account-key" title="Deconnexion" />
                
              <Menu.Item leadingIcon="account-arrow-right" title="Se connecter" />
              <Menu.Item leadingIcon="account-arrow-left" title="Se connecter" />
              <Menu.Item leadingIcon="account-tie" title="Se connecter" />

        </Menu>
        </Block>

        <Divider />
        <Divider />

        <View style={styles.containerTop}>

          {/* Column 1 */}
          <View style={styles.column}>
            <Text style={styles.title}>MON EPARGE</Text>
            <Text style={styles.content}>0 {route.params.avec.currency}</Text>

          </View>

          {/* Column 2 */}
          <View style={styles.column}>
            <Text style={styles.title}>MES PARTS</Text>
            <Text style={styles.content}>0 {route.params.avec.currency}</Text>
          </View>

          {/* Column 3 */}
          <View style={styles.column}>
            <Text style={styles.title}>MON CREDIT</Text>
            <Text style={styles.content}>0 {route.params.avec.currency}</Text>
          </View>
        </View>


        <View>
          <View>
            <Text h3 bold>Description</Text>
          </View>
          <View>
            <Text numberOfLines={showFullContent ? undefined : 3}>{route.params.avec.detail}</Text>
            <TouchableOpacity onPress={toggleContent}>
              <Text bold color={COLORS.blue} >{showFullContent ? 'Voir moins' : 'Voir plus'}</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.containerTitle}>
          {/* First Column */}
          <View style={styles.columnMembre1}>
            <Image
              source={{uri: route.params.avec.owner?.profile_pic}}
              style={styles.imgOwner}
            />
            <Text numberOfLines={2} bold >{route.params.avec.owner?.name}</Text>
            <Text numberOfLines={1} style={styles.contentTitle}>Président</Text>
          </View>

          {/* Second Column */}
          <View style={styles.columnMembre2}>
          <Text numberOfLines={1} bold >MEMBRE DU GROUPE</Text>
          <View style={styles.imgs}>
                {route.params.avec?.membres.slice(0,4).map((value, key) =>{
                  console.log();
                 // console.log(value.user);
                  return(
                  <Image
                    key={key}
                    source={{uri: value?.user?.profile_pic}}
                    style={[
                      styles.img,
                      key > 0 && { marginLeft: -15 }, // Apply negative margin for images after the first one
                    ]}
                  />
                )})}
                {route.params.avec?.membres.length >= 4 && (
                  <Text style={styles.moreImagesText}>+ 
                  {route.params.avec?.membres.length - 4} plus</Text>
                )}
              </View>
          </View>
        </View>
        {
              connectedUser?.username === route.params.avec.owner.username? 
              <Block row space="between" m_t={10}>
              {/* owner */}
             {
              route.params.avec.status == 'PENDING'?
              <>
                <Button buttonColor={COLORS.blue} mode="contained" onPress={()=>
                  {
                    navigation.navigate('EditAvec', {avec: route.params.avec });
                  }}>
                  Modifier
                </Button>

                <Button buttonColor={COLORS.peach} mode="contained"  onPress={() => {
                  openModal();
                }}>
                      Supprimer
                </Button>

                <Button buttonColor={COLORS.darkgreen} mode="contained">
                  Soumettre
                </Button>
              </>:<></>
             }
              
            </Block>
            :
            <Block row space="between" m_t={10}>
              {/* other */}
              {
                route.params.avec.membres.some(member => member?.user?._id == connectedUser?.userId)?
              <>
              <Button textColor="#fff" elevated buttonColor={COLORS.peach}>
                Quitter
              </Button>

              {
                 route.params.avec.membres.find(member => member?.admission_req == 'ACCEPTED')? <Button textColor="#fff" elevated buttonColor={COLORS.darkgreen}>
                  Contribuer
                </Button>:
                <></>
              }

              </> :
              <Button buttonColor={COLORS.darkgreen} mode="contained">
                Demande d'Adhesion
              </Button>
              }
             
            </Block>
            }


      </Block>
    );
  };


  return (
    <Provider>
      <BottomSheetModalProvider>

      <ScrollView>
    <Block>
      {/* Fixed content */}
      <View>
        {renderImage()}
      </View>

      

      {/* Scrollable content */}
      <View style={{ alignItems: "center" }}>
        {renderTopDetails()}
      </View>
    </Block>
    <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{ backgroundColor: COLORS.peach}}
        wrapperStyle={{ bottom: 30 }}
       
        >
        <Text style={{color:COLORS.white}} >Veuillez vérifier votre connexion Internet </Text>
      
      </Snackbar>
      <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: responsiveScreenWidth(5),backgroundColor:'#dadada' }}
          onDismiss={() => setIsOpen(false)}
        >
            <Card.Title
            titleStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }}
            title="ATTENTION!" 
          />
          <Card.Content>
            <Text variant="titleLarge">Voulez-vous vraiment supprimer le Groupe { route.params.avec.name}?</Text>
            {status == 'failed'?
              <Text style={{color: COLORS.peach}}>Erreur de suppression</Text>:<></>
            }
          </Card.Content>
          <Card.Actions style={{ marginVertical: 15 }}>
            <Button onPress={hideModalDel}>Annuler</Button>
            <Button buttonColor={COLORS.red} disabled={status == 'loading'}
            loading={status == 'loading'}
             onPress={() => {
              handleDelete()
            }} >Supprimer</Button>
          </Card.Actions>

          </BottomSheetModal>
          </ScrollView>
          </BottomSheetModalProvider>
        
        </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    //padding: 20,
    margin:20
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  topdetails:{
    width: '90%',
    marginTop:-20,
    padding:15,
  },
  containerTop: {
    flexDirection: 'row', // Horizontal layout
    justifyContent:"space-evenly",
    marginBottom:20
  },
  column: {
    flex: 1, // Equal width for each column
    paddingVertical: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 12
  },
  content: {
    fontSize: 13,
    color:'grey'
  },
  titleMenu:{
    color: COLORS.gray,
    paddingBottom:10
  },

  containerTitle: {
    flexDirection: 'row',
    marginBottom:10
  },
  columnTitle1: {
    flex: 2, // Takes 50% width
    marginRight: 8, // Adjust the margin as needed
    paddingVertical:8,
  },
  columnTitle2: {
    flex: 1, // Takes 50% width
    marginLeft: 4, // Adjust the margin as needed
    paddingVertical:8,
  },
  titleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentTitle: {
    fontSize: 13,
    color: COLORS.peach
  },
  imgs: {
    flexDirection: 'row',
    marginVertical:10,
    // alignContent:'center',
    //alignItems: 'flex-end'
    // alignSelf:'flex-end'
  },
  img: {
    borderRadius: SIZES.base * 3,
    backgroundColor:COLORS.white,
    borderWidth:2,
    borderColor: COLORS.black,
    width: SIZES.base * 5,
    height: SIZES.base * 5,
    //tintColor: COLORS.black,
  },
  columnMembre1: {
    flex: 1, // Takes 50% width
    marginRight: 8, // Adjust the margin as needed
    paddingVertical:8,
    alignItems:'center'
  },
  columnMembre2: {
    flex: 2, // Takes 50% width
    marginLeft: 12, // Adjust the margin as needed
    paddingVertical:8,
    justifyContent:'center',
  },
  moreImagesText: {
    flex:1,
    alignSelf:'center', 
    marginLeft:10
  },
  imgOwner:{
    width: 100,
    height: 100,
    borderRadius:50,
  }


});

export default DetailsAvec;
