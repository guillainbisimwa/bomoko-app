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
  ToastAndroid,
  AsyncStorage,
  Alert,
} from 'react-native';
import { Block, Text, Button as GaButton, theme, Checkbox } from 'galio-framework';

import { Button, Icon, Input, ListCredit} from '../components';
import { Images, nowTheme } from '../constants';

import { HeaderHeight } from '../constants/utils';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 4;


const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class ValidCredit extends React.Component {
  constructor(props) {
    super(props);
    dataCredits = [];
    dataCredits002 = [];

    this.state = {
      credits : [],
      allDataCredits : [],
      isRefreshing: false,
    };
  }

  _fetchCredit = async () =>{
    await NetInfo.isConnected.fetch().then(async isConnected => {
      if(isConnected){
        await fetch('http://188.166.46.8:3000/credits/', {
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
            AsyncStorage.setItem('CreditsLocalStorage', JSON.stringify(responseJson))
              .then(json => {
                ToastAndroid.show('CreditsLocalStorage1 save locally', ToastAndroid.SHORT)
                this._bootstrapAsyncCredits();
                if(responseJson == null){
                  this.setState({groupss: null});
                }
            })
              .catch(error => ToastAndroid.show('CreditsLocalStorage error local memory', ToastAndroid.SHORT));
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
  _bootstrapAsyncCredits = async () => {
   
    dataCredits = [];
    dataCredits002 = [];
    const CreditsLocalStorage = await AsyncStorage.getItem('CreditsLocalStorage')
    .then(async (value) => {
      dataCredits = await JSON.parse(value);

    const ClientsLocalStorage = await AsyncStorage.getItem('ClientsLocalStorage')
      .then(async (value) => {
        dataClients = await JSON.parse(value);

        const GroupsLocalStorage = await AsyncStorage.getItem('GroupsLocalStorage')
          .then(async (value) => {
            dataGroups = await JSON.parse(value);
            allDataCredit = [];

            await dataCredits.forEach(docCredit => {
              singleGroup = dataGroups.find((item) => item.id ==  docCredit.id_g );
              singleUser = dataClients.find((item) => item.id ==  docCredit.id_demandeur );

              allDataCredit.push({

                cat: docCredit.cat,
                date_creation: docCredit.date_creation,
                etat: docCredit.etat,
                id: docCredit.id,
                id_demandeur: docCredit.id_demandeur,
                id_echeance: docCredit.id_echeance,
                saison: docCredit.saison,
                somme: docCredit.somme,
                type: docCredit.type,
                nom_group: singleGroup.nom_group,
                nom_user:singleUser.nom,
                phone_user:singleUser.phone,
                nbr_jour: singleGroup.nbr_jour
              });
            })
            
            this.setState({
              credits: await allDataCredit,
            });

        }).done();

    }).done();

  }).done();
  };

  componentDidMount = async() =>{
    await this._fetchCredit();
    await this._bootstrapAsyncCredits();
  }

  render() {
    const { navigation } = this.props;
    const {
      credits,
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
                onRefresh={this._fetchCredit}
              />
              }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.articles}
              >
                <Block style={styles.header}>
                     
                      <Block flex>
                    
                    {credits.map((item, index) => {
                      return <Block key={index} flex row>
                      <ListCredit  item={item} />
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
  header1: {
    //backgroundColor: theme.COLORS.WHITE,
    //borderTopLeftRadius: theme.SIZES.BASE * 2,
    //borderTopRightRadius: theme.SIZES.BASE * 2,
    width : width - theme.SIZES.BASE * 3
  },



});

export default ValidCredit;
