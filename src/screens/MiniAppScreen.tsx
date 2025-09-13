import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Federated } from '@callstack/repack/client';

// Componente de fallback para carregamento
const FallbackComponent = () => (
  <View style={styles.fallbackContainer}>
    <ActivityIndicator color="rgba(56, 30, 114, 1)" size="large" />
    <Text style={styles.fallbackText}>Carregando MiniApp...</Text>
  </View>
);

// Componente de erro
const ErrorComponent = ({ onRetry }: { onRetry: () => void }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorTitle}>Erro ao carregar MiniApp</Text>
    <Text style={styles.errorText}>
      Não foi possível carregar o módulo federado.
    </Text>
    <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
      <Text style={styles.retryButtonText}>Tentar novamente</Text>
    </TouchableOpacity>
  </View>
);

// Componente principal do MiniApp
const MiniAppContent = React.lazy(() =>
  Federated.importModule('HostApp', './MiniAppNavigator'),
);

interface MiniAppScreenProps {
  navigation: any;
}

const MiniAppScreen: React.FC<MiniAppScreenProps> = ({ navigation }) => {
  const [retryKey, setRetryKey] = React.useState(0);

  const handleRetry = () => {
    setRetryKey(prev => prev + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MiniApp</Text>
      </View>

      <View style={styles.content}>
        <React.Suspense fallback={<FallbackComponent />}>
          <MiniAppContent key={retryKey} />
        </React.Suspense>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  content: {
    flex: 1,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fallbackText: {
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
    color: '#FF3B30',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
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

export default MiniAppScreen;
