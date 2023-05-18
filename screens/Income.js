import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AuthScreen } from './AuthScreen/AuthScreen';
import { LoginScreen } from './LoginScreen/LoginScreen';
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
import { TextInput, Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { Block, Input, Text } from '../components';

import { COLORS, FONTS, SIZES, icons } from '../constants';
import Tabs from '../navigations/Tab';

const Income = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const [description, setDescription] = useState('');
  const [total, setTotal] = useState('');

  const handleSaveExpense = () => {
    // Handle saving the expense to the database
    // You can use the description and total variables to access the input values
  };

  if (user?.token) {
    return <LoginScreen />;
  }

  const [date, setDate] = useState(new Date());

  function renderNavBar() {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingTop: SIZES.base * 3,
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingHorizontal: SIZES.padding,
        }}
      >
        <TouchableOpacity
          style={{ justifyContent: 'center', width: 50 }}
          onPress={() => {
            console.log('Menu');
            navigation.navigate();
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
    return (
      <>
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Total"
          value={total}
          onChangeText={setTotal}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />
        <Button
          elevated
          mode="contained"
          onPress={handleSaveExpense}
          style={styles.button}
          icon={({ size, color }) => <FontAwesome name="save" size={size} color={color} />}
        >
          Save Income
        </Button>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {/* Nav bar section */}
      {renderNavBar()}

      {/* Header section */}
      {renderHeader()}

      {addIncome()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 32,
    backgroundColor: COLORS.primary,
  },
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
