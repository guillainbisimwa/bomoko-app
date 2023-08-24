import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const DataSecurityScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Sécurité des Données</Text>
      <Text style={styles.paragraph}>
        Chez BOMOKO Cash, nous accordons une importance capitale à la sécurité de vos données personnelles. Cette page vise à vous informer sur les mesures que nous prenons pour protéger vos informations.
      </Text>

      <Text style={styles.subtitle}>Protection des Données</Text>
      <Text style={styles.paragraph}>
        Nous utilisons des technologies de pointe pour sécuriser vos données contre tout accès non autorisé, toute divulgation ou toute modification non souhaitée. Les transactions financières sont cryptées à l'aide de protocoles sécurisés pour garantir la confidentialité de vos informations financières.
      </Text>

      <Text style={styles.subtitle}>Sécurité des Transactions</Text>
      <Text style={styles.paragraph}>
        Lorsque vous effectuez des transactions via notre application, nous utilisons des protocoles sécurisés pour garantir la confidentialité et l'intégrité de ces transactions. Vos informations financières sont traitées de manière sécurisée et conformément aux normes de sécurité de l'industrie.
      </Text>

      <Text style={styles.subtitle}>Authentification à Deux Facteurs</Text>
      <Text style={styles.paragraph}>
        Nous offrons une option d'authentification à deux facteurs pour renforcer la sécurité de votre compte. Cette fonctionnalité ajoute une couche supplémentaire de protection en demandant une deuxième preuve d'identité au-delà du mot de passe.
      </Text>

      <Text style={styles.subtitle}>Suivi des Activités Suspectes</Text>
      <Text style={styles.paragraph}>
        Notre équipe de sécurité surveille en permanence les activités suspectes et non autorisées sur nos systèmes. Toute activité inhabituelle est immédiatement détectée et traitée pour garantir la sécurité de vos données.
      </Text>

      <Text style={styles.subtitle}>Engagement envers la Sécurité</Text>
      <Text style={styles.paragraph}>
        Nous nous engageons à maintenir en permanence nos systèmes et nos pratiques de sécurité à jour pour protéger vos données. Nous effectuons régulièrement des audits de sécurité et prenons des mesures pour corriger toute vulnérabilité détectée.
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

export default DataSecurityScreen;
