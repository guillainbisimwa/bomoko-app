import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from './../../constants';
import Block from './Block';
import Foods from './Foods';
import Text from './Text';
import Product_service from './Product_service';

import Ionicons from '@expo/vector-icons/Ionicons';
import { IconButton, MD3Colors, ProgressBar } from 'react-native-paper';

const ProductScreen = ({ navigation }) => {
  const [active, setActive] = useState('Tous');
  const [search, setSearch] = useState('');
  const [product_serviceList, setProduct_serviceList] = useState([...Foods]);

  const onSearch = (text) => {
    setProduct_serviceList([
      ...Foods.filter((food) => food.title.toLocaleLowerCase().includes(text.toLocaleLowerCase())),
    ]);
    setSearch(text);
  };

  const stars = (starsNumber) => {
    return (
      <Block row>
        {[...Array(starsNumber).keys()].map((star, index) => {
          return <Ionicons color={COLORS.yellow} size={SIZES.base * 3} name={'star'} />;
        })}
        <Ionicons color={COLORS.yellow} size={SIZES.base * 3} name={'star-outline'} />
      </Block>
    );
  };

  const renderTab = (tab) => {
    const isActive = active === tab;

    return (
      <TouchableOpacity key={`tab-${tab}`} onPress={() => handleTab(tab)} style={styles.tab}>
        <Block center>
          <Text grey style={[styles.current, isActive ? styles.currentActive : null]}>
            {tab}
          </Text>
          <Block center style={[isActive ? styles.active : null]}></Block>
        </Block>
      </TouchableOpacity>
    );
  };

  const handleTab = (tab) => {
    setActive(tab);

    if (tab === 'Tous') {
      // setProduct_serviceList([...product_serviceList.sort((a, b) => a.title.localeCompare(b.title))]);
      setProduct_serviceList([...product_serviceList.sort((a, b) => a.stars - b.stars)]);
    } else if (tab == 'Produits') {
      //setProduct_serviceList([...product_serviceList.find((a, b) => a.type === 'Produit')]);
      console.log(product_serviceList.find((a, b) => a.type === 'Produit'));
      setProduct_serviceList([...product_serviceList.sort((a, b) => a.type - b.type)]);
    } else if (tab == 'Services') {
      //setProduct_serviceList([...product_serviceList.find((a, b) => a.type === 'Service')]);
      setProduct_serviceList([...product_serviceList.sort((a, b) => b.type - a.type)]);
    } else {
      setProduct_serviceList([...product_serviceList.sort((a, b) => a.stars - b.stars)]);
    }
  };

  const popular = () => {
    return (
      <>
        <Block row space="between" m_t={15}>
          <Text h2 grey bold>
            Les produits/services populaires
          </Text>
          <Text primary>Voir plus</Text>
        </Block>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Foods.map((food, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate('Details', { name: 'joe', cats: [] });
                }}
              >
                <Block p={10} color="white" style={styles.container} m_t={14}>
                  <View style={styles.price}>
                    <Text white bold>
                      600 USD
                    </Text>
                  </View>

                  <View style={styles.like}>
                    <IconButton
                      icon="heart"
                      iconColor={MD3Colors.error50}
                      size={20}
                      onPress={() => console.log('Pressed')}
                    />
                  </View>
                  <Image source={food.image} style={styles.imgFood} />
                  <Text numberOfLines={1} grey h2 bold>
                    {' '}
                    {food.title}{' '}
                  </Text>
                  <Text numberOfLines={1} grey>
                    {food.subtitle}
                  </Text>
                  <Block m_t={5} row center space="between">
                    {stars(food.stars)}
                  </Block>
                  <Block m_t={10} row center space="between">
                    <Block row center>
                      <IconButton
                        icon="pin"
                        iconColor={MD3Colors.error50}
                        size={20}
                        onPress={() => console.log('Pressed')}
                      />
                      <Text numberOfLines={1} semibold size={19}>
                        Goma
                      </Text>
                    </Block>
                    <Block row center space="between">
                      <ProgressBar
                        progress={0.5}
                        color={MD3Colors.error50}
                        style={{ width: SIZES.width / 4, height: SIZES.base }}
                      />
                      <Text numberOfLines={1} semibold size={19} style={{ marginLeft: 20 }}>
                        50%
                      </Text>
                    </Block>
                  </Block>
                  <Block row>
                    <Block
                      center
                      middle
                      key={index}
                      style={[styles.cat, { backgroundColor: COLORS.primary }]}
                    >
                      <Text white bold size={20}>
                        9%
                      </Text>
                      <Text white bold h2 numberOfLines={1}>
                        Realisation
                      </Text>
                    </Block>
                    <Block
                      center
                      middle
                      key={index}
                      style={[styles.cat, { backgroundColor: COLORS.purple }]}
                    >
                      <Text white bold size={20}>
                        10
                      </Text>
                      <Text white bold h2 numberOfLines={1}>
                        Membres
                      </Text>
                    </Block>
                    <Block
                      center
                      middle
                      key={index}
                      style={[styles.cat, { backgroundColor: COLORS.peach }]}
                    >
                      <Text white bold size={20}>
                        600$
                      </Text>
                      <Text white bold h2 numberOfLines={1}>
                        Budjet
                      </Text>
                    </Block>
                  </Block>
                </Block>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </>
    );
  };

  const list = () => {
    return (
      <>
        <Block space="between" p={10} m_b={30} m_t={20} color="white" style={styles.listContainer}>
          <Block row m_t={10} m_b={20}>
            {['Tous', 'Produits', 'Services'].map((tab) => {
              return renderTab(tab);
            })}
          </Block>

          <Block>
            {product_serviceList.length == 0 ? (
              <Text h2 primary bold center>
                Aucun produit ou service
              </Text>
            ) : (
              <Text></Text>
            )}
            {product_serviceList.map((food, index) => {
              return (
                <TouchableOpacity style={styles.horizontalList} key={index}>
                  <Product_service item={food} />
                </TouchableOpacity>
              );
            })}
          </Block>
        </Block>
      </>
    );
  };

  return (
    <Block flex color="grey">
      <Block row center color="white" p={15}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('Home')
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back-outline" size={30} color={COLORS.grey} />
        </TouchableOpacity>

        <Text size={19} semibold style={{ marginLeft: 15 }}>
          Produits / services
        </Text>
      </Block>

      <Block flex color="grey" p={15}>
        <ScrollView style={{ paddingTop: 5 }} showsVerticalScrollIndicator={false}>
          <Block flex={false}>
            <TextInput
              placeholder="Rechecher un produit/service"
              style={styles.input}
              value={search}
              onChangeText={(text) => onSearch(text)}
            />
          </Block>

          {search.trim().length == 0 ? (
            <>
              {popular()}
              {list()}
            </>
          ) : (
            list()
          )}
        </ScrollView>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  marginRight: {
    marginRight: 5,
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 44,
    fontSize: 20,
  },
  toggle: {
    position: 'absolute',
    top: 19,
    left: 15,
  },
  container: {
    borderRadius: 16,
    marginRight: 15,
    width: SIZES.width - 100,
  },
  imgFood: {
    width: '100%',
    height: (SIZES.width - 100) / 2,
    borderRadius: 16,
    marginBottom: 10,
  },
  info: {
    backgroundColor: COLORS.grey,
    padding: 7,
    borderRadius: 10,
  },
  cat: {
    width: SIZES.width / 4 - 4,
    height: SIZES.width / 5,
    marginRight: 2,
    borderRadius: 10,
    //backgroundColor: COLORS.purple,
    elevation: 4,
    padding: 5,
  },
  recommended: {
    width: SIZES.width / 2.5,
    marginRight: 15,
    borderRadius: 10,
    elevation: 2,
    padding: 10,
  },
  imgRecommended: {
    width: '100%',
    height: SIZES.width / 4,
    borderRadius: 10,
    marginBottom: 5,
  },
  listContainer: {
    borderRadius: 20,
  },

  tab: {
    marginRight: 20,
    paddingBottom: 5,
  },
  active: {
    borderBottomColor: COLORS.peach,
    borderBottomWidth: 5,
    width: 30,
    paddingBottom: 5,
  },
  current: {
    color: COLORS.grey,
    fontSize: 20,
    fontWeight: 'bold',
  },
  currentActive: {
    color: COLORS.primary,
  },
  price: {
    position: 'absolute',
    zIndex: 100,
    backgroundColor: COLORS.peach,
    padding: 10,
    borderRadius: 20,
    elevation: 5,
  },
  like: {
    position: 'absolute',
    zIndex: 100,
    backgroundColor: COLORS.white,
    borderRadius: 25,
    right: 0,
    margin: SIZES.base * 2,
  },
});

export default ProductScreen;
