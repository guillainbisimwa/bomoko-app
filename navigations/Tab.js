import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Home, Settings, Expense, Income } from '../screens';
import { COLORS } from '../constants';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          // console.log('route --> ', route.name);
          let iconName;
          if (route.name == 'Home') {
            iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
            size = focused ? size * 1.4 : size * 1.2;
            return <Ionicons name={iconName} color={color} size={size} />;
          }
          if (route.name == 'Income') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
            size = focused ? size * 1.9 : size * 1.2;
            return <Ionicons name={iconName} color={color} size={size} />;
          }
          if (route.name == 'Expense') {
            iconName = focused ? 'remove-circle' : 'remove-circle-outline';
            size = focused ? size * 1.9 : size * 1.2;
            return <Ionicons name={iconName} color={color} size={size} />;
          } else if (route.name == 'Settings') {
            iconName = 'cog';
            size = focused ? size * 1.4 : size * 1.2;
            return <Ionicons name={iconName} color={color} size={size} />;
          } else {
            iconName = 'toggle-sharp';
            size = focused ? size * 1.4 : size * 1.2;
          }
          return <Ionicons name={iconName} color={color} size={size} />;
        },
        tabBarInactiveTintColor: COLORS.gray,
        tabBarActiveTintColor: COLORS.white,
        tabBarShowLabel: false,

        tabBarStyle: {
          backgroundColor: COLORS.secondary,
          marginBottom: 0,
          height: 80,
          position: 'absolute',
          width: '100%',
          alignSelf: 'center',
          //borderRadius: 30,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Income" component={Income} />
      <Tab.Screen name="Expense" component={Expense} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default Tabs;
