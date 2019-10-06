import React from 'react';
import {StyleSheet, View, AsyncStorage, Image, TextInput} from 'react-native';
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import PropTypes from 'prop-types';
import RecipeList from '../components/RecipeList';

import mediaAPI from '../hooks/ApiHooks';

const Home = (props) => {
  const {navigation} = props;
  const {userToContext} = mediaAPI();
  userToContext().then((user) => {
    console.log('usercontext', user);
  });

    return (
      <Container>
    <Header style={{backgroundColor:"white"}}>
        <Left> 
        </Left>

        <View style ={{flexDirection:"row", borderColor:"lightgrey",
      borderWidth:1, width:300, height:30, borderRadius:10, marginTop:10}}>
       
        <Icon style ={{color:"#999", fontSize:18, margin:7}}
        name='search'
        color='lightgrey'
        size={5}
        />
        <TextInput style={styles.inputText}
                  placeholder={'Search recipes'}
                  placeholderTextColor={'#999'}
                  autoCorrect={false}
        />
              
        </View>
        <Right />
      </Header>
      <RecipeList navigation={navigation}></RecipeList>
      { /*
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
       */}
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

    inputText: {
      flex:1,
      fontSize: 18,
      marginTop:3,
      color: '#999',
    },
    
  });


  //props
  Home.propTypes = {
    navigation: PropTypes.object,
  };

  export default Home;