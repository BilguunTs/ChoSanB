import React from 'react';
import {TouchableOpacity, Text, View, Dimensions} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Animated, {BounceInDown, BounceOutDown} from 'react-native-reanimated';
const PRIME_COLOR = '#fff176';
const {width, height} = Dimensions.get('window');

export const CancelIconBtn = ({onPress = function () {}, size = 30}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          borderRadius: 15,
          backgroundColor: '#f5f5f5',
          padding: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icons name="close" color={'gray'} size={size} />
      </View>
    </TouchableOpacity>
  );
};
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

export const Label = ({text, sub}) => {
  return (
    <Animated.Text
      entering={BounceInDown.duration(500)}
      exiting={BounceOutDown.duration(500)}
      style={{color: 'gray', fontSize: 15}}>
      {text}/{sub}
    </Animated.Text>
  );
};
