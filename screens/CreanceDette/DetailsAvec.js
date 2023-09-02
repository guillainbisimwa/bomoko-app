import React, { useRef, useState } from 'react';
import {Animated, ImageBackground, View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import Block from '../Product/Block';
import { SIZES } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';

const DetailsAvec = ({ onDetailsAvec }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  

  const renderImages = () => {
    return (
      <ImageBackground
        source={require('./../../assets/img/debt.png')}
        resizeMode="cover"
        style={{ width: SIZES.width, height: 120, justifyContent: 'flex-end' }}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 120,
          }}
        ></LinearGradient>
      </ImageBackground>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Block flex={1}>
        <Block style={{ height: 180 }}>
          {renderImages()}
        </Block>
        <Block
          p={20}
          style={{
            backgroundColor: 'white',
            marginHorizontal: '5%',
            width: '90%',
            borderRadius: 10,
            elevation: 2,
            marginTop: -20,
          }}
        >
          </Block>
          </Block>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //padding: 20,
    margin:20
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  
});

export default DetailsAvec;
