import React, { useCallback, useMemo, useRef, useState } from 'react';
import {ImageBackground, View, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput } from 'react-native';
import Block from '../Product/Block';
import { COLORS, FONTS, SIZES, icons } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../../components';
import {  Provider, Menu, Button, IconButton, Chip, Divider } from 'react-native-paper';
import {  BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { format } from 'date-fns';
import { fr as myFr } from 'date-fns/locale';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLegend, VictoryStack, VictoryTheme } from 'victory-native';
import { Svg } from 'react-native-svg';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';

const DetailsReunion = ({ route, navigation }) => {

  const [isOpen, setIsOpen] = useState(false);

  const [isOpenAchatPart, setIsOpenAchatPart] = useState(false);
  const [isOpenMesParts, setIsOpenMesParts] = useState(false);
  const [isOpenMesEmp, setIsOpenMesEmp] = useState(false);
  const [isOpenDemandCred, setIsOpenDemandCred] = useState(false);

  const snapPoints = useMemo(() => ["28%","50%", "60%", "80%", '90%'], []);

  const bottomSheetModalMenu = useRef(null);

  const [interestValid, setInterestValid] = useState(true); // Validation state for interest
  const [interest, setInterest] = useState('');

  const bottomSheetModalAchatPart = useRef(null);
  const bottomSheetModalMesParts = useRef(null);
  const bottomSheetModalMesEmp = useRef(null);
  const bottomSheetModalDemandCred = useRef(null);


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

  const hideModalMesParts = () => handleClosePressMesParts();


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

  const hideModalMesEmp = () => handleClosePressMesEmp();



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

  const hideModalDemandCred = () => handleClosePressDemandCred();

  
  const handleInterestChange = (text) => {
    const numericValue = parseFloat(text);
    if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 5) {
      setInterestValid(true); // Interest is valid
    } else {
      setInterestValid(false); // Interest is not valid
    }
    setInterest(text); // Update interest value
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
  
  // Fonction pour convertir la date en format français
  const formatDateToFrench = (date) => {
    console.log('date', date);
    return format(new Date(date), 'dd MMMM yyyy', { locale: myFr });
  };

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
          <Block>
          <Text h2  bold >REUNION</Text>
          <Text color={COLORS.peach} >Du {formatDateToFrench(route.params.reunion.dateStart)}</Text>
          </Block>

          <Button mode='contained'  onPress={()=> openModalMenu()} >Menu</Button>
          
        </Block>
      </Block>
    );
  };

  const renderChat = () => {
    return (
      <Block m={20} card>
        <Block p={20}>
        <Text bold numberOfLines={1} h2>
          Message
          </Text>
          <Text>La reunion en chattant</Text>
        </Block>
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
        <TouchableOpacity onPress={()=>{ 
            //hideModalMenu();
            openModalAchatPart();
          }} >
          <Block m_b={10} p={20} row center>
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

        <TouchableOpacity>
          <Block m_b={10} p={20} row center>
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

        <TouchableOpacity>
          <Block m_b={10} p={20} row center>
          <Image
            source={icons.cash}
            style={{
              width: 30,
              height: 30,
              marginRight: 20,
              tintColor: COLORS.blue,
            }}
          />
            <Text bold>Contribution caisse solidaire </Text>
          </Block>
        </TouchableOpacity>


        <Divider />

        <TouchableOpacity>
          <Block m_b={10} p={20} row center>
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
      
      <Block p={20} >
        <Block row space='between'>
          <Block >
            <Text bold h2>Achat des parts</Text>
            <Text color={COLORS.peach}>{`Le prix d'une part est de ${route.params.avec.amount}  ${route.params.avec.currency} `}</Text>
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

          <Button mode='contained'  style={{marginTop:10}}>Creer un AVEC</Button>
          </Block>
      </Block>

    </BottomSheetModal>
    )
  }



  return (
    <Provider>
      <BottomSheetModalProvider>

      <ScrollView>
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

      {renderChat()}

      <Block card m_l={20} m_r={20} p={10} m_t={10} m_b={20}>
        <Block>
          <Text h2 bold>Details de la Reunion</Text>
          <Text>2 Membres</Text>
        </Block>
        <Block m_t={5} m_b={15} row center space='between'>
          <Chip icon="information" elevated >Reunion 1</Chip>
          <Text>30 min</Text>
        </Block>
        <Divider />
        <Block m_t={15}><Text numberOfLines={1} h2 bold>{route.params.avec.name}</Text></Block>
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

      <Block>
        
      
        {/* Bottomsheet */}
        {renderMenu()}
        {renderAchatPart()}
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
