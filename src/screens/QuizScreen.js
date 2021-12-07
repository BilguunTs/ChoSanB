import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  BounceInUp,
  BounceOutDown,
  withDelay,
} from 'react-native-reanimated';
//import Card from '../components/Card';
import Quiz from '../components/Quiz';
import {CancelIconBtn, Label} from '../components/Buttons';
import {dummyData} from '../dummy';
import CancelModal from '../components/Modal';
import Icons from 'react-native-vector-icons/MaterialIcons';
import ResultScreen from '../components/QuizResult';
const {width, height} = Dimensions.get('window');

const PRIME_COLOR = '#fff176';
const GREEN_COLOR = '#69f0ae';
export default function QuizScreen() {
  const [current, setCurrent] = useState(0);
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [activateBtn, setActivateBtn] = useState(false);
  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState(0);
  const [cancelRequest, setCancelRequest] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const textFlagVal = useSharedValue(0);

  useEffect(() => {
    if (quiz == null) {
      setQuiz(dummyData[0]);
    }
    textFlagVal.value = withDelay(200, withSpring(0));
  }, [current, showResult]);
  const aCurrent = useSharedValue(current);

  const handleNextAction = answer => {
    if (current >= dummyData.length - 1) {
      textFlagVal.value = withSpring(1);
      setShowResult(true);
      return;
    } else {
      setAnswers([...answers, answer]);
      aCurrent.value = withSpring(aCurrent.value + 1);
      textFlagVal.value = withSpring(1);
      setCurrent(current + 1);
      setQuiz(dummyData[current + 1]);
    }
    //selected.value = current + 1;
  };
  const RenderQuiz = () => {
    if (quiz !== null) {
      return (
        <Quiz
          isLast={current == dummyData.length - 1}
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
      fontSize: 25,
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
    <View style={styles.container}>
      <View style={{padding: 10}}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              {flex: 0.2, justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Animated.Text style={[textContainerStyle]}>
              {current + 1}/{dummyData.length}
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
      </View>
      <View style={styles.body}>
        {showResult ? <ResultScreen /> : <RenderQuiz />}
      </View>
      <CancelModal
        actionHandler={() => {
          console.log('hey duder');
          setCancelRequest(false);
        }}
        shouldRender={cancelRequest}
      />
    </View>
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
