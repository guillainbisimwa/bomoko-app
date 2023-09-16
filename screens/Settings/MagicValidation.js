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


  const handlerValidate = async (item) => {

    // Pushing the additional object to the output array
    const today = new Date();

    const outputTimeLineSoum = {
      time:`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear().toString().substr(-2)}`,
      title: 'Validation',
      details: `Votre groupe ${item.name} a été validé à l'équipe African Fintech`
    };

    console.log();
    console.log();

    console.log({
      ...item,
      id: item._id,
      status: "ACCEPTED",
      timeline: [
        outputTimeLineSoum,
        ...item.timeline,
      ]
    });

    // dispatch(updateAvec({
    //   ...item,
    //   id: item._id,
    //   status: "SUBMITED",
    //   timeline: [
    //     outputTimeLineSoum,
    //     ...item.timeline,
    //   ]
    // }));

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
      <Text bold>{item.name}</Text>
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
