/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* global require */
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import IngredientItem from '../components/IngredientItem';
import { Text, List, Card } from 'native-base';
import { SelectedIngredients } from '../context/SelectedIngredients';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import useRecipeForm from '../hooks/RecipeCreateHook';
import { FontAwesome as RemoveIcon } from '@expo/vector-icons';

const CreateRecipe = (props) => {
  const [file, setFile] = useState(null);
  const { navigation } = props;
  const [ingredients, setIngredients] = useContext(SelectedIngredients);
  const {
    handleRecipeNameChange,
    inputs,
    errors,
    handleInstructionsChange,
    handleRecipeUpload,
    clearInputs,
  } = useRecipeForm();

  useEffect(() => {});

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

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      setFile(result);
      // setValidate({description: validated.description, title: validated.title, image: true});
    }
  };

  const resetAll = () => {
    clearInputs(setFile);
    setIngredients([]);
  }

  useEffect(() => {
    getPermissionAsync();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop: 10}}>
        <Button
          block
          onPress={() => 
            resetAll()
          }
          title='Reset'
        ></Button>
        <Button
          block
          onPress={pickImage}
          color='green'
          title='Select Image'
        ></Button>
        {file && (
          <View style={{ position: 'relative' }}>
            <Image
              source={{ uri: file.uri }}
              style={{ width: '100%', height: 200, marginTop: 5 }}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                padding: 0,
                margin: 0,
                right: 5,
                top: 5
              }}
              onPress={() => {
                setFile(null);
              }}
            >
              <RemoveIcon name={'remove'} size={25} color={'red'}></RemoveIcon>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={{ justifyContent: 'flex-start' }}>
        <Text style={styles.text}>Recipe</Text>
        <TextInput
          value={inputs.recipeName}
          fontSize={20}
          onChangeText={handleRecipeNameChange}
          placeholder={'recipe name...'}
        ></TextInput>
        {errors.recipeName && (
          <Text style={{ color: 'red' }}>{errors.recipeName}</Text>
        )}
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
            title={'New Ingredient'}
          ></Button>
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
                    carbs={item.carbs}
                  />
                </Card>
              )}
            ></List>
          </ScrollView>
          <Text style={styles.text}>Total Nutrients</Text>
          {ingredients.length > 0 && (
            <ScrollView style={{ maxHeight: '20%' }} nestedScrollEnabled={true}>
              <Text>Calories: {getNutrient('calories')}</Text>
              <Text>Protein: {getNutrient('protein')}</Text>
            </ScrollView>
          )}

          <Text style={styles.text}>Instructions</Text>
          <ScrollView>
            <TextInput
              value={inputs.instructions}
              fontSize={20}
              onChangeText={handleInstructionsChange}
              placeholder={'write instructions here...'}
            ></TextInput>
          </ScrollView>
        </View>
      </View>
      <View style={{ marginTop: 30 }}>
        <Button
          block
          onPress={() => {
            handleRecipeUpload(file, ingredients, navigation);
            resetAll();
          }}
          disabled={file && errors.recipeName == null ? false : true}
          color={file && errors.recipeName == null ? 'green' : 'grey'}
          title='Create Recipe'
        ></Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: '#fff'
  },
  toolbar: {
    flex: 1,
    backgroundColor: '#e050ef'
  },
  text: {
    fontSize: 25
  }
});

CreateRecipe.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default CreateRecipe;
