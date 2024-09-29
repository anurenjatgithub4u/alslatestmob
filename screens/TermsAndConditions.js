import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View,useWindowDimensions  } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HTML from 'react-native-render-html';
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const TermsAndConditions = () => {
    const [termsContent, setTermsContent] = useState(null);
    const windowWidth = useWindowDimensions().width;
    const navigation = useNavigation();
    useEffect(() => {
      const fetchTermsAndConditions = async () => {
        try {
          const response = await fetch('https://lottery-backend-tau.vercel.app/api/v1/admin/terms-conditions');
          const data = await response.json();
  
          if (data.statusCode === 200 && data.data) {
            setTermsContent(data.data.content);
          } else {
            console.error('Failed to fetch terms and conditions:', data.message);
          }
        } catch (error) {
          console.error('Error fetching terms and conditions:', error.message);
        }
      };
  
      fetchTermsAndConditions();
    }, []);
  
    return (
      <ScrollView style={styles.container}>



        <TouchableOpacity  onPress={()=>{navigation.goBack()}}>
    <MaterialIcons
            name="keyboard-arrow-left"
            size={35}
            color="black"
            style={{
              alignSelf: "flex-start", // Add this line,
            }}
          />

</TouchableOpacity>
        {termsContent ? (
          <HTML source={{ html: termsContent }} contentWidth={windowWidth} />
        ) : (
          <Text>Loading terms and conditions...</Text>
        )}


      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop:'12%'
    },
  });
  
  

export default TermsAndConditions;
