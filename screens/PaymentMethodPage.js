

import { useNavigation } from '@react-navigation/native';
import React ,{useState,useRef}from 'react';
import axios from 'axios';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import  { Paystack , paystackProps}  from 'react-native-paystack-webview';
import { View, TouchableOpacity,Text ,TextInput } from 'react-native';
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import Constants from 'expo-constants';
import { Alert } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const PaymentMethodPage = () => {
  const [amount, setAmount] = useState('');
  
  const [CountrySymbol, setCountrySymbol] = useState([]);

const navigation = useNavigation();



useFocusEffect(
  React.useCallback(() => {
    const fetchPersonalDetails = async () => {
      const userId = await AsyncStorage.getItem("userId");
      const prod = `https://lottery-backend-tau.vercel.app/api/v1/user/game/get-previous-game-winning-numbers/${userId}`;
      const dev = `https://lottery-backend-dev.vercel.app/api/v1/user/game/get-previous-game-winning-numbers/${userId}`;
      const isStandaloneApp = Constants.appOwnership === 'expo';
      const baseURL = isStandaloneApp ? dev : prod;
      const storedAccessToken = await AsyncStorage.getItem("accessToken");

      try {
        const response = await fetch(baseURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedAccessToken}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`${response.status} - ${errorData.message}`);
        }

        const data = await response.json();
        setCountrySymbol(data.message.countrySymbol);
        console.log("credits credits credits credits credits credits credits", data.message.countrySymbol);
      } catch (error) {
        console.error("Error fetching personal details:", error.message);
        if (error.message.includes("401 - Unauthorized: Token expired")) {

          await AsyncStorage.removeItem('userId');
          await AsyncStorage.removeItem('accessToken');
          await AsyncStorage.removeItem('userNumber');
          
          Alert.alert(
            "Session Expired",
            "Your session has expired. Please login again.",
            [
              { text: "OK", onPress: () => navigation.navigate('Login') }
            ]
          );
        }
      }
    };

    fetchPersonalDetails();
  }, []) // Empty dependency array means this effect will only run once when the component mounts
);



