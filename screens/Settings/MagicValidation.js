import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Block from '../Product/Block';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvecs, updateAvec } from '../../redux/avecReducer';
import { editProduct, fetchProducts } from '../../redux/prodReducer';

import { FlatList } from 'react-native-gesture-handler';
import { Text } from '../../components';
import { Button } from 'react-native-paper';
import { COLORS } from '../../constants';
import moment from 'moment';


const MagicValidation = () => {
  const dispatch = useDispatch();
  
  const {avecs, error, status} = useSelector((state) => state.avecs); 
  const { isLoading, success, products } = useSelector((state) => state.products);



   // Use the useFocusEffect hook to execute reloadScreen when the screen gains focus
   useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        dispatch(fetchProducts());
        dispatch(fetchAvecs());
      };

      // Fetch data when the screen gains focus
      fetchData();

      // Return a cleanup function
      return () => {
        // You can perform cleanup here if needed
        console.log('Cleanup function');
      };
    }, []) // Empty dependency array to run this effect only once when the screen mounts
  );

  useEffect(()=>{
    //console.log("error",error)
  }, [error,status])


  const [index, setIndex] = useState(0);
  const routes = [
    { key: 'second', title: 'PRODUITS' },
    { key: 'first', title: 'AVEC' },
  ];

  const generateDateIntervals = (startDate, count, interval) =>{
    const dateIntervals = [];
  
    // Parse the input date using Moment.js
    const currentDate = moment(startDate);
  
    for (let i = 0; i < count; i++) {
      // Clone the current date and add the specified interval
      const nextDate = moment(currentDate).add(interval, 'weeks');
      
      // Push the new date to the result array
      dateIntervals.push(nextDate.format('YYYY-MM-DD'));
  
      // Set the current date to the next date for the next iteration
      currentDate.set('year', nextDate.get('year'));
      currentDate.set('month', nextDate.get('month'));
      currentDate.set('date', nextDate.get('date'));
    }
  
    return dateIntervals;
  }
  
  
  const handlerValidateProduct = async (item) => {

    // Pushing the additional object to the output array
    const today = new Date();
    // const formattedDate = new Date(item.timestamp).toLocaleDateString('en-GB').replace(/\//g, '-');

    const outputTimeLineSoum = {
      time:`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear().toString().substr(-2)}`,
      title: 'Validation',
      details: `Votre produit ${item.name} a été validé à l'équipe African Fintech!`
    };

    console.log();
    
    dispatch(editProduct({
      ...item,
      id: item._id,
      status: "ACCEPTED",
      timeline: [
        outputTimeLineSoum,
        ...item.timeline,
      ],
    }))
  };


  const handlerValidate = async (item) => {

    // Pushing the additional object to the output array
    const today = new Date();
    // const formattedDate = new Date(item.timestamp).toLocaleDateString('en-GB').replace(/\//g, '-');

    const outputTimeLineSoum = {
      time:`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear().toString().substr(-2)}`,
      title: 'Validation',
      details: `Votre groupe ${item.name} a été validé à l'équipe African Fintech!`
    };

    console.log();
    var number = 0;
    const reunions = generateDateIntervals(today, item.cycle.number * 4 , 1).map((value, key) => {
      number++;
      const exampleReunion = {
        status: "UPCOMING",
        num: number,
        dateStart: new Date(value).toString(),
        dateEnd: new Date(value).toString(),
        //attendees: [],
        // chat: [
        //   {
        //     message: `Bienvenue a la Reunion du ${value}`,
        //     member: item.owner._id, 
        //     timestamp: new Date().toString(),
        //   }
        // ],
        timestamp: new Date().toString(),
      };

      return exampleReunion;
    });
    
    dispatch(updateAvec({
      ...item,
      id: item._id,
      status: "ACCEPTED",
      timeline: [
        outputTimeLineSoum,
        ...item.timeline,
      ],
      reunion: reunions
    }))
  };


  const FirstRoute = () => (
    <Block>
      <FlatList
        data={avecs}
        renderItem={renderItem}
        keyExtractor={(item) => item._id} // Use a unique key for each item
      />
    </Block>
  );

  const SecondRoute = () => (
    <Block>
      <FlatList
        data={products}
        renderItem={renderPropduct}
        keyExtractor={(item) => item._id} // Use a unique key for each item
      />
    </Block>
  );
  
  // Render item function for FlatList
  const renderItem = ({ item }) => (
    <View style={{ padding: 16 }}>
      <Text bold>{item.name} ({item.cycle.number} mois)</Text>
      <Text>Somme: {item.amount} {item.currency}</Text>
      <Text>President: {item.owner.name}</Text>
      <Text>Status: {item.status}</Text>
      <Block row>
        {
          item.status !='ACCEPTED'? 
          <Button disabled={status == 'loading'}
          loading={status == 'loading'} mode='contained' buttonColor={COLORS.darkgreen} onPress={()=> handlerValidate(item)} > Valider</Button>:
          <></>
        }
       
      </Block>
    </View>
  );

   // Render item function for FlatList
   const renderPropduct = ({ item }) => (
    <View style={{ padding: 16 }}>
      <Text bold>{item.name}</Text>
      <Text>Somme: {item.amount} {item.currency}</Text>
   
      <Text>Status: {item.status}</Text>
      <Block row>
        {
          item.status !='ACCEPTED'? 
          <Button disabled={status == 'loading'}
          loading={status == 'loading'} mode='contained' buttonColor={COLORS.darkgreen} onPress={()=> handlerValidateProduct(item)} > Valider</Button>:
          <></>
        }
       
      </Block>
    </View>
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={SceneMap({
        second: SecondRoute,
        first: FirstRoute,
      })}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },
});

export default MagicValidation;
