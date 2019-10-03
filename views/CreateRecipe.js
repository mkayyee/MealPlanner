/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* global require */
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ToolbarAndroid,
  StatusBar,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';
import IngredientItem from '../components/IngredientItem';
import {Text, List, Card} from 'native-base';
import {SelectedIngredients} from '../context/SelectedIngredients';

const CreateRecipe = (props) => {
  const {navigation} = props;
  const [ingredients, setIngredients] = useContext(SelectedIngredients);

  // Returns the total value of a chosen nutrient from all the selected ingredients
  // CreateRecipe currently takes only protein and calories as props so rest will have to be implemented
  const getNutrient = (nutrient) => {
    let adder = 0;
    for (let i = 0; i < ingredients.length; i++) {
      adder += ingredients[i][nutrient] * ingredients[i].quantity;
      console.log(adder);
    }
    return Math.round(adder);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{justifyContent: 'flex-start'}}>
        <Text style={styles.text}>Recipe</Text>
        <TextInput fontSize={20} placeholder={'recipe name...'}></TextInput>
        <Text style={styles.text}>Ingredients</Text>
        {ingredients.length != 1 ? (
          <Text>({ingredients.length} items)</Text>
        ) : (
          <Text>(1 item)</Text>
        )}
        <View>
          <Button
            onPress={() => {
              navigation.navigate('Ingredients');
            }}
            margin={20}
            elevation={10}
            color={'green'}
            title={'New Ingredient'}></Button>
          <ScrollView maxHeight={'50%'} nestedScrollEnabled={true}>
            <List
              dataArray={ingredients}
              keyExtractor={(item, index) => item.key.toString()}
              renderRow={(item) => (
                <Card>
                  <IngredientItem
                    calories={item.calories}
                    protein={item.protein}
                    ingredient={item.name}
                    quantity={item.quantity}
                  />
                </Card>
              )}></List>
          </ScrollView>
          <Text style={styles.text}>Total Nutrients</Text>
          {ingredients.length > 0 && (
            <ScrollView style={{maxHeight: '20%'}} nestedScrollEnabled={true}>
              <Text>Calories: {getNutrient('calories')}</Text>
              <Text>Protein: {getNutrient('protein')}</Text>
            </ScrollView>
          )}

          <Text style={styles.text}>Instructions</Text>
          <ScrollView>
            <TextInput
              fontSize={20}
              placeholder={'write instructions here...'}></TextInput>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: '#fff',
  },
  toolbar: {
    flex: 1,
    backgroundColor: '#e050ef',
  },
  text: {
    fontSize: 25,
  },
});

CreateRecipe.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default CreateRecipe;
