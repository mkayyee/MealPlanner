import React, {useState, useContext} from 'react';
import {StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import {ListItem as BaseItem, Text} from 'native-base';
import {Ionicons as Icon} from '@expo/vector-icons';
import {SelectedIngredients} from '../context/SelectedIngredients';

const AddIngredient = (props) => {
  const [quantity, setQuantity] = useState(props.quantity);
  const [ingredients, setIngredients] = useContext(SelectedIngredients);

  const addNew = (name, data) => {
    let hits = 0;
    if (ingredients.length > 0) {
      const newList = ingredients.map((item, index) => {
        if (item.name == name) {
          item.quantity += quantity;
          item.key = index.toString();
          hits++;
        }
        return item;
      });
      if (hits == 0) {
        newList.push({
          name: name,
          key: ingredients.length.toString(),
          quantity: quantity,
          calories: data.nf_calories,
          protein: data.nf_protein,
        });
      }
      setIngredients([]);
      setTimeout(() => {
        setIngredients(newList);
        props.navigation.navigate('CreateRecipe');
      }, 0);
      console.log('Updated List: \n', ingredients);
      hits = 0;
    } else {
      setIngredients([{name: name, quantity: quantity, key: '0', calories: data.nf_calories, protein: data.nf_protein}]);
      props.navigation.navigate('CreateRecipe');
    }
  };

  return (
    <BaseItem margin={15} padding={15} justifyContent={'space-around'}>
      <View style={{flexDirection: 'row', flex: 0.5, margin: 10}}>
        <View>
          <TouchableOpacity
            disabled={quantity > 0 ? false : true}
            style={styles.increment}
            onPress={() => {
              setQuantity(quantity - 1);
            }}>
            <Icon
              name={'md-remove-circle'}
              size={25}
              color={quantity > 0 ? 'red' : 'grey'}></Icon>
          </TouchableOpacity>
        </View>
        <Text>{quantity}</Text>

        <TouchableOpacity
          style={styles.increment}
          onPress={() => {
            setQuantity(quantity + 1);
          }}>
          <Icon name={'md-add-circle'} size={25} color={'green'}></Icon>
        </TouchableOpacity>
      </View>

      <ScrollView style={{flex: 4, margin: 10}}>
        <Text style={styles.text}>{props.ingredient}</Text>
      </ScrollView>
      <TouchableOpacity
        disabled={quantity > 0 ? false : true}
        style={{flex: 1, margin: 10}}
        onPress={() => {
          addNew(props.ingredient, props.data);
          // - props.ingredient
        }}>
        <View
          style={{
            backgroundColor: quantity > 0 ? 'green' : 'grey',
            elevation: 10,
            flexDirection: 'column',
          }}>
          <Text style={{color: 'white', flex: 0.75}}>Add</Text>
        </View>
      </TouchableOpacity>
    </BaseItem>
  );
};

const styles = StyleSheet.create({
  increment: {
    padding: 5,
  },
  text: {
    fontSize: 20,
    flex: 1,
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
});

export default AddIngredient;
