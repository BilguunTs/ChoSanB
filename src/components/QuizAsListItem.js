import React, {useState} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Animated, {
  Extrapolate,
  interpolate,
  LightSpeedOutLeft,
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
//import Card from '../components/Card';
import Icons from 'react-native-vector-icons/Ionicons';
import {ChoiceBtn, CommonBtn} from './Buttons';

export default function ({
  question = 'what is ...?',
  correctAnswer = 'duder',
  givenAnswer = 'hi',
  order = 1,
}) {
  const expand = useSharedValue(0);
  const toggleExpand = () => {
    expand.value = expand.value == 1 ? withTiming(0) : withTiming(1);
  };
  const animatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      expand.value,
      [0, 1],
      [70, 160],
      Extrapolate.CLAMP,
    );
    return {
      minHeight: 70,
      height,
    };
  });
  const animatedDesStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      expand.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP,
    );
    return {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      opacity,
    };
  });
  return (
    <TouchableOpacity
      style={{padding: 0, margin: 0}}
      onPress={() => toggleExpand()}>
      <Animated.View
        style={[
          {
            backgroundColor:
              givenAnswer !== correctAnswer ? '#ffcdd2' : 'lightgreen',
            borderWidth: 1,
            borderColor: givenAnswer !== correctAnswer ? 'red' : 'green',
            width: Dimensions.get('window').width * 0.9,
            borderRadius: 20,
            margin: 3,
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 10,
            alignContent: 'space-around',
          },
          animatedStyle,
        ]}
        exiting={LightSpeedOutLeft.damping(1000)}
        entering={SlideInDown.duration(1000).delay(100 * order)}>
        <View style={styles.sideLeft}>
          <Text style={{color: '#000', fontWeight: '300'}}>{order + 1}</Text>
        </View>
        <View style={{flex: 0.9}}>
          <Text style={styles.question}>{question}</Text>
          <Animated.View style={[animatedDesStyle]}>
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                textAlign: 'center',
                fontWeight: '300',
              }}>
              {correctAnswer}
            </Text>
          </Animated.View>
        </View>

        <View style={styles.sideRight}>
          {correctAnswer !== givenAnswer ? (
            <Icons name="sad-outline" color={'red'} size={25} />
          ) : (
            <Icons name="happy-outline" color={'green'} size={25} />
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  question: {
    color: '#000',
    fontWeight: '900',
  },
  sideLeft: {
    width: '10%',
  },
  body: {
    //flex: 0.5,
  },
  sideRight: {
    justifyContent: 'center',
  },

  content1: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
