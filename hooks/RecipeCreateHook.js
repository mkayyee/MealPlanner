import { useState } from 'react';
import validate from 'validate.js';
import validation from '../validators/Validation';
import mediaAPI from './ApiHooks';

const useRecipeForm = () => {
  const {uploadRecipe} = mediaAPI();
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  const handleRecipeNameChange = (text) => {
    const recipeNameError = validator('recipe', text);
    setErrors((errors) => ({
      ...errors,
      recipeName: recipeNameError
    }));
    setInputs((inputs) => ({
      ...inputs,
      recipeName: text
    }));
  };

  const handleInstructionsChange = (text) => {
    setInputs((inputs) => ({
      ...inputs,
      instructions: text
    }));
  };

  const handleRecipeUpload = (file, ingredients) => {
    const nutrientsObject = {protein: 0, carbs: 0, calories: 0, ingredients: []}
    // Total nutrient values turned into an object
    ingredients.map((elem, index) => {
      nutrientsObject.protein += Math.round(elem.protein * elem.quantity);
      nutrientsObject.carbs += Math.round(elem.carbs * elem.quantity);
      nutrientsObject.calories += Math.round(elem.calories * elem.quantity);
      nutrientsObject.ingredients[index] = {name: elem.name, quantity: elem.quantity};
    });
    const descriptionObject = {totalNutrients: nutrientsObject, instructions: inputs.instructions};

    const fd = new FormData();
    const filename = file.uri.split('/').pop();

    // Infer the type of the image
    const match = /\.(\w+)$/.exec(filename);
    let type = '';
    if (file.type === 'image') {
      type = match ? `image/${match[1]}` : `image`;
    } else {
      type = match ? `video/${match[1]}` : `video`;
    }

    // Upload the image using the fetch and FormData APIs
    // Assume "photo" is the name of the form field the server expects
    fd.append('file', { uri: file.uri, name: filename, type });
    fd.append('title', inputs.recipeName);
    fd.append('description', JSON.stringify(descriptionObject));

    console.log(descriptionObject);

    const response = uploadRecipe(fd);
    console.log(response);
  };

  return {
    handleRecipeNameChange,
    inputs,
    errors,
    handleInstructionsChange,
    handleRecipeUpload
  };
};
export default useRecipeForm;

const validator = (field, value) => {
  let object = {};
  if (typeof value === 'string') {
    object[field] = value;
  } else {
    object = value;
  }
  const constraint = validation[field];
  const result = validate(object, { [field]: constraint });

  if (result) {
    return result[field][0];
  }
  return null;
};
