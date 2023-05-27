import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const Block = (props) => {
  const blockStyles = [
    styles.block,
    props.m && { margin: props.m },
    props.p && { padding: props.p },
    props.m_t && { marginTop: props.m_t },
    props.m_b && { marginBottom: props.m_b },
    props.m_l && { marginLeft: props.m_l },
    props.m_r && { marginRight: props.m_r },

    props.p_t && { paddingTop: props.p_t },
    props.p_b && { paddingBottom: props.p_b },
    props.p_l && { paddingLeft: props.p_l },
    props.p_r && { paddingRight: props.p_r },

    props.flex && { flex: props.flex === true ? 1 : props.flex },
    props.color && styles[props.color],

    props.row && styles.row,
    props.col && styles.col,
    props.center && styles.center,
    props.middle && styles.middle,
    props.left && styles.left,
    props.top && styles.top,
    props.right && styles.right,
    props.bottom && styles.bottom,
    props.space && { justifyContent: `space-${props.space}` },
    props.wrap && { flexWrap: 'wrap' },
    props.shadow && styles.shadow,
    props.card && styles.card,
    props.style, // rewrite predefined styles
  ];

  return (
    <View style={blockStyles} {...props.style}>
      {props.children}
    </View>
  );
};

Block.propTypes = {
  m: PropTypes.number,
  p: PropTypes.number,
  m_t: PropTypes.number,
  m_b: PropTypes.number,
  m_l: PropTypes.number,
  m_r: PropTypes.number,
  p_t: PropTypes.number,
  p_b: PropTypes.number,
  p_l: PropTypes.number,
  p_r: PropTypes.number,
  flex: PropTypes.any,
  row: PropTypes.any,
  col: PropTypes.any,
  center: PropTypes.bool,
  middle: PropTypes.bool,
  left: PropTypes.bool,
  right: PropTypes.bool,
  bottom: PropTypes.bool,
  top: PropTypes.bool,
  color: PropTypes.any,
  space: PropTypes.oneOf(['between', 'around', 'evenly']),
  shadow: PropTypes.bool,
  card: PropTypes.bool,
  wrap: PropTypes.bool,
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  block: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
  },
  center: {
    alignItems: 'center',
  },
  middle: {
    justifyContent: 'center',
  },
  top: {
    justifyContent: 'flex-start',
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  card: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 13,
    elevation: 2,
    shadowOpacity: 0.1,
  },
  primary: { backgroundColor: COLORS.primary },
  black: { backgroundColor: COLORS.black },
  white: { backgroundColor: COLORS.white },
});

export default Block;
