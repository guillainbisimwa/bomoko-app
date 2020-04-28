import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
  NetInfo,
  AsyncStorage
} from 'react-native';
import { Block, Text, Button as GaButton, theme } from 'galio-framework';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class WaitValidAccount extends React.Component {
  constructor(props) {
    super(props);
    //this._bootstrapAsync();  
    this.state = {
      code_conf_sms_account: "",
      pid : "",
      phone : "",
      sms_code_valid: true,
      code_sms :"",
      currentAccountObj:"",
      isloading: false      
    };
    
  }
  //componentWillUnmount
  async componentDidMount() {
    //await this._bootstrapAsync();
  }
  
  _bootstrapAsync = async () => {
    const { navigation } = this.props;
    const currentAccountObj = await AsyncStorage.getItem('currentAccount');
    currentAccount = JSON.parse(currentAccountObj)
    alert("Vous allez recevoir un code de confirmation par SMS!");

    var pid = currentAccount["pid"];
    var phone = currentAccount["phone"];
    var code_conf_sms_account = currentAccount["code_conf_sms"];
    
    this.setState({pid: pid})
    this.setState({phone: phone})
    this.setState({code_conf_sms_account: code_conf_sms_account})
    this.setState({currentAccountObj: currentAccountObj})
    
    //this.setState({code_conf_sms_account: JSON.parse(navigation.getParam('code_conf_sms_account'))})

  };

  validateCodeSms(string) {
    return string.trim().length >= 4 && string.trim().length <= 5;

  }

  validateCodeSms_ = () =>{
    var code_sms = this.state.code_sms;
    var sms_code_valid = this.validateCodeSms(code_sms);
    
    this.setState({code_sms: this.state.code_sms})
    this.setState({sms_code_valid: sms_code_valid})
  }

  async logout() {
    AsyncStorage.clear(function(error, result) {
      if (error) {
        ToastAndroid.show(" ERROR"+error, ToastAndroid.SHORT)
      } else {
        ToastAndroid.show(" OK  "+result, ToastAndroid.SHORT)
      }
    });
  }


  async submitCheckCode() {
    //TODO Valider tout les champs
    if(this.state.sms_code_valid && (this.state.code_sms == this.state.code_conf_sms_account)){
      this.setState({isloading: true})
      await NetInfo.isConnected.fetch().then(async isConnected => {
        if(isConnected){
          
          await fetch('http://35.223.156.137:3000/valider_creation_cmpt', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({
              id: this.state.phone,
              code: this.state.code_sms
                    
            })
          }).then((response) => response.json())
          //If response is in json then in success
          .then((responseJson) => {
              //Success 
              this.setState({isloading: false})
              //ToastAndroid.show(JSON.stringify(responseJson), ToastAndroid.SHORT)
              currentAccount = JSON.parse(this.state.currentAccountObj)
              currentAccount.etat = 1;

              AsyncStorage.setItem('currentAccount', JSON.stringify(currentAccount))
              .then(json => ToastAndroid.show('currentAcount save locally', ToastAndroid.SHORT))
              .catch(error => ToastAndroid.show('currentAcount error local memory', ToastAndroid.SHORT));
              
              this.props.navigation.navigate("Onboarding");
          }) //If response is not in json then in error
          .catch((error) => {
              //Error 
              //alert(JSON.stringify(error));
              console.error(error);
              this.setState({isloading: false})
              ToastAndroid.show('Une erreur est surnenue '+ error, ToastAndroid.LONG)
          });
          
        }
        else{
          this.setState({isloading: false})
          ToastAndroid.show('Aucune connexion internet!', ToastAndroid.LONG)
        }
      })

    } else{
      this.setState({isloading: false})
      ToastAndroid.show('Veillez entrer un code valide svp!', ToastAndroid.LONG)
    }
  }
  
  handleChangeCodeSms = code_sms => this.setState({ code_sms }, this.validateCodeSms_);

  render() {
    const { navigation } = this.props;
    const {
      code_sms,
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
                <Block flex space="evenly">
                  <Block flex={0.4} middle style={styles.socialConnect}>
                    <Block flex={0.5} middle>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          textAlign: 'center'
                        }}
                        color="#333"
                        size={24}
                      >
                        Valider le compte
                      </Text>
                    </Block>

                    <Block flex={0.5} row middle space="between" style={{ marginBottom: 18 }}>
                      <GaButton
                        round
                        loading={isloading}
                        onlyIcon
                        shadowless
                        icon="envelope"
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
                              placeholder="Code de confirmation"
                              style={[styles.inputs, {
                                borderColor: this.state.sms_code_valid
                                      ? '#E3E3E3'
                                      : '#a11'
                              }]}
                              onChangeText={this.handleChangeCodeSms}
                              value={code_sms}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="envelope-o"
                                  family="Font-Awesome"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block
                            style={{ marginVertical: theme.SIZES.BASE, marginLeft: 15}}
                            width={width * 0.75}
                          >
                          <Text
                               style={{
                                fontFamily: 'montserrat-regular',
                                textAlign: 'center'
                              }}
                              muted
                              size={16}
                              onPress={this.logout.bind(this)}
                          >
                            Un code de validation a ete envoye a votre numero de telephone 
                            
                          </Text>
                          <Text
                               style={{
                                fontFamily: 'montserrat-bold',
                                textAlign: 'center'
                              }}
                              muted
                              size={16}
                          >
                           
                           {this.state.phone}
                          
                          </Text>
                          {/* <Text
                               style={{
                                fontFamily: 'montserrat-bold',
                                textAlign: 'center'
                              }}
                              muted
                              size={16}
                          >
                           CODE: ({this.state.code_conf_sms_account})
                          </Text> */}
                            
                          </Block>
                          
                        </Block>
                        <Block center>
                          <Button color="primary" round style={styles.createButton}
                           onPress={this.submitCheckCode.bind(this)}
                          >
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE} 
                            >
                              Valider
                            </Text>
                          </Button>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
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
    marginBottom: 40,
    elevation: 5
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10,
    elevation: 5
  }
});

export default WaitValidAccount;
