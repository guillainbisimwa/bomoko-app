import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'react-native-svg';
import { COLORS, SIZES } from '../constants';
//import { LinearGradient } from "expo-linear-gradient";

class Button extends Component {
  render() {
    const {
      style,
      opacity,
      gradient,
      color,
      startColor,
      endColor,
      end,
      start,
      locations,
      shadow,
      children,
      ...props
    } = this.props;

    const buttonStyles = [
      styles.button,
      shadow && styles.shadow,
      color && styles[color], // predefined styles colors for backgroundColor
      color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
      style,
    ];

    if (gradient) {
      return (
        <TouchableOpacity style={buttonStyles} activeOpacity={opacity} {...props}>
          <LinearGradient>{children}</LinearGradient>

          {/* <LinearGradient
            start={start}
            end={end}
            locations={locations}
            style={buttonStyles}
            colors={[startColor, endColor]}
          > */}

          {/* </LinearGradient> */}
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity style={buttonStyles} activeOpacity={opacity || 0.8} {...props}>
        {children}
      </TouchableOpacity>
    );
  }
}

Button.defaultProps = {
  startColor: COLORS.primary,
  endColor: COLORS.secondary,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
  locations: [0.1, 0.9],
  opacity: 0.8,
  color: COLORS.white,
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: SIZES.radius,
    height: SIZES.base * 3,
    justifyContent: 'center',
    marginVertical: SIZES.padding / 3,
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  accent: { backgroundColor: COLORS.secondary },
  primary: { backgroundColor: COLORS.primary },
  secondary: { backgroundColor: COLORS.secondary },
  tertiary: { backgroundColor: COLORS.tertiary },
  black: { backgroundColor: COLORS.black },
  white: { backgroundColor: COLORS.white },
  gray: { backgroundColor: COLORS.gray },
  lightGray: { backgroundColor: COLORS.lightGray },
});
