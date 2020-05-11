import React from "react";
import { StyleSheet, Dimensions, ScrollView, ToastAndroid, AsyncStorage, NetInfo
,ActivityIndicator, RefreshControl} from "react-native";

import { Block, Text, Button as GaButton, theme, Icon } from 'galio-framework';

import ActionButton from 'react-native-action-button';

import { Card2 as Card, Button } from "../components";
const { width } = Dimensions.get("screen");

class Home extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      groupss:[],
      clients:[],
      currentUser:{},
      isLoading: true,

      isRefreshing: false,
    };
  }

  componentDidMount = async() =>{
    //J = AsyncStorage.getItem('phone');
    const currentAccount = await AsyncStorage.getItem('currentAccount')
    .then(async (value) => {
      //console.log("************************Get Value >> ", JSON.parse(value));
      currentUser = await JSON.parse(value);
      // ToastAndroid.show(JSON.stringify(currentUser)+" <--", ToastAndroid.LONG)
      // ToastAndroid.show(JSON.stringify(currentUser)+" <--", ToastAndroid.LONG)
      this.setState({
        currentUser: await currentUser,
      });
      
      //console.log(currentUser)

    //console.log("*********************Put Value >> ", dataClients);
    }).done();


    await this._fetchGroup()
    await this._bootstrapAsyncGroup();
    await this._bootstrapAsyncClient();
    await this._fetchCredit();
    await this._fetchEcheances();
  }

    // Fetch the token from storage then navigate to our appropriate place
 _bootstrapAsyncGroup = async () => {
  dataGroups = [];
  const ClientsLocalStorage =  AsyncStorage.getItem('ClientsLocalStorage')
  .then(async (valueC) => {
    dataClients = await JSON.parse(valueC);
    const currentAccount =  AsyncStorage.getItem('currentAccount')
    .then(async (valueU) => {
      currentUser = await JSON.parse(valueU);
      currentProfile = await dataClients.find((item2) => item2.phone == currentUser['phone']);
      const GroupsLocalStorage = await AsyncStorage.getItem('GroupsLocalStorage')
      .then(async (value) => {
        dataGroups002 = [];

        dataGroups = await JSON.parse(value);

        await dataGroups.forEach( async docG => {
       
          countGroupMember = 0
          clientByGroup = dataClients.filter((item2) => item2.id_g == docG.id);
          countGroupMember = clientByGroup.reduce((key, val) => key + 1, 0);
          
          etatCurrentUser = 0;
          if(currentProfile.id_g != "")
          {
            if(docG.id == currentProfile.id_g) etatCurrentUser =  1 
          }
          else etatCurrentUser
          
          await dataGroups002.push({
            cat : docG.cat,
            date_creation : docG.date_creation,
            date_debut : docG.date_debut,
            date_fin : docG.date_fin,
            details : docG.details,
            etat : docG.etat,
            id : docG.id,
            id_responsable : docG.id_responsable,
            nbr_jour : docG.nbr_jour,
            nom_group : docG.nom_group,
            somme : docG.somme,
            taux : docG.taux,
            type : docG.type,
            etatCurrentUser: etatCurrentUser,
            countGroupMember : countGroupMember
          })
        });
        
        this.setState({
          isLoading:  false,
          groupss: await dataGroups002,
        });
      }).done();
    }).done();
  }).done();
};

_bootstrapAsyncClient = async () => {
  await this._fetchClients();

  dataClients = [];
  dataClients002 = [];
  const GroupsLocalStorage = await AsyncStorage.getItem('ClientsLocalStorage')
  .then(async (value) => {
    dataClients = await JSON.parse(value);
    this.setState({
      isLoading:  false,
      clients: await dataClients,
    });
 }).done();
};

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
          })
            .catch(error => ToastAndroid.show('CreditsLocalStorage error local memory', ToastAndroid.SHORT));
      })
      //If response is not in json then in error
      .catch((error) => {
          //Error 
          ToastAndroid.show('Une erreur est survenue. Verifier votre connexion internet ', ToastAndroid.LONG)
      });  
    }
    else{
      ToastAndroid.show('Aucune connexion internet!', ToastAndroid.LONG)
    }
  })
}

