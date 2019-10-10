import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SCREEN_IMPORT from 'Dimensions';
import { Image, TouchableOpacity, View, ImageBackground } from 'react-native';
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
  Content,
  Card,
  CardItem,
} from 'native-base';
import {MaterialIcons as Icon} from '@expo/vector-icons';
import mediaAPI from '../hooks/ApiHooks';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const RecipeItem = (props) => {
  const { navigation, singleRecipe } = props;
  const { getUserInfo, getThumbnail, getAvatar } = mediaAPI();
  const recipeInfo = JSON.parse(singleRecipe.description);
  const [userInfo, setUserInfo] = useState({});
  //const [avatar, setAvatar] = useState('http://placekitten.com/100/100');

  let SCREEN_WIDTH = SCREEN_IMPORT.get('window').width;

  useEffect(() => {
    SCREEN_WIDTH = SCREEN_IMPORT.get('window').width,
    getUserInfo(singleRecipe.user_id)
      .then((json) => {
        setUserInfo(json);
      })
      .catch((error) => {
        console.log(console.error);
      });
  }, []);

  useEffect(() => {
    //console.log('description from RecipeItem: \n', recipeInfo);
    //console.log('calories: \n', recipeInfo.totalNutrients.calories);
    // etc...
  });
  return (

    <BaseListItem
      onPress={() => {
        navigation.push('Single', { file: singleRecipe });
      }}
    >
      <Content>
        <Card >
          <CardItem style={{paddingTop: 0, paddingBottom: 0,}}>
            <Body >
              <Body>
                <Image
                  square
                  large
                  source={{
                    uri:
                      'http://media.mw.metropolia.fi/wbma/uploads/' +
                      singleRecipe.filename
                  }}
                  style={{ height: 340, width: SCREEN_WIDTH}}
                />
                <View
                  style={{
                    position: 'absolute',
                    top: 15,
                    left: 25,
                    right: 0,
                    bottom: 0
                  }}
                >
                  <TouchableOpacity
                    style={{ width: '40%', height: '20%' }}
                    onPress={() => {
                      console.log('User pressed');
                    }}
                  >
                    <Thumbnail
                      source={{ uri: getAvatar(singleRecipe.user_id) }}
                      style={{
                        borderRadius: 20,
                        width: 40,
                        height: 40,
                        position: 'relative',
                        right: 0,
                        bottom: 0
                      }}
                    />
                    {
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: 'white',
                          position: 'relative',
                          top: -30,
                          left: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                          textShadowRadius: 10,
                          textShadowOffset: { width: -1.5, height: 1.5 },
                          textShadowColor: 'black'
                        }}
                      >
                        by {userInfo.username}
                      </Text>
                    }
                  </TouchableOpacity>
                </View>
                <View style={{
                    top: 230,
                    left: 40,
                    right: 20,
                    bottom: 0,
                    position: 'absolute'
                  }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textShadowRadius: 10,
                    textShadowOffset: { width: -1.5, height: 1.5 },
                    textShadowColor: 'black'
                  }}
                >
                  {singleRecipe.title}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textShadowRadius: 10,
                    textShadowOffset: { width: -1.5, height: 1.5 },
                    textShadowColor: 'black'
                  }}
                >
                  Calories : {recipeInfo.totalNutrients.calories}
                </Text>
                </View>
              </Body>
            </Body>
          </CardItem>
          <TouchableOpacity
            onPress={() => {
              navigation.push('Profile', { file: singleRecipe });
            }}
          >
            <CardItem style={{width: SCREEN_WIDTH}}>
              <Text style={{ fontSize: 15, paddingLeft: 40 }}>
                Add to Meal Plan
              </Text>
              <Right>
                <TouchableOpacity
                  onPress={() => {
                    navigation.push('Profile', { file: singleRecipe });
                  }}
                  style={{
                    width: 35,
                    height: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 20
                  }}
                >
                  <Icon color={'#fd7e03'} size={35} name='add-circle'></Icon>
                </TouchableOpacity>
              </Right>
            </CardItem>
          </TouchableOpacity>
        </Card>
      </Content>
    </BaseListItem>

  );
};

RecipeItem.propTypes = {
  singleRecipe: PropTypes.object,
  navigation: PropTypes.object
};

export default RecipeItem;
