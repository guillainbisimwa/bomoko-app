import React, { useEffect, useState } from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from './../../constants';
import Block from './Block';
import Text from './Text';
import Product_service from './Product_service';
import LottieView from 'lottie-react-native';

import { ImageBackground, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Divider, Menu, Provider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess } from '../../redux/authReducer';

const ProductScreen = ({ navigation, route }) => {

  const { user } = useSelector((state) => state);
  const [visibleMenu, setVisibleMenu] = useState(false);

  const [token, setToken] = useState(null);
  const [connectedUser, setConnectedUser] = useState(null);

  const [ badgePanding, setBadgePanding ] = useState(0);
  const dispatch = useDispatch();


  useEffect(() => {
    checkLoginStatus();
  },[connectedUser])

  // Menu
  const openMenu = () => setVisibleMenu(true);

  const closeMenu = () => setVisibleMenu(false);

  const handleLogin = () => {
    // Dispatch the logoutUser action
    closeMenu();
    navigation.navigate('AuthScreen');
  };

  const checkLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      // AsyncStorage.clear();

      console.log('AsyncStorage-user', value);
      console.log("");
      console.log('State-user', connectedUser);
      
      if (value !== null) {
        // dispatch(loginSuccess(value));
        // AsyncStorage.clear();
        // dispatch(logoutUser());
        setConnectedUser(value);
        
      } else {
        //setLoading(false);
        //dispatch(setUnInstalled());
      }
    } catch (error) {
      console.log('Error retrieving installation status:', error);
      //setLoading(false);
    }
  };


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
            {user?._j?.user?.user?.profile_pic ? (
        <Image
          source={{ uri: user?._j?.user?.user?.profile_pic }}
          style={{ width: 40, height: 40, borderRadius:20, borderWidth:1,
             elevation:3, borderColor: COLORS.white}}
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
              user?._j?.user?.user?.username?
              <Menu.Item leadingIcon="account" onPress={() => {
                console.log("Token --",JSON.parse(token).user.user);
                //console.log('User --', user.user.username);
                console.log('User --', user?._j?.user?.user?.username);
                navigation.navigate('Profile', {
                  userId: JSON.parse(token)?.user?.user?.userId
                })
    
              }}
               title={user?._j?.user?.user?.username} />
               :<></>
            }
          
          <Divider />

          {
              user?._j?.user?.user?.username?
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
   
    
    </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  
});

export default ProductScreen;
