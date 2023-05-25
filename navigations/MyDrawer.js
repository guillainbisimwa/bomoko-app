import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants';
import CustomDrawer from '../components/CustomDrawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Home, Settings } from '../screens';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      initialRouteName="Home"
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
        name="Revenus et Depenses"
        component={Home}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => <Ionicons color={color} size={SIZES.base * 2} name={'home'} />,
        }}
      />

      <Drawer.Screen
        name="Produits / services"
        component={Settings}
        options={{
          headerShown: true,
          drawerIcon: ({ color }) => <Ionicons color={color} size={SIZES.base * 2} name={'home'} />,
        }}
      />

      <Drawer.Screen
        name="Creances et dettes"
        component={Settings}
        options={{
          headerShown: true,
          drawerIcon: ({ color }) => <Ionicons color={color} size={SIZES.base * 2} name={'home'} />,
        }}
      />

      <Drawer.Screen
        name="Parametres"
        component={Settings}
        options={{
          headerShown: true,
          drawerIcon: ({ color }) => <Ionicons color={color} size={SIZES.base * 2} name={'cog'} />,
        }}
      />
    </Drawer.Navigator>
  );
}
