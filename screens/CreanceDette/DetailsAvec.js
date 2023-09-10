import React, { useEffect, useState } from 'react';
import {ImageBackground, View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Block from '../Product/Block';
import { COLORS, FONTS, SIZES } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../../components';
import { Divider, Button, Snackbar, Modal, Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAvec } from '../../redux/avecReducer';

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
  
  useEffect(()=>{
    console.log(route.params.avec.owner);
    if (status === "succeeded" &&  statusLocal  ) {
      // Navigate to the Home screen
      //navigation.navigate('Main');
    }
    else {
      //onToggleSnackBar()
    }
  },[]);


  // Modal Delete AVEC
  const [visibleDel, setVisibleDel] = useState(false);
  const showModalDel = () => setVisibleDel(true);
  const hideModalDel = () => setVisibleDel(false);

  const handleDelete = async () => {
    dispatch(deleteAvec({
      id: route.params.avec._id
    }));

     // Check if the product was deleted successfully
    if (!error) {
      // Navigate back to the previous screen
      navigation.navigate('Main');
    }else {
      onToggleSnackBar()
    }
  }
  

  const containerStyle = {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 10,
    alignSelf: 'center',
    position:"absolute",
    top:'15%'
  };

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
            <Text h3>Description</Text>
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

        <Button buttonColor={COLORS.peach} mode="contained">
              Supprimer
        </Button>

        <Button textColor="#fff" elevated buttonColor={COLORS.peach} onPress={()=> showModalDel()}>
                Supprimer
              </Button>

        <Button buttonColor={COLORS.blue} mode="contained">
              Modifier
        </Button>

        <Button buttonColor={COLORS.darkgreen} mode="contained">
              Soumettre
        </Button>
        </Block>

          {/* Delete Prod/Serv */}
      <Modal
        style={{ zIndex: 99 }}
        visible={visibleDel}
        onDismiss={hideModalDel}
        contentContainerStyle={[containerStyle, { zIndex: 999 }]} // Set a higher value for the z-index
      >
        <Card style={{ padding: 10 }}>
          <Card.Title
            titleStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }}
            title="ATTENTION!" 
          />
          <Card.Content>
            <Text variant="titleLarge">Voulez-vous vraiment supprimer le Groupe { route.params.avec.name}?</Text>
          </Card.Content>
          <Card.Actions style={{ marginTop: 15 }}>
            <Button onPress={hideModalDel}>Annuler</Button>
            <Button buttonColor={COLORS.red}
             onPress={() => {
              hideModalDel()
              handleDelete()
            }} >Supprimer</Button>
          </Card.Actions>
        </Card>
      </Modal>

      </Block>
    );
  };


  

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <Block flex={1}>
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
  </ScrollView>

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
