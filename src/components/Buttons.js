import React from 'react';
import {TouchableOpacity, Text, View, Dimensions} from 'react-native';
const PRIME_COLOR = '#fff176';
const {width, height} = Dimensions.get('window');
export const CommonBtn = ({text = '', active = false, onPress = () => {}}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={!active}>
      <View
        style={{
          minWidth: width * 0.85,
          minHeight: 50,
          borderRadius: 15,
          borderColor: active ? PRIME_COLOR : '#f5f5f5',
          borderWidth: 1,
          backgroundColor: active ? PRIME_COLOR : '#f5f5f5',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#000', fontWeight: 'bold'}}>
          {text.toUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export const ChoiceBtn = ({
  text = '',
  active = false,
  onPress = () => {},
  ...props
}) => {
  return (
    <TouchableOpacity {...props} onPress={onPress}>
      <View
        style={{
          backgroundColor: active ? PRIME_COLOR : '#fff',
          width: width * 0.4,
          minHeight: 90,
          margin: 10,
          borderWidth: 1,
          padding: 8,
          borderColor: active ? PRIME_COLOR : 'lightgray',
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#000', fontWeight: 'bold'}}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};
