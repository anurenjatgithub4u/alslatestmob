
import React, { useState ,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from './auth/AuthContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const PlayScreen = () => {

  const navigation = useNavigation();
  const { accessToken, setAccessToken } = useAuth();
  const [userId, setUserId] = useState('');
  const [gameLevel, setGameLevel] = useState('');
  const [credits, setCredits] = useState('');
  const [selectedNumbers, setSelectedNumbers] = useState('');
  const [selectedNumberIndex, setSelectedNumberIndex] = useState(null);
  const refreshToken = accessToken;



  const handleCreateGame = async () => {
    try {
      // Retrieve userDetails from AsyncStorage
      const storedUserDetails = await AsyncStorage.getItem('userDetails');
      const storedAccessToken = await AsyncStorage.getItem('accessToken');
      const storedUserCredits = await AsyncStorage.getItem('userCredits');
      // Parse the stored JSON string to get the user details object
      const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null;
      const level = 2;
      // Check if userDetails exists and has _id property
      if (userDetails && userDetails._id) {
        const response = await axios.post(
          'https://lottery-backend-tau.vercel.app/api/v1/user/game/new-game',
          {
            userId: userDetails._id, // Use userId from userDetails
            gameLevel : level,
            credits : storedUserCredits,
            selectedNumbers,
          },
          {
            headers: {
              Authorization: `Bearer ${storedAccessToken}`, // Use stored access token
              'Content-Type': 'application/json',
            },
          }
        );

        // Handle success
       console.log('Success',userDetails._id,level,storedUserCredits,selectedNumbers);
      } else {
        console.log('User details not found or missing _id property');
      }
    } catch (error) {
      // Handle error
      console.log('Error', 'Failed to create game. Please try again.');
      console.error('Error creating game:', error.message);
    }
  };

  const fetchAndConsoleUserId = async () => {
    try {
      // Retrieve userDetails from AsyncStorage
      const storedUserDetails = await AsyncStorage.getItem('userDetails');
      const storedAccessToken = await AsyncStorage.getItem('accessToken');
      const storedUserCredits = await AsyncStorage.getItem('userCredits');
      // Parse the stored JSON string to get the user details object
      const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null;
  
      // Check if userDetails exists and has _id property
      if (userDetails && userDetails._id) {
        // Log the _id from the user details
        console.log('User ID:', userDetails._id);
        console.log('Stored Access Token:', storedAccessToken);
        console.log('Stored User credits again:', storedUserCredits);

      } else {
        console.log('User details not found or missing _id property');
      }
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };
  
  // Call fetchAndConsoleUserId to retrieve and console the user ID
  fetchAndConsoleUserId();


  
  
  
  
  const handleNumberSelect =  (number) => {
    // Convert the number into an array
    const numbersArray = Array.isArray(number) ? number : [number];
  
    // Parse the stored JSON string to get the user details object
   
    // Check if the number is already selected
    const isSelected = selectedNumbers.includes(number);
  
    // If the number is selected, update the selected number index to the current number
    if (isSelected) {
      setSelectedNumberIndex(number);
      console.log("Selected Number:", number);
    } else if (selectedNumbers.length < 6) {
      // If the number is not selected and there are less than 6 selected numbers, add all numbers to the array
      setSelectedNumbers((prevSelectedNumbers) => prevSelectedNumbers.concat(numbersArray));
      setSelectedNumberIndex(number); // Set selected number index for border color change
      console.log("Selected Numbers:", selectedNumbers.concat(numbersArray));
    } else {
      // If there are already 6 selected numbers, replace the first selected number with the new one
      const indexOfSelectedNumber = selectedNumbers.indexOf(selectedNumberIndex);
      const newSelectedNumbers = [...selectedNumbers];
      newSelectedNumbers[indexOfSelectedNumber] = number;
      setSelectedNumbers(newSelectedNumbers);
      setSelectedNumberIndex(number); // Set selected number index for border color change
      console.log("Selected Numbers:", newSelectedNumbers);
    }
  };


  const renderNumberButtons = () => {
    const numberButtons = [];
    for (let i = 1; i <= 60; i++) {
      const isSelected = selectedNumbers.includes(i);
      const isCurrentSelected = selectedNumberIndex !== null && selectedNumberIndex === i;

      numberButtons.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.numberButton,
            isSelected && styles.selectedNumberBoxSelected,
            isCurrentSelected && styles.selectedNumberBoxSelected,
          ]}
          onPress={() => handleNumberSelect(i)}
        >
          <Text>{i}</Text>
        </TouchableOpacity>
      );
    }
    return numberButtons;
  };


 

  const renderSelectedNumbers = () => {
    const selectedNumberViews = [];
    for (let i = 1; i <= 6; i++) {
      const selectedNumber = selectedNumbers[i - 1];

      selectedNumberViews.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.selectedNumberBox,
            selectedNumberIndex === selectedNumber && styles.selectedNumberBoxSelected,
          ]}
          onPress={() => handleNumberSelect(selectedNumber)}
        >
          {/* Display selected number or an empty box */}
          <Text style={styles.selectedNumber}>{selectedNumber}</Text>
        </TouchableOpacity>
      );
    }
    return selectedNumberViews;
  };
  
  
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Here You Go!</Text>
        <Text style={styles.subtitle}>Select 6 lucky numbers:</Text>
  
        <View style={styles.selectedNumbersContainer}>
          {renderSelectedNumbers()}
        </View>
  
        <View style={styles.numberButtonsContainer}>{renderNumberButtons()}</View>
  
        <TouchableOpacity  onPress={handleCreateGame} style={styles.doneButton}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  selectedNumbersContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  selectedNumber: {
    marginRight: 10,
    fontSize: 18,
  },

  
  numberButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  numberButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
    marginBottom:5,
    marginTop:3
  },
  
  doneButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedNumbersContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  selectedNumberBox: {
    width: 40,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  selectedNumber: {
    fontSize: 18,
  },

  selectedNumberBoxSelected: {
    borderColor: 'blue', // You can customize the color of the border
    borderWidth: 2,      // You can customize the width of the border
  },
  

  
});



