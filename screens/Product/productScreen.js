import React, { useCallback, useEffect, useState } from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from './../../constants';
import Block from './Block';
import Text from './Text';
import Product_service from './Product_service';
import LottieView from 'lottie-react-native';
import NetInfo from "@react-native-community/netinfo";

import { ImageBackground, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, Badge, Divider, Menu, Provider, Searchbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess, logoutUser } from '../../redux/authReducer';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native';

const ProductScreen = ({ navigation, route }) => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [connectedUser, setConnectedUser] = useState(null);
  const [badgePanding, setBadgePanding] = useState(0);

  console.log(route);
  // Refresh Control
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTabType, setActiveJobType] = useState("Tous");

  const dispatch = useDispatch();

  const jobTypes = ["Tous", "Disponible", "En cours",  "Financé"];

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

  
  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);
  
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
            source={icons.shopping}
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
                console.log('User --', connectedUser?.username);
                navigation.navigate('Profile', {
                  userId: connectedUser.userId
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
            setActiveJobType(item);
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
  )
  

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
  
        <Block flex color="grey">
        
        <Block flex color="grey" p={15}>
          <ScrollView style={{ paddingTop: 5 }} showsVerticalScrollIndicator={false}
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
              loading?<ActivityIndicator size="large" />: <></>
            }
            {
              tabTop()
            }
           </ScrollView>
        </Block>
      </Block>
     
      
      </View>
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
});

export default ProductScreen;
