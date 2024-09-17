import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, ToastAndroid, Platform, Alert, Linking } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { miscellaneous } from '../constants/miscellaneous';

const FAQ = ({ navigation }) => {
  const email = miscellaneous.contactEmail;
  const phoneNumber = miscellaneous.phoneNumberConatact;

  const handleEmailSupport = async () => {
    await Clipboard.setStringAsync(email);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Email copied to clipboard!', ToastAndroid.SHORT);
    } else {
      Alert.alert('Copied', 'Email copied to clipboard!');
    }
  };

  const handlePhoneNumberPress = async () => {
    const url = `tel:${phoneNumber}`;
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Failed to open dialer:', error);
      Alert.alert('Error', 'Failed to open the dialer.');
    }
  };

  const handlePasswordReset = () => {
    navigation.navigate('PasswordReset');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          <Text style={styles.header}>
            1. What if I used "Sign in with Apple" and now have an Android device?
          </Text>
          <Text style={styles.body}>
            If you used "Sign in with Apple" on an iPhone and are now using an Android device, you might face issues if our app doesn’t support "Sign in with Apple" on Android. Here’s what you can do:
          </Text>
          <Text style={styles.body}>
            1. <Text style={styles.link} onPress={handlePasswordReset}>Use Email and Password</Text>: If you have an email and password linked to your account, use these to log in on Android. If you forgot your password, use the "Forgot Password?" link in the app to reset it.
          </Text>
          <Text style={styles.body}>
            2. <Text style={styles.link} onPress={() => Linking.openURL('https://example.com/account-recovery')}>Account Recovery</Text>: If you don’t have an email and password, visit [this link](https://example.com/account-recovery) for account recovery instructions.
          </Text>
          <Text style={styles.body}>
            3. Contact Support: If you need more help, email us at <Text style={styles.link} onPress={handleEmailSupport}>{email}</Text> with details to assist in recovering your account.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>2. How can I change my login credentials?</Text>
          <Text style={styles.body}>To update your login credentials:</Text>
          <Text style={styles.body}>1. Log in with your current method.</Text>
          <Text style={styles.body}>2. Go to account settings.</Text>
          <Text style={styles.body}>3. Select the option to change your email or password.</Text>
          <Text style={styles.body}>If you have issues, contact our customer support for assistance.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>3. I forgot my password. What should I do?</Text>
          <Text style={styles.body}>To reset your password:</Text>
          <Text style={styles.body}>1. Go to the login screen.</Text>
          <Text style={styles.body}>2. Click "Forgot Password?".</Text>
          <Text style={styles.body}>3. Enter your registered email.</Text>
          <Text style={styles.body}>4. Follow the instructions sent to your email to reset your password.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>4. Can I log in through social networks?</Text>
          <Text style={styles.body}>
            Yes, you can log in using social networks like Google and, if on an Apple device, Apple ID. If you don’t see your preferred social network, make sure your app is updated.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>5. How do I update the app to the latest version?</Text>
          <Text style={styles.body}>To update the app:</Text>
          <Text style={styles.body}>- On iOS: Open the App Store, search for our app, and tap "Update".</Text>
          <Text style={styles.body}>- On Android: Open the Google Play Store, search for our app, and tap "Update".</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>6. How can I contact support for other issues?</Text>
          <Text style={styles.body}>For further assistance, contact us via:</Text>
          <Text style={styles.body}>- Email: <Text style={styles.link} onPress={handleEmailSupport}>{email}</Text></Text>
          <Text style={styles.body}>- Phone: <Text style={styles.link} onPress={handlePhoneNumberPress}>{phoneNumber}</Text></Text>
          <Text style={styles.body}>We’re here to help!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
  },
  scrollViewContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#333', // Darker separator line
    paddingBottom: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Header text color
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    color: '#ccc', // Body text color
    marginBottom: 8,
  },
  link: {
    color: '#1E90FF', // Blue color for links
    textDecorationLine: 'underline',
  },
});

export default FAQ;
