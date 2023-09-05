import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const UseCondition = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Conditions d'Utilisation</Text>
      <Text style={styles.paragraph}>
        En utilisant l'application mobile African Fintech ("l'Application"), vous acceptez de respecter les conditions d'utilisation énoncées ci-dessous. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'Application.
      </Text>

      <Text style={styles.subtitle}>Utilisation de l'Application</Text>
      <Text style={styles.paragraph}>
        Vous vous engagez à utiliser l'Application conformément aux lois et réglementations en vigueur. Vous ne devez pas utiliser l'Application à des fins illégales, frauduleuses ou nuisibles.
      </Text>

      <Text style={styles.subtitle}>Propriété Intellectuelle</Text>
      <Text style={styles.paragraph}>
        Tous les droits de propriété intellectuelle relatifs à l'Application sont la propriété de African Fintech. Vous n'êtes pas autorisé à copier, modifier, distribuer ou reproduire l'Application sans autorisation expresse.
      </Text>

      <Text style={styles.subtitle}>Limitation de Responsabilité</Text>
      <Text style={styles.paragraph}>
        L'Application est fournie "telle quelle", sans garantie d'aucune sorte. Nous ne serons pas responsables des dommages directs, indirects, spéciaux, consécutifs ou punitifs résultant de l'utilisation de l'Application.
      </Text>

      <Text style={styles.subtitle}>Modifications des Conditions</Text>
      <Text style={styles.paragraph}>
        Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. Les modifications prendront effet dès leur publication sur l'Application. Il vous est conseillé de consulter régulièrement cette page pour rester informé des changements.
      </Text>

      <Text style={styles.subtitle}>Contact</Text>
      <Text style={styles.paragraph}>
        Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter à info@alphanewgroup.com.
      </Text>
      <Text style={styles.subtitle}></Text>

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
    marginTop: 15,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
  },
});

export default UseCondition;