_fetchEcheances = async () =>{
  await NetInfo.isConnected.fetch().then(async isConnected => {
    if(isConnected){
      await fetch('http://188.166.46.8:3000/echeances', {
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
          AsyncStorage.setItem('EcheancesLocalStorage', JSON.stringify(responseJson))
            .then(json => {
              ToastAndroid.show('EcheancesLocalStorage1 save locally', ToastAndroid.SHORT)
          })
            .catch(error => ToastAndroid.show('EcheancesLocalStorage error local memory', ToastAndroid.SHORT));
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

_fetchClients = async () =>{
  await NetInfo.isConnected.fetch().then(async isConnected => {
    if(isConnected){
  
      await fetch('http://188.166.46.8:3000/clients/', {
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

  _fetchGroup = async () =>{
    await NetInfo.isConnected.fetch().then(async isConnected => {
      if(isConnected){
    
        await fetch('http://188.166.46.8:3000/groups/', {
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
                //ToastAndroid.show(JSON.stringify(responseJson), ToastAndroid.LONG)
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

  render() {
    if(this.state.isLoading){
      return( 
        <Block style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" /> 
        </Block>
      )
    }
    
    return (
      <Block flex center style={styles.home} >
        <Block>
        <ScrollView refreshControl={
           <RefreshControl
           refreshing={this.state.isRefreshing}
           onRefresh={this.componentDidMount}
         />
        }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}
        >

        {this.state.groupss == null || this.state.groupss == ""? 
        <Block flex center>
          <Block>
          <GaButton
            round
            onlyIcon
            shadowless
            icon="refresh"
            iconFamily="Font-Awesome"
            iconColor={theme.COLORS.WHITE}
            iconSize={theme.SIZES.BASE * 1.625}
            color="info"
            style={[styles.social]}
            onPress = {() => this._fetchGroup()}
          />
        </Block>

       <Text>Aucun groupe disponible, veiller raffraichir cette page</Text>
         
        
      </Block>
      :
      <Block flex>

            {this.state.groupss.map((item, index) => {
               return <Block key={index} flex row>
              <Card item={item} horizontal />
            </Block>
            })}   
            
          </Block>
      } 
        </ScrollView>
        {
        this.state.currentUser.phone == "+243000000000"? 
        <ActionButton shadowStyle={styles.elevation} buttonColor="rgba(231,76,60,1)" >
        <ActionButton.Item buttonColor='#9b59b6' title="Creer un groupe" onPress={() => 
          this.props.navigation.navigate('AddGroup') 
        }>
          <Icon name="users" family="font-awesome" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#3498db' title="Valider Credits" onPress={() => {
          this.props.navigation.navigate('ValidCredits')
        }}>
          <Icon name="money" family="font-awesome" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title="Valider Groupes" onPress={() => {
          this.props.navigation.navigate('ValidGroups')
        }}>
          <Icon name="users" family="font-awesome" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton> 
      :
      <Block style={styles.fab}>
      <GaButton
        round
        onlyIcon
        shadowless
        icon="plus"
        iconFamily="Font-Awesome"
        iconColor={theme.COLORS.WHITE}
        iconSize={theme.SIZES.BASE * 1.625}
        color="error"
        style={[styles.social]}
        onPress = {() => this.props.navigation.navigate('AddGroup')}
      />
    </Block>
        }
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular'
  },
  fab: {
    position: 'absolute',
    right: 0,
    marginBottom:theme.SIZES.BASE * 1.75,
    bottom: 0,position: 'absolute',
    left: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    elevation: 5
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  elevation:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  }
});

export default Home;
