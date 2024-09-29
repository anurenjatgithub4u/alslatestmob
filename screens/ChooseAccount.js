import React from 'react';
import { View } from 'react-native';
import { Appbar, Button, Card, Text } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ChooseAccount = () => {

  const navigation = useNavigation();
  return (
    <View>
      {/* Top App Bar */}
      <Appbar.Header>
        <Appbar.Content title="Choose Account" />
      </Appbar.Header>

      {/* Card */}
      <Card  style={{ marginTop: 50,height:150 ,margin:10}}>
        <Card.Content>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AntDesign name="creditcard" size={24} color="black" />
        <Text  style={{marginLeft:10}}>Account 1</Text>
        </View>

        <Text  style={{marginTop:10}}>Bank Name:</Text>

        <Text  style={{marginTop:10}}>Account Number:</Text>
        </Card.Content>
      </Card>

      <Button   onPress={() => navigation.navigate('AddAccount')} style={{marginTop:20}}>Add Account</Button>
    </View>
  );
};

export default ChooseAccount;
