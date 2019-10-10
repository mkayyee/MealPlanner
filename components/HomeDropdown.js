import React, { useEffect } from 'react';
import {
  View,
  Picker,
  AsyncStorage
} from 'react-native';

const signOutAsync = async () => {
  await AsyncStorage.clear();
};

const HomeDropdown = (props) => {
  const router = (index) => {
    switch (index) {
      case 1:
        return 'BMRCalculator';
      case 2:
        return 'Home';
      case 3:
        return 'Profile';
      case 4:
        return 'MyRecipes';
      case 5:
        return 'CreateRecipe';
      case 6:
        signOutAsync();
        return 'Auth';
    }
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
        <Picker.Item label='Picker 1st item no work' value='Calculate BMR' />
        <Picker.Item label='Calculate BMR' value='Calculate BMR' />
        <Picker.Item label='Home' value='Home' />
        <Picker.Item label='My profile' value='Profile' />
        <Picker.Item label='My recipes' value='MyRecipes' />
        <Picker.Item label='Create a recipe' value='CreateRecipe' />
        <Picker.Item label='Logout' value='Auth' />
      </Picker>
    </View>
  );
};

export default HomeDropdown;
