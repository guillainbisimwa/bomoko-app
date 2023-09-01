import React, {  useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../../constants';

import {Text, Provider, Badge, Divider } from 'react-native-paper';
import { ImageBackground } from 'react-native';
import Block from '../Product/Block';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';


const CreanceDette = ({ navigation, route }) => {
  const [ badgePanding, setBadgePanding ] = useState(0);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes, SetRoutes] = useState([
    { key: "first", title: `Route1`},
    { key: "second", title: `Route2` },
    { key: "third", title: "Route3" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: COLORS.peach,
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


const Route1 = () => (
  <ScrollView style={{ flex: 1 , paddingHorizontal:5, paddingVertical:10,
   backgroundColor: 'transparent'}}>
    <Text>Test transparent</Text>
  </ScrollView>
);

const Route2 = () => (
  <ScrollView style={{ flex: 1 , paddingHorizontal:5, paddingVertical:10, 
  backgroundColor: 'transparent'}}>
    <Text>Test</Text>
  </ScrollView>
);

const Route3 = () => (
  <ScrollView style={{ flex: 1 , paddingHorizontal:5, paddingVertical:10, 
  backgroundColor: 'transparent'}}>
    <Text>Test</Text>
  </ScrollView>
);

  const topMenu = () => {

    return <Block  style={styles.topMenu} >
      <View style={styles.myTopCard}>
        <Text variant="headlineMedium">AVEC</Text>
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
            second: Route2,
            third: Route3,
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
});

export default CreanceDette;
