import React from 'react';
import {StyleSheet, View, Text, AsyncStorage} from 'react-native';
import { Button, Content } from 'native-base';
import PropTypes from 'prop-types';

const Search = (props) => {

    return (
      <View style ={styles.welcomeButtons}>
       <Text>Welcome to Search Screen</Text>
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
  Search.propTypes = {
    navigation: PropTypes.object,
  };

  export default Search;