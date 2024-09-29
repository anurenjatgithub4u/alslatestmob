// config.js

import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';

const userId = await AsyncStorage.getItem("userId");



const isProduction = Constants.executionEnvironment === 'standalone';



  const config = {
    production: {
        loginUrl: 'https://lottery-backend-tau.vercel.app',
      // Add other production URLs here
    },
    development: {
        loginUrl: 'https://lottery-backend-dev.vercel.app',
      // Add other development URLs here
    },
  };
  
const baseURL = isProduction ? config.production.loginUrl : config.development.loginUrl
console.log("baseUrl", baseURL)
  export default baseURL;
  

