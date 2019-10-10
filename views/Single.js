import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {H2,  Container, Title, Header, Icon, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, Right} from 'native-base';
import PropTypes from 'prop-types';
import mediaAPI from '../hooks/ApiHooks';

const Single = props => {

  const {navigation} = props;
  console.log('Singel navi', navigation.state);
  const {getUserInfo, getAvatar} = mediaAPI();
  const file = navigation.state.params.file;
  var x = null;
  var ingrList = '';
  const recipeInfo = JSON.parse(file.description);
  const [userInfo, setUserInfo] = useState({});
  //console.log(recipeInfo);
  //console.log(recipeInfo.totalNutrients.ingredients.name);

  useEffect(() => {
    getUserInfo(file.user_id)
      .then((json) => {
        setUserInfo(json);
      })
      .catch((error) => {
        console.log(console.error);
      });
  }, []);

  //for loop to get the ingredient names
  for (i in recipeInfo.totalNutrients.ingredients) {
    x = '-' + recipeInfo.totalNutrients.ingredients[i].name;
    ingrList = ingrList + x + '\n';
    console.log(x);
  }
  console.log (recipeInfo.totalNutrients.ingredients);

  return (
    <Container>
        <Header style={{backgroundColor:"white"}}>
        <Left>
        <Button transparent 
       onPress={() => {navigation.navigate("Home"); }}><Icon name= "arrow-back"></Icon></Button>
       </Left>
          <Image source={require("../pictures/logo.jpg")} style={{height: 30, width: 30, marginTop:10}} />
          <Body>
          <Right>
            <Title style={{marginTop:15, color:"black"}}>Meal Planner</Title>
          </Right>         
          </Body>
          <Right />
        </Header>
    <ScrollView>
      <Image
       source={{
                    uri:
                      'http://media.mw.metropolia.fi/wbma/uploads/' + file.filename
                  }}
        style={{height: 340, width: '100%'}}
      />
      <Text
        style={{
          fontWeight: 'bold',
          fontSize:25,
          color: 'white',
          position: 'absolute',
          textShadowRadius: 10,
          textShadowOffset: {width: -1.5, height: 1.5},
          textShadowColor: 'black',
          top: 240,
          left: 20,
          right: 0,
          bottom: 0  
        }}>
         {file.title}
      </Text>


      <Text
        style={{
          fontWeight: 'bold',
          color: 'white',
          position: 'absolute',
          textShadowRadius: 10,
          textShadowOffset: {width: -1.5, height: 1.5},
          textShadowColor: 'black',
          top: 300,
          left: 20,
          right: 0,
          bottom: 0  
        }}>
        by {userInfo.username}
      </Text>
      <View>
        <Card>
          <CardItem>
            <Body>
              <Body>
              <Text>INGREDIENTS</Text>
              </Body>
            </Body>
          </CardItem>
        </Card>

        <Body>
          <Text style={styles.text}>{ingrList}</Text>
        </Body>
      </View>
      <View>
      <Card>
          <CardItem>
            <Body>
              <Body>
              <Text>PREPARATION</Text>
              </Body>
            </Body>
          </CardItem>
        </Card>
        <Body>
          <Text style={styles.text}>{recipeInfo.instructions}</Text>
        </Body>
      </View>
      <View>
      <Card>
          <CardItem>
            <Body>
              <Body>
              <Text>NUTRITIONAL VALUES</Text>
              </Body>
            </Body>
          </CardItem>
        </Card>
        <Body>
          <Text style={styles.text}>
            Calories: {recipeInfo.totalNutrients.calories}kcal
          </Text>
          <Text style={styles.text}>
            Protein: {recipeInfo.totalNutrients.protein}g
          </Text>
          <Text style={styles.text}>
            Carbohydrates: {recipeInfo.totalNutrients.carbs}g
          </Text>
          <Text style={styles.text}>Fat: {recipeInfo.totalNutrients.fat}g</Text>
          <Text style={styles.text}>
            Saturated fat: {recipeInfo.totalNutrients.saturated_fat}g
          </Text>
          <Text style={styles.text}>
            Sodium: {recipeInfo.totalNutrients.sodium}mg
          </Text>
          <Text style={styles.text}>
            Sugars: {recipeInfo.totalNutrients.sugars}g
          </Text>
        </Body>
      </View>
    </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  welcomeButtons: {
    paddingTop: 50
  },
  text: {
    fontSize: 15,
    fontFamily: 'Roboto',
    padding: 5
  }
});

//props
Single.propTypes = {
  navigation: PropTypes.object,
  singleRecipe: PropTypes.object,
  file: PropTypes.object
};

export default Single;