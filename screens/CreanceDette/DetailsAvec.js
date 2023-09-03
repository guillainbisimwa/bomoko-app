import React, { useEffect } from 'react';
import {ImageBackground, View, TextInput, StyleSheet, ScrollView } from 'react-native';
import Block from '../Product/Block';
import { COLORS, FONTS, SIZES } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../../components';
import { Divider, Button } from 'react-native-paper';

const DetailsAvec = ({ route }) => {
  
  useEffect(()=>{
    console.log(route.params.avec);
  },[])

  const renderImage = () => {
    return (
      <ImageBackground
        source={require('./../../assets/img/debt.png')}
        resizeMode="cover"
        style={{ width: SIZES.width, height: 120, justifyContent: 'flex-end' }}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 120,
          }}
        ></LinearGradient>
      </ImageBackground>
    );
  };

  const renderTopDetails = () => {
    return (
      <Block card style={styles.topdetails} >
        
        <View style={styles.containerTitle}>
          {/* First Column */}
          <View style={styles.columnTitle1}>
            <Text  numberOfLines={2} style={styles.titleTitle}>{route.params.avec.name}</Text>
            <Text style={styles.contentTitle}>{route.params.avec.name}</Text>
          </View>

          {/* Second Column */}
          <View style={styles.columnTitle2}>
            <Button mode="contained" >
              Demande
            </Button>
          </View>
    </View>

        <Divider />
        <Divider />

        <View style={styles.containerTop}>

          {/* Column 1 */}
          <View style={styles.column}>
            <Text style={styles.title}>DEVISE</Text>
            <Text style={styles.content}>{route.params.avec.currency}</Text>

          </View>

          {/* Column 2 */}
          <View style={styles.column}>
            <Text style={styles.title}>SOMME</Text>
            <Text style={styles.content}>{route.params.avec.amount}</Text>
          </View>

          {/* Column 3 */}
          <View style={styles.column}>
            <Text style={styles.title}>CYCLE</Text>
            <Text style={styles.content}>{route.params.avec.cycle.name}/{route.params.avec.cycle.number}</Text>
          </View>
        </View>

      </Block>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Block flex={1}>
        <Block >
          {renderImage()}

          <View style={{ alignItems: "center" }}>
        {renderTopDetails()}

       
          </View>
          


        </Block>
        
          </Block>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //padding: 20,
    margin:20
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  topdetails:{
    width: '90%',
    marginTop:-20,
    padding:15,
  },
  containerTop: {
    flexDirection: 'row', // Horizontal layout
    justifyContent:'space-around'
  },
  column: {
    flex: 1, // Equal width for each column
    paddingVertical: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    color:'grey'
  },

  containerTitle: {
    flexDirection: 'row',
    //alignItems: 'center'
  },
  columnTitle1: {
    flex: 2, // Takes 50% width
    marginRight: 8, // Adjust the margin as needed
    paddingVertical:8,
  },
  columnTitle2: {
    flex: 1, // Takes 50% width
    marginLeft: 4, // Adjust the margin as needed
    paddingVertical:8,
  },
  titleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contentTitle: {
    fontSize: 12,
  },
});

export default DetailsAvec;
