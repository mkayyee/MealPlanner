import {useState, useContext, useEffect} from 'react';
import {AsyncStorage} from 'react-native';
import {IngredientContext} from '../context/IngredientContext';
import {MediaContext} from '../context/MediaContext';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';
const foodUrl = 'http://185.87.111.206/foodapi/';

const fetchGetUrl = async (url) => {
  const userToken = await AsyncStorage.getItem('userToken');
  //console.log('fetchGetUrl', url);
  const response = await fetch(url, {
    headers: {
      'x-access-token': userToken,
    },
  });
  const json = await response.json();
  //console.log('fetchUrl json', json);
  return json;
};

const fetchPostUrl = async (url, data) => {
  //console.log('fetchPostUrl', url);
  //console.log('fetchPostUrl data', data);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  //console.log('fetchPostUrl json', json);
  return json;
};

const mediaAPI = () => {

  const signInAsync = async (inputs, props) => {
    const data = {
      'username': inputs.username,
      'password': inputs.password,
    };
    const json = await fetchPostUrl(apiUrl + 'login', data);
    await AsyncStorage.setItem('userToken', json.token);
    await AsyncStorage.setItem('user', JSON.stringify(json.user));
    console.log("strihgify", JSON.stringify(json.user));
    props.navigation.navigate('App');
  };

  const registerAsync = async (inputs, props) => {
    const data = {
      'username': inputs.username,
      'password': inputs.password,
      'email': inputs.email,
      'full_name': inputs.full_name,
    };
    const json = await fetchPostUrl(apiUrl + 'users', data);
    if (!json.error) {
      signInAsync(inputs, props);
    }
  };

  const userFree = async(username) => {

    const json = await fetchGetUrl(apiUrl + 'users/username/' + username);
    if (!json.error) {
      if (json.available) {
        return 'Username ' + json.username + ' is available. ';
      } else {
        return 'Username ' + json.username + ' is not available. ';
      }
    } else {
      //console.log(json.error);
    }
  };

  const getAllIngredients = () => {
    const [ingredients, setIngredients] = useContext(IngredientContext);
    const fetchUrl = async () => {
      const response = await fetch(foodUrl + 'all');
      const json = await response.json();
      const fullJson = json.map(async (element, index) => {
        element.key = `${index}`;
        return element;
      });
      const resolved = await Promise.all(fullJson);
  
      // removing reduntant information
      const filtered = resolved.map((obj)=>{
        return (obj.hits[0].fields);
      });
      setIngredients(filtered);
    };
    useEffect(() => {
      fetchUrl();
    }, []);
    return [ingredients];
  };

  const getAvatar = (user) => {
    const [avatar, setAvatar] = useState('http://placekitten.com/100/100');
    //console.log('avatar', apiUrl + 'tags/avatar_' + user.user_id);
    useEffect(() => {
      fetchGetUrl(apiUrl + 'tags/avatar_' + user.user_id).then((json) => {
        //console.log('avatarjson', json[0].filename);
        setAvatar(apiUrl + 'uploads/' + json[0].filename);
      });
    }, []);
    return avatar;
  };
 
  const userToContext = async () => { // Call this when app starts (= Home.js)
    const {user, setUser} = useContext(MediaContext);
    const getFromStorage = async () => {
      const storageUser = JSON.parse(await AsyncStorage.getItem('user'));
      console.log('storage', storageUser);
      setUser(storageUser);
    };
    useEffect(() => {
      getFromStorage();
    }, []);
    return [user];
  };


  return {
    
    signInAsync,
    registerAsync,
    userFree,
    getAllIngredients,
    userToContext,
    getAvatar,
    
  };
};

export default mediaAPI;
