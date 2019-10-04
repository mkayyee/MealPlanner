import React from 'react';
import {StyleSheet, View, AsyncStorage, Image} from 'react-native';
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import PropTypes from 'prop-types';

import mediaAPI from '../hooks/ApiHooks';

const Home = (props) => {

  
  const {userToContext} = mediaAPI();
  userToContext().then((user) => {
    console.log('usercontext', user);
  });

    return (
      <Container>
      <Header style={{backgroundColor:"white"}}>
        <Left> 
        </Left>
        <Image source={require("../pictures/logo.jpg")} style={{height: 30, width: 30, marginTop:10}} />
        <Body>
        <Right>
          <Title style={{marginTop:15, color:"black"}}>Meal Planner</Title>
        </Right>         
        </Body>
        <Right />
      </Header>
      <Card style={{flex: 0}}>
            <CardItem>
              
            <Body>
                <Image source={require("../pictures/salad.jpeg")} style={{height: 340, width: 340}}/>
                <Thumbnail source={require("../pictures/mia.jpg")} style={{borderRadius: 50,
                width: 40,
                height: 40, position:"absolute", top: 15, left: 5, right: 0, bottom: 0}} />
                <Text style= {{fontWeight:"bold",  color:"white", position:"absolute", top: 22, left: 55, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                  by Username
                </Text>
                <Text style= {{fontWeight:"bold",fontSize:40,  color:"white", position:"absolute", top: 230, left: 20, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                  RecipeName
                </Text>
                <Text style= {{fontWeight:"bold",fontSize:27,  color:"white", position:"absolute", top: 275, left: 20, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                  Calories
                </Text>
              </Body>
                
            </CardItem>
       </Card>     
       
     </Container>
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