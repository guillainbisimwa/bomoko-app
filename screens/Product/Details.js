import React, { useRef, useState } from 'react';
import { ImageBackground, ScrollView, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Block from './Block';
import Text from './Text';
import { COLORS, SIZES } from '../../constants';
import { Button, MD3Colors, ProgressBar, TextInput } from 'react-native-paper';
import { BottomSheet } from 'react-native-btr';
import { useSelector } from 'react-redux';
import CoutScreen from './CoutScreen';
import { Alert } from 'react-native';

const Details = ({ route }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const products = useSelector((state) => state.products.products);

  const [visible, setVisible] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedAmount, setEditedAmount] = useState('');

  const scrollRef = useRef(null);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  function toggle() {
    setVisible((visible) => !visible);
  }

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
            style={{ width: SIZES.width, height: SIZES.width / 2, justifyContent: 'flex-end' }}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.9)']}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: SIZES.width / 2,
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
          bottom: 80,
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

  return (
    <Block flex={1}>
      <Block style={{ height: SIZES.width / 2 }}>
        {renderImages()}
        {renderScrollIndicator()}
      </Block>
      <Block
        p={20}
        m={50}
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          top: SIZES.width / 4,
          width: '80%',
          borderRadius: 10,
          height: 200,
          elevation: 2,
        }}
      >
        {/* <Text numberOfLines={1} size={20} bold>
          {route.params.food.name}
        </Text> */}

        <Text center>Prix total</Text>
        <Text bold size={30} center color={COLORS.peach}>
          {route.params.food.amount} FC
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
            <Text numberOfLines={1} semibold size={19} style={{ marginLeft: 0 }}>
              50% Investisseurs
            </Text>
            <Text numberOfLines={1} semibold size={19} style={{ marginLeft: 0 }}>
              12 FC restent
            </Text>
          </Block>
          <Block>
            <Block></Block>
            <Text numberOfLines={1}> le coût de revient :</Text>
          </Block>
        </Block>
      </Block>

      <Block p={20} style={{ marginTop: 120, zIndex: -101 }}>
        <Text color={COLORS.darkgray}>{route.params.food.detail}</Text>
        <Block mt={5}>
          <Block row>
            <Ionicons name="star" color={COLORS.yellow} size={20} />
            <Ionicons name="star" color={COLORS.yellow} size={20} />
            <Ionicons name="star" color={COLORS.yellow} size={20} />
            <Ionicons name="star" color={COLORS.yellow} size={20} />
          </Block>
        </Block>
      </Block>
      {renderFloatingBlock()}
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
              {products.map((food, index) => {
                return <CoutScreen key={index} item={food} />;
              })}

              {products.map((food, index) => {
                return <CoutScreen key={index} item={food} />;
              })}

              {products.map((food, index) => {
                return <CoutScreen key={index} item={food} />;
              })}

              {products.map((food, index) => {
                return <CoutScreen key={index} item={food} />;
              })}

              {products.map((food, index) => {
                return <CoutScreen key={index} item={food} />;
              })}
            </ScrollView>
          </Block>
          {renderFAaddCout()}
        </Block>
      </BottomSheet>
    </Block>
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
    position: 'absolute',
    bottom: 0,
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
