import React, { useEffect, useState } from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from './../../constants';
import Block from './Block';
import Text from './Text';
import Product_service from './Product_service';
import LottieView from 'lottie-react-native';

import { ImageBackground, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { Badge, Divider, Menu, Provider } from 'react-native-paper';

const ProductScreen = ({ navigation, route }) => {

  const { user } = useSelector((state) => state.user);
  const [visibleMenu, setVisibleMenu] = useState(false);

  const [token, setToken] = useState(null);

  const [ badgePanding, setBadgePanding ] = useState(0);

  // Menu
  const openMenu = () => setVisibleMenu(true);

  const closeMenu = () => setVisibleMenu(false);

  const handleLogin = () => {
    // Dispatch the logoutUser action
    closeMenu();
    //dispatch(logoutUser());

    navigation.navigate('AuthScreen');
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
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  marginRight: {
    marginRight: 5,
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 44,
    fontSize: 20,
  },
  toggle: {
    position: 'absolute',
    top: 19,
    left: 15,
  },
  container: {
    borderRadius: 16,
    marginRight: 15,
    width: SIZES.width - 100,
  },
  imgFood: {
    width: '100%',
    height: (SIZES.width - 100) / 2,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth:1,
    borderColor: COLORS.gray
  },
  info: {
    backgroundColor: COLORS.grey,
    padding: 7,
    borderRadius: 10,
  },
  cat: {
    //width: SIZES.width / 4 - 4,
    width: '33%',
    height: SIZES.width / 5,
    marginRight: 2,
    borderRadius: 10,
    //backgroundColor: COLORS.purple,
    elevation: 4,
    padding: 5,
  },
  recommended: {
    width: SIZES.width / 2.5,
    marginRight: 15,
    borderRadius: 10,
    elevation: 2,
    padding: 10,
  },
  imgRecommended: {
    width: '100%',
    height: SIZES.width / 4,
    borderRadius: 10,
    marginBottom: 5,
  },
  listContainer: {
    borderRadius: 20,
  },
  tab: {
    marginRight: 20,
    paddingBottom: 5,
  },
  active: {
    borderBottomColor: COLORS.peach,
    borderBottomWidth: 5,
    width: 30,
    paddingBottom: 5,
  },
  current: {
    color: COLORS.grey,
    fontSize: 20,
    fontWeight: 'bold',
  },
  currentActive: {
    color: COLORS.primary,
  },
  price: {
    position: 'absolute',
    zIndex: 100,
    backgroundColor: COLORS.peach,
    padding: 10,
    borderRadius: 20,
    elevation: 5,
  },
  like: {
    position: 'absolute',
    zIndex: 100,
    backgroundColor: COLORS.white,
    borderRadius: 25,
    right: 0,
    margin: SIZES.base * 2,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    //backgroundColor: '#ff0000',
    right: 0,
    bottom: 0,
  },
  animation: {
    width: 50,
    height: 50,
  },
});

export default ProductScreen;
