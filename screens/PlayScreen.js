




import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { useAuth } from "./auth/AuthContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { BackHandler } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Alert } from 'react-native';
import Constants from 'expo-constants';


import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SCREEN_HEIGHT = Dimensions.get('window').height;
const PlayScreen = ({route }) => {

  const { countryName ,CountrySymbol,creditsForContinentLevelOne,creditsForContinentLevelTwo,
    creditsForContinentLevelThree,creditsForCountryLevelOne,creditsForCountryLevelTwo,creditsForCountryLevelThree,ContinentWinningAmount,CountryWinningAmount} = route.params;
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const navigation = useNavigation();
  const [areaText, setAreaText] = useState("");

 
  const [totalSelectedNumbers, setTotalSelectedNumbers] = useState([]);
 
  const [Symbol, setSymbol] = useState("");
  const [genearalSymbol,setGeneralSymbol]  = useState("");
  const [area, setArea] = useState("");
  const [previousWinningContinentNumbers, setPreviousWinningContinentNumbers] =
    useState([]);

  const [previousWinningNumbers, setPreviousWinningNumbers] = useState([]);
  const [countryNamess, setcountryName] = useState([]);
  const [checkingCredits,setCheckingCredits] = useState("")
  const [drawdate, setdrawdate] = useState([]);

  const [response, setResponse] = useState(null);

  const [creditsMain, setcreditsMain] = useState(false);

  const [winnerAmt, setwinningAmt] = useState("");
  const [levelText,setLevelText] = useState("");


  const [credits, setcredits] = useState(false);

  const [loading, setLoading] = useState(false);

  const [loadingTwo, setLoadingTwo] = useState(false);





  // Add an effect to update totalSelectedNumbers whenever selectedNumbers changes
 

  const resetValue = async () => {
    try {
      // Reset the value for 'area'
      await AsyncStorage.setItem('area', '0');
      await AsyncStorage.setItem('level', '1');

      // Navigate to ALScreen
      navigation.navigate('ALScreen');
    } catch (error) {
      console.error('Error setting value for "area" or navigating to ALScreen:', error.message);
    }
  };
  


  const createGame = async () => {
    try {
      const storedUserDetails = await AsyncStorage.getItem("userDetails");
      const userId = await AsyncStorage.getItem("userId");
      const storedAccessToken = await AsyncStorage.getItem("accessToken");
      const storedUserCredits = await AsyncStorage.getItem("userCredits");
      const userCredits = storedUserCredits ? parseInt(storedUserCredits) : 0;
  
      // Parse the stored JSON string to get the user details object
      const userDetails = storedUserDetails
        ? JSON.parse(storedUserDetails)
        : null;
  
      const level = 1;
      const userNewCredits = 0;
      const gameNumber = selectedNumbers; // Assuming selectedNumbers is an array
gameNumber.sort((a, b) => a - b);

      console.log("GameType......", areaText, userId, level, creditsMain, gameNumber);
  const levelValue = await AsyncStorage.getItem('level');
      setLoading(true);
  
     const prod = "https://lottery-backend-tau.vercel.app/api/v1/user/game/new-game"

     const dev = "https://lottery-backend-dev.vercel.app/api/v1/user/game/new-game"


     const isStandaloneApp = Constants.appOwnership === 'expo';


      const baseURL = isStandaloneApp ? dev : prod
      const response = await axios.post(
        baseURL,
        {
          userId,
          gameLevel: parseInt(levelText, 10),
          credits: creditsMain,
          selectedNumbers: gameNumber,
          gameType: areaText,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedAccessToken}`,
          },
        }
      );
     
     
  
     
  
      const announcementDate = response.data.data.announcementDate;     
      const currentDate = new Date();
    

  
  
      if (response.data.statusCode === 200) {
        console.log("if checking.....",announcementDate)
        navigation.navigate("PlayedGame", {
          gameNumber,
          gameType: areaText,
          gameSymbol:genearalSymbol,
          currentDate: currentDate.toISOString(),
          announcementDate: announcementDate,
          level:levelText,
          winnerAmt
        });
      } else {
        
        throw new Error(response.data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error during createGame:", creditsMain);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  
  
 
  
  const validateAndCreateGame = async () => {
    // Check if selectedNumbers is an array and has exactly 6 numbers
    if (Array.isArray(selectedNumbers) && selectedNumbers.length === 6) {
      // Check if there are any undefined values in the selectedNumbers array
      if (selectedNumbers.includes(undefined)) {
        Alert.alert(
          '',
          'Please enter exactly 6 numbers',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
      } else {
        try {
          // Call your createGame function
          await createGame();
        } catch (error) {
          console.error("Error during game creation:", error);
          // Handle the error as needed
        }
      }
    } else {
      Alert.alert(
        '',
        'Please enter exactly 6 numbers',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
      // Handle the case where selectedNumbers doesn't contain 6 numbers
      // You might want to display a message to the user or take appropriate action
    }
  };
  
  const logout = async () => {
    try {
      // Replace 'YOUR_BACKEND_URL' with the actual URL of your backend server.
      const prod = "https://lottery-backend-tau.vercel.app/api/v1/auth";

      const dev = "https://lottery-backend-dev.vercel.app/api/v1/auth";
      const isStandaloneApp = Constants.appOwnership === 'expo';


      const baseURL = isStandaloneApp ? dev : prod

      const refreshToken = await AsyncStorage.getItem("refreshToken");
      const accessToken = await AsyncStorage.getItem("accessToken");
      // Assuming you have the refreshToken stored in a variable.

      // Make a POST request to the logout endpoint with the refreshToken in the request body.
      const response = await axios.post(
        `${baseURL}/logout`,
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
        // Redirect or perform any other action after successful logout.
      } else {
        console.error("Logout failed");
        // Handle logout failure, e.g., display an error message.
      }
    } catch (error) {
      console.error("Error during logout", error);
      // Handle the error, e.g., display an error message.
    }
  };


 

 





  const fetchPreviousGameWinningNumbers = async () => {
    const storedAccessToken = await AsyncStorage.getItem("accessToken");
    const userId = await AsyncStorage.getItem("userId");

    const prod = `https://lottery-backend-tau.vercel.app/api/v1/user/game/get-previous-game-winning-numbers/${userId}`;

    const dev = `https://lottery-backend-dev.vercel.app/api/v1/user/game/get-previous-game-winning-numbers/${userId}`;


    const isStandaloneApp = Constants.appOwnership === 'expo';


    const baseURL = isStandaloneApp ? dev : prod

    try {
      const response = await fetch(baseURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedAccessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        "Error fetching previous game winning numbers:",
        error.message
      );
      throw new Error(
        "Something went wrong while fetching previous game winning numbers"
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPreviousGameWinningNumbers();
        setPreviousWinningNumbers(data.message.country || []);
        setPreviousWinningContinentNumbers(data.message.continent || []);
        setcountryName(data.message.countryName);
       
        setdrawdate(data.message.announcementDate);
        setSymbol(data.message.countrySymbol);

      

        await AsyncStorage.setItem(
          "CountryWinningAmount",
          String(data.message.CountryWinningAmount)
        );
        await AsyncStorage.setItem(
          "ContinentWinningAmount",
          String(data.message.ContinentWinningAmount)
        );

        const storedCountryWinningAmount = await AsyncStorage.getItem(
          "CountryWinningAmount"
        );
        const storedContinentWinningAmount = await AsyncStorage.getItem(
          "ContinentWinningAmount"
        );
        console.log(
          "country winning numbers country winning numbers  country winning numbers country winning numbers",
          data.message
        ); // Assuming "country" is an array
      } catch (error) {
        console.error(error.message);
        // Handle the error
      }
    };

    fetchData(); // Invoke the fetchData function when the component mounts
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve areaValue and levelValue from AsyncStorage
        const areaValue = await AsyncStorage.getItem("area");
        const levelValue = await AsyncStorage.getItem("level");

        // Set the areaText based on the areaValue
        let newAreaText = "";
        
        if (areaValue === "1") {
          newAreaText = "Africa";
         

        } else if (areaValue === "2") {
          newAreaText = countryName;
         
        } else {
          // Handle other area values if needed
        }
        console.log("country name fetched" , countryName)
        // Update state variables
        setAreaText(newAreaText);
        
        console.log("newSymbol.........",Symbol)
      } catch (error) {
        console.error("Error fetching data from AsyncStorage:", error.message);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSymbol = async () => {
      try {
        // Retrieve areaValue and levelValue from AsyncStorage
        const areaValue = await AsyncStorage.getItem("area");
      

        // Set the areaText based on the areaValue
        let newSymbol = "";

        if (areaValue === "1") {
          newSymbol ='$';
        } else if (areaValue === "2") {
          newSymbol = CountrySymbol;
        }else {
          // Handle other area values if needed
        }

        // Update state variables
        setGeneralSymbol(newSymbol);
      } catch (error) {
        console.error("Error fetching data from AsyncStorage:", error.message);
      }
    };

    // Call the fetchData function when the component mounts
    fetchSymbol();
  }, []);

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        // Retrieve areaValue and levelValue from AsyncStorage
        const areaValue = await AsyncStorage.getItem("area");
        const levelValue = await AsyncStorage.getItem("level");

        // Set the areaText based on the areaValue
        let newLevelText = "";
        
        if (levelValue === "1") {
          newLevelText = " 1";
        } else if (levelValue === "2") {
          newLevelText = " 2";
        } else if (levelValue === "3") {
          newLevelText = " 3";
        }

        // Update state variables
        setLevelText(newLevelText);
      } catch (error) {
        console.error("Error fetching data from AsyncStorage:", error.message);
      }
    };

    // Call the fetchData function when the component mounts
    fetchLevel();
  }, []);

  useEffect(() => {
    const fetchCreditss = async () => {
      try {
        // Retrieve areaValue and levelValue from AsyncStorage
        const areaValue = await AsyncStorage.getItem("area");
        const levelValue = await AsyncStorage.getItem("level");

        // Set the areaText based on the areaValue
        let fetchedCredit = "";

        if (areaValue === "1") {
         

          if(levelValue === "1"){
            fetchedCredit  = creditsForContinentLevelOne;
          }else if(levelValue === "2"){
            fetchedCredit  = creditsForContinentLevelTwo;
          }else{
            fetchedCredit  = creditsForContinentLevelThree
          }



        } else if (areaValue === "2") {
          if(levelValue === "1"){
            fetchedCredit  = creditsForCountryLevelOne;
          }else if(levelValue === "2"){
            fetchedCredit  = creditsForCountryLevelTwo;
          }else{
            fetchedCredit  = creditsForCountryLevelThree;
          }
        } 

        // Update state variables
        setcreditsMain(fetchedCredit);
      } catch (error) {
        console.error("Error fetching data from AsyncStorage:", error.message);
      }
    };

    // Call the fetchData function when the component mounts
    fetchCreditss();
  }, []);


  
  useEffect(() => {
    const fetchDataWinnigAmt = async () => {

      
      try {
        // Retrieve areaValue and levelValue from AsyncStorage
        const areaValue = await AsyncStorage.getItem("area");
        const levelValue = await AsyncStorage.getItem("level");
    
        // Set the areaText based on the areaValue
        let winningAmount = "";

        if (areaValue === "1") {
          if (levelValue === "1") {
            winningAmount = ContinentWinningAmount/4;
          } else if(levelValue === "2") {
            winningAmount = ContinentWinningAmount/2;
          } else {
            winningAmount = ContinentWinningAmount;
          }
        } else{
          if (levelValue === "1") {
            winningAmount = CountryWinningAmount/4;
          } else if(levelValue === "2") {
            winningAmount = CountryWinningAmount/2;
          } else {
            winningAmount = CountryWinningAmount;
          }
        } 

       

        // Update state variables
        setwinningAmt(winningAmount);
      } catch (error) {
        console.error("Error fetching data from AsyncStorage:", error.message);
      }
    };

    // Call the fetchData function when the component mounts
    fetchDataWinnigAmt();
  }, []);

  useEffect(() => {
    const fetchDataWinnigAmt = async () => {

      
      try {
        // Retrieve areaValue and levelValue from AsyncStorage
        const areaValue = await AsyncStorage.getItem("area");
        const levelValue = await AsyncStorage.getItem("level");
    
        // Set the areaText based on the areaValue
        let winningAmount = "";

        if (areaValue === "1") {
          if (levelValue === "1") {
            winningAmount = ContinentWinningAmount/4;
          } else if(levelValue === "2") {
            winningAmount = ContinentWinningAmount/2;
          } else {
            winningAmount = ContinentWinningAmount;
          }
        } else{
          if (levelValue === "1") {
            winningAmount = CountryWinningAmount/4;
          } else if(levelValue === "2") {
            winningAmount = CountryWinningAmount/2;
          } else {
            winningAmount = CountryWinningAmount;
          }
        } 

       

        // Update state variables
        setwinningAmt(winningAmount);
      } catch (error) {
        console.error("Error fetching data from AsyncStorage:", error.message);
      }
    };

    // Call the fetchData function when the component mounts
    fetchDataWinnigAmt();
  }, []);

  const handleSelectBoxClick = (index) => {
    // Set the highlighted index for the initial selection of empty boxes
    setHighlightedIndex(index);
    console.log("highlited Index", highlightedIndex)
    console.log("selected numbers again", selectedNumbers)
    console.log("total numbers again", selectedNumbers.length)
  };

