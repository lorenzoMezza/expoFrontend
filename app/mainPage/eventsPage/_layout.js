import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native-paper';
import NearbyEvents from './nearbyEvents';
import JoinedEvents from './joinedEvents';
import MyEvents from './myEvents';

// Crea il navigatore dei tab superiori
const Tab = createMaterialTopTabNavigator();

// Crea il navigatore dello stack
const Stack = createNativeStackNavigator();

const TopTabs = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#ff6347', // Colore del testo del tab attivo
          tabBarInactiveTintColor: '#555', // Colore del testo dei tab inattivi
          tabBarLabelStyle: { fontSize: 14 }, // Dimensione del testo dei tab
          tabBarStyle: { backgroundColor: '#f0f0f0' }, // Colore di sfondo della barra dei tab
          tabBarIndicatorStyle: { backgroundColor: '#ff6347' }, // Colore dell'indicatore del tab attivo
          tabBarItemStyle: { marginHorizontal: 10 }, // Spazio tra le tab
          tabBarContentContainerStyle: { flexDirection: 'row' }, // Assicura che il contenitore dei tab non si estenda oltre il necessario
          tabBarScrollEnabled: false, // Disabilita lo scrolling orizzontale dei tab
        }}
      >
        <Tab.Screen name="Nearby" component={NearbyEvents} />
        <Tab.Screen name="Joined" component={JoinedEvents} />
        <Tab.Screen name="Owned" component={MyEvents} />
        {/* Aggiungi altri tab se necessario */}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const Layout = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="index"
      component={TopTabs}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default Layout;

// Esempio di componenti delle schermate
const Tab1Screen = () => (
  <View style={styles.searchBarContainer}>
    {/* Aggiungi il contenuto della SearchBar qui */}
  </View>
);

const Tab2Screen = () => (
  <View style={styles.screen}>
    <Text>Contenuto di Tab2</Text>
  </View>
);

// Stili
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  searchBarContainer: {
    padding: 10,
    backgroundColor: '#fff', // Colore di sfondo della SearchBar
  },
  searchBar: {
    borderRadius: 20, // Opzionale: Arrotonda gli angoli della SearchBar
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
