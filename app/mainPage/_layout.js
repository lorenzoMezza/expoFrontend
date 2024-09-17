import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { darkPalette } from '../constants/colorPalette';
import { Tabs } from 'expo-router'; // Usa Tabs di expo-router
import { TabBar } from '../components/TabBar';

const RootLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar
        style="light"
        backgroundColor={darkPalette.background}
        translucent
      />
      <View style={[styles.container, { marginTop: -insets.top, marginBottom: -insets.bottom }]}>
        <Tabs
          tabBar={props => <TabBar {...props}/>}
          screenOptions={{ headerShown: false }} // Nasconde l'header per tutte le schermate
          initialRouteName="mapPage" // Imposta la tab iniziale su "mapPage"
        >
          <Tabs.Screen
            name="shopPage"
            options={{
              tabBarLabel: "Shop", // Nome personalizzato
            }}
          />
          <Tabs.Screen
            name="userPage"
            options={{
              tabBarLabel: "Profile", // Nome personalizzato
            }}
          />
          <Tabs.Screen
            name="mapPage"
            options={{
              tabBarLabel: "Map", // Nome personalizzato
            }}
          />
          <Tabs.Screen
            name="eventsPage"
            options={{
              tabBarLabel: "Events", // Nome personalizzato
            }}
          />
          <Tabs.Screen
            name="messagingPage"
            options={{
              tabBarLabel: "Chats", // Nome personalizzato
            }}
          />
        </Tabs>
      </View>
    </>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkPalette.background,
  },
});
