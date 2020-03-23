import React from 'react';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity, Linking,AsyncStorage,
  ToastAndroid, 
  TouchableOpacityBase} from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import Icon from '../components/Icon';
import Images from '../constants/Images';
import { DrawerItem } from '../components/index';

import nowTheme from '../constants/Theme';

const { width } = Dimensions.get('screen');
      
J = AsyncStorage.getItem('phone');

const currentUser = [];
const currentAccount = AsyncStorage.getItem('currentAccount')
.then(async (value) => {
  //console.log("************************Get Value >> ", JSON.parse(value));
  currentUser = await JSON.parse(value);
  ToastAndroid.show(JSON.stringify(currentUser)+" <--", ToastAndroid.LONG)

  
  console.log(currentUser)

 //console.log("*********************Put Value >> ", dataClients);
}).done();


const Drawer = props => (
  <Block style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
    <Block style={styles.header}>
      <Image style={styles.logo} source={Images.bomokoLogo} />
      <Block right style={styles.headerIcon}>
        <Icon name="heart" family="Font-Awesome" size={15} color={'white'} />
        <Text
            color={nowTheme.COLORS.WHITE}
            style={{ marginTop: 3, marginLeft: 2, marginBottom: 1, fontFamily: 'montserrat-regular', fontWeight: '300', fontSize: 12}}
          >
            {/* TODO: Remove the " when showing the current connected user */}
            {J['_55']}
          </Text>
      </Block>
    </Block>

    <Block flex>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <DrawerNavigatorItems {...props} />
        <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
          <Block
            style={{ borderColor: 'white', width: '93%', borderWidth: StyleSheet.hairlineWidth, marginHorizontal: 10}}
          />
          <Text
            color={nowTheme.COLORS.WHITE}
            style={{ marginTop: 30, marginLeft: 20, marginBottom: 10, fontFamily: 'montserrat-regular', fontWeight: '300', fontSize: 12}}
          >
            INFORNATION 
          </Text>
        </Block>
        <TouchableOpacity onPress={() => props.navigation.navigate('Vide')}
          style={{ marginLeft: 10, fontFamily: 'montserrat-regular' }}
        >
          <DrawerItem {...props} title="Langue" />
        </TouchableOpacity>
        
        
        {
        !J['_55'].includes("+243000000000")? 
        <TouchableOpacity onPress={() => props.navigation.navigate('Vide')}
          style={{ marginLeft: 10, fontFamily: 'montserrat-regular' }}
        >
          <DrawerItem {...props} title="Apropos" />
        </TouchableOpacity>
        :
        <TouchableOpacity>
       <TouchableOpacity
       onPress={() => {
         //ToastAndroid.show(" Bye bye", ToastAndroid.SHORT)
         props.navigation.navigate('ValidGroups')}
       }
       style={{ marginLeft: 10, fontFamily: 'montserrat-regular' }}
     >
       <DrawerItem {...props} title="Valider Groupes" />
     </TouchableOpacity>
       <TouchableOpacity
       onPress={() => {
         //ToastAndroid.show(" Bye bye", ToastAndroid.SHORT)
         props.navigation.navigate('ValidCredits')}
       }
       style={{ marginLeft: 10, fontFamily: 'montserrat-regular' }}
     >
       <DrawerItem {...props} title="Valider Credits" />
     </TouchableOpacity>
     </TouchableOpacity>
      }
       
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.clear();
            ToastAndroid.show(" Bye bye", ToastAndroid.SHORT)
            props.navigation.navigate('Onboarding')}
          }
          style={{ marginLeft: 10, fontFamily: 'montserrat-regular' }}
        >
          <DrawerItem {...props} title="Deconnexion" />
        </TouchableOpacity>
      
      </ScrollView>
    </Block>
  </Block>
);

const Menu = {
  contentComponent: props => <Drawer {...props} />,
  drawerBackgroundColor: nowTheme.COLORS.PRIMARY,
  drawerWidth: width * 0.8,
  contentOptions: {
    activeTintColor: nowTheme.COLORS.WHITE,
    inactiveTintColor: nowTheme.COLORS.WHITE,
    activeBackgroundColor: 'transparent',
    itemStyle: {
      width: width * 0.75,
      backgroundColor: 'transparent'
    },
    labelStyle: {
      fontSize: 18,
      marginLeft: 12,
      fontWeight: 'normal'
    },
    itemsContainerStyle: {
      paddingVertical: 16,
      paddingHorizonal: 12,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'center'
  },
  headerIcon: {
    marginTop: -20
  },
  logo: {
    height: 40,
    width: 37
  }
});

export default Menu;
