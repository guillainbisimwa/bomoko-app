import React, { useRef } from 'react';
import { ImageBackground, ScrollView, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Block from './Block';
import Text from './Text';
import { COLORS, SIZES } from '../../constants';
import { MD3Colors, ProgressBar } from 'react-native-paper';

const Details = ({ route }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderImages = () => {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16}
      >
        {route.params.food.images.map((image, index) => (
          <ImageBackground
            key={index}
            source={image}
            resizeMode="cover"
            style={{ width: SIZES.width, height: SIZES.width / 2, justifyContent: 'flex-end' }}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.9)']}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: SIZES.width / 2,
              }}
            ></LinearGradient>
          </ImageBackground>
        ))}
      </ScrollView>
    );
  };

  const renderScrollIndicator = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <Block
        row
        center
        middle
        style={{
          position: 'absolute',
          bottom: 80,
          left: 0,
          right: 0,
          justifyContent: 'center',
        }}
      >
        {route.params.food.images.map((image, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={{
                height: 10,
                width: 10,
                borderRadius: 5,
                backgroundColor: COLORS.gray,
                opacity,
                marginHorizontal: 4,
              }}
            />
          );
        })}
      </Block>
    );
  };

  return (
    <Block>
      <Block style={{ height: SIZES.width / 2 }}>
        {renderImages()}
        {renderScrollIndicator()}
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
        {/* <Text numberOfLines={1} size={20} bold>
          {route.params.food.name}
        </Text> */}

        <Text center>Prix total</Text>
        <Text bold size={30} center color={COLORS.peach}>
          {route.params.food.amount} FC
        </Text>

        <Block>
          <Block row space="between">
            <Block row center style={styles.round}>
              <Ionicons name="md-cash" color={COLORS.peach} size={20} />
              <Text numberOfLines={1}> 20 Investisseurs</Text>
            </Block>

            <Block row center style={styles.round}>
              <Ionicons name="md-time" color={COLORS.peach} size={20} />
              <Text numberOfLines={1}> 35 Jours restent</Text>
            </Block>
          </Block>

          <Block center m_t={10}>
            <ProgressBar
              progress={0.1}
              color={MD3Colors.error50}
              style={{ width: SIZES.width / 1.4, height: SIZES.base }}
            />
          </Block>
          <Block m_t={5} row space="between">
            <Text numberOfLines={1} semibold size={19} style={{ marginLeft: 0 }}>
              50% Investisseurs
            </Text>
            <Text numberOfLines={1} semibold size={19} style={{ marginLeft: 0 }}>
              12 FC restent
            </Text>
          </Block>
          <Block style={styles.detailsD}>
            <Block></Block>
            <Text numberOfLines={1}> 35 Jours restent</Text>
          </Block>
        </Block>
      </Block>

      <Block p={20} style={{ marginTop: 120, zIndex: -101 }}>
        <Text color={COLORS.darkgray}>{route.params.food.detail}</Text>
        <Block mt={5}>
          <Block row>
            <Ionicons name="star" color={COLORS.yellow} size={20} />
            <Ionicons name="star" color={COLORS.yellow} size={20} />
            <Ionicons name="star" color={COLORS.yellow} size={20} />
            <Ionicons name="star" color={COLORS.yellow} size={20} />
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  round: {
    borderRadius: 10,
    //borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.lightGray2,
    //padding: 5,
  },
  detailsD: {
    elevation: 2,
    //width: '80%',
    padding: 10,
    //marginTop: 20,
  },
});

export default Details;
