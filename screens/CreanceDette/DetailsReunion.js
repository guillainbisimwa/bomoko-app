import React, { useState } from 'react';
import {ImageBackground, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Block from '../Product/Block';
import { COLORS, FONTS, SIZES, icons } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../../components';
import {  Provider, Menu, Button, IconButton, Chip, Divider } from 'react-native-paper';
import {  BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { format } from 'date-fns';
import { fr as myFr } from 'date-fns/locale';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLegend, VictoryStack, VictoryTheme } from 'victory-native';
import { Svg } from 'react-native-svg';

const DetailsReunion = ({ route, navigation }) => {

  const myDataset = [
    [
      { x: "O Mois", y: 0 },
      { x: "3 Mois", y: 100 },
      { x: "6 Mois", y: 150 },
      { x: "9 Mois", y: 250 },
      { x: "12 Mois", y: 400 }
    ],
    [
        { x: "O Mois", y: 0 },
        { x: "3 Mois", y: 50 },
        { x: "6 Mois", y: 60 },
        { x: "9 Mois", y: 100 },
        { x: "12 Mois", y: 120 }
    ],
    [
      { x: "O Mois", y: 0 },
      { x: "3 Mois", y: 40 },
      { x: "6 Mois", y: 60 },
      { x: "9 Mois", y: 75 },
      { x: "12 Mois", y: 80 }
    ],
  
  ];
  
  // Fonction pour convertir la date en format français
  const formatDateToFrench = (date) => {
    console.log('date', date);
    return format(new Date(date), 'dd MMMM yyyy', { locale: myFr });
  };

  const renderImage = () => {
    return (
      <ImageBackground
        source={require('./../../assets/img/meeting.png')}
        resizeMode="cover"
        style={{ width: SIZES.width, height: 120, justifyContent: 'flex-end' }}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.9)']}
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
        
        <Block row center space='between'>
          <Block>
          <Text h2  bold >REUNION</Text>
          <Text color={COLORS.peach} >Du {formatDateToFrench(route.params.reunion.dateStart)}</Text>
          </Block>
          <Button mode='contained'>Menu</Button>
        </Block>
      </Block>
    );
  };

  const renderGraph = () => {
    return (
      <Block m={20} card>
        <Block p={20}>
        <Text bold numberOfLines={1}>
          Accumulation de l’épargne  ({route.params.avec.currency})
          </Text>
          <Text>les épargnes accumulées et les bénéfices tirés des prêts sont répartis entre les membres proportionnellement au montant qu’ils
ont épargné.</Text>
        </Block>

        <Svg style={{ width: '100%' }}>

        <VictoryChart height={400} //width={400}
         //domainPadding={50} 
         //theme={VictoryTheme.material} 
          //domain={{ x: [0,5], y: [0, 100000] }}
          domainPadding={{ x: 30, y: 20 }}
        >
           <VictoryLegend x={50} y={0}
              gutter={50}
              style={{title: {fontSize: 20 } }}
              data={[
                { name: "Remboursement capital", symbol: { fill: "green" } },
                { name: "Intêret", symbol: { fill: COLORS.blue } },
                { name: "Epargne Collectée", symbol: { fill: "orange" } }
              ]}
            />
            <VictoryStack
              colorScale={["green", COLORS.blue, "orange"]}
            >
              {myDataset.map((data, i) => {
                return <VictoryBar barWidth={20} labels={({ datum }) => `${datum.y}`}
             data={data} key={i} //labelComponent={<VictoryLabel y={10} verticalAnchor={"start"}/>}
             />;
              })}
            </VictoryStack>
            <VictoryAxis dependentAxis />
            <VictoryAxis 
            padding={{ left: 80, right: 60 }}
            axisLabelComponent={<VictoryLabel angle={20}/>}
            tickFormat={[`O Mois`, 
            `3 Mois`,
            `6 Mois`,
            `9 Mois`,
            `12 Mois`]}/>
        </VictoryChart>
        </Svg>
          
          </Block>
    
  )}



  return (
    <Provider>
      <BottomSheetModalProvider>

      <ScrollView>
    <Block>
      {/* Fixed content */}
      <Block style={styles.topdetailsText} >
            <Text bold h1 white> 100 USD</Text>
            <Text white>Total de l’épargne</Text>
        </Block>
      <View>
        {renderImage()}
      </View>

      {/* Scrollable content */}
      <View style={{ alignItems: "center" }}>
        {renderTopDetails()}
      </View>
{/* 
      <Block row space="between" center>
        <TouchableOpacity style={{ width: '40%', marginHorizontal:20, marginVertical: 10}} onPress={()=> console.log('ok')}>
          <Block card  style={{ alignItems: 'center',  padding:10}}>
        <IconButton
          icon="arrow-up"
          iconColor={COLORS.darkgreen}
          size={30}
        />
          <Text bold>Achat des parts</Text>
          <Text>Une part a 5 USD</Text>
          </Block>
        </TouchableOpacity>

        <TouchableOpacity style={{ width: '40%', marginHorizontal:20, marginVertical: 10 }} onPress={()=> console.log('ok')}>
          <Block card style={{ alignItems: 'center',  padding:10}}>
          <IconButton
            icon="arrow-down"
            iconColor={COLORS.peach}
            size={30}
          />
          <Text bold>Achat des parts</Text>
          <Text>Une part a 5 USD</Text>
          </Block>
        </TouchableOpacity>
      </Block> */}

      <Block row space="between" m_l={20} m_r={20} m_t={10}>
      <TouchableOpacity style={{ }} onPress={()=> console.log('ok')}>
          <Block card style={{ alignItems: 'center'}} p={10}>
        
              <Text bold>0</Text>
              <Text>Mes parts</Text>
          
         
          </Block>
        </TouchableOpacity>

        <TouchableOpacity style={{ }} onPress={()=> console.log('ok')}>
          <Block card style={{ alignItems: 'center'}} p={10}>
        
                    <Text bold>0</Text>
                    <Text>Mes emprunts</Text>
          
         
          </Block>
        </TouchableOpacity>


        <TouchableOpacity style={{ }} onPress={()=> console.log('ok')}>
          <Block card style={{ alignItems: 'center'}} p={10}>
        
                    <Text bold>0</Text>
                    <Text>Mon intérêt</Text>
          
         
          </Block>
        </TouchableOpacity>


      </Block>

      <Block card m_l={20} m_r={20} p={10} m_t={10} m_b={20}>
        <Block>
          <Text h2 bold>Details de la Reunion</Text>
          <Text>2 Membres</Text>
        </Block>
        <Block m_t={5} m_b={15} row center space='between'>
          <Chip icon="information" elevated >Reunion 1</Chip>
          <Text>30 min</Text>
        </Block>
        <Divider />
        <Block m_t={15} row>
          <IconButton
            icon="circle"
            iconColor={COLORS.darkgreen}
            size={20}
          />
          <Block middle>
            <Text bold>CYCLE - {route.params.avec.cycle.number} Mois </Text>
          </Block>
        </Block>

        <Block row space='between' center m_l={45} m_t={-15} >
          <Text color={COLORS.gray}>Debut</Text>
          <Text bold>  {formatDateToFrench(route.params.avec.startDate)} </Text>
        </Block>

        <Block row space='between' center m_l={45} >
          <Text color={COLORS.gray}>Fin</Text>
          <Text bold>  {formatDateToFrench(route.params.avec.endDate)} </Text>
        </Block>

        <Block  row>
          <IconButton
            icon="circle"
            iconColor={COLORS.purple}
            size={20}
          />
          <Block middle>
            <Text bold>Credit </Text>
          </Block>
        </Block>

        <Block row space='between' center m_l={45} m_t={-15}>
          <Text color={COLORS.gray}>Debut Octroi</Text>
          <Text bold>  {formatDateToFrench(route.params.avec.debut_octroi_credit)} </Text>
        </Block>

        <Block row space='between' center m_l={45} >
          <Text color={COLORS.gray}>Fin Octroi</Text>
          <Text bold>  {formatDateToFrench(route.params.avec.fin_octroi_credit)} </Text>
        </Block>

        <Block row>
          <IconButton
            icon="circle"
            iconColor={COLORS.blue}
            size={20}
          />
          <Block middle>
            <Text bold>Parts</Text>
          </Block>
        </Block>

        <Block row space='between' center m_l={45} m_t={-15}>
          <Text color={COLORS.gray}> Parts Totales du groupe</Text>
          <Text bold>20 (200 USD)</Text>
        </Block>

        <Block row space='between' center m_l={45} >
          <Text color={COLORS.gray}> Parts achetees aujourdh'hui</Text>
          <Text bold>0 (0 USD)</Text>
        </Block>

        <Block row>
          <IconButton
            icon="circle"
            iconColor={COLORS.peach}
            size={20}
          />
          <Block middle>
            <Text bold>Emprunts</Text>
          </Block>
        </Block>
        
        <Block row space='between' center m_l={45} m_t={-15}>
          <Text color={COLORS.gray}> Emprunts Totales du groupe</Text>
          <Text bold>20 (200 USD)</Text>
        </Block>

        <Block row space='between' center m_l={45} >
          <Text numberOfLines={1} color={COLORS.gray}> Remboursement attendu</Text>
          <Text bold>0 (0 USD)</Text>
        </Block>

        <Block row space='between' center m_l={45} >
          <Text numberOfLines={1} color={COLORS.gray}> Remboursement en retard</Text>
          <Text bold>0 (0 USD)</Text>
        </Block>

       
        <Block row>
          <IconButton
            icon="circle"
            iconColor={COLORS.gray}
            size={20}
          />
          <Block middle>
            <Text bold> Caisse de solidarités</Text>
          </Block>
        </Block>
        
        <Block row space='between' center m_l={45} m_t={-15}>
          <Text color={COLORS.gray}> Contributions Totales</Text>
          <Text bold>20 (200 USD)</Text>
        </Block>

        <Block row space='between' center m_l={45} >
          <Text numberOfLines={1} color={COLORS.gray}> Contributions attendues</Text>
          <Text bold>0 (0 USD)</Text>
        </Block>

        <Block row space='between' center m_l={45} >
          <Text numberOfLines={1} color={COLORS.gray}> Contributions en retard</Text>
          <Text bold>0 (0 USD)</Text>
        </Block>

      
      </Block>

      <Block>
        {renderGraph()}
      </Block>
    </Block>

      
          </ScrollView>
          </BottomSheetModalProvider>
        
        </Provider>
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
    elevation:2,
  },
  topdetailsText:{
  zIndex:99,
    position:'absolute',
    top:40,
    left: '35%',
    
  },
  containerTop: {
    flexDirection: 'row', // Horizontal layout
    justifyContent:"space-evenly",
    marginBottom:20
  },
  column: {
    flex: 1, // Equal width for each column
    paddingVertical: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 12
  },
  content: {
    fontSize: 13,
    color:'grey'
  },
  titleMenu:{
    color: COLORS.gray,
    paddingBottom:10
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
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },


});

export default DetailsReunion;
