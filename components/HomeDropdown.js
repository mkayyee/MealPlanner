import React, { useEffect } from 'react';
import {
  Text,
  View,
  Picker,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

const signOutAsync = async () => {
  await AsyncStorage.clear();
};

const HomeDropdown = (props) => {
  const router = (index) => {
    if (index == 1) {
      return 'BMRCalculator';
    } else if (index == 2) {
      signOutAsync();
      return ('Auth');
    }
    return ('Home');
  };
  useEffect(() => {
    console.log(props.ideals);
  });
  return (
    <View>
      <Picker
        style={{ width: 30 }}
        onValueChange={(itemValue, index) => {
          props.navigation.navigate(router(index), {
            userID: props.userID,
            ideals: props.ideals,
            setIdeals: props.setIdeals
          });
        }}
      >
        <Picker.Item label='Home' value='Home' />
        <Picker.Item label='Calculate BMR' value='Calculate BMR' />
        <Picker.Item label='Logout' value='Auth' />
      </Picker>
    </View>
  );
};

export default HomeDropdown;
