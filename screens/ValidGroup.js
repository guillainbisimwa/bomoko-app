import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView, 
  RefreshControl,
  NetInfo,
  AsyncStorage,
  Alert,
} from 'react-native';
import { Block, Text, Button as GaButton, theme, Checkbox } from 'galio-framework';

import { Button, Icon, Input, ListGroup} from '../components';
import { Images, nowTheme } from '../constants';

import { HeaderHeight } from '../constants/utils';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 4;


const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class ValidGroup extends React.Component {
  constructor(props) {
    super(props);
    dataGroups = [];
    dataGroups002 = [];
    

    this.state = {
      groups : [],
      isRefreshing: false,
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
            AsyncStorage.setItem('GroupsLocalStorage', JSON.stringify(responseJson))
              .then(json => {
                ToastAndroid.show('GroupsLocalStorage1 save locally', ToastAndroid.SHORT)
                this._bootstrapAsyncGroup();
                if(responseJson == null){
                  this.setState({groupss: null});
                }
            })
              .catch(error => ToastAndroid.show('GroupsLocalStorage error local memory', ToastAndroid.SHORT));
        })
        //If response is not in json then in error
        .catch((error) => {
            //Error 
            ToastAndroid.show('Une erreur est survenue '+ error, ToastAndroid.LONG)
        });  
      }
      else{
        ToastAndroid.show('Aucune connexion internet!', ToastAndroid.LONG)
      }
    })
  }

      // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsyncGroup = async () => {
  dataGroups = [];
  dataGroups002 = [];
  const GroupsLocalStorage = await AsyncStorage.getItem('GroupsLocalStorage')
  .then(async (value) => {
    dataGroups = await JSON.parse(value);
    this.setState({
      groups: await dataGroups,
    });
  }).done();
  };

  componentDidMount = async() =>{
    await this._bootstrapAsyncGroup();
  }

  render() {
    const { navigation } = this.props;
    const {
      groups,
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
                
              <ScrollView refreshControl={
                <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._fetchGroup}
              />
              }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.articles}
              >
                <Block>
                     
                      <Block flex>
                    
                    {groups.map((item, index) => {
                      return <Block key={index} flex row>
                      <ListGroup item={item} horizontal/>
                    </Block>
                    })}   

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
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular'
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
    overflow: 'hidden',
    padding:5
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
    marginHorizontal: 10
  },
  




});

export default ValidGroup;
