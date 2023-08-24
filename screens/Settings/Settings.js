import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../../constants";
import { MaterialIcons } from "@expo/vector-icons";

const Settings = ({ navigation }) => {
  const navigateToEditProfile = () => {
    navigation.navigate("EditProfile");
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
    console.log("Language");
  };

  const navigateToMoney = () => {
    console.log("Money");
  };

  const navigateToSave = () => {
    console.log("Save");
  };

  const navigateToTermsAndPolicies = () => {
    console.log("Terms and Policies function");
  };

  const navigateToReportProblem = () => {
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

  const renderSettingsItem = ({ icon, text, action }) => (
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
    </TouchableOpacity>
  );

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