import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';

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
              <Text>{`${country.country} - ${country.countryCode}`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const RegisterScreen = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

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

  return (
    <View style={{ marginTop: 100 }}>
      <Text>Select Country:</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.selectedCountryText}>
          {selectedCountry || 'Select a country'}
        </Text>
      </TouchableOpacity>
      <CustomPicker
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={(value) => setSelectedCountry(value)}
        data={countries}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  selectedCountryText: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    width:'20%',
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
   
    borderBottomColor: 'gray',
  },
});



import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Modal } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {CountryPicker} from "react-native-country-codes-picker";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


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
              <Text>{`${country.country} - ${country.countryCode}`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};
const RegisterScreen = () => {
  // State for input fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [show, setShow] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);


  const handleRegister = async () => {
    try {
      // Validate input fields
      if (!name || !email || !password || !mobileNumber) {
        console.log('Please fill in all fields');
        return;
      }

      // Make API request to register user using Axios
      const response = await axios.post('https://lottery-backend-tau.vercel.app/api/v1/user/register', {
        email,
        password,
        name,
        mobileNumber: `${selectedCountry}${mobileNumber}`, // Combine country code and mobile number
      });

      if (response.status === 200) {
        console.log('Registration successful:', response.data.message);
        // Navigate to another screen or perform authentication logic here
        navigation.navigate('OTP')
      } else {
        console.log('Registration failed:', response.data.message);
        // Handle registration error
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      // Handle unexpected errors during registration
    }
  };
  const navigation = useNavigation();
  useEffect(() => {
    fetchCountries();
  }, []);
  const logSelectedCountryCode = () => {
    console.log('Selected Country Code:', selectedCountry,mobileNumber);
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
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
    <Text style={styles.circleText}>LOGO</Text>
    <Text>Sign Up</Text>
    <TextInput
      label="Name"
      mode="outlined"
      style={{ width: '100%', marginVertical: 10 }}
      value={name}
      onChangeText={setName}
    />
    <TextInput
      label="Email"
      mode="outlined"
      style={{ width: '100%', marginVertical: 10 }}
      keyboardType="email-address"
      autoCapitalize="none"
      value={email}
      onChangeText={setEmail}
    />

<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
<TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.selectedCountryText}>
          {selectedCountry || 'Select'}
        </Text>
      </TouchableOpacity>
      <CustomPicker
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={(value) => setSelectedCountry(value)}
        data={countries}
      />


    <TextInput
      label="Mobile Number"
      mode="outlined"
      style={{ width: '80%', marginVertical: 10 }}
      keyboardType="phone-pad"
      value={mobileNumber}
      onChangeText={setMobileNumber}
      right={
        <TextInput.Icon
          name={() => <Text onPress={() => setShow(true)}>{countryCode || 'Select'}</Text>}
        />
      }
    />
 
</View>
      



    <TextInput
      label="Password"
      mode="outlined"
      style={{ width: '100%', marginVertical: 10 }}
      secureTextEntry
      value={password}
      onChangeText={setPassword}
    />
    <Button mode="contained" onPress={handleRegister} style={{ width: '100%', marginVertical: 10 }}>
      Register
    </Button>
    <Text style={{ marginVertical: 10 }}>
      Already registered?{' '}
      <Text style={{ color: 'blue' }} onPress={() => navigation.navigate('Login')}>
        Login
      </Text>
    </Text>
  </View>
  );
};

