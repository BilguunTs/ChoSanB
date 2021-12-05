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
  const [current, setCurrent] = useState(1);
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [activateBtn, setActivateBtn] = useState(false);
  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState(0);
  useEffect(() => {
    setQuiz(dummyData[0]);
  }, []);
  const selected = useSharedValue(current);
  const pStyle = useAnimatedStyle(() => {
    const width = interpolate(selected.value, [1, dummyData.length], [1, 100]);
    return {width: `${width}%`};
  });
  const handleNextAction = () => {
    if (current == dummyData.length) {
      setCurrent(0);
      setQuiz(dummyData[0]);
      return;
    } else {
      (selected.value = withTiming(current + 1, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      })),
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
          actionHandler={(selected, activate) => {
            setActivateBtn(activate);
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
      <View style={styles.footer}>
        <CommonBtn
          text="Цааш"
          active={activateBtn}
          onPress={handleNextAction.bind(this)}
        />
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
    flex: 0.8,
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
