import React, { useRef, useState, useEffect } from 'react';
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import { Block } from '../../components';
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Button } from 'react-native-paper';
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Product_service from '../Product/Product_service';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';


const countByOwner = (products, type, id) => {
  const filteredServices = products.filter(product => product.owner._id === id && product.type === type);
  const count = filteredServices.length;
  return count;
};

const listByOwner = (products, type, id) => {
  const filteredServices = products.filter(product => product.owner._id === id && product.type === type);
  return filteredServices;
};

const listProductsForUser = (products, id) =>{
  return products.filter(product =>
    product.membres.some(member => member.user._id === id)
  );
};

const  countProductsForUser = (products, id) =>{
  return products.reduce((count, product) => {
    if (product.membres.some(member => member.user._id === id)) {
      return count + 1;
    }
    return count;
  }, 0);
}


const Profile = ({ route, navigation }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [loadingProd, setLoadingProd] = useState(true);

  const [token, setToken] = useState(null);


  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes, SetRoutes] = useState([
    { key: "first", title: `Participations`},
    { key: "second", title: `Produits` },
    { key: "third", title: "Services" },
  ]);

  useEffect(() => {
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

    // Fetch user details from API
    const netInfo = NetInfo.fetch();
    // console.log("netInfo.isConnected", netInfo.isConnected);
    if (!netInfo.isConnected) {
      setUserDetails(route.params.user);
      setLoading(false);
      Alert.alert("Pas de connexion Internet", "Veuillez vérifier votre connexion Internet et réessayer.");
      return;
    }
  
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
       setLoadingProd(false)
        setProducts(data); // Assuming the data structure is an array of products
        SetRoutes(prevRoutes => [
          { ...prevRoutes[0], title: `Participations (${countProductsForUser(data, route.params.userId)})` },
          { ...prevRoutes[1], title: `Produits (${countByOwner(data, 'produit', route.params.userId)})` },
          { ...prevRoutes[2], title: `Services (${countByOwner(data, 'service', route.params.userId)})` },
        ]);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: COLORS.peach,
      }}
      style={{
        backgroundColor: COLORS.white,
        height: 44,
      }}
      renderLabel={({ focused, route }) => (
        <Text  style={[{ color: focused ? COLORS.black : COLORS.gray }]}>
          {route.title}
        </Text>
      )}
    />
  );

const ParticipationRoutes = () => (
  <ScrollView style={{ flex: 1 , paddingHorizontal:5, paddingVertical:10, backgroundColor: COLORS.white}}>
    {
       listProductsForUser(products, route.params.userId).length === 0 ? (
        <Text style={{ textAlign: 'center', fontSize: 16 }}>Aucune donnée disponible.</Text>
      ) : (
      listProductsForUser(products, route.params.userId).map((food, index) => {
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
);

const ProduitRoutes = () => (
  <ScrollView style={{flex: 1 , paddingHorizontal:5, paddingVertical:10, backgroundColor: COLORS.white}}>
     {
      listByOwner(products, 'produit', route.params.userId).length === 0 ? (
        <Text style={{ textAlign: 'center', fontSize: 16 }}>Aucune donnée disponible.</Text>
      ) : (
      listByOwner(products, 'produit', route.params.userId ).map((food, index) => {
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
);



const ServiceRoutes = () => (
  <ScrollView style={{ flex: 1 , paddingHorizontal:5, paddingVertical:10, backgroundColor: COLORS.white}}>
    {
      listByOwner(products, 'service', route.params.userId).length === 0 ? (
        <Text style={{ textAlign: 'center', fontSize: 16 }}>Aucune donnée disponible.</Text>
      ) : (
      listByOwner(products, 'service', route.params.userId).map((food, index) => {
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
);


  const renderCover = () => {
    return (
      <ImageBackground
        source={require('./../../assets/img/cover.png')}
        resizeMode="cover"
        style={{ width: SIZES.width, height: 120, justifyContent: 'flex-end' }}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.9)']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 120,
          }}
        ></LinearGradient>
      </ImageBackground>
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

  return (
    <Block >
      <StatusBar backgroundColor={COLORS.gray} />
      <Block>
       
         {renderCover()}
        <View style={{ alignItems: "center" }}>
        {renderProfilePic()}

        {/* Other profile details */}
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.primary,
            marginTop: 60
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
            marginVertical: 0,
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
      
        {/* <View
          style={{
            paddingVertical: 4,
            flexDirection: "row",
          }}
        >
          
          <TouchableOpacity
            onPress={() => {
              // Add your onPress function here
              navigation.navigate('DetailsByUser',
               {  prodServ: listProductsForUser(products, route.params.userId), title: "Participations" })
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
                {countProductsForUser(products, route.params.userId)}
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
              navigation.navigate('DetailsByUser',
               {  prodServ: listByOwner(products,'produit'), title: "Produits" })
              
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
                {countByOwner(products, 'produit', route.params.userId)}
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
              navigation.navigate('DetailsByUser', {  prodServ: 
                listByOwner(products,'service'), title: "Services" })

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
                {countByOwner(products, 'service', route.params.userId)}
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
        </View>  */}

        <View style={{ paddingVertical:20, flexDirection: "row", gap:10, justifyContent:"space-between"  }}>
         {
          JSON.parse(token)?.user?.user?.userId == route.params.userId?
          <Button mode="contained" onPress={()=> 
            navigation.navigate('EditProfile', { user: userDetails})} >   
              Modifier le Profile 
          </Button>:
           <Button mode="contained">   
              Contacter 
          </Button>
         }
         

          <Button  mode="contained" buttonColor={COLORS.peach} >   Finance  </Button>
        </View>
        </View>
        <Block style={{ flex: 1, }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={SceneMap({
            first: ParticipationRoutes,
            second: ProduitRoutes,
            third: ServiceRoutes,
          })}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      </Block>
      </Block>
      
    </Block>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    position:'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    top: -60,
    borderWidth: 5,
    borderColor: COLORS.white,
    backgroundColor: COLORS.white,
    elevation: 5
  },
  scene: {
    flex: 1,
  },
});

export default Profile;
