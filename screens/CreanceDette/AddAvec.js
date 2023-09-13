import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createAvec } from '../../redux/avecReducer';
import { Button, RadioButton, Snackbar } from 'react-native-paper';
import { KeyboardAvoidingView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';
import Block from '../Product/Block';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { fr, registerTranslation, DatePickerModal, DatePickerInput } from 'react-native-paper-dates'
registerTranslation('fr', fr)
import { format } from 'date-fns';
import { fr as myFr, addMonths } from 'date-fns/locale';
import moment from 'moment';

const AddAvec = ({ navigation, route }) => {
  const { owner, username } = route.params;
  const dispatch = useDispatch();
  const { avecs, status, error }= useSelector((state) => state.avecs); 

  const [open, setOpen] = useState(false);

  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [cycleName, setCycleName] = useState('Mensuel');
  const [cycleNumber, setCycleNumber] = useState('9');
  const [nbrPartMax, setNbrPartMax] = useState('5');
  const [nbrPartMin, setNbrPartMin] = useState('1');
  const [prixCaisseSolidaire, setPrixCaisseSolidaire] = useState();
  const [interest, setInterest] = useState('');
  const [fraisAdhesion, setFraisAdhesion] = useState();
  const [debutOctroiCredit, setDebutOctroiCredit] = useState('');
  const [finOctroiCredit, setFinOctroiCredit] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [checkedDevise, setCheckedDevise] = useState('USD');

  const [statusLocal, setStatusLocal] = useState(false);
  const [interestValid, setInterestValid] = useState(true); // Validation state for interest


  const [date, setDate] = useState(undefined);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
      setDebutOctroiCredit(addMonths(params.date, 3));// + 3 mois
      setFinOctroiCredit(addMonths(params.date, Number(cycleNumber)-1));
      setStartDate(params.date);
      setEndDate(addMonths(params.date, Number(cycleNumber)));
    },
    [setOpen, setDate]
  );


  useEffect(()=>{
    console.log('===>', status,);
    console.log('===>',  error);
    console.log('===>', owner);
    if (status === "succeeded" &&  statusLocal  ) {
      // Navigate to the Home screen
      navigation.navigate('Main');
    }
    else {
      onToggleSnackBar()
    }
  }, [status, error, owner]);
  const cycleList = ["9 mois", "10 mois", "11 mois", "12 mois"];

  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const onToggleSnackBar = () => setVisible(!visible);


  // Fonction pour convertir la date en format français
  const formatDateToFrench = (date) => {
    console.log('date', date);
    return format(new Date(date), 'dd MMMM yyyy', { locale: myFr });
  };

  function addMonths(dateAdded, months) {
        // Input dateAdded
    const originalDate = moment(dateAdded);

    // Add months to the date
    const newDate = originalDate.add(months, 'months');

    // Format the new date (optional)
    const formattedDate = newDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    return formattedDate;
  }

  const handleInterestChange = (text) => {
    const numericValue = parseFloat(text);
    if (!isNaN(numericValue) && numericValue >= 5 && numericValue <= 10) {
      setInterestValid(true); // Interest is valid
    } else {
      setInterestValid(false); // Interest is not valid
    }
    setInterest(text); // Update interest value
  };

  const handleAddAvec = () => {
    try {
      // Validation: Check if required fields are empty
      if (!name || !amount  || !detail || !interest || !fraisAdhesion || !prixCaisseSolidaire  || !date) {
        setStatusLocal(false);
        //throw new Error('Please fill in all required fields.');
        if(!interest){
          setInterestValid(false)
        }
      }else {

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
          timeline: [
            {
              title: `Creation du Groupe${name}`,
              details: `Le Groupe ${name}- cree par ${username}`
            }
          ],
          frais_Social: {
            name: 'Hebdomadaire',
            somme: Number(prixCaisseSolidaire),
          },
        };

        console.log("avec", avec);
    
        // Dispatch the action
        dispatch(createAvec(avec));
    
        }
      
  
      setStatusLocal(true);
    } catch (error) {
      // Handle validation or dispatch errors
      console.error('Error adding AVEC:', error);
      setStatusLocal(false);
      // You can also display an error message to the user here
    }
  };

  const renderHeader = () =>{
    return (
      <View
        style={{
          //paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.white,
          marginBottom: SIZES.padding,
          borderBottomColor: COLORS.gray,
          borderBottomWidth: 1,
        }}
      >
        <View style={{ paddingVertical: SIZES.padding / 2 }}>
          <Text style={{ color: COLORS.primary, ...FONTS.h2 }}>African Fintech</Text>
          <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}>(Associations Villageoises d’Epargne Crédit)</Text>
        </View>
      </View>
    );
  }

  const avecForm = () => {
    return (
      <ScrollView style={styles.container}>
        <Block row space='between'>
          <Block>
          <Text  style={{ ...FONTS.h3, color: COLORS.darkgray, paddingBottom:10 }}>CHOISIR LE CYCLE</Text>

            <SelectDropdown
                data={cycleList}
                // defaultValueByIndex={1}
                // defaultValue={'Egypt'}
                onSelect={(selectedItem, index) => {
                  setCycleNumber(selectedItem.split(' ')[0])
                  //console.log(selectedItem, index);
                  console.log();

                  console.log(cycleNumber);

                }}
                defaultButtonText={'Choisir le Cycle'}
                buttonTextAfterSelection={(selectedItem, index) => {
                  //console.log("selectedItem", selectedItem);

                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                renderDropdownIcon={isOpened => {
                  return  <Ionicons  name={isOpened ? 'chevron-up' : 'chevron-down'} size={20} color={COLORS.gray} />
                }}
                dropdownIconPosition={'right'}
                // buttonTextStyle={styles.dropdown1BtnTxtStyle}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
              />
            </Block>
         
          <Block>
            <Text  style={{ ...FONTS.h3, color: COLORS.darkgray }}>VOTRE DEVISE</Text>
              <RadioButton.Group onValueChange={(value) => setCheckedDevise(value)} value={checkedDevise}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton value="USD" color="red" /> 
                  <Text>USD</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton value="CDF" color="blue" /> 
                  <Text>CDF</Text>
                </View>
              </RadioButton.Group>
            </Block>
          </Block>

        <Text style={styles.label}>Nom de votre groupe</Text>
        <TextInput
          style={[styles.input, !name && statusLocal && styles.inputError]}
          value={name}
          onChangeText={setName}
          placeholder="Entrer le nom de votre groupe"
        />
  
        <Text style={styles.label}>Description</Text>
        <TextInput
          value={detail}
          style={[styles.input, !detail && statusLocal && styles.inputError]}
          multiline
          numberOfLines={2}
          onChangeText={setDetail}
          placeholder="Entrer la description de votre groupe"
        />
        
      <Block row space='between'>
        <Block>
          <Text style={styles.label}>{`Prix d'une part (${checkedDevise})`}</Text>
          <TextInput
            style={[styles.input, !amount && statusLocal && styles.inputError]}

            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="Enter Prix d'une part"
          />
        </Block>
        <Block>
        <Text style={styles.label}>Taux d'intérêt (%)</Text>
        <TextInput
            style={[styles.input, !interestValid && styles.inputError]} // Apply red border if not valid
            value={interest}
            onChangeText={handleInterestChange}
            keyboardType="numeric"
            placeholder="Taux d'intérêt"
          />
          {!interestValid && (
            <Text style={styles.errorText}>Entre 5 et 10%</Text>
          )}
        </Block>
      </Block>

      <Block row space='between'>
       
        <Block>
        <Text style={styles.label}>{`Frais Adhesion (${checkedDevise})`}</Text>
        <TextInput
          style={[styles.input, !fraisAdhesion && statusLocal && styles.inputError]}
          value={fraisAdhesion}
          onChangeText={setFraisAdhesion}
          keyboardType="numeric"
          placeholder="Le frais d'adhesion"
        />
        </Block>
        <Block>
        <Text style={styles.label}>{`Caisse solidaire (${checkedDevise})`}</Text>
        <TextInput
          style={[styles.input, !prixCaisseSolidaire && statusLocal && styles.inputError]}
          value={prixCaisseSolidaire}
          keyboardType="numeric"
          onChangeText={setPrixCaisseSolidaire}
          placeholder="Caisse solidaire"
        />
         
        </Block>
      </Block>
      

        <SafeAreaProvider>
          <View style={{justifyContent: 'center', flex: 1, alignItems: 'center', 
          marginBottom:20,}}>
            <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined" 
          style={[styles.btn, !date && statusLocal && styles.inputError]}

           >
              Choisir la date de début du cycle
            </Button>
            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
            <DatePickerModal
              locale="fr"
              mode="single"
              visible={open}
              onDismiss={onDismissSingle}
              date={date}
              presentationStyle="pageSheet"
              onConfirm={onConfirmSingle}
            />
         
        {date && (
          <Text style={{ marginTop: 20 }}>
            Le cycle de {cycleNumber} mois, soit du : {formatDateToFrench(date)} au 
             {formatDateToFrench( addMonths(date, cycleNumber))}
          </Text>
        )}
          </View>
          </View>
        </SafeAreaProvider>
       
       
        <Button mode='contained'  title="Creer un AVEC" onPress={handleAddAvec}  loading={status === 'loading'} 
        disabled={status === 'loading'} style={{marginBottom:19}}>Creer un AVEC</Button>
        <View style={{height:160,}}>
      
      </View>
      </ScrollView>
    );
  }
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.scrollContainer}>
        {/* Header section */}
        {renderHeader()}

        {avecForm()}

        <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{ backgroundColor: COLORS.peach}}
        wrapperStyle={{ bottom: 30 }}
       
        >
        <Text style={{color:COLORS.white}} >Veuillez vérifier votre connexion Internet </Text>
      
      </Snackbar>
      
      </View>
    
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    paddingHorizontal: 8,
    backgroundColor: COLORS.white,
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
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 1,
  },
  dropdown1BtnStyle: {
    //width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  //dropdown1BtnTxtStyle: {color: '#C5C5C5', },
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF', },
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  inputError: {
    borderColor: 'red', // Red border for invalid input
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
btn: {
  padding: 7, width:"100%"
}
});

export default AddAvec;
