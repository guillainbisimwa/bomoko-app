import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {ImageBackground, View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Block from '../Product/Block';
import { COLORS, FONTS, SIZES, icons } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../../components';
import { Divider, Button, Snackbar, Modal, Card, ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAvec } from '../../redux/avecReducer';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';

const DetailsAvec = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const { avecs, status, error }= useSelector((state) => state.avecs); 

  const [showFullContent, setShowFullContent] = useState(false);
  const [statusLocal, setStatusLocal] = useState(false);

  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const onToggleSnackBar = () => setVisible(!visible);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };
  
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
      ...route.params.food,
      id: route.params.food._id,
      membres: [
        ...route.params.food.membres,
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
            <Text  numberOfLines={1} style={styles.contentTitle}>{route.params.avec.timestamp}</Text>
          </View>

          {/* Second Column */}
          <View style={styles.columnTitle2}>
            <Button compact mode="contained">
              + 99000 CDF
            </Button>
          </View>
        </View>
      <Block row  space='between'>
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
            onPress={() => {
            }}
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
            onPress={() => {
            }}
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
            onPress={() => {
            }}
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
        </Block>

        <Divider />
        <Divider />

        <View style={styles.containerTop}>

          {/* Column 1 */}
          <View style={styles.column}>
            <Text style={styles.title}>DEVISE</Text>
            <Text style={styles.content}>{route.params.avec.currency}</Text>

          </View>

          {/* Column 2 */}
          <View style={styles.column}>
            <Text style={styles.title}>PART</Text>
            <Text style={styles.content}>{route.params.avec.amount} {route.params.avec.currency}</Text>
          </View>

          {/* Column 3 */}
          <View style={styles.column}>
            <Text style={styles.title}>CYCLE</Text>
            <Text style={styles.content}>{route.params.avec.cycle.number} mois</Text>
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

        <Button buttonColor={COLORS.darkgreen} mode="contained">
              Demande d'Adhesion
        </Button>
        <Block row m_t={5} space='between' >

        <Button buttonColor={COLORS.peach} mode="contained"  onPress={() => {
          openModal();
        }}>
              Supprimer
        </Button>

        <Button buttonColor={COLORS.blue} mode="contained" onPress={()=>
              {
                // console.log("route.params.food", route.params.food);
                 navigation.navigate('EditAvec', {avec: route.params.avec });
              }}>
              Modifier
        </Button>

        <Button buttonColor={COLORS.darkgreen} mode="contained">
              Soumettre
        </Button>
        </Block>


      </Block>
    );
  };


  return (
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
    marginBottom: 8,
  },
  content: {
    fontSize: 13,
    color:'grey'
  },
  titleMenu:{
    color: COLORS.gray
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
