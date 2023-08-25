import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ReportProblemScreen = () => {
  const [problemDescription, setProblemDescription] = useState('');

  const handleSubmit = () => {
    // Code to handle the submission of the problem description
    // You can implement sending an email or reporting to the server
    // Example: sendReportToServer(problemDescription);
    // After submission, you can show a confirmation message to the user
    // and potentially navigate back to the previous screen.
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Signaler un Problème</Text>
      <Text style={styles.subtitle}>Description du Problème</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        placeholder="Décrivez le problème que vous avez rencontré..."
        value={problemDescription}
        onChangeText={text => setProblemDescription(text)}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Soumettre</Text>
      </TouchableOpacity>
    </ScrollView>
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
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ReportProblemScreen;
