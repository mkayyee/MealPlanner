import React from 'react';
import {
  ImageBackground,
  View,
  Image,
  AsyncStorage,
} from 'react-native';
import { Content, Text, Left, Body, Button } from 'native-base';

const Welcome = (props) => { // props is needed for navigation
 
  return (

 <ImageBackground source = {require("../pictures/vegetables.jpeg")} style={{flex:1, width: '100%', height: '100%'}}> 

     
      <View style ={{top:"40%"}}> 
       <Text style ={{textAlign:"center", fontSize:25, fontWeight:"bold", color:"white", fontFamily:"FontAwesome"}}>Meal Planner</Text>  
       <Text style ={{textAlign:"center", fontSize:20, color:"white"}}>Eat to live not live to eat </Text> 
       </View> 

       <View style ={{paddingTop:400}}>
       <Button style={{marginRight:80,marginLeft:80, marginBottom:10, justifyContent:"center"}} rounded info><Text>Connect with Facebook</Text></Button>
       <Button style={{marginRight:80,marginLeft:80, marginBottom:10, justifyContent:"center"}} rounded info><Text>Sign up with e-mail</Text></Button>
       <Button style={{marginRight:80,marginLeft:80, marginBottom:10, justifyContent:"center"}} rounded info><Text>Browse recipes</Text></Button>
       <Text style ={{textAlign:"center", color:"white"}}>Already have an account? <Text style={{textDecorationLine:"underline", color:"white"}}>Log in</Text></Text>
       </View>


</ImageBackground>

  );

};


// proptypes here

export default Welcome;