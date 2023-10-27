import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  Linking,
  TextInput as ReactTextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Svg } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Block from './Block';
import Text from './Text';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import { Button, Card, Divider, IconButton, MD3Colors, Modal, ProgressBar, Snackbar, TextInput } from 'react-native-paper';
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
import { TouchableWithoutFeedback } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import Transaction from '../CreanceDette/Transaction';
import { FlatList } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { useFocusEffect } from '@react-navigation/native';

const Details = ({ route, navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const { error, isLoading } = useSelector((state) => state.products);
  const [foodDetails, setFoodDetails] = useState(route.params.food);

  const [msgSuccess, setMsgSuccess] = useState("Validation avec success");
  const [msgError, setMsgError] = useState("Une erreur s'est produite!");

  const [statusSuccess, setStatusSuccess] = useState(false);
  const [statusError, setStatusError] = useState(false);

  const [visible, setVisible] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedAmount, setEditedAmount] = useState('');
  const [totAmount, setTotAmount] = useState(
    foodDetails?.couts.reduce((sum, cout) => sum + cout.amount, 0)
  );

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
  ? foodDetails?.membres
  : foodDetails?.membres?.slice(0, 1); // Show the first two users if not expanded

  const [dateStart, setDateStart] = useState(new Date(route.params.food.startDate));
  const [dateEnd, setDateEnd] = useState(new Date(route.params.food.endDate));

  const [interestValid, setInterestValid] = useState(true); // Validation state for interest
  const [interest, setInterest] = useState('');

  const [currentItem, setCurrentItem] = useState(false)
  const [selectedItem, setSelectedItem] = useState([]);


  const [openCout, setOpenCout] = useState(false)
  const [openReject, setOpenReject] = useState(false)
  const [openAccept, setOpenAccept] = useState(false)
  const [openDetailsTrans, setOpenDetailsTrans] = useState(false)
  const [openContrib, setOpenContrib] = useState(false)
  
  const [loading, setLoading] = useState(true);

  const [connectedUser, setConnectedUser] = useState((route.params.connectedUser));  

  const BackdropElement = useCallback(
    (backdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        opacity={0.7}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const bottomSheetCout = useRef(null);
  const bottomSheetAccept = useRef(null);
  const bottomSheetReject = useRef(null);
  const bottomSheetDetailsTrans = useRef(null);
  const bottomSheetContrib = useRef(null);

  const snapPoints = useMemo(() => ["28%","50%", '70%', '80%', '90%'], []);

  const openModalCout = useCallback(() => {
    bottomSheetCout.current?.present();
    setTimeout(() => {
      setOpenCout(true);
    }, 5);
  }, []);

  const handleCloseCout = useCallback(() => {
    bottomSheetCout.current?.close();
  }, []);

  const openModalAccept = useCallback(() => {
    bottomSheetAccept.current?.present();
    setTimeout(() => {
      setOpenAccept(true);
    }, 5);
  }, []);

  const handleCloseAccept = useCallback(() => {
    bottomSheetAccept.current?.close();
  }, []);

  const hideModalAccept = () => handleCloseAccept();


  const openModalReject = useCallback(() => {
    bottomSheetReject.current?.present();
    setTimeout(() => {
      setOpenReject(true);
    }, 5);
  }, []);

  const handleCloseReject = useCallback(() => {
    bottomSheetReject.current?.close();
  }, []);

  const hideModalReject = () => handleCloseReject();


  const openModalDetailsTrans = useCallback(() => {
    bottomSheetDetailsTrans.current?.present();
    setTimeout(() => {
      setOpenDetailsTrans(true);
    }, 5);
  }, []);

  const handleCloseDetailsTrans = useCallback(() => {
    bottomSheetDetailsTrans.current?.close();
  }, []);

  const hideModalDetailsTrans = () => handleCloseDetailsTrans();

  const openModalContrib = useCallback(() => {
    bottomSheetContrib.current?.present();
    setTimeout(() => {
      setOpenContrib(true);
    }, 5);
  }, []);

  const handleCloseContrib = useCallback(() => {
    bottomSheetContrib.current?.close();
  }, []);

  const hideModalContrib = () => handleCloseContrib();

  useFocusEffect(
    useCallback(() => {
      console.log("route.params.food._id", route.params.food._id);
      const getTokenFromAsyncStorage = async () => {
        try {
          const storedToken = await AsyncStorage.getItem('user');
          setToken(storedToken);
          // reloadScreen(value);
  
          // Data found, reload the screen
          // reloadScreen(value);
        } catch (error) {
          console.error('Error reading token from AsyncStorage:', error);
        }
      };
  
      getTokenFromAsyncStorage();
  
      const fetchUserData = async () => {
        const netInfo = await NetInfo.fetch();
        
        if (!netInfo.isConnected) {
          setLoading(false);
          Alert.alert(
            'Pas de connexion Internet',
            'Veuillez vérifier votre connexion Internet et réessayer.'
          );
          return;
        }
  
        fetch(`https://bomoko-backend.onrender.com/api/product/${route.params.food._id}`)
          .then(response => response.json())
          .then(data => {
            setFoodDetails(data);

            setLoading(false);
          })
          .catch(error => console.error('Error fetching user details:', error));
      };
  
      fetchUserData();

      
      // Return a cleanup function
      return () => {
        // You can perform cleanup here if needed
        console.log('Cleanup function');
      };
    }, []) // Empty dependency array to run this effect only once when the screen mounts
  );
  
  // useEffect(() => {
    
  // }, []);
 // Function to handle screen reload
 const reloadScreen = (value) => {
  // You can put your screen reload logic here
  console.log('Screen reloaded');
  const parsedValue = JSON.parse(value);
  if (parsedValue.user && parsedValue.user.user) {
    setConnectedUser(parsedValue.user.user);
    setLoading(false)
    console.log('Async State:', parsedValue.user.user);
  }
};

  const dispatch = useDispatch();

  const handleContactSupport = () => {
    // Replace with your support email or contact form link
    const supportEmail = 'info@afrintech.org';
    Linking.openURL(`mailto:${supportEmail}`);
  };

  const onPressTransaction = (item) => {
    console.log("On press", item);
    setSelectedItem(item)
    openModalDetailsTrans();
  }

   
  const handleInterestChange = (text) => {
    const parts = (100 - (foodDetails.initialAmount / (foodDetails.amount / 100).toFixed(0))).toFixed(0);

    const numericValue = parseFloat(text);
    if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= parts) {
      setInterestValid(true); // Interest is valid
    } else {
      setInterestValid(false); // Interest is not valid
    }
    setInterest(text); // Update interest value
  };

  // Date Calculation
  const targetStartDate = new Date(foodDetails.startDate);
  const targetEndDate = new Date(foodDetails.endDate);
  const today = new Date();
  const timeDifference = targetStartDate - today;
  const timeTotalExerc = targetEndDate - targetStartDate;
  const timeDiffExerc = targetEndDate - today;

  // Calculate the number of milliseconds in a day
  const millisecondsInDay = 24 * 60 * 60 * 1000;

  // Calculate the number of days left
  const daysLeft = Math.ceil(timeDifference / millisecondsInDay);
  const daysTotalExc = Math.ceil(timeTotalExerc / millisecondsInDay);

  console.log(`Days left: ${daysLeft}`);

  // Timeline
  const outputTimeLine = foodDetails?.timeline.map(item => {
    const formattedDate = new Date(item.timestamp).toLocaleDateString('en-GB').replace(/\//g, '-');

    return {
      time: formattedDate,
      title: item.title,
      description: item.details,
      
    };
  });

  // Pushing the additional object to the output array
  const mydateEnd = new Date(targetEndDate);

  outputTimeLine.unshift({
    time:`${mydateEnd.toLocaleDateString('en-GB').replace(/\//g, '-')}`,
    title: 'Fin probable de la Campagne',
    description: `Probablement la campagne de collecte de fonds prendra fin apres ${daysTotalExc} jours de la date de debut de la collecte`,
    lineColor: COLORS.peach,
    circleSize: 30,
    circleColor: COLORS.peach,
    dotColor: COLORS.black,
    innerCircle: 'dot',
  });

  const [expanded, setExpanded] = useState(false);

  const [sliderValue, setSliderValue] = useState(foodDetails.amount/100);
  // slider * 100 / interet
  const [interet, setInteret] = useState((sliderValue *5 )/100);

  // function toggle() {
  //   setVisible((visible) => !visible);
  // }

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

  const renderBottomCout = ()=> (
    <BottomSheetModal
      ref={bottomSheetCout}
      index={4}
      backdropComponent={BackdropElement}
      snapPoints={snapPoints}
      backgroundStyle={{ borderRadius: responsiveScreenWidth(5), backgroundColor:'#eee'}}
      onDismiss={() => setOpenCout(false)}
    >
      <BottomSheetScrollView>

      <Block style={styles.bottomSheetContent}>
            <Text style={styles.bottomSheetTitle}>Le coût total de production</Text>
            <Text style={styles.bottomSheetText}>
              Il permet de prendre en compte tous les éléments de coût associés à la fabrication,
              l'achat ou la prestation d'un bien ou d'un service.
            </Text>
            <View style={[styles.card,{ marginBottom: foodDetails.owner._id == connectedUser?.userId? 190 : 100} ]}>
             {
                  foodDetails?.couts && foodDetails?.couts
                  .map((food, index) => {
                    return <CoutScreen admin={foodDetails.owner._id == connectedUser?.userId}
                    totAmount={totAmount} handleUpdateItem={handleUpdateItem} handleTrash={handleTrash} currency={foodDetails.currency} key={index} item={food} count={index + 1} />;
                  })}
            </View>
           
          </Block>
          </BottomSheetScrollView>
        
              {
              foodDetails.owner._id == connectedUser?.userId?
              renderFAaddCout(): <></>
            }

    </BottomSheetModal>
  )

  const renderBottomContrib= ()=> (
    <BottomSheetModal
      ref={bottomSheetContrib}
      index={1}
      backdropComponent={BackdropElement}
      snapPoints={snapPoints}
      backgroundStyle={{ borderRadius: responsiveScreenWidth(5), backgroundColor:'#eee'}}
      onDismiss={() => setOpenContrib(false)}
    >
      <BottomSheetScrollView style={{ padding: 17}}>
      <Block row space='between' >
          <Block >
            <Text bold h2>CONTRIBUTION</Text>
            <Text color={COLORS.blue}>{`Achat de parts`}</Text>
          </Block>
          <TouchableOpacity onPress={()=> hideModalContrib()}>
            <IconButton
              icon="close"
              iconColor={COLORS.red}
              size={40}
            />
          </TouchableOpacity>
        </Block>
        
        <Block p_b={10}>
          <Text>{(100 - (foodDetails.initialAmount / (foodDetails.amount / 100).toFixed(0))).toFixed(0)}  parts disponibles</Text>

          <ReactTextInput
              style={[styles.inputText, !interestValid && styles.inputError]} // Apply red border if not valid
              value={interest}
              onChangeText={handleInterestChange}
              keyboardType="numeric"
              placeholder="Nombre de parts"
            />
            {!interestValid && (
              <Text style={styles.errorText}>Entre 1 et {(100 - (foodDetails.initialAmount / (foodDetails.amount / 100).toFixed(0))).toFixed(0)} parts</Text>
            )}

            {interest &&interestValid && (
              <Text style={styles.label}>Voulez-vous acheter {parseInt(interest)} parts a {
              parseFloat(parseFloat(interest) * (foodDetails.amount / 100) ).toFixed(2)} {foodDetails.currency}?
              </Text>
            )}


          <Button mode='contained' disabled={!interestValid}  style={{marginTop:10}} onPress={()=> {
            setInterest(null);
            setInterestValid(true);
            hideModalContrib();
            navigation.navigate('ConfirmPayment', {
              somme: parseFloat(parseFloat(interest) * (foodDetails.amount / 100) ).toFixed(2),
              nombreParts: parseInt(interest),
              prixParts: parseInt(foodDetails.amount / 100),
              connectedUser:  route.params.connectedUser,
              motif:  `Achat de ${parseInt(interest)} parts a ${parseFloat(parseFloat(interest) * (foodDetails.amount / 100) ).toFixed(2)} ${foodDetails.currency}?`,
              titre: 'Confirmez votre payment',
              button:'Verifier && confirmer',
              //avec: route.params.avec,
              type:'achat'

            })
          }} >ACHETER</Button>
          </Block>

      
      </BottomSheetScrollView>

    </BottomSheetModal>
  )

  const renderBottomAccept = (item) => (
    <BottomSheetModal
      ref={bottomSheetAccept}
      index={0}
      backdropComponent={BackdropElement}
      snapPoints={snapPoints}
      backgroundStyle={{ borderRadius: responsiveScreenWidth(5), backgroundColor:'#eee'}}
      onDismiss={() => setOpenAccept(false)}
    >
     <BottomSheetScrollView style={{ padding: 17}}>
      <Block row space='between' >
          <Block >
            <Text bold h2>ACCEPTER</Text>
            <Text color={COLORS.blue}>{`Accepter la demande d'un investisseur`}</Text>
          </Block>
          <TouchableOpacity onPress={()=> hideModalAccept()}>
            <IconButton
              icon="close"
              iconColor={COLORS.red}
              size={40}
            />
          </TouchableOpacity>
        </Block>
        <Button buttonColor={COLORS.darkgreen} disabled={isLoading} mode='contained' style={{marginTop:10}} onPress={()=> {
          handleAcceptReq(currentItem)
        }}>Accepter</Button>

      
      </BottomSheetScrollView>

    </BottomSheetModal>
  )

  const renderBottomReject = (item) => (
    <BottomSheetModal
      ref={bottomSheetReject}
      index={0}
      backdropComponent={BackdropElement}
      snapPoints={snapPoints}
      backgroundStyle={{ borderRadius: responsiveScreenWidth(5), backgroundColor:'#eee'}}
      onDismiss={() => setOpenReject(false)}
    >
      <BottomSheetScrollView style={{ padding: 17}}>
      <Block row space='between' >
          <Block >
            <Text bold h2>REFUSER</Text>
            <Text color={COLORS.blue}>{`Rejeter la demande d'un investisseur`}</Text>
          </Block>
          <TouchableOpacity onPress={()=> hideModalReject()}>
            <IconButton
              icon="close"
              iconColor={COLORS.red}
              size={40}
            />
          </TouchableOpacity>
        </Block>
        <Button buttonColor={COLORS.peach}  disabled={isLoading} mode='contained' style={{marginTop:10}} onPress={()=> {
          handleReject(currentItem)
        }}>Rejeter</Button>

      </BottomSheetScrollView>

    </BottomSheetModal>
  )

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
        {foodDetails.images.map((image, index) => (
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

  const handleAddCout = async () => {
    try{
      if (!editedName || !editedAmount) {
        // Throw UI error if any field is missing
        Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
        setMsgError("Veuillez remplir tous les champs obligatoires");
        setMsgSuccess("");
        setStatusSuccess(false)
        setStatusError(true)
        onToggleSnackBar();

        return;
      }

      const coutObj = {
        name: editedName,
        amount: editedAmount,
      };

      dispatch(soumettreProduct({
        ...foodDetails,
        id: foodDetails._id,
        couts: [
          ...foodDetails.couts,
          coutObj,
        ]
      }));

      foodDetails.couts = [
         ...foodDetails.couts,
        coutObj,
      ]

      setEditedName('');
      setEditedAmount('');
      // Check if the cout was updated successfully
      setStatusError(!error && !isLoading);
      setStatusSuccess(!error && !isLoading);
      if (!statusError && statusSuccess) {
        setMsgSuccess("Cout ajoute avec success");
        setMsgError("");
        setStatusSuccess(true)
        setStatusError(false)
        onToggleSnackBar();

        setTotAmount(totAmount + parseFloat(editedAmount));

      }else {
        console.log('Error ++++++')
        setMsgError("Une Erreur s'est produite lors de l'ajout de cout");
        setMsgSuccess("");
        setStatusSuccess(false)
        setStatusError(true)
        onToggleSnackBar();
      }
    } catch(e){
        console.log('Error //////////', e)
        setMsgError("Une Erreur s'est produite lors de l'ajout de cout");
        setMsgSuccess("");
        setStatusSuccess(false)
        setStatusError(true)
        onToggleSnackBar();
    }
  };

  const handleDelete = async () => {
    try{
      dispatch(delProduct({
        id: foodDetails._id
      }));
      
      // Update state
      setStatusError(!error && !isLoading);
      setStatusSuccess(!error && !isLoading);

      // Check if the product was deleted successfully
      if (!statusError && statusSuccess) {
        setMsgSuccess("Suppression effectuee avec success");
        setMsgError("");
        setStatusSuccess(true);
        setStatusError(false);
        onToggleSnackBar();
      }else {
          setMsgError("Une Erreur s'est produite lors de la suppression");
          setMsgSuccess("");
          setStatusSuccess(false);
          setStatusError(true);
          onToggleSnackBar();
      }
    }
    catch(e){
      setMsgError("Une Erreur s'est produite lors de la suppression");
      setMsgSuccess("");
      setStatusSuccess(false)
      setStatusError(true)
      onToggleSnackBar();
    }
  }

  // Push New LIne into timeline array
  // Change Status
  // "PENDING","SUBMITED", "REJECTED", "ACCEPTED", "BANNED"
  
  const handleSoumettre = async () => {

    try{
      // Pushing the additional object to the output array
      const today = new Date();

      const outputTimeLineSoum = {
        time:`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear().toString().substr(-2)}`,
        title: 'Soumission',
        details: `Votre ${foodDetails.type} a été soumis à l'équipe Afintech et est en attente de validation`
      };

      dispatch(soumettreProduct({
        ...foodDetails,
        id: foodDetails._id,
        status: "SUBMITED",
        timeline: [
          ...foodDetails.timeline,
          outputTimeLineSoum,
        ]
      }));

      // Update state
      setStatusError(!error && !isLoading);
      setStatusSuccess(!error && !isLoading);

      // Check if the user validationhas been made successfully
      if (!statusError && statusSuccess) {
        setMsgSuccess(`Votre ${foodDetails.type} a été soumis avec succès`);
        setMsgError("");
        setStatusSuccess(true);
        setStatusError(false);
        onToggleSnackBar();
      }else {
          setMsgError("Une Erreur s'est produite lors de la soumission");
          setMsgSuccess("");
          setStatusSuccess(false);
          setStatusError(true);
          onToggleSnackBar();
      }
    }
    catch(e){
      setMsgError("Une Erreur s'est produite lors de la soumission");
      setMsgSuccess("");
      setStatusSuccess(false);
      setStatusError(true);
      onToggleSnackBar();
    }
  };

  const handleAcceptReq = async (myUser) => {
    try{
  
      const updatedMembres = foodDetails.membres.map((membre) => {
        if (membre.user._id === myUser.user._id) {
          return {
            ...membre,
            admission_req: 'ACCEPTED',
          };
        }
        return membre;
      });

      dispatch(soumettreProduct({
        ...foodDetails,
        id: foodDetails._id,
        membres: updatedMembres,
      }));
  
       // Update state
      setStatusError(!error && !isLoading);
      setStatusSuccess(!error && !isLoading);

      // Check if the user's rejection has been made successfully
      if (!statusError && statusSuccess) {
        setMsgSuccess(`Accecpte avec success`);
        setMsgError("");
        setStatusSuccess(true);
        setStatusError(false);
        onToggleSnackBar();
      }else {
          setMsgError("Une Erreur s'est produite");
          setMsgSuccess("");
          setStatusSuccess(false);
          setStatusError(true);
          onToggleSnackBar();
      }
    }
    catch(e){
      setMsgError("Une Erreur s'est produite");
      setMsgSuccess("");
      setStatusSuccess(false);
      setStatusError(true);
      onToggleSnackBar();
    }
  };

  const handleReject = async (myUser) => {
    try{
      const updatedMembres = foodDetails.membres.map((membre) => {
        if (membre.user._id === myUser.user._id) {
          return {
            ...membre,
            admission_req: 'REJECTED',
          };
        }
        return membre;
      });

      dispatch(soumettreProduct({
        ...foodDetails,
        id: foodDetails._id,
        membres: updatedMembres,
      }));
  
      setStatusError(!error && !isLoading);
      setStatusSuccess(!error && !isLoading);

      // Check if the product was deleted successfully
      if (!statusError && statusSuccess) {
        setMsgSuccess(`Rejet avec success`);
        setMsgError("");
        setStatusSuccess(true);
        setStatusError(false);
        onToggleSnackBar();
      }else {
          setMsgError("Une Erreur s'est produite");
          setMsgSuccess("");
          setStatusSuccess(false);
          setStatusError(true);
          onToggleSnackBar();
      }
    }
    catch(e){
      setMsgError("Une Erreur s'est produite");
      setMsgSuccess("");
      setStatusSuccess(false);
      setStatusError(true);
      onToggleSnackBar();
    }
  }

  // Add user to prod/serv's memeber array
  // Display "Quitter" button while waiting for Admin Validation
  
  const handleAdhesion = async () => {
    try{
      // Push current user to member array

      // Reuse the soumettreProduct function
      dispatch(soumettreProduct({
        ...foodDetails,
        id: foodDetails._id,
        membres: [
          ...foodDetails.membres,
          {
            user: connectedUser?.userId,
            admission_req: 'PENDING', 
            contribution_amount: 0,
            contribution_status: 'PENDING', 
          }
        ]
      }));

      // Check if the request made successfully
      setStatusError(!error && !isLoading);
      setStatusSuccess(!error && !isLoading);

      // Check if user's request has been made successfully
      if (!statusError && statusSuccess) {
        setMsgSuccess(`Accecpte avec success`);
        setMsgError("");
        setStatusSuccess(true);
        setStatusError(false);
        onToggleSnackBar();
      }else {
          setMsgError("Une Erreur s'est produite");
          setMsgSuccess("");
          setStatusSuccess(false);
          setStatusError(true);
          onToggleSnackBar();
      }
    }
    catch(e){
      setMsgError("Une Erreur s'est produite");
      setMsgSuccess("");
      setStatusSuccess(false);
      setStatusError(true);
      onToggleSnackBar();
    }
  };

  const renderInvestCalculus = () => (
    <Block p={20}>
      <Text bold numberOfLines={1}>
        CALCUL D'INVESTISSEMENT ({foodDetails.currency})
      </Text>
      <Text>Projection du retour sur investissement</Text>

      <Svg style={{ width: '100%' }}>
        <VictoryChart domainPadding={50} theme={VictoryTheme.material} >
          <VictoryBar
            style={{ 
              data: {
                fill: ({ datum }) => {
                  if (datum.x === `Intérêt (${foodDetails.tauxInt}%)`) {
                    return COLORS.primary;
                  } else if (datum.x === `Invest`) {
                    return COLORS.peach;
                  } else if (datum.y > foodDetails.initialAmount) {
                    return COLORS.purple;
                  } else {
                    return COLORS.black;
                  }
                }
              }
            }}
            labels={({ datum }) => `${datum.y} ${foodDetails.currency}`}

            categories={{
              x: [`Total`, 
              `Disponible`,
              `Intérêt (${foodDetails.tauxInt}%)`,
              `Invest`
            ],
            }}
            data={[
              { x: `Total`, y: foodDetails.amount },
              { x:  `Disponible`, y: 
              (foodDetails.initialAmount+foodDetails.membres
                .filter(member => member.contribution_status === "ACCEPTED")
                .reduce((sum, member) => sum + member.contribution_amount, 0))
              },
              { x:  `Intérêt (${foodDetails.tauxInt}%)`, y: interet },
              { x: `Invest`, y: sliderValue },
            ]}
          />
        </VictoryChart>
      </Svg>

      {/*Slider with max, min, step and initial value*/}
      <Slider
        maximumValue={(foodDetails.amount-(foodDetails.initialAmount+foodDetails.membres
          .filter(member => member.contribution_status === "ACCEPTED")
          .reduce((sum, member) => sum + member.contribution_amount, 0)))}
        minimumValue={foodDetails.amount/100}
        minimumTrackTintColor="#307ecc"
        maximumTrackTintColor="#000000"
        step={foodDetails.amount/100}
        value={sliderValue}
        onValueChange={(sliderValue) => {
          setInteret((sliderValue * foodDetails.tauxInt )/100)
          setSliderValue(sliderValue)}
        }
      />

      <Text bold style={{ color: 'black' }}>
        Vous investissez la somme de : {sliderValue} {foodDetails.currency}.
        Ceci équivaut à {sliderValue/(foodDetails.amount/100)} parts de {foodDetails.amount/100} {foodDetails.currency} chacun.
        Et votre Intérêt de (${foodDetails.tauxInt}%) est de {interet} {foodDetails.currency} après l'exercice. </Text>
        
    </Block>
  )

  const renderTimeline = () => (
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
  )

  const handleUpdateItem = (item,  editedAmount1, editedName1) => {
    // Handle update item event
    try {
      // Throw UI alert for updating an item
      Alert.alert(
        'Attention',
        `Êtes-vous sûr de vouloir mettre à jour ${item.name} ?`,
        [
          {
            text: 'Annuler',
            style: 'cancel',
          },
          {
            text: 'Mettre à jour',
            style: 'default',
            onPress: async () => {
              // Function to execute when the user presses the "Mettre à jour" button
              console.log('Élément mis à jour', item);

              const updatedCouts = foodDetails.couts.map((cout) => {
                if (cout._id === item._id) {
                  return {
                    ...cout,
                    name: editedName1,
                    amount: editedAmount1,
                  };
                }
                return cout;
              });

              dispatch(soumettreProduct({
                ...foodDetails,
                id: foodDetails._id,
                couts: updatedCouts,
              }));
              

              // Update state
              setStatusError(!error && !isLoading);
              setStatusSuccess(!error && !isLoading);

              // Check if the item was updated successfully
              if (!statusError && statusSuccess) {
                setMsgSuccess(`Mis à jour avec succèss`);
                setMsgError("");
                setStatusSuccess(true);
                setStatusError(false);
                onToggleSnackBar();

                setTotAmount(totAmount + parseFloat(editedAmount1) - parseFloat(foodDetails.couts.find(cout => cout._id === item._id).amount));

                // TODO : update all foodDetails => foodDetails.couts = updatedCouts;
                setFoodDetails({...foodDetails, 'couts': updatedCouts}); // TODO: To test if is working well

              }else {
                  setMsgError("Erreur de mise à jour");
                  setMsgSuccess("");
                  setStatusSuccess(false);
                  setStatusError(true);
                  onToggleSnackBar();
              }
            },
          },
        ]
      );
    } catch (e) {
      setMsgError("Erreur de mise à jour");
      setMsgSuccess("");
      setStatusSuccess(false);
      setStatusError(true);
      onToggleSnackBar();
    }
  };
  
  const handleTrash = (item) => {
    // Handle trash icon click event
    try{
      // Throw UI alert if user want de delete an item
      // Afficher l'alerte avec des boutons de confirmation et d'annulation
      Alert.alert(
        'Attention',
        `Êtes-vous sûr de vouloir supprimer ${item.name} ?`,
        [
          {
            text: 'Annuler',
            style: 'cancel',
          },
          {
            text: 'Supprimer',
            style: 'destructive',
            onPress: async () => {
              // Fonction à exécuter lorsque l'utilisateur appuie sur le bouton "Supprimer"
              console.log('Élément supprimé', item);

                const updatedCouts = foodDetails.couts.filter(cout => cout._id !== item._id);

                dispatch(soumettreProduct({
                  ...foodDetails,
                  id: foodDetails._id,
                  couts: updatedCouts,
                }));
            
                // Check if the couts was updated successfully
                // Update state
                setStatusError(!error && !isLoading);
                setStatusSuccess(!error && !isLoading);

                // Check if the item was updated successfully
                if (!statusError && statusSuccess) {
                  setMsgSuccess(`Suppression avec succèss`);
                  setMsgError("");
                  setStatusSuccess(true);
                  setStatusError(false);
                  onToggleSnackBar();
                    setTotAmount(totAmount - parseFloat(item.amount));

                    foodDetails.couts = updatedCouts;
            
                }else {
                  setMsgError("Erreur de suppression!");
                  setMsgSuccess("");
                  setStatusSuccess(false);
                  setStatusError(true);
                  onToggleSnackBar();
                }
              
            },
          },
        ]
      );

    } catch(e){
      setMsgError("Erreur de suppression!");
      setMsgSuccess("");
      setStatusSuccess(false);
      setStatusError(true);
      onToggleSnackBar();
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
        {foodDetails.images.map((image, index) => {
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

  const renderDisplayDetail = () => {
    return (
      <BottomSheetModal
        ref={bottomSheetDetailsTrans}
        index={2}
        backdropComponent={BackdropElement}
        snapPoints={snapPoints}
        backgroundStyle={{ borderRadius: responsiveScreenWidth(5), backgroundColor:'#eee'}}
        onDismiss={() => hideModalDetailsTrans()}
      >
        <BottomSheetScrollView>
        <Block p={17} >
        <Block row space='between'>
          <Block m_b={10} flex={1}>
            <Text bold h2>Details</Text>
            <Text color={COLORS.blue}>{`Details de la transaction`}</Text>
          </Block>
          <TouchableOpacity onPress={()=> hideModalDetailsTrans()}>
            <IconButton
              icon="close"
              iconColor={COLORS.red}
              size={40}
            />
          </TouchableOpacity>
          
        </Block>

        <Block p_b={10} row space='between'>
          <Block flex={1}>
          { selectedItem.user?.profile_pic  ? (
              <Image
                source={{ uri: selectedItem.user?.profile_pic  }}
                style={{ width: 80, height: 80, borderRadius:40, borderWidth:1,
                borderColor: COLORS.white}}
              />
            ) : (
              <Image
                source={icons.investment}
                style={{
                  width: 80,
                  height: 80,
                  tintColor: COLORS.black,
                }}
              />
            )}
                
          </Block>

          <Block flex={3} middle>
            <Block row space='between'>
              <Text bold>A :</Text>
              <Text gray>{`${foodDetails.owner.name}`}</Text>
            </Block>

            <Block row space='between'>
              <Text bold>DE :</Text>
              <Text gray>{`${selectedItem?.user?.name}`}</Text>
            </Block>

            <Block row space='between'>
              <Text bold>DATE :</Text>
              <Text gray>{`${foodDetails.timestamp}`}</Text>
            </Block>
          </Block>

        </Block>

        <Divider />
          <Block p_t={15} p_b={15} row space='between'>
            <Text h3 bold>TYPE</Text>
            <Text >Achat de parts </Text>
          </Block>

          <Divider />
          <Block p_t={15} p_b={15} row space='between'>
            <Text h3 bold>SOMME</Text>
            {/* TODO: check and fecth real amount => contribution_amount */}
            <Text >{foodDetails.amount} {foodDetails.currency}</Text>
          </Block>

          <Divider />
          <Block p_t={15} p_b={15} row space='between'>
            <Text h3 bold>TRANSACTION ID</Text>
            {/* TODO: check and fecth real id */}
            <Text >#123-345</Text>
          </Block>

          <Divider />
          <Block p_t={15} p_b={15} row space='between'>
            <Text h3 bold>STATUS</Text>
            {/* TODO: check and fecth real status */}
            <Text color={COLORS.peach} >En attente</Text>
          </Block>

          <Divider />
          <Block p_t={15} p_b={15} >
            {/* TODO: TO BE DONE */}
            <Button mode='contained' buttonColor={COLORS.blue} >TELECHARGER PDF</Button>
          </Block>
      </Block>
        </BottomSheetScrollView>
    </BottomSheetModal>
    )
  }

  const renderListContrib = () => {
    return (
      <Block card m={20} p_b={20} >
        <Block p={17}>
          <Text bold numberOfLines={1} h2>
            Achat de parts 
          </Text>
          <Block row space='between' >
          <Text numberOfLines={1} style={{flex: 1, marginRight: 10}}>La liste de toutes les transactions</Text>
          <TouchableOpacity onPress={()=> console.log('ok')}>
             {/* TODO: TO BE DONE */}
          <Text color={COLORS.blue}>Voir plus</Text>
          </TouchableOpacity>
          </Block>
        </Block>
        {/* TODO : Use the contribution_amount, and real Date */}
        <FlatList
            data={membresToShow?.slice(0,3)}
            renderItem={({ item }) => 
              <Transaction user={item} navigation={navigation} subtitle='Achat de parts' topRight={foodDetails.amount/100} 
                bottomRight='10 sep 2023' currency={foodDetails.currency} onPressTransaction={onPressTransaction} />}
                keyExtractor={(item) => item._id} // Use a unique key for each item
          />
        </Block>
  )};

  const renderMembres = () => (
        <Block p_l={20} p_r={20}>
          <Text bold numberOfLines={1}>
          MEMBRES ({foodDetails.membres.length + 1})
          </Text>

          {
            renderItem({ admin: true, name: foodDetails.owner.name+" (Admin)", 
            //name: foodDetails.owner._id
            user: { ...foodDetails.owner, _id: foodDetails.owner._id, },
            contribution: foodDetails.initialAmount, tauxInt: foodDetails.tauxInt,
            date: format(new Date(foodDetails.timestamp), 'dd MMMM yyyy', { locale: fr }) })
          }
          {
            membresToShow.map((membre, index) => renderItem(membre))
          }

          {foodDetails.membres?.length > 1 && ( // Show "Voir plus" only if there are more than 2 users
            <TouchableOpacity onPress={toggleExpansion}>
              <Text bold color={COLORS.blue}>
                {expandedMembre ? 'Voir moins' : 'Voir plus'}
              </Text>
            </TouchableOpacity>
          )}
        </Block>
  )

  const renderQuestion = () => (
    <Block  p_l={20} p_r={20}   >
    <Text>
      {`Avez-vous des questions sur ce ${foodDetails.type}? Contactez le propriétaire ou notre expert en financement participatif.`}
      </Text>
        <Block row space='between'>

        <View style={styles.columnMembre1}>
            <Image
              source={{uri: foodDetails.owner?.profile_pic}}
              style={styles.imgOwner}
            />
            <Text numberOfLines={2} bold >{foodDetails.owner?.name}</Text>
            <Text numberOfLines={1} style={styles.contentTitle}>Président</Text>
          </View>

        <Block style={{ justifyContent: 'center' }}>
        <TouchableOpacity style={styles.contactButton} onPress={handleContactSupport}>
        <Text style={styles.buttonText}>Contacter l'Admin</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.contactButton2} onPress={handleContactSupport}>
        <Text style={styles.buttonText}>Contacter le Support</Text>
      </TouchableOpacity>
        </Block>

  </Block>
</Block>
  

  )
  
  const renderHelp = () => (
    <Block p_t={20} p_l={20} p_r={20}>
      <Text bold numberOfLines={1}>
        BESOIN D'AIDE?
      </Text>
    </Block>
  );

  const renderFAaddCout = () => {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <Block row center style={styles.floatBlockFA}>
        <TextInput
          label="Description"
          value={editedName}
          onChangeText={handleNameChange}
          mode="outlined"
          style={[styles.input, { width: '45%' }]}
          required
        />

        <TextInput
          label={`Prix tot (${foodDetails.currency})`}
          value={`${editedAmount}`}
          onChangeText={handleAmountChange}
          mode="outlined"
          keyboardType='decimal-pad'
          style={[styles.input, { width: '40%' }]}
          required
        />

        <TouchableOpacity  onPress={() => {
          Keyboard.dismiss();
          handleAddCout();
        }}>
          <Ionicons name="add-circle" size={50} color={COLORS.darkgreen} />
        </TouchableOpacity>
       
      </Block>
      </TouchableWithoutFeedback>
    );
  };

  const renderFloatingBlock = () => {
    return (
      <Block row space="between" style={styles.floatBlock}>
        <Text bold>Les coûts directs et indirects</Text>
        <Button textColor="#fff" elevated buttonColor={COLORS.purple} onPress={()=> openModalCout()}>
          Les coûts
        </Button>
      </Block>
    );
  };

  const renderItem = (item) => (
    <TouchableOpacity
      onPress={() => {
        console.log(item.user);
        // navigation.navigate('Profile', { user: item})
        navigation.navigate('Profile', {
          userId: item.user._id,
          user: item.user
        })
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
              

              { item.user.profile_pic  ? (
                <Image
                  source={{ uri: item.user.profile_pic  }}
                  style={{ width: 40, height: 40, borderRadius:20, borderWidth:1,
                  borderColor: COLORS.white}}
                />
              ) : (
                <Image
                  source={icons.investment}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: COLORS.black,
                  }}
                />
              )}

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
                {  item.admin? item?.contribution: item?.contribution_amount }  {foodDetails.currency} 
              </Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
  {(!item.admin && foodDetails.owner._id == connectedUser?.userId) ? (
    item.admission_req == 'ACCEPTED' ? (
      <>
        <Text style={{ ...FONTS.h5, color: COLORS.red }}>+ {foodDetails.tauxInt} intérêt</Text>
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
        <TouchableOpacity onPress={() => {
            setCurrentItem(item)
            openModalReject()
          }}>
          {isLoading ? (
            <></>
          ) : (
            <Ionicons name="close-circle" size={40} color={COLORS.peach} />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
            setCurrentItem(item)
            openModalAccept()
          }}>
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
      <Text style={{ ...FONTS.h5, color: COLORS.gray}}>En attente</Text>
    </>
  ) : (
    <>
      <Text style={{ ...FONTS.h5, color: COLORS.red }}>+ {foodDetails.tauxInt}% intérêt</Text>
      <View style={{ flexDirection: 'row', marginTop:20 }}>
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
    <BottomSheetModalProvider>
    <ScrollView showsVerticalScrollIndicator={false} accessibilityElementsHidden={true}>
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
            {foodDetails.name}
          </Text>
          {
            // "PENDING","SUBMITED", "REJECTED", "ACCEPTED", "BANNED"
            foodDetails.status == "PENDING"?
              <Text color={COLORS.red} center>[Bruillon]</Text>:
            foodDetails.status == "SUBMITED"?
              <Text color={COLORS.red} center>[en attente de validation]</Text>:
              <Text color={COLORS.darkgreen} center>[Validé]</Text>
          }
    
          <Text bold center>Du {dateStart.getDate()}/{dateStart.getMonth() + 1}/{dateStart.getFullYear().toString().substr(-2) } 
          {`  au `} {dateEnd.getDate()}/{dateEnd.getMonth() + 1}/{dateEnd.getFullYear().toString().substr(-2)} </Text>
          <Text center>Prix total</Text>
          <Text bold size={30} center color={COLORS.peach}>
            {foodDetails.amount}  {foodDetails.currency} 
          </Text>

          <Block>
            <Block row space="between">
              <TouchableOpacity onPress={()=> 
                {
                  console.log('Images');
                  navigation.navigate('ShowImages', { images: foodDetails.images})
                }}>
                <Block row center style={styles.round}>
                    <Ionicons name="md-image" color={COLORS.peach} size={20} />
                    <Text style={{marginLeft: 5}} numberOfLines={1}>Voir images</Text>
                </Block>
              </TouchableOpacity>

              <Block row center style={styles.round}>
                <Ionicons name="md-time" color={COLORS.peach} size={20} />
                <Text numberOfLines={1}> 
                {daysLeft > 0? `${daysLeft} Jours restent`:`${-daysLeft} jours de retard`}</Text>
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
              Montant collecté(
              {((foodDetails.initialAmount + foodDetails.membres
.filter(member => member.contribution_status === "ACCEPTED")
.reduce((sum, member) => sum + member.contribution_amount, 0)) * 100 / foodDetails.amount).toFixed(1)}%)
              </Text>
              <Text numberOfLines={1}>
              {foodDetails.initialAmount} {foodDetails.currency}
              </Text>
            </Block>
            <Block>
              <Block row space="between">
                <Text numberOfLines={1} semibold>
                  Le coût total de production:
                </Text>
                <Text> {totAmount} {foodDetails.currency} </Text>
              </Block>

              <Block row space="between">
                <Text numberOfLines={1} semibold>
                  Le prix d'une part:
                </Text>
                <Text> {foodDetails.amount/100} {foodDetails.currency}</Text>
              </Block>

              <Block row space="between">
                <Text numberOfLines={1} semibold>
                  Les parts disponibles:
                </Text>
                <Text>{(100 - (foodDetails.initialAmount / (foodDetails.amount / 100).toFixed(0))).toFixed(0)} parts</Text>
              </Block>

              {/* <Block row space="between">
                <Text numberOfLines={1} semibold>
                  Le coût total de Revient:
                </Text>
                <Text> 0 {foodDetails.currency} </Text>
              </Block> */}
              <Block row space="between">
                <Text numberOfLines={1} semibold>
                    Taux d'intérêt :
                  </Text>
                  <Text> {foodDetails?.tauxInt} % </Text>
                  </Block>
              </Block>
            {
              connectedUser?.username == foodDetails.owner.username? 
              <Block row space="between" m_t={10}>
              {/* owner */}
             {
              foodDetails.status == 'PENDING'?
              <>
                <Button textColor="#fff" elevated buttonColor={COLORS.lightBlue} onPress={()=>
              {
                // console.log("foodDetails", foodDetails);
                 navigation.navigate('EditProduct', { owner: connectedUser?.userId,
                  username: connectedUser?.username, productService: foodDetails });
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
                foodDetails.membres.some(member => member?.user?._id == connectedUser?.userId)?
              <>
              <Button textColor="#fff" elevated buttonColor={COLORS.peach} onPress={()=> showModalQuitter()}>
                Quitter
              </Button>

              {
                 foodDetails.membres.find(member => member?.admission_req == 'ACCEPTED')? 
                 <Button textColor="#fff" elevated buttonColor={COLORS.darkgreen} onPress={()=> openModalContrib()}>
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
            {foodDetails.detail}
          </Text>
          {foodDetails.detail.length > 50 && (
            <Text bold color={COLORS.blue} onPress={toggleExpanded}>
              {expanded ? 'Voir moins' : 'Voir plus'}
            </Text>
          )}
          <Block mt={5}>
            {stars(foodDetails.stars.length)}
          
          </Block>
        </Block>
          
          {renderListContrib()}
          {renderInvestCalculus()}
          {renderTimeline()}

          {renderMembres()}

          {renderHelp()}

          {renderQuestion()}
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
            <Text variant="titleLarge">Voulez-vous vraiment supprimer le {foodDetails.type }
              {" "}{ foodDetails.name}?</Text>
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
            <Text variant="titleLarge">Voulez-vous vraiment Soumettre le {foodDetails.type }
              {" "}{ foodDetails.name}?</Text>

              <Text color={COLORS.peach} variant="titleLarge">Ceci implique que votre {foodDetails.type} {" "} 
              sera soumis a l'equipe d'Afintech sera etudier soigneusement pendant deux ou trois jours avant de 
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
            !connectedUser?
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
            <Text variant="titleLarge">Voulez-vous vraiment Faire parti des insvesitteurs du {foodDetails.type }
              {" "}{ foodDetails.name}?</Text>

              <Text color={COLORS.peach} variant="titleLarge">Ceci implique que vous pouvez contribuer une somme
              d'argent et ganger apres l'exercice! Votre demande d'adhesion sera validee par le proprietaire du {foodDetails.type }
              {" "}{ foodDetails.name}</Text>
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
            <Text variant="titleLarge">Voulez-vous vraiment quitter le groupe des insvesitteurs du {foodDetails.type }
              {" "}{ foodDetails.name}?</Text>

             
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
            <Text variant="titleLarge">Voulez-vous vraiment contribuer une somme d'argent et ganger apres l'exercice du {foodDetails.type }
              {" "}{ foodDetails.name}?</Text>

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
        style={{ backgroundColor:  statusError? COLORS.peach: COLORS.darkgreen}}
        wrapperStyle={{ bottom: 30 }}
        action={{
          label: 'Annuler',
          onPress: () => {
            // Do something
          },
        }}
        >
          {
            statusError? msgError: msgSuccess
          }
        </Snackbar>

        {renderBottomCout()}

        {renderBottomAccept()}
        {renderBottomReject()}

        {renderBottomContrib()}

        {renderDisplayDetail()}

    </ScrollView>
    </BottomSheetModalProvider>
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
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2
    
  },
  bottomSheetContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheetContent: {
    //backgroundColor: 'white',
    padding: 16,
    height: '88%',
    
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
  },
  imgOwner:{
    width: 100,
    height: 100,
    borderRadius:50,
  },
  contentTitle: {
    fontSize: 13,
    color: COLORS.peach
  },
  columnMembre1: {
    //flex: 1, // Takes 50% width
    marginRight: 8, // Adjust the margin as needed
    paddingVertical:8,
    alignItems:'center',
    justifyContent: 'center'   
  },
  contactButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  contactButton2: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputError: {
    borderColor: 'red', // Red border for invalid input
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  }
});

export default Details;

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch(`https://bomoko-backend.onrender.com/api/product/${route.params.food._id}`);
//       const data = await response.json();
//       setFoodDetails(data);

//       // Update all states

//     setTotAmount(
//       await data?.couts.reduce((sum, cout) => sum + cout.amount, 0)
//       );
//       membresToShow = await expandedMembre
//       ? data?.membres
//       : data?.membres?.slice(0, 1); // Show the first two users if not expanded
    


//       setDateStart(await new Date(data?.startDate)|| 0);
//       setDateEnd(await new Date(data?.endDate)|| 0);

      
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching food details:', error);
//       setLoading(false);
//     }
//   };

//   fetchData();
// }, []); // Dependency array to re-run effect when food._id changes
// // route.params.food._id
