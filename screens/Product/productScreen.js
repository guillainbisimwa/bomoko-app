import React, { useEffect, useState } from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from './../../constants';
import Block from './Block';
import Text from './Text';
import Product_service from './Product_service';
import LottieView from 'lottie-react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { FAB, IconButton, MD3Colors, ProgressBar, Button, Card, Modal, Menu, Divider, Provider, ActivityIndicator, Badge } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadInitialUser, logoutUser, setInitialUser } from '../../redux/userSlice';
import { fetchProducts } from '../../redux/prodReducer';
import NetInfo from "@react-native-community/netinfo";


const ProductScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { error, isLoading, success, products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);


  // Refresh Control
  const [refreshing, setRefreshing] = useState(false);

  const [visible, setVisible] = useState(false);

  const [visibleMenu, setVisibleMenu] = useState(false);

  const [active, setActive] = useState('Tous');
  const [search, setSearch] = useState('');
  const [product_serviceList, setProduct_serviceList] = useState([]);

  const [token, setToken] = useState(null);

  const [ badgePanding, setBadgePanding ] = useState(0)

  useEffect(() => {
      // Load initial user data from AsyncStorage
      const initialUser = loadInitialUser();
      if (initialUser) {
        // Dispatch the action using extraReducers
        dispatch(setInitialUser(initialUser));
      }
    //setActive(active == null? 'Tous':active);
    setProduct_serviceList([...products]);
    setProduct_serviceList([...products].sort((a, b) => a.name - b.name));
    setBadgePanding(products.filter(product => 
      product.status === "PENDING" && 
      (
          product.owner._id === JSON.parse(token)?.user?.user?.userId || 
          product.membres.some(member => member.user._id === JSON.parse(token)?.user?.user?.userId && member.admission_req === "PENDING")
      )
  ).length)
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());

    const getTokenFromAsyncStorage = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('user');
        setToken(storedToken);
        
      } catch (error) {
        // Handle AsyncStorage read error if needed
        console.error('Error reading token from AsyncStorage:', error);
      }
    };

    getTokenFromAsyncStorage();
    // setProduct_serviceList([...products]);
  }, []);

  const handleLogout = () => {
    // Dispatch the logoutUser action
    closeMenu();
    dispatch(logoutUser());

    navigation.navigate('AuthScreen');
  };

  // Modal
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);


  // Menu
  const openMenu = () => setVisibleMenu(true);

  const closeMenu = () => setVisibleMenu(false);

  const containerStyle = {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 10,
    alignSelf: 'center',
  };

  const onSearch = (text) => {
    setProduct_serviceList([
      ...products.filter((prod) =>
        prod.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())
      ),
    ]);
    setSearch(text);
  };

  const onRefresh = async () => {

    const netInfo = await NetInfo.fetch();
    // console.log("netInfo.isConnected", netInfo.isConnected);
    if (!netInfo.isConnected) {
      Alert.alert("Pas de connexion Internet", "Veuillez vérifier votre connexion Internet et réessayer.");
      return;
    }

    dispatch(fetchProducts());
    setRefreshing(isLoading);
    setActive('Tous')
    setProduct_serviceList([...products]);
  };

  const stars = (starsNumber) => {
    const totalStars = 5;
    const filledStars = Math.min(starsNumber, totalStars);
  
    return (
      <Block row>
        {[...Array(filledStars).keys()].map((star, index) => (
          <Ionicons color={COLORS.yellow} key={index} size={SIZES.base * 2} name={'star'} />
        ))}
        {[...Array(totalStars - filledStars).keys()].map((star, index) => (
          <Ionicons color={COLORS.yellow} key={index} size={SIZES.base * 2} name={'star-outline'} />
        ))}
      </Block>
    );
  };

  const renderTab = (tab, index) => {
    const isActive = active === tab;

    return (
      <TouchableOpacity key={index} onPress={() => handleTab(tab)} style={styles.tab}>
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
      setProduct_serviceList([...products].sort((a, b) => a.name - b.name));
    } else if (tab == 'Produits') {
      const filteredProducts = [...products].filter((item) => item.type === 'produit');
      setProduct_serviceList([...filteredProducts]);
    } else if (tab == 'Services') {
      const filteredProducts = [...products].filter((item) => item.type === 'service');
      setProduct_serviceList([...filteredProducts]);
    } else {
      setProduct_serviceList([...products].sort((a, b) => a.name - b.name));
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
          {products.slice(-8).reverse().map((prod, index) => {
            const key = `${prod._id}_${index}`;

            const startDate = new Date(prod.startDate);
            const endDate = new Date(prod.endDate);
            
            const startDateFinal = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear().toString().substr(-2)}`;
            const endDateFinal = `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear().toString().substr(-2)}`;

             const invest = ((prod.initialAmount + prod.membres
            .filter(member => member.contribution_status === "ACCEPTED")
            .reduce((sum, member) => sum + member.contribution_amount, 0)) * 100 / prod.amount).toFixed(0);

            console.log(invest);
            return (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  navigation.navigate('Details', { food: prod });
                }}
              >
                <Block p={10} color="white" style={styles.container} m_t={14}>
                  <View style={styles.price}>
                    <Text white bold>
                      {prod.amount} {prod.currency}
                    </Text>
                  </View>

                  <View style={styles.like}>
                    <IconButton
                      icon="heart"
                      iconColor={MD3Colors.tertiary80} //  iconColor={MD3Colors.error50}
                      size={20}
                      onPress={() => console.log('Pressed')}
                    />
                  </View>
                
                  <Image source={{uri:  prod.images[0] }} style={styles.imgFood} />
                  <Text numberOfLines={1} grey h2 bold>
                    {prod.name}
                  </Text>
                  <Text color={COLORS.darkgreen}>Du {startDateFinal} au {endDateFinal}</Text>
                  <Text numberOfLines={2} grey>
                    {prod.detail}
                  </Text>
                  <Block m_t={5} row center space="between">
                    {stars(prod.stars.length)}
                    <Block row center>
                      <IconButton
                        icon="pin"
                        iconColor={MD3Colors.error50}
                        size={10}
                        onPress={() => console.log('Pressed')}
                      />
                      <Text numberOfLines={1} semibold size={12}>
                        {prod.location.join(', ')}
                      </Text>
                    </Block>
                  </Block>
                  <Block m_t={2} m_b={10} row center space="between">
                   
                    <Block row center space="between">
                      <ProgressBar
                        progress={invest/100}
                        color={MD3Colors.error50}
                        style={{ width: SIZES.width /1.8, height: SIZES.base }}
                        animatedValue={invest/100}
                        visible
                        
                      />
                      <Text numberOfLines={1} semibold size={19} style={{ marginLeft: 20 }}>
                      {invest}%
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
                      <Text white bold size={12}>
                        {invest}%
                      </Text>
                      <Text white bold numberOfLines={1}>
                        Realisation
                      </Text>
                    </Block>
                    <Block
                      center
                      middle
                      key={index}
                      style={[styles.cat, { backgroundColor: COLORS.purple }]}
                    >
                      <Text white bold size={12}>
                      {prod.membres.length + 1}
                      </Text>
                      <Text white bold numberOfLines={1}>
                        Membres
                      </Text>
                    </Block>
                    <Block
                      center
                      middle
                      key={index}
                      style={[styles.cat, { backgroundColor: COLORS.peach }]}
                    >
                      <Text white size={12}>
                        {prod.amount} {prod.currency}
                      </Text>
                      <Text white bold numberOfLines={1}>
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
            {['Tous', 'Produits', 'Services'].map((tab, index) => {
              return renderTab(tab, index);
            })}
          </Block>

          <Block>
            {products.length == 0 ? (
              <Text h2 primary bold center>
                Aucun produit ou service
              </Text>
            ) : (
              <Text></Text>
            )}
            {product_serviceList.map((food, index) => {
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
            })}
          </Block>
        </Block>
      </>
    );
  };

  function renderNavBar() {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingTop: SIZES.base * 3,
          justifyContent: 'space-between',
          paddingHorizontal: SIZES.padding,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              paddingRight: SIZES.base * 2,
            }}
            onPress={() => {
              console.log('Menu');
              navigation.openDrawer();
            }}
          >
            <Image
              source={icons.menu}
              style={{
                width: SIZES.base * 4,
                height: SIZES.base * 3,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
          
          <View>
            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>African Fintech</Text>
            <Text style={{ ...FONTS.h3, color: COLORS.gray }}>(Produits et Services)</Text>
        </View>
        </View>
        
        <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'flex-end', width: 50 }}
          onPress={() => {
            console.log('shopping');
            //console.log("Token --",JSON.parse(token).user.user.username);
            console.log('UserJ --', user?._j?.user?.user?.username);
            console.log('User --', user?._j);
            // navigation.navigate('ShoppingCard', {
            //   prodServ : products.filter(product => 
            //     product.status === "PENDING" && 
            //     (
            //       product.owner._id === JSON.parse(token)?.user?.user?.userId || 
            //       product.membres.some(member => member.user._id === JSON.parse(token)?.user?.user?.userId && member.admission_req === "PENDING")
            //     )
            // )
            // });
          }}
        >
          <Image
            source={icons.shopping}
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.white,
            }}
          />
            <Badge style={{ position:"absolute", top:2, right:-8 }}>{badgePanding}</Badge>

        </TouchableOpacity>
        { 
      user?._j?  
      <View
        style={{
          justifyContent: 'center', alignItems: 'flex-end', width: 50
        }}>
        <Menu
          visible={visibleMenu}
          onDismiss={closeMenu}
          anchor={

            <TouchableOpacity
            style={{  justifyContent: 'center', width: 40 }}
            onPress={openMenu}
          >
            {user?._j?.user?.user?.profile_pic ? (
        <Image
          source={{ uri: user?._j?.user?.user?.profile_pic }}
          style={{ width: 40, height: 40, borderRadius:20, borderWidth:1,
             elevation:3, borderColor: COLORS.white}}
        />
      ) : (
        <LottieView
          style={{
            width: 40,
            marginTop: 0,
          }}
          source={require('./../../assets/json/animation_lksuvej7.json')}
          autoPlay
          loop
        />
      )}
          </TouchableOpacity>
          }>
          <Menu.Item leadingIcon="account" onPress={() => {
            console.log("Token --",JSON.parse(token).user.user);
            //console.log('User --', user.user.username);
            console.log('User --', user['_j']?.user?.user?.username);
            navigation.navigate('Profile', {
              userId: JSON.parse(token)?.user?.user?.userId
            })

          }}
           title={user['_j']?.user?.user?.username} />
          <Divider />
          <Menu.Item leadingIcon="logout" onPress={handleLogout} title="Deconnexion" />
        </Menu>
      </View>
      :<></>}       
      </View>
      </View>
    );
  }

  return (
   
    <Provider>
    <ImageBackground
      style={{ flex: 1, position: 'absolute', height: '100%', width: '100%' }}
      source={require('./../../assets/login1_bg.png')}
      blurRadius={10}
    ></ImageBackground>
    <View style={{ flex: 1 }}>
      {/* Nav bar section */}
      {renderNavBar()}
   
    <Block flex color="grey">
      
      <Block flex color="grey" p={15}>
        <ScrollView style={{ paddingTop: 5 }} showsVerticalScrollIndicator={false}
         refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
          <Block flex={false}>
            <TextInput
              placeholder="Rechecher un produit/service"
              style={styles.input}
              value={search}
              onChangeText={(text) => onSearch(text)}
            />
          </Block>
          {
            isLoading?<ActivityIndicator size="large" />: <></>
            }
          {search.trim().length == 0 ? (
            <>
              {popular()}
              {list()}
            </>
          ) : (
            list()
          )}
        </ScrollView>

        <Modal
        style={{ zIndex: 99 }}
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={[containerStyle, { zIndex: 999 }]} // Set a higher value for the z-index
      >
        <Card style={{ padding: 10 }}>
          <Card.Title
            titleStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }}
            title="ATTENTION!" 
          />
          <Card.Content>
            <Text variant="titleLarge">Vous devez d'abord vous connecter</Text>
          </Card.Content>
          <Card.Actions style={{ marginTop: 15 }}>
            <Button onPress={hideModal}>Annuler</Button>
            <Button buttonColor={COLORS.red}
             onPress={() => {
              hideModal()
              navigation.navigate('AuthScreen')
            }} >Connecter</Button>
          </Card.Actions>
        </Card>
      </Modal>

        <FAB icon="plus" variant="tertiary" style={styles.fab} 
        onPress={() => {
          console.log()
          //console.log("user",JSON.parse(token)) //.user.user.username
          //console.log("user",u) //.user.user.username
          //console.log(JSON.parse(token).user?.user?.username);
          // if(!u.user) {
          //   showModal(true);
          // }
          if(!token) {
            showModal(true);
          }
          else {
            navigation.navigate('AddProduct', { owner: JSON.parse(token).user?.user?.userId,
              username: JSON.parse(token).user?.user?.username });
          }

          // {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
          // eyJ1c2VySWQiOiI2NGM5NjAzOGUxOTliY2JmZTFlMDI2NTQiL
          // CJlbWFpbCI6IkdiQHRlc3QuY29tIiwidXNlcm5hbWUiOiJHYi
          // IsImlhdCI6MTY5MTE2MzE2OCwiZXhwIjoxNjkxMjQ5NTY4fQ.
          // 5-vU88YKOBGg6rVk5zLuekAmKzuoYLO4QAXRWNFxtNo", 
          // "user": {"email": "Gb@test.com", 
          // "userId": "64c96038e199bcbfe1e02654", "username": "Gb"}}
        }} />
      </Block>
    </Block>
    </View>
    </Provider>
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
    borderWidth:1,
    borderColor: COLORS.gray
  },
  info: {
    backgroundColor: COLORS.grey,
    padding: 7,
    borderRadius: 10,
  },
  cat: {
    //width: SIZES.width / 4 - 4,
    width: '33%',
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
  fab: {
    position: 'absolute',
    margin: 16,
    //backgroundColor: '#ff0000',
    right: 0,
    bottom: 0,
  },
  animation: {
    width: 50,
    height: 50,
  },
});

export default ProductScreen;
