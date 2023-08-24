import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking, TouchableOpacity } from 'react-native';

const AideEtSupport = () => {
  const handleContactSupport = () => {
    // Replace with your support email or contact form link
    const supportEmail = 'info@alphanewgroup.com';
    Linking.openURL(`mailto:${supportEmail}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Aide et Support</Text>
      <Text style={styles.paragraph}>
        Bienvenue dans la section d'aide et de support de l'application BOMOKO Cash. Nous sommes là pour vous aider à résoudre tout problème que vous pourriez rencontrer lors de l'utilisation de notre application.
      </Text>

      <Text style={styles.subtitle}>FAQ</Text>
      <Text style={styles.paragraph}>
        Consultez notre FAQ pour obtenir des réponses aux questions fréquemment posées. Si vous ne trouvez pas la réponse à votre question, n'hésitez pas à nous contacter.
      </Text>

      <Text style={styles.subtitle}>Nous Contacter</Text>
      <Text style={styles.paragraph}>
        Si vous avez besoin d'une assistance supplémentaire, n'hésitez pas à nous contacter. Vous pouvez nous envoyer un e-mail à l'adresse suivante :
         <Text style={styles.link}>info@alphanewgroup.com</Text>.
      </Text>
      <TouchableOpacity style={styles.contactButton} onPress={handleContactSupport}>
        <Text style={styles.buttonText}>Contacter le Support</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Centre d'Aide</Text>
      <Text style={styles.paragraph}>
        Visitez notre centre d'aide en ligne pour accéder à des guides détaillés, des tutoriels et des ressources pour vous aider à tirer le meilleur parti de l'application BOMOKO Cash.
      </Text>
      <TouchableOpacity style={styles.helpCenterButton}>
        <Text style={styles.buttonText}>Accéder au Centre d'Aide</Text>
      </TouchableOpacity>
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
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  contactButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  helpCenterButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AideEtSupport;
