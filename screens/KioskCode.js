import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Alert } from 'react-native';
import {  Button } from "react-native-paper";
import Constants from 'expo-constants';

const KioskCode = () => {
  const [couponCodee, setCouponCode] = useState('');
  const navigation = useNavigation();
  const addCreditsUsingCoupon = async (userId, couponCode, authToken) => {
    const storedAccessToken = await AsyncStorage.getItem('accessToken');
    const userIds = await AsyncStorage.getItem('userId');
    const prod = "https://lottery-backend-tau.vercel.app/api/v1/user/add-credits-using-coupon";
    const dev = "https://lottery-backend-dev.vercel.app/api/v1/user/add-credits-using-coupon";
    const isStandaloneApp = Constants.appOwnership === 'expo';
    const baseURL = isStandaloneApp ? dev : prod;
  
    console.log("userId:", userIds, "couponCode:", couponCodee);
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${storedAccessToken}`,
        },
        body: JSON.stringify({ userId: userIds, couponCode: couponCodee }),
    };

    try {
        const response = await fetch(baseURL, requestOptions);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const responseData = await response.json();
        console.log("Success");
        Alert.alert(
            '',
            'Credits Added Successfully',
            [{ text: 'OK', onPress: () => navigation.navigate("Home") }] // Ensure the correct navigation target ("Home" instead of "Hom")
        );
        
        return responseData;
    } catch (error) {
        //console.log("Kiosk coupon error", error.message);
        // Check if the error message indicates an expired token
        if (error.message.includes("Token expired") || error.message.includes("Unauthorized")) {
            // Navigate to Login screen
            
            await AsyncStorage.removeItem('userId');
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('userNumber');
            Alert.alert(
                'Failed',
                error.message,
                [{ text: 'OK', onPress: () => navigation.navigate("Login") }]
            );
        } else {
            Alert.alert(
                'Failed',
                error.message,
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
            );
        }
    }
};  

const addCreditsUsingCouponTwo = async () => {
  console.log("Entered Coupon Code:", couponCodee); // Log the entered coupon code
};  


  
  // Example usage
  
  
  return (
    <View style={styles.container}>

<View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("PaymentMethodPage")}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={35}
            color="black"
           
          />
        </TouchableOpacity>
      </View>

      <Text>KioskCode</Text>

      <TextInput
        style={styles.inputField}
        placeholder="Enter Coupon Code"
        value={couponCodee}
        onChangeText={(text) => setCouponCode(text)}
      />



      <Button
          mode="contained"
          onPress={addCreditsUsingCoupon}
          contentStyle={{
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          style={{
            backgroundColor: '#31A062',
            width: '90%',
            marginVertical: 10,
            marginTop: 15,
            alignSelf: 'center',
          }}
        >
          Add Credits
        </Button>
    </View>
  );
};

export default KioskCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
    width: '90%',
    borderRadius:20
  },
  addButton: {
    backgroundColor: '#31A062',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    borderRadius:16
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 10, // Adjust this value to change the distance from the top
    left: 10,
    zIndex: 1,
    marginTop:'10%'
  },
});
