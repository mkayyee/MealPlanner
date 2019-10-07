import React, { useEffect, useState } from 'react';
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
  Card,
  CardItem
} from 'native-base';
import mediaAPI from '../hooks/ApiHooks';
import { Image, TouchableOpacity } from 'react-native';

const RecipeItem = (props) => {
  //const {userInfo, setUserInfo} = useState({username: ''});
  const { navigation, singleRecipe } = props;
  const { getThumbnail, getUserInfo, getAvatar } = mediaAPI();
  const tn = getThumbnail(singleRecipe.file_id);
  const recipeInfo = JSON.parse(singleRecipe.description);

  useEffect(() => {
    //setUserInfo(getUserInfo(singleRecipe.user_id));
    //console.log('description from RecipeItem: \n', recipeInfo);
    //console.log('calories: \n', recipeInfo.totalNutrients.calories);
    // etc...
  });
  return (
    <Card style={{ flex: 0 }}>
      <TouchableOpacity onPress={() => {console.log('Navigate to single here with:\n', recipeInfo)}}>
        <CardItem>
          <Body>
            <Image
              source={{
                uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + tn.w160
              }}
              style={{ height: 340, width: '100%' }}
            />
            <Thumbnail
              source={{ uri: getAvatar(singleRecipe.user_id) }}
              style={{
                borderRadius: 50,
                width: 40,
                height: 40,
                position: 'absolute',
                top: 15,
                left: 5,
                right: 0,
                bottom: 0
              }}
            />
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                position: 'absolute',
                top: 22,
                left: 55,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              by {getUserInfo(singleRecipe.user_id).username}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 30,
                color: 'white',
                position: 'absolute',
                top: 230,
                left: 20,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '90%'
              }}
            >
              {singleRecipe.title}
            </Text>
          </Body>
        </CardItem>
      </TouchableOpacity>
    </Card>
  );
};

RecipeItem.propTypes = {
  singleRecipe: PropTypes.object,
  navigation: PropTypes.object
};

export default RecipeItem;
