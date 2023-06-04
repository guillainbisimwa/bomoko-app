import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import { TouchableOpacity } from 'react-native';
import Block from './Block';
import Text from './Text';
import { COLORS } from '../../constants';

const Details = ({ navigation, route }) => {
  return (
    <Block p={15}>
      {/* <Block>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          <Ionicons name="arrow-back-outline" size={30} color={COLORS.grey} />
        </TouchableOpacity>
      </Block> */}
      {/* <Text h1 bold> */}
      {/* Details "route.params.name"
      </Text>
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate('Category', { cats: route.params.cats });
        }}
      >
        <Ionicons name="bulb-sharp" size={50} color={COLORS.blue} />
      </TouchableOpacity> */}
    </Block>
  );
};

export default Details;
