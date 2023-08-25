import { Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants";

const Privacy = ({  }) => {

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <ScrollView style={{ marginHorizontal: 12 }}>
        {/* Account Privacy */}
        <Text style={styles.title1}>Politique de Confidentialité</Text>
        <Text style={styles.subtitle}>Date d'entrée en vigueur : 24/08/2023</Text>
        

      <Text style={styles.paragraph}>
        Nous sommes ravis de vous accueillir sur l'application mobile BOMOKO Cash ("l'Application"). Cette Politique de Confidentialité a été élaborée pour vous informer de la manière dont nous collectons, utilisons, partageons et protégeons vos informations personnelles. En utilisant notre Application, vous consentez aux pratiques décrites dans cette politique.
      </Text>

      <Text style={styles.subtitle}>Collecte et Utilisation des Informations</Text>
      <Text style={styles.paragraph}>
        Nous collectons des informations personnelles telles que votre nom, adresse e-mail, numéro de téléphone et données financières, dans le but de fournir nos services financiers et d'améliorer votre expérience utilisateur. Ces informations sont utilisées pour gérer votre portefeuille électronique, suivre vos revenus et dépenses, et vous fournir des informations financières utiles.
      </Text>

      <Text style={styles.subtitle}>Partage d'Informations</Text>
      <Text style={styles.paragraph}>
        Nous pouvons partager vos informations personnelles avec des partenaires de confiance pour faciliter certaines fonctionnalités de l'Application, telles que le traitement des transactions et l'analyse financière. Cependant, nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers à des fins de marketing.
      </Text>

      <Text style={styles.subtitle}>Protection des Données</Text>
      <Text style={styles.paragraph}>
        Nous prenons des mesures de sécurité appropriées pour protéger vos informations personnelles contre l'accès non autorisé, la divulgation ou la modification. Les transactions financières sont sécurisées à l'aide de technologies de cryptage avancées.
      </Text>

      <Text style={styles.subtitle}>Vos Choix</Text>
      <Text style={styles.paragraph}>
        Vous pouvez accéder, corriger ou supprimer vos informations personnelles en nous contactant à info@alphanewgroup.com. Vous avez également le droit de retirer votre consentement à tout moment.
      </Text>

      <Text style={styles.subtitle}>Mises à Jour de la Politique</Text>
      <Text style={styles.paragraph}>
        Nous nous réservons le droit de mettre à jour cette Politique de Confidentialité à tout moment. Les modifications seront publiées sur l'Application et prendront effet dès leur publication.
      </Text>

      <Text style={styles.footer}>
        En utilisant l'application BOMOKO Cash, vous acceptez les termes de cette Politique de Confidentialité.
      </Text>

      <Text style={styles.contact}>
        Pour toute question concernant cette Politique de Confidentialité, veuillez nous contacter à info@alphanewgroup.com.
      </Text>
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
    fontWeight:'bold'
  },

  paragraph: {
    fontSize: 16,
    //padding: 20,
    margin:20,
    lineHeight: 22,

  },
  footer: {
    fontSize: 16,
    marginTop: 20,
    fontStyle: 'italic',
  },
  contact: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 30,
  },
 
});

export default Privacy;
