import React, { useEffect, useRef, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Svg } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Block from './Block';
import Text from './Text';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import { Button, Card, MD3Colors, Modal, ProgressBar, Snackbar, TextInput } from 'react-native-paper';
import { BottomSheet } from 'react-native-btr';
import { useDispatch, useSelector } from 'react-redux';
import CoutScreen from './CoutScreen';
import { Alert } from 'react-native';
import { addCout } from '../../redux/coutReducer';
import { View } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import Slider from '@react-native-community/slider';
import Timeline from 'react-native-timeline-flatlist';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { delProduct, soumettreProduct } from '../../redux/prodReducer';

const Details = ({ route, navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const couts = useSelector((state) => state.couts.couts);
  const { error, isLoading } = useSelector((state) => state.products);

  // Get token
  const [token, setToken] = useState(null);

  const [visibleSnackBar , setVisibleSnackBar ] = useState(false);
  const onDismissSnackBar = () => setVisibleSnackBar(false);
  const onToggleSnackBar = () => setVisibleSnackBar(!visibleSnackBar );
  const [expandedMembre, setExpandedMembre] = useState(false);

  const toggleExpansion = () => {
    setExpandedMembre(!expandedMembre);
  };

  const membresToShow = expandedMembre
  ? route.params.food.membres
  : route.params.food.membres.slice(0, 1); // Show the first two users if not expanded

  const [dateStart, setDateStart] = useState(new Date(route.params.food.startDate));
  const [dateEnd, setDateEnd] = useState(new Date(route.params.food.endDate));

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
  }, []);

  useEffect(()=> {
    console.log("owner", route.params.food.membres);
    console.log("token", JSON.parse(token)?.user?.user?.userId,);
  },[])

  const dispatch = useDispatch();

  // Date Calculation
  const targetStartDate = new Date(route.params.food.startDate);
  const targetEndDate = new Date(route.params.food.endDate);
  const today = new Date();
  const timeDifference = targetStartDate - today;
  const timeTotalExerc = targetEndDate - targetStartDate;
  const timeDiffExerc = targetEndDate - today;

  // Calculate the number of milliseconds in a day
  const millisecondsInDay = 24 * 60 * 60 * 1000;

  // Calculate the number of days left
  const daysLeft = Math.ceil(timeDifference / millisecondsInDay);
  const daysLeftExc = Math.ceil(timeDiffExerc / millisecondsInDay);
  const daysTotalExc = Math.ceil(timeTotalExerc / millisecondsInDay);

  console.log(`Days left: ${daysLeft}`);

  const showToast = () => {
    ToastAndroid.show("Une erreur s'est produite", ToastAndroid.LONG);
  }

  // Timeline
  const outputTimeLine = route.params.food.timeline.map(item => {
    const date = new Date(item.timestamp);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().substr(-2)}`;
    
    return {
      time: formattedDate,
      title: item.title,
      description: item.details,
      
    };
  });

  // Pushing the additional object to the output array
  const mydateEnd = new Date(targetEndDate);

  outputTimeLine.unshift({
    time:`${mydateEnd.getDate()}/${mydateEnd.getMonth() + 1}/${mydateEnd.getFullYear().toString().substr(-2)}`,
    title: 'Fin probable de la Campagne',
    description: `Probablelent la campagne prendra fin apres ${daysTotalExc} jours de la date de debut de la collecte`,
    //lineColor: COLORS.peach,
    //circleSize: 30,
    //circleColor: COLORS.peach,
    //dotColor: COLORS.blue,
    //innerCircle: 'dot',
  });

  const [visible, setVisible] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedAmount, setEditedAmount] = useState('');
  const [totAmount, setTotAmount] = useState(
    couts
      .filter((v, k) => v.prodId == route.params.food._id)
      .reduce((a, b) => a + (b.amount || 0), 0)
  );

  const [expanded, setExpanded] = useState(false);

  const [sliderValue, setSliderValue] = useState(15);

  function toggle() {
    setVisible((visible) => !visible);
  }

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Modal Delete P/S
  const [visibleDel, setVisibleDel] = useState(false);
  const showModalDel = () => setVisibleDel(true);
  const hideModalDel = () => setVisibleDel(false);

  const containerStyle = {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 10,
    alignSelf: 'center',
    position:"absolute",
    top:'15%'
  };

  // Modal SOUMETRE
  const [visibleSoumettre, setVisibleSoumettre ] = useState(false);
  const showModalSoumettre = () => setVisibleSoumettre(true);
  const hideModalSoumettre= () => setVisibleSoumettre(false);

   // Modal Demande Adhesion
   const [visibleAdhesion, setVisibleAdhesion] = useState(false);
   const showModalAdhesion = () => setVisibleAdhesion(true);
   const hideModalAdhesion = () => setVisibleAdhesion(false);

    // Modal Demande Quit
    const [visibleQuitter, setVisibleQuitter] = useState(false);
    const showModalQuitter = () => setVisibleQuitter(true);
    const hideModalQuitter = () => setVisibleQuitter(false);

    // Modal Demande Quit
    const [visibleContribuer, setVisibleContribuer] = useState(false);
    const showModalContribuer = () => setVisibleContribuer(true);
    const hideModalContribuer = () => setVisibleContribuer(false);

    
  // Dispaly rating stars
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

  const renderImages = () => {
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
        {route.params.food.images.map((image, index) => (
          <ImageBackground
            key={index}
            source={{ uri: image}}
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
        ))}
      </ScrollView>
    );
  };

  const handleAmountChange = (text) => {
    setEditedAmount(text);
  };

  const handleNameChange = (text) => {
    setEditedName(text);
  };

  const handleAddCout = () => {
    if (!editedName || !editedAmount) {
      // Throw UI error if any field is missing
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    const coutObj = {
      id: 1,
      name: editedName,
      amount: parseFloat(editedAmount),
      validate: true,
      prodId: route.params.food._id,
      date: '',
    };

    dispatch(addCout(coutObj));

    setTotAmount(totAmount + parseFloat(editedAmount));

    setEditedName('');
    setEditedAmount('');
  };

  const handleDelete = async () => {
    dispatch(delProduct({
      id: route.params.food._id
    }));

     // Check if the product was deleted successfully
    if (!error) {
      // Navigate back to the previous screen
      navigation.navigate('Main');
    }else {
      onToggleSnackBar()
    }
  }

  // Push New LIne into timeline array
  // Change Status
  // "PENDING","SUBMITED", "REJECTED", "ACCEPTED", "BANNED"
  
  const handleSoumettre = async () => {

    // Pushing the additional object to the output array
    const today = new Date();

    const outputTimeLineSoum = {
      time:`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear().toString().substr(-2)}`,
      title: 'Soumission',
      details: `Votre ${route.params.food.type} a été soumis à l'équipe BOMOKO Cash et est en attente de validation`
    };

    dispatch(soumettreProduct({
      ...route.params.food,
      id: route.params.food._id,
      status: "SUBMITED",
      timeline: [
        outputTimeLineSoum,
        ...route.params.food.timeline,
      ]
    }));

     // Check if the product was deleted successfully
    if (!error) {
      // Navigate back to the previous screen
      navigation.navigate('Main');

    }else {
      onToggleSnackBar()
    }
  };

  const handleAcceptReq = async (myUser) => {
    try{
  
      const updatedMembres = route.params.food.membres.map((membre) => {
        if (membre.user._id === myUser.user._id) {
          return {
            ...membre,
            admission_req: 'ACCEPTED',
          };
        }
        return membre;
      });

      dispatch(soumettreProduct({
        ...route.params.food,
        id: route.params.food._id,
        membres: updatedMembres,
      }));
  
       // Check if the member was updated successfully
      if (!error && !isLoading) {
        // Navigate back to the previous screen
        await navigation.navigate('Main');
  
      }else {
        console.log('Error ++++++')
        onToggleSnackBar()
      }
    } catch(e){
      console.log('Error //////////', e)
      onToggleSnackBar()
      showToast()
    }
  };

  const handleAcceptReject = async (myUser) => {
    try{
      const updatedMembres = route.params.food.membres.map((membre) => {
        if (membre.user._id === myUser.user._id) {
          return {
            ...membre,
            admission_req: 'REJECTED',
          };
        }
        return membre;
      });

      dispatch(soumettreProduct({
        ...route.params.food,
        id: route.params.food._id,
        membres: updatedMembres,
      }));
  
       // Check if the member was updated successfully
      if (!error && !isLoading) {
        // Navigate back to the previous screen
        await navigation.navigate('Main');
  
      }else {
        console.log('Error ++++++')
        onToggleSnackBar()
      }
    } catch(e){
      console.log('Error //////////', e)
      onToggleSnackBar()
      showToast()
    }
  }

  // Add user to prod/serv's memeber array
  // Display "Quitter" button while waiting for Admin Validation
  
  const handleAdhesion = async () => {

    // Push current user to member array

    // Reuse the soumettreProduct function
    dispatch(soumettreProduct({
      ...route.params.food,
      id: route.params.food._id,
      membres: [
        ...route.params.food.membres,
        {
          user: JSON.parse(token)?.user?.user?.userId,
          admission_req: 'PENDING', 
          contribution_amount: 0,
          contribution_status: 'PENDING', 
        }
      ]
    }));

     // Check if the product was deleted successfully
    if (!error) {
      // Navigate back to the previous screen
      navigation.navigate('Main');

    }else {
      onToggleSnackBar()
    }
  };

  const renderScrollIndicator = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <Block
        row
        center
        middle
        style={{
          position: 'absolute',
          bottom: 40,
          left: 0,
          right: 0,
          justifyContent: 'center',
        }}
      >
        {route.params.food.images.map((image, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={{
                height: 10,
                width: 10,
                borderRadius: 5,
                backgroundColor: COLORS.gray,
                opacity,
                marginHorizontal: 4,
              }}
            />
          );
        })}
      </Block>
    );
  };

  const renderFAaddCout = () => {
    return (
      <Block row center style={styles.floatBlockFA}>
        <TextInput
          label="Description"
          value={editedName}
          onChangeText={handleNameChange}
          mode="outlined"
          style={[styles.input, { width: '40%' }]}
          required
        />

        <TextInput
          label="Somme"
          value={`${editedAmount}`}
          onChangeText={handleAmountChange}
          mode="outlined"
          style={[styles.input, { width: '30%' }]}
          required
        />
        <Button
          style={{ width: '30%' }}
          textColor="#fff"
          elevated
          buttonColor={COLORS.peach}
          onPress={() => handleAddCout()}
        >
          AJOUTER
        </Button>
      </Block>
    );
  };

  const renderFloatingBlock = () => {
    return (
      <Block row space="between" style={styles.floatBlock}>
        <Text bold>Les coûts directs et indirects</Text>
        <Button textColor="#fff" elevated buttonColor={COLORS.purple} onPress={toggle}>
          Mes coûts
        </Button>
      </Block>
    );
  };

  const renderItem = (item) => (
    <TouchableOpacity
      onPress={() => {
        // console.log(item);
        // setSelectedItem(item);
        // showModal(true);
      }}
    >
      <View
        style={{
          marginVertical: SIZES.padding / 3.7,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}
      >
        {/* Title */}
        <View
          style={{
            flexDirection: 'row',
            padding: SIZES.padding / 2,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              width: '60%',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: COLORS.lightGray,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: SIZES.base,
              }}
            >
              <Image
                source={icons.investment}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: COLORS.black,
                }}
              />
            </View>
            <View>
              <Text numberOfLines={1} style={{ ...FONTS.h3, color: COLORS.black }}>{
                item.admin? item?.name: item?.user?.name 
              } 
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  overflow: 'hidden',
                  ...FONTS.body5,
                  flexWrap: 'wrap',
                  color: COLORS.darkgray,
                }}
              >
                {  item.admin? item?.contribution: item?.contribution_amount }  {route.params.food.currency} 
              </Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
  {(!item.admin && route.params.food.owner._id == JSON.parse(token)?.user?.user?.userId) ? (
    item.admission_req == 'ACCEPTED' ? (
      <>
        <Text style={{ ...FONTS.h5, color: COLORS.red }}>+0% interret</Text>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={icons.calendar}
            style={{
              width: 12,
              height: 12,
              tintColor: COLORS.darkgray,
              marginRight: 7,
              marginTop: 3,
            }}
          />
          <Text style={{ marginBottom: SIZES.base, color: COLORS.darkgray, ...FONTS.body5 }}>
            {item.date}
          </Text>
        </View>
      </>
    ) : item.admission_req == 'REJECTED' ? (
      <Text style={{ ...FONTS.h5, color: COLORS.red }}>Rejeté</Text>
    ) : (
      <Block row space="between">
        <TouchableOpacity onPress={() => handleAcceptReject(item)}>
          {isLoading ? (
            <></>
          ) : (
            <Ionicons name="close-circle" size={40} color={COLORS.peach} />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleAcceptReq(item)}>
          {isLoading ? (
            <></>
          ) : (
            <Ionicons name="checkmark-circle" size={40} color={COLORS.darkgreen} />
          )}
        </TouchableOpacity>
      </Block>
    )
  ) : item.admission_req == 'PENDING' ? (
    <>
      <Text style={{ ...FONTS.h5, color: COLORS.red }}>En attente</Text>
    </>
  ) : (
    <>
      <Text style={{ ...FONTS.h5, color: COLORS.red }}>+0% interret</Text>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={icons.calendar}
          style={{
            width: 12,
            height: 12,
            tintColor: COLORS.darkgray,
            marginRight: 7,
            marginTop: 3,
          }}
        />
        <Text style={{ marginBottom: SIZES.base, color: COLORS.darkgray, ...FONTS.body5 }}>
          {item.date}
        </Text>
      </View>
    </>
  )}
</View>

          
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Block flex={1}>
        <Block style={{ height: 180 }}>
          {renderImages()}
          {renderScrollIndicator()}
        </Block>
        <Block
          p={20}
          style={{
            backgroundColor: 'white',
            marginHorizontal: '5%',
            width: '90%',
            borderRadius: 10,
            elevation: 2,
            marginTop: -20,
          }}
        >
          <Text center numberOfLines={1} size={20} bold>
            {route.params.food.name}
          </Text>
          {
            // "PENDING","SUBMITED", "REJECTED", "ACCEPTED", "BANNED"
            route.params.food.status == "PENDING"?
              <Text color={COLORS.red} center>[Bruillon]</Text>:
            route.params.food.status == "SUBMITED"?
              <Text color={COLORS.red} center>[en attente de validation]</Text>:
              <Text color={COLORS.darkgreen} center>[Validé]</Text>
          }
    
          <Text bold center>Du {dateStart.getDate()}/{dateStart.getMonth() + 1}/{dateStart.getFullYear().toString().substr(-2) } 
          {`  au `} {dateEnd.getDate()}/{dateEnd.getMonth() + 1}/{dateEnd.getFullYear().toString().substr(-2)} </Text>
          <Text center>Prix total</Text>
          <Text bold size={30} center color={COLORS.peach}>
            {route.params.food.amount}  {route.params.food.currency} 
          </Text>

          <Block>
            <Block row space="between">
              <TouchableOpacity onPress={()=> 
                {
                  console.log('Images');
                  navigation.navigate('ShowImages', { images: route.params.food.images})
                }}>
                <Block row center style={styles.round}>
                    <Ionicons name="md-image" color={COLORS.peach} size={20} />
                    {/* <Text numberOfLines={1}> { route.params.food.membres.length} membres</Text> */}
                    <Text style={{marginLeft: 5}} numberOfLines={1}>Voir images</Text>
                </Block>
              </TouchableOpacity>


              <Block row center style={styles.round}>
                <Ionicons name="md-time" color={COLORS.peach} size={20} />
                <Text numberOfLines={1}> {daysLeft} Jours restent</Text>
              </Block>
            </Block>

            <Block center m_t={10}>
              <ProgressBar
                progress={0}
                color={MD3Colors.error50}
                style={{ width: SIZES.width / 1.4, height: SIZES.base }}
              />
            </Block>
            <Block m_t={5} row space="between">
              <Text numberOfLines={1} semibold size={16}>
                0% Investisseurs
              </Text>
              <Text numberOfLines={1} semibold size={16}>
              {route.params.food.initialAmount} {route.params.food.currency}  reuni
              </Text>
            </Block>
            <Block>
              <Block row space="between">
                <Text numberOfLines={1} semibold>
                  Le coût total de production:
                </Text>
                <Text> {totAmount} {route.params.food.currency} </Text>
              </Block>

              <Block row space="between">
                <Text numberOfLines={1} semibold>
                  Le coût total de Revient:
                </Text>
                <Text> 0 {route.params.food.currency} </Text>
              </Block>
            </Block>
            {
              JSON.parse(token)?.user.user.username === route.params.food.owner.username? 
              <Block row space="between" m_t={10}>
              {/* owner */}
             {
              route.params.food.status == 'PENDING'?
              <>
                <Button textColor="#fff" elevated buttonColor={COLORS.lightBlue} onPress={()=>
              {
                // console.log("route.params.food", route.params.food);
                 navigation.navigate('EditProduct', { owner: JSON.parse(token)?.user?.user?.userId,
                  username: JSON.parse(token)?.user?.user?.username, productService: route.params.food });
              }}>
                Modifier
              </Button>

              <Button textColor="#fff" elevated buttonColor={COLORS.peach} onPress={()=> showModalDel()}>
                Supprimer
              </Button>

              <Button textColor="#fff" elevated buttonColor={COLORS.darkgreen} onPress={()=> showModalSoumettre()}>
                Soumettre
              </Button>
              </>:<></>
             }
              
            </Block>
            :
            <Block row space="between" m_t={10}>
              {/* other */}
              {
                route.params.food.membres.some(member => member?.user?._id == JSON.parse(token)?.user?.user?.userId)?
              <>
              <Button textColor="#fff" elevated buttonColor={COLORS.peach} onPress={()=> showModalQuitter()}>
                Quitter
              </Button>

              {
                 route.params.food.membres.find(member => member?.admission_req == 'ACCEPTED')? <Button textColor="#fff" elevated buttonColor={COLORS.darkgreen} onPress={()=> showModalContribuer()}>
                  Contribuer
                </Button>:
                <></>
              }

              </> :
               <Button textColor="#fff" elevated buttonColor={COLORS.purple} onPress={()=> showModalAdhesion()} >
               Demande d'Adhesion
             </Button>
              }
             
            </Block>
            }

          </Block>
        </Block>

        <Block p={20} style={{ zIndex: -101 }}>
          <Text color={COLORS.darkgray} numberOfLines={expanded ? undefined : 2} black>
            {route.params.food.detail}
          </Text>
          {route.params.food.detail.length > 50 && (
            <Text bold color={COLORS.blue} onPress={toggleExpanded}>
              {expanded ? 'Voir moins' : 'Voir plus'}
            </Text>
          )}
          <Block mt={5}>
            {stars(route.params.food.stars.length)}
          
          </Block>
        </Block>

        <Block p_l={20} p_r={20}>
          <Text bold numberOfLines={1}>
          MEMBRES ({route.params.food.membres.length + 1})
          </Text>

          {
            renderItem({ admin: true, name: route.params.food.owner.name+" (Admin)", 
            contribution: route.params.food.initialAmount, 
            date: format(new Date(route.params.food.timestamp), 'dd MMMM yyyy', { locale: fr }) })
          }

          {
            membresToShow.map((membre, index) => renderItem(membre))

          }

          {/* {
            route.params.food.membres?.length >=1?
            //route.params.food.membres.map((membre, index)=> renderItem(membre) )
            membresToShow.map((membre, index) => renderItem(membre))

            :<></>
          } */}

          {/* <Text bold color={COLORS.blue}>
            {expanded ? 'Voir moins' : 'Voir plus'}
          </Text> */}
          {route.params.food.membres?.length > 1 && ( // Show "Voir plus" only if there are more than 2 users
            <TouchableOpacity onPress={toggleExpansion}>
              <Text bold color={COLORS.blue}>
                {expandedMembre ? 'Voir moins' : 'Voir plus'}
              </Text>
            </TouchableOpacity>
          )}
        </Block>

        <Block p={20}>
          <Text bold numberOfLines={1}>
            CALCUL D'INVESTISSEMENT
          </Text>
          <Text>Projection du retour sur investissement</Text>

          <Svg style={{ width: '100%' }}>
            <VictoryChart domainPadding={50} theme={VictoryTheme.material}>
              <VictoryBar
                style={{ data: { fill: COLORS.purple } }}
                categories={{
                  x: [`Coût ${route.params.food.currency}`, 
                  `${route.params.food.currency} Dispo`,
                  `${route.params.food.currency} Interet`,
                  `Interet ${route.params.food.currency}`
                ],
                }}
                data={[
                  { x: `Coût ${route.params.food.currency}`, y: route.params.food.amount },
                  { x:  `${route.params.food.currency} Dispo`, y: route.params.food.initialAmount },
                  { x:  `${route.params.food.currency} Interet`, y: route.params.food.initialAmount },
                  { x: `Interet ${route.params.food.currency}`, y: sliderValue },
                ]}
              />
            </VictoryChart>
          </Svg>

          {/*Slider with max, min, step and initial value*/}
          <Slider
            maximumValue={route.params.food.amount}
            minimumValue={0}
            minimumTrackTintColor="#307ecc"
            maximumTrackTintColor="#000000"
            step={50}
            value={sliderValue}
            onValueChange={(sliderValue) => setSliderValue(sliderValue)}
          />

          <Text bold numberOfLines={2} style={{ color: 'black' }}>Vous investissez la somme de : {sliderValue} {route.params.food.currency}</Text>
        </Block>

        <Block p_l={20} p_r={20}>
          <Text bold numberOfLines={1}>
            TIMELINE
          </Text>
          <Timeline
            style={styles.list}
            data={outputTimeLine}
            circleSize={20}
            circleColor="rgb(45,156,219)"
            lineColor="rgb(45,156,219)"
            timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
            timeStyle={{
              textAlign: 'center',
              backgroundColor: '#ff9797',
              color: 'white',
              padding: 5,
              borderRadius: 13,
            }}
            descriptionStyle={{ color: 'gray' }}
            options={{
              style: { paddingTop: 5 },
            }}
            columnFormat="single-column-left"
          />

          {/* <Text bold color={COLORS.blue}>
            {expanded ? 'Voir moins' : 'Voir plus'}
          </Text> */}
        </Block>

        <Block p_l={20} p_r={20}>
          <Text bold numberOfLines={1}>
            BESOIN D'AIDE?
          </Text>
        </Block>

        <BottomSheet
          visible={visible}
          onBackButtonPress={toggle}
          onBackdropPress={toggle}
          containerStyle={styles.bottomSheetContainer}
        >
          <Block style={styles.bottomSheetContent}>
            <Text style={styles.bottomSheetTitle}>Le coût total de production</Text>
            <Text style={styles.bottomSheetText}>
              Il permet de prendre en compte tous les éléments de coût associés à la fabrication,
              l'achat ou la prestation d'un bien ou d'un service.
            </Text>
            <Block style={styles.card}>
              <ScrollView
                //ref={scrollRef}
                contentContainerStyle={styles.scrollContentContainer}
                showsVerticalScrollIndicator={false}
              >
                {couts
                  .filter((v, k) => v.prodId == route.params.food._id)
                  .map((food, index) => {
                    return <CoutScreen key={index} item={food} count={index + 1} />;
                  })}
              </ScrollView>
            </Block>
            {renderFAaddCout()}
          </Block>
        </BottomSheet>
        
      </Block>
      {renderFloatingBlock()}

      {/* Delete Prod/Serv */}
      <Modal
        style={{ zIndex: 99 }}
        visible={visibleDel}
        onDismiss={hideModalDel}
        contentContainerStyle={[containerStyle, { zIndex: 999 }]} // Set a higher value for the z-index
      >
        <Card style={{ padding: 10 }}>
          <Card.Title
            titleStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }}
            title="ATTENTION!" 
          />
          <Card.Content>
            <Text variant="titleLarge">Voulez-vous vraiment supprimer le {route.params.food.type }
              {" "}{ route.params.food.name}?</Text>
          </Card.Content>
          <Card.Actions style={{ marginTop: 15 }}>
            <Button onPress={hideModalDel}>Annuler</Button>
            <Button buttonColor={COLORS.red}
             onPress={() => {
              hideModalDel()
              handleDelete()
            }} >Supprimer</Button>
          </Card.Actions>
        </Card>
      </Modal>

      {/* Soumettre */}
      <Modal
        style={{ zIndex: 99 }}
        visible={visibleSoumettre}
        onDismiss={hideModalSoumettre}
        contentContainerStyle={[containerStyle, { zIndex: 999 }]} // Set a higher value for the z-index
      >
        <Card style={{ padding: 10 }}>
          <Card.Title
            titleStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }}
            title="ATTENTION!" 
          />
          <Card.Content>
            <Text variant="titleLarge">Voulez-vous vraiment Soumettre le {route.params.food.type }
              {" "}{ route.params.food.name}?</Text>

              <Text color={COLORS.peach} variant="titleLarge">Ceci implique que votre {route.params.food.type} {" "} 
              sera soumis a l'equipe de BOMOKO sera etudier soigneusement pendant deux ou trois jours avant de 
              de le valider ou le rejeter dans la plateforme!</Text>
          </Card.Content>
          <Card.Actions style={{ marginTop: 15 }}>
            <Button onPress={hideModalSoumettre}>Annuler</Button>
            <Button buttonColor={COLORS.purple}
             onPress={() => {
              hideModalDel()
              handleSoumettre()
            }} >Soummetre</Button>
          </Card.Actions>
        </Card>
      </Modal>


      {/* Adhesion */}
      <Modal
        style={{ zIndex: 99 }}
        visible={visibleAdhesion}
        onDismiss={hideModalAdhesion}
        contentContainerStyle={[containerStyle, { zIndex: 999 }]} // Set a higher value for the z-index
      >

        <Card style={{ padding: 10 }}>
          <Card.Title
            titleStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }}
            title="ATTENTION!" 
          />
          {
            !token?
          <>
          <Card.Content>
            <Text variant="titleLarge">Vous devez d'abord vous connecter</Text>
          </Card.Content>
          <Card.Actions style={{ marginTop: 15 }}>
            <Button onPress={hideModalAdhesion}>Annuler</Button>
            <Button buttonColor={COLORS.red}
             onPress={() => {
              hideModalAdhesion()
              navigation.navigate('AuthScreen')
            }} >Connecter</Button>
          </Card.Actions>
          </>
              :
            <>
            <Card.Content>
            <Text variant="titleLarge">Voulez-vous vraiment Faire parti des insvesitteurs du {route.params.food.type }
              {" "}{ route.params.food.name}?</Text>

              <Text color={COLORS.peach} variant="titleLarge">Ceci implique que vous pouvez contribuer une somme
              d'argent et ganger apres l'exercice! Votre demande d'adhesion sera validee par le proprietaire du {route.params.food.type }
              {" "}{ route.params.food.name}</Text>
          </Card.Content>
          <Card.Actions style={{ marginTop: 15 }}>
            <Button onPress={hideModalAdhesion}>Annuler</Button>
            <Button buttonColor={COLORS.purple}
             onPress={() => {
              hideModalDel()
              handleAdhesion()
            }} >Adherer</Button>
          </Card.Actions>
            </>
            }
         
        </Card>
      </Modal>


      {/* Quitter */}
      <Modal
        style={{ zIndex: 99 }}
        visible={visibleQuitter}
        onDismiss={hideModalQuitter}
        contentContainerStyle={[containerStyle, { zIndex: 999 }]} // Set a higher value for the z-index
      >
        <Card style={{ padding: 10 }}>
          <Card.Title
            titleStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }}
            title="ATTENTION!" 
          />
          <Card.Content>
            <Text variant="titleLarge">Voulez-vous vraiment quitter le groupe des insvesitteurs du {route.params.food.type }
              {" "}{ route.params.food.name}?</Text>

             
          </Card.Content>
          <Card.Actions style={{ marginTop: 15 }}>
            <Button onPress={hideModalQuitter}>Annuler</Button>
            <Button buttonColor={COLORS.peach}
             onPress={() => {
              hideModalDel()
              //navigation.navigate('AuthScreen')
            }} >Quitter</Button>
          </Card.Actions>
        </Card>
      </Modal>


      {/* Contribuer */}
      <Modal
        style={{ zIndex: 99 }}
        visible={visibleContribuer}
        onDismiss={hideModalContribuer}
        contentContainerStyle={[containerStyle, { zIndex: 999 }]} // Set a higher value for the z-index
      >
        <Card style={{ padding: 10 }}>
          <Card.Title
            titleStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }}
            title="ATTENTION!" 
          />
          <Card.Content>
            <Text variant="titleLarge">Voulez-vous vraiment contribuer une somme d'argent et ganger apres l'exercice du {route.params.food.type }
              {" "}{ route.params.food.name}?</Text>

              <Block m_t={15} center >
                <TextInput
                  label="Somme"
                  value={0}
                  //onChangeText={}
                  mode="outlined"
                  style={[styles.input, { width: '100%', marginTop: 10 }]}
                  required
                  inputMode="numeric"
                />

                <TextInput
                  label="Commentaire"
                  value={''}
                  //onChangeText={}
                  mode="outlined"
                  style={[styles.input, { width: '100%' }]}
                  required
                />
              </Block>
             
          </Card.Content>
          <Card.Actions style={{ marginTop: 15 }}>
            <Button onPress={hideModalContribuer}>Annuler</Button>
            <Button buttonColor={COLORS.darkgreen}
             onPress={() => {
              hideModalDel()
              //navigation.navigate('AuthScreen')
            }} >Contribuer</Button>
          </Card.Actions>
        </Card>
      </Modal>

      <Snackbar
          visible={visibleSnackBar}
          onDismiss={onDismissSnackBar}
          style={{ backgroundColor: COLORS.peach}}
          wrapperStyle={{ bottom: 30 }}
          action={{
            label: 'Annuler',
            onPress: () => {
              // Do something
            },
          }}
        >
          {error}
        </Snackbar>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  round: {
    borderRadius: 10,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.lightGray2,
  },
  input: {
    marginRight: 10,
  },
  detailsD: {
    elevation: 2,
    padding: 10,
  },
  floatBlock: {
    backgroundColor: COLORS.white,
    padding: 10,
    elevation: 5,
    position: 'relative',
    //top: SIZES.height - 120,
    margin: SIZES.base * 2,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },

  floatBlockFA: {
    //backgroundColor: COLORS.white,
    padding: 10,
    position: 'absolute',
    bottom: 0,
    margin: SIZES.base * 2,
    //borderRadius: 10,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderTopColor: COLORS.black,
    borderTopWidth: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#fff',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheetContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    //height: 200,
  },
  bottomSheetContent: {
    backgroundColor: 'white',
    padding: 16,
    //height: 250,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bottomSheetText: {
    fontSize: 16,
    marginBottom: 16,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  buttonSuccess:{
    backgroundColor: COLORS.darkgreen
  },
  buttonError:{
    backgroundColor: COLORS.peach
  }
});

export default Details;
