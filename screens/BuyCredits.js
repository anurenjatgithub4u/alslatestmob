import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BuyCredits = () => {
  const navigation = useNavigation();
  const [userCredits, setUserCredits] = useState(0);

  useEffect(() => {
    // Fetch user credits from AsyncStorage
    const fetchUserCredits = async () => {
      try {
        const credits = await AsyncStorage.getItem('userCredits');
        setUserCredits(parseInt(credits) || 0);
        console.log("user",userCredits)
      } catch (error) {
        console.error('Error fetching user credits:', error.message);
      }
    };

    fetchUserCredits();
  }, []); // Run the effect only once when the component mounts

  return (
    <View>
      <Text
        style={{
          marginTop: 120,
          marginStart: 20,
          fontWeight: "bold",
          fontSize: 35,
        }}
      >
        Hi JOHN
      </Text>

      <Text style={{ marginTop: 10, marginStart: 20, fontSize: 18 }}>
        You do not have enough credits to play
      </Text>

      <Text style={{ marginTop: 10, marginStart: 20, fontSize: 18 }}>
        the game
      </Text>
      <Text style={{ marginTop: 10, marginStart: 20, fontSize: 18 }}>
        ALS continental level 3 requires 5 credits
      </Text>

      <Text style={{ marginTop: 10, marginStart: 20, fontSize: 18 }}>
        to play
      </Text>

      <Text
        style={{ marginTop: 20, marginStart: 20, fontSize: 23, fontWeight: "bold" }}
      >
        Your credits: {userCredits}
      </Text>

      <Button
        style={{ marginBottom: 15, marginTop: 75, width: '90%', alignSelf: 'center' }}
        mode="contained"
        onPress={() => navigation.navigate('PaymentMethodPage')}
      >
        Level 3: 6 credits
      </Button>
    </View>
  );
};

export default BuyCredits;

const styles = StyleSheet.create({});

