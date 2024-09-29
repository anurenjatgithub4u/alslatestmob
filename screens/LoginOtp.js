
import React,{useState,useRef} from 'react'
import { View, Text, TextInput, Alert , StyleSheet,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios'; // Import Axios library
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";


const LoginOtp = ({ route,navigation }) => {

    const { mobileNumber } = route.params;
    const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
    
    const digitRefs = Array(6).fill(0).map((_, index) => useRef(null));
    const handleDigitChange = (index, value) => {
      // Update the corresponding OTP digit in the state
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

     
      try {
       
        // Combine the OTP digits
        const enteredOTP = otpDigits.join('');
    
        // Make a request to your server to verify the OTP using Axios
        const response = await axios.post(
          'https://lottery-backend-tau.vercel.app/api/v1/auth/verify-login-with-number',
          {
            mobileNumber,
            otp: enteredOTP,
            pushNotificationToken: token,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
    
        if (response.status === 200) {
          // If verification is successful, navigate to the next screen (e.g., HomeScreen)
          const result = response.data;
          const accessToken = result.data.accessToken;
          const refreshToken = result.data.refreshToken;
          const credits = result.data.user.credits;
          const userId = result.data.user._id;
          const userName = result.data.user.name;
          const userDate = result.data.user.createdAt;
          const userNumber = 1;
          // Setting the value for 'loginId' key
          
          // console.log('User Details:', result.message.user);
          // console.log('Access Token:', accessToken);
          // console.log('Credits:', credits);
          // console.log('UserId', userId);
          // console.log('UserName..', userName);
          // console.log('Refresh Token:', result.message.refreshToken);
    
          await AsyncStorage.setItem('accessToken', accessToken);
          await AsyncStorage.setItem('refreshToken', refreshToken);
          await AsyncStorage.setItem('userId', userId);
          await AsyncStorage.setItem('userName', userName);
          await AsyncStorage.setItem('userDate', userDate);
          await AsyncStorage.setItem('credits', credits.toString());
          await AsyncStorage.setItem('userNumber', userNumber.toString());
  
          navigation.navigate('MainScreen');
        } else {
          // If verification fails, handle the error (show an alert, etc.)
          console.error('OTP verification failed');
        }
      } catch (error) {
        // Handle any errors that occurred during the process
       
        alert(error.response.data.message)
      }
    };



    
  
    return (
      <View style={{ flex: 1, alignItems: 'center',padding:16 }}>
  
  
  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '5%', alignSelf: 'flex-start' }}>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <MaterialIcons name="keyboard-arrow-left" size={35} color="black" />
      </TouchableOpacity>
      <Text style={{ fontSize: 34, fontWeight: '700', marginLeft: 8 }}>OTP Verification</Text>
    </View>
  
  
        <View    style={{ flexDirection: 'row', marginTop: 40 ,alignItems:'center'}}>
          {/* Create six TextInput components for each digit */}
          {otpDigits.map((digit, index) => (
  
  
  <View key={index}
  
  style={{ borderColor: 'black',
        backgroundColor: 'white',
        width: 50,
        justifyContent: 'center',
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
                alignItems:'center',
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
  

  <Button  contentStyle={{
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  }}
  style={{
    backgroundColor: '#31A062',
    width: '90%',
    marginVertical: 10,
    marginTop: 15,
    alignSelf:'center',
    borderRadius:20
  }} onPress={handleVerification}><Text  style={{color:"white"}}>Verify OTP</Text></Button>
  
      
      </View>
    );
  };

export default LoginOtp

const styles = StyleSheet.create({})