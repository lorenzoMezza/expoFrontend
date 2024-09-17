import { StyleSheet, Text, SafeAreaView, View, Image, useWindowDimensions, TouchableOpacity} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { darkPalette } from "../constants/colorPalette";
import { useRouter } from 'expo-router'; // Import useRouter from expo-router
import { miscellaneous } from '../constants/miscellaneous';

const appleBorderColor = '#dedede'; 
const googleBorderColor = '#4285F4'; 
const emailBorderColor = '#858585'; 

export default function LandingPage() {
  const { width } = useWindowDimensions();
  const router = useRouter(); // Use router for navigation

  const buttonWidth = width * 0.8; 
  const buttonHeight = buttonWidth / 5.3; 
  const buttonImageSize = buttonWidth / 9.5; 
  const buttonTextSize = buttonWidth / 16; 

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Animated.Text entering={FadeInUp.duration(700)} style={styles.text}>
          Welcome to{'\n'}ProjectX
        </Animated.Text>
        <Animated.Text entering={FadeInUp.duration(600)} style={styles.slogan}>this is our slogan here</Animated.Text>
      </View>

      <View style={styles.centeredContainer}>
        {!miscellaneous.isAndroid && (
          <TouchableOpacity
            onPress={() => router.push('/landingPage/signInWithApple')} // Navigate to the appropriate page
          >
            <Animated.View entering={FadeInDown.duration(600).delay(200)} style={[styles.button, { 
              width: buttonWidth, 
              height: buttonHeight, 
              borderColor: appleBorderColor 
            }]}>
              <Image 
                source={require('../../assets/icons/apple-logo-light.png')} 
                style={[styles.buttonImage, { width: buttonImageSize, height: buttonImageSize }]}
              />
              <Text style={[styles.buttonText, { fontSize: buttonTextSize }]}>Sign in with Apple ID</Text>
            </Animated.View>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => router.push('/landingPage/signInWithGoogle')} // Navigate to the appropriate page
        >
          <Animated.View entering={FadeInDown.duration(600).delay(!miscellaneous.isAndroid  ? 400 : 200)} style={[styles.button, { 
            width: buttonWidth, 
            height: buttonHeight, 
            borderColor: googleBorderColor 
          }]}>
            <Image 
              source={require('../../assets/icons/google.png')} 
              style={[styles.buttonImage, { width: buttonImageSize, height: buttonImageSize }]}
            />
            <Text style={[styles.buttonText, { fontSize: buttonTextSize }]}>Sign in with Google</Text>
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/landingPage/loginWithEmail')} // Navigate to the appropriate page
        >
          <Animated.View entering={FadeInDown.duration(600).delay(600)} style={[styles.button, { 
            width: buttonWidth, 
            height: buttonHeight, 
            borderColor: emailBorderColor 
          }]}>
            <Image 
              source={require('../../assets/icons/email-light.png')} 
              style={[styles.buttonImage, { width: buttonImageSize, height: buttonImageSize }]}
            />
            <Text style={[styles.buttonText, { fontSize: buttonTextSize }]}>Sign in using email</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={() => router.push('/landingPage/needAssistance')} // Navigate to the appropriate page
        >
          <Text style={styles.bottomText}>Need Assistance?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: darkPalette.background,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: '17.5%',
  },
  text: {
    color: darkPalette.primaryText,
    fontSize: 48,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  slogan: {
    color: darkPalette.secondaryText,
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
  centeredContainer: {
    marginTop: "-22%",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: darkPalette.background,
    borderRadius: !miscellaneous.isAndroid  ? "25%" : "16%",
    marginBottom: '11.5%', 
    borderWidth: 2,
  },
  buttonImage: {
    resizeMode: 'contain', 
    marginLeft: '6%',
  },
  buttonText: {
    marginLeft: '9.5%',
    color: '#fff',
    textAlign: 'center',
    color: darkPalette.tertiaryText,
  },
  bottomContainer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  bottomText: {
    color: darkPalette.quaternatyText,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
