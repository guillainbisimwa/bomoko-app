import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import CustomText from '../../../components/UI/CustomText';
import { COLORS } from '../../../constants';

export const SubSlide = ({ subtitle, des, last, NextSlide, EnterApp }) => {
  const bgColor = last ? '#2CB9B0' : 'rgba(12,13,52,0.05)';
  const labelCover = last ? '#ffffff' : COLORS.black;
  const onPressHandler = last ? EnterApp : NextSlide;
  return (
    <View style={styles.subSlideContainer}>
      <Text numberOfLines={1} style={styles.subTitle}>
        {subtitle}
      </Text>
      <View>
        <Text numberOfLines={4} style={styles.des}>
          {des}
        </Text>
      </View>
      <TouchableOpacity onPress={onPressHandler}>
        <View style={[styles.buttonContainer, { backgroundColor: bgColor }]}>
          <Text style={[styles.buttonLabel, { color: labelCover }]}>
            {last ? 'Commencer' : 'Continuer'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  subSlideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  subTitle: {
    fontSize: 20,
    color: COLORS.blue,
    fontWeight: '500',
    marginBottom: 10,
  },
  des: {
    fontSize: 14,
    lineHeight: 30,
    color: COLORS.gray,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 15,
    height: 50,
    width: 245,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
});
