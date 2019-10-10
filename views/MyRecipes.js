import React from 'react';
import {Image, StyleSheet, StatusBar} from 'react-native';
import { Container, Title, Header, Content,  Left, Body, Right } from 'native-base';
import MyRecipesList from '../components/MyRecipesList';
import HomeDropdown from '../components/HomeDropdown';
import PropTypes from 'prop-types';

const MyRecipes = (props) => {
  const {navigation} = props;
  return (
    <Container>
      <StatusBar backgroundColor='#1f425f'></StatusBar>
      <Header style={{ backgroundColor: 'white'}}>
      <Image source={require("../pictures/logo.jpg")} style={{height: 30, width: 30, marginTop:10, marginRight: 10, marginLeft: 10}} />
          <Title style={{marginTop:10, marginLeft: 20, color:"black"}}>Meal Planner</Title>
          <Right>
          <HomeDropdown navigation={navigation}></HomeDropdown>
        </Right>
      </Header>
      <Content>
        <MyRecipesList navigation={navigation}></MyRecipesList>
      </Content>
    </Container>
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