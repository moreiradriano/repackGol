import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';

interface DetailScreenCDNProps {
  navigation: any;
}

const DetailScreenCDN: React.FC<DetailScreenCDNProps> = ({ navigation }) => {
  const [DetailScreenComponent, setDetailScreenComponent] =
    React.useState<React.ComponentType<{ navigation: any }> | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [cdnUrl, setCdnUrl] = React.useState(
    'https://silly-cuchufli-fad16d.netlify.app/detailscreen/detailscreen.7d626b20b99619f180f8.js',
  );

  const loadDetailScreenFromCDN = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log(`🌐 Carregando DetailScreen do CDN: ${cdnUrl}`);

      // Fazer download do bundle do CDN
      const response = await fetch(cdnUrl);

      if (!response.ok) {
        throw new Error(
          `Erro HTTP: ${response.status} - ${response.statusText}`,
        );
      }

      const bundleText = await response.text();
      console.log(
        `✅ Bundle baixado com sucesso! Tamanho: ${bundleText.length} caracteres`,
      );

      // Executar o bundle JavaScript do CDN
      console.log('🔄 Executando bundle do CDN...');

      // Mock do require para o bundle
      const mockModule: { exports: any } = { exports: {} };
      const mockRequire = (id: string) => {
        console.log(`🔍 Requerindo módulo: ${id}`);

        if (id === 'react' || id === 'React') return React;
        if (id === 'react-native' || id === 'ReactNative') {
          const RN = require('react-native');
          // Adicionar AppRegistry se não existir
          if (!RN.AppRegistry) {
            RN.AppRegistry = {
              registerComponent: (name: string, component: any) => {
                console.log(`📱 AppRegistry.registerComponent: ${name}`);
                return component;
              },
            };
          }
          return RN;
        }

        // Tentar importar outras dependências comuns
        try {
          return require(id);
        } catch (e) {
          console.warn(`⚠️ Módulo não encontrado: ${id}`);
          return {};
        }
      };

      // Criar um ambiente global para executar o bundle
      const globalObj = (globalThis as any) || {};

      // Adicionar variáveis globais que o bundle pode precisar
      globalObj.React = React;
      globalObj.ReactNative = require('react-native');
      globalObj.require = mockRequire;
      globalObj.module = mockModule;
      globalObj.exports = mockModule.exports;

      // Executar o bundle JavaScript
      try {
        const bundleFunction = new Function(
          'global',
          'window',
          'globalThis',
          'require',
          'module',
          'exports',
          'React',
          'ReactNative',
          bundleText,
        );

        bundleFunction(
          globalObj,
          globalObj,
          globalObj,
          mockRequire,
          mockModule,
          mockModule.exports,
          React,
          require('react-native'),
        );

        // Extrair o componente do bundle executado
        console.log('🔍 MockModule exports:', Object.keys(mockModule.exports));
        console.log('🔍 GlobalObj keys:', Object.keys(globalObj));

        let DetailScreenComponent = null;

        if (mockModule.exports.default) {
          DetailScreenComponent = mockModule.exports.default;
          console.log('✅ Encontrado em mockModule.exports.default');
        } else if (mockModule.exports.DetailScreen) {
          DetailScreenComponent = mockModule.exports.DetailScreen;
          console.log('✅ Encontrado em mockModule.exports.DetailScreen');
        } else if (globalObj.DetailScreen) {
          DetailScreenComponent = globalObj.DetailScreen;
          console.log('✅ Encontrado em globalObj.DetailScreen');
        }

        if (
          DetailScreenComponent &&
          typeof DetailScreenComponent === 'function'
        ) {
          setDetailScreenComponent(() => DetailScreenComponent);
          console.log('✅ Componente DetailScreen extraído do bundle CDN!');
        } else {
          console.error(
            '❌ Componente não encontrado. Exports:',
            mockModule.exports,
          );
          throw new Error('Componente DetailScreen não encontrado no bundle');
        }
      } catch (execError) {
        console.error('❌ Erro ao executar bundle do CDN:', execError);
        const errorMessage =
          execError instanceof Error ? execError.message : 'Erro desconhecido';
        throw new Error(`Falha na execução do bundle: ${errorMessage}`);
      }

      console.log('✅ DetailScreen carregado com sucesso do CDN!');
    } catch (err) {
      console.error('❌ Erro ao carregar DetailScreen do CDN:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadDetailScreenFromCDN();
  }, []);

  if (loading) {
    return (
      <SafeAreaViewContext style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Carregando DetailScreen...</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Carregando módulo...</Text>
          <Text style={styles.loadingSubtext}>
            Simulando carregamento de micro-frontend
          </Text>
        </View>
      </SafeAreaViewContext>
    );
  }

  if (error) {
    return (
      <SafeAreaViewContext style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Erro no DetailScreen</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>❌ Erro ao carregar</Text>
          <Text style={styles.errorText}>
            Não foi possível carregar o módulo DetailScreen.
          </Text>
          <Text style={styles.errorText}>Erro: {error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              setLoading(true);
              setError(null);
              loadDetailScreenFromCDN();
            }}
          >
            <Text style={styles.retryButtonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaViewContext>
    );
  }

  if (!DetailScreenComponent) {
    return (
      <SafeAreaViewContext style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>DetailScreen do CDN</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>DetailScreen Carregado</Text>
          <Text style={styles.subtitle}>
            O DetailScreen foi carregado com sucesso do CDN!
          </Text>
          <Text style={styles.subtitle}>Bundle baixado: {cdnUrl}</Text>
        </View>
      </SafeAreaViewContext>
    );
  }

  return (
    <SafeAreaViewContext style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DetailScreen do CDN</Text>
      </View>
      {DetailScreenComponent ? (
        <DetailScreenComponent navigation={navigation} />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>DetailScreen Carregado</Text>
          <Text style={styles.subtitle}>
            O DetailScreen foi carregado com sucesso do CDN!
          </Text>
          <Text style={styles.subtitle}>Bundle baixado: {cdnUrl}</Text>
        </View>
      )}
    </SafeAreaViewContext>
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
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
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

export default DetailScreenCDN;
