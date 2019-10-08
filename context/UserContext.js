import React, {useState} from 'react';
import PropTypes from 'prop-types';

const UserContext = React.createContext({});
const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  media: PropTypes.array,
  user: PropTypes.object,
  children: PropTypes.node,
};


export {UserContext, UserProvider};