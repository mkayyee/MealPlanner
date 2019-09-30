import React, {useState, useEffect}  from 'react';
import {
  ImageBackground,
  View,
  Image,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { Content, Text, Left, Body, Button, Form, Container } from 'native-base';
import useSignUpForm from '../hooks/LoginHooks';
import mediaAPI from '../hooks/ApiHooks';
import FormTextInput from '../components/FormTextInput';

const Welcome = (props) => { // props is needed for navigation

  const {navigation} = props;

  const [isRegistered, setRegisterState] = useState(undefined);

    //useEffect(() => console.log("isRegistered", isRegistered),[isRegistered]);

    const {signInAsync, registerAsync} = mediaAPI();

    const LoginForm = () => {

      const {inputs, handleLoginUsernameChange, handleLoginPasswordChange} = useSignUpForm();

    return (
   <ImageBackground  blurRadius={5} source = {require("../pictures/vegetables.jpeg")} style={styles.backgroudImStyle} >
    <Form style={{paddingTop:100}}>
        <Text style={{textAlign: 'center', color: "white", fontSize: 20, fontWeight: "bold"}}>Login</Text>

          <FormTextInput
            autoCapitalize='none'
            placeholder='username'
            onChangeText={handleLoginUsernameChange}
            value={inputs.username}

          />


          <FormTextInput
            autoCapitalize='none'
            placeholder='password'
            secureTextEntry={true}
            onChangeText={handleLoginPasswordChange}
            value={inputs.password}
          />

          <Button style={styles.buttonStyle} rounded info onPress={() => {signInAsync(inputs,props);} }><Text>Login</Text></Button>
          <Button style={styles.buttonStyle} rounded info onPress = {() => setRegisterState(undefined)}><Text>Back to Welcome Screen</Text></Button>
    </Form>
  </ImageBackground>
      );
      };



const RegistrationForm = () => {

const {inputs, handleUsernameChange, handlePasswordChange, handleConfirmPasswordChange,
  handleEmailChange, handleFull_NameChange, errors, validateOnSend, checkUserAvailable} = useSignUpForm();
return(
<ImageBackground blurRadius={5} source = {require("../pictures/vegetables.jpeg")} style={styles.backgroudImStyle} >
  <Form style={{paddingTop:100}}>
    <Text style={{textAlign: 'center', color: "white", fontSize: 20, fontWeight: "bold"}}>Registration</Text>

      <FormTextInput
        autoCapitalize='none'
        placeholder='username'
        onChangeText={handleUsernameChange}
        value={inputs.username}
        error={errors.username}
        onEndEditing={checkUserAvailable}

      />

      <FormTextInput
        autoCapitalize='none'
        placeholder='password'
        secureTextEntry={true}
        onChangeText={handlePasswordChange}
        value={inputs.password}
        error={errors.password}

      />

      <FormTextInput
        autoCapitalize='none'
        placeholder='confirm password'
        secureTextEntry={true}
        onChangeText={handleConfirmPasswordChange}
        value={inputs.confirm_password}
        error={errors.confirm_password}
      />

        <FormTextInput
        autoCapitalize='none'
        placeholder='email'
        onChangeText={handleEmailChange}
        value={inputs.email}
        error={errors.email}
      />

        <FormTextInput
        autoCapitalize='none'
        placeholder='full name'
        onChangeText={handleFull_NameChange}
        value={inputs.full_name}
      />

      <Button style={styles.buttonStyle} rounded info onPress={() => {console.log("validationOnse", validateOnSend());  if (validateOnSend()) {
                registerAsync(inputs, props);
              }}}><Text>Registration</Text></Button>
      <Button style={styles.buttonStyle} rounded info onPress = {() => setRegisterState(undefined)}><Text>Back to Welcome Screen</Text></Button>
  </Form>

</ImageBackground>
);
};
 
  return (
  
       <ImageBackground source = {require("../pictures/vegetables2.jpeg")} style={styles.backgroudImStyle}>
    
      
       {isRegistered === undefined && 
       <View style ={styles.welcomeButtons}>
       <Button style={styles.buttonStyle} rounded info><Text>Connect with Facebook</Text></Button>
       <Button style={styles.buttonStyle} rounded info
       onPress = {() => setRegisterState(false)}>
         <Text>Sign up with e-mail</Text></Button>
       <Button style={styles.buttonStyle} rounded info
       onPress={()=> {navigation.push('Home');}}>
         <Text>Browse recipes</Text></Button>
       <Text style ={styles.centerText}>Already have an account? <Text onPress = {() => setRegisterState(true)}   style={styles.underlineText}>Log in</Text></Text>
       </View>
      
      }
       
      {isRegistered && <LoginForm/>}

      
      {(!isRegistered && isRegistered!=undefined) && <RegistrationForm/>}
       

       </ImageBackground>  



  );

};


//styles

const styles = StyleSheet.create({
  welcomeButtons: {
    paddingTop:400,
  },
  buttonStyle: {
    marginRight:50,
    marginLeft:50, 
    marginBottom:10, 
    justifyContent:"center"
  },
  centerText:{
    textAlign:"center",
    color:"white",
  },
  underlineText:{
    textDecorationLine:"underline", 
    color:"white"
  },
  backgroudImStyle:{
    flex:1, 
    width: '100%', 
    height: '100%'
  },
 
   
});

// proptypes here

Welcome.propTypes = {
  navigation: PropTypes.object,
};

export default Welcome;