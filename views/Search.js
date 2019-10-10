import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet, View, Image, AsyncStorage, TextInput} from 'react-native';
import {  List, Container, Title, Header, Content, Card, CardItem, Icon, Thumbnail, Text, Button, Left, Body, Right } from 'native-base';
import PropTypes from 'prop-types';
import mediaAPI from '../hooks/ApiHooks';
import useRecipeSearch from '../hooks/RecipeSearchHook';
import ShowRecipes from '../components/ShowRecipes';
//import { Icon } from 'react-native-elements';


const Search = (props) => {

  const { navigation } = props;
  const [names, setNames] = useState();
  const { getRecipes } = mediaAPI();
  const [data] = getRecipes();
  
  const {input, handleSearchChange} = useRecipeSearch();

  const searchRecipe = (text) => {
    const recipeArray = [];
    data.map((item) => {
      const itemName = item.title.split(' ')[0];
      const itemToUpper = itemName.toUpperCase();
      if (itemToUpper.startsWith(text.toUpperCase())) {
        recipeArray.push( {name:item.title, file_name:item.filename,_data: item});
      }
    });
    setNames(recipeArray);
   

  };
  useEffect(() => {	
    console.log();	
  }, []);


    return (
      <Container>

      <Header style={{ backgroundColor: 'white' }}>
        <Left>

        <Button transparent 
          onPress={() => {navigation.navigate("Home"); }}><Icon name= "arrow-back"></Icon></Button>
        </Left>
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
            onFocus={() => {
              // automatically displays all items (which start with '') if nothing is typed in
              input.letters.length == 0 ? searchRecipe('') : searchRecipe(input.letters);
            }}
          
            onChangeText={(text) => {
              handleSearchChange(text);
              searchRecipe(text);
            }}
          />
        </View>
      </Header>
    

      <List
      dataArray={names}
      renderRow={(item) =>
        <ShowRecipes navigation={navigation} 
        singleItemName={item.name} 
        singleItemFileName ={item.file_name}
        singleItem={item._data}  />}
       keyExtractor={(item, index) => index.toString()}
    />
       
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
      marginLeft:5,
      color: '#999'
    }
  });


  //props
  Search.propTypes = {
    navigation: PropTypes.object,
    recipes:PropTypes.array,

  };

  export default Search;