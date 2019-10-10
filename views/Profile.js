import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View,  AsyncStorage, Image, Alert} from 'react-native';
import PropTypes from 'prop-types';
import { List as BaseList, Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, Right } from 'native-base';
import DatePicker from 'react-native-datepicker';
import { Icon } from 'react-native-elements'

import {UserContext} from '../context/UserContext';
import mediaAPI from '../hooks/ApiHooks';
import Meallist from '../components/MealList';
  
  const ArrayB={objects:[], date:""};
  const ArrayL={objects:[], date:""};
  const ArrayD={objects:[], date:""};
  const ArrayE={objects:[], date:""};

  let breakfastCalories = 0;
  let lunchCalories = 0;
  let dinnerCalories = 0;
  let extraCalories = 0;


const Profile = (props) => {

  const mealsArray = [

    {title:"BREAKFAST", content: ArrayB, calories: breakfastCalories},
    {title:"LUNCH", content: ArrayL, calories: lunchCalories},
    {title:"DINNER", content: ArrayD, calories: dinnerCalories}, 
    {title:"EXTRA", content: ArrayE, calories: extraCalories}
  ]
    
  const {navigation} = props;
  const [user] = useContext(UserContext);

  [mealAdd,setMealAdd] = useState(false);
  
  useEffect(() => console.log("mealAdd", mealAdd),[mealAdd]);

  const {getAvatar} = mediaAPI();

  const signOutAsync = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Auth');
  };
  
      const day = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();

   [date,setDate] = useState(day +"."+month+"."+year);
   [file, setFile] = useState({});

    const addToMealPlan = (mealAdd, item) => {
      
      if (!mealAdd && navigation.state.params) {
      
      const file1 = navigation.state.params.file;
      const recipeInfo = JSON.parse(file1.description);
      if(item ==="BREAKFAST") {
      ArrayB.objects.push(file1);
      ArrayB.date = date;
      breakfastCalories += recipeInfo.totalNutrients.calories;
      console.log("arrayB", ArrayB);

  
    }
      
      if (item==="LUNCH") {
      ArrayL.objects.push(file1);
      ArrayL.date = date;
      lunchCalories += recipeInfo.totalNutrients.calories;

      }
      
      if (item==="DINNER") {
      ArrayD.objects.push(file1);
      ArrayD.date = date;
      dinnerCalories += recipeInfo.totalNutrients.calories;

     }
      
      if (item==="EXTRA") {
      ArrayE.objects.push(file1);
      ArrayE.date = date;
      extraCalories += recipeInfo.totalNutrients.calories;

      }

      setMealAdd(true);
      return setFile(file1);}

      else { Alert.alert(
        //title
        'Message',
        //body
        ' At first you need to choose dish! Press: Add to Meal Plan',
        [
          {text: 'Ok', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
        
      );}
    } 

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
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Body>
                  <Text style ={{fontSize:25}}>{user.username}</Text>
                  <Text note>{user.email}</Text>
                </Body>
                <Thumbnail source={{uri: getAvatar(user.user_id)}} style={{borderRadius: 50,
                width: 100,
                height: 100,}} />
              </Left>
            </CardItem>
          <CardItem>
            <Body>
              <Body>
          <DatePicker
          style={{width: 200}}
          date={date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD.MM.YYYY"
          minDate="01.01.2018"
          maxDate="01.01.2022"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => {setDate(date)}}
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          />
          </Body>
          </Body>
          </CardItem>
          <Text style ={{textAlign:"center", justifyContent:"center",paddingTop:5, paddingBottom:5, fontSize:20}}>Plan for {date} </Text>
        <CardItem>
            <Text style = {{fontSize:20, paddingLeft:40}}>Add to Meal Plan</Text>
            <Right>
            <Button rounded primary 
             style ={{ width:50, height:45, justifyContent: 
             'center', alignItems: 'center', marginRight:20}}
             onPress={() => {navigation.navigate("Home");}}><Icon name= "add"></Icon>
                </Button>
                </Right>           
            </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Body>
              <Body>
        {user.ideals ? 
        <Text>CONSUMED CALORIES: {breakfastCalories+lunchCalories+dinnerCalories+extraCalories} ({(Math.round(((breakfastCalories+lunchCalories+dinnerCalories+extraCalories)/user.ideals.calories) * 100)) != Infinity ? (Math.round(((breakfastCalories+lunchCalories+dinnerCalories+extraCalories)/user.ideals.calories) * 100)) : 0}% of your daily plan)</Text> :
        <Text>CONSUMED CALORIES: {breakfastCalories+lunchCalories+dinnerCalories+extraCalories}</Text>
       }
        </Body>
        </Body>
        </CardItem>
        </Card>
         <BaseList 
         dataArray={mealsArray}
         renderRow={
          (item) =>
          <View>
          <Card style={{flex: 0}}  onPress={() => { addToMealPlan (mealAdd,item.title); }}>
          <CardItem>
          <Left>
          <Body>
          <Text style={{}}>{item.title}</Text>
          <Text note> {item.calories} Cal</Text>
          </Body>
          <Button transparent style ={{paddingLeft:30}}  
          onPress={() => { addToMealPlan (mealAdd,item.title); }}><Icon name= "add"></Icon></Button>
          </Left>
          </CardItem>
          </Card>
          <Meallist navigation={navigation}
          mediaArray = {item.content.objects}
           />
           </View>
        }
        keyExtractor={(item, index) => index.toString()}
         />
         
        <Card>
          <CardItem>
        <Button rounded info onPress={signOutAsync} style={{marginRight:50,marginLeft:50,marginBottom:10,justifyContent:"center"}}><Text>Logout!</Text></Button>
        </CardItem>
        </Card>

        </Content>
        </Container>
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
  headText: {
    fontWeight: 'bold',
    fontSize: 20,
    color:"#1589FF",
    },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
