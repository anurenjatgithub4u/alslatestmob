import { StyleSheet, Text, View , Image,ScrollView ,TouchableOpacity,ActivityIndicator} from 'react-native'
import React, {useState,useEffect} from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from "expo-status-bar";
import { responsiveFontSize, responsiveHeight ,responsiveWidth} from "react-native-responsive-dimensions";
import Constants from 'expo-constants';


const PurchaseScreen = () => {

  const [loading, setLoading] = useState(true);
 
  const navigation = useNavigation();
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      const storedAccessToken = await AsyncStorage.getItem('accessToken');
      const userId = await AsyncStorage.getItem('userId');
      // const userId = "65939884a0aa91a1529e275c";
      const prod = `https://lottery-backend-tau.vercel.app/api/v1/user/get-purchases/${userId}`;

      const dev = `https://lottery-backend-dev.vercel.app/api/v1/user/get-purchases/${userId}`;


      const isStandaloneApp = Constants.appOwnership === 'expo';


      const baseURL = isStandaloneApp ? dev : prod

      try {
        const token = storedAccessToken; // Replace with your actual authorization token

        const response = await fetch(baseURL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${storedAccessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching purchases: ${response.status}`);
        }

        const data = await response.json();
        console.log("Purchases:", data);
        setPurchases(data.message); // Set the purchases data in the state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching purchases:", error.message);
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const colors = ['#add8e6', '#90ee90', '#ffff99', '#ffc0cb'];

  const getTimeAgoText = (purchaseDate) => {
    const purchaseDateObj = new Date(purchaseDate);
    const currentDate = new Date();
    const timeDifference = currentDate - purchaseDateObj;
    const minutesAgo = Math.floor(timeDifference / (1000 * 60));

    if (minutesAgo < 1) {
      return 'Just now';
    } else if (minutesAgo === 1) {
      return '1 min ago';
    } else if (minutesAgo < 60) {
      return `${minutesAgo} min ago`;
    } else if (minutesAgo < 120) {
      return '1 hr ago';
    } else if (minutesAgo < 1440) {
      return `${Math.floor(minutesAgo / 60)} hr's ago`;
    } else {
      return 'a day ago';
    }
  };


  return (
    <View style={{ flex:1, paddingLeft: 16 , paddingRight:16 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
         marginBottom:'5%',
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
        <Text style={{ fontWeight: '700', fontSize: 17,textAlign: 'center' ,flex: 1}}>My Purchases</Text>
      </View>

  
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView style={{ marginBottom: 100 }}>
        {purchases.slice().reverse().map((purchase, index) => (
          <View key={purchase._id} style={[styles.cardContainer, { backgroundColor: colors[index % colors.length] }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Image
                source={{
                  uri: 'https://www.europeanbusinessreview.com/wp-content/uploads/2020/01/ThinkstockPhotos-172587244-1.jpg',
                }}
                style={styles.profilePicture}
              />

              <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 10 }}>
                <Text style={styles.detailsText}>You Purchased {purchase.creditsPurchased}</Text>
                <Text style={styles.detailsTextTwo}>Via {purchase.modeOfTransaction}</Text>
              </View>
              <Text style={styles.timeText}>{getTimeAgoText(purchase.date)}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      )}
    </View>
  );
}


const styles = StyleSheet.create({

    container: {
        flexDirection: 'row', // Make sure the children are laid out in a row
        alignItems: 'center', // Align children vertically in the center
        
      },

      
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 1,
    marginTop:15,
    height:100,
   
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.10,
    shadowRadius: 3.84,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(1),
  },


      myPurchase: {
        fontSize: 34,
        fontWeight: '700',
        marginLeft:'5%'
        
      },
      
      profilePicture: {
        width: 65,
        height: 60,
        borderRadius: 20,
        
        paddingTop:80,
        
        paddingLeft:32,
        paddingStart:32,
        
      },

      detailsText:{
        marginStart:10,
        fontSize:16,
        fontWeight:'400',
        alignSelf:'flex-start',
        
        
      },

      detailsTextTwo:{
        marginStart:10,
        fontSize:16,
        fontWeight:'400',
        alignSelf:'flex-start',
        marginBottom:'10%'
        
      },
      underline: {
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        width:'90%',
        alignSelf:'center',
        marginTop:10
      },
  timeText:{
    fontSize:13,
    fontWeight:'300',
    marginBottom:'15%',
    paddingLeft:10,
    marginLeft:'5%'
  }

})
export default PurchaseScreen

