import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';

const Home = () => {
    return (
      <View style={styles.container}>
       <Text>Welcome to Home Screen</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 40,
    },
  });


  Home.propTypes = {
    navigation: PropTypes.object,
  };

  export default Home;