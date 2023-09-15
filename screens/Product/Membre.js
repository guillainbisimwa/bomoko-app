import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity,View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { COLORS, SIZES, icons, FONTS } from '../../constants';
import Block from './Block';
import Text from './Text';

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
              {props.user.type}
              </Text>
            </View>

            
          </View>

          {
            props.owner._id == props.userConnected.userId &&  props.user.adhesion?.status == 'PENDING'? 
            <Block row space="between">
                  <TouchableOpacity onPress={() => props.handleAcceptReject(props.user.user)}>
                    {!props.isLoading ? (
                      <></>
                    ) : (
                      <Ionicons name="close-circle" size={40} color={COLORS.peach} />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => props.handleAcceptReq(props.user.user)}>
                    {!props.isLoading ? (
                      <></>
                    ) : (
                      <Ionicons name="checkmark-circle" size={40} color={COLORS.darkgreen} />
                    )}
                  </TouchableOpacity>
                </Block> : <></>
            }
          

      
          <View style={{ alignItems: 'flex-end' }}>
          { props.owner._id == props.userConnected.userId ? 
            <>
              {
                 props.user.adhesion?.status == 'PENDING' ? 
                  <Text style={{ ...FONTS.h5, color: COLORS.gray}}>En attente</Text>:
                  props.user.adhesion?.status == 'REJECTED' ? 
                    <Text style={{ ...FONTS.h5, color: COLORS.red }}>Rejeté</Text>: <>
                    <Text style={{ ...FONTS.h5, color: COLORS.red }}>0 PARTS</Text>
                    <View style={{ flexDirection: 'row' }}>
                
                      <Text style={{ marginBottom: SIZES.base, color: COLORS.darkgray, ...FONTS.body5 }}>
                      Dette 0 $
                      </Text>
                  </View>
                  </>
              }
             
            </> : 
            <>
            {/* If is not the owner */}
           
              {
                 props.user.adhesion?.status == 'PENDING' ? 
                  <Text style={{ ...FONTS.h5, color: COLORS.gray}}>En attente</Text>:
                  props.user.adhesion?.status == 'REJECTED' ? 
                    <Text style={{ ...FONTS.h5, color: COLORS.red }}>Rejeté</Text>: <>
                    <Text style={{ ...FONTS.h5, color: COLORS.red }}>0 PARTS</Text>
                    <View style={{ flexDirection: 'row' }}>
                
                      <Text style={{ marginBottom: SIZES.base, color: COLORS.darkgray, ...FONTS.body5 }}>
                      Dette 0 $
                      </Text>
                  </View>
                  </>
              }
             
            </>
            
          }

</View>
    
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  
});

export default Membre;
