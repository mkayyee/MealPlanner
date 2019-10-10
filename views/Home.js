import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, AsyncStorage, StatusBar, TextInput, Image } from 'react-native';
import { Container, Header, Icon, Left, Right } from 'native-base';
import PropTypes from 'prop-types';
import RecipeList from '../components/RecipeList';
import HomeDropdown from '../components/HomeDropdown';
import { UserContext } from '../context/UserContext';
import mediaAPI from '../hooks/ApiHooks';

const Home = (props) => {

  const [user, setUser] = useContext(UserContext);
  const { navigation } = props;
  const { getIdealIntakes, userToContext } = mediaAPI();
  const [ideals, setIdeals] = useState(null);
  
  userToContext().then((user) => {
    //console.log('usercontext', user);
  });
 

  // Retreives user data from the AsyncStorage and make's
  // A call, with the user id to the API to get info about user's ideal nutrient take

  const getUserData = async () => {
    const data = await AsyncStorage.getItem('user');
    if (user == null) {
      setUser(JSON.parse(data));
    }
    if (ideals == null) {
      getIdeals = getIdealIntakes(JSON.parse(data).user_id, setIdeals);
    } else {
      if (user.ideals == undefined) {
        setUser(() => ({
          ...user,
          ideals: ideals
        }));
      }
    }
  };

  useEffect(() => {
    if (user && user.ideals != undefined) {
      console.log(user);
    }
    getUserData();
  });

  return (
    <Container>
      <StatusBar backgroundColor='#1f425f'></StatusBar>
      <Header style={{backgroundColor: 'white'}}>
      <Image source={require("../pictures/logo.jpg")} style={{height: 30, width: 30, marginTop:10, marginRight: 10, marginLeft: 10}} />
        <View
          style={{
            flexDirection: 'row',
            borderColor: 'lightgrey',
            backgroundColor: 'white',
            borderWidth: 1,
            width: 250,
            marginLeft: 20,
            height: 30,
            borderRadius: 10,
            marginTop: 10
          }}
        >
          <Icon
            style={{ color: '#999', fontSize: 18, margin: 7 }}
            name='search'
            color='lightgrey'
            size={5}
          />
          <TextInput
            style={styles.inputText}
            placeholder={'Search recipes'}
            placeholderTextColor={'#999'}
            autoCorrect={false}
            onFocus={() => {
              navigation.push('Search');
            }} 
          />
        </View>
        <Right>
          <HomeDropdown setIdeals={(newIdeals) => {setIdeals(newIdeals)}} ideals={ideals} navigation={navigation}></HomeDropdown>
        </Right>
      </Header>
      <RecipeList navigation={navigation}></RecipeList>
    </Container>
  );
};

const styles = StyleSheet.create({
  welcomeButtons: {
    alignItems: 'center',
    paddingTop: 200
  },

  buttonStyle: {
    marginRight: 50,
    marginLeft: 50,
    marginBottom: 10,
    justifyContent: 'center'
  },
  inputText: {
    flex: 1,
    fontSize: 18,
    marginTop: 3,
    color: '#999'
  },
  text: {
    margin: 5,
    marginLeft: 50,
    marginRight: 50,
    fontSize: 25,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#41B3A3'
  },
});

//props
Home.propTypes = {
  navigation: PropTypes.object
};

export default Home;
