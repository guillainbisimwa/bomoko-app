import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, ToastAndroid, Dimensions } from 'react-native';
import { Block, Text, theme, Icon, Card} from 'galio-framework';
import RBSheet from "react-native-raw-bottom-sheet";
const { width, height } = Dimensions.get('screen');
import { Images, nowTheme } from '../constants';

class ListEcheance extends React.Component {
  
  render() {
    const {
      navigation,
      item,
      echeance,
      horizontal,
      full,
      style,
      ctaColor,
      imageStyle,
      ctaRight,
      titleStyle
    } = this.props;
   
    const pricing = require("../assets/icons/pricing.png")

    return (
      <Block style={styles.header}  flex >
        <TouchableWithoutFeedback  onPress={() => 
        { 
          //ToastAndroid.show( JSON.stringify(echeance.echeance), ToastAndroid.LONG)
         }
         }>
           <Block>
            
            <Card
              avatar={pricing}
              borderless
              style={styles.stats}
              title={item.somme_sans_inter}
              caption={item.somme_intert}
              
            />

          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

ListEcheance.propTypes = {
  item: PropTypes.object,
  echeance: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    marginBottom: 4
  },
  header1: {
    backgroundColor: theme.COLORS.WHITE,
    borderTopLeftRadius: theme.SIZES.BASE * 2,
    borderTopRightRadius: theme.SIZES.BASE * 2,
    width : width - theme.SIZES.BASE * 2,
  },
  stats: {
    borderWidth: 0,
    backgroundColor:nowTheme.COLORS.TABS,
    height: theme.SIZES.BASE * 4,
    marginVertical: 5,
  },
  title: {
    justifyContent: 'center',
    paddingLeft: theme.SIZES.BASE / 2,
  },
  avatar: {
    width: theme.SIZES.BASE * 2.5,
    height: theme.SIZES.BASE * 2.5,
    borderRadius: theme.SIZES.BASE * 1.25,
    backgroundColor: "#123456",
    color:"#123456"
  },
  middle: {
    justifyContent: 'center',
  },
  text: {
    fontSize: theme.SIZES.FONT * 0.875,
    lineHeight: theme.SIZES.FONT * 1.25,
  },
});

export default withNavigation(ListEcheance);
