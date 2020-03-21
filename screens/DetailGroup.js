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
  Image,
  ActivityIndicator,
  View
} from 'react-native';
import { Block, Text, Button as GaButton, theme, Checkbox } from 'galio-framework';

import { Button, Icon, Input, ListCLient, ListEcheance } from '../components';
import RBSheet from "react-native-raw-bottom-sheet";

import { Images, nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 4;

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class DetailGroup extends React.Component {
  constructor(props) {
    super(props);

    prod =  JSON.parse(this.props.navigation.getParam("product"))
    clients =  JSON.parse(this.props.navigation.getParam("clients"))
    countGroupMember =  JSON.parse(this.props.navigation.getParam("countGroupMember"))
    currentUser =  JSON.parse(this.props.navigation.getParam("currentUser"))
    currentProfile =  JSON.parse(this.props.navigation.getParam("currentProfile"))
    allEcheance =  JSON.parse(this.props.navigation.getParam("allEcheance"))
    //singleGroup = dataGroups.find((item) => item.id ==  docCredit.id_g );
          
    //singleUser = dataClients.find((item) => item.id ==  docCredit.id_demandeur );
              
    clientByGroup =  JSON.parse(this.props.navigation.getParam("clientByGroup"))
    allDataCredit =  JSON.parse(this.props.navigation.getParam("allDataCredit"))
    //TODO SOMME VALID AND SOMME INVALID
    somme_group_valid = JSON.parse(this.props.navigation.getParam("somme_group_valid"))
    somme_group_invalid = JSON.parse(this.props.navigation.getParam("somme_group_invalid"))

    //ToastAndroid.show(JSON.stringify(allDataCredit), ToastAndroid.LONG)
    currentEcheance = allEcheance.find((item) => item.id_c == currentProfile.id_c);
    if(!currentEcheance){
      c=[]
      c.push({
        id: "0",
        date_ech: 0,
        somme_intert: 0,
        somme_sans_inter: 0
      });
      //ToastAndroid.show("VIdeeeee", ToastAndroid.LONG)
      this.state = {
        st : "",
        group:prod,
        isLoading: false,
        clients:clients,
        currentUser:currentUser,
        currentProfile:currentProfile,
        clientByGroup:allDataCredit,
        countGroupMember:countGroupMember,
        allEcheance:allEcheance,
        isRefreshing: false,
        somme_group_valid:somme_group_valid,
        somme_group_invalid:somme_group_invalid,
        currentEcheance: c
      };
    }
    else {

      //ToastAndroid.show(JSON.stringify(currentEcheance.lenght), ToastAndroid.LONG)
      c = []
      if(currentEcheance.echeance != undefined){
        currentEcheance.echeance.forEach(element => {
          c.push({
            id: element.id,
            date_ech: element.date_ech,
            somme_intert: element.somme_intert,
            somme_sans_inter: element.somme_echeance_sing
          });
        });
      }

      this.state = {
        st : "",
        group:prod,
        isLoading: false,
        clients:clients,
        currentUser:currentUser,
        currentProfile:currentProfile,
        clientByGroup:allDataCredit,
        countGroupMember:countGroupMember,
        allEcheance:allEcheance,
        isRefreshing: false,
        somme_group_valid:somme_group_valid,
        somme_group_invalid:somme_group_invalid,
        currentEcheance: currentEcheance.echeance
      };
    }

  }
  
  componentDidMount = async() =>{
    prod =  await JSON.parse(this.props.navigation.getParam("product"))
    clients = await JSON.parse(this.props.navigation.getParam("clients"))
    countGroupMember = await JSON.parse(this.props.navigation.getParam("countGroupMember"))
    currentUser = await JSON.parse(this.props.navigation.getParam("currentUser"))
    currentProfile = await JSON.parse(this.props.navigation.getParam("currentProfile"))
    allEcheance =  await JSON.parse(this.props.navigation.getParam("allEcheance"))
    //singleGroup = dataGroups.find((item) => item.id ==  docCredit.id_g );
          
    //singleUser = dataClients.find((item) => item.id ==  docCredit.id_demandeur );
    somme_group_valid = await JSON.parse(this.props.navigation.getParam("somme_group_valid"))
    somme_group_invalid = await JSON.parse(this.props.navigation.getParam("somme_group_invalid"))
              
    clientByGroup = await JSON.parse(this.props.navigation.getParam("clientByGroup"))
    allDataCredit = await JSON.parse(this.props.navigation.getParam("allDataCredit"))
    //ToastAndroid.show(JSON.stringify(allDataCredit), ToastAndroid.LONG)
    currentEcheance = await allEcheance.find((item) => item.id_c == currentProfile.id_c );
    if(!currentEcheance){
      //ToastAndroid.show("VIdeeeee", ToastAndroid.LONG)
      c=[]
      c.push({
        id: "0",
        date_ech: 0,
        somme_intert: 0,
        somme_sans_inter: 0
      });
      this.setState = {
        st : await  "",
        group: await prod,
        isLoading: await  false,
        clients: await clients,
        currentUser: await currentUser,
        currentProfile: await currentProfile,
        clientByGroup: await allDataCredit,
        countGroupMember: await countGroupMember,
        allEcheance: await allEcheance,
        isRefreshing: await  false,
        somme_group_valid:await somme_group_valid,
        somme_group_invalid: await somme_group_invalid,
        currentEcheance: await c
      };
    }
    else {
      //ToastAndroid.show(JSON.stringify(currentEcheance.lenght), ToastAndroid.LONG)
      c = []
      if(currentEcheance.echeance != undefined){
        currentEcheance.echeance.forEach(element => {
          c.push({
            id: element.id,
            date_ech: element.date_ech,
            somme_intert: element.somme_intert,
            somme_sans_inter: element.somme_echeance_sing
          });
        });
      }

      this.setState = {
        st : await  "",
        group: await prod,
        isLoading: await  false,
        clients: await clients,
        currentUser: await currentUser,
        currentProfile: await currentProfile,
        clientByGroup: await allDataCredit,
        countGroupMember: await countGroupMember,
        allEcheance: await allEcheance,
        isRefreshing: await  false,
        somme_group_valid: await somme_group_valid,
        somme_group_invalid:await somme_group_invalid,
        currentEcheance: await currentEcheance.echeance
      };
    }
  }

  _bootstrapAsync = async () => {
 
    prod = await JSON.parse(this.props.navigation.getParam("product"))
    this.setState({
      group: await prod,
      isLoading:  false,
    });

  };

  async _devenir_mbr_group(id_g, group_nom){
    this.setState({isloading: true})
    var pid = this.state.currentUser["pid"];
    var phone = this.state.currentUser["phone"];
   
    const singleClient = this.state.clients.find((item) => item.phone == phone);
    //ToastAndroid.show(JSON.stringify(singleClient), ToastAndroid.LONG)
    if(singleClient["id_g"] == ""){
      await fetch('http://35.223.156.137:3000/devenir_mbr_group', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          pid: pid,
          id_g: id_g
        })
      }).then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
          //Success 
        var prop = 'message'; 
        if (responseJson.hasOwnProperty(prop)) { 
          ToastAndroid.show(responseJson['message'], ToastAndroid.LONG)           
        } else {
          ToastAndroid.show('Bienvenue dans '+group_nom, ToastAndroid.LONG)
          this._fetchClients();
        } 
      }) //If response is not in json then in error
      .catch((error) => {
          console.error(error);
          this.setState({isloading: false})
          ToastAndroid.show('Une erreur est survenue '+ error, ToastAndroid.LONG)
      });
    }
    else{
      ToastAndroid.show("Impossible! Vous appartenez a un autre groupe", ToastAndroid.SHORT)
    }
  }
  
  async _credit(id_g, somme, nbr_jour, cat){
    this.setState({isloading: true})
    var pid = this.state.currentUser["pid"];
    var phone = this.state.currentUser["phone"];
   
    const singleClient = this.state.clients.find((item) => item.phone == phone);
    //ToastAndroid.show(JSON.stringify(singleClient), ToastAndroid.LONG)
    if(singleClient["id_g"] == id_g){
      await fetch('http://35.223.156.137:3000/credit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          id_g:id_g,
          id_demandeur:pid,
          somme:somme,
          cat: cat
        })
      }).then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
          //Success 
        var prop = 'message'; 
        if (responseJson.hasOwnProperty(prop)) { 
          ToastAndroid.show(responseJson['message'], ToastAndroid.LONG)           
        } else {
          ToastAndroid.show("Votre demande est en cours d'etude", ToastAndroid.LONG)
          //this._fetchClients();
        } 
      }) //If response is not in json then in error
      .catch((error) => {
          console.error(error);
          this.setState({isloading: false})
          ToastAndroid.show('Une erreur est survenue '+ error, ToastAndroid.LONG)
      });
    }
    else{
      ToastAndroid.show("Impossible! Vous n'appartenez a aucun groupe", ToastAndroid.SHORT)
    }
  }

  async _quitter_un_group(id_g, group_nom){
    this.setState({isloading: true})
    var pid = this.state.currentUser["pid"];
    var phone = this.state.currentUser["phone"];
   
    const singleClient = this.state.clients.find((item) => item.phone == phone);
    //ToastAndroid.show(JSON.stringify(singleClient), ToastAndroid.LONG)
    if(singleClient["id_g"] != ""){
      await fetch('http://35.223.156.137:3000/quitter_un_group', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          pid: pid
        })
      }).then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
          //Success 
        var prop = 'message'; 
        if (responseJson.hasOwnProperty(prop)) { 
          ToastAndroid.show(responseJson['message'], ToastAndroid.LONG)           
        } else {
          ToastAndroid.show("Bye Bye! Vous n'etes plus membre du "+group_nom, ToastAndroid.LONG)
          this._fetchClients();
          this.props.navigation.navigate('Home');
        } 
      }) //If response is not in json then in error
      .catch((error) => {
          console.error(error);
          this.setState({isloading: false})
          ToastAndroid.show('Une erreur est surnenue '+ error, ToastAndroid.LONG)
      });
    }
    else{
      ToastAndroid.show("Impossible! Vous appartenez a aucun groupe", ToastAndroid.SHORT)
    }
  }

  _adhesion(id_g,group,somme, nbr_jour, cat){
    Alert.alert("Attention!",'Voulez vous vraiment adherer dans le groupe : '+group+"? Vous aurez droit a un credit de "+somme+" $ a remetre progressivement dans "+nbr_jour+" "+cat+".",
      [
       
        {text: 'Annuler', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Valider', onPress: () => 
          {
            NetInfo.isConnected.fetch().then(isConnected => {
              if(isConnected)
              {
                console.log('OK Pressed')
                //this.checkCreditExistFromAPI(id, name)
                //ToastAndroid.show(id, ToastAndroid.SHORT)
                this._devenir_mbr_group(id_g, group);
                // TODO: Find how to refresh al states
                this.props.navigation.navigate('Home');
              }
              else{
                ToastAndroid.show("Aucune connexion internet disponible", ToastAndroid.SHORT)
              }
            });

          }
        },
      ]);
  }

  _quitter(id_g,group,somme, nbr_jour, cat){
    Alert.alert("Attention!",'Voulez vous vraiment quitter le groupe : '+group+"?",
      [
       
        {text: 'Annuler', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Valider', onPress: () => 
          {
            NetInfo.isConnected.fetch().then(isConnected => {
              if(isConnected)
              {
                console.log('OK Pressed')
                //this.checkCreditExistFromAPI(id, name)
                //ToastAndroid.show(id, ToastAndroid.SHORT)
                this._quitter_un_group(id_g, group);
                this._fetchClients()


              }
              else{
                ToastAndroid.show("Aucune connexion internet disponible", ToastAndroid.SHORT)
               
                
              }
            });

          }
        },
      ]);
  }
  _demandeCredit(id_g,somme, nbr_jour, cat, cat_chiffre){
    Alert.alert("Attention!",'Voulez vous vraiment demander un credit de : '+somme+" $ a remetre progressivement dans "+nbr_jour+" "+cat+"?",
      [
       
        {text: 'Annuler', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Valider', onPress: () => 
          {
            NetInfo.isConnected.fetch().then(isConnected => {
              if(isConnected)
              {
                console.log('OK Pressed')
                this._credit(id_g,somme, nbr_jour, cat_chiffre);
                this._fetchClients()
              }
              else{
                ToastAndroid.show("Aucune connexion internet disponible", ToastAndroid.SHORT)
               
                
              }
            });

          }
        },
      ]);
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

  render() {
    const { navigation } = this.props;
    const {
      st,
      group,
      countGroupMember,
      currentEcheance,
      somme_group_valid,
      somme_group_invalid
    } = this.state;
  
    if(this.state.isLoading){
      return( 
        <Block style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" /> 
        </Block>
      )
    }
    

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

          <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          
          duration={300}
          animationType="slide"
          closeOnDragDown={true}
          //minClosingHeight={10}
          customStyles={{
            wrapper: {
              flex: 1,
              backgroundColor: "#00000077"
            },
            mask: {
              flex: 1,
              backgroundColor: "transparent"
            },
            container: {
              backgroundColor: "#fff",
              width: "100%",
              height: "60%",
              overflow: "hidden"
            }
          }}
        >
          <ScrollView style={{zIndex:10, marginLeft:10, marginRight:10}}>
            <Text style={{alignSelf:"center", paddingTop: 10, margin:10}}>MES ECHEANCES</Text>
            <Block flex>              
            {
              
            this.state.currentEcheance ? this.state.currentEcheance.map((item, index) => {
                return <Block key={index} flex row>
                <ListEcheance item={item} echeance={item} horizontal/>
              </Block>
              }):
              
              <Text style={{alignSelf:"center", paddingTop: 10, margin:10}}>AUCUNE ECHEANCE</Text>
            }
               
            </Block>
            
          </ScrollView>
        </RBSheet>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Block style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }} >
              <Block flex={0.6} >
                <ImageBackground
                  source={Images.acheteur}
                  style={styles.profileContainer}
                  imageStyle={styles.profileBackground}
                >
                  <Block flex style={styles.profileCard}>
                    <Block style={{ position: 'absolute', width: width, zIndex: 5, paddingHorizontal: 20 }}>
                      <Block middle style={{ top: 10}}>
                        <Image source={Images.bomokoLogo} style={styles.avatar} />
                      </Block>
                      <Block style={{ top: 15 }}>
                        <Block middle >
                          <Text
                            style={{
                              fontFamily: 'montserrat-bold',
                              marginBottom: theme.SIZES.BASE / 2,
                              fontWeight: '900',
                              fontSize: 26
                            }}
                            color='#ffffff'
                            >
                            {group.nom_group}
                          </Text>

                          <Text
                            size={16}
                            color="white"
                            style={{
                              marginTop: 5,
                              fontFamily: 'montserrat-bold',
                              lineHeight: 20,
                              fontWeight: 'bold',
                              fontSize: 18,
                              opacity: .8
                            }}
                          >
                            Credit individuel: {group.somme} $
                          </Text>
                        </Block>
                        <Block style={styles.info}>
                          <Block row space="around">

                            <Block middle>
                              <Text
                                size={18}
                                color="white"
                                style={{ marginBottom: 4, fontFamily: 'montserrat-bold' }}
                              >
                                {countGroupMember}
                              </Text>
                              <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="white">
                                Membres
                              </Text>
                            </Block>

                            <Block middle>
                              <Text
                                color="white"
                                size={18}
                                style={{ marginBottom: 4, fontFamily: 'montserrat-bold' }}
                              >
                                {somme_group_valid} $
                              </Text>
                              <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="white">
                                Valides
                                </Text>
                            </Block>

                            <Block middle>
                              <Text
                                color="white"
                                size={18}
                                style={{ marginBottom: 4, fontFamily: 'montserrat-bold' }}
                              >
                                {somme_group_invalid} $
                              </Text>
                              <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="white">
                                En attente
                              </Text>
                            </Block>

                          </Block>
                        </Block>
                      </Block>

                    </Block>


                    <Block
                      middle
                      row
                      style={{ position: 'absolute', width: width, top: height * 0.3 - 22, zIndex: 99}}
                    >
                      {
                        this.state.currentProfile["id_g"] == ""?
                        <Button
                          onPress={_ => this._adhesion(group.id, group.nom_group, group.somme, group.nbr_jour, group.cat == 30? "mois": "semaines")}         

                          style={{ width: 114, height: 44, marginHorizontal: 5, elevation: 5}} 
                          textStyle={{ fontSize: 16 }} round>
                            Adherer
                          </Button>
                        :
                        this.state.currentProfile["id_g"] == group.id?
                      <Button
                        onPress={_ => this._quitter(group.id, group.nom_group, group.somme, group.nbr_jour, group.cat == 30? "mois": "semaines")}         
                        
                        style={{ width: 114, height: 44, marginHorizontal: 5, elevation: 5,backgroundColor: nowTheme.COLORS.ERROR,}} 
                        textStyle={{ fontSize: 16 }} round>
                          Quitter
                        </Button>
                        :
                        <Button
                        onPress={_ => this._quitter(group.id, group.nom_group, group.somme, group.nbr_jour, group.cat == 30? "mois": "semaines")}         
                        
                        style={{ display:"none", width: 114, height: 44, marginHorizontal: 5, elevation: 5,backgroundColor: nowTheme.COLORS.ERROR,}} 
                        textStyle={{ fontSize: 16 }} round>
                          Quitter
                        </Button>
                      }
                      
                      {
                         this.state.currentProfile["id_g"] == group.id && this.state.currentProfile["id_c"] == ""?
                         <Button 
                          color="default"
                          style={{ width: 150, height: 44, marginHorizontal: 5, elevation: 5 }} 
                          textStyle={{ fontSize: 16 }} round
                          onPress={_ => this._demandeCredit(group.id, group.somme, group.nbr_jour, group.cat == 30? "mois": "semaines", group.cat)}         
                          
                          >
                            Demander credit
                          </Button>
                         : 
                         
                          this.state.currentProfile["id_g"] == group.id && this.state.currentProfile["id_c"] != ""?
                        <Button 
                          color="default"
                          style={{ width: 150, height: 44, marginHorizontal: 5, elevation: 5}} 
                          textStyle={{ fontSize: 16 }} round
                          onPress={_ =>  {
                          //ToastAndroid.show(JSON.stringify(this.state.currentEcheance), ToastAndroid.LONG)

                              if(this.state.currentEcheance != undefined)
                              {
                                this.RBSheet.open()
                              }

                            }
                          }      
                          >
                            Echeances
                         </Button>
                         :
                         
                         <Button 
                          color="default"
                          style={{ width: 150, height: 44, marginHorizontal: 5, elevation: 5, display:"none" }} 
                          textStyle={{ fontSize: 16 }} round>
                            Demander credit
                         </Button>

                      }
                     

                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="info"
                        iconFamily="Font-Awesome"
                        iconColor={nowTheme.COLORS.WHITE}
                        iconSize={nowTheme.SIZES.BASE * 1.375}
                        color={nowTheme.COLORS.INFO}
                        style={[styles.social, styles.shadow]}
                        onPress={() => {
                          //this.RBSheet.open();
                          }}
                      />
                    </Block>
                  </Block>
                </ImageBackground>


              </Block>
              <Block />
              <Block flex={0.4} style={{zIndex:1, padding: theme.SIZES.BASE, marginTop: 10}}>
                <Block>
                  <Block flex style={{ marginTop: 20 }}>
                    <Block middle>
                      <Text
                       style={group.etat ==1 ? styles.etatE: styles.etatS}
                        
                      >
                        {group.etat == 0? "EN ATTENTE" : "VALIDE"}

                          </Text>
                      <Text
                        size={16}
                        muted
                        style={{
                          textAlign: 'center',
                          fontFamily: 'montserrat-regular',
                          zIndex: 2,
                          lineHeight: 25,
                          color: '#9A9A9A',
                          paddingHorizontal: 15
                        }}
                      >
                        {group.details}
                          </Text>
                    </Block>
                    
                    <Block style={styles.container} row>
                     
                      <View style={styles.cellContainer}>
                        <Text style={styles.titleText}>Date debut</Text>
                        <Text style={styles.amountText}> {new Date(parseFloat(group.date_debut)).toDateString()}</Text>
                      </View>
                      <View style={styles.cellContainer}>
                        <Text style={styles.titleText}>Date fin</Text>
                        <Text>{new Date(parseFloat(group.date_fin)).toDateString()}</Text>
                      </View>
                     
                      
                    </Block>
                      {/* TODO: Enderstand why this date is in the egative form */}
                    <Block row style={{ paddingVertical: 8, paddingHorizontal: 15 }} space="between">
                      <Text bold size={16} color="#2c2c2c" style={{ marginTop: 3 }}>
                        Les adhesions se cloturent dans :
                      </Text>
                      <Text bold muted size={16}  style={{ marginTop: 1 }}>
                      {parseInt((parseFloat(group.date_debut)-(new Date()).getTime())/(24*60*60*1000))} jours

                       
                      </Text>
                      
                    </Block>

                    <Block flex>
                    
                    {this.state.clientByGroup.map((item, index) => {
                      //TODO RETURN ECHEANCE BY CLIENT
                      echeaceFind = {}
                      echeaceFind = this.state.allEcheance.find((ech) => ech.id_c ==  item.id_c);

                      return <Block key={index} flex row>
                      <ListCLient item={item} echeance={echeaceFind} horizontal/>
                    </Block>
                    })}   

                    </Block>
                  </Block>
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
    marginHorizontal: 10
  },
  
  profileContainer: {
    justifyContent: 'center',// unitile
    alignSelf: 'center',
    width,
    height: height * 0.3,
    padding: 0,
    zIndex: 120
  },
  profileBackground: {
    width,
    height: height * 0.3
  },

  info: {
    marginTop: 10,
    paddingHorizontal: 10,
    height: height * 0.8
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -30
  },
  avatar: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 50,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: 35
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  social: {
    width: nowTheme.SIZES.BASE * 3,
    height: nowTheme.SIZES.BASE * 3,
    borderRadius: nowTheme.SIZES.BASE * 1.5,
    justifyContent: 'center',
    zIndex: 99,
    marginHorizontal: 5,
    elevation: 5
  },


  profileCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  etatS:{
    color: '#a11',
    fontWeight: 'bold',
    fontSize: 19,
    fontFamily: 'montserrat-bold',
    marginTop: 15,
    marginBottom: 30,
    zIndex: 2
  },
  etatE:{
    color: '#080',
    fontWeight: 'bold',
    fontSize: 19,
    fontFamily: 'montserrat-bold',
    marginTop: 15,
    marginBottom: 30,
    zIndex: 2
  },


  container: {
    fontFamily: 'montserrat-bold',
    paddingVertical: 8,
    marginTop:7,
    marginBottom:7,
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: nowTheme.COLORS.TABS,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  cellContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 15,
    color: 'gray',
  },
  amountText: {
    fontSize: 15,
  },
});

export default DetailGroup;
