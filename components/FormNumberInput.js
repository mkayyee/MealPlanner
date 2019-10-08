import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Input, Item, Label, View } from 'native-base';
import { AntDesign as Icon } from '@expo/vector-icons';

const FormNumberInput = (props) => {
  const [value, setValue] = useState(props.defaultValue);
  const { error, ...otherProps } = props;

  const valueValidator = (add = true) => {
    const minValue = props.minValue ? props.minValue : 0;
    const maxValue = props.maxValue ? props.minValue : 100;
    const parsedInt = parseInt(value);
    const intToString = parsedInt.toString();
    if (!add) {
      if (parseInt(value) - 1 < minValue) {
        console.log('Minimum value reached: ', value);
        return;
      }
      if (!isNaN(parsedInt)) {
        props.callback(parsedInt - 1);
        if (parsedInt - 1 != undefined) {
          setValue((parsedInt - 1).toString());
        }
        return;
      } else {
        props.callback(0);
        if (parsedInt.toString() != undefined) {
          setValue('');
        }
        return;
      }
    } else {
      if (parsedInt + 1 > maxValue) {
        console.log('Maximum value reached: ', value);
        return;
      }
      if (!isNaN(parsedInt)) {
        props.callback(parsedInt + 1);
        if (parsedInt + 1 != undefined) {
          setValue(parsedInt + 1);
        }
        return;
      } else {
        props.callback(1);
        if (parsedInt.toString() != undefined) {
          setValue((1).toString());
        }
        return;
      }
    }
  };
  return (
    <View>
      <View
        style={{
          paddingTop: 5,
          paddingBottom: 10,
          alignSelf: 'center',
          width: '40%'
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity
            style={{ alignSelf: 'center' }}
            onPress={() => {
              valueValidator(false);
            }}
          >
            <Icon name={'minuscircleo'} color={'red'} size={35}></Icon>
          </TouchableOpacity>
          <Item rounded style={{ flex: 0.5, backgroundColor: 'white' }}>
            <Input
              onChangeText={(text) => {
                setValue(text);
                props.callback(text);
              }}
              placeholder={props.placeholder}
              keyboardType={'numeric'}
              numeric
              style={{ textAlign: 'center' }}
              value={
                value && typeof value.toString() == 'string' && value.toString()
              }
            />
          </Item>
          <TouchableOpacity
            onPress={() => {
              valueValidator();
            }}
            style={{ alignSelf: 'center' }}
          >
            <Icon name={'pluscircleo'} color={'green'} size={35}></Icon>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

FormNumberInput.propTypes = {
  defaultValue: PropTypes.number,
  error: PropTypes.string,
  placeholder: PropTypes.string
};

export default FormNumberInput;
