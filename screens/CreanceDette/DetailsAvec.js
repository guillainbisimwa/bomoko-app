import React, { useEffect, useState } from 'react';
import {ImageBackground, View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Block from '../Product/Block';
import { COLORS, FONTS, SIZES } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../../components';
import { Divider, Button } from 'react-native-paper';

const DetailsAvec = ({ route }) => {

  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };
  
  useEffect(()=>{
    console.log(route.params.avec.owner);
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
            <Text  numberOfLines={1} style={styles.contentTitle}>{route.params.avec.timestamp}</Text>
          </View>

          {/* Second Column */}
          <View style={styles.columnTitle2}>
            <Button compact mode="contained">
              + 99000 CDF
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


        <View>
          <View>
            <Text h3>Description</Text>
          </View>
          <View>
            <Text numberOfLines={showFullContent ? undefined : 3}>{route.params.avec.detail}</Text>
            <TouchableOpacity onPress={toggleContent}>
              <Text bold color={COLORS.blue} >{showFullContent ? 'Voir moins' : 'Voir plus'}</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.containerTitle}>
          {/* First Column */}
          <View style={styles.columnMembre1}>
            <Image
              source={{uri: route.params.avec.owner?.profile_pic}}
              style={styles.imgOwner}
            />
            <Text numberOfLines={2} bold >{route.params.avec.owner?.name}</Text>
            <Text numberOfLines={1} style={styles.contentTitle}>Président</Text>
          </View>

          {/* Second Column */}
          <View style={styles.columnMembre2}>
          <Text numberOfLines={1} bold >MEMBRE DU GROUPE</Text>

          <View style={styles.imgs}>
                {route.params.avec?.membres.slice(0,4).map((value, key) =>{
                  console.log();
                 // console.log(value.user);
                  return(
                  <Image
                    key={key}
                    source={{uri: value?.user?.profile_pic}}
                    style={[
                      styles.img,
                      key > 0 && { marginLeft: -15 }, // Apply negative margin for images after the first one
                    ]}
                  />
                )})}
                {route.params.avec?.membres.length >= 4 && (
                  <Text style={styles.moreImagesText}>+ 
                  {route.params.avec?.membres.length - 4} plus</Text>
                )}
              </View>
          </View>
        </View>

        <Button buttonColor={COLORS.darkgreen} mode="contained">
              Demande d'Adhesion
            </Button>

      </Block>
    );
  };

  

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <Block flex={1}>
      {/* Fixed content */}
      <View>
        {renderImage()}
      </View>

      {/* Scrollable content */}
      <View style={{ alignItems: "center" }}>
        {renderTopDetails()}
      </View>
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
    justifyContent:'space-around',
    marginBottom:20
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
    fontSize: 13,
    color:'grey'
  },


  containerTitle: {
    flexDirection: 'row',
    marginBottom:10
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
  },
  contentTitle: {
    fontSize: 13,
    color: COLORS.peach
  },


  imgs: {
    flexDirection: 'row',
    marginVertical:10,
    // alignContent:'center',
    //alignItems: 'flex-end'
    // alignSelf:'flex-end'
  },
  img: {
    borderRadius: SIZES.base * 3,
    backgroundColor:COLORS.white,
    borderWidth:2,
    borderColor: COLORS.black,
    width: SIZES.base * 5,
    height: SIZES.base * 5,
    //tintColor: COLORS.black,
  },
  columnMembre1: {
    flex: 1, // Takes 50% width
    marginRight: 8, // Adjust the margin as needed
    paddingVertical:8,
    alignItems:'center'
  },
  columnMembre2: {
    flex: 2, // Takes 50% width
    marginLeft: 12, // Adjust the margin as needed
    paddingVertical:8,
    justifyContent:'center',
  },
  moreImagesText: {
    flex:1,
    alignSelf:'center', 
    marginLeft:10
  },
  imgOwner:{
    width: 100,
    height: 100,
    borderRadius:50,
  }


});

export default DetailsAvec;
