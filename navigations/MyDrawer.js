import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { COLORS, SIZES } from '../constants';
import CustomDrawer from '../components/CustomDrawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Home, Settings } from '../screens';
import Product from '../screens/Product';
import ProductScreen from '../screens/Product/productScreen';
import { CreanceDette } from '../screens/CreanceDette';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      initialRouteName="ProductScreen"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        //headerShown: false,
        // headerStyle: {
        //   backgroundColor: '#',
        // },
        drawerActiveBackgroundColor: COLORS.primary,
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="Produits / services"
        component={ProductScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons color={color} size={SIZES.base * 2} name={'briefcase'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Revenus et Depenses"
        component={Home}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => <Ionicons color={color} size={SIZES.base * 2} name={'home'} />,
        }}
      />

      {/* <Drawer.Screen
        name="Creances et dettes"
        component={CreanceDette}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => <Ionicons color={color} size={SIZES.base * 2} name={'cash'} />,
        }}
      /> */}

      <Drawer.Screen
        name="Parametres"
        component={Settings}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => <Ionicons color={color} size={SIZES.base * 2} name={'cog'} />,
        }}
      />
    </Drawer.Navigator>
  );
}
