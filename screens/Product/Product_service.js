import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, SIZES } from '../../constants';
import Block from './Block';
import Text from './Text';

const Product_service = (props) => {
  const stars = (starsNumber) => {
    return (
      <Block row>
        {[...Array(starsNumber).keys()].map((star, index) => {
          return <Ionicons key={index} size={15} name="star" color={COLORS.yellow} />;
        })}
      </Block>
    );
  };
  return (
    <Block m_b={25} row style={styles.container}>
      <Image source={props.item.image} style={styles.img} />
      <Block flex m_l={10} style={styles.containerText}>
        <Block>
          <Text numberOfLines={1} grey_one size={22} bold>
            {props.item.name}
          </Text>
          <Text numberOfLines={1} size={18} grey_two>
            {props.item.detail}
          </Text>
        </Block>

        <Block m_t={5} row space="between" center>
          <Block row>{stars(props.item.stars)}</Block>
          <Block row>
            <Block style={styles.info} row center>
              <Ionicons name="man" size={15} color={COLORS.primary} />
              <Text primary>{props.item.location}</Text>
            </Block>

            <Block style={styles.info} row m_l={8} center>
              <Ionicons name="time-outline" size={15} color={COLORS.primary} />
              <Text primary>{props.item.deliveryTime}</Text>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
  },
  img: {
    height: SIZES.width / 5,
    width: SIZES.width / 5,

    borderRadius: 10,
  },
  info: {
    backgroundColor: COLORS.grey,
    padding: 7,
    borderRadius: 10,
  },

  containerText: {
    width: SIZES.width - 200,
    overflow: 'hidden',
    marginRight: 50,
  },
});

export default Product_service;
