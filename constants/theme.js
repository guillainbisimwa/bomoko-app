import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  // base colors
  primary: '#194868', // Dark Blue
  secondary: '#FF615F', // peach

  // colors
  black: '#1E1F20',
  white: '#FFFFFF',
  lightGray: '#F5F7F9',
  lightGray2: '#FAFBFD',
  gray: '#BEC1D2',
  blue: '#42B0FF',
  darkgray: '#898C95',
  yellow: '#FFD573',
  lightBlue: '#95A9B8',
  darkgreen: '#008159',
  peach: '#FF615F',
  purple: '#8e44ad',
  red: '#FF0000',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  padding2: 36,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 20,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: { fontSize: SIZES.largeTitle, lineHeight: 55 },
  h1: {  fontSize: SIZES.h1, lineHeight: 36 },
  h2: {  fontSize: SIZES.h2, lineHeight: 30 },
  h3: {  fontSize: SIZES.h3, lineHeight: 22 },
  h4: {  fontSize: SIZES.h4, lineHeight: 22 },
  h5: {  fontSize: SIZES.h5, lineHeight: 12 },
  body1: { fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontSize: SIZES.body2, lineHeight: 30 },
  body3: { fontSize: SIZES.body3, lineHeight: 22 },
  body4: { fontSize: SIZES.body4, lineHeight: 22 },
  body5: { fontSize: SIZES.body5, lineHeight: 15 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