const handlePaystackSuccess = async (res) => {
  try {


    if (!amount) {
      // Display an alert message
      alert('Please enter an amount');
      return;
    }
    // Retrieve userId and accessToken from AsyncStorage
    const storedUserDetails = await AsyncStorage.getItem('userDetails');
    console.log('Paystack Success Response:', res);

    const transactionReference = res.transactionRef.reference;
    console.log('Transaction Reference:', transactionReference);
    // Parse the stored JSON string to get the user details object
    const userDetails = JSON.parse(storedUserDetails);
    const accessToken = await AsyncStorage.getItem('accessToken');
    const userId = await AsyncStorage.getItem('userId');
    
    // Extract other required information
   

    // Call the addCredits endpoint
    try {


  const prod = 'https://lottery-backend-tau.vercel.app/api/v1/user/add-credits'
  const dev = 'https://lottery-backend-dev.vercel.app/api/v1/user/add-credits'

  const isStandaloneApp = Constants.appOwnership === 'expo';


    const baseURL = isStandaloneApp ? dev : prod
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          userId,
          transactionReference,
        }),
      });

      // Check if the response status is OK (200)
      if (response.ok) {
        // Parse the JSON response
        const responseData = await response.json();
        console.log(responseData);
        navigation.navigate('MainScreen');
      } else {
        // Handle non-OK response
        const errorData = await response.text();
        console.error('API Error:', errorData);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    }

  } catch (error) {
    console.error('Error adding credits:', error.message);
  }
};




  const handlePaystackSuccessBank = async (res) => {
    try {
      // Retrieve userId and accessToken from AsyncStorage
      const storedUserDetails = await AsyncStorage.getItem('userDetails');
  
      // Parse the stored JSON string to get the user details object
      const userDetails = JSON.parse(storedUserDetails);
      const accessToken = await AsyncStorage.getItem('accessToken');
      
      const userId = await AsyncStorage.getItem('userId');
      // Extract other required information
      const transactionReference = res.transactionRef.reference; // Replace with the actual key in the response
  
      // Call the addCredits endpoint

     
      try {

        const prod = 'https://lottery-backend-tau.vercel.app/api/v1/user/add-credits'
        const dev = 'https://lottery-backend-dev.vercel.app/api/v1/user/add-credits'
      
        const isStandaloneApp = Constants.appOwnership === 'expo';


        const baseURL = isStandaloneApp ? dev : prod
        const response = await fetch(baseURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, // Include the access token in the headers
          },
          body: JSON.stringify({
            userId,
            transactionReference,
          }),
        });
        const responseData = response.json();
        if (response.ok) {
          // Credits added successfully
          console.log(responseData);
          console.log(res)
          navigation.navigate('MainScreen')
        } else {
          // Handle error
          console.error(responseData);

  
        }
      } catch (error) {
        console.error(error);
      }
  
      
       
    
    } catch (error) {
      
      console.error('Error adding credits:', error.message);
      
    }
  };

  const handlePaystackSuccessUSSD = async (res) => {
    try {
      // Retrieve userId and accessToken from AsyncStorage
      const storedUserDetails = await AsyncStorage.getItem('userDetails');
  
      // Parse the stored JSON string to get the user details object
      const userDetails = JSON.parse(storedUserDetails);
      const accessToken = await AsyncStorage.getItem('accessToken');
      
      const userId = await AsyncStorage.getItem('userId');
      // Extract other required information
      const transactionReference = res.transactionRef.reference; // Replace with the actual key in the response
  
      // Call the addCredits endpoint
      try {

        const prod = 'https://lottery-backend-tau.vercel.app/api/v1/user/add-credits'
        const dev = 'https://lottery-backend-dev.vercel.app/api/v1/user/add-credits'
      
        const isStandaloneApp = Constants.appOwnership === 'expo';


        const baseURL = isStandaloneApp ? dev : prod
        const response = await fetch(baseURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, // Include the access token in the headers
          },
          body: JSON.stringify({
            userId,
            transactionReference,
          }),
        });
        const responseData = response.json();
        if (response.ok) {
          // Credits added successfully
          console.log(responseData);
          console.log(res)
          navigation.navigate('MainScreen')
        } else {
          // Handle error
          console.error(responseData);

  
        }
      } catch (error) {
        console.error(error);
      }
  
      
       
    
    } catch (error) {
      
      console.error('Error adding credits:', error.message);
      
    }
  };
  const handleAmountChange = (text) => {
    // Remove the currency symbol from the input
    const valueWithoutSymbol = text.replace(CountrySymbol, '');
    setAmount(valueWithoutSymbol);
  };

    
    const paystackWebViewRef = useRef(paystackProps.PayStackRef); 

    const paystackWebViewRefBank = useRef(paystackProps.PayStackRef); 

    const paystackWebViewRefUSSD = useRef(paystackProps.PayStackRef); 
  return (




    <KeyboardAwareScrollView>
    <View style={styles.container}>


<TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={35}
            color="black"
            style={{
              alignSelf: "flex-start", // Add this line,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Enter Amount</Text>

<TextInput
  placeholder="Enter amount"
  style={{
    height: responsiveHeight(7),
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius:20
  }}
  keyboardType="numeric"
  value={CountrySymbol + amount}
  onChangeText={handleAmountChange}
/>


<Text  style={{marginBottom:'10%'}}>Amount of credits you will get : {amount}</Text>

<Paystack
        paystackKey="pk_test_e7ac28433b9441b06eadb58383119e23cbb98d6d"
        paystackSecretKey="sk_test_812d541223297ccb59de49c57fbc7a941adee742"
        billingEmail="paystackwebview@something.com"
        channels={["card"]}
        amount={amount}
        
        onCancel={(e) => {
          // handle response here
        }}
        onSuccess={handlePaystackSuccess}
        ref={paystackWebViewRef}
      />


<Paystack
        paystackKey="pk_test_e7ac28433b9441b06eadb58383119e23cbb98d6d"
        paystackSecretKey="sk_test_812d541223297ccb59de49c57fbc7a941adee742"
        billingEmail="paystackwebview@something.com"
        channels={["bank"]}
        amount={amount}
        
        onCancel={(e) => {
          // handle response here
        }}
        onSuccess={handlePaystackSuccessBank}
        ref={paystackWebViewRefBank}
      />


<Paystack
        paystackKey="pk_test_e7ac28433b9441b06eadb58383119e23cbb98d6d"
        paystackSecretKey="sk_test_812d541223297ccb59de49c57fbc7a941adee742"
        billingEmail="paystackwebview@something.com"
        channels={["ussd"]}
        amount={amount}
        
        onCancel={(e) => {
          // handle response here
        }}
        onSuccess={handlePaystackSuccessUSSD}
        ref={paystackWebViewRefUSSD}
      />

      <Text style={styles.title}>Select Payment Method</Text>

 

      <Button
        contentStyle={{
          height: responsiveHeight(7),
          justifyContent: 'center',
          alignItems: 'center',
        }}
        style={{
          backgroundColor: '#31A062',
          width: '100%',
          marginVertical: 10,
          marginTop: 15,
        }}
        mode="contained"
        onPress={() => {
          // Check if the amount is null or empty
          if (!amount) {
            // Display an alert message
            alert('Please enter an amount');
            return;
          }
      
          // Start the transaction if the amount is valid
          paystackWebViewRef.current.startTransaction();
        }}
      >
        Credit/Debit Card
      </Button>

      <Button
      contentStyle={{
        height: responsiveHeight(7),
        justifyContent: 'center',
        alignItems: 'center',
      }}
      style={{
        backgroundColor: '#31A062',
        width: '100%',
        marginVertical: 10,
        marginTop: 15,
      }}
        mode="contained"

        onPress={() => {
          // Check if the amount is null or empty
          if (!amount) {
            // Display an alert message
            alert('Please enter an amount');
            return;
          }
      
          // Start the transaction if the amount is valid
          paystackWebViewRefBank.current.startTransaction()
        }}
       
      >
        Bank Transfer
      </Button>

      <Button
        contentStyle={{
          height: responsiveHeight(7),
          justifyContent: 'center',
          alignItems: 'center',
        }}
        style={{
          backgroundColor: '#31A062',
          width: '100%',
          marginVertical: 10,
          marginTop: 15,
        }}
        mode="contained"
     


        onPress={() => {
          // Check if the amount is null or empty
          if (!amount) {
            // Display an alert message
            alert('Please enter an amount');
            return;
          }
      
          // Start the transaction if the amount is valid
          paystackWebViewRefUSSD.current.startTransaction()
        }}
      >
        Ussd
      </Button>

      <Button
       contentStyle={{
        height: responsiveHeight(7),
        justifyContent: 'center',
        alignItems: 'center',
      }}
      style={{
        backgroundColor: '#31A062',
        width: '100%',
        marginVertical: 10,
        marginTop: 15,
      }}
        mode="contained"
        onPress={()=> navigation.navigate("KioskCode")}
      >
        Kiosk Code
      </Button>
    </View>
    </KeyboardAwareScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    marginTop:'12%',
    paddingLeft: 16,
    paddingRight:16
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonBusyOvelay: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  buttonBusy: {
    
  },
  buttonAlignLeft: {
    justifyContent: 'flex-start',
  },
  button: {
    paddingHorizontal: 16,
    minWidth: 100,
    height: 52,
    
    borderWidth: 1,
    borderRadius: 6,
   
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  buttonContent: {
    resizeMode: 'contain',
    width: 187.3,
    height: 187.3 
  },
};

export default PaymentMethodPage;