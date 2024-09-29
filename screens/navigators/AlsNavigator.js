import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../HomeScreen';
import MyCardComponent from '../ALSScreen';
import PlayedGame from '../PlayedGame';
import GameDetailsPage from '../GameDetailsPage';
import GameScreen from '../GameScreen';
import GameDetailsPageTwo from '../GameDetailsPageTwo';

const Stack = createStackNavigator();

function ALSNaviagator() {


  // const navigateToGameDetailsPage = () => {
  //   navigation.dispatch(
  //     CommonActions.navigate({
  //       name: 'Game',
  //       params: {
  //         screen: GameDetailsPage,
  //         params: {
  //           // Your game details here
  //         },
  //       },
  //     })
  //   );
  // };

  const navigateToPlayedGame = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Gam',  // Fix the typo here
        params: {
          screen: GameScreen,
          params: {
            // Your PlayedGame details here
          },
        },
      })
    );
  };


  console.log(Stack);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login">
       <Stack.Screen name="Hom" component={HomeScreen} navigateToPlayedGame={navigateToPlayedGame} />

      
      <Stack.Screen name="GameDetailsPageTwo" component={GameDetailsPageTwo} />

      
     
            <Stack.Screen name="PlayedGame" component={PlayedGame}  options={{ headerShown: false }} />

    </Stack.Navigator>
  );
}

export default ALSNaviagator;