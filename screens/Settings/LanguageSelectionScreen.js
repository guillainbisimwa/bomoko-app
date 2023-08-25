import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

const LanguageSelectionScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default language is English

  const handleLanguageChange = language => {
    setSelectedLanguage(language);
    // You can implement logic here to update the app's language
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choisissez une Langue</Text>
      <RadioButton.Group onValueChange={handleLanguageChange} value={selectedLanguage}>
        <View style={styles.languageOption}>
          <RadioButton value="en" />
          <Text style={styles.languageText}>Anglais</Text>
        </View>
        <View style={styles.languageOption}>
          <RadioButton value="sw" />
          <Text style={styles.languageText}>Swahili</Text>
        </View>
        <View style={styles.languageOption}>
          <RadioButton value="fr" />
          <Text style={styles.languageText}>Français</Text>
        </View>
      </RadioButton.Group>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  languageText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default LanguageSelectionScreen;