const handleNumberClick = (number) => {
  if (highlightedIndex !== null && selectedNumbers.length < 6) {



    if (selectedNumbers.includes(number)) {
      alert("Number already selected. Please choose a different number.");
      return; // Don't proceed further
    }


    setSelectedNumbers((prevNumbers) => {
      const newNumbers = [...prevNumbers];
      newNumbers[highlightedIndex] = number;
      return newNumbers;
    });

    // Move highlight to the next box
    setHighlightedIndex((prevIndex) =>
      prevIndex < 5 ? prevIndex + 1 : prevIndex
    );
  } else {
    setSelectedNumbers((prevNumbers) => {
      const newNumbers = [...prevNumbers];
      newNumbers[highlightedIndex] = number;
      return newNumbers;
    });
  }
};


  return (


    <View  style={styles.container}  >


<StatusBar backgroundColor={"transparent"} translucent />

      
<View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginBottom:'5%',
          paddingTop:'3%',
        }}
      >

        <TouchableOpacity  style={{alignSelf:'flex-start'}}
        
        onPress={() => navigation.navigate('ALScreen')}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={35}
            color="black"
            style={{
               color:'white'
            }}
          />
        </TouchableOpacity>
        <Text style={{ fontWeight: '700', fontSize: 17,textAlign: 'center' ,flex: 1,color:'white',fontSize: SCREEN_WIDTH * 0.06,}}>Play Game</Text>
      </View>


      <Text style={styles.subtitle}>
        {" "}
        {areaText}, Level{levelText}, {genearalSymbol}{winnerAmt}
      </Text>
      <View style={{ flexDirection: "column", alignItems: "center" }}>
  {/* UI for displaying selected numbers */}
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
    }}
  >
    {selectedNumbers
      .sort((a, b) => a - b) // Sort the selected numbers in ascending order
      .slice(0, 6) // Take the first six sorted numbers
      .map((number, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleSelectBoxClick(index)}
          style={{
            width: SCREEN_WIDTH * 0.109,
            height: SCREEN_WIDTH * 0.10,
            borderRadius: SCREEN_WIDTH * 0.02,
            margin: SCREEN_WIDTH * 0.015,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 2,
            borderColor: highlightedIndex === index ? "white" : "white",
            backgroundColor:
              highlightedIndex === index ? "#31A062" : "#BA8DF3",
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "white" }}>{number}</Text>
        </TouchableOpacity>
      ))}
  </View>
  {/* Display the sorted selected numbers array */}

