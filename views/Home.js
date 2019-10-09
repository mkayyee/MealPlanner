import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, AsyncStorage, Image, TextInput } from 'react-native';
import { Container, Header, Icon, Left, Right, Text } from 'native-base';
import PropTypes from 'prop-types';
import RecipeList from '../components/RecipeList';
import HomeDropdown from '../components/HomeDropdown';
import { UserContext } from '../context/UserContext';

import mediaAPI from '../hooks/ApiHooks';

const Home = (props) => {
<<<<<<< HEAD

  const [user, setUser] = useContext(UserContext);
=======
   const [user, setUser] = useContext(UserContext);
>>>>>>> 7ea5be5df7cc124c495604fb0c8abd64a2057378
  const { navigation } = props;
  const { getIdealIntakes, userToContext } = mediaAPI();
  const [ideals, setIdeals] = useState(null);

  userToContext().then((user) => {
    console.log('usercontext', user);
  });
<<<<<<< HEAD
 
=======
>>>>>>> 7ea5be5df7cc124c495604fb0c8abd64a2057378

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
    console.log("uuuuserr", user);
  });

  return (
    <Container>
      <Header style={{ backgroundColor: 'white' }}>
        <Left></Left>
        <View
          style={{
            flexDirection: 'row',
            borderColor: 'lightgrey',
            borderWidth: 1,
            width: 300,
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
          />
        </View>
        <Right>
          <HomeDropdown ideals={ideals} navigation={navigation}></HomeDropdown>
        </Right>
      </Header>
      {ideals && (
        <Text style={{ textAlign: 'center' }}>
          Your ideal daily calorie intake: {ideals.calories} kcal
        </Text>
      )}
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
  }
});

//props
Home.propTypes = {
  navigation: PropTypes.object
};

export default Home;
