import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {List as BaseList} from 'native-base';
import MyRecipesListItem from './MyRecipesItem';
import mediaAPI from '../hooks/ApiHooks';
import {UserContext} from '../context/UserContext';

const MyRecipesList = (props) => {
  const {navigation} = props;
  const {getAllMyRecipes} = mediaAPI();

 
 
  const [user] = useContext(UserContext);
  const [myRecipes, loading] = getAllMyRecipes(user.user_id);

  //console.log(loading);
  //console.log('media', myMedia);

  return (
    <BaseList
      dataArray={myRecipes}
      renderRow={(item) =>
        <MyRecipesListItem navigation={navigation} singleRecipe={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

MyRecipesList.propTypes = {
  navigation: PropTypes.object,
};

export default MyRecipesList;