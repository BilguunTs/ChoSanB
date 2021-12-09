import React, {useState} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

import Animated, {
  FadeInDown,
  FadeOutUp,
  interpolate,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
//import Card from '../components/Card';
import Icons from 'react-native-vector-icons/MaterialIcons';
import QuizAsListItem from './QuizAsListItem';

export default function ({answers, quizs, actionHandler = () => {}}) {
  const [showResult, setShowResult] = useState(false);
  const [mistake, setMistake] = useState(0);
  const handleNextAction = () => {
    actionHandler(selected);
  };
  const RenderQuizResult = () => {
    let mistakeCount = 0;
    return (
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          flexGrow: 1,
          paddingBottom: 100,
        }}>
        {quizs.map((item, index) => {
          if (answers[index] !== item.correctAnswer) {
            mistakeCount = mistakeCount + 1;
          }
          setMistake(mistakeCount);
          return (
            <QuizAsListItem
              key={index}
              order={index + 1}
              question={item.question}
              givenAnswer={answers[index]}
              correctAnswer={item.correctAnswer}
            />
          );
        })}
      </ScrollView>
    );
  };

  const handlePress = () => {
    setShowResult(true);
  };

  return showResult ? (
    <View>
      <View style={{paddingHorizontal: 20}}>
        <View style={{marginBottom: 10, flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold', color: '#000', fontSize: 30}}>
            Үр дүн
          </Text>
        </View>
      </View>
      <RenderQuizResult />
    </View>
  ) : (
    <Animated.View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      exiting={FadeOutUp.duration(600)}
      entering={SlideInRight.duration(600)}>
      <View style={styles.header}>
        <Text style={styles.question}>Та амжилттай өгч дууслаа</Text>
      </View>
      <View style={styles.body}>
        <TouchableOpacity
          onPress={handlePress.bind(this)}
          style={{
            backgroundColor: '#f5f5f5',
            padding: 10,
            margin: 3,
            borderRadius: 50,
            minHeight: 100,
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
          }}>
          <Icons name="remove-red-eye" size={40} color={'gray'} />
        </TouchableOpacity>
        <Text
          style={{
            color: '#000',
            fontSize: 20,
            fontWeight: '300',
            textAlign: 'center',
          }}>
          Үр дүн харах
        </Text>
      </View>
      <View style={styles.footer}></View>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  questionContainer: {},
  question: {
    color: '#69f0ae',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '900',
  },
  header: {
    flex: 0.3,
    paddingBottom: 5,
    paddingHorizontal: 5,
  },
  body: {
    flex: 0.5,
    alignItems: 'center',
  },
  footer: {
    flex: 0.2,
    justifyContent: 'center',
  },

  content1: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
