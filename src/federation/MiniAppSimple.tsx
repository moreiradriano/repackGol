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

// Simulação de carregamento assíncrono
const loadMiniAppModule = async () => {
  // Simular delay de carregamento
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Retornar o componente do MiniApp
  return React.lazy(() => import('../screens/MiniAppNavigator'));
};

// Componente de loading
const LoadingComponent = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#3498db" />
    <Text style={styles.loadingText}>Carregando MiniApp...</Text>
    <Text style={styles.loadingSubtext}>
      Simulando carregamento de módulo federado
    </Text>
  </View>
);

// Componente de erro
const ErrorComponent = ({ onRetry }: { onRetry: () => void }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorTitle}>Erro ao carregar MiniApp</Text>
    <Text style={styles.errorText}>
      Não foi possível carregar o módulo. Isso é normal em desenvolvimento.
    </Text>
    <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
      <Text style={styles.retryButtonText}>Tentar novamente</Text>
    </TouchableOpacity>
  </View>
);

// Componente principal que simula Module Federation
const MiniAppSimple: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [MiniAppComponent, setMiniAppComponent] =
    React.useState<React.ComponentType | null>(null);

  const loadModule = async () => {
    try {
      setLoading(true);
      setError(false);

      // Simular carregamento do módulo
      const LazyComponent = await loadMiniAppModule();
      setMiniAppComponent(() => LazyComponent);
    } catch (err) {
      console.error('Erro ao carregar módulo:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadModule();
  }, []);

  const handleRetry = () => {
    loadModule();
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
          <Text style={styles.headerTitle}>MiniApp (Simulado)</Text>
        </View>
        <LoadingComponent />
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
          <Text style={styles.headerTitle}>MiniApp (Erro)</Text>
        </View>
        <ErrorComponent onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  if (!MiniAppComponent) {
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
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Módulo não encontrado</Text>
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
        <Text style={styles.headerTitle}>MiniApp (Carregado)</Text>
      </View>

      <React.Suspense fallback={<LoadingComponent />}>
        <MiniAppComponent />
      </React.Suspense>
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
    fontSize: 20,
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

export default MiniAppSimple;
