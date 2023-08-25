import React, { useLayoutEffect, useState } from 'react';
import { ImageBackground, TouchableOpacity, View, Text } from 'react-native';
import { ScrollView } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import Product_service from '../Product/Product_service';

const DetailsByUser = ({ navigation, route }) => {
  console.log();
  console.log("{route.params.prodServ.length", route.params.prodServ);
  console.log();

  const [pageTitle, setPageTitle] = useState(route.params.title);

  // Use useLayoutEffect to set options before rendering
  useLayoutEffect(() => {
    navigation.setOptions({
      title: pageTitle,
    });
  }, [navigation, pageTitle]);

  return (
    <>
      <ImageBackground
        style={{ flex: 1, position: 'absolute', height: '100%', width: '100%' }}
        source={require('./../../assets/login1_bg.png')}
        blurRadius={10}
      ></ImageBackground>
      <ScrollView
        style={{
          flex: 1,
          margin: 10,
          padding: 10,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
        }}
        showsVerticalScrollIndicator={false}
      >
        {route.params.prodServ.length <= 0 ? (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text>Aucun produit ou service disponible.</Text>
          </View>
        ) : (
          route.params.prodServ.map((food, index) => {
            const key = `${food._id}_${index}`;
            return (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  navigation.navigate('Details', { food });
                }}
              >
                <Product_service item={food} />
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </>
  );
};

export default DetailsByUser;

