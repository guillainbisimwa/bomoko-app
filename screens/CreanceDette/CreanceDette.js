import React, { useCallback, useEffect, useState } from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from './../../constants';

import LottieView from 'lottie-react-native';
import NetInfo from "@react-native-community/netinfo";

import { ImageBackground, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, Chip, Badge, Button, Card, Divider, FAB, Menu, Modal, ProgressBar, Provider, Searchbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess, logoutUser } from '../../redux/authReducer';
import { useFocusEffect } from '@react-navigation/native';
import Block from '../Product/Block';
import { Text } from '../../components';
import { fetchAvecs } from '../../redux/avecReducer';
import { useWindowDimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';


const CreanceDette = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visible, setVisible] = useState(false);
  const [connectedUser, setConnectedUser] = useState(null);
  const [badgePanding, setBadgePanding] = useState(0);

  const {avecs, error, status} = useSelector((state) => state.avecs); 
  const [isFetchingComplete, setIsFetchingComplete] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState([]);

    const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes, SetRoutes] = useState([
    { key: "first", title: `Tous`},
    { key: "second", title: `A venir` },// 
    
    { key: "third", title: "En retard" },
    { key: "fourth", title: "Complet" },
  ]);
  // Refresh Control
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTabType, setActiveTabType] = useState("Tous");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Number of items to display per page


  // Calculate the range of items to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the products based on the current page
  const currentProducts = filteredProducts?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);


   // Use the useFocusEffect hook to execute reloadScreen when the screen gains focus
   useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        dispatch(fetchAvecs())
        try {
          const value = await AsyncStorage.getItem('user');
          if (value !== null) {
            // Data found, reload the screen
            reloadScreen(value);
            setSearchQuery('')
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

// This effect will run whenever activeTabType, search field, or products change
useEffect(() => {
  if (!searchQuery) {
    setFilteredProducts([]);

  } else {
    // If the search field is not empty, you can apply your search logic here
    // For example, filter products based on the searchQuery value
    const filtered = avecs.filter((item) => {
      // Replace 'propertyName' with the actual property you want to search in
      return (
        item.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) //&&
        //(activeTabType == 'Services' ? item.type == 'service' : true) &&
       // (activeTabType == 'Produits' ? item.type == 'produit' : true)
      );
    });
    
    setFilteredProducts([filtered]);

  console.log('avec', avecs);
  }

  
}, [activeTabType, searchQuery, avecs, currentPage]); // Watch for changes in activeTabType, searchQuery, and products

const onChangeSearch = (text) => {
  setFilteredProducts([
    ...avecs.filter((avec) =>
      avec.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    ),
  ]);
  setSearchQuery(text);
};

const handleNextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

const handlePrevPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};


  // Function to handle screen reload
  const reloadScreen = (value) => {
    // You can put your screen reload logic here
    console.log('Screen reloaded');
    const parsedValue = JSON.parse(value);
    if (parsedValue.user && parsedValue.user.user) {
      setConnectedUser(parsedValue.user.user);
      setLoading(false)
      console.log('Async State:', parsedValue.user.user);
    }
  };

  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);

  // Modal
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 10,
    alignSelf: 'center',
  };
  
  const handleLogin = () => {
    closeMenu();
    navigation.navigate('AuthScreen');
  };
  
  const handleLogout = async() => {
    closeMenu();
    setConnectedUser(null);
    dispatch(logoutUser());

    navigation.navigate('AuthScreen');
  };
  

  const onRefresh = async () => {

    const netInfo = await NetInfo.fetch();
    // console.log("netInfo.isConnected", netInfo.isConnected);
    if (!netInfo.isConnected) {
      Alert.alert("Pas de connexion Internet", "Veuillez vérifier votre connexion Internet et réessayer.");
      return;
    }

    setRefreshing(loading);
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
        <Text  style={[{ color: focused ? COLORS.black : COLORS.gray, fontWeight:'bold' }]}>
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
              console.log('Menu');
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
          }}
        >
          <Image
            source={icons.notification}
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.white,
            }}
          />
            <Badge style={{ position:"absolute", top:2, right:-8 }}>{badgePanding}</Badge>

        </TouchableOpacity>
        { 
      
      <View
        style={{
          justifyContent: 'center', alignItems: 'flex-end', width: 50
        }}>
        <Menu
          visible={visibleMenu}
          onDismiss={closeMenu}
          anchor={

            <TouchableOpacity
            style={{  justifyContent: 'center', width: 40 }}
            onPress={openMenu}
          >
            {connectedUser?.profile_pic ? (
        <Image
          source={{ uri: connectedUser?.profile_pic }}
          style={{ width: 40, height: 40, borderRadius:20, borderWidth:1,
             borderColor: COLORS.white}}
        />
      ) : (
        <LottieView
          style={{
            width: 40,
            marginTop: 0,
          }}
          source={require('./../../assets/json/animation_lksuvej7.json')}
          autoPlay
          loop
        />
      )}
          </TouchableOpacity>
          }>
            {
              connectedUser?.username?
              <Menu.Item leadingIcon="account" onPress={() => {
                //console.log('User --', user.user.username);
                console.log('User --', connectedUser.userId);
                navigation.navigate('Profile', {
                  userId: connectedUser.userId,
                })
    
              }}
               title={connectedUser?.username} />
               :<></>
            }
          
          <Divider />

          {
              connectedUser?.username?
              <Menu.Item leadingIcon="logout" onPress={handleLogout} title="Deconnexion" />
                :
              <Menu.Item leadingIcon="login" onPress={handleLogin} title="Se connecter" />

            }
        </Menu>
      </View>
      }       
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
          avecs?.map((avec, key) => {

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
   
  </ScrollView>
);

const Route3 = () => (
  <ScrollView style={{ flex: 1 , paddingHorizontal:5, paddingVertical:10, 
  backgroundColor: 'transparent'}}>
     

  </ScrollView>
);

  const topMenu = () => {

    return <Block  style={styles.topMenu} >
      <View style={styles.myTopCard}>
        {/* <Text variant="titleMedium">Associations villageoises d’épargne et de crédit (AVEC)</Text> */}
        <Text style={styles.text}>
        Gérez vos épargnes, demandes des crédits et promouvoir la solidarité financière.
        </Text>
      </View>
      
      <Divider bold />

      <TabView
          navigationState={{ index, routes }}
          renderScene={SceneMap({
            first: Route1,
            second: Route2,
            third: Route3,
            fourth: Route3,
          })}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
    </Block>
  }

  
  

  if (loading) {
    return <ActivityIndicator size="large" />
  }
  else {
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
      <Block flex={false} p_l={20} p_r={20} p_t={15}>
        <Searchbar
          placeholder="Rechecher un produit/service"
          onChangeText={(text) => onChangeSearch(text)}
          value={searchQuery}
        />
      </Block>
     

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
    
          if(!connectedUser) {
            showModal(true);
          }
          else {
            navigation.navigate('addAvec', { owner: connectedUser?.userId,
              username: connectedUser?.username });
          }
       
        }} />
      </Provider>
    );
  };
  }
 

const styles = StyleSheet.create({
  topMenu: {
    margin: 20,
    padding: 10,
    //elevation: 5,
    flex: 1
  },
  text: {
    marginBottom:10,
    color:COLORS.black
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
