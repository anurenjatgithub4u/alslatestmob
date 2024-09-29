import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MyCardComponent from '../ALSScreen';
import HelpScreen from '../HelpScreen';
import HelpDetailScreen from '../HelpDetailScreen';

const Stack = createStackNavigator();

function HelpNavigator() {
  console.log(Stack);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login">
      <Stack.Screen name="Hel" component={HelpScreen} />
      <Stack.Screen name="HelpDetail" component={HelpDetailScreen} />
    </Stack.Navigator>
  );
}

export default HelpNavigator;