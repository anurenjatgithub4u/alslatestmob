import { StyleSheet, Text, View, ScrollView,TouchableOpacity ,ActivityIndicator , TextInput ,Alert } from "react-native";
import React, { useState, useEffect,useCallback  } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Card, Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { responsiveFontSize, responsiveHeight ,responsiveWidth} from "react-native-responsive-dimensions";
import { RadioButton } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Constants from 'expo-constants';

const RedeemAmountAccessPage = () => {

    const [redeemAmt, setredeemAmt] = useState('');
    const navigation = useNavigation();
   
    const [bankAccounts, setBankAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [credits, setCredits] = useState(0);
    const [selectedAccountIndex, setSelectedAccountIndex] = useState(null);
    const [CountrySymbol, setCountrySymbol] = useState([]);
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
          Alert.alert(
            'No bank account found',
            'Please add a bank account before redeeming',
            [
              {
                text: 'OK',
                onPress: () => navigation.navigate('AddAccount'), // Navigate to AddAccount screen
              },
            ]
          );
          return; // Stop further execution
        }

        if(credits<redeemAmt){
          Alert.alert(
            'You dont have  enough credits!',
            'To redeem this amount ',
            [
              {
                text: 'OK',
               // Navigate to AddAccount screen
              },
            ]
          );
          return; // Stop further execution
        }
    
        // Check if any account is selected
        if (selectedAccountIndex === null) {
          Alert.alert(
            'Select Account',
            'Please select a bank account to redeem credits.'
          );
          return; // Stop further execution
        }
    
        // Get the selected bank account's details
        const selectedAccount = bankAccounts[selectedAccountIndex];
    
        const redeemAmount = parseFloat(redeemAmt); // Parse the redeemAmt to a float
          
        // Check if redeemAmount is valid
        if (isNaN(redeemAmount) || redeemAmount <= 0) {
          alert('Invalid Amount', 'Please enter a valid redeem amount.');
          return; // Stop further execution
        }
        console.log("checking testing", selectedAccount.accountNumber)

        const prod = "https://lottery-backend-tau.vercel.app/api/v1/user/redeem-credit"

        const dev = "https://lottery-backend-dev.vercel.app/api/v1/user/redeem-credit"


        const isStandaloneApp = Constants.appOwnership === 'expo';


        const baseURL = isStandaloneApp ? dev : prod
    


        const response = await fetch(baseURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedAccessToken}`, 
          },
          body: JSON.stringify({
            userId: user,
            redeemAmount,
            accountNumber: selectedAccount.accountNumber, 
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
    const handleAmountChange = (text) => {
      // Remove the currency symbol from the input
      const valueWithoutSymbol = text.replace(CountrySymbol, '');
      setredeemAmt(valueWithoutSymbol);
    };
    
useFocusEffect(
  React.useCallback(() => {
    const fetchPersonalDetails = async () => {
      const userId = await AsyncStorage.getItem("userId");
      const prod = `https://lottery-backend-tau.vercel.app/api/v1/user/game/get-previous-game-winning-numbers/${userId}`;

      const dev = `https://lottery-backend-dev.vercel.app/api/v1/user/game/get-previous-game-winning-numbers/${userId}`;

      const isStandaloneApp = Constants.appOwnership === 'expo';


      const baseURL = isStandaloneApp ? dev : prod
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
        // Additional fields can be set here based on your API response
      } catch (error) {
        console.error("Error fetching personal details:", error.message);
      }
    };

    fetchPersonalDetails();
  }, []) // Empty dependency array means this effect will only run once when the component mounts
);

