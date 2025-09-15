import React from 'react';
import { AppRegistry } from 'react-native';
import DetailScreen from './src/screens/DetailScreen';

// Registrar o componente para ser usado remotamente
AppRegistry.registerComponent('DetailScreen', () => DetailScreen);

// Exportar como default para Module Federation
export default DetailScreen;
