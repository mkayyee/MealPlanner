import React from 'react';
import {StyleSheet, View, Text, AsyncStorage} from 'react-native';
import { Button, Content } from 'native-base';
import PropTypes from 'prop-types';

const MyRecipes = (props) => {

    return (
      <View style ={styles.welcomeButtons}>
       <Text>Welcome to MyRecipes Screen</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    welcomeButtons: {
      alignItems:"center",
      paddingTop:200,
    },
  });


  //props
  MyRecipes.propTypes = {
    navigation: PropTypes.object,
  };

  export default MyRecipes;