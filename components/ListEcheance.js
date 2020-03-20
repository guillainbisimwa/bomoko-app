import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, ToastAndroid, Dimensions } from 'react-native';
import { Block, Text, theme, Icon, Card} from 'galio-framework';
const { width, height } = Dimensions.get('screen');


class ListEcheance extends React.Component {
 

  render() {
    const {
      navigation,
      item,
      horizontal,
      full,
      style,
      ctaColor,
      imageStyle,
      ctaRight,
      titleStyle
    } = this.props;
  
    const man = require("../assets/icons/man.png")
    const woman = require("../assets/icons/woman.png")

    return (
      <Block style={styles.header}  flex >
        <TouchableWithoutFeedback  onPress={() => 
        {

        }
         }>
           
        
        <Card
            avatar={woman}
            borderless
            style={styles.stats}
            title={"iiiii"}
            caption={'kabaaaa'}
            
          />
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

ListEcheance.propTypes = {
  item: PropTypes.object,
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
    //minHeight: 114,
    marginBottom: 4
  },
  header1: {
    backgroundColor: theme.COLORS.WHITE,
    borderTopLeftRadius: theme.SIZES.BASE * 2,
    borderTopRightRadius: theme.SIZES.BASE * 2,
    //paddingVertical: theme.SIZES.BASE * 2,
    //paddingHorizontal: theme.SIZES.BASE * 1.5,
    width : width - theme.SIZES.BASE * 2,
   
    
  },
  
  stats: {
    borderWidth: 0,
    //width: width - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 4,
    //marginVertical: theme.SIZES.BASE * 0.875,
    marginVertical: 5,
    //elevation:5
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
