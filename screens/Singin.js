import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
  ToastAndroid,
  NetInfo,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input , Select} from '../components';
import { Images, nowTheme } from '../constants';

import SwitchSelector from "react-native-switch-selector";
import { Image } from 'react-native-svg';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

const options = [
  { label: "01:00", value: "1" },
  { label: "01:30", value: "1.5" },
  { label: "02:00", value: "2" }
];


class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: "",
      phone: "",
      id_g: "",
      num_carte_elec: "",
      address: "",
      sexe: "m",
      profession: "",
      code_conf_sms: "",
      password: "",
      conf_password: "",
      
      sign_in_failed: false,
      showLoading: false,

      phone_valid: true,
      name_valid: true,
      password_confirm_valid: true,
      password_valid: true,
      adresse_valid: true,
      isShow: false      
    };
    
  }

  // TODO Check if account is not activate
  // TODO check if phone exists
  // TODO check if all values are valid
  // TODO create account
  // TODO UI wait for code validation account

  validateName(string) {

    return string.trim().length > 3;
  }

  validateAdresse(string) {
    return string.trim().length > 4;
  }

  validatePhone(string) {
    return string.trim().length > 12;
  }

  validatePassword(string) {
    return string.trim().length > 5;
  }

  confirmPassword(password, conf_password) {
    //return string.trim().length > 3;
    if(password.trim().length < 3){
      return password.trim().length > 5;
    }
    return password.trim() == conf_password.trim()
  }

  validateName_ = () =>{
    var nom = this.state.nom;
    var name_valid = this.validateName(nom);
    
    this.setState({nom: this.state.nom})
    this.setState({name_valid: name_valid})
  }

  validateAdresse_ = () =>{
    var address = this.state.address;
    var adresse_valid = this.validateAdresse(address);
    
    this.setState({address: this.state.address})
    this.setState({adresse_valid: adresse_valid})
  }

  validatePhone_ = () =>{
    var phone = this.state.phone;
    var phone_valid = this.validatePhone(phone);
    
    this.setState({phone: this.state.phone})
    this.setState({phone_valid: phone_valid})
  }

  validatePassword_ = () =>{
    var password = this.state.password;
    var password_valid = this.validatePassword(password);
    
    this.setState({password: this.state.password})
    this.setState({password_valid: password_valid})
  }

  confirmPassword_ = () =>{
    var password = this.state.password;
    var conf_password = this.state.conf_password;
    var password_confirm_valid = this.confirmPassword(password, conf_password);
    
    this.setState({conf_password: this.state.conf_password})
    this.setState({password_confirm_valid: password_confirm_valid})
  }

  handleChangeNom = nom => this.setState({ nom }, this.validateName_);
  handleChangeAdresse = address => this.setState({ address }, this.validateAdresse_);
  handleChangePhone = phone => this.setState({ phone }, this.validatePhone_);
  handleChangePassword= password => this.setState({ password }, this.validatePassword_);
  handleChangeConfPassword= conf_password => this.setState({ conf_password }, this.confirmPassword_);

  async createClient(){
     //var nom_ = this.state.nom
     var phone_ = this.state.phone
     var nom_ = this.state.nom
     var address_ = this.state.address
     var sexe_ = this.state.sexe
     var password = this.state.password
     var conf_password = this.state.conf_password

    await fetch('http://192.168.56.1:3000/register_client', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        nom: nom_,
        phone: phone_,
        id_g: "",
        num_carte_elec: "",
        address: address_,
        sexe: sexe_,
        profession: "",
        code_conf_sms: "",
        password:conf_password           
      })
    }).then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
        //Success 
        ToastAndroid.show(JSON.stringify(responseJson["code_conf_sms"]), ToastAndroid.SHORT)
        // TODO Save local variables
        AsyncStorage.setItem('currentAccount', JSON.stringify(responseJson))
        .then(json => ToastAndroid.show('currentAcount save locally', ToastAndroid.SHORT))
        .catch(error => ToastAndroid.show('currentAcount error local memory', ToastAndroid.SHORT));
        
        // TODO send code sms  send_sms_from_rmlconnect
        fetch('http://192.168.56.1:3000/send_sms_from_rmlconnect', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({
            msg_detail:"Bonjour Mr "+nom_+", valider votre compte. Votre code est:",
	          msg_code:JSON.stringify(responseJson["code_conf_sms"]),
	          phone:phone_
              
          })
        }).then((response1) => response1.json())
        //If response is in json then in success
        .then((responseJson1) => {
          ToastAndroid.show('codeeeeeeeeeeee '+ JSON.stringify(responseJson1), ToastAndroid.LONG)
            
        }) //If response is not in json then in error
        .catch((error1) => {
            //Error 
            console.error(error1);
            ToastAndroid.show('Une erreur est surnenue '+ error1, ToastAndroid.LONG)
        });
        // TODO open waitValidAccout screen
          this.props.navigation.navigate("Onboarding");


    }) //If response is not in json then in error
    .catch((error) => {
        //Error 
        alert(JSON.stringify(error));
        console.error(error);
        ToastAndroid.show('Une erreur est surnenue '+ error, ToastAndroid.LONG)
    });
  }

  async CheckClientBeforeSave() {

    //TODO Valider tout les champs
    if(this.state.name_valid && this.state.adresse_valid && this.state.phone_valid 
      && this.state.password_valid && this.state.password_confirm_valid){

          //AsyncStorage.clear();

          await NetInfo.isConnected.fetch().then(async isConnected => {
            if(isConnected){
          
              await fetch('http://192.168.56.1:3000/client_by_phone/'+this.state.phone, {
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
                    this.createClient();
                  } else { 
                    ToastAndroid.show('Ce numero est dja utilise', ToastAndroid.LONG)
                    this.setState({phone_valid: false})
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
    const {
      nom,
      phone,
      address,
      password,
      conf_password,
      isShow
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
                        S'enregistrer
                      </Text>
                    </Block>

                    <Block flex={0.5} row middle space="between" style={{ marginBottom: 18 }}>
                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="twitter"
                        iconFamily="Font-Awesome"
                        iconColor={theme.COLORS.WHITE}
                        iconSize={theme.SIZES.BASE * 1.625}
                        color={nowTheme.COLORS.TWITTER}
                        style={[styles.social, styles.shadow]}
                      />
                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="facebook"
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
                      Let's go ...
                    </Text>
                  </Block>
                  <Block flex={1} middle space="between">
                    <Block center flex={0.9}>
                      <Block flex space="between">
                        <Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Nom complet"
                              style={[styles.inputs, {
                                borderColor: this.state.name_valid
                                      ? '#E3E3E3'
                                      : '#a11'
                              }]}

                              onChangeText={this.handleChangeNom}

                              value={nom}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="user"
                                  family="Font-Awesome"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>

                          {/* <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                          <SwitchSelector
                            options={options}
                              initial={0}
                              onPress={value => console.log(`Call onPress with value: ${value}`)}
                            />
                          </Block> */}

                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              type = "phone-pad"
                              placeholder="Numero de telephone"
                              style={[styles.inputs, {
                                borderColor: this.state.phone_valid
                                      ? '#E3E3E3'
                                      : '#a11'
                              }]}
                              onChangeText={this.handleChangePhone}
                              value={phone}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="mobile"
                                  family="Font-Awesome"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <SwitchSelector
                              initial={0}
                              onPress={value => this.setState({ sexe: value })}
                              textColor={nowTheme.COLORS.INPUT}
                              selectedColor={nowTheme.COLORS.WHITE}
                              buttonColor={nowTheme.COLORS.PRIMARY}
                              borderColor={nowTheme.COLORS.INPUT}
                              hasPadding
                              options={[
                                { label: "Feminin", value: "f", imageIcon: Images.iconWoman }, 
                                { label: "Masculin", value: "m", imageIcon: Images.iconMan } 
                              ]}
                            />
                          </Block>

                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Adresse"
                              style={[styles.inputs, {
                                borderColor: this.state.adresse_valid
                                      ? '#E3E3E3'
                                      : '#a11'
                              }]}
                              onChangeText={this.handleChangeAdresse}
                              value={address}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="map-marker"
                                  family="Font-Awesome"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Mots de passe"
                              style={[styles.inputs, {
                                borderColor: this.state.password_valid
                                      ? '#E3E3E3'
                                      : '#a11'
                              }]}
                              onChangeText={this.handleChangePassword}
                              value={password}
                              password
                              viewPass
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="key"
                                  family="Font-Awesome"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Confirmer le mots de passe"
                              style={[styles.inputs, {
                                borderColor: this.state.password_confirm_valid
                                      ? '#E3E3E3'
                                      : '#a11'
                              }]}
                              onChangeText={this.handleChangeConfPassword}
                              value={conf_password}
                              password
                              viewPass
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="key"
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
                            onPress={this.CheckClientBeforeSave.bind(this)}>
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                            >
                              Creer un compte
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
    elevation:5
  }
});

export default Signin;
