

import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Pressable,
  Platform,
} from "react-native";

import { Card, TextInput, Button, Chip, Modal } from "react-native-paper";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { Alert } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import { EvilIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import DatePicker from "react-native-modern-datepicker";
import { RadioButton } from 'react-native-paper';
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { CheckBox } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { responsiveFontSize, responsiveHeight, responsiveScreenFontSize, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";


import Constants from 'expo-constants';

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;
const GameScreen = () => {
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [startedDate, setStartedDate] = useState(null);
  const [date, setDate] = useState(new Date());

  
  const [filteredGames, setFilteredGames] = useState([]);
  const [showWinners, setShowWinners] = useState(true);
  const [selectedDate, setSelectedDate] = useState();
  const [showPicker, setShowPicker] = useState(false);
  const [checked, setChecked] = useState('all'); 
  const [initialFetchComplete, setInitialFetchComplete] = useState(false);
  const [isThereIsGame, setIsThereIsGame] = useState(false); 
  const [radioGames, setRadioGames] = useState(true);
  const [showAllGames, setShowAllGames] = useState(true);
const [byWinner, setByWinner] = useState(false);
  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };
  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
    console.log("date1...",date)
    setByWinner(false)
    setEndShowPicker(false);
  };

  const onChange = ({ type }, selectedDate) => {
    setShowAllGames(false);
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        setSelectedDate(currentDate.toLocaleDateString())
      }
    } else {
      toggleDatePicker();
      setShowPicker(false);
    }
  };
  

  

  const handleChangeStartDate = (date) => {
    setStartedDate(date);
    setShowAllGames(false);
    console.log("Selected Start Date:", date);
    // Close the modal after selecting a date
  };



  ///end date picker

  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [endSetDate,setEndSetDate] = useState(new Date());
  const [endSelecteddate,setEndSelecetedDate] = useState()
  const [endshowPicker, setEndShowPicker] = useState(false);

  const toggleEndDatePicker = () => {
    setShowAllGames(false);
    setEndShowPicker(!endshowPicker);
     setShowPicker(false);
    setByWinner(false)
    console.log("dateee.." , endSetDate)
  };
  const navigateToNotificationScreen = () => {
   
  
    // Use navigation.navigate to navigate to the Notification screen
    navigation.navigate('Notification'); // Replace 'Notification' with the name of your Notification screen
  };

  const onEndChange = ({ type }, endSelecteddate) => {
    setShowAllGames(false);
    if (type == "set") {
      const currentDateEnd = endSelecteddate;
      setEndSetDate(currentDateEnd);
      if (Platform.OS === "android") {
        toggleEndDatePicker();
        setEndSelecetedDate(currentDateEnd.toLocaleDateString())
      }
    } else {
      toggleEndDatePicker();
      setEndShowPicker(false);
    }
  };

  
  const handleChangeEndDate = (date) => {
    setShowAllGames(false);
    setEndDate(date);
    console.log("Selected Start Date:", date);
    // Close the modal after selecting a date
  };
  const handleOnPressEndDate = () => {
    setShowAllGames(false);
    setOpenEndDatePicker(!openEndDatePicker);
  };
  // Reset startedDate to null when modal is closed

  const navigation = useNavigation();
  const [userGames, setUserGames] = useState([]);

  const [loading, setLoading] = useState(true);
  
  
  const [isStartSelected, setIsStartSelected] = useState(true); // Track whether start or end date is selected

 


  const goToGameDetails = (game) => {
    navigation.navigate("GameDetailsPage", { game });
  };


  const filterGamesByWinner = (game) => {
    if (showWinners) {
      return true; // Show only winning games
    } else {
      return game.isWinner === true; // Show all games
    }
  };
  const filterGamesByDateRange = (game) => {
    const createdAtDate = new Date(game.createdAt);
    console.log("CreatedAtDate:", createdAtDate);

    // Convert date to the format YYYY-MM-DD for accurate comparison
    const startDateDate =
      date !== "DD/MM/YYYY" ? new Date(date) : null;
    const endDateDate =
      endSetDate !== "DD/MM/YYYY" ? new Date(endSetDate) : null;

    if (startDateDate) {
      startDateDate.setHours(0, 0, 0, 0);
    }

    if (byWinner) {
      return filterGamesByWinner(game);
    } else {
      if (startDateDate && endDateDate) {
        // If both start and end dates are selected, filter games within the date range
        return (
          createdAtDate >= startDateDate &&
          createdAtDate <= endDateDate
        );
      } else if (startDateDate) {
        // If only start date is selected, filter games on or after the start date
        return (
          createdAtDate >= startDateDate
        );
      } else if (endDateDate) {
        // If only end date is selected, filter games on or before the end date
        return (
          createdAtDate <= endDateDate
        );
      } else {
        // If no date range is selected, show all games
        return true;
      }
    }
  };


 




  
  const filterGames = (game) => {
    const createdAtDate = new Date(game.createdAt);
    console.log("CreatedAtDate:", createdAtDate);
  
    // Convert date to the format YYYY-MM-DD for accurate comparison
    const startDateDate = date !== "DD/MM/YYYY" ? new Date(date) : null;
    const endDateDate = endSetDate !== "DD/MM/YYYY" ? new Date(endSetDate) : null;
  
    if (startDateDate) {
      startDateDate.setHours(0, 0, 0, 0);
    }
  
    if (startDateDate && endDateDate) {
      // If both start and end dates are selected, filter games within the date range
      if (game.isWinner && showWinners) {
        return (
          createdAtDate >= startDateDate &&
          createdAtDate <= endDateDate
        );
      } else {
        return false;
      }
    } else if (startDateDate) {
      // If only start date is selected, filter games on or after the start date
      if (game.isWinner && showWinners) {
        return createdAtDate >= startDateDate;
      } else {
        return false;
      }
    } else if (endDateDate) {
      // If only end date is selected, filter games on or before the end date
      if (game.isWinner && showWinners) {
        return createdAtDate <= endDateDate;
      } else {
        return false;
      }
    } else {
      // If no date range is selected, show all games based on the winner status
      if (showWinners) {
        return game.isWinner === true;
      } else {
        return true;
      }
    }
  };
  

  const CommonDateTimePicker = ({ value, onChange }) => (
    
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      
      <DateTimePicker
        mode="date"
        display="spinner"
        value={value}
        onChange={onChange}
        style={{ alignSelf: 'center' }}
      />
    </View>
  );

  
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

  const getUserGames = async () => {
    const storedAccessToken = await AsyncStorage.getItem("accessToken");
    const userId = await AsyncStorage.getItem("userId");

    const prod = `https://lottery-backend-tau.vercel.app/api/v1/user/game/get-game/${userId}`;
    const dev =`https://lottery-backend-dev.vercel.app/api/v1/user/game/get-game/${userId}`;
    const isStandaloneApp = Constants.appOwnership === 'expo';
    const baseURL = isStandaloneApp ? dev : prod;

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
        console.error("User games error:", errorData);
        // Navigate to Login page if specific errors, e.g., auth related
        if (errorData.message.includes("auth") || errorData.message.includes("token")) {
          Alert.alert(
            "Session Expired",
            "Your session has expired. Please login again.",
            [
              { text: "OK", onPress: () => navigation.navigate('Login') }
            ]
          );
          await AsyncStorage.removeItem('userId');
          await AsyncStorage.removeItem('accessToken');
          await AsyncStorage.removeItem('userNumber');
        }
        throw new Error(`Failed to fetch user games: ${errorData.message}`);
      }

      const responseData = await response.json();
      console.log("User games data:", responseData);
      // Further handling of response data if needed

      return responseData;
    } catch (error) {
      console.error("Error while fetching user games:", error.message);
      throw error;
    }
  };
  useEffect(() => {
    // Fetch user games data when the component mounts
    const fetchData = async () => {
      try {
        const responseData = await getUserGames();
        setUserGames(responseData.message);
      } catch (error) {
        console.error("Error fetching user games:", error.message);
      }
    };

    fetchData();
  }, []);

  
 

 

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true); // Set loading to true before making the API call
          const responseData = await getUserGames();
          setUserGames(responseData.message);
        } catch (error) {
          console.error("Error fetching user games:", error.message);
        } finally {
          setLoading(false); // Set loading to false after the API call is complete
        }
      };

      fetchData();
    }, [])
  );

  // Example usage:
  const userId = "yourUserId"; // Replace with the actual user ID
  const authToken = "yourAuthToken"; // Replace with the actual authorization token

  try {
  } catch (error) {
    console.error("Failed to fetch user games:", error.message);
  }
  const theme = {
    colors: {
      primary: 'blue', // Set the primary color to blue
    },
  };

  // Function to handle radio button press
  const handleRadioButtonPress = () => {
    setShowWinners((prev) => !prev); 
    setRadioGames((prev) => !prev); 

    setByWinner(true)
  };
  useEffect(() => {
    setOpenStartDatePicker(false); // Ensure initial state
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch or set userGames here
        // Example: const games = await fetchUserGames();
        // setUserGames(games);
  
        // Instead of the above example, you can directly call getUserGames
        // assuming it sets the userGames state variable
        await getUserGames();
  
        // Update isThereIsGame based on the condition
        setIsThereIsGame(userGames.length === 0);
        console.log("user game Numberuser game Number user game Number user game Number  ",userGames.length)
      } catch (error) {
        console.error("Error fetching or setting user games:", error.message);
      }
    };
  
    // Fetch user games data when the component mounts
    fetchData();
  }, []);  
  function hexToPercentage(hexColor) {
    // Parse the hexadecimal color string to get RGB components
    const red = parseInt(hexColor.slice(1, 3), 16);
    const green = parseInt(hexColor.slice(3, 5), 16);
    const blue = parseInt(hexColor.slice(5, 7), 16);
  
    // Calculate percentages
    const redPercentage = (red / 255) * 100;
    const greenPercentage = (green / 255) * 100;
    const bluePercentage = (blue / 255) * 100;
  
    // Return percentages as a string
    return `${redPercentage.toFixed(2)}% ${greenPercentage.toFixed(2)}% ${bluePercentage.toFixed(2)}%`;
  }
  
  // Usage
  const percentageRepresentation = hexToPercentage('#D9D9D9');

  const handleClearFilters = () => {
    setDate(new Date());
    setStartedDate(null);
    setEndSetDate(new Date());
    setSelectedDate(null);
    setEndSelecetedDate(null);
    setShowAllGames(true);
    setLoading(false);
    // You may need to re-fetch the user games after clearing filters
    getUserGames();
  };

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
      


      <Text style={styles.MainheaderText}>Your games</Text>

      <View
  style={{
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft:'10%',paddingRight:'10%'
   
  }}
