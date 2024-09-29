import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const ChooseLevel = () => {


    const navigation = useNavigation();
  return (
    <View>
    <Text style={{ marginTop: 120,marginStart:20, fontWeight: 'bold', fontSize: 35 }}>
  
  Choose Level
</Text>
<Text style={{ marginTop: 10,marginStart:20,fontSize: 20 }}>
  
  You have not any games with us yet,
</Text>


<Text style={{ marginTop: 10,marginStart:20,fontSize: 20 }}>
  
 get started
</Text>



<Button
        style={{ marginBottom: 15, marginTop: 75, width: '90%', alignSelf: 'center' }}
        mode="contained"
       onPress={()=>navigation.navigate('BuyCredits')}
      >
        Level 3 : 6 credits
      </Button>

      <Button
        style={{ marginBottom: 15, width: '90%', alignSelf: 'center' }}
        mode="contained"
       
      >
        Level 2 : 4 credits
      </Button>

      <Button
        style={{ marginBottom: 15,  width: '90%', alignSelf: 'center' }}
        mode="contained"
       
      >
        Level 1: 2 credits
      </Button>
    </View>
  )
}

export default ChooseLevel

const styles = StyleSheet.create({})