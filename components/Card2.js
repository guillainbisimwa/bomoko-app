import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, Image, AsyncStorage, TouchableWithoutFeedback, ImageBackground, ToastAndroid } from 'react-native';
import { Block, Text, theme, Icon } from 'galio-framework';

import { nowTheme } from '../constants';

class Card2 extends React.Component {
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
    const image = require("../assets/img/cooperartive.jpg")
    const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle];
    const titleStyles = [styles.cardTitle, titleStyle];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow, styles.category
    ];

    return (
      
      <Block row={horizontal} card flex style={cardContainer,{backgroundColor: item.etatCurrentUser == 0? nowTheme.COLORS.TABS : 'rgba(250,0,0,0.2)', marginBottom:10}}>
        <TouchableWithoutFeedback onPress={() => 
          { 
            //TODO : 
            clients=[];
            clientByGroup = [];
            countGroupMember = 0;

            dataClients = [];
            currentUser = [];
            currentProfile=[]
            const ClientsLocalStorage =  AsyncStorage.getItem('ClientsLocalStorage')
            .then(async (value) => {
              dataClients = await JSON.parse(value);
              clients = await dataClients;
              //ToastAndroid.show(JSON.stringify(dataClients)+"vo", ToastAndroid.LONG)
              clientByGroup = dataClients.filter((item2) => item2.id_g == item["id"]);
              countGroupMember = clientByGroup.reduce((key, val) => key + 1, 0);
              //ToastAndroid.show(clientByGroup.length+"", ToastAndroid.LONG)

              const currentAccount =  AsyncStorage.getItem('currentAccount')
              .then(async (value) => {
                currentUser = await JSON.parse(value);
                currentProfile = dataClients.find((item2) => item2.id == currentUser['pid']);
                
                currentProfile.id_c = ""
               
                const CreditsLocalStorage =  AsyncStorage.getItem('CreditsLocalStorage')
                .then(async (valueC) => {
                  allCredit = await JSON.parse(valueC);
                  allDataCredit = []

                  const EcheancesLocalStorage =  AsyncStorage.getItem('EcheancesLocalStorage')
                  .then(async (valueE) => {
                    allEcheance = await JSON.parse(valueE);
                    
                    somme_group_valid = 0
                    somme_group_invalid = 0

                    clientByGroup.forEach(async docCLient => {
                      
                      somme = 0
                      etatCredit = 0
                      id_c = ""
                      etatCurrentCreditUser = 0;
                      if(allCredit == undefined){
                        singleUserCredit = allCredit.find((item) => item.id_demandeur ==  docCLient.id );

                          somme = 0
                          etatCredit = 0;
                          id_c = 0;
                          currentProfile.id_c = id_c;
                          currentProfile.etatCredit = etatCredit;
                           etatCurrentCreditUser =  0;
                          if(etatCredit == 1)
                          {
                            somme_group_valid += parseInt(somme);
                          }
                          else somme_group_invalid += parseInt(somme);
                        
                      }
                      else{
                        singleUserCredit = allCredit.find((item) => item.id_demandeur ==  docCLient.id );
                        if(singleUserCredit == undefined){
                          somme = 0
                        }
                        else {
                          somme = singleUserCredit.somme;
                          etatCredit = singleUserCredit.etat;
                          id_c = singleUserCredit.id;
                          currentProfile.id_c = id_c;
                          currentProfile.etatCredit = etatCredit;
                          if(singleUserCredit.id == docCLient.id_c) etatCurrentCreditUser =  1;
                          if(etatCredit == 1)
                          {
                            somme_group_valid += parseInt(somme);
                          }
                          else somme_group_invalid += parseInt(somme);
                        }
                      }


                      await allDataCredit.push({
                        address: docCLient.address,
                        code_conf_sms: docCLient.code_conf_sms,
                        etat: docCLient.etat,
                        id: docCLient.id,
                        id_g: !docCLient.id_g? "":docCLient.id_g,
                        //id_g: docCLient.id_g == ""? docCLient.id_g : "",
                        nom: docCLient.nom,
                        num_carte_elec: docCLient.num_carte_elec,
                        phone: docCLient.phone,
                        profession: docCLient.profession,
                        sexe: docCLient.sexe,
                        type: docCLient.type,
                        somme : somme,
                        etatCredit: etatCredit,
                        id_c:id_c,
                        etatCurrentCreditUser:etatCurrentCreditUser
                      })
                    })


                    navigation.navigate('DetailGroup', {
                      product: `${JSON.stringify(item)}`,
                      clients: `${JSON.stringify(clients)}`,
                      clientByGroup: `${JSON.stringify(clientByGroup)}`,
                      countGroupMember: `${JSON.stringify(countGroupMember)}`,
                      currentUser: `${JSON.stringify(currentUser)}`,
                      currentProfile: `${JSON.stringify(currentProfile)}`,
                      allDataCredit: `${JSON.stringify(allDataCredit)}`,
                      allEcheance: `${JSON.stringify(allEcheance)}`,
                      somme_group_valid: `${JSON.stringify(somme_group_valid)}`,
                      somme_group_invalid: `${JSON.stringify(somme_group_invalid)}`
                    })
                
                  }).done();
                }).done();
              }).done();
          

            
            }).done();

          }
        }>
          <Block flex style={imgContainer}  shadow >

          <ImageBackground
            source={image}
            style={imageStyles}
          >
            <Block style={ item.etat ==1 ? styles.categoryTitleS: styles.categoryTitleE}>
              <Text size={14}
              bold 
              style={titleStyles}
              numberOfLines={1}
              color={nowTheme.COLORS.WHITE}>
              {item.nom_group}
              </Text>
              <Text size={14} 
              style={titleStyles}
              numberOfLines={1}
              color={nowTheme.COLORS.WHITE}>
                {item.countGroupMember+" "}
                <Icon name="user" family="font-awesome" color={theme.COLORS.WHITE} size={theme.SIZES.FONT * 0.875} />
              {item.etat == 0? " (En attente)" : " (Valide)"}
              </Text>
            </Block>
          </ImageBackground>



          </Block>
        </TouchableWithoutFeedback>
        {/* style={{backgroundColor: 'rgba(0, 255, 0, 0.3)'}}  */}
        <TouchableWithoutFeedback onPress={() => 
          { 
             
            //TODO : 
            clients=[];
            clientByGroup = [];
            countGroupMember = 0;

            dataClients = [];
            currentUser = [];
            currentProfile=[]
            const ClientsLocalStorage =  AsyncStorage.getItem('ClientsLocalStorage')
            .then(async (value) => {
              dataClients = await JSON.parse(value);
              clients = await dataClients;
              //ToastAndroid.show(JSON.stringify(dataClients)+"vo", ToastAndroid.LONG)
              clientByGroup = dataClients.filter((item2) => item2.id_g == item["id"]);
              countGroupMember = clientByGroup.reduce((key, val) => key + 1, 0);
              //ToastAndroid.show(clientByGroup.length+"", ToastAndroid.LONG)

              const currentAccount =  AsyncStorage.getItem('currentAccount')
              .then(async (value) => {
                currentUser = await JSON.parse(value);
                currentProfile = dataClients.find((item2) => item2.id == currentUser['pid']);
                
                currentProfile.id_c = ""
               
                const CreditsLocalStorage =  AsyncStorage.getItem('CreditsLocalStorage')
                .then(async (valueC) => {
                  allCredit = await JSON.parse(valueC);
                  allDataCredit = []

                  const EcheancesLocalStorage =  AsyncStorage.getItem('EcheancesLocalStorage')
                  .then(async (valueE) => {
                    allEcheance = await JSON.parse(valueE);
                    
                    somme_group_valid = 0
                    somme_group_invalid = 0

                    clientByGroup.forEach(async docCLient => {
                      
                      somme = 0
                      etatCredit = 0
                      id_c = ""
                      etatCurrentCreditUser = 0;
                      if(allCredit == undefined){
                        singleUserCredit = allCredit.find((item) => item.id_demandeur ==  docCLient.id );

                          somme = 0
                          etatCredit = 0;
                          id_c = 0;
                          currentProfile.id_c = id_c;
                          currentProfile.etatCredit = etatCredit;
                           etatCurrentCreditUser =  0;
                          if(etatCredit == 1)
                          {
                            somme_group_valid += parseInt(somme);
                          }
                          else somme_group_invalid += parseInt(somme);
                        
                      }
                      else{
                        singleUserCredit = allCredit.find((item) => item.id_demandeur ==  docCLient.id );
                        if(singleUserCredit == undefined){
                          somme = 0
                        }
                        else {
                          somme = singleUserCredit.somme;
                          etatCredit = singleUserCredit.etat;
                          id_c = singleUserCredit.id;
                          currentProfile.id_c = id_c;
                          currentProfile.etatCredit = etatCredit;
                          if(singleUserCredit.id == docCLient.id_c) etatCurrentCreditUser =  1;
                          if(etatCredit == 1)
                          {
                            somme_group_valid += parseInt(somme);
                          }
                          else somme_group_invalid += parseInt(somme);
                        }
                      }


                      await allDataCredit.push({
                        address: docCLient.address,
                        code_conf_sms: docCLient.code_conf_sms,
                        etat: docCLient.etat,
                        id: docCLient.id,
                        //id_g: !docCLient.id_g? "":docCLient.id_g,
                        id_g: docCLient.id_g == ""? docCLient.id_g : "",
                        nom: docCLient.nom,
                        num_carte_elec: docCLient.num_carte_elec,
                        phone: docCLient.phone,
                        profession: docCLient.profession,
                        sexe: docCLient.sexe,
                        type: docCLient.type,
                        somme : somme,
                        etatCredit: etatCredit,
                        id_c:id_c,
                        etatCurrentCreditUser:etatCurrentCreditUser
                      })
                    })


                    navigation.navigate('DetailGroup', {
                      product: `${JSON.stringify(item)}`,
                      clients: `${JSON.stringify(clients)}`,
                      clientByGroup: `${JSON.stringify(clientByGroup)}`,
                      countGroupMember: `${JSON.stringify(countGroupMember)}`,
                      currentUser: `${JSON.stringify(currentUser)}`,
                      currentProfile: `${JSON.stringify(currentProfile)}`,
                      allDataCredit: `${JSON.stringify(allDataCredit)}`,
                      allEcheance: `${JSON.stringify(allEcheance)}`,
                      somme_group_valid: `${JSON.stringify(somme_group_valid)}`,
                      somme_group_invalid: `${JSON.stringify(somme_group_invalid)}`
                    })
                
                  }).done();
                }).done();
              }).done();
          

            
            }).done();

          
          }
        }>
          <Block flex space="between" style={styles.cardDescription}>
            <Block flex>
              <Text
                style={{ fontFamily: 'montserrat-regular' }}
                size={13}
                style={titleStyles}
                color={nowTheme.COLORS.SECONDARY}
                numberOfLines={2}
              >
                {item.details}
              </Text>
              {item.date_debut ? (
                <Block flex left>
                  <Text
                    style={{ fontFamily: 'montserrat-regular', marginLeft:8 }}
                    size={13}
                    //style={titleStyles2}
                    color={nowTheme.COLORS.BLACK}
                    numberOfLines={1}
                  >
                   Debut: {new Date(parseFloat(item.date_debut)).toDateString()}
                   {/* Date debut: {item.date_debut} */}
                  </Text>
                </Block>
              ) : (
                  <Block />
                )}
              {item.date_fin ? (
                <Block flex left>
                  <Text
                    style={{ fontFamily: 'montserrat-regular', textAlign: 'left', marginLeft:8}}
                    size={13}
                    color={"#9A9A9A"}
                    //style={titleStyles2}
                    numberOfLines={1}
                  >
                   Fin: {new Date(parseFloat(item.date_fin)).toDateString()}
                  </Text>
                </Block>
              ) : (
                  <Block />
                )}
              {item.body ? (
                <Block flex left>
                  <Text
                    style={{ fontFamily: 'montserrat-regular' }}
                    size={12}
                    color={nowTheme.COLORS.TEXT}
                  >
                    {item.body}
                  </Text>
                </Block>
              ) : (
                  <Block />
                )}
            </Block>
            <Block right={ctaRight ? true : false}>
              <Text
                style={styles.articleButton}
                size={13}
                muted={!ctaColor}
                color={ctaColor || nowTheme.COLORS.ACTIVE}
                bold
                numberOfLines={1}
              >
                Credit: {item.somme} $ {item.cat == "7"? "/sem ("+item.nbr_jour+" sem)":"/mois ("+item.nbr_jour+" mois)"}
              </Text>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

Card2.propTypes = {
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
    minHeight: 114,
  },
  cardTitle: {
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 15
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
    margin : 10
  },
  horizontalImage: {
    height: 122,
    width: 'auto'
  },
  horizontalStyles: {
    borderRadius:5,
    elevation:5,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2
  },
  articleButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingVertical: 7
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0
  },
  categoryTitleS: {
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 255, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTitleE: {
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTitleO: {
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default withNavigation(Card2);
