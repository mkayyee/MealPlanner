import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  ListItem as BaseListItem,
  Button,
  Left,
  Thumbnail,
  Body,
  Right,
  H2,
  H3,
  Text,
} from 'native-base';
import mediaAPI from '../hooks/ApiHooks';

const RecipeItem = (props) => {
  const {navigation, singleRecipe} = props;
  const {getThumbnail} = mediaAPI();
  const tn = getThumbnail(singleRecipe.file_id);
  const recipeInfo = JSON.parse(singleRecipe.description);

  useEffect(() => {
      //console.log('description from RecipeItem: \n', recipeInfo);
      //console.log('calories: \n', recipeInfo.totalNutrients.calories);
      // etc...
  }, )
  return (
    <BaseListItem thumbnail>
      <Left>
        {tn && <Thumbnail square large source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + tn.w160}} />
        }
      </Left>
      <Body>
        <H2>{singleRecipe.title}</H2>
        <H3>Instructions</H3>
        <Text numberOfLines={20}>{recipeInfo.instructions}</Text>
        <Text>Calories: {recipeInfo.totalNutrients.calories}</Text>
      </Body>
      <Right>
        <Button
          onPress={
            () => {
              navigation.push('Single', {file: singleRecipe});
            }
          }
        >
          <Text>View</Text>
        </Button>
      </Right>
    </BaseListItem>
  );
};

RecipeItem.propTypes = {
  singleRecipe: PropTypes.object,
  navigation: PropTypes.object,
};

export default RecipeItem;
