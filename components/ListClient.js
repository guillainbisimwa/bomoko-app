import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, ToastAndroid, Dimensions } from 'react-native';
import { Block, Text, theme, Icon, Card} from 'galio-framework';
import RBSheet from "react-native-raw-bottom-sheet";
const { width, height } = Dimensions.get('screen');
import { ListEcheance} from './ListEcheance';
import { Images, nowTheme } from '../constants';



class ListClient extends React.Component {
  
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
   
    const man = require("../assets/icons/man.png")
    const woman = require("../assets/icons/woman.png")

    return (
      <Block style={styles.header}  flex >
        <TouchableWithoutFeedback  onPress={() => 
        { 
          if(echeance == undefined){
            ToastAndroid.show( "Aucune echeance disponible", ToastAndroid.LONG)
          }
          else {
            
            //this.RBSheet.open();

            //ToastAndroid.show( JSON.stringify(echeance.echeance), ToastAndroid.LONG)
          }
          

         }
         }>
           <Block>
            <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            
            duration={300}
            animationType="slide"
            closeOnDragDown={true}
            //minClosingHeight={10}
            customStyles={{
              wrapper: {
                flex: 1,
                backgroundColor: "#00000077"
              },
              mask: {
                flex: 1,
                backgroundColor: "transparent"
              },
              container: {
                backgroundColor: "#fff",
                width: "100%",
                height: "60%",
                overflow: "hidden"
              }
            }}
          >

             {/* {this.renderEcheance()} */}
         

            <ScrollView style={{zIndex:10}}>
              <Text style={{alignSelf:"center", paddingTop: 10, marginTop:10}}>ECHEANCES </Text>
              <Text style={{alignSelf:"center", paddingTop: 3, marginTop:3}}>{item.nom} </Text>
              <Block>

              <Block>
        </Block>      
              </Block>
              
            </ScrollView>
          </RBSheet>
        
        <Card
            avatar={item.sexe == 'm'? man: woman}
            borderless
            style={ item.etatCurrentCreditUser == 1 ? styles.ownStats:styles.stats }
            title={item.nom}
            caption={item.phone}
            location={(
              <Block row right>
                <Block row middle style={{ marginHorizontal: theme.SIZES.BASE }}>
                  <Icon name="usd" family="font-awesome" color={"a11"} size={theme.SIZES.FONT * 0.875} />
                  <Text
                    p
                    color={"a11"}
                    size={theme.SIZES.FONT * 0.875}
                    style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                  >
                    {item.somme} 
                  </Text>
                </Block>
                {item.etatCredit == 1 ?
                <Block row middle>
                <Icon name="check" family="font-awesome" color={"#080"} size={theme.SIZES.FONT * 0.875} />
                <Text
                //"#080" : "#a11"
                  p
                  color={"#080"}
                  size={theme.SIZES.FONT * 0.875}
                  style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                >
                  Valide
                </Text>
              </Block>
              :
              {...item.somme == 0 ? 
                <Block row middle>
                
              </Block>:
                <Block row middle>
                <Icon name="hourglass-half" family="font-awesome" color={theme.COLORS.ERROR} size={theme.SIZES.FONT * 0.875} />
                <Text
                  p
                  color={theme.COLORS.ERROR}
                  size={theme.SIZES.FONT * 0.875}
                  style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                >
                  En attente
                </Text>
              </Block>
              }
            
              }
                
              </Block>
            )}
          />
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

ListClient.propTypes = {
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
    backgroundColor:nowTheme.COLORS.TABS,
    height: theme.SIZES.BASE * 4,
    marginVertical: 5,
  },
  ownStats: {
    borderWidth: 0,
    backgroundColor:'rgba(250,0,0,0.2)',
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

export default withNavigation(ListClient);
