import React, {  useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../../constants';

import {Text, Provider, Badge, Divider } from 'react-native-paper';
import { ImageBackground } from 'react-native';
import Block from '../Product/Block';



const CreanceDette = ({ navigation, route }) => {
  const [ badgePanding, setBadgePanding ] = useState(0);
 
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
            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>BOMOKO Cash</Text>
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

  const topMenu = () => {

    return <Block card style={styles.topMenu} >
      <Text variant="headlineMedium">AVEC</Text>

      <Text style={styles.text}>
        Ici le contenue et la definiotion d'Un AVEC
        Ici le contenue et la definiotion d'Un AVEC
        Ici le contenue et la definiotion d'Un AVEC
      </Text>
      <Divider/>

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
    </Provider>
  );
};

const styles = StyleSheet.create({

  topMenu: {
    margin: 20,
    padding: 10,
    elevation: 5,
  },
  text: {
    marginBottom:10
  }

});

export default CreanceDette;
