import React from "react";
import { StyleSheet, Dimensions, ScrollView, ToastAndroid, AsyncStorage, NetInfo
,ActivityIndicator, RefreshControl} from "react-native";

import { Block, Text, Button as GaButton, theme } from 'galio-framework';

import { Card2 as Card, Button } from "../components";
const { width } = Dimensions.get("screen");

class Home extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      groupss:[],
      clients:[],
      isLoading: true,

      isRefreshing: false,
    };
  }

  componentDidMount = async() =>{
    //await this._fetchGroup()
    await this._bootstrapAsyncGroup();
    await this._bootstrapAsyncClient();
  }

    // Fetch the token from storage then navigate to our appropriate place
 _bootstrapAsyncGroup = async () => {
  dataGroups = [];
  dataGroups002 = [];
  const GroupsLocalStorage = await AsyncStorage.getItem('GroupsLocalStorage')
  .then(async (value) => {
    //console.log("************************Get Value >> ", JSON.parse(value));
    dataGroups = await JSON.parse(value);
    //dataGroups002 = await dataGroups.filter((item) => (item.type == 102));
    //ToastAndroid.show(JSON.stringify(dataGroups)+"vo", ToastAndroid.LONG)

    this.setState({
      isLoading:  false,
      groupss: await dataGroups,
    });
 
    console.log(dataGroups)

   //console.log("*********************Put Value >> ", dataGroups);
 }).done();
};

_bootstrapAsyncClient = async () => {
  await this._fetchClients();

  dataClients = [];
  dataClients002 = [];
  const GroupsLocalStorage = await AsyncStorage.getItem('ClientsLocalStorage')
  .then(async (value) => {
    //console.log("************************Get Value >> ", JSON.parse(value));
    dataClients = await JSON.parse(value);
    //dataClients002 = await dataClients.filter((item) => (item.type == 102));
    //ToastAndroid.show(JSON.stringify(dataClients)+"vo", ToastAndroid.LONG)

    this.setState({
      isLoading:  false,
      clients: await dataClients,
    });
 
    console.log(dataClients)

   //console.log("*********************Put Value >> ", dataClients);
 }).done();
};

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
           onRefresh={this._fetchGroup}
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
  }
});

export default Home;
