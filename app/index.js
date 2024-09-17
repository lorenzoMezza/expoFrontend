import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { darkPalette } from './constants/colorPalette';
import { Platform } from 'react-native';
export default function Page() {
  const router = useRouter(); 
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
    
      router.replace('/mainPage');
    }
  }, [isMounted, router]);

  return (
    <View style={styles.container}>
      <StatusBar
        style="light"
        backgroundColor={darkPalette.background} 
        translucent={false} 
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkPalette.background,
  },
});
