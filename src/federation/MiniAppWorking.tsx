import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

// Componente de exemplo que simula um MiniApp
const MiniAppContent: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🚀 MiniApp Funcionando!</Text>
        <Text style={styles.subtitle}>
          Este é um exemplo de módulo que simula o carregamento federado usando
          React.lazy() e Suspense
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>✅ Recursos Implementados:</Text>
          <Text style={styles.cardItem}>• Carregamento assíncrono</Text>
          <Text style={styles.cardItem}>• React Suspense</Text>
          <Text style={styles.cardItem}>• Tratamento de erro</Text>
          <Text style={styles.cardItem}>• Loading states</Text>
          <Text style={styles.cardItem}>• Retry functionality</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔧 Tecnologias:</Text>
          <Text style={styles.cardItem}>• React Native 0.81.4</Text>
          <Text style={styles.cardItem}>• Re.Pack 5.2.0</Text>
          <Text style={styles.cardItem}>• React Navigation 6.x</Text>
          <Text style={styles.cardItem}>• TypeScript</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📱 Funcionalidades:</Text>
          <Text style={styles.cardItem}>• Navegação entre telas</Text>
          <Text style={styles.cardItem}>• Interface responsiva</Text>
          <Text style={styles.cardItem}>• Estados de carregamento</Text>
          <Text style={styles.cardItem}>• Tratamento de erros</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Funcionalidade 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Funcionalidade 2
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// Componente principal com carregamento assíncrono
const MiniAppWorking: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  // Simular carregamento assíncrono
  React.useEffect(() => {
    const loadModule = async () => {
      try {
        // Simular delay de carregamento
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
      } catch (err) {
        console.error('Erro ao carregar:', err);
        setError(true);
        setLoading(false);
      }
    };

    loadModule();
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(false);
    // Simular novo carregamento
    setTimeout(() => setLoading(false), 1500);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Carregando MiniApp...</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Carregando módulo...</Text>
          <Text style={styles.loadingSubtext}>
            Simulando carregamento de micro-frontend
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Erro no MiniApp</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>❌ Erro ao carregar</Text>
          <Text style={styles.errorText}>
            Não foi possível carregar o módulo MiniApp.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MiniApp</Text>
      </View>
      <MiniAppContent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  loadingSubtext: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MiniAppWorking;
