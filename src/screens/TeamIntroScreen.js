import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Avatar from '../components/Avatar';
import Animated, {BounceInRight, BounceOutDown} from 'react-native-reanimated';

export default class TeamIntroScreen extends Component {
  render() {
    return (
      <Animated.View
        entering={BounceInRight.delay(1000)}
        exiting={BounceOutDown.delay(1000)}
        style={styles.container}>
        <Avatar />
        <Avatar source={require('../assets/propics/chinguun.jpg')} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
