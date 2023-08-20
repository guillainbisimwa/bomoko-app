import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, SIZES } from '../../constants';
import Block from './Block';
import Text from './Text';

const Product_service = (props) => {

    const startDate = new Date(props.item.startDate);
    const endDate = new Date(props.item.endDate);
    
    const startDateFinal = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear().toString().substr(-2)}`;
    const endDateFinal = `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear().toString().substr(-2)}`;

  return (
    <Block m_b={25} row style={styles.container}>
      <Image source={{uri:  props.item.images[0] }} style={styles.img} />
      <Block flex m_l={10} style={styles.containerText}>
        <Block>
          <Text numberOfLines={1} grey_one size={19} bold>
            {props.item.name}
          </Text>
          <Text numberOfLines={1} size={16} grey_two>
            {props.item.detail}
          </Text>
        </Block>

        <Block m_t={0} row space="between" center>
          <Block row>
            {/* {stars(props.item.stars)} */}
            <Block style={styles.info} row m_l={1} center>
              {/* <Ionicons name="time-outline" size={15} color={COLORS.primary} /> */}
              <Text semibold color={COLORS.peach} >{props.item.amount} {props.item.currency}</Text>
            </Block>
          </Block>
          <Block row>
            <Block style={styles.info} row center>
              <Ionicons name="pin" size={15} color={COLORS.primary} />
              <Text primary>{props.item.location.join(', ')}</Text>
            </Block>

          </Block>
        </Block>

        <Block m_t={0} row space="between" center numberOfLines={1}>
          <Text color={COLORS.darkgreen}>Du {startDateFinal} au {endDateFinal}</Text>
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  img: {
    height: SIZES.width / 5,
    width: SIZES.width / 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  info: {
    backgroundColor: COLORS.grey,
    //padding: 7,
    borderRadius: 10,
  },

  containerText: {
    width: SIZES.width - 200,
    overflow: 'hidden',
    marginRight: 50,
  },
});

export default Product_service;
