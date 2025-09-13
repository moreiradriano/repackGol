import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import MiniAppWorking from '../federation/MiniAppWorking';

const MainStack = createNativeStackNavigator();

const MainNavigator: React.FC = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerTitle: 'RepackApp',
        headerBackTitleVisible: false,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: 'rgba(255,255,255,1)',
      }}
    >
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Início',
        }}
      />
      <MainStack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          title: 'Detalhes',
        }}
      />
      <MainStack.Screen
        name="MiniApp"
        component={MiniAppWorking}
        options={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(56, 30, 114, 1)',
  },
  headerTitle: {
    color: 'rgba(255,255,255,1)',
    fontWeight: 'bold',
  },
});

export default MainNavigator;
