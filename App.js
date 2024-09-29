
import 'react-native-gesture-handler';
import React, { useState, useEffect, useCallback,createRef, useRef } from 'react';
import { View, Text,StyleSheet, TouchableOpacity, Alert ,Platform,ActivityIndicator,Dimensions } from 'react-native';
import * as Font from 'expo-font';
import { Entypo } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput, Button } from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HelpScreen from './screens/HelpScreen';
import PlayScreen from './screens/PlayScreen';
import ProfileScreen from './screens/ProfileScreen';
import GameScreen from './screens/GameScreen';
import ProfileLandingScreen from './screens/ProfileLanding';
import GameDetailsPage from './screens/GameDetailsPage';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { AuthProvider } from './screens/auth/AuthContext';
import DateRangePicker from './screens/DateRangePicker';
import ChooseAccount from './screens/ChooseAccount';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddAccount from './screens/AddAccount';
import PaymentPageGateWay from './screens/PaymentGateWay';
import * as Sentry from "@sentry/react-native";
import ALSScreen from './screens/ALSScreen';
import PaymentMethodPage from './screens/PaymentMethodPage';
import LottieView from 'lottie-react-native';


import Constants from 'expo-constants';

//import * as Sentry from "@sentry/react-native";
import { ToastProvider } from 'react-native-toast-message';
import PayStack from './screens/PayStack';
import BuyCredits from './screens/BuyCredits';
import ChooseLevel from './screens/ChooseLevel';
import FaqPage from './screens/FaqPage';

import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;

import ContactinfoScreen from './screens/ContactinfoScreen';
import PurchaseScreen from './screens/PurchaseScreen';
import RedeemPage from './screens/RedeemPage';

import SplashScreenTesting from './screens/SplashScreenTesting';
import ALSNaviagator from './screens/navigators/AlsNavigator';
import HelpNavigator from './screens/navigators/HelpNavigator';
import GameNavigator from './screens/navigators/GameNavigator';
import Notification from './screens/Notification';
import PersonalInfoOtp from './screens/PersonalInfoOtp';

import KioskCode from './screens/KioskCode';
import LoginTesting from './screens/LoginTesting';
import ProfileLandingTesting from './screens/ProfileLandingTesting';
import ForgotPasswordTwo from './screens/ForgotPasswordTwo';
import LoginOtp from './screens/LoginOtp';

import LocalAuthenticationScreenWrapper from './screens/LocalAuthenticationScreenWrapper';
import TermsAndConditions from './screens/TermsAndConditions';




import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import MyCardComponent from './screens/ALSScreen';
import RedeemAmountAccessPage from './screens/RedeemAccessPage';
import GameRules from './screens/GameRules';


// Sentry.init({
//   dsn: "https://a63ad10720920c86a1b3ed3f59f53861@o4506372185784320.ingest.sentry.io/4506372188667904",
//   // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
//   // We recommend adjusting this value in production.
//   tracesSampleRate: 1.0,
// });
// AppRegistry.registerComponent(appName, () => App);


Sentry.init({
  environment: "production",
  dsn: "https://6dd8bc74dbcf67daf8a46d58d5f34b60@o4506372185784320.ingest.sentry.io/4506619905900544",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});
const serverIpAddress = '192.168.29.12'; // Replace with your machine's IP address
const serverPort = 8000;
const apiUrl = `http://${serverIpAddress}:${serverPort}/register`;
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();




const Splash = ({ navigation }) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const Lottie = useRef(null);
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    const userNumber = await AsyncStorage.getItem('userNumber');

    if (appIsReady) {
      try {
        await SplashScreen.hideAsync();
        const token = await AsyncStorage.getItem("accessToken");

        // Play the Lottie animation
        if (Lottie.current) {
          Lottie.current.play();
        }

        setTimeout(() => {
          if (userNumber === '1') { // Note: '1' because AsyncStorage returns strings
            navigation.navigate('MainScreen');
          } else {
            navigation.navigate('ProfileLandingTesting');
          }   
        }, 3000);
      } catch (error) {
        console.warn("Error during splash screen setup:", error);
      }
    }
  }, [appIsReady, navigation]);

  if (!appIsReady) {
    return null;
  }

  return (
  
    <View style={styles.containerTwo}
      onLayout={onLayoutRootView}
    >
   
      <LottieView
        ref={Lottie}
        source={require('./assets/sec.json')}
        autoPlay
        loop={false}
        style={styles.lottie}
        onAnimationFinish={() => {
          // Animation has finished playing, navigate or perform any other actions
        }}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  circleText: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: 100,
    height: 100,
    textAlign: 'center',
    lineHeight: 100,
    fontSize: 20,
    marginTop: -20, // Adjust the negative margin top to move the circle upward
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    marginTop: 10, // Adjust the margin top as needed
    fontSize: 18, // Adjust the font size as needed
  },


  containerTwo: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    width: 300,
    height: 300,
  },
});






