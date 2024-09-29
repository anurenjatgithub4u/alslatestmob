


import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,ActivityIndicator,Dimensions } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import Constants from 'expo-constants';

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;


const ResetPassword = ({route}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const userData = route.params;
  const [loading, setLoading] = useState(false);

  console.log(userData)
  const [showPassword, setShowPassword] = useState(false);
  const [newshowPassword, setNewShowPassword] = useState(false);
  const navigation = useNavigation();
  const userId = userData;
  // useEffect(() => {
  //   console.log('userData:', userData);
  // }, [userData]);
console.log(userId);

  const handleResetPassword = async () => {
    try {
      // Check if passwords match
      setLoading(true);
      if (newPassword !== confirmNewPassword) {
        alert('Passwords do not match');
        setLoading(false);
        return;
      }
      
      // Make API request to update the password

      const prod ='https://lottery-backend-tau.vercel.app/api/v1/user/recover-password/reset-password'

      const dev ='https://lottery-backend-dev.vercel.app/api/v1/user/recover-password/reset-password'


   
      const isStandaloneApp = Constants.appOwnership === 'expo';


      const baseURL = isStandaloneApp ? dev : prod

      const response = await axios.post(baseURL, {
        userId: userId, // replace with the actual user ID
        password: newPassword,
        
      });

      if (response.status === 200) {
        console.log('Password updated successfully');
        navigation.navigate('Login');
        // Handle success, you may want to navigate to the login screen or display a success message
      } else {
        console.log('Failed to update password');
        
        // Handle failure, you may want to show an error message to the user
      }
    } catch (error) {
      console.error('Error updating password:', error.message);
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 16 , backgroundColor:'white' }}>




<TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}  style={{
     
     alignSelf:'flex-start'
   }}>
<MaterialIcons name="keyboard-arrow-left" size={35} color="black" style={{
     
     alignSelf:'flex-start',marginTop:50
   }}/>
</TouchableOpacity>

       <Text  style={styles.createaccountText}>Reset Password</Text>
    <Text  style={styles.createaccountTextTwo}>Enter Your Password and Confirm</Text>




<View
     style={{ borderColor: 'black',
     backgroundColor: 'white',
     marginTop:15,
     width: '100%',
     marginBottom: 10,
     height:59.5,
     borderWidth: 1,
     borderStyle: 'solid',
     fontSize: 15,
     borderRadius: 25,
     
     color: 'white',  
     overflow: "hidden",}}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          label="New Password"
          style={{
            color: 'white',
            width: '90%', // Adjust the width as needed
            height: 60.5,
            borderBottomColor: 'white',
            borderBottomWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopWidth: 0,
            backgroundColor: 'white',
            borderRadius: 20,
            marginTop: 0.2,
            overflow: 'hidden',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
          activeUnderlineColor="gray"
          secureTextEntry={!showPassword}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{ padding: responsiveWidth(3), position: 'absolute', right: 0, zIndex: 1 }}
        >
          <FontAwesome
            name={showPassword ? 'eye-slash' : 'eye'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>



<View
      style={{ borderColor: 'black',
      backgroundColor: 'white',
      marginTop:15,
      width: '100%',
      marginBottom: 10,
      height:60,
      borderWidth: 1,
      borderStyle: 'solid',
      fontSize: 15,
      borderRadius: 25,
      
      color: 'white',  
      overflow: "hidden",}}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          label="Reset New Password"
          style={{
            color: 'white',
            width: '90%', // Adjust the width as needed
            height: 60.5,
            borderBottomColor: 'white',
            borderBottomWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopWidth: 0,
            backgroundColor: 'white',
            borderRadius: 20,
            marginTop: 0.2,
            overflow: 'hidden',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
          activeUnderlineColor="gray"
          secureTextEntry={!newshowPassword}
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
        />
        <TouchableOpacity
          onPress={() => setNewShowPassword(!newshowPassword)}
          style={{ padding: responsiveWidth(3), position: 'absolute', right: 0, zIndex: 1 }}
        >
          <FontAwesome
            name={newshowPassword ? 'eye-slash' : 'eye'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>

      {/* Submit Button */}


<TouchableOpacity onPress={handleResetPassword} style={{
        backgroundColor: '#31A062',
        width: '100%',
        height:60,
        marginVertical: 10,
        marginTop: 15,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
      }}>




<LinearGradient colors={["#31A062", "#31A062"]}   style={{
        backgroundColor: '#31A062',
        width: '100%',
        height:60,
        marginVertical: 10,
        marginTop: 15,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
      }}>
        <TouchableOpacity onPress={handleResetPassword}>
        {loading ? (
    <ActivityIndicator color="#FFFFFF" size="small" />
  ) : (
    <Text style={styles.doneButtonText}>Reset Password</Text>
  )}
        </TouchableOpacity>
      </LinearGradient>

</TouchableOpacity>





    
    </View>
  );
};

const styles = StyleSheet.create({
  circleText: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: 100,
    height: 100,
    textAlign: 'center',
    lineHeight: 100,
    fontSize: 20,
    marginTop: -20,
  },
  createaccountText: {
    
   
    // Add this line to align text to the left
    width: 354,
    height: 41,
    top: 33,
    left: 30,

    fontSize: 34, // Adjust the font size as needed
    fontWeight: 'bold',
    marginBottom:45
  },
  doneButtonText: {
    color: "#fff",
    fontSize: SCREEN_WIDTH * 0.04,
    alignSelf: "center",
  },
  createaccountTextTwo: {
    
    fontSize: 17,
    width: 354,
    height: 22,
    top: 1,
    left: 30,
  
    fontSize: 13,
    marginBottom: 20,
    textAlign: 'left', // Add this line to align text to the left
  },
});

export default ResetPassword;

