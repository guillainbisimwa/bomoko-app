import React from "react";
import { StyleSheet, Dimensions, ScrollView, ToastAndroid, AsyncStorage, NetInfo
,ActivityIndicator, RefreshControl} from "react-native";

import { Block, Text, Button as GaButton, theme } from 'galio-framework';

import { Card2 as Card, Button } from "../components";
const { width } = Dimensions.get("screen");

class Home extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
    this.state = {
      groupss:[],
      isLoading: true,

      isRefreshing: false,
    };
  }


    // Fetch the token from storage then navigate to our appropriate place
 _bootstrapAsync = async () => {
  dataGroups = [];
  dataGroups002 = [];
  const GroupsLocalStorage = await AsyncStorage.getItem('GroupsLocalStorage')
  .then(async (value) => {
    //console.log("************************Get Value >> ", JSON.parse(value));
    dataGroups = await JSON.parse(value);
    //dataGroups002 = await dataGroups.filter((item) => (item.type == 102));
    this.setState({
      dataGroupsLocalStorage: await dataGroups,
      isLoading:  false,
      groupss: await dataGroups,
    });
 
    console.log(dataGroups)

   //console.log("*********************Put Value >> ", dataGroups);
 }).done();
};

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
            
            this._bootstrapAsync();
            
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
          <Block flex>

            {this.state.groupss.map((item, index) => {
               return <Block key={index} flex row>
              <Card item={item} horizontal />
            </Block>
            })}   
            
          </Block>
          
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
