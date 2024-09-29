import React, { useState, useEffect, useCallback,createRef } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Modal } from 'react-native';
import * as Font from 'expo-font';
import { Entypo } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput, Button } from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BackHandler } from 'react-native';
import { useAuth } from './auth/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LoginTesting = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNumberLogin, setMobileNumberLogin] = useState('');
    const { setAccessToken } = useAuth();
    const [countryCode, setCountryCode] = useState('');
    const [show, setShow] = useState(false);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation()

    const handleLogin = async () => {
        try {
          // Validate input fields (you may want to add more validation)
          if (!email || !password) {
            console.log('Please fill in all fields');
            return;
          }
      
          // Make API request to login user using fetch
          const response = await fetch('https://lottery-backend-tau.vercel.app/api/v1/user/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
              pushNotificationToken:'NR8AdCA0x-RmA1L7JSb_LL'
            }),
          });
      
          if (response.ok) {
            // If login is successful, you may want to store user information or a token
            const result = await response.json();
          
            console.log('User logged in successfully:', result);
            const accessToken = result.data.accessToken;
            const refreshToken = result.data.refreshToken;
    
            const credits = result.data.user.credits;
            const userId = result.data.user._id;
            const userName = result.data.user.name;
            // Access user details from the response
            const user = result.message.user;
            console.log('User Details:', user);
            console.log('Access Token:', accessToken);
            console.log('Credits:', credits);
            console.log('UserId',userId);
            console.log('UserName..',userName);
    
            console.log('Refresh Token:', result.message.refreshToken);
            // Store user details or navigate to another screen
             await AsyncStorage.setItem('accessToken', accessToken);
             await AsyncStorage.setItem('refreshToken', refreshToken);
    
             await AsyncStorage.setItem('userId', userId);
             await AsyncStorage.setItem('userName', userName);
             await AsyncStorage.setItem('credits', credits.toString());
    
            // await AsyncStorage.setItem('userDetails', JSON.stringify(user));
    
            // fetchCredits();
            // fetchAndConsoleStoredCredits();
            
            // setAccessToken(result.message.accessToken);
            // You may want to navigate to another screen or perform authentication
            navigation.navigate('MainScreen', { screen: 'MainScreen' });
          } else {
            // If login fails, handle the error (show an alert, etc.)
            console.error('Login failed');
    
            Alert.alert(
              '',
              'Login Failed',
              [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
            );
          }
        } catch (error) {
          console.error('Error during login:', error.message);
        }
      };



  return (
     <View>
      <Text>LoginTesting</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginTesting

const styles = StyleSheet.create({})