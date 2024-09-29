import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity,Linking  } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

const GameRules = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Handle submit logic here
    setSubmitted(true);
  };

  const handleUrlPress = () => {
    // Open the URL in the default browser
    Linking.openURL('http://www.afrolottery.com');
  };

  const navigation = useNavigation();

  return (


    
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Game Rules</Text>
      <View style={styles.content}>
        <Text style={styles.rule}>
          Users are allowed to enter 6 numbers that are not repeated.
        </Text>
        <Text style={styles.rule}>
          Selected numbers are then sorted in ascending order.
        </Text>
        <Text style={styles.rule}>
          Upon accepting the entered 6 numbers, press the submit button to finish the game.
        </Text>
        <Text style={styles.rule}>
          User can't make any changes after clicking the submit button.
        </Text>
        <Text style={styles.rule}>
  If there are multiple winners the winning amount will be split,winning amount is based on the level played
</Text>

       
        <Text style={styles.rule}>
          Game results will be announced in the game page, for more details visit{' '}
          <Text style={styles.link} onPress={handleUrlPress}>www.afrolottery.com</Text>.
        </Text>
        <Text style={styles.rule}>
          The day of a lucky draw is shown after finishing a game.
        </Text>
        <Text style={styles.rule}>
          For further support, please see the FAQ section or contact us through the app.
        </Text>
      </View>
   

   

      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
         <TouchableOpacity
        
            onPress={() => navigation.navigate("MainScreen")}
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
              <Text style={{ color: "white" }}>Cancel</Text>
            </View>
         
        </LinearGradient>
        </TouchableOpacity>



        <TouchableOpacity  onPress={() => navigation.navigate("ALScreen")}>
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
          
              <Text style={{ color: "white" , alignSelf:"center"}}>OK</Text>

              </View>
            
         
        </LinearGradient>
        </TouchableOpacity>
      </View>

  
        
      
    </ScrollView>
  );
}

export default GameRules;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: wp(5),
    marginTop: hp(2),
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  heading: {
    fontSize: hp(3),
    fontWeight: 'bold',
    marginBottom: hp(4),
    marginTop: hp(3),
    alignSelf: 'center',
  },
  content: {
    marginBottom: hp(3),
  },
  rule: {
    fontSize: hp(2),
    marginBottom: hp(2),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
});
