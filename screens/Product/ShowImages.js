import { useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';

import { COLORS, SIZES } from '../../constants';
import { Text } from 'react-native-paper';


const ShowImages = ({ route, navigation }) => {

  useEffect(()=> {
    //console.log("r", route.params);
    // console.log("token", JSON.parse(token)?.user?.user?.userId,);
  },[])

    
  return (
    <ScrollView
    //contentContainerStyle={styles.scrollContentContainer}
    showsVerticalScrollIndicator={false}
  >
    {
      route?.params?.images.map((value, index)=>{
        console.log(value);
        return <Image
        key={index}
        source={{ uri: value}}
        style={{
          width: '90%',
          height: 200,
          marginLeft: "5%",
          marginTop: '5%',
          borderRadius: SIZES.radius,
        }}
      />
      })
    }

  </ScrollView>
  );
};

const styles = StyleSheet.create({
  round: {
    borderRadius: 10,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.lightGray2,
  }
});

export default ShowImages;
