import React from 'react';
import { Federated } from '@callstack/repack/client';

// Componente que carrega o MiniApp de forma federada
const MiniAppFederated: React.FC = () => {
  const [MiniAppComponent, setMiniAppComponent] =
    React.useState<React.ComponentType | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
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

    loadMiniApp();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        <p style={{ marginTop: '10px', color: '#666' }}>
          Carregando MiniApp...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <h3 style={{ color: '#e74c3c', marginBottom: '10px' }}>
          Erro ao carregar MiniApp
        </h3>
        <p style={{ color: '#666', textAlign: 'center' }}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (!MiniAppComponent) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <p style={{ color: '#666' }}>Módulo não encontrado</p>
      </div>
    );
  }

  return <MiniAppComponent />;
};

export default MiniAppFederated;
