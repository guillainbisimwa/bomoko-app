import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const DetailsAvec = ({ onDetailsAvec }) => {
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Details</Text>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //padding: 20,
    margin:20
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  
});

export default DetailsAvec;
