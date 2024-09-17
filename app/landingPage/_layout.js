import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import { darkPalette } from '../constants/colorPalette';

const RootLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar
        style="light"
        backgroundColor={darkPalette.background}
        translucent={true}
      />
      
      <View style={[styles.container, { marginTop: -insets.top, marginBottom: -insets.bottom }]}>
        <Stack>
          <Stack.Screen
            name="loginWithEmail"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="registerWithEmail"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="needAssistance"
            options={{
              headerShown: true,
              title: 'F.A.Q', // Titolo dell'header
              headerStyle: {
                backgroundColor: darkPalette.background,
              },
              headerTintColor: "#E0E0E0", // Colore del testo dell'header
              headerBackTitle: 'Back', // Testo del bottone "Back"
              headerBackTitleVisible: true, // Mostra il testo del bottone "Back"
            }}
          />
        </Stack>
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
