
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialIcons } from "@expo/vector-icons";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from 'react-native-loading-spinner-overlay';
import { LinearGradient } from "expo-linear-gradient";
import Constants from 'expo-constants';


const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;

const ForgotPasswordTwo = () => {
  const [emailFor, setEmailFor] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigation = useNavigation();
  const [userData, setUserData] = useState("");
  const otpInputsRef = useRef(Array(6).fill(null));
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [mobileNumberLogin, setMobileNumberLogin] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingReset, setLoadingReset]  = useState(false)
  const [buttonPressed, setButtonPressed] = useState(false);

  const CustomPicker = ({ visible, onClose, onSelect, data }) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => onClose()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {data.map((country) => (
              <TouchableOpacity
                key={country.countryCode}
                style={styles.countryItem}
                onPress={() => {
                  onSelect(country.countryCode);
                  onClose();
                }}
              >
                <Text>{` ${country.countryCode} - ${country.country}`}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    );
  };

  useEffect(() => {
    fetchCountries();
  }, []);
  const logSelectedCountryCode = () => {
    console.log("Selected Country Code:", selectedCountry, mobileNumber);
  };

  const fetchCountries = async () => {
    try {

      const prod = "https://lottery-backend-tau.vercel.app//api/v1/admin/get-country"
    
      const dev = "https://lottery-backend-dev.vercel.app//api/v1/admin/get-country";
       
      const isStandaloneApp = Constants.appOwnership === 'expo';


      const baseURL = isStandaloneApp ? dev : prod
      const response = await axios.get(
        baseURL
      );
      const countriesData = response.data.message;
      setCountries(countriesData);
    } catch (error) {
      console.error("Error fetching countries:", error.message);
    }
  };

  const handleResetUsingEmail = async () => {

    console.log("hello",emailFor);
    try {
      // Validate email

      setLoadingReset(true)
      const userEmail = await AsyncStorage.getItem("userEmail");
      const number = `${selectedCountry}${mobileNumberLogin}`;

      const prod ="https://lottery-backend-tau.vercel.app/api/v1/user/recover-password/forget-password"

      const dev = "https://lottery-backend-dev.vercel.app/api/v1/user/recover-password/forget-password"

      const isStandaloneApp = Constants.appOwnership === 'expo';


      const baseURL = isStandaloneApp ? dev : prod
      // Make API request to the server to send OTP
      const response = await axios.post(
        baseURL,
        {
          email: emailFor,
          currentEmail: emailFor,
          mobileNumber: "",
        }
      );

      if (response.status === 200) {
        console.log("OTP sent successfully hello");
      
        const userId = response.data.message;
        setButtonPressed(true);
        setLoadingReset(false)
        // Set the user data to be used in the OTPVerificationScreen
        setUserData(userId);
        console.log("hello", userId);
        // Handle success, you may want to navigate to the OTP screen here
        // and pass necessary data like email and user ID
        // For example:
        // navigation.navigate('OTP', { email: emailFor, userId: response.data.userId });
      } else {
        console.log("Failed to send OTP");

        // Handle failure, you may want to show an error message
      }
    } catch (error) {
      console.log("Error sending OTP:", error.response.data.message);
      alert(error.response.data.message);
      // Handle unexpected errors during OTP sending
    }
  };


  const handleResetUsingMobile = async () => {
   console.log("testing...")
    try {
      // Validate email
  
 
      const userEmail = await AsyncStorage.getItem("userEmail");
      console.log("hello",userEmail);
      const number = `${selectedCountry}${mobileNumberLogin}`;

      console.log("hello",emailFor,number,userEmail);
      // Make API request to the server to send OTP
      const response = await axios.post(
        "https://lottery-backend-tau.vercel.app/api/v1/user/recover-password/forget-password",
        {
          email: "",
          currentEmail: userEmail,
          mobileNumber: number,
        }
      );

      if (response.status === 200) {
        console.log("OTP sent successfully hello");
       
        // const userId = response.data.message;
        setButtonPressed(true);
        
        // Set the user data to be used in the OTPVerificationScreen
        setUserData(userId);
       
        // Handle success, you may want to navigate to the OTP screen here
        // and pass necessary data like email and user ID
        // For example:
        // navigation.navigate('OTP', { email: emailFor, userId: response.data.userId });
      } else {
        console.log("Failed to send OTP");

        // Handle failure, you may want to show an error message
      }
    } catch (error) {
      console.log("Error sending OTP:", error.response.data.message);
      alert(error.response.data.message);
      // Handle unexpected errors during OTP sending
    }
  };


  const handleReset = async () => {
    if (emailFor) {
      await handleResetUsingEmail();
    } else if(mobileNumberLogin) {
      await handleResetUsingMobile();
    } else{
      alert("Provide Email or Mobile No:")
    }
  };



  const handleVerifyOtp = async () => {
    console.log("verify otp",otp,emailFor,userData);
    try {
      setLoading(true);
      // Validate OTP
      // You may want to add validation for each digit in the OTP array
      if (!userData) {
        
        alert("User data is null or missing userId")
        setLoading(false);
        // Handle the case where user data is not available
        return;
      }

      // Make API request to the server to verify OTP
      console.log(userData);

      
      const prod ="https://lottery-backend-tau.vercel.app/api/v1/user/recover-password/verify-otp-reset"

      const dev = "https://lottery-backend-dev.vercel.app/api/v1/user/recover-password/verify-otp-reset"

  
      const isStandaloneApp = Constants.appOwnership === 'expo';


      const baseURL = isStandaloneApp ? dev : prod

     


      const response = await axios.post(
        baseURL,
        {
          email: emailFor,
          otp: otp, // Convert the array of digits to a string
          userId: userData, // Assuming you have userId stored in userData
        }
      );

      console.log(otp); // Log the OTP for debugging purposes

      if (response.status === 200) {
        console.log("OTP verified successfully");
        // Extract email and userId from the response data
        const { email, userId } = response.data;
        // Set the user data to be used in the OTPVerificationScreen
        // setUserData({ email, userId });
        // Navigate to the ResetPassword screen
        navigation.navigate("ResetPassword", userData);
      } else {
        console.log("Failed to verify OTP");
        setLoading(false);
        // Handle failure, you may want to show an error message
      }
    } catch (error) {
      console.error("Error verifying OTP:", error.message);
      setLoading(false);
      alert(error.response.data.message);
      // Handle unexpected errors during OTP verification
      console.log(response.data);
    }
  };

  return (
    <KeyboardAwareScrollView  style={{backgroundColor:'white'}}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: 16,
          paddingTop: "12%",
          paddingRight: 16,
          backgroundColor:'white',
         
        }}
      >
        <View
          style={{
            marginBottom: hp("1%"),
            justifyContent: "flex-start",
            alignItems: "flex-start",
            alignSelf: "flex-start",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <MaterialIcons
              name="keyboard-arrow-left"
              size={35}
              color="black"
              style={{
                alignSelf: "flex-start", // Add this line,
              }}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.forgotpasswordText}>Forgot Password</Text>
        <Text style={styles.forgotPasswordTwo}>
          Reset using your email and phone{" "}
        </Text>

    <View
      style={styles.inputContainer}
      accessible={true}
      accessibilityLabel="Name Input"
    >
      <TextInput
        label="Email"
        value={emailFor}
        onChangeText={setEmailFor}
        style={styles.textInput}
        activeUnderlineColor="gray"
      />
    </View>

        <Text style={{  color: "#31A062" ,textAlignVertical:'center',marginTop:'5%'}}>OR</Text>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: '1%' }}
        >
      
