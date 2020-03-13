import React from 'react';
import { ImageBackground, 
  Image, 
  StyleSheet, 
  StatusBar, 
  Dimensions, 
  Platform, 
  AsyncStorage,
  ToastAndroid
} from 'react-native';

import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../constants/';
import { HeaderHeight } from '../constants/utils';

export default class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    //this._bootstrapAsync();  
    this.state = {
      active_session: false,
    };
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const currentAccountObj = await AsyncStorage.getItem('currentAccount',function(error, result) {
      if (error) {
        ToastAndroid.show(" ERROR "+error, ToastAndroid.SHORT)
      } else {
        ToastAndroid.show(" OK ", ToastAndroid.SHORT)
      }
    });
    //ToastAndroid.show(currentAccountObj, ToastAndroid.SHORT)
    if(currentAccountObj == null){
      this.props.navigation.navigate('Login');
    }
    else{
      currentAccount = JSON.parse(currentAccountObj)
      // var pid = currentAccount["pid"];
      // var phone = currentAccount["phone"];
      //var code_conf_sms_account = currentAccount["code_conf_sms"];
      /**
       * ETAT
       *======
       *  0: en attente
       *  1: valide
       *  2: bloque
       */
      var etat_account = parseInt(currentAccount["etat"]); 
      var password = currentAccount["password"];
  
      //ToastAndroid.show("Etat: "+etat_account, ToastAndroid.SHORT)
      //alert(etat_account)
  
  
      const currentSessionObj = await AsyncStorage.getItem('currentSession');
      currentSession = JSON.parse(currentSessionObj);
  
      var sid = "";
  
      if(currentSession == null || currentSession == "" ){      
        sid = "";
      }else if(currentSession != null ){      
        sid = currentSession["sid"];
      }
  
      if(etat_account == 0){
        ToastAndroid.show("En attente de validation:"+etat_account, ToastAndroid.SHORT)
        this.props.navigation.navigate('WaitValidAccount');
  
        // this.props.navigation.navigate("WaitValidAccount", {
        //   code_conf_sms_account: `${JSON.stringify(code_conf_sms_account)}`,
        // });
  
      }else if(etat_account == 1 && sid == "" ){
        ToastAndroid.show("Login ", ToastAndroid.SHORT)
        this.props.navigation.navigate('Login');
      }
      else{
        //ToastAndroid.show("Bienvenue ", ToastAndroid.SHORT)
        this.props.navigation.navigate('Home');
        // this.props.navigation.navigate('Home', {

        //   groups_: `${JSON.stringify(this.state.groups)}`,

        //  })
      }
    }
  };
  
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex>
          <ImageBackground
            source={Images.bomokoBg}
            style={{ flex: 1, height: height, width, zIndex: 1 }}
          />
          <Block space="between" style={styles.padded}>
            <Block>
              <Block middle>
                <Image source={Images.bomokoLogo} style={{ width: 115, height: 124, bottom: 200, position: 'absolute' }} />
              </Block>
              <Block>
                <Block middle>
                  <Text
                    style={{
                      fontFamily: 'montserrat-regular', bottom: 50, position: 'absolute', letterSpacing: 2, paddingHorizontal: 20, textAlign: 'center'
                    }}
                    bold={true}
                    color="white"
                    size={33}
                  >
                    BOMOKO APP
                  </Text>
                </Block>
              </Block>
              <Block
                row
                style={{
                  marginTop: theme.SIZES.BASE * 2.5,
                  marginBottom: theme.SIZES.BASE * 2
                }}
              >
                <Button
                  shadowless
                  style={styles.button}
                  color={nowTheme.COLORS.PRIMARY}
                  onPress={this._bootstrapAsync}
                >
                  <Text
                    style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                    color={theme.COLORS.WHITE}
                  >
                    LANCER
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    elevation: 5
  },

  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66
  }
});
