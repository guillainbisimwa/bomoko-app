import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { ScrollView } from 'react-native';

const Income = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { cat } = route.params;

  const [description, setDescription] = useState('');
  const [total, setTotal] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const handleSaveIncome = async () => {
    try {
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
        cat: selectedValue,
      };

      var t = cat.map((category) => {
        var existingCategory = category.name == selectedValue; //cat.find((cat) => cat.name === selectedValue);
        const categoryIndex = cat.findIndex((cat) => cat.name === selectedValue);

        if (existingCategory) {
          const updatedData = [...cat[categoryIndex].data];
          updatedData.push(newIncome);

          return {
            ...cat[categoryIndex],
            data: updatedData,
          };
        }
        return category;
      });

      dispatch(addCat(t));

      // Reset the form
      setSelectedValue('');
      setDescription('');
      setTotal('');

      navigation.goBack();
    } catch (e) {
      console.log('error', e);
    }
  };

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
        <View style={{ paddingVertical: SIZES.padding / 2 }}>
          <Text style={{ color: COLORS.primary, ...FONTS.h2 }}>African Fintech</Text>
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
            {cat &&
              cat
                .filter((value, key) => value.cat === 'income')
                .map((k, v) => {
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
          label="Montant"
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header section */}
        {renderHeader()}

        {addIncome()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 120,
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
