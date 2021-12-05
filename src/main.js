import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import QuizScreen from './screens/QuizScreen';
export default function main() {
  return (
    <View>
      <QuizScreen />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
