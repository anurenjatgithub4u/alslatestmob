
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import React ,{useEffect,useState} from 'react';
import { BackHandler } from 'react-native';
import { StyleSheet ,Image} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import * as LocalAuthentication from 'expo-local-authentication';

// Import your LocalAuthenticationScreen component

const LocalAuthenticationScreenWrapper = React.memo(({onAuthenticate }) => {  // useEffect(() => {
  const handleExitButtonPress = () => {
    // Perform any cleanup or additional logic if needed before exiting the app

    // To exit the app, you can use BackHandler.exitApp()
    BackHandler.exitApp();
  };
  const [isBioMetricSupported, setIsBioMetricSupported] = useState(false);

  
  useEffect(() => {


    (async ()  => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBioMetricSupported(compatible);

    })
  })

  function onAuthenticate() {
    const auth = LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate',
      fallbackLabel: 'Enter Password',
    });

    auth.then(result => {
      if (result.success) {
        navigation.navigate("MainScreen")
        console.log(result);

        // Navigate to MainScreen upon successful authentication
       
      }else if (result.error === 'not_enrolled') {
        // The device doesn't support lock-based authentication
        navigation.navigate("MainScreen")
        // You might want to show an alternative authentication method or take other actions here
      } else {
        // Handle authentication failure
        console.log(result);
        // You might want to show an error message or take other actions here
      }
    });
  }

  const navigation = useNavigation()
  const imageUrl = 'https://th.bing.com/th/id/R.dba7c2e0beae32f5dcc9bb7a11bcfc9a?rik=iVMsLRscBKLqYw&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fdollar-signs-transparent%2fdollar-signs-transparent-19.png&ehk=MnJi%2b9rQhoH1dgkMOR3qurQN7XV7SzLe9IvHncEFfeM%3d&risl=&pid=ImgRaw&r=0';

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
      }}
    >

<Image source={{ uri: imageUrl }} style={{ width: '50%', height: responsiveHeight(40),marginTop:responsiveHeight(5) }} />

      <Text style={{ fontSize: responsiveFontSize(3.5), fontWeight: "bold" }}>
        Win big With{" "}
      </Text>

      <Text style={{ fontSize: responsiveFontSize(3.5), fontWeight: "bold" }}>
        Afro lottery system
      </Text>

      <Text
        style={{
          fontSize: responsiveFontSize(1.6),
          marginTop: responsiveHeight(4),
        }}
      >
        Six Numbers Can Change Your Life
      </Text>

      <Text style={{ fontSize: responsiveFontSize(1.6) }}>
        Get started today and try your luck with us{" "}
      </Text>

      <Button
        style={{ backgroundColor: "#31A062", marginTop: responsiveHeight(6) ,width:'80%',height:responsiveHeight(7),alignItems:'center',justifyContent:'center'}}
        onPress={onAuthenticate}
      >
        <Text style={{ color: "white" }}>Play</Text>
      </Button>

    
    </View>
  );
})
export default LocalAuthenticationScreenWrapper;

