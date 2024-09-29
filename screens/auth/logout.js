// AuthService.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const backendURL = 'https://lottery-backend-tau.vercel.app/api/v1/auth';

const logout = async (navigation) => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await axios.post(
      `${backendURL}/logout`,
      { refreshToken },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      console.log('Logged out successfully');
      navigation.navigate('ProfileLanding');
    } else {
      console.error('Logout failed');
    }
  } catch (error) {
    console.error('Error during logout', error);
  }
};

export { logout };