>

<View
  style={{
    flexDirection: "row",
    
    justifyContent: "flex-start",
    marginBottom: '3%',
    alignItems:'flex-start'
  }}
>




<LinearGradient
      colors={['#D9D9D9', '#eeeeee']}
      
      style={{width:'55%',height:43,borderRadius:5,marginRight:'11%',borderWidth:.5,borderColor:'#828282'}}
    >
      <TouchableOpacity
        onPress={ 
          // Handle date selection here, for example, show a date picker
          // For demonstration purposes, I'm just setting a sample date
          toggleDatePicker
        }
        style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}
      >
        <AntDesign name="calendar" size={24} color="black" style={{ marginLeft: 8 ,marginRight:10}} />
        {selectedDate ? (
          <Text>{selectedDate}</Text>
        ) : (
          <Text style={{ color: '#11182744' }}>Start Date</Text>
        )}
        
      </TouchableOpacity>
    </LinearGradient>


    
    <LinearGradient
      colors={['#D9D9D9', '#eeeeee']}
      
      style={{width:'55%',height:43,borderRadius:5,borderWidth:.5,borderColor:'#828282'}}
    >
      <TouchableOpacity
        onPress={ 
          // Handle date selection here, for example, show a date picker
          // For demonstration purposes, I'm just setting a sample date
          toggleEndDatePicker
        }
        style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}
      >
        <AntDesign name="calendar" size={24} color="black" style={{ marginLeft: 8 ,marginRight:10}} />
        {endSelecteddate ? (
          <Text>{endSelecteddate}</Text>
        ) : (
          <Text style={{ color: '#11182744' }}>End Date</Text>
        )}
        
      </TouchableOpacity>
    </LinearGradient>


  
