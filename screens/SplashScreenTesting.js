import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SplashScreenTesting = () => {
  return (
    <View>
      <Text>SplashScreenTesting</Text>
    </View>
  )
}

export default SplashScreenTesting

const styles = StyleSheet.create({})

// "extra": {
//   "eas": {
//     "projectId": "e99bab02-f105-4664-955b-1a5a2f711d54"
//   }
// }






// import { useNavigation } from '@react-navigation/native';
// import   React  , {useEffect,useState} from 'react';
// import { View ,StyleSheet,TouchableHighlight,Dimensions} from 'react-native';
// import { Card, Title, Text, Button } from 'react-native-paper';
// import axios from 'axios';
// import { MaterialIcons } from '@expo/vector-icons';
// import {  TouchableOpacity } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { BackHandler } from 'react-native';
// import { LinearGradient } from "expo-linear-gradient";
// import { useFocusEffect } from "@react-navigation/native";
// import { Alert } from 'react-native';
// import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";



// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import { StatusBar } from "expo-status-bar";


// const { width, height } = Dimensions.get("window");
// const SCREEN_WIDTH = width < height ? width : height;

// const MyCardComponent = ({route }) => {

// const areaType = route.params;

//   const navigation = useNavigation();
//   const [userCredits, setUserCredits] = useState(0);
//   const [pressed, setPressed] = useState(false);
//   const [pressedLebelOne, setPressedLevelOne] = useState(false);
//   const [pressedNational, setPressedNational] = useState(false);
//   const [selectedLevel, setSelectedLevel] = useState(null);
//   const [pressedleveltwo, setPressedleveltwo] = useState(false);
//   const [pressedlevelthree, setPressedlevelthree] = useState(false);
//   const [areaValue, setAreaValue] = useState(0);
//   const [levelValue, setLevelValue] = useState(0);
//   const [commonLevel,setCommonLevel] = useState(0);
//   const [commonArea,setCommonArea] = useState(0);
//   const [areaText, setAreaText] = useState('');
//   const [credits, setCredits] = useState(0);
//   const [winningAmt, setwinningAmt] = useState("");

 

//   const [CountrySymbol, setCountrySymbol] = useState([]);
//   const [ContinentSymbol, setContinentSymbol] = useState([]);

//   const [previousWinningNumbers, setPreviousWinningNumbers] = useState([]);
//   const [countryName, setcountryName] = useState([]);
//   const [ContinentWinningAmount, setContinentWinningAmount] = useState([]);
//   const [CountryWinningAmount, setCountryWinningAmount] = useState([]);


//   const [creditsMain, setcreditsMain] = useState(false);


//   const [creditsForContinentLevelOne, setcreditsForContinentLevelOne] = useState("");
//   const [creditsForContinentLevelTwo, setcreditsForContinentLevelTwo] = useState("");
//   const [creditsForContinentLevelThree, setcreditsForContinentLevelThree] = useState("");
  
//   const [dollar, setDollar] = useState("");
//   const [playingCredits, setPlayingCredits] = useState("");
  
//   const [creditsForCountryLevelOne, setcreditsForCountryLevelOne] = useState("");
//   const [creditsForCountryLevelTwo, setcreditsForCountryLevelTwo] = useState("");
//   const [creditsForCountryLevelThree, setcreditsForCountryLevelThree] = useState("");
  
//   const [previousWinningContinentNumbers, setPreviousWinningContinentNumbers] = useState([]);

//   const handleButtonPress = () => {
//     navigation.navigate('ChooseLevel');
//   };
//   const handleMainScreen = () => {
//     navigation.navigate('ChooseLevel');
//   };

//   const fetchPreviousGameWinningNumbers = async () => {
//     const storedAccessToken = await AsyncStorage.getItem("accessToken");
//     const userId = await AsyncStorage.getItem("userId");

//     const url = `https://lottery-backend-tau.vercel.app/api/v1/user/game/get-previous-game-winning-numbers/${userId}`;

