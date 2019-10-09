import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, H1 } from 'native-base';
import FormNumberImput from '../components/FormNumberInput';
import SwitchSelector from 'react-native-switch-selector';
import stateChanger from '../components/stateChanger';
import mediaAPI from '../hooks/ApiHooks';
import { UserContext } from '../context/UserContext';

const BMRCalculator = (props) => {
  const [user, setUser] = useContext(UserContext);
  const [modify, setModify] = useState(false);
  const {
    addIdealIntakes,
    modifyIdealIntakes,
    deleteIdealIntakes
  } = mediaAPI();
  const [state, setState] = useState(initialState);
  const { changeState } = stateChanger();

  useEffect(() => {
    console.log('State changed or initiated. New state:\n', state);
  });
  const calculateBMR = (age, height, weight, gender, update = false) => {
    let userID = user.user_id;
    if (gender == 'Male') {
      let calculateMale = Math.round(
        10.0 * weight + 6.25 * height + 5.0 * age + 5
      );
      const maleObject = {
        calories: calculateMale,
        height: height,
        age: age,
        weight: weight,
        gender: gender
      };
      if (!update) {
        addIdealIntakes({ id: userID, data: maleObject });
      } else {
        modifyIdealIntakes({ id: userID, data: maleObject });
      }
    } else {
      let calculateFemale = Math.round(
        9.247 * weight + 3.098 * height + 4.33 * age - 161
      );
      const femaleObject = {
        id: userID,
        data: {
          calories: calculateFemale,
          height: height,
          age: age,
          weight: weight,
          gender: gender
        }
      };
      if (!update) {
        addIdealIntakes(femaleObject);
      } else {
        modifyIdealIntakes({ id: userID, data: femaleObject });
      }
    }
  };

  const deleteIntakes = (update = false) => {
    if (!update) {
      deleteIdealIntakes(user.user_id);
    }
    const setIdeals = props.navigation.getParam('setIdeals');
    const userData = { ...user, ideals: null }; // keeping original data but nullifying ideals
    setIdeals(null);
    setUser({});
    setTimeout(() => {
      setUser(userData);
      props.navigation.navigate('BMRCalculator');
    }, 2);
  };
  return (
    <View>
      <Text
        style={{
          fontSize: 40,
          color: '#41B3A3',
          alignSelf: 'center',
          fontWeight: 'bold',
          textShadowRadius: 0.5,
          textShadowOffset: { width: -1, height: 1 },
          textShadowColor: 'black'
        }}
      >
        BMR Calculator
      </Text>
      {user.ideals != null && user.ideals && !modify ? (
        <View>
          {user.ideals.height ? (
            <View>
              <Text style={styles.text}>
                Your weight: {user.ideals.weight} kg
              </Text>
              <Text style={styles.text}>
                Your height: {user.ideals.height} cm
              </Text>
              <Text style={styles.text}>Your age: {user.ideals.age}</Text>
              <Text style={styles.text}>Your gender: {user.ideals.gender}</Text>
              <Text style={styles.text}>
                Your ideal daily calorie intake: {user.ideals.calories} kcal
              </Text>
            </View>
          ) : (
            <Text style={styles.text}>
              Ideal daily calorie intake: {user.ideals.calories} kcal
            </Text>
          )}
          <Button
            onPress={() => {
              deleteIntakes();
            }}
            rounded
            style={{
              width: '50%',
              alignSelf: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              backgroundColor: '#41B3A3',
              margin: 5
            }}
          >
            <Text style={{ textAlign: 'center' }}>Delete data</Text>
          </Button>
          <Button
            onPress={() => {
              setModify(true);
            }}
            rounded
            style={{
              width: '50%',
              alignSelf: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              backgroundColor: '#41B3A3',
              margin: 5
            }}
          >
            <Text style={{ textAlign: 'center' }}>Modify data</Text>
          </Button>
        </View>
      ) : (
        <View>
          <Text style={styles.inputText}>Age</Text>
          <FormNumberImput
            maxValue={150}
            callback={(val) => {
              changeState('age', val, state, setState);
            }}
          ></FormNumberImput>
          <Text style={styles.inputText}>Height (cm)</Text>
          <FormNumberImput
            maxValue={350}
            callback={(val) => {
              changeState('height', val, state, setState);
            }}
          ></FormNumberImput>
          <Text style={styles.inputText}>Weight (kg)</Text>
          <FormNumberImput
            maxValue={500}
            callback={(val) => {
              changeState('weight', val, state, setState);
            }}
          ></FormNumberImput>
          <Text style={styles.inputText}>Gender</Text>
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
              calculateBMR(
                state.age,
                state.height,
                state.weight,
                state.gender,
                modify ? true : false
              );
              if (modify) {
                deleteIntakes(true);
                setModify(false);
              } else {
                setTimeout(() => {
                  props.navigation.navigate('Home', { calculated: true });
                }, 1000);
              }
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
    margin: 5,
    marginLeft: 50,
    marginRight: 50,
    fontSize: 25,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#41B3A3'
  },
  inputText: {
    margin: 5,
    fontSize: 25,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#41B3A3'
  }
});

export default BMRCalculator;
