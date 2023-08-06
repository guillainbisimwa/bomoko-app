import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import * as Icon from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants';

const CustomDrawer = (props) => {
  const clearAll = async () => {};

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#015a94' }}>
        <ImageBackground source={require('./../assets/login1_bg.png')} style={{ padding: 20 }}>
          <Image
            source={require('./../assets/app-icon3.jpg')}
            style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
          />
          <Text
            numberOfLines={1}
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: 'bold',
              marginBottom: 5,
            }}
          >
            BOMOKO Cash
          </Text>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity onPress={() => clearAll()} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon.Ionicons color={COLORS.blue} size={SIZES.base * 3} name={'information-circle'} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Version 4.1.0
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
