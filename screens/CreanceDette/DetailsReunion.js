import React, { useCallback, useMemo, useRef, useState } from 'react';
import {ImageBackground, View, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput } from 'react-native';
import Block from '../Product/Block';
import { COLORS, FONTS, SIZES, icons } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../../components';
import {  Provider, Menu, Button, IconButton, Divider } from 'react-native-paper';
import {  BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { format } from 'date-fns';
import { fr as myFr } from 'date-fns/locale';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { FlatList } from 'react-native';
import Transaction from './Transaction';
import { Chat } from '@flyerhq/react-native-chat-ui';

const DetailsReunion = ({ route, navigation }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isOpenAchatPart, setIsOpenAchatPart] = useState(false);
  const [isOpenMesParts, setIsOpenMesParts] = useState(false);
  const [isOpenMesEmp, setIsOpenMesEmp] = useState(false);
  const [isOpenDemandCred, setIsOpenDemandCred] = useState(false);

  const [selectedItem, setSelectedItem] = useState([]);

  const snapPoints = useMemo(() => ["28%","50%", "60%", "70%", "80%", '90%'], []);

  const bottomSheetModalMenu = useRef(null);

  const [interestValid, setInterestValid] = useState(true); // Validation state for interest
  const [interest, setInterest] = useState('');

  const [empruntValid, setEmpruntValid] = useState(true); // Validation state for interest
  const [emprunt, setEmprunt] = useState('');

  // const { showActionSheetWithOptions } = useActionSheet()
  const [messages, setMessages] = useState([
   {
    author:{
      firstName: route.params?.avec?.owner.name,
      id: route.params?.avec?.owner._id,
      imageUrl: 'https://raw.githubusercontent.com/guillainbisimwa/bomoko-app/master/assets/icons/gens.png',
    },
    createdAt: Date.now() ,
      id: Math.random().toString(),
      status: 'seen',
      text: `Et soyez le bienvnues au group AVEC : ${route.params?.avec?.name}`,
      type: 'text',
   }])

  const addMessage = (message) => {
    setMessages([message, ...messages])
  }


  const handlePreviewDataFetched = ({
    message,
    previewData,
  }) => {
    setMessages(
      messages.map((m) =>
        m.id === message.id ? { ...m, previewData } : m
      )
    )
  }

  const handleMessagePress = async (message) => {
    if (message.type === 'file') {
      console.log('File');
      // try {
      //   await FileViewer.open(message.uri, { showOpenWithDialog: true })
      // } catch {}
    }
  }

  const handleSendPress = (message) => {
    const textMessage = {
      author: '06c33e8b-e835-4736-80f4-63f44b66666c',// id: route.params.connectedUser._id 
      createdAt: Date.now(),
      id: Math.random().toString(),
      text: message.text,
      type: 'text',
    }
    addMessage(textMessage)
  }
  
  const bottomSheetModalAchatPart = useRef(null);
  const bottomSheetModalMesParts = useRef(null);
  const bottomSheetModalMesEmp = useRef(null);
  const bottomSheetModalDemandCred = useRef(null);

  const bottomSheetModalContribHebdo = useRef(null);
  const bottomSheetModalCalend= useRef(null);
  const bottomSheetModalDisplayDetail = useRef(null);



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
  );

  const openModalMenu = useCallback(() => {
    bottomSheetModalMenu.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 5);
  }, []);

   // Gouv
   const handleClosePressMenu = useCallback(() => {
    bottomSheetModalMenu.current?.close();
  }, []);

  const hideModalMenu = () => handleClosePressMenu();


  const openModalAchatPart = useCallback(() => {
    bottomSheetModalAchatPart.current?.present();
    setTimeout(() => {
      setIsOpen(false)
      hideModalMenu();
      setIsOpenAchatPart(true);
    }, 0);
    setIsOpen(false)
    hideModalMenu();
  }, []);

   // Gouv
   const handleClosePressAchatPart = useCallback(() => {
    bottomSheetModalAchatPart.current?.close();
  }, []);

  const hideModalAchatPart = () => handleClosePressAchatPart();


  const openModalMesParts = useCallback(() => {
    bottomSheetModalMesParts.current?.present();
    setTimeout(() => {
      setIsOpenMesParts(true);
    }, 5);
  }, []);

   // Gouv
   const handleClosePressMesParts = useCallback(() => {
    bottomSheetModalMesParts.current?.close();
  }, []);


  const openModalMesEmp = useCallback(() => {
    bottomSheetModalMesEmp.current?.present();
    setTimeout(() => {
      setIsOpenMesEmp(true);
    }, 5);
  }, []);

   // Gouv
   const handleClosePressMesEmp = useCallback(() => {
    bottomSheetModalMesEmp.current?.close();
  }, []);


  const openModalDemandCred = useCallback(() => {
    bottomSheetModalDemandCred.current?.present();
    setTimeout(() => {
      setIsOpenDemandCred(true);
    }, 5);
  }, []);

   // Gouv
   const handleClosePressDemandCred = useCallback(() => {
    bottomSheetModalDemandCred.current?.close();
  }, []);

  const hideModalDemandCred= () => handleClosePressDemandCred();



  const openModalContibHebdo = useCallback(() => {
    bottomSheetModalContribHebdo.current?.present();
    setTimeout(() => {
      setIsOpen(false)
      hideModalMenu();
    }, 0);
    setIsOpen(false)
    hideModalMenu();
  }, []);

   // Gouv
   const handleClosePressContribHebdo = useCallback(() => {
    bottomSheetModalContribHebdo.current?.close();
  }, []);

  const hideModalContribHebdo = () => handleClosePressContribHebdo();



  const openModalCalend = useCallback(() => {
    bottomSheetModalCalend.current?.present();
    setTimeout(() => {
      setIsOpen(false)
      hideModalMenu();
    }, 0);
    setIsOpen(false)
    hideModalMenu();
  }, []);

   const handleClosePressCalend = useCallback(() => {
    bottomSheetModalCalend.current?.close();
  }, []);

  const hideModalCalend = () => handleClosePressCalend();


  const openModalDisplayDetail = useCallback(() => {
    bottomSheetModalDisplayDetail.current?.present();
    setTimeout(() => {
      setIsOpen(false)
      hideModalMenu();
    }, 0);
    setIsOpen(false)
    hideModalMenu();
  }, []);

   const handleClosePressDisplayDetail = useCallback(() => {
    bottomSheetModalDisplayDetail.current?.close();
  }, []);

  const hideModalDisplayDetail = () => handleClosePressDisplayDetail();

  
  const handleInterestChange = (text) => {
    const numericValue = parseFloat(text);
    if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 5) {
      setInterestValid(true); // Interest is valid
    } else {
      setInterestValid(false); // Interest is not valid
    }
    setInterest(text); // Update interest value
  };

  const handleEmprunChange = (text) => {
    const numericValue = parseFloat(text);
    if (!isNaN(numericValue) && numericValue >= parseInt(route.params.avec.amount) && numericValue <= (parseInt(route.params.avec.amount)*3)) {
      setEmpruntValid(true); // Interest is valid
    } else {
      setEmpruntValid(false); // Interest is not valid
    }
    setEmprunt(text); // Update interest value
  };
  

  const membresListFull = [
    ...route.params?.avec?.membres,
  { type: 'President', user:{...route.params?.avec?.owner, admin: true}} ];
  
  // Fonction pour convertir la date en format français
  const formatDateToFrench = (date) => {
    console.log('date', date);
    return format(new Date(date), 'dd MMMM yyyy', { locale: myFr });
  };

  const onPressTransaction = (item) => {
    console.log("On press", item);
    setSelectedItem(item)
    openModalDisplayDetail();

  }
  const renderImage = () => {
    return (
      <ImageBackground
        source={require('./../../assets/img/meeting.png')}
        resizeMode="cover"
        style={{ width: SIZES.width, height: 120, justifyContent: 'flex-end' }}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.9)']}
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
        
        <Block row center space='between'>
          <Block flex={1}>
          <Text h2  bold >REUNION : {route.params.reunion.num}</Text>
          <Text color={COLORS.peach} >Du {formatDateToFrench(route.params.reunion.dateStart)}</Text>
          <Text numberOfLines={1} gray bold >Bienvenue, { route.params.connectedUser.name}</Text>
          </Block>

          <Button mode='contained'  onPress={()=> openModalMenu()} >Menu</Button>
          
        </Block>
      </Block>
    );
  };


  const renderChat = () => {
    
    return (
      <Block m={20} card>
        <Block p={17}>
        <Text bold numberOfLines={1} h2>
          Message
          </Text>
          <Text>La reunion en chattant</Text>
        </Block>
        <Block>
          

        <Chat
          messages={messages}
          //onAttachmentPress={handleAttachmentPress}
          onMessagePress={handleMessagePress}
          onPreviewDataFetched={handlePreviewDataFetched}
          onSendPress={handleSendPress}
          user={{ id: route.params.connectedUser._id }}
          showUserNames={true}
          showUserAvatars={true}
        />


        </Block>
        </Block>
)};

  const renderListContrib = () => {
    return (
      <Block card m={20} p_b={20} >
        <Block p={17}>
          <Text bold numberOfLines={1} h2>
            Contibutions hebdomadaires
          </Text>
          <Block row space='between' >
          <Text numberOfLines={1} style={{flex: 1, marginRight: 10}}>La liste de toutes les contributions de ce jours</Text>
          <TouchableOpacity onPress={()=> console.log('ok')}>
          <Text color={COLORS.blue}>Voir plus</Text>

          </TouchableOpacity>
          </Block>
        </Block>
        <FlatList
            data={membresListFull?.slice(0,3)}
            renderItem={({ item }) => 
              <Transaction user={item} navigation={navigation} subtitle='Contibution hebdomadaire' topRight={1} 
              bottomRight='10 sep 2023' currency={route.params.avec.currency} onPressTransaction={onPressTransaction} />}
            keyExtractor={(item) => item._id} // Use a unique key for each item
          />
       
        </Block>
  )};

  const renderListAchatParts= () => {
    return (
      <Block card m_l={20} m_r={20} p_b={10} >
        <Block p={17}>
          <Text bold numberOfLines={1} h2>
            Achat des parts
          </Text>
          <Block row space='between' >
          <Text numberOfLines={1} style={{flex: 1, marginRight: 10}}>La liste de touts les Achats de parts de ce jours</Text>
          <TouchableOpacity onPress={()=> console.log('ok')}>
          <Text color={COLORS.blue}>Voir plus</Text>

          </TouchableOpacity>
          </Block>
        </Block>
        <FlatList
            data={membresListFull?.slice(-3)}
            renderItem={({ item }) => 
              <Transaction user={item} navigation={navigation} subtitle='ACHAT DES PARTS' topRight={50} 
              bottomRight='10 sep 2023' currency={route.params.avec.currency} onPressTransaction={onPressTransaction} />}
            keyExtractor={(item) => item._id} // Use a unique key for each item
          />
       
        </Block>
  )};

  const renderMenu = () => {
    return (
      <BottomSheetModal
        ref={bottomSheetModalMenu}
        index={1}
        backdropComponent={BackdropElement}
        snapPoints={snapPoints}
        backgroundStyle={{ borderRadius: responsiveScreenWidth(5), backgroundColor:'#eee'}}
        onDismiss={() => hideModalMenu()}
      >
      
      <Block >
      <Block p_l={17} p_r={17} row space='between' center>
          <Block  flex={1}>
            <Text bold h2>MENU</Text>
          </Block>
          <TouchableOpacity onPress={()=> hideModalMenu()}>
            <IconButton
              icon="close"
              iconColor={COLORS.red}
              size={40}
            />
          </TouchableOpacity>
        </Block>
        <TouchableOpacity onPress={()=>{ 
            openModalAchatPart();
          }} >
          <Block p_l={17} p_b={17}  row center>
          <Image
            source={icons.shopping}
            style={{
              width: 30,
              height: 30,
              marginRight: 20,
              tintColor: COLORS.purple,
            }}
          />
            <Text bold>Achats des parts</Text>
          </Block>
        </TouchableOpacity>

        <Divider />

        <TouchableOpacity onPress={()=>{ 
            openModalDemandCred();
          }} >
          <Block p={16} row center>
          <Image
            source={icons.sell}
            style={{
              width: 30,
              height: 30,
              marginRight: 20,
              tintColor: COLORS.peach,
            }}
          />
            <Text bold>Demande de Credit</Text>
          </Block>
        </TouchableOpacity>

        <Divider />

        <TouchableOpacity onPress={()=>{ 
            openModalContibHebdo();
          }} >
          <Block p={15} row center>
          <Image
            source={icons.cash}
            style={{
              width: 30,
              height: 30,
              marginRight: 20,
              tintColor: COLORS.blue,
            }}
          />
            <Text bold>Contribution hebdomadaire </Text>
          </Block>
        </TouchableOpacity>

        <Divider />

        <TouchableOpacity onPress={()=>{ 
            openModalCalend();
          }} >
          <Block p={17} row center>
          <Image
            source={icons.calendar}
            style={{
              width: 30,
              height: 30,
              marginRight: 20,
              tintColor: COLORS.darkgray,
            }}
          />
            <Text bold>Calendrier de Remboursement </Text>
          </Block>
        </TouchableOpacity>
      </Block>

    </BottomSheetModal>
    )
  }


  const renderAchatPart = () => {
    return (
      <BottomSheetModal
        ref={bottomSheetModalAchatPart}
        index={1}
        backdropComponent={BackdropElement}
        snapPoints={snapPoints}
        backgroundStyle={{ borderRadius: responsiveScreenWidth(5), backgroundColor:'#eee'}}
        onDismiss={() => hideModalAchatPart()}
      >
      
      <Block p={17} >
        <Block row space='between'>
          <Block >
            <Text bold h2>Achat des parts</Text>
            <Text color={COLORS.blue}>{`Le prix d'une part est de ${route.params.avec.amount}  ${route.params.avec.currency} `}</Text>
          </Block>
          <TouchableOpacity onPress={()=> hideModalAchatPart()}>
            <IconButton
              icon="close"
              iconColor={COLORS.red}
              size={40}
            />
          </TouchableOpacity>
        </Block>

        <Block p_b={10}>
          <Text style={styles.label}>Nombre de parts</Text>
          <TextInput
              style={[styles.input, !interestValid && styles.inputError]} // Apply red border if not valid
              value={interest}
              onChangeText={handleInterestChange}
              keyboardType="numeric"
              placeholder="Nombre de parts"
            />
            {!interestValid && (
              <Text style={styles.errorText}>Entre 1 et 5 parts</Text>
            )}

            {interest &&interestValid && (
              <Text style={styles.label}>Voulez-vous acheter {parseInt(interest)} parts a {
              parseInt(parseInt(interest) * parseInt(route.params.avec.amount))} {route.params.avec.currency}?
              </Text>
            )}


          <Button mode='contained' disabled={!interestValid}  style={{marginTop:10}} onPress={()=> {
            setInterest(null);
            setInterestValid(true);
            hideModalAchatPart()
            navigation.navigate('ConfirmPayment', {
              somme: parseInt(parseInt(interest) * parseInt(route.params.avec.amount)),
              nombreParts: parseInt(parseInt(interest)),
              prixParts: parseInt(parseInt(route.params.avec.amount)),
              connectedUser:  route.params.connectedUser,
              motif:  `Achat de ${parseInt(parseInt(interest))} parts a ${parseInt(parseInt(interest) * parseInt(route.params.avec.amount))} ${route.params.avec.currency}`,
              titre: 'Confirmez votre payment',
              button:'Verifier && confirmer',
              avec: route.params.avec,
              type:'achat'

            })
          }} >ACHETER</Button>
          </Block>
      </Block>

    </BottomSheetModal>
    )
  }

  const renderDemandeCredit = () => {
    return (
      <BottomSheetModal
        ref={bottomSheetModalDemandCred}
        index={1}
        backdropComponent={BackdropElement}
        snapPoints={snapPoints}
        backgroundStyle={{ borderRadius: responsiveScreenWidth(5), backgroundColor:'#eee'}}
        onDismiss={() => hideModalDemandCred()}
      >
        <BottomSheetScrollView>
        <Block p={17} >
        <Block row space='between'>
          <Block m_b={10} flex={1}>
            <Text bold h2>Demande de Credit</Text>
            <Text numberOfLines={2} color={COLORS.blue}>{`Vous pouvez emprunter jusqu’à un maximum de 3 fois la valeur de votre épargne `}</Text>
          </Block>
          <TouchableOpacity onPress={()=> hideModalDemandCred()}>
            <IconButton
              icon="close"
              iconColor={COLORS.red}
              size={40}
            />
          </TouchableOpacity>
        </Block>

        <Block p_b={10}>
          <Text style={styles.label}>Somme a emprunter</Text>
          <TextInput
              style={[styles.input, !empruntValid && styles.inputError]} // Apply red border if not valid
              value={emprunt}
              onChangeText={handleEmprunChange}
              keyboardType="numeric"
              placeholder="Somme a emprunter"
            />
            {!empruntValid && (
              <Text style={styles.errorText}>Entre {route.params.avec.amount} et {parseInt(route.params.avec.amount*3)} {route.params.avec.currency}</Text>
            )}

            {emprunt &&empruntValid && (
              <Text style={styles.label}>Voulez-vous emprunter {parseInt(emprunt)} {route.params.avec.currency}?
              </Text>
            )}


          <Button mode='contained' disabled={!empruntValid}  style={{marginTop:10}} onPress={()=> {
            setEmprunt(null);
            setEmpruntValid(true);
            hideModalDemandCred();
            navigation.navigate('ConfirmPayment', {
              somme: parseInt(emprunt),
              nombreParts: parseInt(parseInt(interest)),
              prixParts: parseInt(parseInt(route.params.avec.amount)),
              connectedUser:  route.params.connectedUser,
              motif:  `Demande de ${parseInt(emprunt)}  ${route.params.avec.currency} d'emprunt`,
              titre: "Confirmer votre demande d'Emprunt",
              button:'Confirmer votre demande',
              avec: route.params.avec,
              type:'emprunt'
            })
          }} >Demande d'emprunt</Button>
          </Block>
      </Block>
        </BottomSheetScrollView>
      
      

    </BottomSheetModal>
    )
  }


  const renderContribHebdo = () => {
    return (
      <BottomSheetModal
        ref={bottomSheetModalContribHebdo}
        index={0}
        backdropComponent={BackdropElement}
        snapPoints={snapPoints}
        backgroundStyle={{ borderRadius: responsiveScreenWidth(5), backgroundColor:'#eee'}}
        onDismiss={() => hideModalContribHebdo()}
      >
        <BottomSheetScrollView>
        <Block p={17} >
        <Block row space='between'>
          <Block m_b={10} flex={1}>
            <Text bold h2>Contibution Hebdomadaire</Text>
            <Text color={COLORS.blue}>{`La somme de contribution est de ${route.params.avec.frais_Social.somme}  ${route.params.avec.currency} `}</Text>
          </Block>
          <TouchableOpacity onPress={()=> hideModalContribHebdo()}>
            <IconButton
              icon="close"
              iconColor={COLORS.red}
              size={40}
            />
          </TouchableOpacity>
        </Block>

        <Block p_b={10}>
         
          <Button mode='contained' disabled={!empruntValid}  style={{marginTop:10}} onPress={()=> {
            setEmprunt(null);
            setEmpruntValid(true);
            hideModalDemandCred();
            navigation.navigate('ConfirmPayment', {
              somme: parseInt(route.params.avec.frais_Social.somme),
              nombreParts: parseInt(parseInt(interest)),
              prixParts: parseInt(parseInt(route.params.avec.amount)),
              connectedUser:  route.params.connectedUser,
              motif:  `Contribution hebdomadaire de ${parseInt(route.params.avec.frais_Social.somme)}  ${route.params.avec.currency}`,
              titre: "Confirmer votre contribution hebdomadaire",
              button:'Contribuer',
              avec: route.params.avec,
              type:'contrib'
            })
          }} > {` Contibuer ${route.params.avec.frais_Social.somme}  ${route.params.avec.currency}`}</Button>
          </Block>
      </Block>
        </BottomSheetScrollView>
      

    </BottomSheetModal>
    )
  }

  const renderCalend = () => {
    return (
      <BottomSheetModal
        ref={bottomSheetModalCalend}
        index={1}
        backdropComponent={BackdropElement}
        snapPoints={snapPoints}
        backgroundStyle={{ borderRadius: responsiveScreenWidth(5), backgroundColor:'#eee'}}
        onDismiss={() => hideModalCalend()}
      >
        <BottomSheetScrollView>
        <Block p={17} >
        <Block row space='between'>
          <Block m_b={10} flex={1}>
            <Text bold h2>Calendrier de Remboursement</Text>
            <Text color={COLORS.blue}>{`Le remboursement`}</Text>
          </Block>
          <TouchableOpacity onPress={()=> hideModalCalend()}>
            <IconButton
              icon="close"
              iconColor={COLORS.red}
              size={40}
            />
          </TouchableOpacity>
        </Block>

        <Block p_b={10}>
          <Text style={styles.label}>Calendrier de remboursement</Text>

          
          </Block>
      </Block>
        </BottomSheetScrollView>
      

    </BottomSheetModal>
    )
  }
  const renderDisplayDetail = () => {
    return (
      <BottomSheetModal
        ref={bottomSheetModalDisplayDetail}
        index={3}
        backdropComponent={BackdropElement}
        snapPoints={snapPoints}
        backgroundStyle={{ borderRadius: responsiveScreenWidth(5), backgroundColor:'#eee'}}
        onDismiss={() => hideModalDisplayDetail()}
      >
        <BottomSheetScrollView>
        <Block p={17} >
        <Block row space='between'>
          <Block m_b={10} flex={1}>
            <Text bold h2>Details</Text>
            <Text color={COLORS.blue}>{`Details de la transaction`}</Text>
          </Block>
          <TouchableOpacity onPress={()=> hideModalDisplayDetail()}>
            <IconButton
              icon="close"
              iconColor={COLORS.red}
              size={40}
            />
          </TouchableOpacity>
          
        </Block>

        <Block p_b={10} row space='between'>
          <Block flex={1}>
          { selectedItem.user?.profile_pic  ? (
              <Image
                source={{ uri: selectedItem.user?.profile_pic  }}
                style={{ width: 80, height: 80, borderRadius:40, borderWidth:1,
                borderColor: COLORS.white}}
              />
            ) : (
              <Image
                source={icons.investment}
                style={{
                  width: 80,
                  height: 80,
                  tintColor: COLORS.black,
                }}
              />
            )}
                
          </Block>

          <Block flex={3} middle>
            <Block row space='between'>
              <Text bold>A :</Text>
              <Text gray>{`${route.params.avec.name}`}</Text>
            </Block>

            <Block row space='between'>
              <Text bold>DE :</Text>
              <Text gray>{`${selectedItem?.user?.name}`}</Text>
            </Block>

            <Block row space='between'>
              <Text bold>DATE :</Text>
              <Text gray>{`${route.params.avec.timestamp}`}</Text>
            </Block>
          </Block>

        </Block>

        <Divider />
          <Block p_t={15} p_b={15} row space='between'>
            <Text h3 bold>TYPE</Text>
            <Text >Contributions Hebdomadaires</Text>
          </Block>

          <Divider />
          <Block p_t={15} p_b={15} row space='between'>
            <Text h3 bold>SOMME</Text>
            <Text >{route.params.avec.amount} {route.params.avec.currency}</Text>
          </Block>

          <Divider />
          <Block p_t={15} p_b={15} row space='between'>
            <Text h3 bold>TRANSACTION ID</Text>
            <Text >#123-345</Text>
          </Block>

          <Divider />
          <Block p_t={15} p_b={15} row space='between'>
            <Text h3 bold>STATUS</Text>
            <Text color={COLORS.peach} >En attente</Text>
          </Block>

          <Divider />
          <Block p_t={15} p_b={15} >
            <Button mode='contained' buttonColor={COLORS.blue} >TELECHARGER PDF</Button>
          </Block>

          
      </Block>
        </BottomSheetScrollView>
      

    </BottomSheetModal>
    )
  }


  return (
    <Provider>
      <BottomSheetModalProvider>

      <ScrollView showsVerticalScrollIndicator={false} accessibilityElementsHidden={false}>
    <Block>
      {/* Fixed content */}
      <Block style={styles.topdetailsText} >
            <Text bold h1 white> 0 USD</Text>
            <Text white>Mon épargne total</Text>
        </Block>
      <View>
        {renderImage()}
      </View>

      {/* Scrollable content */}
      <View style={{ alignItems: "center" }}>
        {renderTopDetails()}
      </View>
{/* 
      <Block row space="between" center>
        <TouchableOpacity style={{ width: '40%', marginHorizontal:20, marginVertical: 10}} onPress={()=> console.log('ok')}>
          <Block card  style={{ alignItems: 'center',  padding:10}}>
        <IconButton
          icon="arrow-up"
          iconColor={COLORS.darkgreen}
          size={30}
        />
          <Text bold>Achat des parts</Text>
          <Text>Une part a 5 USD</Text>
          </Block>
        </TouchableOpacity>

        <TouchableOpacity style={{ width: '40%', marginHorizontal:20, marginVertical: 10 }} onPress={()=> console.log('ok')}>
          <Block card style={{ alignItems: 'center',  padding:10}}>
          <IconButton
            icon="arrow-down"
            iconColor={COLORS.peach}
            size={30}
          />
          <Text bold>Achat des parts</Text>
          <Text>Une part a 5 USD</Text>
          </Block>
        </TouchableOpacity>
      </Block> */}

      <Block row space="between" m_l={20} m_r={20} m_t={10}>
      <TouchableOpacity style={{ }} onPress={()=> console.log('ok')}>
          <Block card style={{ alignItems: 'center'}} p={10}>
        
              <Text bold>0</Text>
              <Text>Mes parts</Text>
          
         
          </Block>
        </TouchableOpacity>

        <TouchableOpacity style={{ }} onPress={()=> console.log('ok')}>
          <Block card style={{ alignItems: 'center'}} p={10}>
        
                    <Text bold>0</Text>
                    <Text>Mes emprunts</Text>
          
         
          </Block>
        </TouchableOpacity>


        <TouchableOpacity style={{ }} onPress={()=> console.log('ok')}>
          <Block card style={{ alignItems: 'center'}} p={10}>
        
                    <Text bold>0</Text>
                    <Text>Mon intérêt</Text>
          
         
          </Block>
        </TouchableOpacity>


      </Block>

      {renderListContrib()}

      {renderListAchatParts()}

      {renderChat()}

     

      <Block>
        
      
        {/* Bottomsheet */}
        {renderMenu()}
        {renderAchatPart()}
        {renderDemandeCredit()}
        {renderContribHebdo()}
        {renderCalend()}
        {renderDisplayDetail()}
      </Block>
    </Block>
      
          </ScrollView>
          </BottomSheetModalProvider>
        
        </Provider>
  );
};

const styles = StyleSheet.create({
  topdetails:{
    width: '90%',
    marginTop:-20,
    padding:15,
    elevation:2,
  },
  topdetailsText:{
  zIndex:99,
    position:'absolute',
    top:40,
    left: '35%',
    
  },
  inputError: {
    borderColor: 'red', // Red border for invalid input
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  }
});

export default DetailsReunion;
