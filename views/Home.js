import React from 'react';
import {StyleSheet, View, Text, AsyncStorage} from 'react-native';
import { Button, Content } from 'native-base';
import PropTypes from 'prop-types';

const Home = (props) => {

    return (
      <View style ={styles.welcomeButtons}>
       <Text>Welcome to Home Screen (Recipes)</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    welcomeButtons: {
      alignItems:"center",
      paddingTop:200,
    },

    buttonStyle: {
      marginRight:50,
      marginLeft:50, 
      marginBottom:10, 
      justifyContent:"center"
    },
  });


  //props
  Home.propTypes = {
    navigation: PropTypes.object,
  };

  export default Home;