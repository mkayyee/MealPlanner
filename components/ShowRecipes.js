import React, { useState, useContext } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity , Image} from 'react-native';
import { ListItem, Text, Content, Card, Right, Left, CardItem } from 'native-base';
import PropTypes from 'prop-types';

const ShowRecipes = (props) => {

  console.log("prrrroooops", props.singleItemName);
  
  //const {navigation} = props;
  return (
   
    <ListItem onPress={() => {
        props.navigation.push('Single', {file: props.singleItem});
          }}>
    <Content>
    <Card style={{flex: 0}}>
                <CardItem>
                <Image source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + props.singleItemFileName }}
            style={{height: 70, width: 70}}></Image>
            <Right style={{}}>
              <Left style={{marginLeft:7}}>
               <Text style={{fontWeight:"bold",paddingBottom:5}}>{props.singleItemName}</Text>
  
               </Left>
            </Right>
    
                </CardItem>
     </Card>
       </Content>
        </ListItem>
      )}

const styles = StyleSheet.create({
  increment: {
    padding: 5
  },
  text: {
    fontSize: 20,
    flex: 1,
    fontFamily: 'Roboto',
    textAlign: 'center'
  }
});

ShowRecipes.propTypes = {
  singleItem: PropTypes.object,
  navigation: PropTypes.object.isRequired,
};

export default ShowRecipes;
