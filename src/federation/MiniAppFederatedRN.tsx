import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Federated } from '@callstack/repack/client';

// Componente que carrega o MiniApp de forma federada no React Native
const MiniAppFederatedRN: React.FC = () => {
  const [MiniAppComponent, setMiniAppComponent] =
    React.useState<React.ComponentType | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const loadMiniApp = async () => {
    try {
      setLoading(true);
      setError(null);

      // Tentar carregar o módulo federado
      const module = await Federated.importModule(
        'HostApp',
        './MiniAppNavigator',
      );
      setMiniAppComponent(() => module.default || module);
    } catch (err) {
      console.error('Erro ao carregar MiniApp:', err);
      setError('Erro ao carregar o módulo federado');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadMiniApp();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Carregando MiniApp...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Erro ao carregar MiniApp</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadMiniApp}>
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!MiniAppComponent) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Módulo não encontrado</Text>
      </View>
    );
  }

  return <MiniAppComponent />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
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

export default MiniAppFederatedRN;
