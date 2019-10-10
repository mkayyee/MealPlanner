import React from 'react';
import PropTypes from 'prop-types';
import {List as BaseList} from 'native-base';
import RecipeItem from './RecipeItem';
import mediaAPI from '../hooks/ApiHooks';

const RecipeList = (props) => {
 
  const {navigation} = props;
  const {getRecipes} = mediaAPI();
  const [recipes, loading] = getRecipes();
 
  return (

    <BaseList style={{marginLeft:0, marginRight:0, paddingLeft: 0, paddingRight: 0}}
    style={{backgroundColor
      : 'white'}}
      dataArray={recipes}
      renderRow={(item) =>
        <RecipeItem navigation={navigation} singleRecipe={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

RecipeList.propTypes = {
  navigation: PropTypes.object,
};

export default RecipeList;