import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
//redux
import { useSelector } from 'react-redux';
import { COLORS } from '../../constants';
//Color
//Component
import { ProductBody } from './components';

export const ProductScreen = (props) => {
  //const products = useSelector((state) => state.store.products);

  const products = [{ title: 'Đá Quý', data: 'stones' }];

  const [productsFilter, setproductsFilter] = useState(products);
  const searchFilterFunction = (text) => {
    const data = products.filter((product) =>
      product.filename.toLowerCase().includes(text.toLowerCase())
    );
    setproductsFilter(data);
  };
  return (
    <View style={styles.container}>
      <ProductBody
        navigation={props.navigation}
        productsFilter={productsFilter}
        searchFilterFunction={searchFilterFunction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
