import React from 'react';
import {StyleSheet, View, AsyncStorage} from 'react-native';
import { Button, Content, Text } from 'native-base';
import PropTypes from 'prop-types';

const Profile = (props) => {

  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };

    return (
      <View >
       <Text style ={styles.welcomeButtons}>Welcome to Profile Screen</Text>
       <Button style={styles.buttonStyle} rounded info onPress={signOutAsync}><Text>Logout</Text></Button>
      </View>
    );
  };

  const styles = StyleSheet.create({
    welcomeButtons: {
      paddingTop:200,
      marginLeft:100,
      justifyContent:"center",
    },

    buttonStyle: {
      marginRight:50,
      marginLeft:50, 
      marginBottom:10, 
      justifyContent:"center"
    },
  });


  //props
  Profile.propTypes = {
    navigation: PropTypes.object,
  };

  export default Profile;