</View>





{showPicker && (
      <CommonDateTimePicker value={date} onChange={onChange} />
    )}


{endshowPicker && (
      <CommonDateTimePicker value={endSetDate} onChange={onEndChange} />
    )}



</View>








      <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'flex-start' }}>
 <View  style={{right:'28%'}}>

 <CheckBox
              
              checked={!showWinners }
              onPress={handleRadioButtonPress} // Call toggle function
              checkedColor="#31A062"
            />

 </View>



  <Text style={{right:25}}>Show Only Wins</Text>

  <View style={{ marginLeft: 'auto' ,marginRight:'5%'}}>
  <TouchableOpacity onPress={handleClearFilters}>
    <Text style={{color:"#FE555D"}}>Clear</Text>
    </TouchableOpacity>
  </View>
</View>


      {/* Your existing code */}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
      



<ScrollView style={{ marginBottom: 10, marginTop: hp(0.01) }}   showsVerticalScrollIndicator={false}>

{showAllGames && radioGames ? (
  <>

{showAllGames && radioGames ? (
      [...userGames].reverse().map((game, index) => (
        <LinearGradient
          key={index}
          colors={game.isWinner ? ["#F0C735", "#D98F39"] : ["#BA8DF3", "#615EE2"]}
          style={{ ...styles.mainCard, borderColor: game.isWinner ? '#e1b411' : '#ac76f1' ,borderWidth:1}}
        >
          <TouchableOpacity
            key={index}
            onPress={() => goToGameDetails(game)}
          >
             <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                   
                    marginBottom: "2%",
                  }}
                >
                   <Text style={styles.createdAtText}>
                    {game.gameType},
                  </Text>

                  <Text style={styles.createdAtLevel}>
                   Level {game.gameLevel},
                  </Text>
                  <Text style={styles.createdAtLevel}>
                    {new Date(game.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })},
                  </Text>

                  <Text  style={styles.createdAtLevel}>{new Date(game.createdAt).toLocaleTimeString("en-GB", {
  hour: "numeric",
  minute: "numeric",
  hour12: true, 
})}</Text>
                </View>

            <View style={styles.container}>
              {game.selectedNumbers.map((number, index) => (
                <View key={index} style={styles.numberBox}>
                  <Text style={styles.numberText}>{number}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        </LinearGradient>
      ))
    ) : (

      [...userGames].reverse().
      filter(filterGamesByWinner)
      
      .map((game, index) => (
        <LinearGradient
          key={index}
          colors={game.isWinner ? ["#F0C735", "#D98F39"] : ["#BA8DF3", "#615EE2"]}
          style={{ ...styles.mainCard, borderColor: game.isWinner ? '#e1b411' : '#ac76f1' ,borderWidth:1}}
        >
          <TouchableOpacity
            key={index}
            onPress={() => goToGameDetails(game)}
          >
             <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                 
                  marginBottom: "2%",
                }}
              >
                 <Text style={styles.createdAtText}>
                  {game.gameType},
                </Text>

                <Text style={styles.createdAtLevel}>
                 Level {game.gameLevel},
                </Text>
                <Text style={styles.createdAtLevel}>
                  {new Date(game.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })},
                </Text>

                <Text  style={styles.createdAtLevel}>{new Date(game.createdAt).toLocaleTimeString("en-GB", {
hour: "numeric",
minute: "numeric",
hour12: true, 
})}</Text>
              </View>

            <View style={styles.container}>
              {game.selectedNumbers.map((number, index) => (
                <View key={index} style={styles.numberBox}>
                  <Text style={styles.numberText}>{number}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        </LinearGradient>
      ))
    
    )}

    {(userGames.length === 0) && (
      <Text style={styles.noWinnersText}>No Games found</Text>
    )}
  </>
) : (
  <>
    {showAllGames && radioGames ? (
      [...userGames].reverse().map((game, index) => (
        <LinearGradient
          key={index}
          colors={game.isWinner ? ["#F0C735", "#D98F39"] : ["#BA8DF3", "#615EE2"]}
          style={{ ...styles.mainCard, borderColor: game.isWinner ? '#e1b411' : '#ac76f1' ,borderWidth:1}}
        >
          <TouchableOpacity
            key={index}
            onPress={() => goToGameDetails(game)}
          >
            <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                   
                    marginBottom: "2%",
                  }}
                >
                   <Text style={styles.createdAtText}>
                    {game.gameType},
                  </Text>

                  <Text style={styles.createdAtLevel}>
                   Level {game.gameLevel},
                  </Text>
                  <Text style={styles.createdAtLevel}>
                    {new Date(game.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })},
                  </Text>

                  <Text  style={styles.createdAtLevel}>{new Date(game.createdAt).toLocaleTimeString("en-GB", {
  hour: "numeric",
  minute: "numeric",
  hour12: true, 
})}</Text>
                </View>

            <View style={styles.container}>
              {game.selectedNumbers.map((number, index) => (
                <View key={index} style={styles.numberBox}>
                  <Text style={styles.numberText}>{number}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        </LinearGradient>
      ))
    ) : (
      [...userGames].reverse()
       
        .filter(filterGamesByDateRange)
        .map((game, index) => (
          <LinearGradient
            key={index}
            colors={game.isWinner ? ["#F0C735", "#D98F39"] : ["#BA8DF3", "#615EE2"]}
            style={{ ...styles.mainCard, borderColor: game.isWinner ? '#e1b411' : '#ac76f1' ,borderWidth:1}}
          >
            <TouchableOpacity
              key={index}
              onPress={() => goToGameDetails(game)}
            >
              <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                   
                    marginBottom: "2%",
                  }}
                >
                   <Text style={styles.createdAtText}>
                    {game.gameType},
                  </Text>

                  <Text style={styles.createdAtLevel}>
                   Level {game.gameLevel},
                  </Text>
                  <Text style={styles.createdAtLevel}>
                    {new Date(game.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })},
                  </Text>

                  <Text  style={styles.createdAtLevel}>{new Date(game.createdAt).toLocaleTimeString("en-GB", {
  hour: "numeric",
  minute: "numeric",
  hour12: true, 
})}</Text>
                </View>

              <View style={styles.container}>
                {game.selectedNumbers.map((number, index) => (
                  <View key={index} style={styles.numberBox}>
                    <Text style={styles.numberText}>{number}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          </LinearGradient>
        ))
    )}

    {(userGames.filter(filterGamesByWinner).length === 0) && (
      <Text style={styles.noWinnersText}>No Games found</Text>
    )}
  </>
)}





