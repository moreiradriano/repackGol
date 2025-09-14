/**
 * Ponto de entrada específico para o MiniApp React Native
 * Este arquivo será usado para gerar o bundle do MiniApp para CDN
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import MiniAppWorking from './src/federation/MiniAppWorking';

// Registrar o MiniApp como um componente standalone
AppRegistry.registerComponent('MiniApp', () => MiniAppWorking);

// Exportar também como módulo ES6 para uso em outros contextos
export default MiniAppWorking;
