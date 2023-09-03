import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createAvec } from '../../redux/avecReducer';
import { Button } from 'react-native-paper';

const AddAvec = ({ navigation, route }) => {
  const { owner, username } = route.params;
  const dispatch = useDispatch();
  const { avecs, status, error }= useSelector((state) => state.avecs); 

  const [name, setName] = useState('Your AVEC Name');
  const [detail, setDetail] = useState('Details about your AVEC');
  const [amount, setAmount] = useState('1000');
  const [currency, setCurrency] = useState('USD');
  const [cycleName, setCycleName] = useState('Mensuel');
  const [cycleNumber, setCycleNumber] = useState('9');
  const [nbrPartMax, setNbrPartMax] = useState('5');
  const [nbrPartMin, setNbrPartMin] = useState('1');
  const [interest, setInterest] = useState('5');
  const [fraisAdhesion, setFraisAdhesion] = useState('10');
  const [debutOctroiCredit, setDebutOctroiCredit] = useState('2023-05-10');
  const [finOctroiCredit, setFinOctroiCredit] = useState('2023-08-10');
  const [startDate, setStartDate] = useState('2023-05-01');
  const [endDate, setEndDate] = useState('2023-12-01');

  const [statusLocal, setStatusLocal] = useState(false)

  useEffect(()=>{
    console.log('===>', status,);
    console.log('===>',  error);
    console.log('===>', owner);
    if (status === "succeeded" &&  statusLocal  ) {
      // Navigate to the Home screen
      navigation.navigate('Main');
    }
  }, [status, error, owner]);

  const handleAddAvec = () => {
    try {
      // Validation: Check if required fields are empty
      if (!name || !amount || !currency || !cycleName || !cycleNumber || !nbrPartMax || !nbrPartMin) {
        setStatusLocal(false);
        throw new Error('Please fill in all required fields.');
      }
  
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
        owner,
        interest,
        frais_Adhesion: Number(fraisAdhesion),
        debut_octroi_credit: debutOctroiCredit,
        fin_octroi_credit: finOctroiCredit,
        startDate,
        endDate,
      };
  
      // Dispatch the action
      dispatch(createAvec(avec));
  
      // Set statusLocal (if needed)
      setStatusLocal(true);
    } catch (error) {
      // Handle validation or dispatch errors
      console.error('Error adding AVEC:', error);
      setStatusLocal(false);
      // You can also display an error message to the user here
    }
  };
  

  return (
    <ScrollView style={styles.container}>
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

      <Button mode='contained' textColor='white'  title="Creer un AVEC" onPress={handleAddAvec}  loading={status === 'loading'} disabled={status === 'loading'} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default AddAvec;
