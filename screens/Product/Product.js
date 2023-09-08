import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { IconButton, MD3Colors, ProgressBar } from 'react-native-paper';

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

    const [totAmount, setTotAmount] = useState(
      props.prod.couts.reduce((sum, cout) => sum + cout.amount, 0)
    );
  
    const startDateFinal = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear().toString().substr(-2)}`;
    const endDateFinal = `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear().toString().substr(-2)}`;

      // Date Calculation
      const targetStartDate = new Date(props.prod.startDate);
      const targetEndDate = new Date(props.prod.endDate);
      const today = new Date();
      const timeDifference = targetStartDate - today;
      const timeTotalExerc = targetEndDate - targetStartDate;
      const timeDiffExerc = targetEndDate - today;

      // Calculate the number of milliseconds in a day
      const millisecondsInDay = 24 * 60 * 60 * 1000;

      // Calculate the number of days left
      const daysLeft = Math.ceil(timeDifference / millisecondsInDay);
      const daysLeftExc = Math.ceil(timeDiffExerc / millisecondsInDay);
      const daysTotalExc = Math.ceil(timeTotalExerc / millisecondsInDay);



  return (
    <>
       
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Details', { food: props.prod });
                }}
              >
                <Block color="white" style={styles.container} m_t={14}>
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
                
                  <Image source={{uri: props.prod.images[0] }} style={styles.imgFood} />
                  
                  <Block p_l={10} p_r={10} p_b={10}>
                      <Text numberOfLines={1} grey h2 bold>
                      {props.prod.name}
                    </Text>
                    <Block row space='between'>
                    <Text color={COLORS.darkgreen}>Du {startDateFinal} au {endDateFinal}</Text>

                    <Block row center style={styles.round}>
                      <Ionicons name="md-time" color={COLORS.peach} size={20} />
                      <Text numberOfLines={1} color={COLORS.peach}> 
                      {daysLeft > 0? `Dans ${daysLeft} jours`:`${-daysLeft} jours de retard`}</Text>
                  </Block>

                    </Block>
                  

                  <Text numberOfLines={2} grey>
                    {props.prod.detail}
                  </Text>
                  <Block row center space="between">
                    {/* {stars(props.prod.stars.length)} */}
                    <Block row center>
                      <IconButton
                        icon="pin"
                        iconColor={MD3Colors.error50}
                        size={15}
                        onPress={() => console.log('Pressed')}
                      />
                     <Text numberOfLines={1} semibold size={12}>
                     {props.prod.location.filter(town => town !== '').join(', ')}
                      </Text>
                    </Block>

                    <View style={styles.imgs}>
                {props.prod?.membres?.slice(0,5).map((value, key) =>{
                  console.log();
                  //console.log(value.user);
                  return(
                  <Image
                    key={key}
                    source={{uri: value?.user?.profile_pic}}
                    style={[
                      styles.img,
                      key > 0 && { marginLeft: -15 }, // Apply negative margin for images after the first one
                    ]}
                  />
                )})}
                
              </View>
                  </Block>
                
                   <Block
                     
                      style={{backgroundColor: COLORS.lightGray,
                      borderRadius: SIZES.base*2, padding:8,}}
                    >
                     <Block>
              <Block row space="between">
                <Text numberOfLines={1} semibold>
                Montant collecté (
                  {((props.prod.initialAmount + props.prod.membres
                  .filter(member => member.contribution_status === "ACCEPTED")
                  .reduce((sum, member) => sum + member.contribution_amount, 0)) * 100 / props.prod.amount).toFixed(1)}%)
                </Text>
                  <Text> {props.prod.initialAmount} {props.prod.currency}</Text>
              </Block>

              <Block row space="between">
                <Text numberOfLines={1} semibold>
                  Le prix d'une part:
                </Text>
                <Text> {props.prod.amount/100} {props.prod.currency}</Text>
              </Block>

              <Block row space="between">
                <Text numberOfLines={1} semibold>
                  Les parts disponibles:
                </Text>
                <Text>{(100 - (props.prod.initialAmount / (props.prod.amount / 100))).toFixed(0)} parts</Text>
              </Block>

              <Block row space="between">
                <Text numberOfLines={1} semibold>
                  Taux d'intérêt :
                </Text>
                <Text> {props.prod?.tauxInt} % </Text>
              </Block>
            </Block>
          </Block>
               
                </Block>
                </Block>
              </TouchableOpacity>
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 20,
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
    height: (SIZES.width - 150) / 2,
    marginBottom: 10,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    borderWidth:1,
    borderColor: COLORS.gray
  },
  price: {
    position: 'absolute',
    zIndex: 100,
    backgroundColor: COLORS.peach,
    padding: 10,
    margin: 10,
    borderRadius: 20,
    elevation: 5,
  },
  like: {
    position: 'absolute',
    zIndex: 100,
    backgroundColor: COLORS.white,
    borderRadius: 25,
    right: 0,
    margin: 10,
  },
  imgs: {
    flexDirection: 'row',
    marginVertical:10,
  },
  img: {
    borderRadius: SIZES.base * 3,
    backgroundColor:COLORS.white,
    borderWidth:2,
    borderColor: COLORS.black,
    width: SIZES.base * 5,
    height: SIZES.base * 5,
    //tintColor: COLORS.black,
  },

  moreImagesText: {
    flex:1,
    alignSelf:'center', 
    marginLeft:10
  },

});

export default Product;
