

import { StyleSheet, Text, View ,TouchableOpacity,Image,ScrollView,ActivityIndicator} from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";
import Constants from 'expo-constants';



const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  const colors = ['#add8e6', '#90ee90', '#ffff99', '#ffc0cb'];
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const storedAccessToken = await AsyncStorage.getItem('accessToken');
          const userIds = await AsyncStorage.getItem('userId');



          const prod = `https://lottery-backend-tau.vercel.app/api/v1/user/get-notifications/${userIds}`;

          const dev = `https://lottery-backend-dev.vercel.app/api/v1/user/get-notifications/${userIds}`;
     
          const isStandaloneApp = Constants.appOwnership === 'expo';


      const baseURL = isStandaloneApp ? dev : prod
          
          const response = await fetch(baseURL, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${storedAccessToken}`,
            },
          });
  
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
  
          const data = await response.json();
          setNotifications(data.message || []);
          console.log("dataaaa", data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching notifications:', error.message);
          setLoading(false);
        }
      };
  
      // Call fetchNotifications when the component mounts
      fetchNotifications();
    }, []);


    const truncateText = (text, wordsPerLine) => {
      const words = text.split(' ');
      let lines = [];
    
      for (let i = 0, j = 0; i < words.length && j < wordsPerLine.length; j++) {
        const line = words.slice(i, i + wordsPerLine[j]).join(' ');
        lines.push(line);
        i += wordsPerLine[j];
      }
    
      return lines.join('\n');
    };


    
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
    // Example usage:

    return (
      <View  style={{padding:5,paddingRight:'5%',paddingLeft:'5%'}}>
      <TouchableOpacity onPress={() => navigation.navigate('Hom')}>
        <MaterialIcons
          name="keyboard-arrow-left"
          size={35}
          color="black"
          style={{ paddingTop: '12%' }}
        />
      </TouchableOpacity>
  
  
      <Text style={styles.myPurchase}>Notifications</Text>
  
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView style={{ marginBottom: 150 }}>
        {notifications.map((notification, index) => {
          // Calculate color index based on the length of the colors array
          const colorIndex = index % colors.length;
          return (
            <View key={index} style={[styles.cardContainer,  { backgroundColor: notification.content === 'You are the winner' ? '#add8e6' : colors[colorIndex] }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {notification.content === 'You are the winner' ? (
                    <Image
                      source={{
                        uri: 'https://cdn.picpng.com/award/award-gold-winner-badge-92377.png',
                      }}
                      style={styles.profilePicture}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: 'https://www.europeanbusinessreview.com/wp-content/uploads/2020/01/ThinkstockPhotos-172587244-1.jpg',
                      }}
                      style={styles.profilePicture}
                    />
                  )}
  
                  <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Text style={styles.detailsText}>
                      {truncateText(notification.content, [4, 3, 3])}
                    </Text>
                  </View>
                </View>
  
                <Text style={styles.timeText}>{getTimeAgoText(notification.createdAt)}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
      
      )}
    </View>
    
    );
}

export default Notification

const styles = StyleSheet.create({



  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingLeft: responsiveHeight(2),
    paddingRight: responsiveHeight(2),
    paddingBottom: responsiveHeight(1),
    paddingTop:responsiveHeight(1),
    marginTop:responsiveHeight(2),
    height:responsiveHeight(13),
   
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

  container: {
      flexDirection: 'row', // Make sure the children are laid out in a row
      alignItems: 'center', // Align children vertically in the center
      
    },


    myPurchase: {
      fontSize: responsiveFontSize(4),
      fontWeight: '700',
      marginStart:'5%',
      marginBottom:'2%'
      
    },
    
    profilePicture: {
      width: responsiveWidth(15),
      height: responsiveHeight(10),
      borderRadius: 20,
      alignSelf:'center',
      justifyContent:"center",
      alignItems:'center',
     
      
  
    },

    detailsText:{
      marginStart:responsiveWidth(5),
      fontSize:responsiveFontSize(2),
      fontWeight:'400',
      alignSelf:'center',
      marginBottom:responsiveWidth(1)
      

    },
    underline: {
      borderBottomColor: 'black',
      borderBottomWidth: 0.3,
      width:'90%',
      alignSelf:'center',
      marginTop:10
    },
timeText:{
  fontSize:responsiveFontSize(1.5),
  fontWeight:'300',
  marginBottom:responsiveWidth(12),
  marginRight:'1%'
  
 
}

})