const OTPVerificationScreen = ({ route,navigation }) => {
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const { email, name,mobileNumber,password,selectedCountryCode,selectedState,selectedLocalArea} = route.params;
  const digitRefs = Array(6).fill(0).map((_, index) => useRef(null));
  const handleDigitChange = (index, value) => {
    
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);
    if (value !== '') {
      const nextIndex = index + 1;
      if (nextIndex < otpDigits.length && digitRefs[nextIndex].current) {
        digitRefs[nextIndex].current.focus();
      }
    }
  };

  const handleVerification = async () => {
    console.log('Entered OTP:', email, otpDigits, mobileNumber, selectedLocalArea, selectedCountryCode, selectedLocalArea);
  
   
  
    try {
      setLoading(true);
      const enteredOTP = otpDigits.join('');
      console.log('Attempting OTP verification:', enteredOTP);
  
      const prod = 'https://lottery-backend-tau.vercel.app/api/v1/user/verify-otp';
      const dev = 'https://lottery-backend-dev.vercel.app/api/v1/user/verify-otp';
      const isStandaloneApp = Constants.appOwnership === 'expo';
      const baseURL = isStandaloneApp ? dev : prod;
  
      const response = await axios.post(baseURL, {
        email,
        otp: enteredOTP,
        name,
        mobileNumber,
        password,
        countryCode: selectedCountryCode,
        state: selectedState,
        localArea: selectedLocalArea,
      });
  
      console.log('Response from server:', response);
      if (response && response.status === 200) {
        const result = response.data;
        console.log("Success", result);
  
        const accessToken = result.data.accessToken;
        const refreshToken = result.data.refreshToken;
        const credits = result.data.createdUser.credits;
        const userId = result.data.createdUser._id;
        const userName = result.data.createdUser.name;
        const userDate = result.data.createdUser.createdAt;
        const userNumber = 1;
  
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        await AsyncStorage.setItem('userId', userId);
        await AsyncStorage.setItem('userName', userName);
        await AsyncStorage.setItem('userDate', userDate);
        await AsyncStorage.setItem('credits', credits.toString());
        await AsyncStorage.setItem('userNumber', userNumber.toString());
  
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigation.navigate('MainScreen');
      } else {
        const errorMessage = response?.data?.message || "Verification failed";
        console.error('Server error:', errorMessage);
        alert(errorMessage);
      }
    } catch (error) {
      console.log("Error during OTP verification:", error?.response?.data?.message || error.message);
      alert(error?.response?.data?.message || "An error occurred during verification.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={{ flex: 1, alignItems: 'center',padding:16 }}>


<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '5%', alignSelf: 'flex-start' }}>
    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
      <MaterialIcons name="keyboard-arrow-left" size={35} color="black" />
    </TouchableOpacity>
    <Text style={{ fontSize: 34, fontWeight: '700', marginLeft: 8,marginTop:'12%' }}>OTP Verification</Text>
  </View>


      <View    style={{ flexDirection: 'row', marginTop: 40 ,alignItems:'center',paddingLeft:10,paddingRight:10}}>
        {/* Create six TextInput components for each digit */}
        {otpDigits.map((digit, index) => (


<View key={index}

style={{ borderColor: 'black',
      backgroundColor: 'white',
      width: 50,
      borderWidth: 1,
      borderStyle: 'solid',
      fontSize: 15,
      height:55,
      borderRadius: 10,
      alignItems:'center',
     margin:5,
      marginTop:15,
      color: 'white',  // Text color
      overflow: "hidden",}}>
          <TextInput
            key={index}
            style={{
             
              textAlign: 'center',
              backgroundColor:'white'
            }}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleDigitChange(index, value)}
          ref={digitRefs[index]}
          />
          </View>
        ))}
      </View>

      <LinearGradient colors={["#31A062", "#31A062"]}   style={{
        backgroundColor: '#31A062',
        width: '100%',
        height:60,
        marginVertical: 10,
        marginTop: 15,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
      }}>
        <TouchableOpacity onPress={handleVerification}>
        {loading ? (
    <ActivityIndicator color="#FFFFFF" size="small" />
  ) : (
    <Text style={{ color: "#fff",
    fontSize: SCREEN_WIDTH * 0.04,
    alignSelf: "center",}}>Verify OTP</Text>
  )}
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};






const MainScreen = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
  
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Game') {
          iconName = focused ? 'game-controller-outline' : 'game-controller-outline'; // Check if this is the correct name
        } else if (route.name === 'Help') {
          iconName = focused ? 'help-circle' : 'help-circle-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }
        
  
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: [
        {
          display: 'flex',
        },
        null,
      ],
    })}
  >
      <Tab.Screen name="Home" component={ALSNaviagator}  options={{ headerShown: false }} />
      <Tab.Screen name="Game" component={GameNavigator} options={{ headerShown: false }}/>
      <Tab.Screen name="Help" component={HelpNavigator}   options={{ headerShown: false }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
    
        {/* Add other tabs if needed */}
     
    </Tab.Navigator>
  );
  
