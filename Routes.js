import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import InitialLoader from './screens/InitialLoader';
import Onboard from './navigations/Onboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setInstalled, setUnInstalled } from './redux/appReducer';
import { LoginScreen } from './screens/LoginScreen/LoginScreen';
import { AuthScreen } from './screens/AuthScreen/AuthScreen';
import { resetAllCat } from './redux/catReducer';
import MyDrawer from './navigations/MyDrawer';
import { Expense, Income } from './screens';
import { COLORS, icons } from './constants';
import Details from './screens/Product/Details';
import AddProduct from './screens/Product/AddProduct';
import { loginSuccess } from './redux/authReducer';
import { EditProfile, SignUpScreen } from './screens/SignUpScreen';
import EditProduct from './screens/Product/EditProduct';
import ShowImages from './screens/Product/ShowImages';
import ShoppingCard from './screens/ShoppingCard/ShoppingCard';
import { AideEtSupport, DataSecurityScreen, DetailsByUser, LanguageSelectionScreen, MagicValidation, Privacy, Profile, ReportProblemScreen, UseCondition } from './screens/Settings';
import { AddAvec, ConfirmPayment, DetailsAvec, DetailsReunion, EditAvec } from './screens/CreanceDette';
import { StatusBar } from 'expo-status-bar';
import CountyPhone from './screens/Auth/Component/CountyPhone';
import Account from './screens/Auth/Component/Account';
import OTP from './screens/Auth/Component/OTP';
import { ForgetPassword } from './screens/LoginScreen/components/ForgetPassword.js';
import { ResetPasswordProfile } from './screens/SignUpScreen/components/ResetPasswordProfile';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};

