
import React, { useState, useEffect, useCallback,createRef } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Modal,ActivityIndicator,Platform ,Dimensions } from 'react-native';
import * as Font from 'expo-font';
import { Entypo } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput, Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BackHandler } from 'react-native';
import { useAuth } from './auth/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';
import SensitiveInfo from 'react-native-sensitive-info';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";
import { MaterialIcons } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from '@expo/vector-icons';
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Spinner from 'react-native-loading-spinner-overlay';
import { LinearGradient } from "expo-linear-gradient";
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';






const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;

const CustomPicker = ({ visible, onClose, onSelect, data }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {data.map((country) => (
            <TouchableOpacity
              key={country.countryCode}
              style={styles.countryItem}
              onPress={() => {
                onSelect(country.countryCode);
                onClose();
              }}
            >
              <Text>{` ${country.countryCode} - ${country.country}`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumberLogin, setMobileNumberLogin] = useState('');
  const { setAccessToken } = useAuth();
  const [countryCode, setCountryCode] = useState('');
  const [show, setShow] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');






  // Now you can use `apiUrl` throughout your app to fetch data or make requests.
  
  



  useEffect(() => {
    fetchCountries();
  }, []);
  const logSelectedCountryCode = () => {
    console.log('Selected Country Code:', selectedCountry,mobileNumber);
  };



  const [showAlert, setShowAlert] = useState(false);

  const handleAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  
  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        'https://lottery-backend-tau.vercel.app//api/v1/admin/get-country'
      );
      const countriesData = response.data.message;
      setCountries(countriesData);
    } catch (error) {
      console.error('Error fetching countries:', error.message);
    }
  };

  
  
  const fetchCredits = async () => {
    try {
      const storedUserDetails = await AsyncStorage.getItem('userDetails');
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userDetails = JSON.parse(storedUserDetails);
  
      if (!userDetails || !userDetails._id) {
        console.log('User details not found in AsyncStorage');
        return;
      }
  
      const userId = userDetails._id;
  
      const response = await fetch(`https://lottery-backend-tau.vercel.app/api/v1/user/get-credits/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('User credits:', result.credits);
        const userCredits = result.credits;
  
        // Store the user credits in AsyncStorage
        await AsyncStorage.setItem('userCredits', userCredits.toString());
  
        console.log('New credits:', userCredits);
  
        // Additional logic can be added here if needed
      } else {
        console.error('Failed to fetch user credits');
      }
    } catch (error) {
      console.error('Error checking user credits:', error.message);
    }
  };

  const fetchAndConsoleStoredAccessToken = async () => {
    try {
      // Retrieve accessToken from AsyncStorage
      const storedAccessToken = await AsyncStorage.getItem('accessToken');
      const storedRefreshToken = await AsyncStorage.getItem('refreshToken');

      const storedUserId = await AsyncStorage.getItem('userId');
      const storedCredits = await AsyncStorage.getItem('credits');
      
      // Log the stored accessToken
      console.log('Stored Access Token:', storedAccessToken);
      console.log('Stored user id:', storedUserId);
      console.log('Stored user credits agin again:', storedCredits);
      console.log('Stored refreshToken:', storedRefreshToken);


    } catch (error) {
      console.error('Error fetching stored Access Token:', error.message);
    }
  };
  
  // Call fetchAndConsoleStoredAccessToken to retrieve and console the stored Access Token
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('LoginScreen focused');
      console.log("api url",baseURL)
     
    });
  
    return unsubscribe;
  }, [navigation]);
 
  const [fcmToken, setFcmToken] = useState(null);
  const alertStyles = StyleSheet.create({
    alertText: {
      color: 'green', // Change text color to green
    },
  });

  useEffect(() => {
    // Retrieve email from AsyncStorage
    const getRegisteredEmail = async () => {
      try {
        const registeredEmail = await AsyncStorage.getItem('registeredEmail');
        if (registeredEmail) {
          setEmail(registeredEmail);
        }
      } catch (error) {
        console.error('Error retrieving email:', error);
      }
    };

    getRegisteredEmail();
  }, []);
    


  
  const prod ='https://lottery-backend-tau.vercel.app/api/v1/auth/login'

  const dev = 'https://lottery-backend-dev.vercel.app/api/v1/auth/login'

  const isStandaloneApp = Constants.appOwnership === 'expo';


  const baseURL = isStandaloneApp ? dev : prod

  const handleLogin = async () => {




    const token = await registerForPushNotificationsAsync();
    
    async function registerForPushNotificationsAsync() {
      let token;
  
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
          sound: 'default', // Make sure you have a valid sound file for the notification or use 'default'
        });
      }
  
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }
        // Learn more about projectId:
        // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId: "e048e5c7-3d85-4af8-ba30-e4a64c538475",
          })
        ).data;
      } else {
        console.log("Must use physical device for Push Notifications");
      }
  
  
  
  
      return token;
    }
console.log("password",password)
    try {
      setLoading(true);
     
      if (!email || !password) {
        Alert.alert(
          '',
          'Please fill in all fields',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
        return;
      }




  
      const response = await axios.post(baseURL, {
        email,
        password,
        pushNotificationToken: token,
      });
  
     // console.log("response", response);
  
      if (response.status === 200) {
        const result = response.data;
        console.log("response", result);
        //console.log('User logged in successfully:', result);
  
        const accessToken = result.data.accessToken;
        const refreshToken = result.data.refreshToken;
        const credits = result.data.user.credits;
        const userId = result.data.user._id;
        const userName = result.data.user.name;
        const userDate = result.data.user.createdAt;
        const userNumber = 1;
        
  
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        await AsyncStorage.setItem('userId', userId);
        await AsyncStorage.setItem('userName', userName);
        await AsyncStorage.setItem('userDate', userDate);
        await AsyncStorage.setItem('credits', credits.toString());
        await AsyncStorage.setItem('userNumber', userNumber.toString());

        
        await new Promise(resolve => setTimeout(resolve, 2000));
         navigation.navigate('MainScreen', { screen: 'MainScreen' });
        // navigation.navigate("LocalAuthenticationScreen")
        fetchAndConsoleStoredAccessToken();
      } else {
        
  
        Alert.alert(
          '',
          'Login Failed',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
      }
    } catch (error) {
      console.log("Login error",error.response.data.message)
      Alert.alert(
        '',
        'Login Failed',
        [{ text: error.response.data.message, onPress: () => console.log('OK Pressed') }],
        {  color: 'green', } 
      );
    } finally {
      setLoading(false);
    }
  };



  const loginWithNumber = async () => {
    try {

      const number = `${selectedCountry}${mobileNumberLogin}`
      const response = await fetch('https://lottery-backend-tau.vercel.app/api/v1/auth/login-with-number', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileNumber: number,
        }),
      });
      
      if (!response.ok) {
        // Handle error cases
        const errorData = await response.json();
        console.error(`Error: ${errorData.message}`);

       
        // You may want to display an error message to the user
      } else {
        // Request successful
        const responseData = await response.json();
        navigation.navigate('LoginOtp',{mobileNumber: number})
        console.log("Success",responseData); // You can handle the success response here
        // For example, display a success message to the user or redirect them
      }
    } catch (error) {
      console.error('Error:', error);
      
      // Handle unexpected errors
    }
  };
  
  const loginUser = async () => {

    
    const storedPushToken = await AsyncStorage.getItem('expoPushToken');
  
    if (email && password) {
      // If email and password are provided, call handleLogin
      await handleLogin(email, password, storedPushToken);
    } else {
      // If email and password are not provided, call loginWithNumber
      await loginWithNumber(storedPushToken);
    }
  };

  
  useEffect(() => {
    const getStoredToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('fcmToken');
        if (storedToken) {
          console.log('Stored Token:', storedToken);
          setFcmToken(storedToken);
        }
      } catch (error) {
        console.error('Error retrieving token from AsyncStorage:', error);
      }
    };

    getStoredToken();
  }, []);

  return (

    <KeyboardAwareScrollView style={{backgroundColor:'white'}} >

    <View style={{ flex:1,alignItems: 'center',justifyContent:'flex-start'  ,paddingTop:'25%',backgroundColor:"white",paddingLeft:'6%',paddingRight:'6%',paddingBottom:16 }}>

<StatusBar backgroundColor={"transparent"} translucent />

<MaterialIcons name="keyboard-arrow-left" onPress={()=>navigation.navigate('ProfileLandingTesting')} size={35} color="black" style={{
     
     alignSelf:'flex-start',right:'5%',bottom:'5%'
   }}/>
         <Text  style={styles.createaccountText}>Login</Text>
    <Text  style={styles.createaccountTextTwo}>Play and manage your games</Text>

   


    <View
      style={styles.inputContainer}
      accessible={true}
      accessibilityLabel="Name Input"
    >
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
        activeUnderlineColor="gray"
      />
    </View>




   
    <View
      style={styles.inputContainer}
      accessible={true}
      accessibilityLabel="Password Input"
      
    >
      <TextInput
       label="Password"
        activeUnderlineColor="gray"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
        style={styles.textInput}
        
      />

<TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{ padding: responsiveWidth(3.7), position: 'absolute', right: 0, }}
        >
          <FontAwesome
            name={showPassword ? 'eye-slash' : 'eye'}
            size={wp(5)}
            color="black"
          />
        </TouchableOpacity>
    </View>
   






   <Text style={{ marginVertical: 10, color: '#31A062' }}>OR</Text>



<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 11 }}>



<View  style={{ borderColor: 'black',
    backgroundColor: 'white',
    marginTop:15,
    width: '20%',
    marginBottom: 10,
    marginRight:15,
    height:responsiveHeight(7),
    borderWidth: 1,
    borderStyle: 'solid',
    fontSize: 15,
    borderRadius: 20,
    
    color: 'white',  
    overflow: "hidden",}}>
<TouchableOpacity onPress={() => setModalVisible(true)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> 
      <Text style={styles.selectedCountryText}>
        {selectedCountry || 'Ext'}
      </Text>
    </TouchableOpacity>
      <CustomPicker
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={(value) => setSelectedCountry(value)}
        data={countries}
      />
</View>



<View
    style={{ borderColor: 'black',
    backgroundColor: 'white',
    marginTop:15,
    width: '75%',
    marginBottom: 10,
    height:responsiveHeight(7),
    borderWidth: 1,
    borderStyle: 'solid',
    
    borderRadius: 20,
    
    color: 'white',  
    overflow: "hidden",}}
>
<TextInput
      label="Mobile Number"
      
     
      style={{
        color: 'white',
        backgroundColor: 'white',
        height:responsiveHeight(7),
        fontSize:wp(4)
       }}
    activeUnderlineColor="gray"
      keyboardType="phone-pad" // Use 'phone-pad' keyboard type for mobile numbers
      value={mobileNumberLogin}
      onChangeText={(text) => {
        // Limit the input to a maximum of 10 characters
        if (text.length <= 10) {
          setMobileNumberLogin(text);
        }
      }}
      maxLength={10} 
      
    />
 </View>


</View>


<TouchableOpacity onPress={loginUser}

style={{
        backgroundColor: '#31A062',
        width: '100%',
        height:responsiveHeight(7),
        marginVertical: 10,
        marginTop: 15,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
      }}>


<LinearGradient colors={["#31A062", "#31A062"]}   style={{
        backgroundColor: '#31A062',
        width: '100%',
        height:responsiveHeight(7),
        marginVertical: 10,
        marginTop: 15,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
      }}>
        <TouchableOpacity onPress={loginUser}>
        {loading ? (
    <ActivityIndicator color="#FFFFFF" size="small" />
  ) : (
    <Text style={styles.doneButtonText}>Login</Text>
  )}
        </TouchableOpacity>
      </LinearGradient>
</TouchableOpacity>



      <Text style={{ marginVertical: 10, color: '#31A062' }} onPress={() => navigation.navigate('Register')}>
       Create An Account?
      </Text>
      <Text style={{  color: '#31A062' }}  onPress={() => navigation.navigate('ForgotPassword')}>Forgot Password?</Text>
      
    </View>

    </KeyboardAwareScrollView>
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
  doneButtonText: {
    color: "#fff",
    fontSize: SCREEN_WIDTH * 0.04,
    alignSelf: "center",
  },
  selectedCountryText: {
    fontSize: wp(4),
    paddingVertical: 10,
    paddingHorizontal: 10,
    
    borderColor: 'gray',
   
    backgroundColor: 'white',
    height: 51,
    marginTop: 7,
    marginRight: 10,
   
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  createaccountText: {
    
   
    // Add this line to align text to the left
    width: 354,
    
   
    left: 30,
     minHeight: hp("7%"),
    fontSize: responsiveFontSize(3.5), // Adjust the font size as needed
    fontWeight: 'bold',
    bottom:'6%'
   
  },

  createaccountTextTwo: {
    
    fontSize: 17,
    width: 354,
    
    bottom:'9%',
    left: 33,
  
    fontSize: 13,
    
    textAlign: 'left', // Add this line to align text to the left
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    selectedCountryText: {
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      backgroundColor: 'white',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      elevation: 5,
    },
    countryItem: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
    },
    elevation: 5,
  },
  countryItem: {
    paddingVertical: 10,
    
    borderBottomColor: 'gray',
  },

  inputContainer: {
    borderColor: 'black',
    backgroundColor: 'white',
    
    width: '100%',
    marginBottom: hp(1.5),
    height: hp(7),
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: wp(5),
    overflow: "hidden",
  },
  textInput: {
    color: 'black',
    backgroundColor: 'white',
    height: hp(7),
    fontSize: wp(4),
  },
});
export default LoginScreen;