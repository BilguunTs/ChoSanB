import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  withSpring,
  interpolate,
  useDerivedValue,
} from 'react-native-reanimated';
//import Card from '../components/Card';
import Quiz from '../components/Quiz';
import {CommonBtn} from '../components/Buttons';
import {dummyData} from '../dummy';

const {width, height} = Dimensions.get('window');
const PRIME_COLOR = '#fff176';

export default function QuizScreen() {
  const [current, setCurrent] = useState(0);
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [activateBtn, setActivateBtn] = useState(false);
  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState(0);
  useEffect(() => {
    if (quiz == null) {
      setQuiz(dummyData[0]);
    }
    console.log(answers);
    console.log(current);
    console.log(dummyData.length);
  }, [current]);
  const aCurrent = useSharedValue(current);
  const pStyle = useAnimatedStyle(() => {
    const width = interpolate(aCurrent.value, [0, dummyData.length], [1, 100]);
    return {width: `${width}%`};
  });
  const handleNextAction = answer => {
    if (current >= dummyData.length) {
      aCurrent.value = withSpring(0);
      setCurrent(0);
      setQuiz(dummyData[0]);
      return;
    } else {
      setAnswers([...answers, answer]);
      aCurrent.value = withSpring(aCurrent.value + 1);
      setCurrent(current + 1);
      setQuiz(dummyData[current]);
    }
    //selected.value = current + 1;
  };
  const RenderQuiz = () => {
    if (quiz !== null) {
      return (
        <Quiz
          quiz={quiz}
          actionHandler={response => {
            handleNextAction(response);
          }}
        />
      );
    }
    return <View />;
  };
  return (
    <View style={styles.container}>
      <View style={{padding: 10}}>
        <View
          style={{
            height: 15,
            backgroundColor: '#f5f5f5',
            marginVertical: 5,
            borderRadius: 50,
          }}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                backgroundColor: PRIME_COLOR,
                left: 0,
                height: 15,
                borderRadius: 50,
              },
              pStyle,
            ]}
          />
        </View>
      </View>
      <View style={styles.body}>
        <RenderQuiz />
      </View>
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