const styles = StyleSheet.create({
  selectedCountryText: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    height: 51,
    marginTop: 7,
    marginRight: 10,
    width:'100%'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default RegisterScreen;




const ContactinfoScreen = () => {
  const [accountHolderName, setAccountHolderName] = useState('');
  const navigation = useNavigation();
  
  const handleChooseAccount = () => {
    // Navigate to the "Home" screen or any other screen you want
    navigation.navigate('ChooseAccount');
  };
  return (
    <View  style={{backgroundColor: 'white',}}>
     


      

      <View style={{ padding: 16 }}>

      <Image
        source={{ uri: 'https://th.bing.com/th/id/R.fa0ca630a6a3de8e33e03a009e406acd?rik=MMtJ1mm73JsM6w&riu=http%3a%2f%2fclipart-library.com%2fimg%2f1905734.png&ehk=iv2%2fLMRQKA2W8JFWCwwq6BdYfKr2FmBAlFys22RmPI8%3d&risl=&pid=ImgRaw&r=0' }}
        style={styles.profilePicture}
      />
        

        <View style={{ flexDirection: 'row', alignItems: 'center',  justifyContent:'space-between',marginTop:20 }}>
              
        <TextInput
        
          value={accountHolderName}
          onChangeText={text => setAccountHolderName(text)}
          placeholder="Name"
          style={{
            height: 40,
            color:'white',
            marginTop: 8,
            paddingLeft: 8,
            backgroundColor: 'white',
          }}
        />
        <Text  style={{color:'#31A062'}}>Change</Text>
        </View>
         <View style={styles.underline} />

         <View style={{ flexDirection: 'row', alignItems: 'center',  justifyContent:'space-between', marginTop:25 }}>
              
              <TextInput
                value={accountHolderName}
                onChangeText={text => setAccountHolderName(text)}
                placeholder="Email"
                style={{
                  height: 40,
                  backgroundColor: 'white',
                  marginTop: 8,
                  paddingLeft: 8,
                }}
              />
              <Text  style={{color:'#31A062'}}>Change</Text>
              </View>
               <View style={styles.underline} />


               <View style={{ flexDirection: 'row', alignItems: 'center',  justifyContent:'space-between', marginTop:25 }}>
              
              <TextInput
                value={accountHolderName}
                onChangeText={text => setAccountHolderName(text)}
                placeholder="Phone Number"
                style={{
                  height: 40,
                  backgroundColor: 'white',
                  marginTop: 8,
                  paddingLeft: 8,
                }}
              />
              <Text  style={{color:'#31A062'}}>Change</Text>
              </View>
               <View style={styles.underline} />





               <View style={{ flexDirection: 'row', alignItems: 'center',  justifyContent:'space-between', marginTop:25 }}>
              
              <TextInput
                value={accountHolderName}
                onChangeText={text => setAccountHolderName(text)}
                placeholder="Branch "
                style={{
                  height: 40,
                  backgroundColor: 'white',
                  marginTop: 8,
                  paddingLeft: 8,
                }}
              />
              <Text  style={{color:'#31A062'}}>Change</Text>
              </View>
               <View style={styles.underline} />
               <View style={{ flexDirection: 'row', alignItems: 'center',  justifyContent:'space-between', marginTop:25 }}>
              
              <TextInput
                value={accountHolderName}
                onChangeText={text => setAccountHolderName(text)}
                placeholder="Bank Name"
                style={{
                  height: 40,
                  backgroundColor: 'white',
                  marginTop: 8,
                  paddingLeft: 8,
                }}
              />
              <Text  style={{color:'#31A062'}}>Change</Text>
              </View>
               <View style={styles.underline} />
      </View>



      <Button mode="contained" onPress={""}  contentStyle={{
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  }}
  style={{
    backgroundColor: '#31A062',
    width: 352,
    marginVertical: 10,
    marginTop: 15,
    alignSelf:'center'
  }}>
        Login
      </Button>
    </View>
  );
};




const checkUserCredits = async (navigateToPayment, navigateToMainScreen) => {
  try {
    // Retrieve userId from AsyncStorage
    const storedUserDetails = await AsyncStorage.getItem('userDetails');
    const accessToken = await AsyncStorage.getItem('accessToken');
    // Parse the stored JSON string to get the user details object
    const userDetails = JSON.parse(storedUserDetails);

    // Check if userDetails exists and has _id property
    if (!userDetails || !userDetails._id) {
      console.log('User details not found in AsyncStorage');
      return;
    }

    // Extract userId
    const userId = userDetails._id;

    // Make API request to check user credits
    const response = await fetch(`https://lottery-backend-tau.vercel.app/api/v1/user/get-credits/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        // Include any additional headers or tokens if needed
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log('User credits:', result.credits);
      const userCredits = result.credits;

      // Store the user credits in AsyncStorage
      await AsyncStorage.setItem('userCredits', userCredits.toString());

      console.log('new credits:', userCredits);
      
      // If credits are zero, navigate to the payment gateway
      if (result.credits === 0) {
        navigation.navigate('PaymentMethodPage');
      } else {
        navigation.navigate('MainScreen');
      }
    } else {
      console.error('Failed to fetch user credits');
    }
  } catch (error) {
    console.error('Error checking user credits:', error.message);
  }
};


const checkCreditsAndNavigate = async () => {
  try {
    // Retrieve userCredits from AsyncStorage
    const storedUserCredits = await AsyncStorage.getItem('userCredits');

    // Parse the string back to a number
    const userCredits = storedUserCredits 

    // Check if userCredits is equal to 0
    if (storedUserCredits === 0) {
      // If credits are 0, navigate to the PaymentMethodPage
      navigation.navigate('PaymentMethodPage');
    } else {
      // If credits are greater than 0, navigate to the MainScreen
      navigation.navigate('MainScreen');
    }
  } catch (error) {
    console.error('Error checking credits:', error);
    // Handle errors, e.g., show an error message or redirect to an error screen
  }
};

const fetchAndConsoleStoredCredits = async () => {
  try {
    // Retrieve userCredits from AsyncStorage
    const storedCredits = await AsyncStorage.getItem('credits');


    // Log the stored user credits
    console.log('Stored User credits checked succefull:', storedCredits);

    // If needed, you can parse it back to a number
    const userCredits = storedCredits ? parseInt(storedCredits) : 0;
    console.log('Parsed User credits (as number):', userCredits);

    // Conditionally navigate based on userCredits
    if (userCredits === 0) {
      // If userCredits is 0, navigate to MainScreen
      navigation.navigate('PaymentMethodPage');
    } else {
      // If userCredits is not 0, navigate to PaymentMethodPage
      navigation.navigate('MainScreen');
    }
  } catch (error) {
    console.error('Error fetching stored user credits:', error.message);
  }
};