import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const addAvec = ({ onAddAvec }) => {
  const [name, setName] = useState('Your AVEC Name');
  const [detail, setDetail] = useState('Details about your AVEC');
  const [amount, setAmount] = useState('1000');
  const [currency, setCurrency] = useState('USD');
  const [cycleName, setCycleName] = useState('moi');
  const [cycleNumber, setCycleNumber] = useState('9');
  const [nbrPartMax, setNbrPartMax] = useState('5');
  const [nbrPartMin, setNbrPartMin] = useState('1');
  const [interest, setInterest] = useState('5');
  const [fraisAdhesion, setFraisAdhesion] = useState('10');
  const [debutOctroiCredit, setDebutOctroiCredit] = useState('2023-05-10');
  const [finOctroiCredit, setFinOctroiCredit] = useState('2023-08-10');
  const [startDate, setStartDate] = useState('2023-05-01');
  const [endDate, setEndDate] = useState('2023-12-01');

  const handleAddAvec = () => {
    // Create an AVEC object with the form data
    const avec = {
      name,
      detail,
      amount: Number(amount),
      currency,
      cycle: {
        name: cycleName,
        number: Number(cycleNumber),
      },
      nbrPart: {
        max: Number(nbrPartMax),
        min: Number(nbrPartMin),
      },
      interest,
      frais_Adhesion: Number(fraisAdhesion),
      debut_octroi_credit: debutOctroiCredit,
      fin_octroi_credit: finOctroiCredit,
      startDate,
      endDate,
    };

    // Pass the new AVEC object to a parent component or Redux action
    onAddAvec(avec);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter AVEC name"
      />

      <Text style={styles.label}>Detail:</Text>
      <TextInput
        style={styles.input}
        value={detail}
        onChangeText={setDetail}
        placeholder="Enter AVEC detail"
      />

      <Text style={styles.label}>Amount:</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="Enter AVEC amount"
      />

      <Text style={styles.label}>Currency:</Text>
      <TextInput
        style={styles.input}
        value={currency}
        onChangeText={setCurrency}
        placeholder="Enter currency (e.g., USD)"
      />

      <Text style={styles.label}>Cycle Name:</Text>
      <TextInput
        style={styles.input}
        value={cycleName}
        onChangeText={setCycleName}
        placeholder="Enter cycle name"
      />

      <Text style={styles.label}>Cycle Number:</Text>
      <TextInput
        style={styles.input}
        value={cycleNumber}
        onChangeText={setCycleNumber}
        keyboardType="numeric"
        placeholder="Enter cycle number"
      />

      <Text style={styles.label}>Max Participants:</Text>
      <TextInput
        style={styles.input}
        value={nbrPartMax}
        onChangeText={setNbrPartMax}
        keyboardType="numeric"
        placeholder="Enter max participants"
      />

      <Text style={styles.label}>Min Participants:</Text>
      <TextInput
        style={styles.input}
        value={nbrPartMin}
        onChangeText={setNbrPartMin}
        keyboardType="numeric"
        placeholder="Enter min participants"
      />

      <Text style={styles.label}>Interest (%):</Text>
      <TextInput
        style={styles.input}
        value={interest}
        onChangeText={setInterest}
        keyboardType="numeric"
        placeholder="Enter interest rate"
      />

      <Text style={styles.label}>Frais d'Adhesion:</Text>
      <TextInput
        style={styles.input}
        value={fraisAdhesion}
        onChangeText={setFraisAdhesion}
        keyboardType="numeric"
        placeholder="Enter frais d'adhesion"
      />

      <Text style={styles.label}>Début Octroi Credit:</Text>
      <TextInput
        style={styles.input}
        value={debutOctroiCredit}
        onChangeText={setDebutOctroiCredit}
        placeholder="Enter début octroi credit"
      />

      <Text style={styles.label}>Fin Octroi Credit:</Text>
      <TextInput
        style={styles.input}
        value={finOctroiCredit}
        onChangeText={setFinOctroiCredit}
        placeholder="Enter fin octroi credit"
      />

      <Text style={styles.label}>Start Date:</Text>
      <TextInput
        style={styles.input}
        value={startDate}
        onChangeText={setStartDate}
        placeholder="Enter start date"
      />

      <Text style={styles.label}>End Date:</Text>
      <TextInput
        style={styles.input}
        value={endDate}
        onChangeText={setEndDate}
        placeholder="Enter end date"
      />

      <Button title="Add AVEC" onPress={handleAddAvec} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default addAvec;
