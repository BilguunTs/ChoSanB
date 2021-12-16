import React from 'react';
import {StyleSheet, Image, Text, TouchableHighlight} from 'react-native';
import Animated, {LightSpeedInRight} from 'react-native-reanimated';
const PRIME_COLOR = '#fff176';
export default function Avatar({
  isPro = false,
  source = require('../assets/propics/batjargal.jpg'),
  tag = '',
  title = '',
  order = 1,
  name = '',
}) {
  switch (tag) {
    case '+':
      title = 'гишүүн';
      name = 'Цэдэнсодном';
      source = require('../assets/propics/tsedke.jpg');
      break;
    case 'Ч':
      title = 'гишүүн';
      name = 'Чингүүн';
      source = require('../assets/propics/chinguun.jpg');
      break;
    case 'О':
      title = 'ахлагч';
      name = 'Отгонцэцэг';
      source = require('../assets/propics/otgontsetseg.jpg');
      break;
    case 'БИ':
      title = 'гишүүн';
      name = 'Билгүүн';
      source = require('../assets/propics/bilguun.png');
      break;
    case 'БА':
      title = 'гишүүн';
      name = 'Батжаргал';
      source = require('../assets/propics/batjargal.jpg');
      break;
    case 'БУ':
      title = 'гишүүн';
      name = 'Буянтогтох';
      source = require('../assets/propics/buyan.png');
      break;
    default:
      title = 'профессор';
      source = source;
  }
  return (
    <Animated.View
      entering={
        isPro
          ? LightSpeedInRight
          : LightSpeedInRight.duration(600).delay(order * 100)
      }>
      <TouchableHighlight
        style={[
          styles.profileImgContainer,
          {transform: [{scale: isPro ? 1 : 1}]},
        ]}>
        <Image
          source={source}
          style={[styles.profileImg, {transform: [{scale: isPro ? 1 : 1}]}]}
        />
      </TouchableHighlight>
      <Text style={{color: '#000', textAlign: 'center', fontWeight: '400'}}>
        {name}
      </Text>
      <Text
        style={{
          color: 'gray',
          textAlign: 'center',
          fontWeight: '400',
          fontSize: 10,
        }}>
        {title}
      </Text>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  profileImgContainer: {
    //marginLeft: 8,
    margin: 5,
    height: 80,

    width: 80,
    borderRadius: 40,
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'orange',
  },
});
