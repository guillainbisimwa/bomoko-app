import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {ImageBackground, View, TouchableOpacity, StyleSheet, ScrollView, Image, ToastAndroid } from 'react-native';
import Block from '../Product/Block';
import { COLORS, FONTS, SIZES, icons } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../../components';
import { Divider, Button, Snackbar, Modal, Card, Provider, Menu, Chip, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAvec, updateAvec } from '../../redux/avecReducer';
import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Membre from '../Product/Membre';
import Reunion from './Reunion';
import { format } from 'date-fns';
import { fr as myFr } from 'date-fns/locale';
import { Svg } from 'react-native-svg';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLegend, VictoryStack } from 'victory-native';

const DetailsAvec = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const { avecs, status, error }= useSelector((state) => state.avecs); 

  const [showFullContent, setShowFullContent] = useState(false);
  const [statusLocal, setStatusLocal] = useState('');
  const [connectedUser, setConnectedUser] = useState(null);


  const [visible, setVisible] = useState(false);  
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleMenuGouv, setVisibleMenuGouv] = useState(false);
  const [visibleMenuArg, setVisibleMenuArg] = useState(false);

  // backdrop on modal open
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdhesion, setIsOpenAdhesion] = useState(false);
  const [isOpenSubmit, setIsOpenSubmit] = useState(false);
  const [isOpenQuit, setIsOpenQuit] = useState(false);

  // Gouvernance
  const [isOpenReunion, setIsOpenReunion] = useState(false);
  const [isOpenMembreBureau, setIsOpenMembreBureau] = useState(false);
  const [isOpenRoi, setIsOpenRoi] = useState(false);


  const [isOpenMembres, setIsOpenMembres] = useState(false);
  const [action, setAction] = useState();

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

  const BackdropElement = useCallback(
    (backdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        opacity={0.7}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  )
    
  // ref
  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalRefAdhesion = useRef(null);
  const bottomSheetModalRefSubmit = useRef(null);
  const bottomSheetModalRefQuit = useRef(null);

  // Gouvernance
  const bottomSheetModalReunion = useRef(null);
  const bottomSheetModalMembreBureau = useRef(null);
  const bottomSheetModalRoi = useRef(null);

  const bottomSheetModalMembres = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["28%","50%"], []);
  const snapPointsGouv = useMemo(() => ["50%","90%"], []);


  const openModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 5);
  }, []);

  const openModalAdhesion = useCallback(() => {
    bottomSheetModalRefAdhesion.current?.present();
    setTimeout(() => {
      setIsOpenAdhesion(true);
    }, 5);
  }, []);

  const openModalSubmit = useCallback(() => {
    bottomSheetModalRefSubmit.current?.present();
    setTimeout(() => {
      setIsOpenSubmit(true);
    }, 5);
  }, []);

  const openModalQuit = useCallback(() => {
    bottomSheetModalRefQuit.current?.present();
    setTimeout(() => {
      setIsOpenQuit(true);
    }, 5);
  }, []);

  // GOuv
  const openModalReunion = useCallback(() => {
    bottomSheetModalReunion.current?.present();
    setTimeout(() => {
      setVisibleMenuGouv(false);
      setIsOpenReunion(true);
    }, 5);
  }, []);

  const openModalMembreBureau = useCallback(() => {
    bottomSheetModalMembreBureau.current?.present();
    setTimeout(() => {
      setVisibleMenuGouv(false);
      setIsOpenMembreBureau(true);
    }, 5);
  }, []);

  const openModalRoi = useCallback(() => {
    bottomSheetModalRoi.current?.present();
    setTimeout(() => {
      setVisibleMenuGouv(false);
      setIsOpenRoi(true);
    }, 5);
  }, []);

  const openModalMembres = useCallback(() => {
    bottomSheetModalMembres.current?.present();
    setTimeout(() => {
      setIsOpenMembres(true);
    }, 5);
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handleClosePressAdhesion = useCallback(() => {
    bottomSheetModalRefAdhesion.current?.close();
  }, []);

  const handleClosePressSubmit = useCallback(() => {
    bottomSheetModalRefSubmit.current?.close();
  }, []);

  const handleClosePressQuit = useCallback(() => {
    bottomSheetModalRefQuit.current?.close();
  }, []);

  // Gouv
  const handleClosePressReunion = useCallback(() => {
    bottomSheetModalReunion.current?.close();
  }, []);

  const handleClosePressMembreBureau = useCallback(() => {
    bottomSheetModalMembreBureau.current?.close();
  }, []);

  const handleClosePressRoi = useCallback(() => {
    bottomSheetModalRoi.current?.close();
  }, []);

  const handleClosePressMembres = useCallback(() => {
    bottomSheetModalMembres.current?.close();
  }, []);


  // Modal Delete AVEC
  const hideModalDel = () => handleClosePress();
  const hideModalAdhesion = () => handleClosePressAdhesion();
  const hideModalSubmit= () => handleClosePressSubmit();
  const hideModalQuit = () => handleClosePressQuit();

  // Gouv
  const hideModalReunion = () => handleClosePressReunion();
  const hideModalMembreBureau = () => handleClosePressMembreBureau();
  const hideModalRoi = () => handleClosePressRoi();

  const hideModalMembres = () => handleClosePressMembres();

  // Fonction pour convertir la date en format français
  const formatDateToFrench = (date) => {
    console.log('date', date);
    return format(new Date(date), 'dd MMMM yyyy', { locale: myFr });
  };


  const myDataset = [
    [
      { x: "O Mois", y: 90 },
      { x: "3 Mois", y: 100 },
      { x: "6 Mois", y: 150 },
      { x: "9 Mois", y: 250 },
      { x: "12 Mois", y: 400 }
    ],
    [
        { x: "O Mois", y: 0 },
        { x: "3 Mois", y: 50 },
        { x: "6 Mois", y: 60 },
        { x: "9 Mois", y: 100 },
        { x: "12 Mois", y: 120 }
    ],
    [
      { x: "O Mois", y: 0 },
      { x: "3 Mois", y: 40 },
      { x: "6 Mois", y: 60 },
      { x: "9 Mois", y: 75 },
      { x: "12 Mois", y: 80 }
    ],
  
  ];
  
  const membresList = [
    ...route.params.avec.membres.filter((val,key)=> val.type != "MEMBRE"),
  { type: 'President', user:{...route.params.avec.owner, admin: true}} ];

  const membresListFull = [
    ...route.params.avec.membres,
  { type: 'President', user:{...route.params.avec.owner, admin: true}} ];

  // callbacks
  const handleRefresh = useCallback(() => {
    console.log("handleRefresh");
  }, []);


  const handleAcceptReject = async (myUser) => {
    try{
      
      const updatedMembres = route.params.avec.membres.map((membre) => {
        if (membre.user._id === myUser.user._id) {
          return {
            ...membre,
            adhesion:{
              ...membre?.adhesion,
              status: 'REJECTED',
            }
          };
        }
        return membre;
      });

      dispatch(updateAvec({
        ...route.params.avec,
        id: route.params.avec._id,
        membres: updatedMembres,
      }));

      setAction(myUser.user._id)
  
       // Check if the member was updated successfully
      if (!error && !isLoading) {
        // Navigate back to the previous screen
        // await navigation.navigate('Main');
          ToastAndroid.show("Rejeté avec success", ToastAndroid.LONG);
  
      }else {
        //console.log('Error ++++++')
         ToastAndroid.show("Une erreur s'est produite", ToastAndroid.LONG);

        onToggleSnackBar()
      }
    } catch(e){
      console.log('Error //////////', e)
      ToastAndroid.show(`Une erreur s'est produite ${e}`, ToastAndroid.LONG);
    }
    return myUser.user._id 
  }


  const handleAcceptReq = async (myUser) => {
    try{
      console.log("myUser.user._id", myUser.user.name);
      const updatedMembres = route.params.avec.membres.map((membre) => {
        if (membre.user._id === myUser.user._id) {
          return {
            ...membre,
            adhesion:{
              ...membre?.adhesion,
              status: 'ACCEPTED',
            }
          };
        }
        return membre;
      });

      dispatch(updateAvec({
        ...route.params.avec,
        id: route.params.avec._id,
        membres: updatedMembres,
      }));
  
      setAction(myUser.user._id)

       // Check if the member was updated successfully
      if (!error && !isLoading) {
        // Navigate back to the previous screen
        // await navigation.navigate('Main');
          ToastAndroid.show("Confirmé avec success", ToastAndroid.LONG);
  
      }else {
        //console.log('Error ++++++')
         ToastAndroid.show("Une erreur s'est produite", ToastAndroid.LONG);

        onToggleSnackBar()
      }
    } catch(e){
      console.log('Error //////////', e)
    ToastAndroid.show(`Une erreur s'est produite ${e}`, ToastAndroid.LONG);
    }
  };

  const handleDelete = async () => {
    dispatch(deleteAvec({
      id: await route.params.avec._id
    }));
    console.log("--");
    console.log(await status);
    console.log(await error);
    setStatusLocal(await status);

     // Check if the product was deleted successfully
    if (await status == 'succeeded') {
      // Navigate back to the previous screen

      await navigation.navigate('Main');
    }else {
      setStatusLocal(await status);

      onToggleSnackBar()
    }
  }
  

  const handleAdhesion = async () => {
    // Pushing the additional object to the output array
    const today = new Date();

    // Push current user to member array
    const outputTimeLineSoum = {
      time:`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear().toString().substr(-2)}`,
      title: "Demande d'Adhesion",
      details: `${connectedUser.name} veut adherer dans le groupe ${route.params.avec.name}`
    };
    // Reuse the updateAvec function
    dispatch(updateAvec({
      ...route.params.avec,
      id: route.params.avec._id,
      membres: [
        ...route.params.avec.membres,
        {
          user: connectedUser.userId,
          adhesion:{
            status: 'SUBMITTED',
            ...route.params.avec.membres?.adhesion,
          }
        },
        
      ],
      timeline: [
        outputTimeLineSoum,
        ...route.params.avec.timeline,
      ]
    }));

    setStatusLocal(await status);

    if (await status == 'succeeded') {
      // Navigate back to the previous screen

      await navigation.navigate('Main');
    }else {
      setStatusLocal(await status);
      onToggleSnackBar()
    }
  };

  const handleSubmit = async () => {

    // Pushing the additional object to the output array
    const today = new Date();

    const outputTimeLineSoum = {
      time:`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear().toString().substr(-2)}`,
      title: 'Soumission',
      details: `Votre groupe ${route.params.avec.name} a été soumis à l'équipe African Fintech et est en attente de validation`
    };

    dispatch(updateAvec({
      ...route.params.avec,
      id: route.params.avec._id,
      status: "SUBMITED",
      timeline: [
        outputTimeLineSoum,
        ...route.params.avec.timeline,
      ]
    }));
    setStatusLocal(await status);

     // Check if the product was submited successfully
     if (await status == 'succeeded') {
      // Navigate back to the previous screen

      await navigation.navigate('Main');
    }else {
      setStatusLocal(await status);

      onToggleSnackBar()
    }
  };

  const handleQuit = async () => {

    // Reuse the updateAvec function
    dispatch(deleteAvec({
      id: route.params.avec._id
    }));
    // 
    setStatusLocal(await status);


    if (await status == 'succeeded') {
      // Navigate back to the previous screen

      await navigation.navigate('Main');
    }else {
      setStatusLocal(await status);

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
      
          <Menu.Item leadingIcon="calendar" title="Réunion hebdomadaire" 
            onPress={()=> openModalReunion() }/>
          <Menu.Item leadingIcon="account-group" title="5 membres du bureau" 
            onPress={()=> openModalMembreBureau()}/>
          <Menu.Item leadingIcon="book-open-variant" title="Règlement intérieur" 
            onPress={()=> openModalRoi()}/>

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
      
              <Menu.Item leadingIcon="transfer" title="Transactions" />
       
              

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
      
              <Menu.Item leadingIcon="account-key" title="Credits" />
                
              <Menu.Item leadingIcon="bank" title="Epargnes" />
              <Menu.Item leadingIcon="calendar" title="Cotisation Hebdomadaire" />
              <Menu.Item leadingIcon="cash" title="Caisse solidaire" />
              <Menu.Item leadingIcon="account-tie" title="Amamdes" />

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
          <TouchableOpacity style={styles.imgs} onPress={()=> openModalMembres()}>
                {route.params.avec?.membres.slice(0,4).map((value, key) =>{
                  console.log();
                 // console.log(value.user);
                  return(
                  <Image
                    key={value._id}
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
              </TouchableOpacity>
          </View>
        </View>
        <Button buttonColor={COLORS.blue} mode="contained" onPress={()=>
                  {
                    navigation.navigate('EditAvec', {avec: route.params.avec, owner: route.params.avec.owner });
                  }}>
                  Modifier
                </Button>
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

                <Button buttonColor={COLORS.darkgreen} mode="contained" onPress={() => {
                  openModalSubmit();
                }}>
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
              <Button textColor="#fff" elevated buttonColor={COLORS.peach} onPress={() => {
                  openModalQuit();
                }}>
                Quitter
              </Button>
{/* 
              {
                 route.params.avec.membres.find(member => member?.admission_req == 'ACCEPTED')? <Button textColor="#fff" elevated buttonColor={COLORS.darkgreen}>
                  Contribuer
                </Button>:
                <></>
              } */}

              </> :
              <Button buttonColor={COLORS.darkgreen} mode="contained" onPress={() => {
                openModalAdhesion()}}
              >
                Demande d'Adhesion
              </Button>
              }
             
            </Block>
            }


      </Block>
    );
  };

  const renderInfoGroup = () => {
    return (
      <Block card m_l={20} m_r={20} p={10} m_t={10} m_b={20}>
        <Block>
        <Block><Text numberOfLines={1} h2 bold>{route.params.avec.name}</Text></Block>
          <Text>{ route.params?.avec?.membres.length} Membres</Text>
        </Block>
        <Block m_t={5} m_b={15} row center space='between'>
          <Chip icon="information" elevated >Reunions</Chip>
          <Text>7/20</Text>
        </Block>
        <Divider />
        <Block  row>
          <IconButton
            icon="circle"
            iconColor={COLORS.darkgreen}
            size={20}
          />
          <Block middle>
            <Text bold>CYCLE - {route.params.avec.cycle.number} Mois </Text>
          </Block>
        </Block>

        <Block row space='between' center m_l={45} m_t={-15} >
          <Text color={COLORS.gray}>Debut</Text>
          <Text bold>  {formatDateToFrench(route.params.avec.startDate)} </Text>
        </Block>

        <Block row space='between' center m_l={45} >
          <Text color={COLORS.gray}>Fin</Text>
          <Text bold>  {formatDateToFrench(route.params.avec.endDate)} </Text>
        </Block>

        <Block  row>
          <IconButton
            icon="circle"
            iconColor={COLORS.purple}
            size={20}
          />
          <Block middle>
            <Text bold>Credit </Text>
          </Block>
        </Block>

        <Block row space='between' center m_l={45} m_t={-15}>
          <Text color={COLORS.gray}>Debut Octroi</Text>
          <Text bold>  {formatDateToFrench(route.params.avec.debut_octroi_credit)} </Text>
        </Block>

        <Block row space='between' center m_l={45} >
          <Text color={COLORS.gray}>Fin Octroi</Text>
          <Text bold>  {formatDateToFrench(route.params.avec.fin_octroi_credit)} </Text>
        </Block>

        <Block row>
          <IconButton
            icon="circle"
            iconColor={COLORS.blue}
            size={20}
          />
          <Block middle>
            <Text bold>Parts</Text>
          </Block>
        </Block>

        <Block row space='between' center m_l={45} m_t={-15}>
          <Text color={COLORS.gray}> Parts Totales du groupe</Text>
          <Text bold>20 (200 USD)</Text>
        </Block>

        {/* <Block row space='between' center m_l={45} >
          <Text color={COLORS.gray}> Parts achetees aujourdh'hui</Text>
          <Text bold>0 (0 USD)</Text>
        </Block> */}

        <Block row>
          <IconButton
            icon="circle"
            iconColor={COLORS.peach}
            size={20}
          />
          <Block middle>
            <Text bold>Emprunts</Text>
          </Block>
        </Block>
        
        <Block row space='between' center m_l={45} m_t={-15}>
          <Text color={COLORS.gray}> Emprunts Totales du groupe</Text>
          <Text bold>20 (200 USD)</Text>
        </Block>

        {/* <Block row space='between' center m_l={45} >
          <Text numberOfLines={1} color={COLORS.gray}> Remboursement attendu</Text>
          <Text bold>0 (0 USD)</Text>
        </Block>*/}

        <Block row space='between' center m_l={45} >
          <Text numberOfLines={1} color={COLORS.gray}> Remboursement en retard</Text>
          <Text bold>0 (0 USD)</Text>
        </Block> 

       
        <Block row>
          <IconButton
            icon="circle"
            iconColor={COLORS.gray}
            size={20}
          />
          <Block middle>
            <Text bold> Caisse de solidarités</Text>
          </Block>
        </Block>
        
        <Block row space='between' center m_l={45} m_t={-15}>
          <Text color={COLORS.gray}> Contributions Totales</Text>
          <Text bold>20 (200 USD)</Text>
        </Block>

        {/* <Block row space='between' center m_l={45} >
          <Text numberOfLines={1} color={COLORS.gray}> Contributions attendues</Text>
          <Text bold>0 (0 USD)</Text>
        </Block> */}

        <Block row space='between' center m_l={45} >
          <Text numberOfLines={1} color={COLORS.gray}> Contributions en retard</Text>
          <Text bold>0 (0 USD)</Text>
        </Block>
      </Block>
    )
  }

  const renderGraph = () => {
    return (
      <Block m={20} card>
        <Block p={20}>
        <Text bold numberOfLines={1}>
          Accumulation de l’épargne  ({route.params.avec.currency})
          </Text>
          <Text>les épargnes accumulées et les bénéfices tirés des prêts sont répartis entre les membres proportionnellement au montant qu’ils
ont épargné.</Text>
        </Block>

        <Svg style={{ width: '100%' }}>

        <VictoryChart height={400} 
          domainPadding={{ x: 30, y: 20 }}
        >
           <VictoryLegend x={50} y={0}
              gutter={50}
              style={{title: {fontSize: 20 } }}
              data={[
                { name: "Remboursement capital", symbol: { fill: "green" } },
                { name: "Intêret", symbol: { fill: COLORS.blue } },
                { name: "Epargne Collectée", symbol: { fill: "orange" } }
              ]}
            />
            <VictoryStack
              colorScale={["green", COLORS.blue, "orange"]}
            >
              {myDataset.map((data, i) => {
                return <VictoryBar labels={({ datum }) => {
                  return `${datum.y!==0? datum.y : ''}`
                }}
             data={data} key={i} //labelComponent={<VictoryLabel y={100} verticalAnchor={"middle"}/>}
             />;
              })}
            </VictoryStack>
            <VictoryAxis dependentAxis />
            <VictoryAxis 
            padding={{ left: 80, right: 60 }}
            axisLabelComponent={<VictoryLabel angle={20}/>}
            tickFormat={[`O Mois`, 
            `3 Mois`,
            `6 Mois`,
            `9 Mois`,
            `12 Mois`]}/>
        </VictoryChart>
        </Svg>
          </Block>
  )}

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

    {renderInfoGroup()}

    {renderGraph()}

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
          backdropComponent={BackdropElement}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: responsiveScreenWidth(5),}}
          onDismiss={() => setIsOpen(false)}
        >
            <Card.Title
            titleStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }}
            title="ATTENTION!" 
          />
          <Card.Content>
            <Text variant="titleLarge">Voulez-vous vraiment supprimer le Groupe { route.params.avec.name}?</Text>
            {statusLocal == 'failed' && status != 'loading'?
              <Text style={{color: COLORS.peach}}>Une erreur est survenue </Text>:<></>
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

          <BottomSheetModal
          ref={bottomSheetModalRefAdhesion}
          index={0}
          backdropComponent={BackdropElement}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: responsiveScreenWidth(5),}}
          onDismiss={() => setIsOpenAdhesion(false)}
        >
            <Card.Title
            titleStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }}
            title="ATTENTION!" 
          />
          <Card.Content>
            <Text variant="titleLarge">Vous souhaitez vraiment rejoindre le Groupe : { route.params.avec.name}?</Text>
            {statusLocal == 'failed' && status != 'loading'?
              <Text style={{color: COLORS.peach}}>Erreur d'adhésion</Text>:<></>
            }
          </Card.Content>
          <Card.Actions style={{ marginVertical: 15 }}>
            <Button onPress={hideModalAdhesion}>Annuler</Button>
            <Button buttonColor={COLORS.red} disabled={status == 'loading'}
            loading={status == 'loading'}
             onPress={() => {
              handleAdhesion()
            }} >Confirmer</Button>
          </Card.Actions>

          </BottomSheetModal>

          {/* {submit} */}
          <BottomSheetModal
          ref={bottomSheetModalRefSubmit}
          index={0}
          backdropComponent={BackdropElement}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: responsiveScreenWidth(5),}}
          onDismiss={() => setIsOpenSubmit(false)}
        >
            <Card.Title
            titleStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }}
            title="ATTENTION!" 
          />
          <Card.Content>
            <Text variant="titleLarge">Vous souhaitez vraiment Soummetre le Groupe : { route.params.avec.name}
            à l'équipe d'AFRICAN FINTECH pour validation?</Text>
            {statusLocal == 'failed' && status != 'loading'?
              <Text style={{color: COLORS.peach}}>Une erreur est survenue </Text>:<></>
            }
          </Card.Content>
          <Card.Actions style={{ marginVertical: 15 }}>
            <Button onPress={hideModalSubmit}>Annuler</Button>
            <Button buttonColor={COLORS.red} disabled={status == 'loading'}
            loading={status == 'loading'}
             onPress={() => {
              handleSubmit()
            }} >Confirmer</Button>
          </Card.Actions>

          </BottomSheetModal>

          {/* {quit} */}
          <BottomSheetModal
          ref={bottomSheetModalRefQuit}
          index={0}
          backdropComponent={BackdropElement}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: responsiveScreenWidth(5),}}
          onDismiss={() => setIsOpenQuit(false)}
        >
            <Card.Title
            titleStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }}
            title="ATTENTION!" 
          />
          <Card.Content>
            <Text variant="titleLarge">Vous souhaitez vraiment quitter le Groupe : { route.params.avec.name}?</Text>
            {statusLocal == 'failed' && status != 'loading'?
              <Text style={{color: COLORS.peach}}>Une erreur est survenue </Text>:<></>
            }
          </Card.Content>
          <Card.Actions style={{ marginVertical: 15 }}>
            <Button onPress={hideModalQuit}>Annuler</Button>
            <Button buttonColor={COLORS.red} disabled={status == 'loading'}
            loading={status == 'loading'}
             onPress={() => {
              handleQuit()
            }} >Confirmer</Button>
          </Card.Actions>

          </BottomSheetModal>

          {/* Membres */}

            <BottomSheetModal
              ref={bottomSheetModalMembres}
              index={1}
              backdropComponent={BackdropElement}
              snapPoints={snapPointsGouv}
              backgroundStyle={{ borderRadius: responsiveScreenWidth(5), backgroundColor:'#eee'}}
              onDismiss={() => setIsOpen(false)}
            >
              <BottomSheetFlatList
                data={membresListFull}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => 
                
                  <Membre type={false} user={item} navigation={navigation} action={action}
                    userConnected={connectedUser} owner={route.params.avec.owner} 
                    handleAcceptReject={handleAcceptReject} handleAcceptReq={handleAcceptReq}
                    isLoading={true} parts={0} dette={0} interest={route.params.avec.interest} 
                  />

                }
                contentContainerStyle={styles.contentContainer}
                refreshing={false}
                onRefresh={handleRefresh}
              />

            </BottomSheetModal>

            {/* Gouv */}
            <BottomSheetModal
              ref={bottomSheetModalReunion}
              index={1}
              backdropComponent={BackdropElement}
              snapPoints={snapPointsGouv}
              backgroundStyle={{ borderRadius: responsiveScreenWidth(5), backgroundColor:'#eee'}}
              onDismiss={() => setIsOpen(false)}
            >
              
              <BottomSheetFlatList
                data={route.params.avec?.reunion}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => 
                
                  <Reunion date={item} navigation={navigation} avec={route.params.avec} />

                }
                contentContainerStyle={styles.contentContainer}
                refreshing={false}
                onRefresh={handleRefresh}
              />

            </BottomSheetModal>

            {/* 5 membres  */}
            <BottomSheetModal
              ref={bottomSheetModalMembreBureau}
              index={0}
              backdropComponent={BackdropElement}
              snapPoints={snapPointsGouv}
              backgroundStyle={{ borderRadius: responsiveScreenWidth(5), backgroundColor:'#eee'}}
              onDismiss={() => setIsOpenMembreBureau(false)}
            >
              <BottomSheetFlatList
                //data={route.params.avec.membres.filter((val,key)=> val.type != "MEMBRE")}
                data={membresList}
                
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => 
                
                    <Membre type={true} user={item} navigation={navigation} action={action}
                    userConnected={connectedUser} owner={route.params.avec.owner} 
                    handleAcceptReject={handleAcceptReject} handleAcceptReq={handleAcceptReq}
                    isLoading={true} parts={0} dette={0} interest={route.params.avec.interest} 
                  />

                }
                contentContainerStyle={styles.contentContainer}
                refreshing={false}
                onRefresh={handleRefresh}
              />

            </BottomSheetModal>

            {/* ROI */}
            <BottomSheetModal
              ref={bottomSheetModalRoi}
              index={1}
              backdropComponent={BackdropElement}
              snapPoints={snapPointsGouv}
              backgroundStyle={{ borderRadius: responsiveScreenWidth(5), backgroundColor:'#eee'}}
              onDismiss={() => setIsOpenRoi(false)}
            >
              
           
              <ScrollView style={styles.container}>

                <Text style={styles.header}>Règlement Intérieur de l'Association Villageoise d'Épargne Crédit (AVEC)</Text>
                <Text style={styles.paragraph}>
                L'Association Villageoise d'Épargne Crédit (AVEC) est une organisation communautaire visant à promouvoir l'épargne, l'accès au crédit et le développement économique des membres. Ce règlement intérieur vise à établir des règles claires pour le bon fonctionnement de l'AVEC.
                </Text>

                <Text style={styles.subtitle}>Article 1 : Durée du Cycle</Text>
                <Text style={styles.paragraph}>
                1.1. Chaque cycle de l'AVEC a une durée de 9 à 12 mois.

                </Text>

                <Text style={styles.subtitle}>Article 2 : Réunions Hebdomadaires</Text>
                <Text style={styles.paragraph}>2.1. Les membres de l'AVEC se réunissent de manière hebdomadaire conformément au calendrier préétabli.

                </Text>
                <Text style={styles.paragraph}>2.2. Lors de chaque réunion hebdomadaire, les membres sont tenus de verser leur cotisation à la caisse de solidarité conformément aux montants définis par l'assemblée générale.
                </Text>
                <Text style={styles.paragraph}>2.3. Les membres ont également la possibilité d'acheter des parts d'épargne lors des réunions hebdomadaires.

                </Text>

                <Text style={styles.subtitle}>Article 3 : Épargne</Text>
                <Text style={styles.paragraph}>
                3.1. Les parts d'épargne représentent la somme totale épargnée par chaque membre au cours du cycle.
                </Text>
                <Text style={styles.paragraph}>3.2. Les membres sont encouragés à épargner régulièrement pour bénéficier des avantages de l'AVEC.

                </Text>

                <Text style={styles.subtitle}>Article 4 : Crédit</Text>
                <Text style={styles.paragraph}>
                4.1. À partir du 3ème ou 4ème mois du cycle, les membres qui le souhaitent peuvent souscrire un crédit auprès de l'AVEC.
                </Text>

                <Text style={styles.paragraph}>
                4.2. Le montant du crédit ne peut pas dépasser trois fois le montant total épargné par le membre.
                </Text>

                <Text style={styles.paragraph}>
                4.3. Les crédits sont assortis d'un taux d'intérêt de 10% par mois et doivent être remboursés sur une période de 3 à 4 mois.
                </Text>

                <Text style={styles.subtitle}>Article 5 : Remboursement</Text>
                <Text style={styles.paragraph}>
                5.1. À la fin de chaque cycle, tous les crédits octroyés doivent être entièrement remboursés par les débitrices.
                </Text>
                <Text style={styles.paragraph}>
                5.2. Les membres sont encouragés à rembourser leurs crédits de manière ponctuelle pour préserver la solidité financière de l'AVEC.
                </Text>
                

                <Text style={styles.subtitle}>Article 6 : Répartition des Bénéfices</Text>
                <Text style={styles.paragraph}>
                6.1. À la fin de chaque cycle, tous les bénéfices générés par l'AVEC, y compris les intérêts des crédits, sont distribués équitablement entre les membres au prorata de leurs parts épargnées.
                </Text>
              

                <Text style={styles.subtitle}>Article 7 : Modifications du Règlement Intérieur</Text>
                <Text style={styles.paragraph}>
                7.1. Toute modification du présent règlement intérieur doit être proposée lors d'une assemblée générale et adoptée à la majorité des membres présents.
                </Text>
                <Text style={styles.paragraph}>
                5.2. Les membres sont encouragés à rembourser leurs crédits de manière ponctuelle pour préserver la solidité financière de l'AVEC.
                </Text>

                

                <Text style={styles.subtitle}>Fait à Goma, le 01/01/2023</Text>

                <Text style={styles.subtitle}></Text>
                </ScrollView>
              

            </BottomSheetModal>


          </ScrollView>
          </BottomSheetModalProvider>
        
        </Provider>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
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
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },

  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
  },
});

export default DetailsAvec;
