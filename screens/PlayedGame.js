




import { useNavigation } from '@react-navigation/native';
import React, {useEffect,useState} from 'react';
import { View, Text, StyleSheet ,TouchableOpacity,Dimensions} from 'react-native';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";

import { responsiveFontSize, responsiveHeight, responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";

import Constants from 'expo-constants';


const { width, height } = Dimensions.get('window');

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



const PlayedGame = ({ route }) => {
  const { gameNumber,currentDate,gameType ,announcementDate,winningAmt ,gameSymbol,level,winnerAmt} = route.params;
  const navigation = useNavigation();
  const parsedDate = new Date(currentDate);
  const [areaText, setAreaText] = useState('');
 
  const [previousWinningContinentNumbers, setPreviousWinningContinentNumbers] = useState([]);

  const [previousWinningNumbers, setPreviousWinningNumbers] = useState([]);
  const [countryName, setcountryName] = useState([]);
  const [ContinentWinningAmount, setContinentWinningAmount] = useState([]);
  const [CountryWinningAmount, setCountryWinningAmount] = useState([]);
  const [drawdate, setdrawdate] = useState();
  const navigateToPlayScreen = () => {
    navigation.navigate('Play'); // 'Play' is the name of your 'PlayScreen' route
  };
  const formattedAnnouncementDate = new Date(announcementDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });


  const formattedAnnouncementTime = new Date(announcementDate).toLocaleTimeString('en-GB', {
    hour: "numeric",
    minute: "numeric",
    hour12: true, 
  });

  const navigateToGameScreen = () => {
    navigation.navigate('Game'); // 'Play' is the name of your 'PlayScreen' route
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve areaValue and levelValue from AsyncStorage
        const areaValue = await AsyncStorage.getItem('area');
        const levelValue = await AsyncStorage.getItem('level');

        // Set the areaText based on the areaValue
        let newAreaText = '';

        if (areaValue === '1') {
          newAreaText = 'Continental';
        } else if (areaValue === '2') {
          newAreaText = 'National';
        } else {
          // Handle other area values if needed
        }

        // Update state variables
        setAreaText(newAreaText);
       
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error.message);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); 






  useEffect(() => {
    // Add event listener for hardware back button press
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Handle back button press
      // Here, you can add your logic to close the app
      // For example, you might want to show an exit confirmation dialog
      // If the screen is the Login screen, you can close the app
      if (navigation.isFocused()) {
        // Close the app (exit)
        navigation.navigate('ALScreen')
        return true; // Prevent default behavior (exit the app)
      }

      // If it's not the Login screen, let the default back button behavior occur
      return false;
    });

    // Clean up the event listener on component unmount
    return () => backHandler.remove();
  }, [navigation]);


  
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
        setPreviousWinningContinentNumbers(data.message.continent || [])
        setcountryName(data.message.countryName);
        setContinentWinningAmount(data.message.ContinentWinningAmount);
        setCountryWinningAmount(data.message.CountryWinningAmount)
        setdrawdate(data.message.announcementDate)
        console.log("country winning numbers country winning numbers  country winning numbers country winning numbers",data.message )
        console.log("date fetched " , drawdate)
        // Assuming "country" is an array
      } catch (error) {
        console.error(error.message);
        // Handle the error
      }
    };

    fetchData(); // Invoke the fetchData function when the component mounts
  }, []);

  return (
    <View
    style={{
     
     
      paddingLeft:responsiveHeight(3),
      paddingRight:responsiveHeight(3),
      paddingTop: "10%",
    }}>
      <StatusBar backgroundColor={"transparent"} translucent />
      <TouchableOpacity  onPress={()=> navigation.navigate('ALScreen')}>
 <MaterialIcons name="keyboard-arrow-left" size={35} color="black" style={{
     
     // Add marginLeft to push the icon to the left
   }}/>
</TouchableOpacity>
      <Text style={styles.Heading}>Your  Previous Game</Text>
      
      <Text style={styles.dateText}>{parsedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>

    
<Text style={styles.subtitle}> {gameType}, Level {level}, {gameSymbol}{winnerAmt}</Text>

      
      <LinearGradient
        colors={['#BA8DF3', '#615EE2']} // Example colors, replace with your desired gradient colors
        style={styles.mainCard}
      >
       <Text style={styles.yourNumbers}>Your Numbers</Text>
        <NumberRow numbers={gameNumber} />
      </LinearGradient>


<Text  style={{fontSize:16 , fontWeight:400,marginTop:20}}>  Winners will be announced on </Text>



<View style={{flexDirection:'row'}}>

<Text style={styles.dateTextTwo}>{formattedAnnouncementDate}</Text>

<Text style={styles.dateTextTwo}>,{formattedAnnouncementTime}</Text>
</View>




<TouchableOpacity  onPress={()=>navigation.navigate('ALScreen')}>
<LinearGradient  colors={['#F0C735', '#D98F39']}  style={styles.doneButton}>

   <TouchableOpacity  onPress={()=>navigation.navigate('ALScreen')}>

   <Text  style={{alignSelf:'center',  color:'white'}}>Play again</Text>
   </TouchableOpacity>
</LinearGradient>
</TouchableOpacity>

      {/* Add more details as needed */}
    </View>
  );
};
const commonPaddingStart = '7%';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:responsiveFontSize(1.5),
    marginTop: 10,
   
  },
  numberBox: {
    width: responsiveWidth(10.5),
    height: responsiveHeight(5.5),
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    margin: responsiveWidth(1.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: SCREEN_WIDTH * 0.04,
   
    color:'black',
   
    marginTop:10
  },
  numberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  Heading: {
    fontSize: responsiveScreenFontSize(3.5),
    fontWeight: '700',
    color: '#333',
    lineHeight:44.2,
   
   
    
   
  },

  winText: {
    fontSize: 17,
    fontWeight: '400',
    color: '#333',
   
    marginStart: '7%',
    
   
  },

  winnersAnn:{fontSize:16 , 
    
    fontWeight:400},
  yourNumbers: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    
    marginStart: responsiveWidth(4.5),
    marginTop:10
    
    
   
  },
  headerTextYourNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    marginStart: 10,
    marginTop: 10,
    marginRight: 33,
    marginEnd: 32,
  },

  headerTextWinNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    marginStart: 10,
    marginStart: 10,
    marginRight: 10,
    marginEnd: 23,
  },
  NumberMatching: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10, 
    marginStart: 10,
    marginEnd: 23,
  },
  YouWon: {
    fontSize: 25,
    marginTop: 40,
    fontWeight: 'bold',
    marginBottom: 10, 
    marginStart: 10,
    marginEnd: 23,
  },
  mainCard: {
    
    
    borderRadius: 15,
    height:responsiveHeight(16),
    width:'100%',
    elevation: 3,
    backgroundColor: '#F0C735',
    marginTop:30,
    alignSelf:'center',
    borderWidth:.5,
    borderColor:'#ac76f1'
  },
  dateText: {
    fontSize:  responsiveScreenFontSize(3.5),
    
    
    marginTop:5,
   
    color:'black',

    
  },
  dateTextTwo: {
    fontSize:  responsiveScreenFontSize(3.5),
    marginLeft:responsiveWidth(1),
    
    marginTop:5,
   
    color:'black',

    
  },
  doneButton: {
   
    height:responsiveHeight(6),
    borderRadius: 10,
    marginBottom:2,
    width:'100%',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    marginTop:30,
    borderWidth:.5,
    borderColor:'#e1b411'
  },
});

export default PlayedGame;