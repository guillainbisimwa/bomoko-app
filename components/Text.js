// just copy this code from the driving repo :)
import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

export default class Typography extends Component {
  render() {
    const {
      h1,
      h2,
      h3,
      title,
      body,
      caption,
      small,
      size,
      transform,
      align,
      // styling
      regular,
      bold,
      semibold,
      medium,
      weight,
      light,
      center,
      right,
      spacing, // letter-spacing
      height, // line-height
      // colors
      color,
      accent,
      primary,
      secondary,
      tertiary,
      black,
      white,
      gray,
      gray2,
      style,
      children,
      ...props
    } = this.props;

    const textStyles = [
      styles.text,
      h1 && styles.h1,
      h2 && styles.h2,
      h3 && styles.h3,
      title && styles.title,
      body && styles.body,
      caption && styles.caption,
      small && styles.small,
      size && { fontSize: size },
      transform && { textTransform: transform },
      align && { textAlign: align },
      height && { lineHeight: height },
      spacing && { letterSpacing: spacing },
      weight && { fontWeight: weight },
      regular && styles.regular,
      bold && styles.bold,
      semibold && styles.semibold,
      medium && styles.medium,
      light && styles.light,
      center && styles.center,
      right && styles.right,
      color && styles[color],
      color && !styles[color] && { color },
      // color shortcuts
      accent && styles.accent,
      primary && styles.primary,
      secondary && styles.secondary,
      tertiary && styles.tertiary,
      black && styles.black,
      white && styles.white,
      gray && styles.gray,
      gray2 && styles.gray2,
      style, // rewrite predefined styles
    ];

    return (
      <Text style={textStyles} {...props}>
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  // default style
  text: {
    fontSize: SIZES.font,
    color: COLORS.black,
  },
  // variations
  regular: {
    fontWeight: 'normal',
  },
  bold: {
    fontWeight: 'bold',
  },
  semibold: {
    fontWeight: '500',
  },
  medium: {
    fontWeight: '500',
  },
  light: {
    fontWeight: '200',
  },
  // position
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  // colors
  accent: { color: COLORS.peach },
  primary: { color: COLORS.primary },
  secondary: { color: COLORS.secondary },
  tertiary: { color: COLORS.tertiary },
  black: { color: COLORS.black },
  white: { color: COLORS.white },
  gray: { color: COLORS.gray },
  lightGray2: { color: COLORS.lightGray2 },
  // fonts
  h1: FONTS.h1,
  h2: FONTS.h2,
  h3: FONTS.h3,
  title: FONTS.title,
  body1: FONTS.body1,
  body2: FONTS.body2,
  body3: FONTS.body3,
  body4: FONTS.body4,
  body5: FONTS.body5,
  caption: FONTS.caption,
  small: FONTS.small,
});
