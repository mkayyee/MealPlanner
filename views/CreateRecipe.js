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
  TouchableOpacity,
  ImageBackground,
  StatusBar
} from 'react-native';
import PropTypes from 'prop-types';
import IngredientItem from '../components/IngredientItem';
import {
  Text,
  List,
  Card,
  Button,
  Header,
  Right,
  Title
} from 'native-base';
import { SelectedIngredients } from '../context/SelectedIngredients';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import useRecipeForm from '../hooks/RecipeCreateHook';
import {
  FontAwesome as Icon,
  AntDesign as ExclamationCircle
} from '@expo/vector-icons';
import HomeDropdown from '../components/HomeDropdown';

const CreateRecipe = (props) => {
  const [displayErrors, setDisplayErrors] = useState(false);
  const [file, setFile] = useState(null);
  const { navigation } = props;
  const [ingredients, setIngredients] = useContext(SelectedIngredients);
  const {
    handleRecipeNameChange,
    inputs,
    errors,
    handleInstructionsChange,
    handleRecipeUpload,
    clearInputs
  } = useRecipeForm();

  useEffect(() => {});

  // Returns the total value of a chosen nutrient from all the selected ingredients
  // CreateRecipe currently takes only protein and calories as props so rest will have to be implemented
  const getNutrient = (nutrient) => {
    let adder = 0;
    for (let i = 0; i < ingredients.length; i++) {
      adder += ingredients[i][nutrient] * ingredients[i].quantity;
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
    }
  };

  const resetAll = () => {
    clearInputs(setFile);
    setIngredients([]);
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const validateAll = () => {
    return (
      file != null &&
      errors.recipeNameError == null &&
      errors.instructionsError == null &&
      ingredients.length > 1
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#1f425f'></StatusBar>
      <ImageBackground blurRadius={2} source = {require("../pictures/vegetables.jpeg")} style={{flex:1, 
    width: '100%', 
    height: '100%'}} > 
      <Header style={{ backgroundColor: 'white'}}>
      <Image source={require("../pictures/logo.jpg")} style={{height: 30, width: 30, marginTop:10, marginRight: 10, marginLeft: 10}} />
          <Title style={{marginTop:10, marginLeft: 20, color:"black"}}>Meal Planner</Title>
          <Right>
          <HomeDropdown navigation={navigation}></HomeDropdown>
        </Right>
      </Header>
      <ScrollView>
        <View style={{ margin: 40, marginTop: 10, marginBottom: 0 }}>
          <Button
            width={'50%'}
            style={styles.goodButton}
            rounded
            onPress={() => resetAll()}
          >
            <Text>Reset</Text>
          </Button>
          <Button
            rounded
            width={'50%'}
            style={styles.goodButton}
            onPress={pickImage}
          >
            <Text>Select Image</Text>
          </Button>
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
                <Icon name={'remove'} size={25} color={'red'}></Icon>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={{ justifyContent: 'flex-start', margin: 40, marginTop: 0 }}
        >
          <Text style={styles.text}>Recipe</Text>
          <View style={{marginLeft: 8, marginRight: 8}}>
          <TextInput
            value={inputs.recipeName}
            fontSize={20}
            onChangeText={handleRecipeNameChange}
            placeholder={'recipe name...'}
            maxLength={80}
            multiline={true}
            blurOnSubmit={true}
            style={styles.textInput}
          ></TextInput>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>Ingredients</Text>
            {ingredients.length != 1 ? (
              <Text style={{marginTop: 12, color: '#fdffe9'}}>({ingredients.length} items)</Text>
            ) : (
              <Text style={{marginTop: 12, color: '#fdffe9'}}>(1 item)</Text>
            )}
          </View>
          <Button
            onPress={() => {
              navigation.navigate('Ingredients');
            }}
            rounded
            width={'50%'}
            style={styles.goodButton}
          >
            <Text>New Ingredient</Text>
          </Button>
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
                    fat={item.fat}
                    allergens={item.allergens}
                    saturated_fat={item.saturated_fat}
                    sugars={item.sugars}
                    sodium={item.sodium}
                  />
                </Card>
              )}
            ></List>
          </ScrollView>
          {ingredients.length > 0 && (
            <Text style={styles.text}>Total Nutrients</Text>
          )}
          {ingredients.length > 0 && (
            <View style={{ maxHeight: '25%', marginLeft: 8}} nestedScrollEnabled={true}>
              <Text style={styles.nutrient}>Calories: {getNutrient('calories')}g</Text>
              <Text style={styles.nutrient}>Protein: {getNutrient('protein')}g</Text>
              <Text style={styles.nutrient}>Carbohydrates: {getNutrient('carbs')}g</Text>
              <Text style={styles.nutrient}>Fat: {getNutrient('fat')}g</Text>
              <Text style={styles.nutrient}>Saturated fat: {getNutrient('saturated_fat')}</Text>
              <Text style={styles.nutrient}>Sugars: {getNutrient('sugars')}g</Text>
              <Text style={styles.nutrient}>Sodium: {getNutrient('sodium')}mg</Text>
            </View>
          )}
          <Text style={styles.text}>Instructions</Text>
          <View style={{ marginLeft: 8, marginRight: 8 }}>
            <TextInput
              value={inputs.instructions}
              multiline={true}
              blurOnSubmit={true}
              fontSize={20}
              onChangeText={handleInstructionsChange}
              style={styles.textInput}
              placeholder={'write instructions here...'}
            ></TextInput>
          </View>
          {!validateAll() ? (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end'
              }}
              onPress={() => {
                setDisplayErrors(!displayErrors);
              }}
            >
              <ExclamationCircle
                color='#fd7e03'
                name='exclamationcircleo'
                size={25}
              ></ExclamationCircle>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end'
              }}
            >
              <Icon name='check-circle' color='#fd7e03' size={25}></Icon>
            </TouchableOpacity>
          )}
          <View>
            {displayErrors && (
              <View style={{marginLeft: 5, marginRight: 5}}>
                {errors.recipeNameError != null && (
                  <Text style={styles.errorText}>
                    -{errors.recipeNameError}
                  </Text>
                )}
                {errors.instructionsError != null && (
                  <Text style={styles.errorText}>
                    -{errors.instructionsError}
                  </Text>
                )}
                {file == null && (
                  <Text style={styles.errorText}>
                    -You must select an image
                  </Text>
                )}
                {ingredients.length < 2 && (
                  <Text style={styles.errorText}>
                    -You must select at least 2 unique ingredients
                  </Text>
                )}
              </View>
            )}
            <Button
              block
              onPress={() => {
                handleRecipeUpload(file, ingredients, navigation, resetAll);
              }}
              disabled={validateAll() ? false : true}
              style={{
                justifyContent: 'center',
                margin: 20,
                marginRight: 0,
                marginLeft: 0,
                backgroundColor: validateAll() ? '#1b2b38' : 'grey'
              }}
            >
              <Text>Create Recipe</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#fff'
  },
  toolbar: {
    flex: 1,
    backgroundColor: '#e050ef'
  },
  text: {
    margin: 5,
    fontSize: 25,
    color: '#fd7e03',
    alignSelf: 'flex-start',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowRadius: 3,
    textShadowOffset: {width: -1, height: 1}
  },
  errorText: {
    color: '#d53900',
    fontSize: 15,
  },
  goodButton: {
    margin: 5,
    justifyContent: 'center',
    backgroundColor: '#385b71',
  },
  textInput: {
    marginLeft: 16, marginRight: 16, color: '#fdffe9', textShadowColor: 'black', textShadowRadius: 1, textShadowOffset: {width: -1, height: 1},
  },
  nutrient: {
    marginLeft: 16, marginRight: 16, color: '#fdffe9', textShadowColor: 'black', textShadowRadius: 1, textShadowOffset: {width: -1, height: 1},
  }
});

CreateRecipe.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default CreateRecipe;
