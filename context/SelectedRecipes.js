import React, {useState} from 'react';
import PropTypes from 'prop-types';

const SelectedRecipes = React.createContext([{}, () => {}]);

// Context for the currently selected ingredients

const SRProvider = (props) => {
  
  const [recipes, setRecipes] = useState([]);
  return (
    <SelectedRecipes.Provider value={[recipes, setRecipes]}>
      {props.children}
    </SelectedRecipes.Provider>
  );
};

SRProvider.propTypes = {
  children: PropTypes.node,
};

export {SelectedRecipes, SRProvider};
