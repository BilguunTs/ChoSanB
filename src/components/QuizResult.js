import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import Animated, {FadeOutUp, SlideInRight} from 'react-native-reanimated';
//import Card from '../components/Card';
import Icons from 'react-native-vector-icons/MaterialIcons';
import QuizAsListItem from './QuizAsListItem';
import {CancelIconBtn} from '../components/Buttons';
const QuizResult = ({
  answers,
  quizs,
  actionHandler = () => {},
  setCancelRequest = function () {},
}) => {
  const [showResult, setShowResult] = useState(false);
  const [procentage, setProcentage] = useState(0);
  const handleNextAction = () => {
    actionHandler(selected);
  };
  useEffect(() => {
    CountMistake();
  }, []);
  const RenderQuizResult = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          flexGrow: 1,
          paddingBottom: 100,
        }}>
        {quizs.map((item, index) => {
          return (
            <QuizAsListItem
              key={index}
              order={index}
              question={item.question}
              givenAnswer={answers[index]}
              correctAnswer={item.correctAnswer}
            />
          );
        })}
      </ScrollView>
    );
  };
  const CountMistake = () => {
    let mistake = 0;
    for (let i = 0; i < quizs.length; i++) {
      if (quizs[i].correctAnswer !== answers[i]) {
        mistake++;
      }
    }
    setProcentage(((quizs.length - mistake) * 100) / quizs.length);
  };
  const handlePress = () => {
    setShowResult(true);
  };
  const getResultTextColor = () => {
    if (procentage >= 0 && procentage < 60) {
      return 'red';
    } else if (procentage >= 60 && procentage < 80) {
      return 'orange';
    } else if (procentage >= 80 && procentage <= 90) {
      return 'lightgreen';
    } else {
      return 'green';
    }
  };
  return showResult ? (
    <View>
      <View style={{paddingHorizontal: 20}}>
        <View style={{marginBottom: 10, flexDirection: 'row'}}>
          <View style={[{flex: 0.7, justifyContent: 'center'}]}>
            <Text style={{fontWeight: 'bold', color: '#000', fontSize: 30}}>
              <Text style={{fontWeight: '300'}}>Дүн: </Text>
              <Text style={{color: getResultTextColor()}}>{procentage}%</Text>
            </Text>
          </View>
          <View style={{flex: 0.1, justifyContent: 'center'}}></View>
          <View
            style={{
              flex: 0.2,
              justifyContent: 'center',
            }}>
            <CancelIconBtn
              size={35}
              onPress={() => {
                setCancelRequest(true);
              }}
            />
          </View>
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
            marginTop: 10,
            fontWeight: '300',
            textAlign: 'center',
          }}>
          дүн харах
        </Text>
      </View>
      <View style={styles.footer}></View>
    </Animated.View>
  );
};
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
export default QuizResult;
