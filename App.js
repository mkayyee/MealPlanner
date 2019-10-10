import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { SIProvider } from './context/SelectedIngredients';
import { IngredientProvider } from './context/IngredientContext';
import { SRProvider } from './context/SelectedRecipes';
import Navigator from './navigators/Navigator';
import { RecipeProvider } from './context/RecipeContext';
import { UserProvider } from './context/UserContext';

const App = () => {
  const [isReady, setIsReady] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require('./node_modules/native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('./node_modules/native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
      ...FontAwesome.font
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
    <UserProvider>
      <RecipeProvider>
        
          <IngredientProvider>
            <SRProvider>
            <SIProvider>
              <Navigator />
            </SIProvider>
            </SRProvider>
          </IngredientProvider>
        
      </RecipeProvider>
    </UserProvider>
  );
};

export default App;
