import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo ao RepackApp!</Text>
        <Text style={styles.subtitle}>
          Este é um exemplo de aplicação com Module Federation
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Detail')}
          >
            <Text style={styles.buttonText}>Ir para Detail</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.miniAppButton]}
            onPress={() => navigation.navigate('MiniApp')}
          >
            <Text style={styles.buttonText}>Abrir MiniApp1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.cdnButton]}
            onPress={() => navigation.navigate('MiniAppCDN')}
          >
            <Text style={styles.buttonText}>MiniApp do CDN 22</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  miniAppButton: {
    backgroundColor: '#34C759',
  },
  cdnButton: {
    backgroundColor: '#FF9500',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
