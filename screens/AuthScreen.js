import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import SensitiveInfo from 'react-native-sensitive-info';

const LocalAuthenticationScreen = ({authenticate}) => {
  const [enteredPassword, setEnteredPassword] = useState('');
  const navigation = useNavigation();
  const handleAuthentication = async () => {
    try {
      // Retrieve the stored password
      const storedPassword = await SensitiveInfo.getItem('userPassword', {});

      // Compare entered password with stored password
      if (enteredPassword === storedPassword) {
        // Passwords match, user is authenticated
        Alert.alert('Success', 'Authentication successful');
     
        navigation.navigate('MainScreen', { screen: 'MainScreen' });
        // You can navigate to the main app screen or perform other actions here
      } else {
        // Passwords do not match, authentication failed
        Alert.alert('Error', 'Authentication failed');
      }
    } catch (error) {
      console.error('Error retrieving stored password:', error.message);
    }
  };

  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,marginTop:100}}>
      <Text>Enter Your Password:</Text>
     
      <TouchableOpacity onPress={() => navigation.navigate('MainScreen')} style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5 }}>
        <Text style={{ color: 'white' }}>Authenticate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocalAuthenticationScreen;
