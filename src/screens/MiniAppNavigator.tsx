import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

// Componente de exemplo para o MiniApp
const MiniAppHome: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🚀 MiniApp Carregado!</Text>
        <Text style={styles.subtitle}>
          Este é um exemplo de módulo federado carregado dinamicamente
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recursos do MiniApp:</Text>
          <Text style={styles.cardItem}>✅ Carregamento assíncrono</Text>
          <Text style={styles.cardItem}>✅ Module Federation</Text>
          <Text style={styles.cardItem}>✅ Re.Pack Integration</Text>
          <Text style={styles.cardItem}>✅ React Suspense</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informações Técnicas:</Text>
          <Text style={styles.cardItem}>• Framework: React Native</Text>
          <Text style={styles.cardItem}>• Bundler: Re.Pack</Text>
          <Text style={styles.cardItem}>• Arquitetura: Micro-frontend</Text>
          <Text style={styles.cardItem}>• Carregamento: Lazy Loading</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Ação 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Ação 2
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const MiniAppNavigator: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <MiniAppHome />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 22,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  cardItem: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 8,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#3498db',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#3498db',
  },
});

export default MiniAppNavigator;
