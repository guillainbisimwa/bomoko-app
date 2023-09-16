import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity,View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { COLORS, SIZES, icons, FONTS } from '../../constants';
import Block from '../Product/Block';
import Text from '../Product/Text';
import { ActivityIndicator } from 'react-native-paper';
import { format } from 'date-fns';
import { fr as myFr } from 'date-fns/locale';


const Reunion = (props,{ navigation } ) => {

   // Fonction pour convertir la date en format français
   const formatDateToFrench = (date) => {
    console.log('date', date);
    return format(new Date(date), 'dd MMMM yyyy', { locale: myFr });
  };

  return (
    <>
   
    {/* <Text center bold>{formatDateToFrench(new Date())}</Text> */}
    <TouchableOpacity
      onPress={() => {
        console.log(props.date);
        props.navigation.navigate('DetailsReunion', { reunion: props.date, avec: props.avec })
        
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
            
            <Image
                  source={icons.calendar}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: COLORS.black,
                  }}
                />

            </View>
            <View>
              <Text numberOfLines={1} style={{ ...FONTS.h3, color: COLORS.black }}>{
               
              }
            REUNION
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
             {}
             {formatDateToFrench(props.date.dateStart)}
              </Text>
            </View>

            
          </View>
          <View>
          <Text style={{ ...FONTS.h5, 
          color: props.date.status == 'FINISHED'? COLORS.red:COLORS.blue }}>{props.date.status == 'FINISHED'?
          'PASSEE': 'A VENIR'}</Text>
          {/* 
                    <View style={{ flexDirection: 'row' }}>
                
                      <Text style={{ marginBottom: SIZES.base, color: COLORS.darkgray, ...FONTS.body5 }}>
                      Dette 0 $
                      </Text>
                  </View> */}
          </View>

         

          
    
        </View>
      </View>
    </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default Reunion;