const GameStack = createStackNavigator();


console.disableYellowBox = true;


const MainStack = createStackNavigator();

const MainStackNavigator = () => (
 
  <MainStack.Navigator initialRouteName="MainScreen" headerMode="none">
    <MainStack.Screen name="MainScreen" component={MainScreen} />
    <MainStack.Screen name="GameDetails" component={GameDetailsPage} />
  </MainStack.Navigator>
 
);




const App = () => {

 // const [expoPushToken, setExpoPushToken] = useState("");

 useEffect(() => {
  // Set up notification handler
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  async function setupNotifications() {
    // Request permissions
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Notification permissions were not granted');
      return;
    }

    // Add listener for received notifications
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
      // Debug: Check if we're in a loop
      // Consider adding a condition to prevent re-scheduling notifications immediately
    });

    // Add listener for notification responses
    Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
    });

    return () => {
      // Cleanup listeners
      Notifications.removeNotificationSubscription(notificationListener);
    };
  }

  setupNotifications();
}, []);





  return (


    <AuthProvider>
    <NavigationContainer>
   
      <Stack.Navigator initialRouteName="Splash"  screenOptions={{
    headerShown: false
  }}>

        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false  }}/>
        <Stack.Screen name="LoginTesting" component={LoginTesting} options={{ headerShown: false  }}/>
        <Stack.Screen name="Register" component={RegisterScreen}options={{ headerShown: false }} />




        <Stack.Screen name="ProfileLandingTesting" component={ProfileLandingTesting}options={{ headerShown: false  }} />
        <Stack.Screen name="ProfileLanding" component={ProfileLandingScreen}options={{ headerShown: false  }} />
        <Stack.Screen name="Play" component={PlayScreen} options={{ headerShown: false ,header:null}} />
        <Stack.Screen name="OTP" component={OTPVerificationScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ALScreen" component={MyCardComponent} options={{ headerShown: false ,header:null}} />

        <Stack.Screen name="ForgotPasswordTwo" component={ForgotPasswordTwo}options={{ gestureEnabled: false , headerShown: false }}  />

        <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
     
        <Stack.Screen name="DateRange" component={DateRangePicker} options={{ headerShown: false }}/>
        <Stack.Screen name="ChooseAccount" component={ChooseAccount} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}options={{ gestureEnabled: false , headerShown: false }}  />


     
        <Stack.Screen name="ResetPassword" component={ResetPassword}options={{ gestureEnabled: false ,headerShown: false}} />
        <Stack.Screen name='PaymentPageGateWay' component={PaymentPageGateWay}></Stack.Screen>
       
        <Stack.Screen name="AddAccount" component={AddAccount} options={{ headerShown: false }}/>
        
        <Stack.Screen name='PaymentMethodPage' component={PaymentMethodPage} options={{ headerShown: false }} />
        <Stack.Screen name='PayStack' component={PayStack} options={{ headerShown: false }}/>
        <Stack.Screen name='Faq' component={FaqPage}  options={{ headerShown: false }}/>
        <Stack.Screen name='BuyCredits' component={BuyCredits}  options={{ headerShown: false }} />
        <Stack.Screen name='ChooseLevel' component={ChooseLevel}  options={{ headerShown: false }} />

        <Stack.Screen name='ContactInfo' component={ContactinfoScreen}  options={{ headerShown: false }} />
        <Stack.Screen name='PurchaseScreen' component={PurchaseScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='Redeem' component={RedeemPage} options={{ headerShown: false }}/>
       
        <Stack.Screen name='SplashScreenTesting' component={SplashScreenTesting} options={{ headerShown: false }}/>

        <Stack.Screen name='Notification' component={Notification} options={{ headerShown: false }} />


        <Stack.Screen name='GameRules' component={GameRules} options={{ headerShown: false }} />

        <Stack.Screen name='PersonalInfoOtp' component={PersonalInfoOtp} options={{ headerShown: false }}/>


        <Stack.Screen name='KioskCode' component={KioskCode} options={{ headerShown: false }}/>


        <Stack.Screen name='LoginOtp' component={LoginOtp} options={{ headerShown: false }}/>
        <Stack.Screen name='RedeemAmountAccessPage' component={RedeemAmountAccessPage} options={{ headerShown: false }}/>
        

        <Stack.Screen name='TermsAndConditions' component={TermsAndConditions} options={{ headerShown: false }}/>

       
        <Stack.Screen name='LocalAuthenticationScreen' component={LocalAuthenticationScreenWrapper} options={{ headerShown: false }}/>



      </Stack.Navigator>
    
    </NavigationContainer>
    </AuthProvider>
  );
  
};



export default Sentry.wrap(App);