useFocusEffect(
  React.useCallback(() => {
    const fetchPersonalDetails = async () => {
      const userId = await AsyncStorage.getItem("userId");
      const prod = `https://lottery-backend-tau.vercel.app/api/v1/user/personal-details/${userId}`;

      const dev = `https://lottery-backend-dev.vercel.app/api/v1/user/personal-details/${userId}`;

      const isStandaloneApp = Constants.appOwnership === 'expo';


      const baseURL = isStandaloneApp ? dev : prod
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
        setCredits(data.message.credits);
        console.log("credits credits credits credits credits credits credits", data.message.credits);
        // Additional fields can be set here based on your API response
      } catch (error) {
        console.error("Error fetching personal details:", error.message);
      }
    };

    fetchPersonalDetails();
  }, []) // Empty dependency array means this effect will only run once when the component mounts
);
    
  const toggleAccountSelection = (index) => {
    if (selectedAccountIndex === index) {
      // If the same item is pressed again, deselect it
      setSelectedAccountIndex(null);
    } else {
      // Otherwise, select the new item
      setSelectedAccountIndex(index);
    }
  };
      
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchBankAccounts();
    }, [])
  );

  return (
    <View style={styles.container}>
 <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
         
          paddingTop:'15%',
          marginBottom:'5%'
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
        <Text style={{ fontWeight: '700', fontSize: 17,textAlign: 'center' ,flex: 1,}}>Redeem Amount</Text>
      </View>

      


    
          <TextInput
            style={styles.inputField}
            placeholder="Enter the amount you want to redeem"
            value={CountrySymbol +redeemAmt}
            onChangeText={handleAmountChange}
          />


          <Text  style={{marginLeft:10,paddingLeft:10}}>Total Winnings:</Text>

{bankAccounts.length === 0 ? (
        <Text style={{ paddingLeft: 20, paddingTop: 20 }}>Add Bank Account To Redeem</Text>
      ) : (
        <Text style={{ paddingLeft: 20, paddingTop: 20 }}>Select Bank Account To Redeem</Text>
      )}
      <ScrollView style={{ marginTop: 10, marginBottom: 20 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#31A062" style={{ marginTop: 20 }} />
        ) : (
          bankAccounts.map((account, index) => (
            <Card key={index} style={styles.card}>
              <View style={{ flexDirection: 'row' }}>
              <CheckBox
              checked={selectedAccountIndex === index}
              onPress={() => toggleAccountSelection(index)} // Call toggle function
              checkedColor="#31A062"
            />
                <View
                  style={{
                    flexDirection: 'column',
                  }}
                >
                   <Text style={{ marginLeft: 1 }}>{account.accountHolderName}</Text>
                  <Text style={{ marginLeft: 1 }}>{account.accountNumber}</Text>
                 
                  <Text style={{ marginLeft: 1 }}>{account.BIC}</Text>
                  <Text style={{ marginLeft: 1 }}>{account.branch}</Text>
                  <Text style={{ marginLeft: 1 }}>{account.branchName}</Text>
                </View>
              </View>
            </Card>
          ))
        )}

      
      </ScrollView>
    
    <Button
          mode="contained"
          onPress={redeemCredits}
          contentStyle={{
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf:'center'
          }}
          style={{
            backgroundColor: '#31A062',
            width: '90%',
            marginVertical: 10,
            alignSelf: 'center',
          }}
        >
          Redeem
        </Button>
        </View>
  )
}

export default RedeemAmountAccessPage

const styles = StyleSheet.create({
    container: {
      paddingLeft:16,
      paddingRight:16,
      paddingBottom:16
      
      
    },

    forgotpasswordText: {
      // Add this line to align text to the left
      width: 354,
      minHeight: hp("7%"),
  
      marginLeft: "5%",
  
      fontSize: 34, // Adjust the font size as needed
      fontWeight: "bold",
    },
    card: {
        margin: 10,
        padding: 1,
        paddingTop:10,
        alignSelf: "center",
        marginTop: 1,
        borderRadius: 20,
        backgroundColor: "#f0f0f0",
        elevation: 3,
        width: responsiveWidth(82),
        alignSelf: "center",
        height: 121,
      },
    inputField: {
      borderWidth: 1,
      borderColor: 'gray',
      padding: 10,
      margin: 10,
      width: '90%',
      borderRadius:20,
      alignSelf:'center'
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
  