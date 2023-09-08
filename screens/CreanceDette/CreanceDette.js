import React, {  useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../../constants';

import {Text, Provider, Badge, Divider, Chip, MD3Colors, ProgressBar, ActivityIndicator, FAB, Modal, Card, Button } from 'react-native-paper';
import { ImageBackground } from 'react-native';
import Block from '../Product/Block';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvecs } from '../../redux/avecReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CreanceDette = ({ navigation, route }) => {
  const [ badgePanding, setBadgePanding ] = useState(0);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes, SetRoutes] = useState([
    { key: "first", title: `AVEC`},
    // { key: "second", title: `Route2` },
    // { key: "third", title: "Route3" },
  ]);
  const [visible, setVisible] = useState(false);
  const [token, setToken] = useState(null);

  const dispatch = useDispatch();
  const avecs = useSelector((state) => state.avecs); 
  const [isFetchingComplete, setIsFetchingComplete] = useState(false);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();

    // Add a navigation listener to refetch data when the screen comes into focus
    const focusListener = navigation.addListener('focus', () => {
      fetchData();
    });

    return () => {
      // Check if remove() is defined before calling it
      if (typeof focusListener.remove === 'function') {
        focusListener.remove();
      } else {
        //throw new Error("focusListener.remove is not a function");
        console.log('FocusListener.remove is not a function')
      }
    };

  }, [dispatch, navigation]);

  const getTokenFromAsyncStorage = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('user');
      setToken(storedToken);
    } catch (error) {
      // Handle AsyncStorage read error if needed
      console.error('Error reading token from AsyncStorage:', error);
    }
  };

  const fetchData = () => {
    // Only dispatch the fetchAvecs action if fetching is not already complete
    if (!isFetchingComplete) {
      dispatch(fetchAvecs())
        .then(() => {
          setIsFetchingComplete(true); // Mark fetching as complete
          getTokenFromAsyncStorage(); 
        })
        .catch((error) => {
          // Handle error if needed
          console.error('Error fetching avecs:', error);
        });
    }
  };

  // Modal
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 10,
    alignSelf: 'center',
  };


  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: COLORS.peach,
        padding:3,
      }}
      style={{
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius:10,
        marginTop: -5
      }}
      renderLabel={({ focused, route }) => (
        <Text  style={[{ color: focused ? COLORS.black : COLORS.gray }]}>
          {route.title}
        </Text>
      )}
    />
  );

 
  function renderNavBar() {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingTop: SIZES.base * 5,
          justifyContent: 'space-between',
          paddingHorizontal: SIZES.padding,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              paddingRight: SIZES.base * 2,
            }}
            onPress={() => {
              //console.log('Menu');
              navigation.openDrawer();
            }}
          >
            <Image
              source={icons.menu}
              style={{
                width: SIZES.base * 4,
                height: SIZES.base * 3,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
          
          <View>
            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>African Fintech</Text>
            <Text style={{ ...FONTS.h3, color: COLORS.gray }}>(Créance et Dettes)</Text>
        </View>
        </View>
        
        <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'flex-end', width: 50 }}
          onPress={() => {
            console.log('shopping');
            //console.log("Token --",JSON.parse(token).user.user.username);
            
          }}
        >
          <Image
            source={icons.shopping}
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.white,
            }}
          />
            <Badge style={{ position:"absolute", top:2, right:-8 }}>{badgePanding}</Badge>

        </TouchableOpacity>
        
      <View
        style={{
          justifyContent: 'center', alignItems: 'flex-end', width: 50
        }}>
        
      </View>
         
      </View>
      </View>
    );
  }


  const Route1 = () => {
    // Check if status is loading
    if (avecs.status === 'loading') {
      return (
        // Render a loading indicator here
        <ScrollView style={{ flex: 1 , paddingHorizontal:5, paddingVertical:10,
          backgroundColor: 'transparent'}}>
          <ActivityIndicator style={styles.activity} size="large" color='white'/>
        </ScrollView>
      );
    }

    return (
      <ScrollView style={{ flex: 1 ,  paddingVertical:10,
      backgroundColor: 'transparent'}}>
        {
          avecs?.avecs?.map((avec, key) => {

            const date = new Date(avec.startDate);

            // Create an options object for formatting the date
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            
            // Format the date in French
            const frenchDate = date.toLocaleDateString('fr-FR', options);
            
            // Calculate the number of days left to reach today's date
            const today = new Date();
            const timeDifference = date.getTime() - today.getTime();
            const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
            
            // console.log('French Date:', frenchDate);
            // console.log('Days Left:', daysLeft);

          return(
            <TouchableOpacity style={styles.card} key={avec._id} onPress={()=> navigation.navigate("DetailsAvec", {avec})}>
              <Text numberOfLines={1} style={styles.bold}>{avec.name}</Text>
              <Text style={styles.small}>Debute {frenchDate}</Text>
              <Text numberOfLines={2} style={styles.normal}>{avec.detail}</Text>
              <Divider style={styles.div} />
              <Block row center space="between">
              <ProgressBar
                progress={10}
                color={COLORS.purple}
                style={{ width: SIZES.width /1.8, height: SIZES.base }}
                animatedValue={0.1}
                visible
              />
              <Text numberOfLines={1} semibold size={19} style={{ marginLeft: 20 }}>
              {10}%
              </Text>
            </Block>

              <Text style={styles.boldGrey}>Membres</Text>
              <View style={styles.imgs}>
                {avec?.membres?.slice(0,5).map((value, key) =>{
                  console.log();
                  //console.log(value.user);
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
                {avec?.membres?.length >= 5 && (
                  <Text style={styles.moreImagesText}>+ 
                  {avec?.membres?.length - 5} plus</Text>
                )}
              </View>


              <Block row p={10} space="between" >
                <Chip icon="information"style={{backgroundColor: `${avec?.status=='PENDING'? '#ebebeb':'#5dbb63'}`}}
                 elevated >{`${avec?.status=='PENDING'? 'En attente':'Validé'}`}</Chip>
                <Chip  style={{backgroundColor: `${daysLeft<0? '#e3242b':'#ebebeb'}`}} icon="information" elevated >{daysLeft>0? `Dans ${daysLeft} jours`:`Retard`}</Chip>

              </Block>
              <Divider />
                <Block row space="between" m_t={5} m_b={5}>
                <Text style={styles.bold}>
                  {avec?.amount} {avec?.currency} 
                </Text>
                <Text style={styles.bold}>
                  {avec?.cycle?.name} 
                </Text>
              </Block>
            </TouchableOpacity>
        )})}
        
      </ScrollView>
  )};

const Route2 = () => (
  <ScrollView style={{ flex: 1 , paddingHorizontal:5, paddingVertical:10, 
  backgroundColor: 'transparent'}}>
   <Route1/>
  </ScrollView>
);

const Route3 = () => (
  <ScrollView style={{ flex: 1 , paddingHorizontal:5, paddingVertical:10, 
  backgroundColor: 'transparent'}}>
       <Route1/>
       <Route1/>
       <Route1/>
       <Route1/>

  </ScrollView>
);

  const topMenu = () => {

    return <Block  style={styles.topMenu} >
      <View style={styles.myTopCard}>
        {/* <Text variant="titleMedium">Associations villageoises d’épargne et de crédit (AVEC)</Text> */}
        <Text style={styles.text}>
        Gérez 
        vos épargnes, demandes des crédits et promouvoir la solidarité financière.
        </Text>
      </View>
      
      <Divider bold />

      <TabView
          navigationState={{ index, routes }}
          renderScene={SceneMap({
            first: Route1,
            // second: Route2,
            // third: Route3,
          })}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
    </Block>
  }

  
  return (
   
    <Provider>
    <ImageBackground
      style={{ flex: 1, position: 'absolute', height: '100%', width: '100%' }}
      source={require('./../../assets/login1_bg.png')}
      blurRadius={10}
    ></ImageBackground>
    <View style={{ flex: 1 }}>
      {/* Nav bar section */}
      {renderNavBar()}

      {topMenu()}
      
    </View>

    <Modal
        style={{ zIndex: 99 }}
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={[containerStyle, { zIndex: 999 }]} // Set a higher value for the z-index
      >
        <Card style={{ padding: 10 }}>
          <Card.Title
            titleStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }}
            title="ATTENTION!" 
          />
          <Card.Content>
            <Text variant="titleLarge">Vous devez d'abord vous connecter</Text>
          </Card.Content>
          <Card.Actions style={{ marginTop: 15 }}>
            <Button onPress={hideModal}>Annuler</Button>
            <Button buttonColor={COLORS.red}
             onPress={() => {
              hideModal()
              navigation.navigate('AuthScreen')
            }} >Connecter</Button>
          </Card.Actions>
        </Card>
      </Modal>

    <FAB icon="plus" variant="tertiary" style={styles.fab} 
        onPress={() => {
          console.log()
         
          if(!token) {
            showModal(true);
          }
          else {
            navigation.navigate('addAvec', { owner: JSON.parse(token).user?.user?.userId,
              username: JSON.parse(token).user?.user?.username });
          }

        }} />
    </Provider>
  );
};

const styles = StyleSheet.create({

  topMenu: {
    margin: 20,
    padding: 10,
    //elevation: 5,
    flex: 1
  },
  text: {
    marginBottom:10
  },
  myTopCard:{
    backgroundColor: COLORS.white,
    padding: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10
  },
  imgs: {
    flexDirection: 'row',
    marginVertical:10,
  },
  div:{
    marginVertical:10
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
  card: {
    backgroundColor: COLORS.lightGray,
    padding:15,
    borderRadius:10,
    elevation:5,
    marginVertical:10
  },
  moreImagesText: {
    flex:1,
    alignSelf:'center', 
    marginLeft:10
  },
  bold:{
    fontWeight:'bold'
  },
  boldGrey:{
    fontWeight:'bold',
    color: 'gray',
    textTransform: 'uppercase'
  },
  small:{
    fontSize:13,
    color:COLORS.peach
  },
  normal:{
    color: 'gray',
    marginTop: 10
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default CreanceDette;
