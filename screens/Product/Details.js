import React from 'react';
import { ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Block from './Block';
import Text from './Text';
import { COLORS, SIZES } from '../../constants';

const Details = ({ route }) => {
  console.log(route.params);
  return (
    <Block>
      <Block style={{ height: SIZES.width / 2 }}>
        <ImageBackground
          source={route.params.food.image}
          resizeMode="cover"
          style={{ flex: 1, justifyContent: 'flex-end' }}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.9)']}
            style={{ position: 'absolute', left: 0, right: 0, top: 0, height: SIZES.width / 2 }}
          ></LinearGradient>
        </ImageBackground>
      </Block>
      <Block
        p={20}
        m={50}
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          top: SIZES.width / 4,
          width: '80%',
          borderRadius: 10,
          height: 200,
          elevation: 2,
        }}
      >
        {/* <Text>Hello</Text> */}
        <Text numberOfLines={1} size={20} bold>
          {route.params.food.name}
        </Text>
        <Text color={COLORS.gray}>{route.params.food.detail}</Text>
        <Block mt={5}>
          <Block row>
            <Ionicons name="star" color={COLORS.primary} size={20} />
            <Ionicons name="star" color={COLORS.primary} size={20} />
            <Ionicons name="star" color={COLORS.primary} size={20} />
            <Ionicons name="star" color={COLORS.primary} size={20} />
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Details;
