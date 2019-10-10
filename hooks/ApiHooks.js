import { useState, useContext, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { IngredientContext } from '../context/IngredientContext';
import { RecipeContext } from '../context/RecipeContext';
import {UserContext} from '../context/UserContext';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';
const foodUrl = 'http://185.87.111.206/foodapi/';

const fetchGetUrl = async (url) => {
  const userToken = await AsyncStorage.getItem('userToken');
  const response = await fetch(url, {
    headers: {
      'x-access-token': userToken
    }
  });
  const json = await response.json();
  //console.log('fetchUrl json', json);
  return json;
};

const fetchPostUrl = async (url, data) => {
  console.log(JSON.stringify(data));
  console.log('fetchPostUrl data', data);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const json = await response.json().catch((error) => {
    console.log(error);
  });
  console.log('fetchPostUrl json', json);
  return json;
};



const fetchDeleteUrl = async (url, token = '') => {
  const userToken = await AsyncStorage.getItem('userToken');
  console.log('fetchDeleteUrl', url, userToken);
  const response = await fetch(apiUrl + url, {
    method: 'DELETE',
    headers: {
      'x-access-token': userToken,
    },
  });
  const json = await response.json();
  console.log('fetchDeleteUrl json', json);
  return json;
};


const mediaAPI = () => {
  const signInAsync = async (inputs, props) => {
    const data = {
      username: inputs.username,
      password: inputs.password
    };
    const json = await fetchPostUrl(apiUrl + 'login', data);
    await AsyncStorage.setItem('userToken', json.token);
    await AsyncStorage.setItem('user', JSON.stringify(json.user));
    console.log('strihgify', JSON.stringify(json.user));
    props.navigation.navigate('App');
  };

  const registerAsync = async (inputs, props) => {
    const data = {
      username: inputs.username,
      password: inputs.password,
      email: inputs.email,
      full_name: inputs.full_name
    };
    const json = await fetchPostUrl(apiUrl + 'users', data);
    if (!json.error) {
      signInAsync(inputs, props);
    }
  };

  const userFree = async (username) => {
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

  const getThumbnail = (url) => {
    const [thumbnails, setThumbnails] = useState({});
    useEffect(() => {
      fetchGetUrl(apiUrl + 'media/' + url).then((json) => {
        setThumbnails(json.thumbnails);
      });
    }, []);
    return thumbnails;
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
      const filtered = resolved.map((obj) => {
        return obj.hits[0].fields;
      });
      setIngredients(filtered);
    };
    useEffect(() => {
      fetchUrl();
    }, []);
    return [ingredients];
  };

  const getAvatar = (id) => {
    const [avatar, setAvatar] = useState('https://static.ex-in.online/users/2/20082/10506738_10150004552801856_220367501106153455_o_5c358dad.jpg');
    //console.log('avatar', apiUrl + 'tags/avatar_' + user.user_id);
    useEffect(() => {
      fetchGetUrl(apiUrl + 'tags/avatar_' + id).then((json) => {
        //console.log('avatarjson', json[0].filename);
        if (json[0] != undefined) {
          setAvatar(apiUrl + 'uploads/' + json[0].filename);
        }
      });
    }, []);
    return avatar;
  };

  const reloadAllMyRecipes = (setMyRecipes, id) => {

    const userTaggedFiles = [];

    console.log("iddddd", id);

      fetchGetUrl(apiUrl + 'tags/' + 'MealPlanner').then((json) => {
        
          for (let i=0; i < json.length; i++){
          if (json[i].user_id == id) {
            console.log ("jsssssosoosos", json[i].user_id);
          userTaggedFiles.push(json[i]);
          }
        }
        console.log("tagged", userTaggedFiles);
        setMyRecipes(userTaggedFiles);
      });
   
        
  };
  const reloadAllRecipes = (setRecipes) => {
    
    fetchGetUrl(apiUrl + 'tags/' + 'MealPlanner').then((json) => {
    setRecipes(json);

    });
       
  };

  const deleteMedia = async (file, setMyRecipes, setRecipes) => {

    return fetchDeleteUrl('media/' + file.file_id).then((json) => {
      
      setRecipes([]);
      setMyRecipes([]);
      reloadAllRecipes(setRecipes);
      reloadAllMyRecipes(setMyRecipes, file.user_id);
    });
  };


  const getAllMyRecipes = (id) => {
    const {myRecipes, setMyRecipes} = useContext(RecipeContext);
    const [loading, setLoading] = useState(true);
    const userTaggedFiles = [];

    useEffect(() => {
      fetchGetUrl(apiUrl + 'tags/' + 'MealPlanner').then((json) => {
          for (let i=0; i < json.length; i++){
          if (json[i].user_id == id) {
          userTaggedFiles.push(json[i]);
          }
        }
        setMyRecipes(userTaggedFiles);
        setLoading(false);
      });
    }, []);
    return [myRecipes, loading];
  };



  const getUserInfo = async (id) => {
    const userInfo= await  fetchGetUrl(apiUrl + 'users/' + id);
    return userInfo;
  };

  const userToContext = async () => {
    // Call this when app starts (= Home.js)
    const [user, setUser]= useContext(UserContext);
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

  const fetchUploadUrl = async (url, data, ingredients) => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('fetchUploadUrl', url, data, userToken);
    const response = await fetch(apiUrl + url, {
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
        'x-access-token': userToken
      },
      body: data
    });
    let json = { error: 'oops' };
    if (response.ok) {
      json = await response.json();
      console.log('fetchUploadUrl json', json);

      // Add MealPlanner tag into the file
      addTag(json.file_id, 'MealPlanner');
    } else {
      console.log(response);
    }
    return json;
  };

  const uploadRecipe = async (formData) => {
    return fetchUploadUrl('media', formData).then((json) => {
      return json;
    });
  };

  const addTag = async (id, tag) => {
    const userToken = await AsyncStorage.getItem('userToken');
    const response = await fetch(apiUrl + 'tags', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-access-token': userToken
      },
      body: JSON.stringify({ file_id: id, tag: tag })
    });
    const json = await response.json();
    console.log(json);
  };
 
  const getRecipes = () => {
    const {recipes, setRecipes} = useContext(RecipeContext);
    const [loading, setLoading] = useState(true);
    // Fetch all media files with MealPlanner tag
    useEffect(() => {
      fetchGetUrl(apiUrl + 'tags/' + 'MealPlanner').then((json) => {
        setRecipes(json);
        setLoading(false);
      });
    }, []);
    return [recipes, loading];
  };

  
  //  Example: const intakeObject = {id: {whatever.user_id}, data: {calories: 12345g, protein: 50g, carbs: 100g}};
  //  addIdealIntakes(intakeObject);
  const addIdealIntakes = (dataObject) => {
    if (dataObject.id && dataObject.data) {
      fetchPostUrl(foodUrl + 'addideal', dataObject).then((json) => {
        return json;
      });
    } else {
      console.log(
        'The parameter for this function should be in the form of: {id: 234234523, data: {calories: 12345623, protein: 234, ... etc}}\nYour input:\n', dataObject      );
    }
  };
  // Example: getIdealIntakes(2440);   ---> returns an object containing user's
  // recommended nutrient intakes or null if the user doesn't have them calculated
  const getIdealIntakes = (userID, setIdeals) => {
    fetchGetUrl(foodUrl + 'ideals/' + userID)
      .then((json) => {
        if (json != undefined && json[0] != undefined) {
          if (JSON.parse(json[0].data)) {
            setIdeals(JSON.parse(json[0].data))
            return (JSON.parse(json[0].data));
          } else {
            return null;
          }
        } else {
          return (null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    signInAsync,
    registerAsync,
    userFree,
    getAllIngredients,
    userToContext,
    getAvatar,
    uploadRecipe,
    getThumbnail,
    getRecipes,
    reloadAllRecipes,
    reloadAllMyRecipes,
    getUserInfo,
    addIdealIntakes,
    getIdealIntakes,
    deleteMedia,
    getAllMyRecipes,
  };
};

export default mediaAPI;
