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

class ListCredit extends React.Component {
 
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
        cat = item.cat == 30?"mois":"semaines"
        Alert.alert("Attention!","Voulez vous vraiment valider le credit de :"+item.nom_user +" ("+item.phone_user+") du groupe "+item.nom_group+"? "+ "Son credit est de "+item.somme+"$ a rembourser pandant "+item.nbr_jour +" "+ cat+".",
        [
       
        {text: 'Annuler', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Valider', onPress: () => 
          {
            NetInfo.isConnected.fetch().then(isConnected => {
              if(isConnected)
              {
                //TODO Valid group
                fetch('http://35.223.156.137:3000/valider_request_credit', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                  id_c:item.id,
                  intrt:"2"
                })
              }).then((response) => response.json())
              //If response is in json then in success
              .then((responseJson) => {
                  //Success 
                var prop = 'message'; 
                if (responseJson.hasOwnProperty(prop)) { 
                  ToastAndroid.show(responseJson['message'], ToastAndroid.LONG)           
                } else {
                  ToastAndroid.show("Mise a jour de votre echeance de paiement", ToastAndroid.LONG)
                  //this._fetchClients();
                } 
              }) //If response is not in json then in error
              .catch((error) => {
                  console.error(error);
                  this.setState({isloading: false})
                  ToastAndroid.show('Une erreur est survenue '+ error, ToastAndroid.LONG)
              });

                //ToastAndroid.show( JSON.stringify(item), ToastAndroid.LONG)
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
            title={item.nom_user}
            //caption={item.etat == 1 ? "Credit valide" : "Non valide"}
            caption={item.nom_group}
            captionColor= {item.etat == 1 ? "#080" : "#a11"}
            location={(
              <Block row right>
                <Block row middle style={{ marginHorizontal: theme.SIZES.BASE }}>
                  <Icon name="usd" family="font-awesome" color={theme.COLORS.ERROR} size={theme.SIZES.FONT * 0.875} />
                  <Text
                    p
                    color={theme.COLORS.ERROR}
                    size={theme.SIZES.FONT * 0.875}
                    style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                  >
                    {item.somme}/{item.cat == 30 ? "mois" : "sem"}
                  </Text>
                </Block>
               
              </Block>
            )}
          />
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

ListCredit.propTypes = {
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
  header: {
    marginRight: 32    
  },
  stats: {
    borderWidth: 0,
    height: theme.SIZES.BASE * 4,
    marginVertical: 5
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

export default withNavigation(ListCredit);
