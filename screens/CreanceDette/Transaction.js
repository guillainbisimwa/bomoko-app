import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity,View } from 'react-native';

import { COLORS, SIZES, icons, FONTS } from '../../constants';
import { Text } from '../../components';

const Transaction = (props,{ navigation } ) => {
  // console.log(props.user);
  // console.log();
  // subtitle='Contibution solidaire' topRight={1} 
  //             bottomRight='10 sep 2023'
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(props.user.user.name);
        // navigation.navigate('Profile', { user: props.user.user})
        // props.navigation.navigate('Profile', {
        //   userId: props.user.user._id,
        //   user: props.user.user
        // })
      }}
    >
      <View
        style={{
          borderBottomWidth:0.3,
          marginHorizontal:SIZES.padding/2,
          backgroundColor: COLORS.white,
        }}
      >
        {/* Title */}
        <View
          style={{
            flexDirection: 'row',
            padding: SIZES.padding / 2,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              width: '65%',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: COLORS.lightGray,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: SIZES.base,
              }}
            >
              { props.user.user.profile_pic  ? (
                <Image
                  source={{ uri: props.user.user.profile_pic  }}
                  style={{ width: 40, height: 40, borderRadius:20, borderWidth:1,
                  borderColor: COLORS.white}}
                />
              ) : (
                <Image
                  source={icons.investment}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: COLORS.black,
                  }}
                />
              )}

            </View>
            <View>
              <Text numberOfLines={1} style={{ ...FONTS.h3, color: COLORS.black }}>{
                props.user.user.admin? props.user.user?.name: props.user.user?.name 
              }
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  overflow: 'hidden',
                  ...FONTS.body5,
                  flexWrap: 'wrap',
                  color: COLORS.darkgray,
                }}
              >
              {props.subtitle}
              </Text>
            </View>
            
          </View>
          
          <View style={{ alignItems: 'flex-end' }}>
          <>
            <Text style={{ ...FONTS.h5, color: COLORS.red }}>{props.topRight} {props.currency}</Text>
              <View style={{ flexDirection: 'row' }}>
          
                <Text style={{ marginBottom: SIZES.base, color: COLORS.darkgray, ...FONTS.body5 }}>
                 {props.bottomRight}
                </Text>
            </View>
          </>
        </View>
    
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  
});

export default Transaction;
