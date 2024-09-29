import React, {useEffect,useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Title, Paragraph } from 'react-native-paper'; 
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './auth/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { logout } from './auth/logout';
import { StatusBar } from "expo-status-bar";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from "@react-navigation/native";

import { Alert } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Constants from 'expo-constants';
import { responsiveFontSize, responsiveHeight, responsiveScreenFontSize, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";

const ProfileScreen = () => {




  const [credits, setCredits] = useState(0);
  const { accessToken, setAccessToken } = useAuth();
  const navigation = useNavigation();
  const [userName, setUserName] = useState(null);
  const [userSince, setUserSince] = useState(null);



  const logout = async () => {
    try {
      // Replace 'YOUR_BACKEND_URL' with the actual URL of your backend server.
      const prod = "https://lottery-backend-tau.vercel.app/api/v1/auth/logout";
      const dev = "https://lottery-backend-dev.vercel.app/api/v1/auth/logout"

      const isProduction = Constants.executionEnvironment === 'standalone';

      const baseURLLogout = isProduction ? prod : dev
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      const accessToken = await AsyncStorage.getItem("accessToken");
      // Assuming you have the refreshToken stored in a variable.
      const userNumber = 0;
      // Make a POST request to the logout endpoint with the refreshToken in the request body.
      const response = await axios.post(
        prod,
        { refreshToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the logout was successful.
      if (response.status === 200) {
        console.log("Logged out successfully");
        navigation.navigate("ProfileLandingTesting");
        await AsyncStorage.setItem('userNumber', userNumber.toString());
      } else {
        console.error("Logout failed");
        // Handle logout failure, e.g., display an error message.
      }
    } catch (error) {
      console.error("Error during logout", error);
      // Handle the error, e.g., display an error message.
    }
  };
  const navigateToNotificationScreen = () => {
   
  
    // Use navigation.navigate to navigate to the Notification screen
    navigation.navigate('Notification'); // Replace 'Notification' with the name of your Notification screen
  };
  const showAlert = () => {
    Alert.alert(
      'Close Account',
      'Are you sure you want to close your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => handleDeleteUser(),
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeleteUser = async () => {
    const user = await AsyncStorage.getItem('userId');
    const userNumber = 0;
    const storedAccessToken = await AsyncStorage.getItem('accessToken');
    try {
      const prod = `https://lottery-backend-tau.vercel.app/api/v1/user/delete-all-user-data/${user}`;
      
  


      const dev = `https://lottery-backend-dev.vercel.app/api/v1/user/delete-all-user-data/${user}`;


      
      const isStandaloneApp = Constants.appOwnership === 'expo';


      const baseURL = isStandaloneApp ? dev : prod
  
      const authToken = 'your_auth_token'; // Replace with your actual authentication token
  
      const response = await axios.delete(baseURL, {
        headers: {
          Authorization: `Bearer ${storedAccessToken}`,
        },
      });
  
      if (response.status === 200) {
        Alert.alert('Success', 'User data deleted successfully');
        await AsyncStorage.setItem('userNumber', userNumber.toString());
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', 'Failed to delete user data');
      }
    } catch (error) {
      console.error('Error deleting user data:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  const formattedDate = (dateString) => {
    const options = { month: 'long', year: 'numeric' };
    const formatted = new Date(dateString).toLocaleDateString(undefined, options);
    return formatted;
  };


  const formattedUserSince = formattedDate(userSince);


  useFocusEffect(
    React.useCallback(() => {
      const fetchPersonalDetails = async () => {
        const userId = await AsyncStorage.getItem("userId");
        const prod = `https://lottery-backend-tau.vercel.app/api/v1/user/personal-details/${userId}`;
        const dev = `https://lottery-backend-dev.vercel.app/api/v1/user/personal-details/${userId}`;
        
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
  setUserSince(data.message.createdAt)
  setUserName(data.message.name);
  setCredits(data.message.credits);
  console.log("credits credits credits credits credits credits credits", data.message.name,data);
        } catch (error) {
          console.error("Error fetching personal details:", error.message);
          if (error.message.includes("401 - Unauthorized: Token expired")) {
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
  
  
 
  
 
return(
  
  <View style={{ flex:1, padding: 16 ,paddingTop:"12%",height:'100%'}}>
  

  <StatusBar backgroundColor={"transparent"} translucent />
  <View
  style={{
    flexDirection: "row",
    marginBottom: hp("1%"),
    justifyContent: "space-between",
    alignItems: "center",
    
   
  }}
>
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


        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <EvilIcons name="bell" size={30} style={styles.bell} color="black" onPress={navigateToNotificationScreen}/>
          <AntDesign
            name="logout"
            size={19}
            style={styles.logout}
            color="black"
            onPress={logout}
          />
          </View>
        </View>

<Text  style={{fontSize:responsiveScreenFontSize(3.5),fontWeight:'700',marginLeft:'5%'}}>Profile</Text>

    <View style={styles.profilePictureContainer}>
      <Image
        source={{ uri: 'https://th.bing.com/th/id/R.fa0ca630a6a3de8e33e03a009e406acd?rik=MMtJ1mm73JsM6w&riu=http%3a%2f%2fclipart-library.com%2fimg%2f1905734.png&ehk=iv2%2fLMRQKA2W8JFWCwwq6BdYfKr2FmBAlFys22RmPI8%3d&risl=&pid=ImgRaw&r=0' }}
        style={styles.profilePicture}
      />
    </View>

 
    <Text style={styles.userName}> {userName || 'Guest'}</Text>

    <Text style={styles.memberSince}>Member since {formattedUserSince}</Text>


    

    <Card style={styles.card}  onPress={() => navigation.navigate('ContactInfo')}>
  
      
     

    <View style={styles.personalInfoContainer}>

      
  <Ionicons name="person" size={wp(4)} color="#555" />
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <Paragraph style={{...styles.personalInfoText,flex:.9}}  >Personal Info</Paragraph>
    <TouchableOpacity  onPress={() => navigation.navigate('ContactInfo')}>
    <MaterialIcons name="arrow-forward-ios" size={wp(3)} color="black" />
    </TouchableOpacity>
  </View>
</View>


   
  </Card>





  <Card style={styles.card}  onPress={() => navigation.navigate('Redeem')} >



  
      
     

    <View style={styles.personalInfoContainer}>
    <FontAwesome name="bank" size={wp(4)} color="black" />
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <Paragraph style={{...styles.personalInfoText,flex:.9}}  >Bank Account </Paragraph>
    <TouchableOpacity  onPress={() => navigation.navigate('Redeem')}>
    <MaterialIcons name="arrow-forward-ios" size={wp(3)} color="black" />
    </TouchableOpacity>
  </View>
</View>


  


  </Card>


  <Card style={styles.card} onPress={() => navigation.navigate('PurchaseScreen')}>
   
      
     

    <View style={styles.personalInfoContainer}>
    <FontAwesome name="credit-card-alt" size={wp(4)} color="black" />
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <Paragraph style={{...styles.personalInfoText,flex:.9}}  >My Purchases</Paragraph>
    <TouchableOpacity  onPress={() => navigation.navigate('PurchaseScreen')}>
    <MaterialIcons name="arrow-forward-ios" size={wp(3)} color="black" />
    </TouchableOpacity>
  </View>
</View>


   
  </Card>


  <Card style={styles.card} onPress={() => navigation.navigate('RedeemAmountAccessPage')} >
  
      
     

    <View style={styles.personalInfoContainer}>
    <FontAwesome name="money" size={wp(4)} color="black" />

  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <Paragraph style={{...styles.personalInfoText,flex:.9}}  >Redeem</Paragraph>
    <TouchableOpacity  onPress={() => navigation.navigate('RedeemAmountAccessPage')}>
    <MaterialIcons name="arrow-forward-ios" size={wp(3)} color="black" />
    </TouchableOpacity>
  </View>
</View>


  </Card>


  <Card style={styles.card}  onPress={() => navigation.navigate('ForgotPasswordTwo')}>
   
      
     

    <View style={styles.personalInfoContainer}>
    <Ionicons name="settings" size={wp(4)} color="black" />
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <Paragraph style={{...styles.personalInfoText,flex:.9}}  >Password</Paragraph>
    <TouchableOpacity  onPress={() => navigation.navigate('ForgotPasswordTwo')}>
    <MaterialIcons name="arrow-forward-ios" size={wp(3)} color="black" />
    </TouchableOpacity>
  </View>
</View>


   
  </Card>



  <Text onPress={ showAlert} style={{alignSelf:'center', color:'#FE555D',marginTop:responsiveHeight(3)}}>Close Account</Text>

  <Text onPress={()=>  navigation.navigate('TermsAndConditions')} style={{alignSelf:'center', marginTop:responsiveHeight(1)}}>Privacy Policy</Text>


  </View>
)

}
  
  
;

const styles = StyleSheet.create({

  card: {
    width: '95%', // Set width to full
    margin: 0, // Remove default margin
    marginTop: verticalScale(6),
    alignSelf: 'center',
    height: responsiveHeight(7.5), // Set responsive height
    justifyContent: 'center', // Center content vertically
  },
  personalInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft:'2%'
  },
  infoTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0.9,
  },

  cardTwo: {
    width: '95%', // Set width to full
    margin: 0,     // Remove default margin
    marginTop: 10,
  },
  cardThree: {
    width: '95%', // Set width to full
    margin: 0,     // Remove default margin
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align items at the top
   
    paddingTop: '12%', 
  },
  profilePicture: {
    width: scale(85),
    height: scale(85),
    borderRadius: scale(50),
  },
  profilePictureContainer: {
    marginBottom: verticalScale(3),
    alignSelf: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf:'center'
  },
  memberSince: {
    fontSize: 16,
    color: '#555',
    alignSelf:'center',
    marginBottom:verticalScale(20)
  },

  bell: {
    width: 24,
    height: 24,
    top: 1,
    marginRight: wp("3%"),
    marginLeft: wp("2%"),
    
  },
  logout: {
    marginTop: 5,
    width: 24,
    height: 24,
    top: 1,
    marginLeft: wp("1%")
    
   
  },

  personalInfoText: {
    fontSize: wp(4),
    color: '#555',
    marginLeft: '8%',
    alignSelf:'flex-end'
  },
 
  
});


export default ProfileScreen;
