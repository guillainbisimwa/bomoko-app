import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, SIZES } from '../../constants';
import Block from './Block';
import Text from './Text';
import { Avatar } from 'react-native-paper';

const CoutScreen = (props) => {
  return (
    <Block m_b={25} row style={styles.container}>
      <Avatar.Text size={44} label={props.item.id} style={{ marginRight: 10 }} />
      <Block flex m_l={10} style={styles.containerText}>
        <Block>
          <Text numberOfLines={1} grey_one size={22} bold>
            {props.item.name}
          </Text>
        </Block>

        <Block m_t={5} row space="between" center>
          <Block row>
            <Text bold color={COLORS.peach}>
              500 FC
            </Text>
          </Block>
          <Block row>
            <Ionicons name="create" size={25} color={COLORS.blue} style={{ marginRight: 12 }} />
            <Ionicons name="trash" size={25} color={COLORS.peach} />
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

export default CoutScreen;
