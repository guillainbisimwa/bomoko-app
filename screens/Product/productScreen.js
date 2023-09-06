import React, { useCallback, useEffect, useState } from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from './../../constants';
import Block from './Block';
import Text from './Text';
import LottieView from 'lottie-react-native';
import NetInfo from "@react-native-community/netinfo";

import { ImageBackground, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, Badge, Button, Card, Divider, FAB, Menu, Modal, Provider, Searchbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess, logoutUser } from '../../redux/authReducer';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native';
import Product from './Product';
import { fetchProducts } from '../../redux/prodReducer';

const ProductScreen = ({ navigation, route }) => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visible, setVisible] = useState(false);
  const [connectedUser, setConnectedUser] = useState(null);
  const [badgePanding, setBadgePanding] = useState(0);

  const { error, isLoading, success, products } = useSelector((state) => state.products);
  const [filteredProjects, setFilteredProjects] = useState([]);

  
  // Refresh Control
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTabType, setActiveTabType] = useState("Tous");

  const dispatch = useDispatch();

  const jobTypes = ["Tous", "Produits", "Services"];


  const onChangeSearch = query => setSearchQuery(query);

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

   // Use the useFocusEffect hook to execute reloadScreen when the screen gains focus
   useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        dispatch(fetchProducts())
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

   // This effect will run whenever activeTabType changes
   useEffect(() => {
    if (activeTabType == 'Services') {
      // Filter your products based on the active job type here
      const filtered = [...products].filter((item) => item.type == 'service');
      setFilteredProjects(filtered);
    }
    else  if (activeTabType == 'Produits') {
      // Filter your products based on the active job type here
      const filtered = [...products].filter((item) => item.type == 'produit');
      setFilteredProjects(filtered);
    } else if(activeTabType === 'Tous') {
      // If no active job type is selected, show all products
      setFilteredProjects(products);
    } else {
      // If no active job type is selected, show all products
      setFilteredProjects([]);
    }
  }, [activeTabType, products]); // Watch for changes in activeTabType and products

  // Rest of your component


  
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

  console.log();
  console.log();

  function renderNavBar() {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingTop: SIZES.base * 3,
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
            <Text style={{ ...FONTS.h3, color: COLORS.gray }}>(Produits et Services)</Text>
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

  const tabTop = () => (

    <View style={styles.tabsContainer}>
    <FlatList
      data={jobTypes}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.tab(activeTabType, item)}
          onPress={() => {
            setActiveTabType(item);
          }}
        >
          <Text style={styles.tabText(activeTabType, item)}>{item}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item}
      contentContainerStyle={{ columnGap: SIZES.base*1.5 }}
      horizontal
    />
  </View>
  );
  

  if (loading) {
    return <ActivityIndicator size="large" />
  }
  else {
    return (
   
      <Provider>
       
      <ImageBackground
        style={{  position: 'absolute', height: '100%', width: '100%' }}
        source={require('./../../assets/login1_bg.png')}
        blurRadius={10}
      ></ImageBackground>
       <Block flex  >
     
        {/* Nav bar section */}
        {renderNavBar()}
  
        <Block flex color="grey">
        
        <Block flex color="grey" p={15}>
          <View style={{ paddingTop: 5 }} 
           refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          >
            <Block flex={false}>
             
              <Searchbar
                placeholder="Rechecher un produit/service"
                onChangeText={onChangeSearch}
                value={searchQuery}
              />
            </Block>
          
            {
              tabTop()
            }
             <ScrollView style={{ flexGrow: 1, height:'80%' }} showsHorizontalScrollIndicator={false}>
             {
                isLoading?<ActivityIndicator size="large" />: <></>
              }
              {
              filteredProjects.length === 0 ? (
                <Text center h1 white bold>   Aucun produit ou service</Text>
              ) : (
                filteredProjects.map((product, index) => (
                  <Product prod={product} navigation={navigation} key={index} />
                ))
              )
            }
              
              </ScrollView>
            
           </View>
        </Block>
      </Block>

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
            }} >Se Connecter</Button>
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
            navigation.navigate('AddProduct', { owner: connectedUser?.userId,
              username: connectedUser?.username });
          }
       
        }} />
     
      
      </Block>
      <Block></Block>
      </Provider>
    );
  };
  }
 

const styles = StyleSheet.create({
 
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.base*2,
  },
  tab: (activeTabType, item) => ({
    paddingHorizontal:SIZES.base*2,
    paddingVertical:SIZES.base,
    borderRadius: SIZES.radius*2,
    borderWidth: 1,
    marginBottom:SIZES.base*2,
    borderColor: activeTabType === item ? COLORS.secondary : COLORS.gray,
    backgroundColor: activeTabType === item ? COLORS.secondary : COLORS.lightGray2,
    elevation:2,
  }),
  tabText: (activeTabType, item) => ({
    color: activeTabType === item ? COLORS.white : COLORS.black,
    fontWeight: 'bold',
  }),
  fab: {
    position: 'absolute',
    margin: 16,
    //backgroundColor: '#ff0000',
    right: 0,
    bottom: 0,
  },
});

export default ProductScreen;
