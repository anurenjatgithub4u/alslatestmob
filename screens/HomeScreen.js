
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Card, TextInput, Button, Chip } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EvilIcons } from "@expo/vector-icons";
import { BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { logout } from "./auth/logout";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { Alert } from 'react-native';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import Constants from 'expo-constants';





const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;

const NumberRow = ({ numbers }) => {
  return (
    <View style={styles.container}>
      {numbers.map((number, index) => (
        <View key={index} style={styles.numberBox}>
          <Text style={styles.numberText}>{number}</Text>
        </View>
      ))}
    </View>
  );
};
const HomeScreen = ({goToGameScreen }) => {
  const navigation = useNavigation();
  const [userGames, setUserGames] = useState([]);
  const [userName, setUserName] = useState(null);


  const [credits, setCredits] = useState(0);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingCredits, setLoadingCredits] = useState(true);

  const [previousWinningNumbers, setPreviousWinningNumbers] = useState([]);
  const [countryName, setcountryName] = useState([]);
  const [ContinentWinningAmount, setContinentWinningAmount] = useState("");
  const [CountryWinningAmount, setCountryWinningAmount] = useState("");
  const [CountrySymbol, setCountrySymbol] = useState([]);
  const [ContinentSymbol,setContinentSymbol] = useState();
  const [previousWinningContinentNumbers, setPreviousWinningContinentNumbers] = useState([]);
  



    
  const fetchPreviousGameWinningNumbers = async () => {
    const storedAccessToken = await AsyncStorage.getItem("accessToken");
    const userId = await AsyncStorage.getItem("userId");

    const url = `https://lottery-backend-tau.vercel.app/api/v1/user/game/get-previous-game-winning-numbers/${userId}`;

    try {
      const response = await fetch(url, {
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
      console.log("dataaaaaaaaaaaaa",data)
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

  function numberWithCommas(x) {
    if (x.toString().length <= 3) {
      return x.toString(); // No formatting needed for numbers with 3 or fewer digits
    } else {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Formatting for numbers with more than 3 digits
    }
  }


  
  useFocusEffect(
    React.useCallback(() => {
      const fetchWinningNumbers = async () => {
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
         
          setcountryName(data.message.countryName);
          setContinentWinningAmount(data.message.ContinentWinningAmount);
          setCountryWinningAmount(data.message.CountryWinningAmount)
          setCountrySymbol(data.message.countrySymbol);
          setContinentSymbol(data.message.ContinentCurrencySymbol)
          setPreviousWinningNumbers(data.message.country || []); 
          setPreviousWinningContinentNumbers(data.message.continent || [])
            
          setPreviousWinningNumbers(data.message.country || []); 
          setPreviousWinningContinentNumbers(data.message.continent || [])
          console.log("country winning numbers country winning numbers  country winning numbers country winning numbers",data.message.continent )
          console.log("credits credits credits credits credits credits credits", data.message.country);
          console.log("credits credits credits credits credits credits credits", data.message.ContinentWinningAmount);
          // Additional fields can be set here based on your API response
        } catch (error) {
          console.error("Error fetching winning numbers", error.message);
        }
      };

      fetchWinningNumbers();
    }, []) // Empty dependency array means this effect will only run once when the component mounts
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

  const navigateToNotificationScreen = () => {
   
  
    // Use navigation.navigate to navigate to the Notification screen
    navigation.navigate('Notification'); // Replace 'Notification' with the name of your Notification screen
  };

  const goToGameDetails = (game) => {
    navigation.navigate("GameDetailsPageTwo", { game });
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

// Define navigation to Login
function navigateToLogin() {
  // Logic to navigate user to the login screen
  console.log("Navigating to login due to authentication issue.");
}


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
          await AsyncStorage.setItem('userEmail', data.message.email);
          setCredits(data.message.credits);
          setUserName(data.message.name);
          
          console.log("credits credits credits credits credits credits credits", data.message.credits);
          // Additional fields can be set here based on your API response
        } catch (error) {
          console.error("Error fetching personal details:", error.message);
        }
      };

      fetchPersonalDetails();
    }, []) // Empty dependency array means this effect will only run once when the component mounts
  );

  useEffect(() => {
    // Function to retrieve userName from AsyncStorage
    const getUserNameFromStorage = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem("userName");
        if (storedUserName !== null) {
          // setUserName(storedUserName);
        }
      } catch (error) {
        console.error("Error retrieving userName from AsyncStorage:", error);
      }
    };

    // Call the function to get userName when the component mounts
    getUserNameFromStorage();
  }, []);




  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const responseData = await getUserGames();
          setUserGames(responseData.message);
        } catch (error) {
          console.error("Error fetching user games:", error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [])
  );

  const resetValue = async () => {
    try {
      // Reset the value for 'area'
      await AsyncStorage.setItem('area', '0');
      await AsyncStorage.setItem('level', '0');

      // Navigate to ALScreen
      navigation.navigate('GameRules');
    } catch (error) {
      console.error('Error setting value for "area" or navigating to ALScreen:', error.message);
    }
  };


  const resetTwo = async () => {
    try {
      // Reset the value for 'area'
      await AsyncStorage.setItem('area', '2');
      await AsyncStorage.setItem('level', '0');

      const areaType = await AsyncStorage.getItem("area");

      // Navigate to ALScreen
      navigation.navigate('ALScreen',{areaType});
    } catch (error) {
      console.error('Error setting value for "area" or navigating to ALScreen:', error.message);
    }
  };
  const resetOne = async () => {
    try {
      // Reset the value for 'area'
      await AsyncStorage.setItem('area', '1');
      await AsyncStorage.setItem('level', '0');

      const areaType = await AsyncStorage.getItem("area");

      // Navigate to ALScreen
      navigation.navigate('ALScreen',{areaType});
    } catch (error) {
      console.error('Error setting value for "area" or navigating to ALScreen:', error.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          await getUserGames();
        } catch (error) {
          console.error("Error fetching user games:", error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [])
  );
  const checkCreditsAndNavigate = () => {
    // Replace 0 with the actual condition to check if credits are 0
    if (credits === 0) {
      Alert.alert(
        'Insufficient Credits',
        'You don\'t have enough credits. Please add credits to continue.',
        [{ text: 'OK', onPress: () => navigation.navigate('PaymentMethodPage') }]
      );
    } else {
      // Navigate to ALScreen (replace 'ALScreen' with your actual screen name)
      navigation.navigate('ALScreen');
    }
  };

  useEffect(() => {
    
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        // Handle back button press
        // Here, you can add your logic to close the app
        // For example, you might want to show an exit confirmation dialog
        // If the screen is the Login screen, you can close the app
        if (navigation.isFocused()) {
          // Close the app (exit)
          navigation.navigate("ALScreen");
          return true; // Prevent default behavior (exit the app)
        }

        // If it's not the Login screen, let the default back button behavior occur
        return false;
      }
    );

    // Clean up the event listener on component unmount
    return () => backHandler.remove();
  }, [navigation]);

  const navigateToGameScreen = () => {
    navigation.navigate('Game', { screen: 'Gam' })
  };

  return (
    <View style={{ flex:1, paddingLeft: 16 , paddingRight:16 ,paddingTop:"12%"}}>
      <StatusBar backgroundColor={"transparent"} translucent />
    
      <View
  style={{
    flexDirection: "row",
    marginBottom: hp("1%"),
    justifyContent: "flex-end",
   
    alignItems: 'flex-end'
  }}
>
  <View style={{ flexDirection: "row", alignItems: "center", alignSelf: 'flex-end',justifyContent:'flex-end' }}>
    <EvilIcons name="bell" size={30} style={styles.bell} color="black" onPress={navigateToNotificationScreen} />
    <AntDesign
      name="logout"
      size={19}
      style={styles.logout}
      color="black"
      onPress={logout}
    />
  </View>
</View>




    

      <Text style={styles.welcomeText}>{`Welcome, ${
        userName || "Guest"
      }`}</Text>


<ScrollView style={{ marginBottom: 10, marginTop: hp(0.01) ,marginRight:1 }}  showsVerticalScrollIndicator={false}>

<LinearGradient
  colors={["#31A078", "#31A05F"]} // Example colors, replace with your desired gradient colors
  style={styles.card}
>


{loading ? (
  <ActivityIndicator style={{ alignSelf: 'center' }} size="large" color="white" />
) : (
  <>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      { !previousWinningContinentNumbers ? (
        <ActivityIndicator style={{ marginLeft: 20, alignSelf: 'center' }} size="small" color="white" />
      ) : (
        <Text style={{ color: 'white', marginBottom: responsiveFontSize(1), marginLeft: '2%', }}>Winning Amount  {ContinentSymbol}{numberWithCommas(ContinentWinningAmount)}</Text>
      )}
    </View>

    {previousWinningContinentNumbers && previousWinningContinentNumbers.length ? (
      <>
        <Text style={styles.createdAtText}>Continental Winning Numbers</Text>
        <NumberRow numbers={previousWinningContinentNumbers} />
      </>
    ) : (
      <LinearGradient
        colors={["#F0C735", "#D98F39"]}
        style={styles.buycreditscardTwo}
      >
        <TouchableOpacity onPress={resetOne}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", alignSelf: "center", fontSize: 10 }}>Play Now</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    )}
  </>
)}

    
</LinearGradient>



<LinearGradient
  colors={["#31A078", "#31A05F"]} // Example colors, replace with your desired gradient colors
  style={styles.card}
>


{loading ? (
  <ActivityIndicator style={{ alignSelf: 'center' }} size="large" color="white" />
) : (
  <>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      { !previousWinningNumbers ? (
        <ActivityIndicator style={{ marginLeft: 20, alignSelf: 'center' }} size="small" color="white" />
      ) : (
        <Text  style={{color:'white',marginBottom:responsiveFontSize(1),marginLeft:'2%'}}>Winning Amount  {CountrySymbol}{numberWithCommas(CountryWinningAmount)}</Text>
      )}
    </View>

    {previousWinningNumbers && previousWinningNumbers.length ? (
      <>
        <Text style={styles.createdAtText}>{countryName} Winning Numbers</Text>
        <NumberRow numbers={previousWinningNumbers} />
      </>
    ) : (
      <LinearGradient
        colors={["#F0C735", "#D98F39"]}
        style={styles.buycreditscardTwo}
      >
        <TouchableOpacity onPress={resetTwo}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", alignSelf: "center", fontSize: 10 }}>Play Now</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    )}
  </>
)}

    
</LinearGradient>
      

      <View>
        <Text style={styles.yohaveText}> You have</Text>

        <Text style={styles.creditsText}>{credits} Credits</Text>

      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
         <TouchableOpacity
        
            onPress={() => navigation.navigate("PaymentMethodPage")}
          >
        <LinearGradient
          colors={["#31A078", "#31A05F"]} // Example colors, replace with your desired gradient colors
          style={styles.playNowcard}
        >
         
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white" }}>Buy Credits</Text>
            </View>
         
        </LinearGradient>
        </TouchableOpacity>



        <TouchableOpacity onPress={resetValue }>
        <LinearGradient
          colors={["#F0C735", "#D98F39"]} // Example colors, replace with your desired gradient colors
          style={styles.buycreditscard}
        >
         

          <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
          
              <Text style={{ color: "white" , alignSelf:"center"}}>Play Now</Text>

              </View>
            
         
        </LinearGradient>
        </TouchableOpacity>
      </View>

      <View
  style={{
    flexDirection: "row",
    marginBottom: hp("1%"),
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp("3%"),
   
  }}
>


{loading ? (
  <ActivityIndicator size="large" color="white" />// Replace with your loading icon component
) : userGames.length === 0 || userGames === null ? (
  <Text style={styles.previousgames}>You Have No Previous Games</Text>
) : userGames.length < 5 ? (
  <Text style={styles.previousgames}>Previous Games</Text>
) : (
  <Text style={styles.previousgames}>Your Previous 5 Games</Text>
)}

      
<View style={{ flexDirection: "row", alignItems: "center" }}>
  {userGames.length === 0 || userGames === null ? null : (
    <>
      <TouchableOpacity onPress={navigateToGameScreen}>
        <Text style={styles.seeAll}>See all</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToGameScreen}>
        <AntDesign
          name="arrowright"
          style={{ marginLeft: wp("1%") }}
          size={20}
          color="#FE555D"
        />
      </TouchableOpacity>
    </>
  )}
</View>


  
</View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (

        
        <View>
        {[...userGames]
        .reverse()
          .slice(0, 5)  // Limit to the first 5 elements
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
                    marginStart:'1%',
                    marginTop:'2%'
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
        }
      </View>
      
      
      
      
       
      )}





</ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    width: 354,
    height: 41,
    marginStart: wp("2%"),
    left: 0,

    fontSize: wp("7%"), // Adjust the font size as needed
    fontWeight: "bold",
    marginBottom: hp("2%"),
  },
  containerMain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SCREEN_WIDTH * 0.05, // Use a percentage of the screen width
    backgroundColor: "#BA8DF3",
  },

  numberText: {
    marginTop: 20,
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
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
  mainCard: {
    width: wp("90%"),
    marginTop:'2%',
    marginBottom:'2%',
    padding: wp("4%"), // Responsive padding
    borderRadius: wp("5%"), // Responsive borderRadius
    
    elevation: 3,
    flex: 1,
    backgroundColor: "#F0C735",


  
    flex: 1,
    alignSelf:'center'
  },
  mainCardTwo: {
    margin: 10,
    padding: 15,
    borderRadius: 15,
    height: 134,
    width: 354,
    elevation: 3,
    backgroundColor: "#F0C735",
    marginTop: 50,
    alignSelf: "center",
  },
  yohaveText: {
    width: 354,
    height: 41,
    top: 15,
    marginStart: wp("2%"),
    
    fontSize: 16, // Adjust the font size as needed
  },

  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginStart:'.5%'
    
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
  previousgames: {
    fontSize: hp("2.6%"), // Adjust the percentage as needed
    fontWeight: "bold",
    
    
    marginStart: wp("2%"),
  },
  seeAll: {
    fontSize: hp("1.8%"), // Adjust the percentage as needed
    fontWeight: "bold",
    textAlign: "left",
    marginRight: wp("1%"),
    marginLeft: wp("2%"),
    color: "#FE555D", // Add this line to explicitly set text alignment to left
  },
  creditsText: {
    width: 354,
    height: 41,
    top: 1,
    marginStart: wp("2%"),
    fontSize: 30, // Adjust the font size as needed
    marginBottom: 5,
  },
  viewGame: {
    fontSize: 15,
    marginLeft: 10, // Adjust this margin based on your design
    marginBottom: 5,

    color: "white",
    // No need for marginLeft here, as we're using justifyContent: 'space-between'
  },

  card: {
    width: wp("90%"),
    marginTop: wp("2%"),
    marginBottom:wp("2%"), // Responsive margin
    padding: wp("4%"), // Responsive padding
    borderRadius: wp("5%"), // Responsive borderRadius
    backgroundColor: "#31A078",
    elevation: 3,
    flex: 1,// Responsive height using heightPercentageToDP
    alignSelf:'center',
    alignItems:'flex-start',
    borderWidth: 1,
    borderColor:'#278060',

    
    shadowColor: '#000', // for iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
   
  },
  playNowcard: {
    width: wp("33%"), // Adjust the percentage as needed
    margin: wp("0.4%"), // Responsive margin
    padding: wp("4%"), // Responsive padding
    borderRadius: wp("2%"), // Responsive borderRadius
    backgroundColor: "#F0C735",
 
    elevation:3,

    // Responsive height using heightPercentageToDP
    paddingLeft: wp("4%"), // Responsive paddingLeft
    marginRight: wp("10%"), // Responsive marginRight
    marginLeft: wp("1%"), // Responsive marginLeft
    alignSelf: "flex-start",
    marginStart: wp("2%"),
    minHeight: hp("6%"),
    borderWidth: 1,
    borderColor:'#278060'
   
  },
  buycreditscard: {
    width: wp("33%"), // Adjust the percentage as needed
    margin: wp("0.5%"), // Responsive margin
    padding: wp("4%"), // Responsive padding
    borderRadius: wp("2%"), // Responsive borderRadius
    backgroundColor: "#F0C735",
   
    minHeight: hp("6%"), // Responsive height using heightPercentageToDP
    paddingLeft: wp("4%"), // Responsive paddingLeft
    marginRight: wp("1%"), // Responsive marginRight
    marginLeft: wp("10%"), // Responsive marginLeft
    alignSelf: "flex-start",
    borderWidth:1,
    borderColor:'#e1b411'
  },
  buycreditscardTwo: {
    width: wp("23%"), // Adjust the percentage as needed
    margin: wp("0.5%"), // Responsive margin
    padding: wp("3%"), // Responsive padding
    borderRadius: wp("2%"), // Responsive borderRadius
    
   
    minHeight: hp("3%"), // Responsive height using heightPercentageToDP
    paddingLeft: wp("4%"), // Responsive paddingLeft
    marginRight: wp("1%"), // Responsive marginRight
     // Responsive marginLeft
    alignSelf: "flex-start",
  },
  containerSecond: {
    flex: 1,
    justifyContent: "flex-start", // Align items at the top

    paddingTop: "12%",
  },

  createaccountText: {
    // Add this line to align text to the left
    width: 354,
    height: 41,
    top: 103,
    left: 30,

    fontSize: 30, // Adjust the font size as needed
    fontWeight: "bold",
    marginBottom: 100,
  },

  textInput: {
    borderColor: "black",
    backgroundColor: "white",
    width: "100%",
    borderWidth: 1,
    borderStyle: "solid",
    fontSize: 15,
    borderRadius: 25,
    color: "white", // Add this line to set the text color to white
  },

  createaccountTextTwo: {
    fontSize: 17,
    width: 354,
    height: 22,
    top: 10,
    left: 38,

    fontSize: 13,
    marginBottom: 80,
    textAlign: "left", // Add this line to align text to the left
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    selectedCountryText: {
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 4,
      backgroundColor: "white",
    },

    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      elevation: 5,
    },
    countryItem: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: "gray",
    },
    elevation: 5,
  },
  countryItem: {
    paddingVertical: 10,

    borderBottomColor: "gray",
  },
  circleText: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 100,
    height: 100,
    textAlign: "center",
    lineHeight: 100,
    fontSize: 20,
    marginTop: -20, // Adjust the negative margin top to move the circle upward
  },
  numberBoxTwo: {
    width: 45,
    height: 35,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  logout: {
    marginTop: 5,
    width: 24,
    height: 24,
    top: 1,
    marginLeft: wp("1%"),
    
    
   
  },

  bell: {
    width: 24,
    height: 24,
    top: 1,
    marginRight: wp("3%"),
    marginLeft: wp("2%"),
    
  },
});

export default HomeScreen;



