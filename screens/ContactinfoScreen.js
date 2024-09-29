


import { StyleSheet, Image,Text, View,TouchableOpacity} from 'react-native'
import React ,{useState,useEffect}from 'react'
import { TextInput ,Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Import Axios library
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { responsiveFontSize, responsiveHeight ,responsiveWidth} from "react-native-responsive-dimensions";
import Constants from 'expo-constants';


const ContactinfoScreen = () => {
  const [accountHolderName, setAccountHolderName] = useState(' ');
  const [accountHolderEmail, setAccountHolderEmail] = useState('');
  const [accountHolderPhone, setAccountHolderPhone] = useState('');
  const navigation = useNavigation();
  

  const [mode, setMode] = useState('done');
  const [modeEmail, setModeEmail] = useState('done');
  const [modePhone, setModePhone] = useState('done');
  const [personalDetails, setPersonalDetails] = useState(null);



  const handleModeChange = () => {
    if (mode === 'done') {
      // Perform any actions needed when clicking "Done"
      // For example, you might want to save the updated value
      // You can add your logic here
    
      setMode('edit');
    } else {
      setMode('done');
      updateDetails();
    }
  };




  const handleModeChangeEmail = () => {
    if (modeEmail === 'done') {
      setModeEmail('edit');
    } else {
      // Perform any actions needed when clicking "Done"
      // For example, you might want to save the updated value
      // You can add your logic here
      setModeEmail('done');
      updateEmail();
    }
  };

  const handleModeChangePhone = () => {
    if (modePhone=== 'done') {
      setModePhone('edit');
    } else {
      // Perform any actions needed when clicking "Done"
      // For example, you might want to save the updated value
      // You can add your logic here
      setModePhone('done');
      updateMobile();
    }
  };




const updateDetails = async () => {
  console.log("current email" , accountHolderEmail)
  try {
    const userId = await AsyncStorage.getItem('userId');
    const prod = `https://lottery-backend-tau.vercel.app/api/v1/user/personal-details/${userId}`;
    
    const dev = `https://lottery-backend-dev.vercel.app/api/v1/user/personal-details/${userId}`;
    const isStandaloneApp = Constants.appOwnership === 'expo';


    const baseURL = isStandaloneApp ? dev : prod
    const storedAccessToken = await AsyncStorage.getItem('accessToken');
    await AsyncStorage.setItem('userEmail', accountHolderEmail);
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${storedAccessToken}`,
      },
      body: JSON.stringify({ email:"", mobileNumber:"", name:accountHolderName ,currentEmail:accountHolderEmail}),
    });

    const responseData = await response.json();
    //const countryCode = "+917356380659"
    if (response.ok) {
      // Check the response data to determine success or OTP sent
      if (responseData.message === 'Name updated') {
        console.log('Success', 'Name updated successfully');
      } else {
        console.log('Success', 'OTP sent to new email and/or mobile number');
        console.log("updated", responseData.message)
      

       
      }
    } else {
      console.log('Error', `Error: ${responseData.message}`);

      alert(responseData.message)
    }
  } catch (error) {
    console.error('Error updating details:', error);
    console.log('Error', 'An error occurred while updating details');
  }
};


const updateEmail = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    const prod = `https://lottery-backend-tau.vercel.app/api/v1/user/personal-details/${userId}`;
    
    const dev = `https://lottery-backend-dev.vercel.app/api/v1/user/personal-details/${userId}`;
    const isStandaloneApp = Constants.appOwnership === 'expo';


    const baseURL = isStandaloneApp ? dev : prod
  // Replace with your actual API endpoint
    const storedAccessToken = await AsyncStorage.getItem('accessToken');
    await AsyncStorage.setItem('userEmail', accountHolderEmail);
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${storedAccessToken}`,
      },
      body: JSON.stringify({ email:accountHolderEmail, mobileNumber:"", name:"",currentEmail:accountHolderEmail }),
    });

    const responseData = await response.json();

    if (response.ok) {
      // Check the response data to determine success or OTP sent
      if (responseData.data.message === 200) {
        console.log('Success', 'Name updated successfully');
      } else {
        console.log('Success', 'OTP sent to new email and/or mobile number');
        navigation.navigate('PersonalInfoOtp', {
          email : accountHolderEmail,
          name : accountHolderName,
          
          mobileNumber: accountHolderPhone
        });
      }
    } else {
      console.log('Error', `Error: ${responseData.message}`);
      alert(responseData.message)
    }
  } catch (error) {
    console.error('Error updating details:', error);
    console.log('Error', 'An error occurred while updating details');
  }
};

const updateMobile = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    const prod = `https://lottery-backend-tau.vercel.app/api/v1/user/personal-details/${userId}`;
    
    const dev = `https://lottery-backend-dev.vercel.app/api/v1/user/personal-details/${userId}`;
    const isStandaloneApp = Constants.appOwnership === 'expo';


    const baseURL = isStandaloneApp ? dev : prod
    const storedAccessToken = await AsyncStorage.getItem('accessToken');
    await AsyncStorage.setItem('userEmail', accountHolderEmail);
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${storedAccessToken}`,
      },
      body: JSON.stringify({ email:"", mobileNumber:accountHolderPhone, name:"" ,currentEmail:accountHolderEmail}),
    });

    const responseData = await response.json();

    if (response.ok) {
      // Check the response data to determine success or OTP sent
      if (responseData.data.message) {
        console.log('Success', 'Name updated successfully');
      } else {
        console.log('Success', 'OTP sent to new email and/or mobile number');
        navigation.navigate('PersonalInfoOtp', {
          email : accountHolderEmail,
          name : accountHolderName,
          
          mobileNumber: accountHolderPhone
        });
      }
    } else {
      console.log('Error', `Error: ${responseData.message}`);
      alert(responseData.message)
    }
  } catch (error) {
    console.error('Error updating details:', error);
    console.log('Error', 'An error occurred while updating details');
  }
};

useEffect(() => {
  const fetchPersonalDetails = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const prod = `https://lottery-backend-tau.vercel.app/api/v1/user/personal-details/${userId}`;

    const dev = `https://lottery-backend-dev.vercel.app/api/v1/user/personal-details/${userId}`;

    const isStandaloneApp = Constants.appOwnership === 'expo';


    const baseURL = isStandaloneApp ? dev : prod
    const storedAccessToken = await AsyncStorage.getItem('accessToken');
    
    try {
      const response = await fetch(baseURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedAccessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      setAccountHolderName(data.message.name);
      setAccountHolderEmail(data.message.email);
      setAccountHolderPhone(data.message.mobileNumber);
      console.log("credits",data.message.credits);
      // Additional fields can be set here based on your API response
    } catch (error) {
      console.error('Error fetching personal details:', error.message);
    }
  };

  fetchPersonalDetails();
}, []); 

  return (
    <View  style={{backgroundColor: 'white',color:'white',height:900,paddingLeft:16,paddingRight:16}}>
     
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
        <Text style={{ fontWeight: '700', fontSize: 17,textAlign: 'center' ,flex: 1,}}>Personal Info</Text>
      </View>

      


      

     


      

      <View style={{ paddingLeft: 16  ,backgroundColor: 'white',paddingRight:16,marginTop:'13%' }}>

   
        
      <Image
        source={{ uri: 'https://th.bing.com/th/id/R.fa0ca630a6a3de8e33e03a009e406acd?rik=MMtJ1mm73JsM6w&riu=http%3a%2f%2fclipart-library.com%2fimg%2f1905734.png&ehk=iv2%2fLMRQKA2W8JFWCwwq6BdYfKr2FmBAlFys22RmPI8%3d&risl=&pid=ImgRaw&r=0' }}
        style={styles.profilePicture}
      />
       <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 25, borderBottomWidth: 1, borderBottomColor: 'gray' }}>
  <TextInput
    value={accountHolderName}
    onChangeText={text => setAccountHolderName(text)}
    placeholder="Name"
    style={{
      height: 40,
      width: '85%',
      color: 'black', // Change the text color to your preference
      marginTop: 8,
      paddingLeft: 8,
      backgroundColor: 'white',
      fontSize: 16,
      borderRadius: 8,
    }}
    editable={mode === 'edit'}
  />
  <TouchableOpacity onPress={handleModeChange}>
    <Text style={{ color: '#31A062' }}>{mode === 'edit' ? 'Done' : 'Change'}</Text>
  </TouchableOpacity>
</View>


        
      

         <View style={{ flexDirection: 'row', alignItems: 'center',  justifyContent:'space-between', marginTop:25 }}>
              
              <TextInput
                value={accountHolderEmail}
                onChangeText={text => setAccountHolderEmail(text)}
                placeholder="Email"
                style={{
                  height: 40,
                  width:'85%',
                  color: 'white',
                  marginTop: 8,
                  paddingLeft: 8,
                  backgroundColor: 'white',
                  fontSize: 16, // Adjust the font size to your preference
                  lineHeight: 20, // Adjust the line height to match the font size
                }}
                editable={modeEmail === 'edit'}
              />
                <TouchableOpacity onPress={handleModeChangeEmail}>
        <Text style={{ color: '#31A062' }}>{modeEmail === 'edit' ? 'Done' : 'Change'}</Text>
      </TouchableOpacity>
              </View>
               <View style={styles.underline} />


               <View style={{ flexDirection: 'row', alignItems: 'center',  justifyContent:'space-between', marginTop:25 }}>
              
              <TextInput
                value={accountHolderPhone}
                onChangeText={text => setAccountHolderPhone(text)}
                placeholder="Phone"
                style={{
                  height: 40,
                  width:'85%',
                  color: 'white',
                  marginTop: 8,
                  paddingLeft: 8,
                  backgroundColor: 'white',
                  fontSize: 16, // Adjust the font size to your preference
                  lineHeight: 20, // Adjust the line height to match the font size
                }}
                editable={modePhone === 'edit'}
              />
                <TouchableOpacity onPress={handleModeChangePhone}>
        <Text style={{ color: '#31A062' }}>{modePhone === 'edit' ? 'Done' : 'Change'}</Text>
      </TouchableOpacity>
              </View>
               <View style={styles.underline} />




      </View>




    </View>
  );
};


const styles =  StyleSheet.create({
  container: {
    marginTop: 8,
  },
  textInput: {
    height: 40,
    paddingLeft: 8,
  },
  underline: {
    borderBottomColor: 'black',
    borderBottomWidth: .9,
  },
  
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf:'center',
   
  },
  forgotpasswordText: {
    // Add this line to align text to the left
    width: 354,
    minHeight: hp("7%"),

    marginLeft: "5%",

    fontSize: 34, // Adjust the font size as needed
    fontWeight: "bold",
  },
});

export default ContactinfoScreen