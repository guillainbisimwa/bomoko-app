import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Image, TouchableOpacity, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { Text } from '../components';
import { useNavigation } from '@react-navigation/native';

import { COLORS, FONTS, SIZES, icons } from '../constants';
import { Picker } from '@react-native-picker/picker';
import { KeyboardAvoidingView } from 'react-native';
import { addCat } from '../redux/catReducer';
import { Alert } from 'react-native';

const Income = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const catList = useSelector((state) => state.categories.categories);

  const [categories, setCategories] = useState(
    catList.filter((value, key) => value.cat === 'income')
  );

  const [description, setDescription] = useState('');
  const [total, setTotal] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const handleSaveIncome = async () => {
    // Create a new expense object

    if (!selectedValue || !description || !total) {
      // Throw UI error if any field is missing
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }
    const newIncome = {
      id: Math.random().toString(),
      description: description,
      total: parseFloat(total),
      date: new Date().toISOString().split('T')[0],
    };

    // Find the corresponding category in the categories array
    const categoryIndex = categories.findIndex((cat) => cat.name === selectedValue);

    if (categoryIndex !== -1) {
      // Create a copy of the categories array
      const updatedCategories = [...categories];

      // Create a copy of the data array for the selected category
      const updatedData = [...updatedCategories[categoryIndex].data];

      // Add the new expense to the updated data array
      updatedData.push(newIncome);

      // Update the data array for the selected category in the updated categories array
      updatedCategories[categoryIndex] = {
        ...updatedCategories[categoryIndex],
        data: updatedData,
      };
      dispatch(addCat(updatedCategories));

      // Reset the form
      setSelectedValue('');
      setDescription('');
      setTotal('');

      navigation.goBack();
    }
  };

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
            navigation.goBack();
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
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selectioner une categorie" value="" />
            {categories &&
              categories.map((k, v) => {
                return <Picker.Item key={k.id} label={k.name} value={k.name} />;
              })}
          </Picker>
        </View>
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          style={styles.input}
          required
        />
        <TextInput
          label="Total"
          value={total}
          onChangeText={setTotal}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
          required
        />
        <Button
          elevated
          mode="contained"
          onPress={handleSaveIncome}
          style={styles.button}
          icon={({ size, color }) => <FontAwesome name="save" size={size} color={color} />}
        >
          Ajouter
        </Button>
      </>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View>
        {/* Nav bar section */}
        {renderNavBar()}

        {/* Header section */}
        {renderHeader()}

        {addIncome()}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    height: '100%',
    backgroundColor: COLORS.white,
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
    marginTop: SIZES.padding,
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
  dropdownContainer: {
    borderWidth: 1.4,
    borderColor: '#aaa',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    padding: 8,
  },
});

export default Income;
