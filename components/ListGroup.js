import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, 
  Image, 
  TouchableWithoutFeedback, 
  ImageBackground, 
  ToastAndroid, 
  Dimensions,
  NetInfo,
  Alert,
} from 'react-native';
import { Block, Text, theme, Icon, Card} from 'galio-framework';
const { width, height } = Dimensions.get('screen');


class ListGroup extends React.Component {
 

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
    const ok = require("../assets/img/ok.png")
    const error = require("../assets/img/error.png")

    return (
      <Block style={styles.header}  flex >
        <TouchableWithoutFeedback  onPress={() => 
        { 
        //   navigation.navigate('DetailGroup', {

        //   product: `${JSON.stringify(item)}`,

        //  })
        Alert.alert("Attention!","Voulez vous vraiment valider le groupe : "+item.nom_group+"? Details : "+item.details ,
      [
       
        {text: 'Annuler', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Valider', onPress: () => 
          {
            NetInfo.isConnected.fetch().then(isConnected => {
              if(isConnected)
              {
                console.log('OK Pressed')
                //this.checkCreditExistFromAPI(id, name)
                //ToastAndroid.show(id, ToastAndroid.SHORT)
                ToastAndroid.show( JSON.stringify(item), ToastAndroid.LONG)
         


              }
              else{
                ToastAndroid.show("Aucune connexion internet disponible", ToastAndroid.SHORT)
               
                
              }
            });

          }
        },
      ]);

         }
         }>
           



        <Card
            avatar={item.etat == 1 ? ok: error}
            borderless
            style={styles.stats}
            title={item.nom_group}
            caption={item.etat == 1 ? "Groupe valide" : "Non valide"}
            captionColor= {item.etat == 1 ? "#080" : "#a11"}
          />
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

ListGroup.propTypes = {
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
    width : width - theme.SIZES.BASE * 2
  },
  stats: {
    borderWidth: 0,
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

export default withNavigation(ListGroup);
