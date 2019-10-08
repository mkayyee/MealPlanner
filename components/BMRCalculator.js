import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { Text, Button } from 'native-base';
import FormNumberImput from '../components/FormNumberInput';
import SwitchSelector from 'react-native-switch-selector';
import stateChanger from '../components/stateChanger';
import mediaAPI from '../hooks/ApiHooks';
import {UserContext} from '../context/UserContext';

const BMRCalculator = (props) => {
  const [user, setUser] = useContext(UserContext);
  const { addIdealIntakes, getIdealIntakes } = mediaAPI();
  const [state, setState] = useState(initialState);
  const { changeState } = stateChanger();

  useEffect(() => {
    console.log(user);
    console.log('State changed or initiated. New state:\n', state);
  });
  const calculateBMR = (age, height, weight, gender) => {
    let userID = user.user_id;
    if (gender == 'Male') {
      let calculateMale = Math.round(
        10.0 * weight + 6.25 * height + 5.0 * age + 5
      );
      const maleObject = { calories: calculateMale };
      addIdealIntakes({ id: userID, data: maleObject });
    } else {
      let calculateFemale = Math.round(
        9.247 * weight + 3.098 * height + 4.33 * age - 161
      );
      const femaleObject = { id: userID, data: {calories: calculateFemale} };
      addIdealIntakes(femaleObject);
    }
  };
  return (
    <View>
      {user.ideals ? (
        <View>
          <Text>Your ideal daily calorie intake: {user.ideals.calories}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.text}>Age</Text>
          <FormNumberImput
            maxValue={150}
            callback={(val) => {
              changeState('age', val, state, setState);
            }}
          ></FormNumberImput>
          <Text style={styles.text}>Height (cm)</Text>
          <FormNumberImput
            maxValue={350}
            callback={(val) => {
              changeState('height', val, state, setState);
            }}
          ></FormNumberImput>
          <Text style={styles.text}>Weight (kg)</Text>
          <FormNumberImput
            maxValue={500}
            callback={(val) => {
              changeState('weight', val, state, setState);
            }}
          ></FormNumberImput>
          <Text style={styles.text}>Gender</Text>
          <SwitchSelector
            onPress={(value) => {
              changeState('gender', value, state, setState);
            }}
            buttonColor={'#41B3A3'}
            style={{ marginTop: 10 }}
            options={options}
          ></SwitchSelector>
          <Button
            style={{
              alignSelf: 'center',
              marginTop: 10,
              width: '50%',
              backgroundColor: '#41B3A3',
              justifyContent: 'center'
            }}
            onPress={() => {
              calculateBMR(state.age, state.height, state.weight, state.gender);
              setTimeout(() => {
                props.navigation.navigate('Home', {calculated: true});
              }, 1000);
            }}
            size={45}
            rounded
          >
            <Text style={{ textAlign: 'center' }}>Calculate</Text>
          </Button>
        </View>
      )}
    </View>
  );
};
const options = [
  { label: 'Female', value: 'Female' },
  { label: 'Male', value: 'Male' }
];

const initialState = {
  age: 0,
  height: 0,
  weight: 0,
  gender: 'Female'
};
const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#41B3A3'
  }
});

export default BMRCalculator;
