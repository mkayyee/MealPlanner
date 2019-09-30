import React, {useState, useEffect}  from 'react';
import {
  StyleSheet
} from 'react-native';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import {AppLoading} from 'expo';

import Welcome from './views/Welcome';
import Navigator from './navigators/Navigator'

const App = () => {

  const [isReady, setIsReady] = useState(false);

  const loadFonts = async () => {

  await Font.loadAsync({
  Roboto: require('./node_modules/native-base/Fonts/Roboto.ttf'),
  Roboto_medium: require('./node_modules/native-base/Fonts/Roboto_medium.ttf'),
  FontAwesome: require('./node_modules/native-base/Fonts/FontAwesome.ttf'),
  ...Ionicons.font,
  });
  setIsReady(true);
  };

  useEffect(() => {
  loadFonts();
  }, []);

  if (!isReady) {
  return <AppLoading />;
  }

  return (
   
      <Navigator/> 
      
  );
};

export default App;
