import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TextInput, useWindowDimensions, TouchableOpacity, Alert, Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native';

import { darkPalette } from "../constants/colorPalette";
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { APIEndpointsURL } from '../constants/BackendAPIEndpoint';


export default function SignInWithEmail() {
  const { width } = useWindowDimensions();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [loginError, setLoginError] = useState('');
  const inputWidth = width * 0.8;
  const inputHeight = inputWidth / 6;
  const buttonWidth = inputWidth;
  const buttonHeight = inputHeight;

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
      setPasswordError('Password must be at least 8 characters long, and include uppercase letters, lowercase letters, numbers, and special characters.');
      return false;
    }
    else if(password.length > 100){
      setPasswordError('Password must be shorter than 100 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleLogin = async () => {
    // Validate all fields before proceeding
    const isEmailValid = validateEmail();
    setEmailTouched(true);
    const isPasswordValid = validatePassword();
    setPasswordTouched(true);

    if (isEmailValid && isPasswordValid) {

      // Prepare the JSON payload
      const loginPayload = {
        email: email,
        password: password,
      };

      try {
        const response = await fetch(APIEndpointsURL.loginURL, { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginPayload),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();

        if (result.success) {
          Alert.alert('Success', 'Logged in successfully');
          router.push('/home');
        } else {
          setLoginError(result.message || 'An error occurred during login');
        }
      } catch (error) {
        setLoginError(error.message || 'An error occurred during login');
      }
    }
  };

  const handleBlur = (field) => {
    if (field === 'email') {
      setEmailTouched(true);
      validateEmail();
    } else if (field === 'password') {
      setPasswordTouched(true);
      validatePassword();
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView behavior = "position" keyboardVerticalOffset = {-250} style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Email{'\n'}Sign-in
          </Text>
        
        </View>

        <View style={styles.formContainer}>
          <View style={[styles.inputWrapper, { width: inputWidth }]}>
            <Animated.View entering={FadeInRight.duration(450).delay(5)} style={[styles.inputWrapper, { width: inputWidth }]}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={[styles.inputField, { 
                  width: inputWidth, 
                  height: inputHeight, 
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
              {emailTouched && emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}
            </Animated.View>
          </View>

          <View style={[styles.inputWrapper, { width: inputWidth }]}>
            <Animated.Text entering={FadeInRight.duration(500).delay(7)} style={styles.inputLabel}>Password</Animated.Text>
            <Animated.View entering={FadeInRight.duration(510).delay(10)} style={styles.passwordWrapper}>
              <TextInput
                style={[styles.inputField, { 
                  width: inputWidth, 
                  height: inputHeight, 
                  borderColor: darkPalette.primaryText,
                  paddingRight: 50, // Space for the icon
                }]}
                placeholder="Enter your password"
                placeholderTextColor={darkPalette.inputPlaceHolder}
                value={password}
                onChangeText={setPassword}
                onBlur={() => handleBlur('password')} // Validate on blur
                onSubmitEditing={Keyboard.dismiss} // Dismiss keyboard on submit
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconWrapper}>
                <Icon 
                  name={isPasswordVisible ? 'eye-off' : 'eye'}
                  size={26}
                  color={darkPalette.primaryText}
                />
              </TouchableOpacity>
            </Animated.View>
            
            {passwordTouched && passwordError ? <Text style={styles.errorMessage}>{passwordError}</Text> : null}
          </View>

          

          <TouchableOpacity
            style={[styles.submitButton, { width: buttonWidth, height: buttonHeight, borderRadius: 50 }]}
            onPress={handleLogin}
          >
            <Text style={styles.submitButtonText}>Sign In</Text>
          </TouchableOpacity>
          {loginError ? <Text style={styles.loginErrorMessage}>{loginError}</Text> : null}
          <TouchableOpacity onPress={() => router.push('/forgotPassword')} style={styles.forgotPasswordWrapper}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.signUpWrapper}>
            <Text style={styles.signUpText}>
              Don't have an account?{' '}
          
            </Text>
            <TouchableOpacity onPress={() => router.push('/landingPage/registerWithEmail')}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
          </View>
        </View>

        <View style={styles.assistanceWrapper}>
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
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
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
  formContainer: {
    marginTop: '-10%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  inputWrapper: {
    marginBottom: '2.5%',
    alignItems: 'flex-start',
    position: 'relative',
  },
  inputLabel: {
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
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  submitButton: {
    backgroundColor: darkPalette.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: '16%',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
    
  },
  forgotPasswordWrapper: {
    marginTop: '3%',
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: darkPalette.primaryText,
    fontSize: 16,
  },
  signUpWrapper: {
    marginTop: 8,
    alignItems: 'center',
    flexDirection :"row"
 
  },
  signUpText: {
    color: darkPalette.primaryText,
    fontSize: 16,
  },
  signUpLink: {
    color: darkPalette.primary,
    fontWeight: 'bold',
    fontSize: 16,

  
    
  },
  assistanceWrapper: {
    marginTop: '5%',
    alignItems: 'center',
  },
  assistanceText: {
    color: darkPalette.primaryText,
    fontSize: 16,
  },
  errorMessage: {
    color:  darkPalette. errorTextColor,
    fontSize: 12,
    marginTop: 6,
    marginBottom: 0,
    marginLeft: 8
  },
  loginErrorMessage: {
    color: darkPalette. errorTextColor,
    fontSize: 12,
    marginTop : 8

  },
});
