import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TextInput, useWindowDimensions, TouchableOpacity, Alert, Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native';

import { darkPalette } from "../constants/colorPalette";
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import Animated, { FadeInRight } from 'react-native-reanimated';
import { APIEndpointsURL } from '../constants/BackendAPIEndpoint';

export default function SignUpWithEmail() {
  const { width } = useWindowDimensions();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [generalLoginError, setGeneralLoginError] = useState('');
  const inputFieldWidth = width * 0.8;
  const inputFieldHeight = inputFieldWidth / 6;
  const buttonWidth = inputFieldWidth;
  const buttonHeight = inputFieldHeight;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required.');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('Password is required.');
      return false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password)) {
      setPasswordError('Password must meet the required criteria.');
      return false;
    } else if (password.length > 100) {
      setPasswordError('Password must be shorter than 100 characters.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSignUp = async () => {
    const isEmailValid = validateEmail();
    setIsEmailTouched(true);
    const isPasswordValid = validatePassword();
    setIsPasswordTouched(true);

    if (isEmailValid && isPasswordValid) {
      const signUpPayload = { email, password };

      try {
        const response = await fetch(APIEndpointsURL.signUpURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signUpPayload),
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();
        if (result.success) {
          Alert.alert('Success', 'Signed up successfully');
          router.push('/home');
        } else {
          setGeneralLoginError(result.message || 'An error occurred during sign up.');
        }
      } catch (error) {
        setGeneralLoginError(error.message || 'An error occurred during sign up.');
      }
    }
  };

  const handleBlur = (field) => {
    if (field === 'email') {
      setIsEmailTouched(true);
      validateEmail();
    } else if (field === 'password') {
      setIsPasswordTouched(true);
      validatePassword();
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-140} style={styles.container}>
        <View style={styles.headerSection}>
          <Text style={styles.headerText}>
            Sign Up{'\n'}with Email
          </Text>
        </View>

        <View style={styles.formSection}>
          <View style={[styles.inputContainer, { width: inputFieldWidth }]}>
            <Animated.View entering={FadeInRight.duration(450).delay(5)} style={[styles.inputContainer, { width: inputFieldWidth }]}>
              <Text style={styles.labelText}>Email Address</Text>
              <TextInput
                style={[styles.inputField, { 
                  width: inputFieldWidth, 
                  height: inputFieldHeight, 
                  borderColor: darkPalette.primaryText 
                }]}
                placeholder="example@example.com"
                placeholderTextColor={darkPalette.inputPlaceHolder}
                value={email}
                onChangeText={setEmail}
                onBlur={() => handleBlur('email')} 
                onSubmitEditing={Keyboard.dismiss} 
                keyboardType="email-address"
              />
              {isEmailTouched && emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </Animated.View>
          </View>

          <View style={[styles.inputContainer, { width: inputFieldWidth }]}>
            <Animated.Text entering={FadeInRight.duration(450).delay(5)} style={styles.labelText}>Password</Animated.Text>
            <Animated.View entering={FadeInRight.duration(580).delay(10)} style={styles.passwordContainer}>
              <TextInput
                style={[styles.inputField, { 
                  width: inputFieldWidth, 
                  height: inputFieldHeight, 
                  borderColor: darkPalette.primaryText,
                  paddingRight: 50,
                }]}
                placeholder="Enter a password"
                placeholderTextColor={darkPalette.inputPlaceHolder}
                value={password}
                onChangeText={setPassword}
                onBlur={() => handleBlur('password')}
                onSubmitEditing={Keyboard.dismiss}
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
                <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={26} color={darkPalette.primaryText} />
              </TouchableOpacity>
            </Animated.View>
            {isPasswordTouched && passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>

          <TouchableOpacity
            style={[styles.signUpButton, { width: buttonWidth, height: buttonHeight, borderRadius: 50 }]}
            onPress={handleSignUp}
          >
            <Text style={styles.signUpButtonText}>Send Verification Code</Text>
          </TouchableOpacity>
          {generalLoginError ? <Text style={styles.generalErrorText}>{generalLoginError}</Text> : null}

          <View style={styles.redirectSection}>
            <Text style={styles.redirectText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/landingPage/signInWithEmail')}>
              <Text style={styles.redirectLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.assistanceSection}>
          <TouchableOpacity onPress={() => router.push('/landingPage/needAssistance')}>
            <Text style={styles.assistanceText}>Need Assistance?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: darkPalette.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSection: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: '15.5%',
    width: '100%',
  },
  headerText: {
    color: darkPalette.primaryText,
    fontSize: 48,
    fontWeight: 'bold',
  },
  formSection: {
    marginTop: '-10%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  inputContainer: {
    marginBottom: '2.5%',
    alignItems: 'flex-start',
    position: 'relative',
  },
  labelText: {
    color: darkPalette.primaryText,
    fontSize: 16,
    marginBottom: 4,
  },
  inputField: {
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    color: darkPalette.primaryText,
    backgroundColor: darkPalette.background,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  signUpButton: {
    backgroundColor: darkPalette.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: '16%',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
  },
  redirectSection: {
    marginTop: 15,
    alignItems: 'center',
    flexDirection: "row",
  },
  redirectText: {
    color: darkPalette.primaryText,
    fontSize: 14,
  },
  redirectLink: {
    color: darkPalette.primary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  assistanceSection: {
    marginTop: '16%',
    paddingBottom: '5.5%',
    alignItems: 'center',
  },
  assistanceText: {
    fontSize: 16,
    color: darkPalette.primaryText,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 12,
    color: darkPalette.errorTextColor,
    marginTop: 4,
    textAlign: 'left',
    marginLeft: 8
  },
  generalErrorText: {
    fontSize: 14,
    color: darkPalette.errorTextColor,
    marginLeft: 8,
    marginTop: 6,
    textAlign: 'center',
  },
});
