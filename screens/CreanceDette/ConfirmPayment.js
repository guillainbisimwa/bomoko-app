import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Image, View } from 'react-native';
import Block from '../Product/Block';
import { Text } from '../../components';
import { COLORS, icons } from '../../constants';
import { Button, Divider, IconButton } from 'react-native-paper';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from '@expo/vector-icons/Ionicons';


const ConfirmPayment = (props, { route }) => {
  const navigation = useNavigation();
  const [password, setPassword] = useState();
  
  // console.log(route?.params);
  // console.log(route);
  useEffect(()=>{
    console.log(props?.route?.params?.avec.membres.map((v,k)=> v.user.name));
    
  },[])

  const renderConfirm = () => {
    return <Block p={20} m={20} card >
      <Block center>
        <Text h2 center bold >{props?.route?.params?.titre}</Text>
        <Text center >Entez votre mots de passe pour confirmer que c'est bien vous</Text>
      </Block>

      <Block row space='between' m_t={30} m_b={30}>
        <Block center flex={1}>
          { props?.route?.params?.connectedUser?.profile_pic  ? (
              <Image
                source={{ uri: props?.route?.params?.connectedUser?.profile_pic  }}
                style={{ width: 80, height: 80, borderRadius:20, borderWidth:1,
                borderColor: COLORS.white}}
              />
            ) : (
              <Image
                source={icons.investment}
                style={{
                  width: 80,
                  height: 80,
                  tintColor: COLORS.black,
                }}
              />
            )}
          <Text gray center >{props?.route?.params?.connectedUser?.name} </Text>
        </Block>

        <Block center flex={1}>
            <IconButton
              icon="arrow-right-circle"
              iconColor={COLORS.darkgreen}
              size={40}
            />
          <Text bold>{props?.route?.params?.somme} {props?.route?.params?.avec?.currency}</Text>
        </Block>

        <Block center flex={1}>
          <View style={{ 
              borderWidth:1,
                borderColor:COLORS.black,
                borderRadius: 60,
                padding: 10}}>
              <Image
              source={icons.investment}
              style={{
                width: 60,
                height: 60,
                tintColor: COLORS.black,
               
              }}
            />
          </View>
          <Text gray center > {props?.route?.params?.avec?.name} </Text>
              
        </Block>

      </Block>
      <Text center gray style={styles.motif}>{props?.route?.params?.motif}</Text>
      
      <Divider />

      <Block m_t={20} p_t={10}>
        {
          props?.route?.params?.type == 'emprunt'? <Block>
          <TextInput
              style={styles.input} 
              value={password}
              onChangeText={setPassword}
              keyboardType="default"
              placeholder="Ajouter une note de demande"
              multiline
              numberOfLines={3}

            />

            <SelectDropdown
              data={props?.route?.params?.avec.membres.map((v,k)=> v.user.name)}
              onSelect={(selectedItem, index) => {
                // setCycleNumber(selectedItem.split(' ')[0])
                console.log(selectedItem, index);
                console.log();
                //console.log(cycleNumber);

              }}
              defaultButtonText={'Choisir un temoin'}
              buttonTextAfterSelection={(selectedItem, index) => {
                //console.log("selectedItem", selectedItem);

                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              renderDropdownIcon={isOpened => {
                return  <Ionicons  name={isOpened ? 'chevron-up' : 'chevron-down'} size={20} color={COLORS.gray} />
              }}
              dropdownIconPosition={'right'}
              // buttonTextStyle={styles.dropdown1BtnTxtStyle}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </Block>: <></>
        }
          
          <Text center gray style={styles.label}>Entrez votre Mots de passe</Text>

         
          <TextInput
            style={styles.input} 
            value={password}
            onChangeText={setPassword}
            keyboardType="numeric"
            placeholder="Mots de passe"
            secureTextEntry={true}
          />
          <Button mode='contained' buttonColor='green' onPress={()=> navigation.goBack()}>{props?.route?.params?.button}</Button>
      </Block>
      
    </Block>
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false} >
      {
        renderConfirm()
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginTop: 15,
    textAlign: 'left'
    //marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    marginTop: 10
  },
  motif:{
    color: COLORS.peach,
    marginBottom: 20
  },
  dropdown1BtnStyle: {
    height: 50,
    width:'100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF', },
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
});

export default ConfirmPayment;
