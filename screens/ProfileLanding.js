import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {  Button } from 'react-native-paper';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from "expo-status-bar";



const ProfileLandingScreen = () => {
    const navigation = useNavigation();
  

  

    
    const imageUrl = 'https://th.bing.com/th/id/R.dba7c2e0beae32f5dcc9bb7a11bcfc9a?rik=iVMsLRscBKLqYw&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fdollar-signs-transparent%2fdollar-signs-transparent-19.png&ehk=MnJi%2b9rQhoH1dgkMOR3qurQN7XV7SzLe9IvHncEFfeM%3d&risl=&pid=ImgRaw&r=0';
    
  
    return (
      <View style={styles.container}>
        
        <StatusBar backgroundColor={"transparent"} translucent />

        <Image source={{ uri: imageUrl }} style={{ width: '50%', height: hp(40),marginTop:hp(10) }} />
        <Text style={styles.welcomeText}>Win Big With</Text>
        <Text style={styles.welcomeTextTwo}>Afro Lottery System</Text>
  
       
        <Text style={styles.noGamesText}>
        Six numbers can change your life 
        Get Started Today and try your luck with us
        </Text>
  
        
        <Button  onPress={() => navigation.navigate('Register')} 
        
        contentStyle={{
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        style={{
          backgroundColor: '#31A062',
          width: '100%',
          marginVertical: 10,
          marginTop: 15,
        }}>
       Create Account
      </Button>

      <TouchableOpacity  onPress={()=> navigation.navigate('Login')}>
      <Text style={styles.login}>Login</Text>
      </TouchableOpacity>

      
  
      
        
   
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    height:hp(100),
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
     
    marginTop:20
  },
  welcomeTextTwo: {
    fontSize: 24,
    fontWeight: 'bold',
     
   
  },
  login: {
    fontSize: 17,
    color:'#31A062'
 
     
   
  },
  noGamesText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    marginTop:20
  },
  startPlayingButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  viewPreviousButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileLandingScreen;
