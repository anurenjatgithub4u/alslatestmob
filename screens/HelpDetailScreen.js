import React from 'react';
import { View, Text, TextInput,StyleSheet ,TouchableOpacity , Dimensions } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper'; 
import { FontAwesome5 } from '@expo/vector-icons'; // Make sure to import FontAwesome5 from the correct package

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

const SCREEN_WIDTH = width < height ? width : height;

 // Make sure to import FontAwesome5 from the correct package

 const HelpDetailScreen = () => {


  const navigation = useNavigation();
  const route = useRoute();
  const faqDetails = route.params?.faqDetails || {};
  const handleCardPress = () => {
    // Navigate to the FAQ screen
    navigation.navigate('Faq');
  };
  return(
 


<View style={{ justifyContent: 'flex-start', paddingLeft:16,paddingTop:'12%',paddingRight:16}}>

<StatusBar backgroundColor={"transparent"} translucent />
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
         
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Hel")}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={35}
            color="black"
            style={{
              alignSelf: "flex-start", // Add this line,
            }}
          />
        </TouchableOpacity>


        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft:'35%'
            
          }}
        >
          <EvilIcons name="bell" size={30} style={styles.bell} color="black" />
          <AntDesign
            name="logout"
            size={19}
            style={styles.logout}
            color="black"
          />
          </View>
        </View>
      </View>

<Text style={{ fontSize: 31, fontWeight: '700', marginLeft: '5%' }}>Help & FAQs</Text>

<Text style={styles.textStyle}>{faqDetails.heading}</Text>
      <Text style={styles.textStyleTwo}>{faqDetails.paragraph}</Text>

</View>

  )
 
 };

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 40, // Adjust padding as needed
    width: '100%',
    marginTop: 50,
    height:140
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

  searchContainer: {
    width: 343,
    height: 41,
    marginBottom:'5%',
    marginTop:'10%',
    borderRadius: 20,
    borderWidth: 0.5,
    marginLeft: '5%', 
    zIndex: 1, // Ensures the search field is above other elements
    backgroundColor: 'white', // Optional background color
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
    marginLeft:'5%'
   
  },
  
});
export default HelpDetailScreen;