</View>


      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: 'center', alignItems: 'center', paddingTop:10 }}>
  {[...Array(60).keys()].map((number, index) => (
    <TouchableOpacity
      key={number + 1}
      onPress={() => handleNumberClick(number + 1)}
      style={{
        width: SCREEN_WIDTH * 0.1,
        height: SCREEN_WIDTH * 0.085,
        borderRadius: SCREEN_WIDTH * 0.02,
        margin: SCREEN_WIDTH * 0.01,
        marginRight:SCREEN_WIDTH * 0.02,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: highlightedIndex === index ? "white" : "white",
        backgroundColor: selectedNumbers.includes(number + 1)
          ? "#31A062"
          : "#BA8DF3",
      }}
    >
      <Text style={{ color: "white" }}>{number + 1}</Text>
    </TouchableOpacity>
  ))}
</View>



      {/* Console log the selected numbers */}

  

      <LinearGradient colors={["#F0C735", "#D98F39"]} style={styles.doneButton}>
        <TouchableOpacity onPress={validateAndCreateGame}>
        {loading ? (
    <ActivityIndicator color="#FFFFFF" size="small" />
  ) : (
    <Text style={styles.doneButtonText}>Done</Text>
  )}
        </TouchableOpacity>
      </LinearGradient>
 
    </View>



  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop:"5%",
    alignItems: "center",
    paddingHorizontal: SCREEN_WIDTH * 0.05, // Use a percentage of the screen width
    backgroundColor: "#BA8DF3",
    alignItems: "center",
    justifyContent:'flex-start',
    paddingTop:16
    
  },
  title: {
    fontSize: SCREEN_WIDTH * 0.06, // Adjust font size based on screen width
    fontWeight: "bold",
   left:'120%',
    color: "white",
  },
  bell: {
    width: 24,
    height: 24,
    top: 1,
    left: 150,
    padding: "2px 3.5px 2px 3.5px",
  },
  logout: {
    marginTop: 5,
    width: 24,
    height: 24,
    top: 1,
    left: 165,
    padding: "2px 3.5px 2px 3.5px",
  },
  subtitle: {
    fontSize: SCREEN_WIDTH * 0.04,
    marginBottom: SCREEN_WIDTH * 0.05,
    color: "white",
    marginRight: SCREEN_WIDTH * 0.2,
    marginBottom:'2%',
   
    alignSelf: "flex-start",
    marginLeft:'4%'
  },
  selectedNumbersContainer: {
    flexDirection: "row",
    marginBottom: SCREEN_WIDTH * 0.05,
  },
  selectedNumberBox: {
    width: SCREEN_WIDTH * 0.11,
    height: SCREEN_WIDTH * 0.11,
    borderRadius: SCREEN_WIDTH * 0.02,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    margin: SCREEN_WIDTH * 0.01,
  },
  selectedNumber: {
    fontSize: SCREEN_WIDTH * 0.04,
    color: "white",
  },
  numberButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: SCREEN_WIDTH * 0.05,
    maxWidth: SCREEN_WIDTH * 0.8, // Maximum width to ensure 6 columns
  },

  numberButton: {
    width: SCREEN_WIDTH * 0.1,
    height: SCREEN_WIDTH * 0.1,
    borderRadius: SCREEN_WIDTH * 0.02, // Make it a perfect circle
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    margin: SCREEN_WIDTH * 0.01,
  },

  doneButton: {
    backgroundColor: "#F0C735",
    paddingVertical: SCREEN_WIDTH * 0.015,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    borderRadius: SCREEN_WIDTH * 0.01,
   
    width: "85%",
    marginTop: SCREEN_WIDTH * 0.042,
    borderWidth:2,
    borderColor:'#e1b411'
  },
  doneButtonText: {
    color: "#fff",
    fontSize: SCREEN_WIDTH * 0.04,
    alignSelf: "center",
   
  },
  selectedNumberBoxSelected: {
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "#31A078",
  },
});

export default PlayScreen;