import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
  ScrollView,
  NetInfo,
  AsyncStorage,
  Alert,
  cat,
  Image
} from 'react-native';
import { Block, Text, Button as GaButton, theme, Checkbox } from 'galio-framework';
import SwitchSelector from "react-native-switch-selector";
import DatePicker from "react-native-datepicker"; 

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

import { HeaderHeight } from '../constants/utils';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 4;


const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class AddGroup extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
    this.state = {
      nom_groupe: "Bomoko a",
      somme: "180",
      id_demandeur: "",
      taux: 2,
      cat: "30",
      date_debut: "",
      date_fin: "",
      nbr_jour: "5",
      details: "detaisl ici",
      type: "group",

      creation_failed: false,
      showLoading: false,

      nom_groupe_valid: true,
      details_valid: true,
      somme_valid: true,
      id_demandeur_valid: true,
      taux_valid: true,
      cat_valid: true,
      date_debut_valide: false,
      date_fin_valide: false,
      nbr_jr_valide: false,
    };
    
  }

  _bootstrapAsync = async () => {
 
    const currentAccountObj = await AsyncStorage.getItem('currentAccount');

    currentAccount = JSON.parse(currentAccountObj);
    this.setState({id_demandeur: currentAccount["pid"]})

  };

  validateName(string) {
    return string.trim().length > 3;
  }

  validateSomme(somme) {
    return parseInt(somme) > 0 && parseInt(somme) <= 100 ;
  }

  validateNbr(nbr) {
    return parseInt(nbr) > 0 && parseInt(nbr) <= 10 ;
  }

  validateDate(date) {
    return date != "";
  }

  validateName_= () =>{
    var nom_groupe = this.state.nom_groupe;
    var nom_groupe_valid = this.validateName(nom_groupe);
    
    this.setState({nom_groupe: this.state.nom_groupe})
    this.setState({nom_groupe_valid: nom_groupe_valid})
  }

  validateDetails_ = () =>{
    var details = this.state.details;
    var details_valid = this.validateName(details);
    
    this.setState({details: this.state.details})
    this.setState({details_valid: details_valid})
  }

  validateSomme_= () =>{
    var somme = this.state.somme;
    var somme_valid = this.validateSomme(somme);
    
    this.setState({somme: this.state.somme})
    this.setState({somme_valid: somme_valid})
  }

  validateNbr_= () =>{
    var nbr_jour = this.state.nbr_jour;
    var nbr_jr_valide = this.validateNbr(nbr_jour);
    
    this.setState({nbr_jour: this.state.nbr_jour})
    this.setState({nbr_jr_valide: nbr_jr_valide})
  }

  validateDate_= () =>{
    var date_debut = this.state.date_debut;
    var date_debut_valide = this.validateDate(date_debut);
    
    this.setState({date_debut: this.state.date_debut})
    this.setState({date_debut_valide: date_debut_valide})
  }

  handleChangeNom_groupe = nom_groupe => this.setState({ nom_groupe }, this.validateName_);
  handleChangeDetails = details => this.setState({ details }, this.validateDetails_);
  handleChangeSomme = somme => this.setState({ somme }, this.validateSomme_);
  handleChangeDate = date_debut => this.setState({ date_debut }, this.validateDate_);
  handleChangeNb_jr = nbr_jour => this.setState({ nbr_jour }, this.validateNbr_);

  _fetchGroup = async () =>{
    await NetInfo.isConnected.fetch().then(async isConnected => {
      if(isConnected){
    
        await fetch('http://192.168.56.1:3000/groups/', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((response) => response.json())
        //If response is in json then in success
        .then((responseJson) => {

            //Success 

            //ToastAndroid.show('Ce message '+JSON.stringify(responseJson), ToastAndroid.LONG)
            AsyncStorage.setItem('GroupsLocalStorage', JSON.stringify(responseJson))
              .then(json => ToastAndroid.show('GroupsLocalStorage save locally', ToastAndroid.SHORT))
              .catch(error => ToastAndroid.show('GroupsLocalStorage error local memory', ToastAndroid.SHORT));
            
            //this._bootstrapAsync();
            this.props.navigation.navigate("Home");


            
        })
        //If response is not in json then in error
        .catch((error) => {
            //Error 
            alert(JSON.stringify(error));
            console.error(error);
        });  
        
      }
      else{
        ToastAndroid.show('Aucune connexion internet!', ToastAndroid.LONG)
      }
    })
  }

  async createGroupe(){
    //var nom_ = this.state.nom
    var nom_groupe_ = this.state.nom_groupe
    var somme_ = this.state.somme
    var cat_ = this.state.cat
    var date_debut = this.state.date_debut;
    var date_fin = new Date();
    var date_debut_Split = date_debut.split("-");
    var date_debut_ = new Date(date_debut_Split[2], date_debut_Split[0],date_debut_Split[1]).getTime();
    var date_debut__ = new Date(date_debut_Split[2], date_debut_Split[0],date_debut_Split[1]);
    var nbr_jour_ = this.state.nbr_jour
    var id_demandeur_ = this.state.id_demandeur
    var taux_ = this.state.taux
    var details_ = this.state.details
    var type_ = this.state.type

    var date_fin__ =  date_fin.setDate(date_debut__.getDate() + ( parseInt(cat_) * parseInt(nbr_jour_)));
    var date_fin_ =  date_fin__




    bo = JSON.stringify({
      nom_groupe: nom_groupe_,
      somme: somme_,
      cat: cat_,
      date_debut: date_debut_,
      date_fin: date_fin_,
      //nbr_jour: nbr_jour_,
      id_demandeur: id_demandeur_,
      taux: taux_,
      details: details_,
      type: type_
    });
    //alert(bo);


   await fetch('http://192.168.56.1:3000/group', {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
     body:JSON.stringify({
      nom_group: nom_groupe_,
      somme: somme_,
      cat: cat_,
      date_debut: date_debut_,
      date_fin: date_fin_,
      id_responsable: id_demandeur_,
      taux: taux_,
      details: details_,
     })
   }).then((response) => response.json())
   //If response is in json then in success
   .then((responseJson) => {
       //Success 
       ToastAndroid.show("OK", ToastAndroid.SHORT)
       // TODO Save local variables
       
       // TODO open waitValidAccout screen
         //this._fetchGroup();
        this.props.navigation.navigate("Home");



   }) //If response is not in json then in error
   .catch((error) => {
       //Error 
       alert(JSON.stringify(error));
       console.error(error);
       ToastAndroid.show('Une erreur est surnenue '+ error, ToastAndroid.LONG)
   });
 }


  async CheckGroupBeforeSave() {

    //TODO Valider tout les champs
    if(this.state.nom_groupe_valid && this.state.somme_valid && this.state.details_valid
      && this.state.nbr_jr_valide && this.state.date_debut !=""){


          await NetInfo.isConnected.fetch().then(async isConnected => {
            if(isConnected){
          
              await fetch('http://192.168.56.1:3000/group_by_name/'+this.state.nom_groupe, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              })
              .then((response) => response.json())
              //If response is in json then in success
              .then((responseJson) => {
                  //Success 
                  var prop = 'message'; 
                  if (responseJson.hasOwnProperty(prop)) { 
                     this.createGroupe();
                  } else { 
                    ToastAndroid.show('Ce groupe existe deja', ToastAndroid.LONG)
                    this.setState({nom_groupe_valid: false})
                  } 
              })
              //If response is not in json then in error
              .catch((error) => {
                  //Error 
                  alert(JSON.stringify(error));
                  console.error(error);
              });  
              
            }
            else{
              ToastAndroid.show('Aucune connexion internet!', ToastAndroid.LONG)
            }
          })

    }else {
      ToastAndroid.show("Veillez valider tous les champs SVP!", ToastAndroid.LONG);
    }
  }

  
  render() {
    const { navigation } = this.props;

    const {
      nom_groupe,
      somme,
      id_demandeur,
      taux,
      cat,
      date_debut,
      date_fin,
      nbr_jour,
      details
    } = this.state;

    return (
      <DismissKeyboard>
        <Block flex middle>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex middle>
              <Block style={styles.registerContainer}>
                









              <ScrollView showsVerticalScrollIndicator={false}>
              <Block flex middle>
           

           <Block style={styles.registerContainer1}>
             <Block flex space="evenly">
             {/* <ScrollView> */}
               <Block flex={0.4} middle style={styles.socialConnect}>
                 <Block flex={0.5} middle>
                   <Text
                     style={{
                       fontFamily: 'montserrat-regular',
                       textAlign: 'center',
                       marginTop:20,
                       marginBottom:15
                     }}
                     color="#333"
                     size={24}
                   >
                    Creer un groupe
                   </Text>
                 </Block>

                 <Block flex={0.5} row middle space="between" style={{ marginBottom: 18 }}>
                   
                   <GaButton
                     round
                     onlyIcon
                     shadowless
                     icon="users"
                     iconFamily="Font-Awesome"
                     iconColor={theme.COLORS.WHITE}
                     iconSize={theme.SIZES.BASE * 1.625}
                     color={nowTheme.COLORS.FACEBOOK}
                     style={[styles.social, styles.shadow]}
                   />
                 </Block>
               </Block>
               <Block flex={0.1} middle>
                 <Text
                   style={{
                     fontFamily: 'montserrat-regular',
                     textAlign: 'center'
                   }}
                   muted
                   size={16}
                 >
                   Et devenez admin ...
                 </Text>
               </Block>
               <Block flex={1} middle space="between">
                 <Block center flex={0.9}>
                   <Block flex space="between">
                     <Block>
                       <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                         <Input
                           placeholder="Nom du groupe"
                           style={[styles.inputs, {
                             borderColor: this.state.nom_groupe_valid
                                   ? '#E3E3E3'
                                   : '#a11'
                           }]}
                           onChangeText={this.handleChangeNom_groupe}

                           value={nom_groupe}
                           iconContent={
                             <Icon
                               size={16}
                               color="#ADB5BD"
                               name="users"
                               family="Font-Awesome"
                               style={styles.inputIcons}
                             />
                           }
                         />
                       </Block>
                       <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                         <Input
                           placeholder="Detail du groupe"
                           style={[styles.inputs, {
                             borderColor: this.state.details_valid
                                   ? '#E3E3E3'
                                   : '#a11'
                           }]}
                           onChangeText={this.handleChangeDetails}

                           value={details}
                           iconContent={
                             <Icon
                               size={16}
                               color="#ADB5BD"
                               name="list-alt"
                               family="Font-Awesome"
                               style={styles.inputIcons}
                             />
                           }
                         />
                       </Block>
                       <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                         <Input
                          type="numeric"
                          placeholder="Contribution individuelle en $"
                          style={[styles.inputs, {
                             borderColor: this.state.somme_valid
                                   ? '#E3E3E3'
                                   : '#a11'
                           }]}

                           onChangeText={this.handleChangeSomme}

                           value={somme}
                           iconContent={
                             <Icon
                               size={16}
                               color="#ADB5BD"
                               name="money"
                               family="Font-Awesome"
                               style={styles.inputIcons}
                             />
                           }
                         />
                       </Block>

                       <Block width={width * 0.8} style={{ marginBottom: 10 }}>
                       <SwitchSelector
                            initial={0}
                            value={"30"}
                            onPress={value => this.setState({ cat: value })}
                            textColor={nowTheme.COLORS.INPUT}
                            selectedColor={nowTheme.COLORS.WHITE}
                            buttonColor={nowTheme.COLORS.PRIMARY}
                            borderColor={nowTheme.COLORS.INPUT}
                            hasPadding
                            options={[
                              { label: "Mensuel", value: "30" },
                              { label: "Hebdomadaire", value: "7" }
                            ]}
                         />
                       </Block>

                       <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                       <DatePicker
                          //showIcon={false}
                          style={styles.input_date}
                          date={date_debut}
                          mode="date"
                          placeholder="Date de debut"
                          format="DD-MM-YYYY"
                          //format="YYY,MM,DD"
                          minDate="01-01-2020"
                          maxDate="20-05-2030"
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          customStyles={{
                          
                            dateInput: {
                              borderRadius: 30,
                              borderColor: nowTheme.COLORS.BORDER,
                              height: 44,
                              backgroundColor: '#FFFFFF',
                              width:width * 0.8,
                            }
                            // ... You can check the source to find the other keys.
                          }}
                          iconComponent={
                            <Icon
                              size={16}
                              color="#ADB5BD"
                              name="calendar"
                              family="Font-Awesome"
                              style={styles.inputIcons2}
                            />
                          }
                          onDateChange={(date_debut) => {this.setState({date_debut: date_debut})}}
                        />
                       </Block>
                     
                      
                       <Block>
                        <Input
                          type="numeric"
                          placeholder={cat == "7"? "Duree de l'exercice (en semaine)":"Duree de l'exercice (en mois)"}
                          style={[styles.inputs, {
                            borderColor: this.state.nbr_jr_valide
                                    ? '#E3E3E3'
                                    : '#a11'
                          }]}

                            onChangeText={this.handleChangeNb_jr}

                            value={nbr_jour}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="calendar-o"
                                family="Font-Awesome"
                                style={styles.inputIcons}
                              />
                            }
                          />
                       </Block>
                      
                       
                       <Block
                         style={{ marginVertical: theme.SIZES.BASE, marginLeft: 15}}
                         row
                         width={width * 0.75}
                       >
                         <Checkbox
                           checkboxStyle={{
                             borderWidth: 1,
                             borderRadius: 2,
                             borderColor: '#E3E3E3'
                           }}
                           color={nowTheme.COLORS.PRIMARY}
                           labelStyle={{
                             color: nowTheme.COLORS.HEADER,
                             fontFamily: 'montserrat-regular'
                           }}
                           label="J'accepte les conditions d'utilisation."
                         />
                       </Block>
                     </Block>
                     <Block center>

                       <Button color="primary" round style={styles.createButton}
                       onPress={this.CheckGroupBeforeSave.bind(this)}>
                         <Text
                           style={{ fontFamily: 'montserrat-bold' }}
                           size={14}
                           color={nowTheme.COLORS.WHITE}
                         >
                           Creer un groupe
                         </Text>
                       </Button>
                       {/* <Toast isShow={isShow} positionIndicator="bottom" color="warning">This is a bottom positioned toast</Toast> */}
                     </Block>
                   </Block>

                 </Block>
               </Block>
               {/* </ScrollView> */}
             </Block>
           </Block>
           
         </Block>
              
              </ScrollView>














              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  imageBackground: {
    width: width,
    height: height
  },
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden'
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT
  },

  inputIcons2: {
    //marginLeft: 12,
    color: nowTheme.COLORS.ICON_INPUT,
    left:15,
    position:"absolute"
  },

  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10,
    elevation: 5
  },
  input_date: {
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: '#FFFFFF',
    width:width * 0.8
  },




});

export default AddGroup;
