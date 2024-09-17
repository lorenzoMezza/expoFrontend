import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { darkPalette } from '../constants/colorPalette';
import { Tabs } from 'expo-router'; 
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
          screenOptions={{ headerShown: false }} 
          initialRouteName="mapPage" 
        >
          <Tabs.Screen
            name="shopPage"
            options={{
              tabBarLabel: "Shop", 
            }}
          />
          <Tabs.Screen
            name="userPage"
            options={{
              tabBarLabel: "Profile", 
            }}
          />
          <Tabs.Screen
            name="mapPage"
            options={{
              tabBarLabel: "Map", 
            }}
          />
          <Tabs.Screen
            name="eventsPage"
            options={{
              tabBarLabel: "Events", 
            }}
          />
          <Tabs.Screen
            name="messagingPage"
            options={{
              tabBarLabel: "Chats",
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
