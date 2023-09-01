import React, {  useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../../constants';

import {Text, Provider, Badge, Divider, Chip, MD3Colors, ProgressBar } from 'react-native-paper';
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
    <TouchableOpacity style={styles.card}>
      <Text numberOfLines={1} style={styles.bold}>Groupe des vendeuses Marche ALANINE</Text>
      <Text style={styles.small}>Debute le 20 janv 2024</Text>
      <Text numberOfLines={2} style={styles.normal}>Un groupe solidaire pour aider les revendeurs des habits d'ocasion 
        d'acheter directement en Europe et en Asie
      </Text>
      <Divider style={styles.div} />
      <Block row center space="between">
      <ProgressBar
        progress={10}
        color={MD3Colors.error50}
        style={{ width: SIZES.width /1.8, height: SIZES.base }}
        animatedValue={10}
        visible
        
      />
      <Text numberOfLines={1} semibold size={19} style={{ marginLeft: 20 }}>
      {10}%
      </Text>
    </Block>

      <Text style={styles.boldGrey}>Membres</Text>
      <View style={styles.imgs}>
        {[icons.shopping, icons.calendar, icons.shopping, icons.calendar, icons.shopping, icons.calendar].slice(1,5).map((value, key) => (
          <Image
            key={key}
            source={value}
            style={[
              styles.img,
              key > 0 && { marginLeft: -15 }, // Apply negative margin for images after the first one
            ]}
          />
        ))}
        {[icons.shopping, icons.calendar, icons.shopping, icons.calendar, icons.shopping, icons.calendar].length >= 5 && (
          <Text style={styles.moreImagesText}>+ 
          {[icons.shopping, icons.calendar, icons.shopping, icons.calendar, icons.shopping, icons.calendar].length - 4} plus</Text>
        )}
      </View>


      <Block row p={10} space="between" >
        <Chip icon="information" style={{backgroundColor: 'red', color: 'white'}}  elevated >status</Chip>
        <Chip icon="information" elevated >status</Chip>

      </Block>
      <Divider />
        <Block row space="between" m_t={5} m_b={5}>
        <Text style={styles.bold}>
          200 $
        </Text>
        <Text style={styles.bold}>
          Mensuel
        </Text>
      </Block>
    </TouchableOpacity>
  </ScrollView>
);

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
        <Text variant="titleMedium">Associations villageoises d’épargne et de crédit (AVEC)</Text>
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
  imgs: {
    flexDirection: 'row',
    marginVertical:10,
  },
  div:{
    marginVertical:10
  },
  img: {
    borderRadius: SIZES.base * 3,
    backgroundColor:COLORS.red,
    borderWidth:2,
    borderColor: COLORS.purple,
    width: SIZES.base * 5,
    height: SIZES.base * 5,
    tintColor: COLORS.black,
  },
  card: {
    backgroundColor: COLORS.lightGray,
    padding:10,
    borderRadius:10,
    elevation:5
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
    color:COLORS.gray,
    textTransform: 'uppercase'
  },
  small:{
    fontSize:13,
    color:COLORS.peach
  },
  normal:{
    color:COLORS.gray,
    marginTop: 10
  }
});

export default CreanceDette;
