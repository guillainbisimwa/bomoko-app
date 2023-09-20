import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Block from '../Product/Block';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvecs, updateAvec } from '../../redux/avecReducer';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from '../../components';
import { Button } from 'react-native-paper';
import { COLORS } from '../../constants';
import moment from 'moment';


const MagicValidation = () => {
  const dispatch = useDispatch();
  
  const {avecs, error, status} = useSelector((state) => state.avecs); 


   // Use the useFocusEffect hook to execute reloadScreen when the screen gains focus
   useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        dispatch(fetchAvecs())
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


  const [index, setIndex] = useState(0);
  const routes = [
    { key: 'first', title: 'AVEC' },
    // { key: 'second', title: 'Second' },
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

    const reunions = generateDateIntervals(today, item.cycle.number , 1).map((value, key) => {
      
      const exampleReunion = {
        status: "UPCOMING",
        num: 1,
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

    console.log({
      ...item,
      id: item._id,
      //status: "ACCEPTED",
      timeline: [
        outputTimeLineSoum,
        ...item.timeline,
      ],
      reunion: 
        reunions,
      
    });

    
    dispatch(updateAvec({
      ...item,
      id: item._id,
      status: "ACCEPTED",
      timeline: [
        outputTimeLineSoum,
        ...item.timeline,
      ],
      reunion: 
        reunions,
      
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
  
  // Render item function for FlatList
  const renderItem = ({ item }) => (
    <View style={{ padding: 16 }}>
      <Text bold>{item.name} ({item.cycle.number} mois)</Text>
      <Text>Somme: {item.amount} {item.currency}</Text>
      <Text>President: {item.owner.name}</Text>
      <Text>Status: {item.status}</Text>
      <Block row>
        {
          item.status=='SUBMITED'? 
          <Button disabled={status == 'loading'}
          loading={status == 'loading'} mode='contained' buttonColor={COLORS.darkgreen} onPress={()=> handlerValidate(item)} > Valider</Button>:
          <></>
        }
       
      </Block>
    </View>
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={SceneMap({
        first: FirstRoute,
        //second: SecondRoute,
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
