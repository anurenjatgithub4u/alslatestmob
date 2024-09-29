import { StyleSheet, Text, View, ScrollView,TouchableOpacity ,ActivityIndicator , TextInput } from "react-native";
import React, { useState, useEffect,useCallback  } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Card, Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { responsiveFontSize, responsiveHeight ,responsiveWidth} from "react-native-responsive-dimensions";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Constants from 'expo-constants';


const RedeemPage = () => {
  const navigation = useNavigation();
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redeemAmt, setredeemAmt] = useState('');

  const fetchBankAccounts = async () => {
    const user = await AsyncStorage.getItem('userId');
    const prod = `https://lottery-backend-tau.vercel.app/api/v1/user/get-bank-account/${user}`;

    const dev = `https://lottery-backend-dev.vercel.app/api/v1/user/get-bank-account/${user}`;
    const storedAccessToken = await AsyncStorage.getItem('accessToken');
    const isStandaloneApp = Constants.appOwnership === 'expo';


    const baseURL = isStandaloneApp ? dev : prod
    try {
      const response = await fetch(baseURL, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${storedAccessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Request failed');
      }

      const responseData = await response.json();
      console.log('data....', responseData);
      setBankAccounts(responseData.bankAccount);
    } catch (error) {
      console.error('Error fetching bank accounts:', error.message);
    } finally {
      setLoading(false);
    }
  };


  const redeemCredits = async () => {
    try {
      const user = await AsyncStorage.getItem('userId');
      const storedAccessToken = await AsyncStorage.getItem('accessToken');
      console.log('checking', storedAccessToken);
      // Check if there are any bank accounts
      if (bankAccounts.length === 0) {
        alert('Add Bank Account', 'Please add a bank account to redeem credits.');
        return; // Stop further execution
      }
  
      // Assuming redeemAmt is a valid number entered by the user
      const redeemAmount = parseFloat(redeemAmt); // Parse the redeemAmt to a float
      
      // Check if redeemAmount is valid
      if (isNaN(redeemAmount) || redeemAmount <= 0) {
        alert('Invalid Amount', 'Please enter a valid redeem amount.');
        return; // Stop further execution
      }
  
      const response = await fetch(`https://lottery-backend-tau.vercel.app/api/v1/user/redeem-credit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedAccessToken}`, // Include storedAccessToken in the header
        },
        body: JSON.stringify({
          userId: user,
          redeemAmount,
        }),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        alert("Your redeem request has been forwarded to ALS admin successfully! We will be in touch soon.")
      } else {
        throw new Error(responseData.message || 'Failed to redeem credits');
      }
    } catch (error) {
      console.log('Error', error.message);
    }
  };
  




  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchBankAccounts();
    }, [])
  );

  return (
    <View  style={{paddingLeft:16,paddingRight:16 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
         
          paddingTop:'15%',
        }}
      >

        <TouchableOpacity  style={{alignSelf:'flex-start'}}
        
        onPress={() => navigation.navigate('Profile')}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={35}
            color="black"
            style={{
               // Add marginLeft to push the icon to the left
            }}
          />
        </TouchableOpacity>
        <Text style={{ fontWeight: '700', fontSize: 17,textAlign: 'center' ,flex: 1,}}>Bank Accounts</Text>
      </View>

      

     


    

      <ScrollView style={{ marginTop: 20, marginBottom: 100 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#31A062" style={{ marginTop: 20 }} />
        ) : (
          bankAccounts.map((account, index) => (
            <Card key={index} style={styles.card}>
              <View style={{ flexDirection: 'row' }}>
                <FontAwesome name="credit-card-alt" size={24} color="black" />
                <View
                  style={{
                    flexDirection: 'column',
                  }}
                >
                   <Text style={{ marginLeft: 20 }}>{account.accountHolderName}</Text>
                  <Text style={{ marginLeft: 20 }}>{account.accountNumber}</Text>
                 
                  <Text style={{ marginLeft: 20 }}>{account.BIC}</Text>
                  <Text style={{ marginLeft: 20 }}>{account.branch}</Text>
                  <Text style={{ marginLeft: 20 }}>{account.branchName}</Text>
                </View>
              </View>
            </Card>
          ))
        )}

        <Button
          mode="contained"
          onPress={() => navigation.navigate('AddAccount')}
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
          Add Account
        </Button>
      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  arrowStyle: {
    top: 69,
    left: 29,

    // Add the desired border color here
  },

  textRedeem: {
    fontSize: 17,

    marginLeft: 60,
    top: 69,
  },
  card: {
    margin: 10,
    padding: 15,
    alignSelf: "center",
    marginTop: 1,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    elevation: 3,
    width: responsiveWidth(82),
    alignSelf: "center",
    height: 121,
  },
  cardThree: {
   margin:10,
   padding:15,
    alignSelf: "center",
    marginTop: 1,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    elevation: 3,
    width: responsiveWidth(82),
    alignSelf: "center",
    height: 50,
  },
  forgotpasswordText: {
    // Add this line to align text to the left
    width: 354,
    minHeight: hp("7%"),

    marginLeft: "5%",

    fontSize: 34, // Adjust the font size as needed
    fontWeight: "bold",
  },
  inputField: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
   
    width: '100%',
    borderRadius:20,
    alignSelf:'center',
    marginTop:10
  },

  cardTwo: {
    margin: 10,
    padding: 15,
    alignSelf: "center",

    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    elevation: 3,
    width: 350,
    alignSelf: "center",
    height: 111,
  },
});
export default RedeemPage;
