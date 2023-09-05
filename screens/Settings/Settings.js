import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../../constants";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = ({ navigation }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getTokenFromAsyncStorage = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('user');
        setToken(storedToken);
        
      } catch (error) {
        // Handle AsyncStorage read error if needed
        console.error('Error reading token from AsyncStorage:', error);
      }
    };

    getTokenFromAsyncStorage();
    console.log("ok", JSON.parse(token)?.user );
  },[]);

  const navigateToEditProfile = () => {
    navigation.navigate("EditProfile", { user: {...JSON.parse(token)?.user?.user, name: JSON.parse(token)?.user?.user?.username }}); //  JSON.parse(token)?.user?.user?.userId == route.params.userId?
  };

  const navigateToSecurity = () => {
    navigation.navigate('DataSecurityScreen');
    console.log("Security function");
  };

  const navigateToPrivacy = () => {
    navigation.navigate('Privacy')
    console.log("Privacy function");
  };

  const navigateToSubscription = () => {
    console.log("Subscription function");
  };

  const navigateToSupport = () => {
    navigation.navigate('AideEtSupport')
    console.log("Support function");
  };

  const navigateToCategory = () => {
    console.log("Cat");
  };

  const navigateToLanguage = () => {
    navigation.navigate('LanguageSelectionScreen')
    console.log("Language");
  };

  const navigateToMoney = () => {
    console.log("Money");
  };

  const navigateToSave = () => {
    console.log("Save");
  };

  const navigateToTermsAndPolicies = () => {
    navigation.navigate('UseCondition')
    console.log("Terms and Policies function");
  };

  const navigateToReportProblem = () => {
    navigation.navigate('ReportProblemScreen')
    console.log("Report a problem");
  };

  const logout = () => {
    console.log("Logout");
  };

  const accountItems = [
    {
      icon: "person-outline",
      text: "Modifier votre Profile",
      action: navigateToEditProfile,
      conected: JSON.parse(token)?.user?.user != undefined
    },
    { icon: "security", text: "Sécurité", action: navigateToSecurity },

    { icon: "lock-outline", text: "Politique de confidentialité", action: navigateToPrivacy },
    { icon: "attach-money", text: "Monnaie principale", action: navigateToMoney },
    { icon: "category", text: "Mes catégories", action: navigateToCategory },
  ];

  const supportItems = [
    {
      icon: "credit-card",
      text: "Mon porte-monnaie électronique",
      action: navigateToSubscription,
    },
    { icon: "help-outline", text: "Aide & Support", action: navigateToSupport },
    {
      icon: "info-outline",
      text: "Condition d'utilisation",
      action: navigateToTermsAndPolicies,
    },
  ];

  const actionsItems = [
    {
      icon: "outlined-flag",
      text: "Signaler un problème",
      action: navigateToReportProblem,
    },
    { icon: "save", text: "Exporter les données", action: navigateToSave },
    { icon: "language", text: "Langues", action: navigateToLanguage },
    { icon: "logout", text: "Déconnexion", action: logout },
  ];

  const renderSettingsItem = ({ icon, text, action, conected=true}) => {
  if (!conected) {
    return
  }
  return (
    <TouchableOpacity
      onPress={action}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingLeft: 12,
        backgroundColor: COLORS.lightGray,
      }}
    >
      <MaterialIcons name={icon} size={24} color="black" />
      <Text
        style={{
          marginLeft: 36,
          ...FONTS.body3,
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        {text}{" "}
      </Text>
    </TouchableOpacity>)
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          marginVertical:15,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
          }}
        >
          <MaterialIcons
            name="keyboard-backspace"
            size={28}
            color={COLORS.black}
          />
        </TouchableOpacity>

        <Text style={{ ...FONTS.h2 }}>  Parametres</Text>
      </View>

      <ScrollView style={{ marginHorizontal: 12 }}>
        {/* Account Settings */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10 }}>Compte</Text>
          <View
            style={{
              borderRadius: 12,
              backgrounColor: COLORS.lightGray,
            }}
          >
            {accountItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Support and About settings */}

        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10 }}>
            A propos{" "}
          </Text>
          <View
            style={{
              borderRadius: 12,
              backgrounColor: COLORS.lightGray,
            }}
          >
            {supportItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>


        {/* Actions Settings */}

        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10 }}>Actions</Text>
          <View
            style={{
              borderRadius: 12,
              backgrounColor: COLORS.gray,
            }}
          >
            {actionsItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
