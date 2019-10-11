import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  ListItem as BaseListItem,
  Button,
  Left,
  Thumbnail,
  Body,
  Right,
  H2,
  Text,
} from 'native-base';
import mediaAPI from '../hooks/ApiHooks';
import {RecipeContext} from '../context/RecipeContext';

const MyRecipesListItem = (props) => {

  const {setRecipes, setMyRecipes} = useContext(RecipeContext);
  
  const {navigation, singleRecipe} = props;
  const {getThumbnail, deleteMedia} = mediaAPI();
  const tn = getThumbnail(singleRecipe.file_id);
  const recipeInfo = JSON.parse(singleRecipe.description);

  useEffect(() => {
    console.log()
  });

  return (
    <BaseListItem thumbnail>
      <Left>
        {tn && <Thumbnail square large source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + tn.w160}} />
        }
      </Left>
      <Body>
        <H2>{singleRecipe.title}</H2>
        <Text numberOfLines={2}>Calories: {recipeInfo.totalNutrients.calories}</Text>
      </Body>
      <Right style = {{paddingBottom:6}}>
        <Button
          onPress={
            () => {
              console.log('klik');
              navigation.push('Single', {file: singleRecipe});
            }
          }
        >
          <Text>View</Text>
        </Button>
        <Button
          onPress={
            () => {
              console.log('press');
              deleteMedia(singleRecipe, setMyRecipes, setRecipes);
            }
          }
        >
          <Text>Delete</Text>
        </Button>
      </Right>
    </BaseListItem>
  );
};

MyRecipesListItem.propTypes = {
  singleRecipe: PropTypes.object,
  navigation: PropTypes.object,
};

export default MyRecipesListItem;