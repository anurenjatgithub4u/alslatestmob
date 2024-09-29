import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const PaymentPageGateWay = () => {
  const [cardHolderName, setCardHolderName] = useState('');

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        Select Payment Method
      </Text>

      <Text>Card Holder Name</Text>
      <TextInput
        value={cardHolderName}
        onChangeText={(text) => setCardHolderName(text)}
        placeholder="Enter card holder name"
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginTop: 8,
          paddingLeft: 8,
        }}
      />

      
    </View>
  );
};

export default PaymentPageGateWay;