//     try {
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${storedAccessToken}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error(
//         "Error fetching previous game winning numbers:",
//         error.message
//       );
//       throw new Error(
//         "Something went wrong while fetching previous game winning numbers"
//       );
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchPreviousGameWinningNumbers();
//         setPreviousWinningNumbers(data.message.country || []); 
//         setPreviousWinningContinentNumbers(data.message.continent || [])
//         setcountryName(data.message.countryName);
//         setContinentWinningAmount(data.message.ContinentWinningAmount);
//         setCountryWinningAmount(data.message.CountryWinningAmount)
//         setCountrySymbol(data.message.countrySymbol)
//         setContinentSymbol(data.message.ContinentCurrencySymbol)

//         setcreditsForContinentLevelOne(data.message.creditsForContinentLevelOne)
//         setcreditsForContinentLevelTwo(data.message.creditsForContinentLevelTwo)
//         setcreditsForContinentLevelThree(data.message.creditsForContinentLevelThree)

//         setcreditsForCountryLevelOne(data.message.creditsForCountryLevelOne)
//         setcreditsForCountryLevelTwo(data.message.creditsForCountryLevelTwo)
//         setcreditsForCountryLevelThree(data.message.creditsForCountryLevelThree)
//         console.log("country winning numbers country winning numbers  country winning numbers country winning numbers",data.message )// Assuming "country" is an array
//       } catch (error) {
//         console.error(error.message);
//         // Handle the error
//       }
//     };

//     fetchData(); // Invoke the fetchData function when the component mounts
//   }, []);


//   useFocusEffect(
//     React.useCallback(() => {
//       const fetchPersonalDetails = async () => {
//         const userId = await AsyncStorage.getItem("userId");
//         const apiUrl = `https://lottery-backend-tau.vercel.app/api/v1/user/personal-details/${userId}`;
//         const storedAccessToken = await AsyncStorage.getItem("accessToken");

//         try {
//           const response = await fetch(apiUrl, {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${storedAccessToken}`,
//             },
//           });

//           if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(`${response.status} - ${errorData.message}`);
//           }

//           const data = await response.json();
//           setCredits(data.message.credits);
//           console.log("credits credits credits credits credits credits credits", data.message.credits);
//           // Additional fields can be set here based on your API response
//         } catch (error) {
//           console.error("Error fetching personal details:", error.message);
//         }
//       };

//       fetchPersonalDetails();
//     }, []) // Empty dependency array means this effect will only run once when the component mounts
//   );


//   useEffect(() => {
//     const fetchCreditss = async () => {
//       try {
//         // Retrieve areaValue and levelValue from AsyncStorage
//         const areaValue = await AsyncStorage.getItem("area");
//         const levelValue = await AsyncStorage.getItem("level");

//         // Set the areaText based on the areaValue
//         let fetchedCredit = "";

//         if (areaValue === "1") {
         

//           if(levelValue === "1"){
//             fetchedCredit  = creditsForContinentLevelOne;
//           }else if(levelValue === "2"){
//             fetchedCredit  = creditsForContinentLevelTwo;
//           }else{
//             fetchedCredit  = creditsForContinentLevelThree
//           }



//         } else if (areaValue === "2") {
//           if(levelValue === "1"){
//             fetchedCredit  = creditsForCountryLevelOne;
//           }else if(levelValue === "2"){
//             fetchedCredit  = creditsForCountryLevelTwo;
//           }else{
//             fetchedCredit  = creditsForCountryLevelThree;
//           }
//         } 

//         // Update state variables
//         setcreditsMain(fetchedCredit);
//       } catch (error) {
//         console.error("Error fetching data from AsyncStorage:", error.message);
//       }
//     };

//     // Call the fetchData function when the component mounts
//     fetchCreditss();
//   }, []);

//   useEffect(() => {
//     // Add event listener for hardware back button press
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
//       // Handle back button press
//       // Here, you can add your logic to close the app
//       // For example, you might want to show an exit confirmation dialog
//       // If the screen is the Login screen, you can close the app
//       if (navigation.isFocused()) {
//         // Close the app (exit)
//         navigation.navigate("Home")
//         return true; // Prevent default behavior (exit the app)
//       }

//       // If it's not the Login screen, let the default back button behavior occur
//       return false;
//     });

//     // Clean up the event listener on component unmount
//     return () => backHandler.remove();
//   }, [navigation]);

//   const checkCreditsAndNavigate =  async () => {

//     console.log("last winning ...." , winningAmt)
   
//     // Replace 0 with the actual condition to check if credits are 0
//     if (credits === 0) {
//       Alert.alert(
//         'Insufficient Credits',
//         'You don\'t have enough credits. Please add credits to continue.',
//         [{ text: 'OK', onPress: () => navigation.navigate("PaymentMethodPage") }]
//       );
//     } else {
//       // Navigate to ALScreen (replace 'ALScreen' with your actual screen name)
//       try {
//         // Retrieve 'area' and 'level' values from AsyncStorage
//         const areaValue = await AsyncStorage.getItem('area');
//         const levelValue = await AsyncStorage.getItem('level');
       
//         // Check the conditions and navigate accordingly
//         if (areaValue === '1' && levelValue === '1') {
        
//           navigation.navigate('Play', { countryName,CountrySymbol,creditsForContinentLevelOne,creditsForContinentLevelTwo,
//             creditsForContinentLevelThree,creditsForCountryLevelOne,creditsForCountryLevelTwo,creditsForCountryLevelThree,ContinentWinningAmount,CountryWinningAmount });
//         } else if(areaValue === '1' && levelValue === '2') {
//           navigation.navigate('Play', { countryName,CountrySymbol,creditsForContinentLevelOne,creditsForContinentLevelTwo,
//             creditsForContinentLevelThree,creditsForCountryLevelOne,creditsForCountryLevelTwo,creditsForCountryLevelThree ,ContinentWinningAmount,CountryWinningAmount});
//         }else if(areaValue === '1' && levelValue === '3') {
//           navigation.navigate('Play', { countryName,CountrySymbol,creditsForContinentLevelOne,creditsForContinentLevelTwo,
//             creditsForContinentLevelThree,creditsForCountryLevelOne,creditsForCountryLevelTwo,creditsForCountryLevelThree ,ContinentWinningAmount,CountryWinningAmount});
//         }else if(areaValue === '2' && levelValue === '1') {
//           navigation.navigate('Play', { countryName,CountrySymbol,creditsForContinentLevelOne,creditsForContinentLevelTwo,
//             creditsForContinentLevelThree,creditsForCountryLevelOne,creditsForCountryLevelTwo,creditsForCountryLevelThree,ContinentWinningAmount ,CountryWinningAmount});
//         }else if(areaValue === '2' && levelValue === '2') {
//           navigation.navigate('Play', { countryName,CountrySymbol,creditsForContinentLevelOne,creditsForContinentLevelTwo,
//             creditsForContinentLevelThree,creditsForCountryLevelOne,creditsForCountryLevelTwo,creditsForCountryLevelThree ,ContinentWinningAmount,CountryWinningAmount});
//         }else if(areaValue === '2' && levelValue === '3') {
//           navigation.navigate('Play', { countryName,CountrySymbol,creditsForContinentLevelOne,creditsForContinentLevelTwo,
//             creditsForContinentLevelThree,creditsForCountryLevelOne,creditsForCountryLevelTwo,creditsForCountryLevelThree , ContinentWinningAmount,CountryWinningAmount});
//         }
  
//         console.log("testing area", areaValue)
//         console.log("testing level", levelValue)
//       } catch (error) {
//         console.error('Error checking conditions:', error.message);
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchDataWinnigAmt = async () => {

//       console.log("winning Amt fetched",winningAmt)
//       try {
//         // Retrieve areaValue and levelValue from AsyncStorage
//         const areaValue = await AsyncStorage.getItem("area");
//         const levelValue = await AsyncStorage.getItem("level");
    
//         // Set the areaText based on the areaValue
//         let winningAmount = "";

//         if (areaValue === "1") {
//           winningAmount = ContinentWinningAmount;
//         } else if (areaValue === "2") {
//           winningAmount = CountryWinningAmount;
//         } else {
//           // Handle other area values if needed
//         }

//         // Update state variables
//         setwinningAmt(winningAmount);
//       } catch (error) {
//         console.error("Error fetching data from AsyncStorage:", error.message);
//       }
//     };

//     // Call the fetchData function when the component mounts
//     fetchDataWinnigAmt();
//   }, []);


//   const checking = async() => {
//     console.log("area ?....." ,commonArea)
//     console.log("credits ?....." ,creditsForContinentLevelOne)

//   }
  
//   const handlePress = async () => {
//     if (!pressed) {
//       // Store area value in AsyncStorage as 1 only on the first click
//       await AsyncStorage.setItem('area', '1');
//        // Update commonArea to 1 on the first click
//     }
//     setCommonArea(1);
//     setDollar(ContinentWinningAmount)
//     setPressed(!pressed);
//     console.log("area is testing......", commonArea);
// };
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       // Fetch the value of 'area' from AsyncStorage
//       const areaValue = await AsyncStorage.getItem('area');

//       // Update the state with the fetched value
//       setCommonArea(parseInt(areaValue) || 0);
//     } catch (error) {
//       console.error('Error fetching value for "area":', error.message);
//     }
//   };

//   // Call the fetchData function when the component mounts
//   fetchData();
// }, []);


// // Call handlePress wherever you need to trigger the functionality

  
  
//   const handlePressLevelOne = async () => {
//     setPressedLevelOne(!pressedLebelOne);
  
//     if (!pressedLebelOne) {
//       // Store level value in AsyncStorage as 1 when Level 1 button is clicked
//       await AsyncStorage.setItem('level', '1');
//     }
//     setCommonLevel(1);

//     if(commonArea === 2){

//       setPlayingCredits(creditsForCountryLevelOne)
//     }else if(commonArea === 1) {
//       setPlayingCredits(creditsForContinentLevelOne)
//     }
    
//   };
  
//   const handlePressNational = async () => {
//     setPressedNational(!pressedNational);
  
//     if (!pressedNational) {
//       // Store area value in AsyncStorage as 2 when National button is clicked
//       await AsyncStorage.setItem('area', '2');
//     }
//     setDollar(CountryWinningAmount)
//     setPressed(!pressed);
//     console.log("ares is testing......",commonArea)
//     setCommonArea(2);
//   };
  
//   const handlePressLevelTwo = async () => {
//     setPressedleveltwo(!pressedleveltwo);
//     setCommonLevel(commonLevel==1)
//     if (!pressedleveltwo) {
//       // Store level value in AsyncStorage as 2 when Level 2 button is clicked
//       await AsyncStorage.setItem('level', '2');
//       const areaValue = await AsyncStorage.getItem('area');

//       console.log("level  value ",areaValue)
//     }

//     if(commonArea === 2){

//       setPlayingCredits(creditsForCountryLevelTwo)
//     }else if(commonArea === 1) {
//       setPlayingCredits(creditsForContinentLevelTwo)
//     }
//     setCommonLevel(2);
//   };
  
//   const handlePressLevelThree = async () => {
//     setPressedlevelthree(!pressedlevelthree);
    
//     if (!pressedlevelthree) {
//       // Store level value in AsyncStorage as 3 when Level 3 button is clicked
//       await AsyncStorage.setItem('level', '3');
//     }

//     if(commonArea === 2){

//       setPlayingCredits(creditsForCountryLevelThree)
//     }else if(commonArea === 1) {
//       setPlayingCredits(creditsForContinentLevelThree)
//     }
//     setCommonLevel(3);
//   };
  
//   const checkUserIdAndReference = async () => {
//     try {
//       // Retrieve userId and accessToken from AsyncStorage
//       const storedUserDetails = await AsyncStorage.getItem('userDetails');
//       const accessToken = await AsyncStorage.getItem('accessToken');
  
//       // Parse the stored JSON string to get the user details object
//       const userDetails = JSON.parse(storedUserDetails);
  
//       // Check if userDetails exists and has _id property
//       if (!userDetails || !userDetails._id) {
//         console.log('User details not found in AsyncStorage');
//         return;
//       }
  
//       // Extract userId
//       const userId = userDetails._id;
//        console.log("id",userId)
//        console.log("token",accessToken)
//       // Make API request to check user details
   
  
     
//     } catch (error) {
//       console.error('Error checking user details:', error.message);
//     }
//   };
  

//   const checkCondition = async () => {



   
//   };


//   function interpolateColor(color1, color2, factor) {
//     const hex = (c) => {
//       const hex = c.toString(16);
//       return hex.length === 1 ? '0' + hex : hex;
//     };
  
//     const r1 = parseInt(color1.slice(1, 3), 16);
//     const g1 = parseInt(color1.slice(3, 5), 16);
//     const b1 = parseInt(color1.slice(5, 7), 16);
  
//     const r2 = parseInt(color2.slice(1, 3), 16);
//     const g2 = parseInt(color2.slice(3, 5), 16);
//     const b2 = parseInt(color2.slice(5, 7), 16);
  
//     const r = Math.round(r1 + (r2 - r1) * factor);
//     const g = Math.round(g1 + (g2 - g1) * factor);
//     const b = Math.round(b1 + (b2 - b1) * factor);
  
//     return `#${hex(r)}${hex(g)}${hex(b)}`;
//   }
  
//   const color1 = "#F0C735";
//   const color2 = "#D98F39";
//   const midpointColor = interpolateColor(color1, color2, 0.5);
  
  
  
  
  


//   return (

//     <View  style={{  flex: 1,paddingLeft:16,paddingRight:16 ,paddingTop:"12%",height:hp(100)}}  >

// <StatusBar backgroundColor={"transparent"} translucent />

// <TouchableOpacity onPress={() => navigation.navigate('Hom')}>
//     <View style={{ alignItems: 'flex-start', alignSelf: 'flex-start' }}>
//       <MaterialIcons
//         name="keyboard-arrow-left"
//         size={35}
//         color="black"
//         style={{ marginLeft: 10 }}
//       />
//     </View>
//   </TouchableOpacity>
   


//      <Text  style={styles.welcomeText}>Choose game </Text>
     

//      <TouchableHighlight
//         style={[
//           styles.buttonContainer,
//           { backgroundColor: commonArea==1 ? '#31A062' : 'rgba(49, 160, 98, 0.33)' },
//         ]}
//         onPress={ handlePress}
//         underlayColor="#31A062" // This sets the color when the button is pressed
//       >
//         <Text style={[styles.buttonText,{color:commonArea==1 ? 'white' : 'black'}]}>
//           Continental
//           {'\n'}
//           <Text style={[ styles.buttonTextSmallTwo,{color:commonArea==1 ? 'white' : 'black'} ] }>
//           Play for your continent : {ContinentSymbol}{ContinentWinningAmount}
//     </Text>
//         </Text>
//       </TouchableHighlight>


     
//       <TouchableHighlight
//         style={[
//           styles.buttonContainer,
//           { backgroundColor: commonArea === 2 || areaType === 2 ? '#31A062' : 'rgba(49, 160, 98, 0.33)' },
//         ]}
//         onPress={handlePressNational}
//         underlayColor="#31A062" // This sets the color when the button is pressed
//       >
//         <Text style={[styles.buttonText, {color:commonArea==2 ? 'white' : 'black'}]}>
//           National
//           {'\n'}
//           <Text style={[styles.buttonTextSmallTwo, {color:commonArea==2 ? 'white' : 'black'}]}>
//       Play for your country : {CountrySymbol}{CountryWinningAmount}
//     </Text>
//         </Text>
//       </TouchableHighlight>

//       <Text  style={styles.chooseLevel}>Choose Level </Text>


//       <TouchableHighlight
//   style={[
//     styles.buttonContainer,
//     { backgroundColor: commonLevel==1? '#31A062' : 'rgba(49, 160, 98, 0.33)' },
//   ]}
//   onPress={handlePressLevelOne}
//   underlayColor="#31A062"
// >
//   <Text style={[styles.buttonText, { color: commonLevel==1 ? 'white' : 'black' }]}>
//     Level 1
//     {'\n'}
//     <Text style={[styles.buttonTextSmallTwo, { color: commonLevel==1 ? 'white' : 'black' }]}>
//       Play for 25% of JackPot
//     </Text>
//   </Text>
// </TouchableHighlight>

      
     


//       <TouchableHighlight
//         style={[
//           styles.buttonContainer,
//           { backgroundColor: commonLevel==2 ? '#31A062' : 'rgba(49, 160, 98, 0.33)' },
//         ]}
//         onPress={handlePressLevelTwo}
//         underlayColor="#31A062" // This sets the color when the button is pressed
//       >
//         <Text style={[styles.buttonText, { color: commonLevel==2 ? 'white' : 'black' }]}>
//           Level 2
//           {'\n'}
//           <Text style={[styles.buttonTextSmallTwo, { color: commonLevel==2 ? 'white' : 'black' }]}>
//           Play for 50% of JackPot
//     </Text>
//         </Text>
//       </TouchableHighlight>
      
  
 
//       <TouchableHighlight
//         style={[
//           styles.buttonContainer,
//           { backgroundColor: commonLevel==3 ? '#31A062' : 'rgba(49, 160, 98, 0.33)' },
//         ]}
//         onPress={handlePressLevelThree}
//         underlayColor="#31A062" // This sets the color when the button is pressed
//       >
//         <Text style={[styles.buttonText, { color: commonLevel==3 ? 'white' : 'black' }]}>
//           Level 3
//           {'\n'}
//           <Text style={[styles.buttonTextLevelThree, { color: commonLevel==3 ? 'white' : 'black' }]}>
//           Play for the JackPot
//     </Text>
//         </Text>
//       </TouchableHighlight>


//       <Text  style={{alignSelf:'center'}}>You are Playing For: {dollar}</Text>

//       <Text  style={{alignSelf:'center'}}>{playingCredits} credits will be used</Text>
      
//       <TouchableOpacity  style={{ 
//     width: '100%',
//     marginVertical: 10,
//     marginTop: 1,
//     padding: 10,
//     alignItems: 'center',
//     borderRadius:10}}onPress={checkCreditsAndNavigate}>  
    
// <LinearGradient
//           colors={
//             commonLevel > 0 && commonArea > 0
//               ? ['#F0C735', '#D98F39']
//               : ['#F0C735', midpointColor,'#F0C735']
//           }// Example colors, replace with your desired gradient colors
//           style={[
//             styles.playGameButton,
            
//           ]}
//         >

//         <Text style={[styles.buttonText, { color:  'white'  }]}>
//          Play Game
        
//         </Text>
       
//         </LinearGradient>

//         </TouchableOpacity>






//     </View>
   
//   );
// };

// const styles = StyleSheet.create({
//   welcomeText: {
//     width: 354,
//     height: 41,
   
//     marginLeft: responsiveWidth(7),
  
//     fontSize: 30, // Adjust the font size as needed
//     fontWeight: 'bold',
//     marginBottom:responsiveHeight(2)
   
//   },
//   buycreditscard: {
//     width: wp("83%"), // Adjust the percentage as needed
//     margin: wp("0.5%"), // Responsive margin
//     padding: wp("4%"), // Responsive padding
//     borderRadius: wp("4%"), // Responsive borderRadius
//     backgroundColor: "#F0C735",
//     elevation: 3,
//     height: hp("6%"), // Responsive height using heightPercentageToDP
//     paddingLeft: wp("4%"), // Responsive paddingLeft
//     marginRight: wp("1%"), // Responsive marginRight
//     marginLeft: wp("10%"), // Responsive marginLeft
//     alignSelf: "center",
//     marginTop:10,
//     marginRight:'10%'
//   },

//   buttonContainer: {
//     backgroundColor: '#31A062',
//     width: '90%',
//     marginVertical: '2%', // Adjust margin as needed
//     padding: '2%', // Adjust padding as needed
//     alignItems: 'center',
//     borderRadius: 20,
//     alignSelf:'center',
    
//   },


//   playGameButton: {
//     backgroundColor: '#31A062',
//     width: '90%',
//     marginVertical: 10,
//     marginTop: 15,
//     padding: 10,
//     alignItems: 'center',
//     borderRadius:10
//   },
//   buttonContainerTwo: {
//     backgroundColor: '#31A062',
//     width: '90%',
//     marginVertical: 10,
//     marginTop: 15,
//     padding: 10,
//     alignItems: 'center',
//     borderRadius:20,
//     height:100
//   },

//   PlayGamebuttonContainer: {
//     backgroundColor: '#31A062',
//     width: '90%',
//     marginVertical: 10,
//     marginTop: 35,
//     padding: 10,
//     alignItems: 'center',
//     borderRadius:20
//   },
//   buttonText: {
//     color: 'black',
//     textAlign: 'center',
//     fontSize: 20,
//     fontWeight:'700'
//   },
//   buttonText: {
//     color: 'black',
//     textAlign: 'center',
//     fontSize: 20,
//     fontWeight:'700'
//   },
//   buttonTextSmallTwo: {
   
//     textAlign: 'center',
//     fontSize: 16,
//   },

//   buttonTextLevelThree: {
//     color: 'black',
//     textAlign: 'center',
//     fontSize: 16,
//   },


//   chooseLevel: {
//     width: 354,
//     height: 41,
//     top: 10,
//     left: 20,
  
//     fontSize: 30, // Adjust the font size as needed
//     fontWeight: 'bold',
//     alignSelf:'center',
//     marginBottom:10,
//     marginTop:10
   
//   },
// })

// export default MyCardComponent;