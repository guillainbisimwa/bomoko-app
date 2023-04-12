import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Home, Notifications, Settings } from '../screens';
import { COLORS } from '../constants';


const Tab = createBottomTabNavigator();

const Tabs = () => {

    return(
        <Tab.Navigator
            screenOptions={({ route })=>({
                headerShown: false,
                tabBarIcon: ({focused, color, size})=>{
                    let iconName;
                    if(route.name == 'Home'){
                        iconName = focused ? "ios-home" : "ios-home"
                    }
                    else if(route.name == 'Notifications'){
                        iconName="notifications"
                    }
                    else if(route.name == 'Settings'){
                        iconName="cog"
                    }
                    else{
                        iconName="toggle-sharp";
                        
                        //return <Ionicons onPress={()=> handleSnapPress(1)} name={iconName} color={color} size={size} />

                    }
                    return <Ionicons name={iconName} color={color} size={size} />
                },
                tabBarInactiveTintColor:COLORS.white,
                tabBarActiveTintColor: COLORS.secondary,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: COLORS.secondary,
                    marginBottom: 10,
                    height: 70,
                    position: "absolute",
                    width: '100%',
                    alignSelf: 'center',
                    borderRadius: 30,

                }
            })}
        >
            <Tab.Screen name="Home" component={Home}  />
            <Tab.Screen name="Settings" component={Settings} />
          
            <Tab.Screen
                name="Notification"
                component={Notifications}
            />
         
        </Tab.Navigator>
    )
};

export default Tabs;