const Stack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [fontLoading, setFontLoading] = useState(false);

  const isInstalled = useSelector((state) => state.app.isInstalled);
  const u = useSelector((state) => state?.user);

  const income = 'income';
  const expense = 'expense';

  const cat = [
    {
      id: 1,
      name: 'Vente',
      icon: icons.shopping,
      cat: income,
      color: COLORS.purple,
      data: [],
    },
    {
      id: 2,
      name: 'Remboursement',
      icon: icons.refund,
      cat: income,
      color: COLORS.blue,
      data: [],
    },
    {
      id: 3,
      name: 'Intérêt',
      icon: icons.interest,
      cat: income,
      color: COLORS.darkgreen,
      data: [],
    },
    {
      id: 4,
      name: 'Subvention',
      icon: icons.grant,
      cat: income,
      color: COLORS.red,
      data: [],
    },
    {
      id: 5,
      name: 'Investissement',
      icon: icons.investment,
      cat: income,
      color: COLORS.peach,
      data: [],
    },

    {
      id: 6,
      name: 'Achat',
      icon: icons.shopping,
      cat: expense,
      color: COLORS.lightBlue,
      data: [],
    },
    {
      id: 7,
      name: 'Salaire',
      icon: icons.cash,
      cat: expense,
      color: COLORS.peach,
      data: [],
    },
    {
      id: 8,
      name: "Dépenses d'exploitation",
      icon: icons.cashbook,
      cat: expense,
      color: COLORS.darkgreen,
      data: [],
    },
    {
      id: 9,
      name: "Retraits d'argent",
      icon: icons.sell,
      cat: expense,
      color: COLORS.red,
      data: [],
    },
    {
      id: 10,
      name: 'Paiements de dettes',
      icon: icons.income,
      cat: expense,
      color: COLORS.yellow,
      data: [],
    },
    {
      id: 11,
      name: 'Autres entrées',
      icon: icons.more,
      cat: income,
      color: COLORS.gray,
      data: [],
    },

    {
      id: 12,
      name: 'Autres Sorties',
      icon: icons.more,
      cat: expense,
      color: COLORS.purple,
      data: [],
    },
  ];

  useEffect(() => {
    checkLoginStatus();
    setTimeout(() => setLoading(false), 2000);
    // AsyncStorage.clear();
    checkInstallationStatus();

    checkCategories();
  }, []);

  const checkInstallationStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('isInstalled');
      console.log('installed', value);
      if (value !== null && value === 'true') {
        dispatch(setInstalled());
      } else {
        setLoading(false);
        dispatch(setUnInstalled());
      }
    } catch (error) {
      console.log('Error retrieving installation status:', error);
      setLoading(false);
    }
  };

  const checkLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      // AsyncStorage.clear();

      console.log('value-user', value);
      if (value !== null) {
        dispatch(loginSuccess(value));
        //AsyncStorage.clear();
        //dispatch(logoutUser());

      } else {
        //setLoading(false);
        //dispatch(setUnInstalled());
      }
    } catch (error) {
      console.log('Error retrieving installation status:', error);
      //setLoading(false);
    }
  };

  const checkCategories = async () => {
    try {
      const value = await AsyncStorage.getItem('categories');
      //console.log('----------', value);

      if (value !== null) {
        //dispatch(addCat(JSON.parse(value)));
        dispatch(resetAllCat(JSON.parse(value)));
      } else {
        // setLoading(false);
        dispatch(resetAllCat([...cat]));
      }
    } catch (error) {
      console.log('Error retrieving categories status:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <InitialLoader />;
  }
  if (isInstalled) {
    return (
      <NavigationContainer theme={theme}>
        <StatusBar style="dark" />

        <Stack.Navigator initialRouteName={'MyDrawer'}>
          <Stack.Screen
            name="Main"
            component={MyDrawer}
            options={{
              headerShown: false,
              initialParams: { guy: "l" }, // Pass the value as initialParams
            }}
          />
          <Stack.Screen name="Income" component={Income} options={{ title: 'Crédit (Entrée)' }} />
          <Stack.Screen name="Expense" component={Expense} options={{ title: 'Débit (Sortie)' }} />
          <Stack.Screen name="Details" component={Details} options={{ title: 'Details' }} />
          <Stack.Screen name="AddProduct" component={AddProduct}
            options={{ title: 'Ajouter un Produit ou Service' }} />
          <Stack.Screen name="EditProduct" component={EditProduct} options={{ title: 'Modifier Produit' }} />
          <Stack.Screen name="ShowImages" component={ShowImages} options={{ title: 'Images' }} />
          <Stack.Screen name="ShoppingCard" component={ShoppingCard} options={{ title: 'Panier' }} />

          <Stack.Screen name="Privacy" component={Privacy} options={{ title: 'Politique de Confidentialité' }} />
          <Stack.Screen name="DataSecurityScreen" component={DataSecurityScreen} options={{ title: 'Sécurité des Données' }} />
          <Stack.Screen name="AideEtSupport" component={AideEtSupport} options={{ title: 'Aide et Support' }} />
          <Stack.Screen name="UseCondition" component={UseCondition} options={{ title: "Condition d'utilisation" }} />
          <Stack.Screen name="ReportProblemScreen" component={ReportProblemScreen} options={{ title: "Signaler un problème" }} />
          <Stack.Screen name="LanguageSelectionScreen" component={LanguageSelectionScreen} options={{ title: "Choisissez une Langue" }} />
          <Stack.Screen name="MagicValidation" component={MagicValidation} options={{ title: "Magic Validation" }} />

          <Stack.Screen name="DetailsByUser" component={DetailsByUser}
            options={{ title: '', headerShown: true }} />

          <Stack.Screen name="addAvec" component={AddAvec}
            options={{ title: 'Ajouter un groupe', headerShown: true }} />

          <Stack.Screen name="DetailsAvec" component={DetailsAvec}
            options={{ title: 'Details', headerShown: true }} />

          <Stack.Screen name="DetailsReunion" component={DetailsReunion}
            options={{ title: 'Details Reunion', headerShown: true }} />

          <Stack.Screen name="ConfirmPayment" component={ConfirmPayment}
            options={{ title: 'Confirmation', headerShown: true }} />

          <Stack.Screen name="EditAvec" component={EditAvec}
            options={{ title: 'Modifier AVEC', headerShown: true }} />

          <Stack.Screen name="EditProfile" component={EditProfile} options={{
            headerShown: false,
          }} />

          <Stack.Screen name="Profile" component={Profile} options={{ title: "Profile" }} />

          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
            headerShown: false,
          }} />

          <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{
            headerShown: false,
          }} />

          <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{
            headerShown: false,
          }} />

          <Stack.Screen name="ResetPasswordProfile" component={ResetPasswordProfile} options={{
            headerShown: false,
          }} />

          <Stack.Screen name="AuthScreen" component={AuthScreen} options={{
            headerShown: false,
          }} />

          <Stack.Screen name="CountyPhone" component={CountyPhone} options={{
            headerShown: false,
          }} />

          <Stack.Screen name="Account" component={Account} options={{
            headerShown: false,
          }} />


          <Stack.Screen name="OTP" component={OTP} options={{
            headerShown: false,
          }} />

        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (!isInstalled) {
    return <Onboard />;
  }
  return <InitialLoader />;
};

export default App;
