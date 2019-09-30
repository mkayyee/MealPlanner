import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import AuthLoading from '../views/AuthLoading';
import Welcome from '../views/Welcome';
import Home from '../views/Home';



const StackNavigator = createStackNavigator(
    {
      Welcome: {
        screen: Welcome,
        navigationOptions: {
        header: null, // this will hide the header
        },
      }, 
      Home: Home,
    },
  );


  const Navigator = createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: StackNavigator,
      Auth: Welcome,
    },
  );
  
  
  export default createAppContainer(Navigator);