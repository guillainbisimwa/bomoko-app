import React, { useRef, useState, useEffect } from 'react';
import {
  ImageBackground,
  ScrollView,
  Animated,
  StyleSheet,
  Image,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import { Block } from '../../components';
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Button } from 'react-native-paper';

const Profile = ({ route, navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
 
  useEffect(() => {
    // Fetch user details from API
    fetch(`https://bomoko-backend.onrender.com/auth/${route.params.userId}`)
      .then(response => response.json())
      .then(data => {
       // console.log(data);
       // console.log(route.params.userId);
        setUserDetails(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching user details:', error));
    
    // Fetch all products from API
    fetch(`https://bomoko-backend.onrender.com/api/product`)
      .then(response => response.json())
      .then(data => {
       // console.log(data);
        setProducts(data); // Assuming the data structure is an array of products
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);


  const renderCover = () => {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16}
      >
          <ImageBackground
            source={require('./../../assets/img/cover.png')}
            resizeMode="cover"
            style={{ width: SIZES.width, height: 170, justifyContent: 'flex-end' }}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.9)']}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: 170,
              }}
            ></LinearGradient>
          </ImageBackground>
      </ScrollView>
    );
  };

  const renderProfilePic = () => {
    return (
      <Image source={{ uri: userDetails?.profile_pic }} style={styles.profilePic} />
    );
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color={COLORS.peach} style={styles.loadingIndicator} />
    );
  }

  const countByOwner = (products, type) => {
    const filteredServices = products.filter(product => product.owner._id === route.params.userId && product.type === type);
    const count = filteredServices.length;
    return count;
  };

  const listByOwner = (products, type) => {
    const filteredServices = products.filter(product => product.owner._id === route.params.userId && product.type === type);
    return filteredServices;
  };

  const listProductsForUser = (products) =>{
    return products.filter(product =>
      product.membres.some(member => member.user._id === route.params.userId)
    );
  };

  const  countProductsForUser = (products) =>{
    return products.reduce((count, product) => {
      if (product.membres.some(member => member.user._id === route.params.userId)) {
        return count + 1;
      }
      return count;
    }, 0);
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor={COLORS.gray} />
      <Block flex={1}>
        <Block style={{ height: 140 }}>
          {renderCover()}
        </Block>
        <View style={{ flex: 1, alignItems: "center" }}>
        {renderProfilePic()}

        {/* Other profile details */}
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.primary,
            marginVertical: 8,
          }}
        >
          {userDetails?.name}
        </Text>
        <Text
          style={{
            color: COLORS.black,
            ...FONTS.body4,
          }}
        >
          {userDetails?.email}
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
            alignItems: "center",
          }}
        >
          <MaterialIcons name="phone" size={24} color="black" />
          <Text
            style={{
              ...FONTS.body4,
              marginLeft: 4,
            }}
          >
            {userDetails?.mobile}
          </Text>
        </View>

        <View
          style={{
            paddingVertical: 8,
            flexDirection: "row",
          }}
        >
          
          <TouchableOpacity
            onPress={() => {
              // Add your onPress function here
              navigation.navigate('DetailsByUser', {  prodServ: listProductsForUser(products), title: "Participations" })
            }}
          >
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginHorizontal: SIZES.padding,
              }}
            >
              <Text
                style={{
                  ...FONTS.h2,
                  color: COLORS.primary,
                }}
              >
                {countProductsForUser(products)}
              </Text>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.primary,
                }}
              >
                Participations
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // Add your onPress function here
              navigation.navigate('DetailsByUser', {  prodServ: listByOwner(products,'produit'), title: "Produits" })
              
            }}
          >
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginHorizontal: SIZES.padding,
              }}
            >
              <Text
                style={{
                  ...FONTS.h2,
                  color: COLORS.primary,
                }}
              >
                {countByOwner(products, 'produit')}
              </Text>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.primary,
                }}
              >
                Mes Produits
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // Add your onPress function here
              navigation.navigate('DetailsByUser', {  prodServ: listByOwner(products,'service'), title: "Services" })

            }}
          >
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginHorizontal: SIZES.padding,
              }}
            >
              <Text
                style={{
                  ...FONTS.h2,
                  color: COLORS.primary,
                }}
              >
                {countByOwner(products, 'service')}
              </Text>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.primary,
                }}
              >
                Mes Services
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", gap:10, justifyContent:"space-between"  }}>
         
          <Button mode="contained" onPress={()=> console.log("ok")} >   Modifier le Profile </Button>
          <Button  mode="contained" buttonColor={COLORS.peach} >   Finance  </Button>

         
        </View>
        </View>
        
      </Block>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginTop: -75,
    borderWidth: 5,
    borderColor: COLORS.white,
    backgroundColor: COLORS.white
  },
});

export default Profile;