<View  style={{ borderColor: 'black',
    backgroundColor: 'white',
    marginTop:15,
    width: '20%',
    marginBottom: 10,
    marginRight:15,
    height:responsiveHeight(7),
    borderWidth: 1,
    borderStyle: 'solid',
    fontSize: 15,
    borderRadius: 20,
    
    color: 'white',  
    overflow: "hidden",}}>
<TouchableOpacity onPress={() => setModalVisible(true)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> 
      <Text style={styles.selectedCountryText}>
        {selectedCountry || 'Ext'}
      </Text>
    </TouchableOpacity>
      <CustomPicker
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={(value) => setSelectedCountry(value)}
        data={countries}
      />
</View>

          <View
           style={styles.MobileinputContainer}
          >
            <TextInput
             activeUnderlineColor="gray"
              label="Mobile Number"
              style={styles.textInput}
              keyboardType="phone-pad" // Use 'phone-pad' keyboard type for mobile numbers
              value={mobileNumberLogin}
              onChangeText={setMobileNumberLogin}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          </View>
        </View>


<TouchableOpacity
  onPress={handleReset}
  disabled={buttonPressed}
  style={{
    backgroundColor: buttonPressed ? "rgba(49, 160, 98, 0.33)" : "#31A062", // Change color when pressed
    width: '100%',
    height: hp(7),
    marginVertical: 10,
    marginTop: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }}
>
  {loadingReset ? (
    <ActivityIndicator color="#FFFFFF" size="small" />
  ) : (
    <Text style={styles.doneButtonText}>Send Link</Text>
  )}
</TouchableOpacity>

        <Text style={{  fontSize: 25,fontWeight:700 ,marginTop:'5%',marginBottom:'4%'}}>ENTER OTP</Text>

        <View style={styles.otpContainer}>
          {[1, 2, 3, 4, 5, 6].map((digit, index) => (
            <View
              key={index}
              style={{
                borderColor: "black",

                backgroundColor: "white",
                width: responsiveWidth(13),
                borderWidth: 1,
                alignItems: "center",
                borderStyle: "solid",
                fontSize: 15,
                height: hp(7),
                borderRadius: 15,
                margin: responsiveHeight(0.4),
              
                color: "white", // Text color
                overflow: "hidden",
              }}
            >
              <TextInput
                key={digit}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                value={otp[index]}
                onChangeText={(text) => {
                  const newOtp = [...otp];
                  newOtp[index] = text;
                  setOtp(newOtp.join(""));

                  // Move cursor to the next OTP box
                  if (text !== "" && index < 5) {
                    // Use the ref to focus on the next TextInput
                    otpInputsRef[index + 1].focus();
                  }
                }}
                ref={(input) => (otpInputsRef[index] = input)}
              />
            </View>
          ))}
        </View>

<TouchableOpacity onPress={handleVerifyOtp}  style={{
        backgroundColor: '#31A062',
        width: '100%',
        height: hp(7),
        marginVertical: 10,
        marginTop: 15,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
      }}>


<LinearGradient colors={["#31A062", "#31A062"]}   style={{
        backgroundColor: '#31A062',
        width: '100%',
        height: hp(7),
        marginVertical: 10,
        marginTop: 15,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
      }}>
        <TouchableOpacity onPress={handleVerifyOtp}>
        {loading ? (
    <ActivityIndicator color="#FFFFFF" size="small" />
  ) : (
    <Text style={styles.doneButtonText}>Reset Password</Text>
  )}
        </TouchableOpacity>
      </LinearGradient>


</TouchableOpacity>


      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  circleText: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 100,
    height: 100,
    textAlign: "center",
    lineHeight: 100,
    fontSize: 20,
    marginTop: -20,
  },

  MobileinputContainer: {
    borderColor: 'black',
    backgroundColor: 'white',
    marginTop: hp(2),
    width: '75%',
    marginBottom: hp(1.5),
    height: hp(7),
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: wp(5),
    overflow: "hidden",
  },

  inputContainer: {
    borderColor: 'black',
    backgroundColor: 'white',
    marginTop: hp(2),
    width: '100%',
    marginBottom: hp(1.5),
    height: hp(7),
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: wp(5),
    overflow: "hidden",
  },
  textInput: {
    color: 'black',
    backgroundColor: 'white',
    height: hp(7),
    fontSize: wp(4),
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 25,
  },
  doneButtonText: {
    color: "#fff",
    fontSize: SCREEN_WIDTH * 0.04,
    alignSelf: "center",
  },
  forgotpasswordText: {
    // Add this line to align text to the left
    width: 354,
    minHeight: hp("7%"),

    marginLeft: "10%",

    fontSize: responsiveFontSize(3.5), // Adjust the font size as needed
    fontWeight: "bold",
  },
  forgotPasswordTwo: {
    marginStart: "10%",
    fontSize: 17,
    width: 354,
    height: 22,
    marginBottom: '10%',

    fontSize: 13,

    textAlign: "left", // Add this line to align text to the left
  },

  otpInput: {
    textAlign: "center",
    backgroundColor: "white",
    height: 60.5,
  },
  selectedCountryText: {
    fontSize: wp(4),
    paddingVertical: 10,
    paddingHorizontal: 10,
    
    borderColor: 'gray',
   
    backgroundColor: 'white',
    height: 51,
    marginTop: 7,
    marginRight: 10,
   
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    selectedCountryText: {
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      backgroundColor: 'white',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      elevation: 5,
    },
    countryItem: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
    },
    elevation: 5,
  },
  countryItem: {
    paddingVertical: 10,

    borderBottomColor: "gray",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ForgotPasswordTwo;