</ScrollView>




      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={openStartDatePicker}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ width: "80%", padding: 20 ,}}>


            <DatePicker
              mode="calendar"
              selected={startedDate}
              onSelectedChange={(date) => handleChangeStartDate(date)}
              options={{
                backgroundColor: "white",
                textHeaderColor: "black",
                textDefaultColor: "black",
                selectedTextColor: "#FFF",
                mainColor: "#469ab6",
                textSecondaryColor: "black",
                borderColor: "rgba(122,146,165)",
              }}
            />

            <TouchableOpacity
              onPress={handleOnPressStartDate}
              style={{ marginTop: 20 }}
            >
              <Text style={{ color: "black" }}>Close</Text>
            </TouchableOpacity>

            {/* Add another button for closing the modal */}
            <TouchableOpacity
              onPress={() => setOpenStartDatePicker(false)}
              style={{ marginTop: 20 }}
            >
              <Text style={{ color: "black" }}>Close Modal</Text>
            </TouchableOpacity>
          </View>


          <View style={{ width: "80%", padding: 20 }}>
            <DatePicker
              mode="calendar"
              selected={endDate}
              onSelectedChange={(date) => handleChangeEndDate(date)}
              options={{
                backgroundColor: "white",
                textHeaderColor: "black",
                textDefaultColor: "black",
                selectedTextColor: "#FFF",
                mainColor: "#469ab6",
                textSecondaryColor: "black",
                borderColor: "rgba(122,146,165)",
              }}
            />

            <TouchableOpacity
              onPress={handleOnPressEndDate}
              style={{ marginTop: 20 }}
            >
              <Text style={{ color: "black" }}>Close</Text>
            </TouchableOpacity>

            {/* Add another button for closing the modal */}
            <TouchableOpacity
              onPress={() => setOpenEndDatePicker(false)}
              style={{ marginTop: 20 }}
            >
              <Text style={{ color: "black" }}>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>





    </View>
  );
};

