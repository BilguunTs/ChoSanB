import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  BounceOutDown,
  withDelay,
  BounceInRight,
} from 'react-native-reanimated';
//import Card from '../components/Card';
import Quiz from '../components/Quiz';
import {CancelIconBtn} from '../components/Buttons';
import {dummyData} from '../dummy';
import CancelModal from '../components/Modal';
import ResultScreen from '../components/QuizResult';
import {shuffle} from '../utils';
const {width, height} = Dimensions.get('window');

const PRIME_COLOR = '#fff176';
const GREEN_COLOR = '#69f0ae';
export default function QuizScreen({jumpTo}) {
  const [current, setCurrent] = useState(0);
  const [quiz, setQuiz] = useState(null);
  const [quizs, setQuizs] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [cancelRequest, setCancelRequest] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const textFlagVal = useSharedValue(0);

  useEffect(() => {
    if (quizs.length == 0) {
      setQuizs(shuffle(dummyData, 10));
    }
  }, []);
  useEffect(() => {
    if (quiz == null) {
      setQuiz(dummyData[0]);
    }
    textFlagVal.value = withDelay(200, withSpring(0));
  }, [current, showResult]);
  const aCurrent = useSharedValue(current);

  const handleNextAction = answer => {
    if (current >= quizs.length - 1) {
      textFlagVal.value = withSpring(1);

      setAnswers([...answers, answer]);
      setShowResult(true);
      return;
    } else {
      setAnswers([...answers, answer]);
      aCurrent.value = withSpring(aCurrent.value + 1);
      textFlagVal.value = withSpring(1);
      setCurrent(current + 1);
      setQuiz(quizs[current + 1]);
    }
    //selected.value = current + 1;
  };
  const RenderQuiz = () => {
    if (quiz !== null) {
      return (
        <Quiz
          isLast={current == quizs.length - 1}
          quiz={quiz}
          actionHandler={response => {
            handleNextAction(response);
          }}
        />
      );
    }
    return <View />;
  };
  const textContainerStyle = useAnimatedStyle(() => {
    const scale = interpolate(textFlagVal.value, [0, 1], [1, 2]);
    const translateY = interpolate(textFlagVal.value, [0, 1], [0, 15]);
    const opacity = interpolate(textFlagVal.value, [0, 1], [1, 0.5]);
    const w = interpolate(textFlagVal.value, [0, 1], [2, 5]);
    return {
      color: 'gray',
      fontSize: 20,
      fontWeight: `${w}00`,
      opacity,
      transform: [{scale}, {translateY}],
      //fontStyle: [{fontsize: size}],
    };
  });
  const pStyle = useAnimatedStyle(() => {
    const width = interpolate(
      aCurrent.value,
      [0, dummyData.length - 1],
      [0, 100],
    );
    const translateY = interpolate(textFlagVal.value, [0, 1], [0, -20]);
    const scale = interpolate(textFlagVal.value, [0, 1], [1, 2]);
    return {
      width: `${width}%`,
      transform: [
        {scale: showResult ? scale : 1},
        {translateY: showResult ? translateY : 0},
      ],
    };
  });
  return (
    <Animated.View
      entering={BounceInRight.duration(1500)}
      exiting={BounceOutDown.duration(1000)}
      style={[styles.container]}>
      <View style={{padding: 10}}>
        {!showResult && (
          <View style={{flexDirection: 'row'}}>
            <View
              style={[
                {flex: 0.2, justifyContent: 'center', alignItems: 'center'},
              ]}>
              <Animated.Text style={[textContainerStyle]}>
                {current + 1}/{quizs.length}
              </Animated.Text>
            </View>
            <View style={{flex: 0.7, justifyContent: 'center'}}>
              <View
                style={{
                  height: 15,
                  backgroundColor: '#f5f5f5',
                  marginVertical: 5,
                  marginHorizontal: 10,
                  borderRadius: 50,
                }}>
                <Animated.View
                  style={[
                    {
                      position: 'absolute',
                      backgroundColor: showResult ? GREEN_COLOR : PRIME_COLOR,
                      left: 0,
                      height: 15,
                      borderRadius: 50,
                    },
                    pStyle,
                  ]}
                />
              </View>
            </View>
            <View
              style={{
                flex: 0.2,
                //marginHorizontal: 3,
                alignItems: 'center',
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
        )}
      </View>
      <View style={styles.body}>
        {showResult ? (
          <ResultScreen
            setCancelRequest={setCancelRequest}
            answers={answers}
            quizs={quizs}
          />
        ) : (
          <RenderQuiz />
        )}
      </View>
      <CancelModal
        actionHandler={exit => {
          if (exit) {
            jumpTo(0);
          }
          setCancelRequest(false);
        }}
        shouldRender={cancelRequest}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height,
    backgroundColor: '#fff',
  },

  body: {
    flex: 1,
  },
  footer: {
    padding: 10,
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
