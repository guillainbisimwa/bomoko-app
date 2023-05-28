import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from './../../constants';
import Block from './Block';
import Foods from './Foods';
import Text from './Text';
import Categories from './Categories';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, IconButton, MD3Colors, ProgressBar } from 'react-native-paper';

const ProductScreen = ({ navigation }) => {
  const [active, setActive] = useState('Featured');
  const [search, setSearch] = useState('');
  const [foodList, setFoodList] = useState([...Foods]);

  const onSearch = (text) => {
    setFoodList([
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

  // const renderTab = (tab) => {
  //     const isActive = active === tab;

  //     return (

  //         <TouchableOpacity key={`tab-${tab}`}
  //             onPress={() => handleTab(tab)}
  //             style={styles.tab}
  //         >
  //             <Block center>
  //                 <Text grey style={[styles.current, isActive ? styles.currentActive : null]} >
  //                 {tab}
  //                 </Text>
  //                 <Block center style={[isActive ? styles.active : null]}></Block>
  //             </Block>

  //         </TouchableOpacity>
  //     );
  // }

  // const handleTab = (tab) => {
  //     setActive(tab);

  //     if(tab == "Featured"){
  //         setFoodList([...foodList.sort((a, b) => a.title.localeCompare(b.title))])
  //     }
  //     else if(tab == "Popular"){
  //         setFoodList([...foodList.sort((b, a) => a.stars - b.stars)])
  //     } else if(tab == "Newest") {
  //         setFoodList([...foodList.sort((a, b) => a.deliveryTime - b.deliveryTime)])
  //     }
  //     else {
  //         setFoodList([...foodList.sort((a, b) => a.stars - b.stars)])
  //     }

  // };

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
                  navigation.navigate('Details', { name: 'joe', cats: Categories });
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
                </Block>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </>
    );
  };

  // const categories = () => {
  //   return (
  //     <>
  //       <Block row space="between" m_t={20} m_b={10}>
  //         <Text h2 grey bold>
  //           Explore categories
  //         </Text>
  //         <Text primary>View more</Text>
  //       </Block>

  //       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
  //         {Categories.map((cat, index) => {
  //           return (
  //             <Block center middle key={index} color={cat.color} style={styles.cat}>
  //               <Ionicons color={COLORS.blue} size={SIZES.base * 3} name={'information-circle'} />

  //               <Text white bold h2>
  //                 {cat.name}
  //               </Text>
  //               <Text size={15} grey>
  //                 {cat.places} places
  //               </Text>
  //             </Block>
  //           );
  //         })}
  //       </ScrollView>
  //     </>
  //   );
  // };

  // const recommended = () => {
  //     return (
  //         <>
  //             <Block row space="between" m_t={20} m_b={10}>
  //                 <Text h2 grey bold>Recommended</Text>
  //                 <Text primary >View more</Text>
  //             </Block>

  //             <ScrollView horizontal showsHorizontalScrollIndicator={false}>
  //             {
  //                 Foods.map((food, index)=> {
  //                     return(
  //                             <Block key={index} style={styles.recommended} color='white'>
  //                                 <Image source={food.image} style={styles.imgRecommended} />
  //                                 <Text numberOfLines={1} size={16} grey bold>{food.title}</Text>
  //                                 <Text numberOfLines={1} grey_two>{food.subtitle}</Text>
  //                                 <Block row>
  //                                     {stars(food.stars)}
  //                                 </Block>
  //                                 <Block row m_t={10}>
  //                                     <Block style={styles.info} center row>
  //<Ionicons color={COLORS.blue} size={SIZES.base * 3} name={'information-circle'} />
  //
  //                                         <Text primary>{food.location} m</Text>
  //                                     </Block>

  //                                     <Block m_l={10} style={styles.info} center row>
  //<Ionicons color={COLORS.blue} size={SIZES.base * 3} name={'information-circle'} />
  //
  //                                         <Text primary>{food.deliveryTime}'</Text>
  //                                     </Block>
  //                                 </Block>
  //                         </Block>
  //                     )
  //                 })
  //             }
  //             </ScrollView>
  //         </>
  //     )
  // };

  // const list = () => {
  //     return (
  //         <>
  //             <Block space="between" p={10} m_b={30} m_t={20} color="white" style={styles.listContainer}>
  //                 <Block row m_t={10} m_b={20}>
  //                     {
  //                         ['Featured', 'Popular', 'Newest', 'Trending'].map((tab)=>{
  //                             return renderTab(tab);
  //                         })
  //                     }
  //                 </Block>
  //                 <Block row m_b={20} space="between">
  //                     <Block row style={styles.info} center >
  //                         <Text h2 grey >Best match</Text>
  //                         <Block m_l={10}>
  //<Ionicons color={COLORS.blue} size={SIZES.base * 3} name={'information-circle'} />
  //
  //                         </Block>
  //                     </Block>

  //                     <Block row>
  //                         <Block row style={styles.info} center >
  //<Ionicons color={COLORS.blue} size={SIZES.base * 3} name={'information-circle'} />
  //
  //                         </Block>

  //                         <Block m_l={10} row style={styles.info} center >
  //<Ionicons color={COLORS.blue} size={SIZES.base * 3} name={'information-circle'} />
  //
  //                         </Block>
  //                     </Block>
  //                 </Block>
  //                 <Block>
  //                     {
  //                         foodList.length == 0 ? <Text h2 primary bold center >No item found</Text> :
  //                         <Text></Text>
  //                     }
  //                     {
  //                         foodList.map((food, index)=> {
  //                             return <TouchableOpacity  style={styles.horizontalList} key={index}>
  //                                 <FoodList item={food} />
  //                             </TouchableOpacity>
  //                         })
  //                     }
  //                 </Block>
  //             </Block>
  //         </>
  //     )
  // };

  return (
    <Block flex color="grey" p={15}>
      <ScrollView style={{ paddingTop: 20 }} showsVerticalScrollIndicator={false}>
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
            {/* {categories()} */}
            {/*  { recommended() }
                        { list() } */}
          </>
        ) : (
          list()
        )}
      </ScrollView>
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
    width: SIZES.width / 4,
    height: SIZES.width / 3,
    marginRight: 15,
    borderRadius: 10,
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
    borderBottomColor: COLORS.primary,
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
