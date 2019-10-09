import React, {useState} from 'react';
import PropTypes from 'prop-types';

const RecipeContext = React.createContext([{}, () => {}]);


const RecipeProvider = (props) => {
  const {
    recipes: initialRecipes,
    myRecipes: initialMyRecipes,
    children,
  } = props;
  const [recipes, setRecipes] = useState(initialRecipes);
  const [myRecipes, setMyRecipes] = useState(initialMyRecipes);

  const appContext = {
    recipes,
    setRecipes,
    myRecipes,
    setMyRecipes,
  };

  return (
    <RecipeContext.Provider value={appContext}>
      {children}
    </RecipeContext.Provider>
  );
};

RecipeProvider.propTypes = {
  myRecipes: PropTypes.array,
  recipes: PropTypes.array,
  user: PropTypes.object,
  children: PropTypes.node,
};

RecipeProvider.defaultProps = {
  recipes: [],
  myRecipes: [],
};

export {RecipeContext, RecipeProvider};
