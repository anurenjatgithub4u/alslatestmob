// import { useState } from "react";
// import { RootSiblingParent } from "react-native-root-siblings";
// import Toast from "react-native-root-toast";
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TextInput,
//   Button,
// } from "react-native";
// import { Paystack,paystackProps,PayStackWebView } from "react-native-paystack-webview";
// import { useRef } from 'react';


// const PayStack = () => {
//     const paystackWebViewRef = useRef<paystackProps.PayStackRef>(); 
    
//   return (
//     <View style={{flex: 1}}>
//     <Paystack
//       paystackKey="pk_test_6fb52a435239f6b4b2ed226958d5a7603406ce0b"
//       billingEmail="paystackwebview@something.com"
//       amount={'25000.00'}
//       onCancel={(e) => {
//         // handle response here
//       }}
//       onSuccess={(res) => {
//         // handle response here
//       }}
//       ref={paystackWebViewRef}
     
//     />
// <TouchableOpacity onPress={()=> paystackWebViewRef.current.startTransaction()}>
//           <Text>Pay Now</Text>
//         </TouchableOpacity>
     
//     </View>
//   );
// }




// export default PayStack;
import React, { useRef } from 'react';
import  { Paystack , paystackProps}  from 'react-native-paystack-webview';
import { View, TouchableOpacity,Text } from 'react-native';

export default function PayStack(){
  const paystackWebViewRef = useRef(paystackProps.PayStackRef); 

  return (
    <View style={{flex: 1 , marginTop:50}}  >
      <Paystack
        paystackKey="pk_test_6fb52a435239f6b4b2ed226958d5a7603406ce0b"
        billingEmail="paystackwebview@something.com"
        amount={'25000.00'}
        onCancel={(e) => {
          // handle response here
        }}
        onSuccess={(res) => {
          console.log(res)
        }}
        ref={paystackWebViewRef}
      />

        <TouchableOpacity onPress={()=> paystackWebViewRef.current.startTransaction()}>
          <Text>Pay Now</Text>
        </TouchableOpacity>
      </View>
  );
}