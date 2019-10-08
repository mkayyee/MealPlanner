import React, {useEffect} from 'react';
import { Text, View, Picker, TouchableOpacity } from 'react-native';

const HomeDropdown = (props) => {
  const router = (index) => {
      if (index == 0){
          return 'Profile';
      }
      return 'BMRCalculator';
  };
  useEffect(()=> {
    console.log(props.ideals);
  });
  return (
    <View>
      <Picker
        style={{ width: 30 }}
        onValueChange={(itemValue, index) => {
          props.navigation.navigate(router(index), {userID: props.userID, ideals: props.ideals});
        }}
      >
        <Picker.Item label='MyPlan' value='My Plan' />
        <Picker.Item label='BMRCalculator' value='Calculate BMR' />
      </Picker>
    </View>
  );
};

export default HomeDropdown;