const styles = StyleSheet.create({

  datePickerContainer: {
    borderColor: '#828282',
    backgroundColor: '#F8F8FF',
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    height: 55.5,
    backgroundColor:'#828282' ,
    borderStyle: 'solid',
    fontSize: 15,
    borderRadius: 15,
    color: '#F8F8FF',
    overflow: "hidden",
   
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor:'#D9D9D9' 
  },
  textInput: {
    color: '#F8F8FF',
    width:'50%',
    height: 60.5,
    backgroundColor:'#D9D9D9' 
  },
  card: {
    margin: 10,
    marginLeft: "4%",
    marginRight: "7%",

    padding: 15,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    elevation: 3,
    width: 150,
    alignSelf: "flex-start",
  },

  mainCard: {
    width: wp("90%"),
    marginTop:'2%',
    marginBottom:'2%', // Responsive margin
    padding: wp("4%"), // Responsive padding
    borderRadius: wp("5%"), // Responsive borderRadius
    
    elevation: 3,
   
    backgroundColor: "#F0C735",

    flex: 1,
  
    alignSelf:'center'
  
  },
  createdAtText: {
    fontSize: 15,
    marginLeft:'2%',
    marginBottom: 5,
    color: "white",
    paddingRight:'2%'
  },
  createdAtLevel: {
    fontSize: 15,
    
    marginBottom: 5,
    color: "white",
    paddingRight:'1%'
  },
  viewGame: {
    fontSize: 15,
    
    marginBottom: 10,

    fontWeight: "bold",
    color: "white", // Add margin left for spacing
  },
  MainheaderText: {
    fontSize: responsiveScreenFontSize(3.5),
    fontWeight: "bold",
    marginBottom: '5%',
   
    marginLeft: "5%", // Add margin bottom for spacing,
  },
  headerText: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    marginStart: 5, // Add margin bottom for spacing
  },
  headerTextTwo: {
    fontSize: 15,
    fontWeight: "bold",

    marginStart: 10, // Add margin bottom for spacing
  },
  headerTextYourNumber: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    marginStart: 5,
    marginEnd: 23, // Add margin bottom for spacing
  },
  cardTwo: {
    margin: 10,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    elevation: 3,
  },
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    
  },
  numberBox: {
    width: wp("10%"), // Adjust the width percentage as needed
    aspectRatio: 1, // Maintain a square aspect ratio
    borderRadius: wp("3%"), // Adjust the borderRadius percentage as needed
    borderWidth: 1,
    borderColor: "white",
    margin: wp("1.7%"), // Adjust the margin percentage as needed
    alignItems: "center",
    justifyContent: "center",
  },
  noWinnersText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red', // You can customize the color
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

  numberText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
});

export default GameScreen;