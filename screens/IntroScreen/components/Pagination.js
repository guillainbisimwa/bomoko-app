import React from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
//PropTypes check
import PropTypes from 'prop-types';
import { COLORS } from '../../../constants';

const { height, width } = Dimensions.get('window');

const DOT_SIZE = 20;

export const Pagination = ({ scrollX, slides }) => {
  const inputRange = [0, width, width * 2];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-DOT_SIZE, 0, DOT_SIZE],
  });
  return (
    <View style={[styles.pagination]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width,
        }}
      >
        <Animated.View
          style={[
            styles.paginationIndicator,
            {
              position: 'absolute',
              transform: [{ translateX }],
            },
          ]}
        />
        {slides.map((item, index) => {
          return (
            <View key={index} style={styles.paginationDotContainer}>
              <View style={[styles.paginationDot, { backgroundColor: COLORS.red }]} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

Pagination.propTypes = {
  scrollX: PropTypes.object.isRequired,
  slides: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  pagination: {
    position: 'absolute',

    top: 23,
    flexDirection: 'row',
    height: DOT_SIZE,
    zIndex: 1000,
    alignItems: 'center',
  },
  paginationDot: {
    width: DOT_SIZE * 0.5,
    height: DOT_SIZE * 0.5,
    borderRadius: DOT_SIZE * 0.3,
    borderColor: '#000',
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    borderColor: COLORS.red,
  },
});
