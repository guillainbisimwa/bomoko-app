import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { COLORS, SIZES, icons, FONTS } from '../../constants';
import Block from './Block';
import Text from './Text';
import { View } from 'react-native';

const Membre = (props,{ navigation } ) => {
  console.log(props.user);
  console.log( props.owner._id);
  console.log(props.userConnected.userId);
  console.log();
  console.log();
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(props.user.user.name);
        // navigation.navigate('Profile', { user: props.user.user})
        props.navigation.navigate('Profile', {
          userId: props.user.user._id,
          user: props.user.user
        })
      }}
    >
      <View
        style={{
          marginVertical: SIZES.padding / 3.7,
          marginHorizontal:SIZES.padding/2,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
            shadowColor: COLORS.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 13,
            elevation: 2,
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
              width: '60%',
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
              guillain bisimwa Ngaboyeka
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
              {props.user.type}
              </Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
          { props.owner._id == props.userConnected.userId ? 
            <>
              <Text style={{ ...FONTS.h5, color: COLORS.red }}>{props.user.interest} %</Text>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={icons.calendar}
                  style={{
                    width: 12,
                    height: 12,
                    tintColor: COLORS.darkgray,
                    marginRight: 7,
                    marginTop: 3,
                  }}
                />
                <Text style={{ marginBottom: SIZES.base, color: COLORS.darkgray, ...FONTS.body5 }}>
                  {props.user.user.date}
                </Text>
            </View>
            </> : 
            <>
            {/* If is not the owner */}
            <Text style={{ ...FONTS.h5, color: COLORS.red }}>Taux d'Interet {props.interest} %</Text>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={icons.cash}
                  style={{
                    width: 12,
                    height: 12,
                    tintColor: COLORS.darkgray,
                    marginRight: 7,
                    marginTop: 3,
                  }}
                />
                <Text style={{ marginBottom: SIZES.base, color: COLORS.darkgray, ...FONTS.body5 }}>
                 Dette: {props.user.user.date}
                </Text>
            </View>
            </>
          }


  {/* {( props.owner._id == props.userConnected.userId) ? (
    props.user.adhesion?.status == 'ACCEPTED' ? (
      <>
        <Text style={{ ...FONTS.h5, color: COLORS.red }}>{props.user.interest} %</Text>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={icons.calendar}
            style={{
              width: 12,
              height: 12,
              tintColor: COLORS.darkgray,
              marginRight: 7,
              marginTop: 3,
            }}
          />
          <Text style={{ marginBottom: SIZES.base, color: COLORS.darkgray, ...FONTS.body5 }}>
            {props.user.user.date}
          </Text>
        </View>
      </>
    ) : props.user.adhesion?.status == 'REJECTED' ? (
      <Text style={{ ...FONTS.h5, color: COLORS.red }}>Rejeté</Text>
    ) : (
      <Block row space="between">
        <TouchableOpacity onPress={() => props.handleAcceptReject(props.user.user)}>
          {props.isLoading ? (
            <></>
          ) : (
            <Ionicons name="close-circle" size={40} color={COLORS.peach} />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleAcceptReq(props.user.user)}>
          {props.isLoading ? (
            <></>
          ) : (
            <Ionicons name="checkmark-circle" size={40} color={COLORS.darkgreen} />
          )}
        </TouchableOpacity>
      </Block>
    )
  ) : props.user.adhesion?.status == 'PENDING' ? (
    <>
      <Text style={{ ...FONTS.h5, color: COLORS.gray}}>En attente</Text>
    </>
  ) : (
    <>
      <Text style={{ ...FONTS.h5, color: COLORS.red }}>{props.user.interest} %</Text>
      <View style={{ flexDirection: 'row', marginTop:20 }}>
        <Image
          source={icons.calendar}
          style={{
            width: 12,
            height: 12,
            tintColor: COLORS.darkgray,
            marginRight: 7,
            marginTop: 3,
          }}
        />
        <Text style={{ marginBottom: SIZES.base, color: COLORS.darkgray, ...FONTS.body5 }}>
          
        </Text>
      </View>
    </>
  )} */}
</View>
    
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  
});

export default Membre;
