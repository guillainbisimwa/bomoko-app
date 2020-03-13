import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
  NetInfo,
  AsyncStorage,
  Alert,
  ScrollView
} from 'react-native';
import { Block, Text, Button as GaButton, theme, Checkbox } from 'galio-framework';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password : "",
      phone : "",
      phone_valid: true,
      password_valid: true,
      isloading: false
    };
  }
  _fetchGroup = async () =>{
    await NetInfo.isConnected.fetch().then(async isConnected => {
      if(isConnected){
    
        await fetch('http://35.223.156.137:3000/groups/', {
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
              .then(json => {
                ToastAndroid.show('GroupsLocalStorage1 save locally', ToastAndroid.SHORT)
                //ToastAndroid.show(JSON.stringify(responseJson), ToastAndroid.LONG)
                this._bootstrapAsync();
                if(responseJson == null){
                  this.setState({groupss: null});
                }

            }).catch(error => ToastAndroid.show('GroupsLocalStorage error local memory', ToastAndroid.SHORT));
        })
        //If response is not in json then in error
        .catch((error) => {
            //Error 
            //alert(JSON.stringify(error));
            ToastAndroid.show('Une erreur est survenue '+ error, ToastAndroid.LONG)
            console.error(error);
        });  
        
      }
      else{
        ToastAndroid.show('Aucune connexion internet!', ToastAndroid.LONG)
      }
    })
  }

  _fetchClients = async () =>{
    await NetInfo.isConnected.fetch().then(async isConnected => {
      if(isConnected){
    
        await fetch('http://35.223.156.137:3000/clients/', {
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
            AsyncStorage.setItem('ClientsLocalStorage', JSON.stringify(responseJson))
              .then(json => {
                ToastAndroid.show('ClientsLocalStorage1 save locally', ToastAndroid.SHORT)
                //ToastAndroid.show(JSON.stringify(responseJson), ToastAndroid.LONG)
                // this._bootstrapAsyncGroup();
                // if(responseJson == null){
                //   this.setState({groupss: null});
                // }
  
            })
              .catch(error => ToastAndroid.show('ClientsLocalStorage error local memory', ToastAndroid.SHORT));
            
            
            
        })
        //If response is not in json then in error
        .catch((error) => {
            //Error 
            //alert(JSON.stringify(error));
            ToastAndroid.show('Une erreur est survenue '+ error, ToastAndroid.LONG)
            console.error(error);
        });  
        
      }
      else{
        ToastAndroid.show('Aucune connexion internet!', ToastAndroid.LONG)
      }
    })
  }
  
  validatePassword(string) {
    return string.trim().length > 5;
  }

  validatePassword_ = () =>{
    var password = this.state.password;
    var password_valid = this.validatePassword(password);
    
    this.setState({password: this.state.password})
    this.setState({password_valid: password_valid})
  }

  validatePhone(string) {
    return string.trim().length > 12;
  }

  validatePhone_ = () =>{
    var phone = this.state.phone;
    var phone_valid = this.validatePhone(phone);
    
    this.setState({phone: this.state.phone})
    this.setState({phone_valid: phone_valid})
  }

  handleChangePhone = phone => this.setState({ phone }, this.validatePhone_);
  handleChangePassword = password => this.setState({ password }, this.validatePassword_);

  async submitLogin() {
    this.setState({isloading: true})

    //TODO Valider tout les champs
    if(this.state.phone_valid && this.state.password_valid ){
      await NetInfo.isConnected.fetch().then(async isConnected => {
        if(isConnected){
          this._fetchClients()
          this._fetchGroup()
          await fetch('http://35.223.156.137:3000/login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({
              phone: this.state.phone,
              password: this.state.password    
            })
          }).then((response) => response.json())
          //If response is in json then in success
          .then(async (responseJson) => {
            //ToastAndroid.show(JSON.stringify(responseJson), ToastAndroid.SHORT)

            //Success 
            var prop = 'message'; 
            if(responseJson.hasOwnProperty(prop)) { 
              //this.createClient();
              //ToastAndroid.show('Ce message '+responseJson, ToastAndroid.LONG)
              this.setState({isloading: false})
              ToastAndroid.show(responseJson["message"], ToastAndroid.LONG)


            } else if (responseJson["etat"] == 0) { //always 0
              //ToastAndroid.show(JSON.stringify(responseJson), ToastAndroid.SHORT)
              await fetch('http://35.223.156.137:3000/client_by_phone/'+responseJson["phone"], {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              })
              .then((response_2) => response_2.json())
              //If response is in json then in success
              .then((responseJson_2) => {
                this.setState({isloading: false})
  
                  var prop_2 = 'message'; 
                  if(responseJson_2.hasOwnProperty(prop_2)) { 
                   
                    ToastAndroid.show("Ce compte n'existe pas!", ToastAndroid.LONG)

                  }
                  else if(responseJson_2["etat"] == 0){
                    //Success 
                    AsyncStorage.setItem('currentAccount', JSON.stringify(responseJson_2))
                      .then(json => ToastAndroid.show('currentAcount save locally', ToastAndroid.SHORT))
                      .catch(error => ToastAndroid.show('currentAcount error local memory', ToastAndroid.SHORT));

                      AsyncStorage.setItem('phone', JSON.stringify(responseJson_2["phone"]))
                      .then(json => ToastAndroid.show('phone save locally', ToastAndroid.SHORT))
                      .catch(error => ToastAndroid.show('phone error local memory', ToastAndroid.SHORT));
                      

                      this.props.navigation.navigate("Onboarding");
                  }
                  else if(responseJson_2["etat"] == 1){
                    //Success 
                    AsyncStorage.setItem('currentAccount', JSON.stringify(responseJson_2))
                      .then(json => ToastAndroid.show('currentAcount save locally', ToastAndroid.SHORT))
                      .catch(error => ToastAndroid.show('currentAcount error local memory', ToastAndroid.SHORT));
                   
                    AsyncStorage.setItem('currentSession', JSON.stringify(responseJson))
                      .then(json => ToastAndroid.show('currentSession save locally', ToastAndroid.SHORT))
                      .catch(error => ToastAndroid.show('currentSession error local memory', ToastAndroid.SHORT));
                      this.setState({isloading: false})

                      AsyncStorage.setItem('phone', JSON.stringify(responseJson_2["phone"]))
                      .then(json => ToastAndroid.show('phone save locally', ToastAndroid.SHORT))
                      .catch(error => ToastAndroid.show('phone error local memory', ToastAndroid.SHORT));
                      

                      this.props.navigation.navigate("Home");
                  }
                  else{
                    ToastAndroid.show("Numero ou mots de passe incorrect!", ToastAndroid.LONG)
                  }
              })
              //If response is not in json then in error
              .catch((error) => {
                  //Error 
                  //alert(JSON.stringify(error));
                  this.setState({isloading: false})

                  alert('Une erreur est survenue '+ error);
                  ToastAndroid.show("Erreure de la connexion! "+error, ToastAndroid.LONG)

                  console.error(error);
              });
              
            }
            else{
              this.setState({isloading: false})
              ToastAndroid.show("Erreure de la connexion! Reesayer", ToastAndroid.LONG)

            }
           
          }) //If response is not in json then in error
          .catch((error) => {
              //Error 
              this.setState({isloading: false})
              //alert('Une erreur est survenue '+ error);
              //ToastAndroid.show("Erreure de la connexion! "+error, ToastAndroid.LONG)

              console.error(error);
              ToastAndroid.show('Une erreur est survenue '+ error, ToastAndroid.LONG)
          });
          
        }
        else{
          this.setState({isloading: false})
          ToastAndroid.show('Aucune connexion internet!', ToastAndroid.LONG)
        }
      })

    } else{
      this.setState({isloading: false})
      ToastAndroid.show('Veillez entrer les identifiants valides svp!', ToastAndroid.LONG)
    }
  }

  render() {
    const { navigation } = this.props;
    const {
      phone,
      password,
      isloading
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
                        Se connecter
                      </Text>
                    </Block>

                    <Block flex={0.5} row middle space="between" style={{ marginBottom: 18 }}>
                      <GaButton
                        round
                        loading={isloading}
                        onlyIcon
                        shadowless
                        icon="lock"
                        iconFamily="Font-Awesome"
                        iconColor={theme.COLORS.WHITE}
                        iconSize={theme.SIZES.BASE * 1.625}
                        color={nowTheme.COLORS.WARNING}
                        style={[styles.social, styles.shadow]}
                      />
                    </Block>
                  </Block>
                  
                  <Block flex={1} middle space="between">
                    <Block center flex={0.9}>
                      <Block flex space="between">
                        <Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              type = "phone-pad"
                              placeholder="Telephone"
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
                                  name="phone"
                                  family="Font-Awesome"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8}>
                            <Input
                              style={[styles.inputs, {
                              borderColor: this.state.password_valid
                                    ? '#E3E3E3'
                                    : '#a11'
                              }]}
                            onChangeText={this.handleChangePassword}
                            value={password}
                              placeholder="Mots de passe"
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
                          <Text
                               style={{
                                fontFamily: 'montserrat-regular',
                                textAlign: 'center'
                              }}
                              muted
                              size={16}
                              onPress={() => navigation.navigate('Singin')}
                          >
                            Etes-vous nouveau? Creer votre compte ici
                          </Text>
                            
                          </Block>
                        </Block>
                        <Block center>
                          <Button color="primary" round style={styles.createButton}
                          loading={isloading}
                           onPress={this.submitLogin.bind(this)}
                          >
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE} 
                            >
                              Se connecter
                            </Text>
                          </Button>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
            </ScrollView>
            </Block>
            </Block>
          </ImageBackground>
          <KeyboardSpacer/>
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

export default Login;
