import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FAB, IconButton, MD3Colors, ProgressBar } from 'react-native-paper';

import { COLORS, SIZES } from '../../constants';
import Block from './Block';
import Text from './Text';
import { View } from 'react-native';

const Product = (props) => {

  const stars = (starsNumber) => {
    const totalStars = 5;
    const filledStars = Math.min(starsNumber, totalStars);
  
    return (
      <Block row>
        {[...Array(filledStars).keys()].map((star, index) => (
          <Ionicons color={COLORS.yellow} key={index} size={SIZES.base * 2} name={'star'} />
        ))}
        {[...Array(totalStars - filledStars).keys()].map((star, index) => (
          <Ionicons color={COLORS.yellow} key={index} size={SIZES.base * 2} name={'star-outline'} />
        ))}
      </Block>
    );
  };

  console.log();
    const startDate = new Date(props.prod.startDate);
    const endDate = new Date(props.prod.endDate);
    
    const startDateFinal = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear().toString().substr(-2)}`;
    const endDateFinal = `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear().toString().substr(-2)}`;

     const invest = ((props.prod?.initialAmount + props.prod?.membres
    .filter(member => member?.contribution_status === "ACCEPTED")
    .reduce((sum, member) => sum + member?.contribution_amount, 0)) * 100 / props.prod?.amount).toFixed(0);

  return (
    <>
       
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate('Details', { food: props.prod });
                }}
              >
                <Block p={10} color="white" style={styles.container} m_t={14}>
                  <View style={styles.price}>
                    <Text white bold>
                      {props.prod.amount} {props.prod.currency}
                    </Text>
                  </View>

                  <View style={styles.like}>
                    <IconButton
                      icon="heart"
                      iconColor={MD3Colors.tertiary80} //  iconColor={MD3Colors.error50}
                      size={20}
                      onPress={() => console.log('Pressed')}
                    />
                  </View>
                
                  <Image source={{uri:  props.prod.images[0] }} style={styles.imgFood} />
                  <Text numberOfLines={1} grey h2 bold>
                    {props.prod.name}
                  </Text>
                  <Text color={COLORS.darkgreen}>Du {startDateFinal} au {endDateFinal}</Text>
                  <Text numberOfLines={2} grey>
                    {props.prod.detail}
                  </Text>
                  <Block m_t={5} row center space="between">
                    {stars(props.prod.stars.length)}
                    <Block row center>
                      <IconButton
                        icon="pin"
                        iconColor={MD3Colors.error50}
                        size={10}
                        onPress={() => console.log('Pressed')}
                      />
                      <Text numberOfLines={1} semibold size={12}>
                        {props.prod.location.join(', ')}
                      </Text>
                    </Block>
                  </Block>
                  <Block m_t={2} m_b={10} row center space="between">
                   
                    <Block row center space="between">
                      <ProgressBar
                        progress={invest/100}
                        color={MD3Colors.error50}
                        style={{ width: '100%', height: SIZES.base }}
                        animatedValue={invest/100}
                        visible
                        
                      />
                      <Text numberOfLines={1} semibold size={19} style={{ marginLeft: 20 }}>
                      {invest}%
                      </Text>
                    </Block>
                  </Block>
                  <Block row>
                    <Block
                      center
                      middle
                      style={[styles.cat, { backgroundColor: COLORS.primary }]}
                    >
                      <Text white bold size={12}>
                        {invest}%
                      </Text>
                      <Text white bold numberOfLines={1}>
                        Realisation
                      </Text>
                    </Block>
                    <Block
                      center
                      middle
                      style={[styles.cat, { backgroundColor: COLORS.purple }]}
                    >
                      <Text white bold size={12}>
                      {props.prod.membres.length + 1}
                      </Text>
                      <Text white bold numberOfLines={1}>
                        Membres
                      </Text>
                    </Block>
                    <Block
                      center
                      middle
                      style={[styles.cat, { backgroundColor: COLORS.peach }]}
                    >
                      <Text white size={12}>
                        {props.prod.amount} {props.prod.currency}
                      </Text>
                      <Text white bold numberOfLines={1}>
                        Budjet
                      </Text>
                    </Block>
                  </Block>
                </Block>
              </TouchableOpacity>
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginRight:15
  },
  cat: {
    //width: SIZES.width / 4 - 4,
    width: '33%',
    height: SIZES.width / 5,
    marginRight: 2,
    borderRadius: 10,
    //backgroundColor: COLORS.purple,
    elevation: 4,
    padding: 5,
  },
  imgFood: {
    width: '100%',
    height: (SIZES.width - 100) / 2,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth:1,
    borderColor: COLORS.gray
  },
  price: {
    position: 'absolute',
    zIndex: 100,
    backgroundColor: COLORS.peach,
    padding: 10,
    borderRadius: 20,
    elevation: 5,
  },
  like: {
    position: 'absolute',
    zIndex: 100,
    backgroundColor: COLORS.white,
    borderRadius: 25,
    right: 0,
    margin: SIZES.base * 2,
  },

});

export default Product;
