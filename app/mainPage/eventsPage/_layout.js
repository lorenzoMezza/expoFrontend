import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native-paper';
import NearbyEvents from './nearbyEvents';
import JoinedEvents from './joinedEvents';
import MyEvents from './myEvents';


const Tab = createMaterialTopTabNavigator();


const Stack = createNativeStackNavigator();

const TopTabs = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#ff6347', 
          tabBarInactiveTintColor: '#555',
          tabBarLabelStyle: { fontSize: 14 }, 
          tabBarStyle: { backgroundColor: '#f0f0f0' },
          tabBarIndicatorStyle: { backgroundColor: '#ff6347' },
          tabBarItemStyle: { marginHorizontal: 10 }, 
          tabBarContentContainerStyle: { flexDirection: 'row' },
          tabBarScrollEnabled: false,
        }}
      >
        <Tab.Screen name="Nearby" component={NearbyEvents} />
        <Tab.Screen name="Joined" component={JoinedEvents} />
        <Tab.Screen name="Owned" component={MyEvents} />
      
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


const Tab1Screen = () => (
  <View style={styles.searchBarContainer}>

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
    backgroundColor: '#fff', 
  },
  searchBar: {
    borderRadius: 20, 
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
