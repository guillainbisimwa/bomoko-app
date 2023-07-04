import React, { useRef, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Svg } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Block from './Block';
import Text from './Text';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import { Button, MD3Colors, ProgressBar, TextInput } from 'react-native-paper';
import { BottomSheet } from 'react-native-btr';
import { useDispatch, useSelector } from 'react-redux';
import CoutScreen from './CoutScreen';
import { Alert } from 'react-native';
import { addCout } from '../../redux/coutReducer';
import { View } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import Slider from '@react-native-community/slider';

const Details = ({ route }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const couts = useSelector((state) => state.couts.couts);

  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedAmount, setEditedAmount] = useState('');
  const [totAmount, setTotAmount] = useState(
    couts
      .filter((v, k) => v.prodId == route.params.food.id)
      .reduce((a, b) => a + (b.amount || 0), 0)
  );

  const [expanded, setExpanded] = useState(false);

  const [sliderValue, setSliderValue] = useState(15);

  const scrollRef = useRef(null);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  function toggle() {
    setVisible((visible) => !visible);
  }

  const toggleExpanded = () => {
    setExpanded(!expanded);
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
            source={image}
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
      prodId: route.params.food.id,
      date: '',
    };

    dispatch(addCout(coutObj));

    setTotAmount(totAmount + parseFloat(editedAmount));

    setEditedName('');
    setEditedAmount('');
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
              <Text style={{ ...FONTS.h3, color: COLORS.black }}>{item.name}</Text>
              <Text
                numberOfLines={1}
                style={{
                  overflow: 'hidden',
                  ...FONTS.body5,
                  flexWrap: 'wrap',
                  color: COLORS.darkgray,
                }}
              >
                {item.contribution}
              </Text>
            </View>
          </View>

          <View style={{ width: '25%', alignItems: 'flex-end' }}>
            <Text style={{ ...FONTS.h5, color: COLORS.red }}>+4% interret</Text>
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

          <Text center>Prix total</Text>
          <Text bold size={30} center color={COLORS.peach}>
            {route.params.food.amount} $
          </Text>

          <Block>
            <Block row space="between">
              <Block row center style={styles.round}>
                <Ionicons name="md-cash" color={COLORS.peach} size={20} />
                <Text numberOfLines={1}> 20 Investisseurs</Text>
              </Block>

              <Block row center style={styles.round}>
                <Ionicons name="md-time" color={COLORS.peach} size={20} />
                <Text numberOfLines={1}> 35 Jours restent</Text>
              </Block>
            </Block>

            <Block center m_t={10}>
              <ProgressBar
                progress={0.1}
                color={MD3Colors.error50}
                style={{ width: SIZES.width / 1.4, height: SIZES.base }}
              />
            </Block>
            <Block m_t={5} row space="between">
              <Text numberOfLines={1} semibold size={16}>
                50% Investisseurs
              </Text>
              <Text numberOfLines={1} semibold size={16}>
                12 $ restent
              </Text>
            </Block>
            <Block>
              <Block row space="between">
                <Text numberOfLines={1} semibold>
                  Le coût total de production:
                </Text>
                <Text> {totAmount} FC</Text>
              </Block>

              <Block row space="between">
                <Text numberOfLines={1} semibold>
                  Le coût total de Revient:
                </Text>
                <Text> 0 FC</Text>
              </Block>
            </Block>
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
            <Block row>
              <Ionicons name="star" color={COLORS.yellow} size={20} />
              <Ionicons name="star" color={COLORS.yellow} size={20} />
              <Ionicons name="star" color={COLORS.gray} size={20} />
              <Ionicons name="star" color={COLORS.gray} size={20} />
            </Block>
          </Block>
        </Block>

        <Block p_l={20} p_r={20}>
          <Text bold numberOfLines={1}>
            INVESTISSEURS (20)
          </Text>

          {renderItem({ name: 'Jeanne MASIKA', contribution: '200 USD', date: '22/03/2023' })}
          {renderItem({ name: 'Joseph KAKULE', contribution: '200 USD', date: '22/03/2023' })}
          <Text bold color={COLORS.blue}>
            {expanded ? 'Voir moins' : 'Voir plus'}
          </Text>
        </Block>

        <Block p={20}>
          <Text bold numberOfLines={1}>
            CALCUL D'INVESTISSEMENT
          </Text>
          <Text>Projection du retour sur investissement de 600$ en 3 mois</Text>

          <Svg style={{ width: '100%' }}>
            <VictoryChart domainPadding={50} theme={VictoryTheme.material}>
              <VictoryBar
                style={{ data: { fill: COLORS.purple } }}
                categories={{
                  x: ['Coût Total', 'Interet'],
                }}
                data={[
                  { x: 'Coût Total', y: 600 },
                  { x: 'Interet', y: sliderValue },
                ]}
              />
            </VictoryChart>
          </Svg>

          {/*Slider with max, min, step and initial value*/}
          <Slider
            maximumValue={600}
            minimumValue={0}
            minimumTrackTintColor="#307ecc"
            maximumTrackTintColor="#000000"
            step={1}
            value={sliderValue}
            onValueChange={(sliderValue) => setSliderValue(sliderValue)}
          />

          <Text style={{ color: 'black' }}>Vous investissez la somme de : {sliderValue} $</Text>
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
                  .filter((v, k) => v.prodId == route.params.food.id)
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
});

export default Details;
