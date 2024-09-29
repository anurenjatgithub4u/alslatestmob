

import React  ,{useEffect,useState,useCallback } from 'react';
import { View, Text, TextInput,StyleSheet ,TouchableOpacity ,ScrollView,ActivityIndicator,FlatList} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper'; 
import { FontAwesome5 } from '@expo/vector-icons'; // Make sure to import FontAwesome5 from the correct package
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from "expo-status-bar";
import { responsiveFontSize, responsiveHeight, responsiveScreenFontSize, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";


 // Make sure to import FontAwesome5 from the correct package

 const HelpScreen = () => {


  
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const handleCardPress = () => {
    // Navigate to the FAQ screen
    navigation.navigate('Faq');
  };

  const logout = async () => {
    try {
      // Replace 'YOUR_BACKEND_URL' with the actual URL of your backend server.
      const prod = "https://lottery-backend-tau.vercel.app/api/v1/auth/logout";
      const dev = "https://lottery-backend-dev.vercel.app/api/v1/auth/logout"

   
      const isStandaloneApp = Constants.appOwnership === 'expo';


      const baseURL = isStandaloneApp ? dev : prod
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      const accessToken = await AsyncStorage.getItem("accessToken");
      // Assuming you have the refreshToken stored in a variable.
      const userNumber = 0;
      // Make a POST request to the logout endpoint with the refreshToken in the request body.
      const response = await axios.post(
        baseURL,
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
  const handleLogout = () => {
    logout(navigation);
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchFaqs = async () => {
        try {
          const response = await fetch('https://lottery-backend-tau.vercel.app/api/v1/admin/get-faqs');
          const data = await response.json();
  
          console.log('API Response:', data);
  
          if (!response.ok) {
            throw new Error(`Failed to fetch FAQs: ${data.message}`);
          }
  
          setFaqs(data.message || []);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };
  
      fetchFaqs();
  
      return () => {
        // Cleanup if needed
      };
    }, [])
  );
  const navigateToNotificationScreen = () => {
   
  
    // Use navigation.navigate to navigate to the Notification screen
    navigation.navigate('Notification'); // Replace 'Notification' with the name of your Notification screen
  };

  const fetchFaqs = async () => {
    try {
      const response = await fetch('https://lottery-backend-tau.vercel.app/api/v1/admin/get-faqs');
      const data = await response.json();

      console.log('API Response:', data);

      if (!response.ok) {
        throw new Error(`Failed to fetch FAQs: ${data.message}`);
      }

      setFaqs(data.message || []);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSearch = useCallback(() => {
    // Filter faqs based on the searchQuery
    const filteredResults = faqs.filter(faq =>
      faq.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.paragraph.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    // Update UI with filtered results
    setFilteredFaqs(filteredResults);
  }, [faqs, searchQuery]);

  useEffect(() => {
    fetchFaqs();
  }, []);
  useEffect(() => {
    setFilteredFaqs(faqs);
  }, [faqs]);

  return (
    <View style={{ flex:1, padding: 16 ,paddingTop:"12%"}}>
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
      



  
      <Text style={{ fontSize: responsiveScreenFontSize(3.5), fontWeight: '700' ,marginLeft: "5%",}}>Help & FAQs</Text>
  
      <View style={styles.searchContainer}>
      <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          onSubmitEditing={handleSearch}
        />
      </View>
  
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (

        <ScrollView  style={{marginBottom:'15%',marginLeft:10}}>
        {filteredFaqs.map((faq) => (
          <TouchableOpacity key={faq._id} onPress={() => navigation.navigate('HelpDetail', { faqDetails: faq })}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.textStyle}>{faq.heading}</Text>
              <Text style={styles.textStyleTwo} numberOfLines={1}>{faq.paragraph}</Text>
              <View style={styles.underline} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
  )}
    </View>
  );
  
 
 };

const styles = StyleSheet.create({

 container: {
    flex: 1,
    justifyContent: 'flex-start', // Align items at the top
   
    paddingTop: '12%', 
  },
 
  cardContainer: {
    height: 150,
    backgroundColor: 'white',
    padding: 16,
    margin: 10,
    borderRadius: 10,
    elevation: 3, // Add elevation for a shadow effect (Android)
    shadowColor: '#000', // Add shadow properties for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  underline: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    width:'90%',
    alignSelf:'center',
    marginTop:10
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardHeaderText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardHeaderText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  topContainer: {
    flexDirection: 'row',
 
    justifyContent: 'flex-start',
    marginBottom: 20, // Adjust margin as needed
  },
  card: {
    width: '100%', // Set the width to 100%
    backgroundColor: 'white',
    elevation: 3, // Add elevation for a shadow effect (Android)
    shadowColor: '#000', // Add shadow properties for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height:150,
    marginTop: 50
  },


  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginStart:10
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

  searchContainer: {
    width: '90%', // Use a percentage for responsive width
    height: 41, // Use a percentage for responsive height
    marginBottom: '5%',
    marginTop: '10%',
    borderRadius: 20,
    borderWidth: 0.5,
    marginLeft: '5%',
   
    backgroundColor: 'white',
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  textContainer: {
    width: 261,
    height: 28,
    top: 10,
    left: 30,
    position: 'absolute',
    zIndex: 1, // Ensure the text is above other elements
  },
  textStyle: {
    color:'black',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
    letterSpacing: 0.8,
    textAlign: 'left',
    marginLeft: '5%', 
    marginTop: '5%'
  },
  textStyleTwo: {
    
    color:'black',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 28,
    letterSpacing: 0.8,
    textAlign: 'left',
    marginLeft:'5%',
    
   
  },
  
});
export default HelpScreen;
