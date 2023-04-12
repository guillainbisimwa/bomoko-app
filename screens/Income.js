import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Animated,
  Platform,
} from 'react-native';
import { Block, Button, Input, Text } from '../components';

import { COLORS, FONTS, SIZES, icons } from '../constants';
import Tabs from '../navigations/Tab';

const Income = ({ navigation }) => {
  const [date, setDate] = useState(new Date());

  function renderNavBar() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 80,
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.white,
        }}
      >
        <TouchableOpacity
          style={{ justifyContent: 'center', width: 50 }}
          onPress={() => {
            console.log('Menu');
            navigation.navigate(Tabs);
          }}
        >
          <Image
            source={icons.back_arrow}
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.primary,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'flex-end', width: 50 }}
          onPress={() => console.log('search')}
        >
          <Image
            source={icons.more}
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.primary,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderHeader() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.white,
          marginBottom: SIZES.padding,
          borderBottomColor: COLORS.gray,
          borderBottomWidth: 1,
        }}
      >
        <View style={{ paddingVertical: SIZES.padding }}>
          <Text style={{ color: COLORS.primary, ...FONTS.h2 }}>Crédit (Entrée)</Text>
          <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}>(Portefeuil electronique)</Text>
        </View>
      </View>
    );
  }

  const addIncome = () => {
    const [loading, setLoading] = useState(false);
    //const [errors, setErrors] = useState(false);

    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState({
      email: false,
      password: false,
    });
    return (
      <Block flex={2} style={styles.center}>
        <Input
          placeholder="Email"
          error={errors.email}
          defaultValue={email}
          onChangeText={(text) => setEmail(text)}
          style={[styles.input]}
        />

        <Block style={styles.mt}>
          <Button color="#db7020" round onPress={() => login()}>
            <Text white bold h4 center>
              Connexion
            </Text>
          </Button>
        </Block>
      </Block>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightGray2 }}>
      {/* Nav bar section */}
      {renderNavBar()}

      {/* Header section */}
      {renderHeader()}

      {addIncome()}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: SIZES.padding * 2,
  },
  hasErrors: {
    borderBottomColor: COLORS.purple,
  },
  login: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 80,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: COLORS.white,
  },
  logo: {
    height: 50,
    width: 50,
    marginBottom: 20,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mt: {
    marginTop: 35,
  },
  center: {
    margin: 35,
  },
});

export default Income;
