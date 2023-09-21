import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Image, View } from 'react-native';
import Block from '../Product/Block';
import { Text } from '../../components';
import { COLORS, icons } from '../../constants';
import { Button, Divider, IconButton } from 'react-native-paper';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ConfirmPayment = (props, { route }) => {
  const navigation = useNavigation();
  const [password, setPassword] = useState();
  
  // console.log(route?.params);
  // console.log(route);
  useEffect(()=>{
    console.log(props?.route?.params?.somme);
    
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
          <Text bold>{props?.route?.params?.somme} {props?.route?.params?.currency}</Text>
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
          <Text gray center > {props?.route?.params?.name} </Text>
              
        </Block>

      </Block>
      <Text center gray style={styles.motif}>{props?.route?.params?.motif}</Text>
      
      <Divider />

      <Block m_t={20} p_t={10}>
       
        <TextInput
            style={styles.input} 
            value={password}
            onChangeText={setPassword}
            keyboardType="default"
            placeholder="Ajouter une note de demande"
            multiline
            numberOfLines={3}

          />
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
    marginBottom: 5,
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
  }
});

export default ConfirmPayment;
