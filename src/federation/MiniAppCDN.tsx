import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';

interface MiniAppCDNProps {
  navigation: any;
}

const MiniAppCDN: React.FC<MiniAppCDNProps> = ({ navigation }) => {
  const [MiniAppComponent, setMiniAppComponent] =
    React.useState<React.ComponentType | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [cdnUrl, setCdnUrl] = React.useState('https://seu-cdn.com/miniapp/');

  const loadMiniAppFromCDN = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log(`🌐 Tentando carregar MiniApp do CDN: ${cdnUrl}`);

      // Simular carregamento do CDN
      await new Promise<void>(resolve => setTimeout(resolve, 2000));

      // Simular erro de CDN (para demonstração)
      // throw new Error(
      //   `MiniApp não encontrado no CDN: ${cdnUrl}\n\nPara testar o CDN:\n1. Faça upload dos arquivos de dist/miniapp/ para seu CDN\n2. Atualize a URL do CDN no campo acima\n3. Configure CORS no seu CDN\n\nArquivos gerados:\n- miniapp.ios.js (922KB)\n- miniapp.android.js (926KB)`,
      // );
    } catch (err) {
      console.error('Erro ao carregar MiniApp do CDN:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadMiniAppFromCDN();
  }, []);

  const handleRetry = () => {
    loadMiniAppFromCDN();
  };

  const handleUpdateCDNUrl = () => {
    if (cdnUrl.trim()) {
      loadMiniAppFromCDN();
    } else {
      Alert.alert('Erro', 'Por favor, insira uma URL válida do CDN');
    }
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
          <Text style={styles.headerTitle}>Carregando do CDN</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Carregando MiniApp do CDN...</Text>
          <Text style={styles.loadingSubtext}>URL: {cdnUrl}</Text>
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
          <Text style={styles.headerTitle}>Erro no CDN</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>❌ Erro ao carregar do CDN</Text>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.cdnUrl}>URL: {cdnUrl}</Text>

          {/* Card informativo sobre arquivos gerados */}
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>
              📁 Arquivos gerados para CDN:
            </Text>
            <Text style={styles.infoCardText}>• miniapp.ios.js (922KB)</Text>
            <Text style={styles.infoCardText}>
              • miniapp.android.js (926KB)
            </Text>
            <Text style={styles.infoCardText}>• Source maps (.map)</Text>
            <Text style={styles.infoCardText}>• Pasta: dist/miniapp/</Text>
          </View>

          {/* Campo para atualizar URL do CDN */}
          <View style={styles.urlInputContainer}>
            <Text style={styles.urlInputLabel}>URL do CDN:</Text>
            <TextInput
              style={styles.urlInput}
              value={cdnUrl}
              onChangeText={setCdnUrl}
              placeholder="https://seu-cdn.com/miniapp/"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.updateButton}
              onPress={handleUpdateCDNUrl}
            >
              <Text style={styles.updateButtonText}>Atualizar URL</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
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
          <Text style={styles.headerTitle}>MiniApp CDN</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>MiniApp não carregado</Text>
          <Text style={styles.subtitle}>
            O componente MiniApp não foi carregado do CDN
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
        <Text style={styles.headerTitle}>MiniApp do CDN</Text>
      </View>
      <MiniAppComponent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#3498db',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    textAlign: 'center',
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 16,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  cdnUrl: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  infoCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#17a2b8',
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  infoCardText: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  urlInputContainer: {
    marginVertical: 16,
  },
  urlInputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  urlInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
    marginBottom: 12,
  },
  updateButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  retryButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
});

export default MiniAppCDN;
