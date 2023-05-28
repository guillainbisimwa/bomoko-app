import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { COLORS, SIZES } from '../../constants';

const MyText = (props) => {
  const textStyles = [
    styles.text,
    props.h1 && styles.h1,
    props.h2 && styles.h2,
    props.h3 && styles.h3,
    props.normal && styles.normal,
    props.small && styles.small,
    props.size && { fontSize: props.size },
    props.align && { textAlign: props.align },
    props.weight && { fontWeight: props.weight },
    props.bold && styles.bold,
    props.semibold && styles.semibold,
    props.center && styles.center,
    props.right && styles.right,
    props.color && styles[props.color],
    props.color && !styles[props.color] && { color: props.color },
    props.primary && styles.primary,
    props.black && styles.black,
    props.white && styles.white,
    props.warning && styles.warning,
    props.grey && styles.grey_one,

    props.style, // rewrite predefined styles
  ];

  return (
    <Text style={textStyles} {...props}>
      {props.children}
    </Text>
  );
};

MyText.propTypes = {
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  normal: PropTypes.bool,
  small: PropTypes.bool,
  children: PropTypes.any,
  size: PropTypes.number,
  align: PropTypes.any,
  weight: PropTypes.number,
  bold: PropTypes.bool,
  semibold: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
  color: PropTypes.string,
  primary: PropTypes.bool,
  black: PropTypes.bool,
  white: PropTypes.bool,
  grey: PropTypes.bool,

  warning: PropTypes.bool,
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.black,
  },
  // fonts
  h1: SIZES.h1,
  h2: SIZES.h2,
  h3: SIZES.h3,
  normal: SIZES.base,
  small: SIZES.base,

  bold: {
    fontWeight: 'bold',
  },
  semibold: {
    fontWeight: '600',
  },
  // position
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  // COLORS
  primary: { color: COLORS.primary },
  black: { color: COLORS.black },
  warning: { color: COLORS.warning },
  white: { color: COLORS.white },
  grey: { color: COLORS.gray },
});

export default MyText;
