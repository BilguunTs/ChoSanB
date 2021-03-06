import React, {useState, useEffect} from 'react';
import {FlatList, View, Text, StyleSheet, ScrollView} from 'react-native';
import Animated, {
  LightSpeedInRight,
  LightSpeedOutLeft,
} from 'react-native-reanimated';
//import Card from '../components/Card';
import {ChoiceBtn, CommonBtn} from './Buttons';
import {shuffle} from '../utils';

export default function ({quiz, isLast = false, actionHandler = () => {}}) {
  const [selected, setSelected] = useState(null);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (options.length == 0) {
      setOptions(shuffle(quiz.options, 4));
    }
  }, []);
  const handleNextAction = () => {
    actionHandler(selected);
  };
  const getAnswerChoices = () => {
    return (
      <FlatList
        data={options}
        renderItem={({item, index}) => (
          <ChoiceBtn
            active={selected == quiz.options[index]}
            onPress={() => {
              if (quiz.options[index] == selected) {
                setSelected(null);
              } else {
                setSelected(quiz.options[index]);
              }
            }}
            text={item}
          />
        )}
        numColumns={2}
        keyExtractor={(_item, index) => index.toString()}
      />
    );
  };
  return (
    <Animated.View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      exiting={LightSpeedOutLeft.damping(1000)}
      entering={LightSpeedInRight.duration(1000)}>
      <ScrollView style={styles.header}>
        <Text style={styles.question}>{quiz.question}</Text>
      </ScrollView>
      <View style={styles.body}>{getAnswerChoices()}</View>
      <View style={styles.footer}>
        <CommonBtn
          text={isLast ? 'Дуусгах' : 'Цааш'}
          active={selected !== null}
          onPress={handleNextAction.bind(this)}
        />
      </View>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  questionContainer: {},
  question: {
    color: '#000',
    fontSize: 30,
    fontWeight: '900',
  },
  header: {
    flex: 0.3,
    paddingBottom: 5,
    flexGrow: 0.3,
    paddingHorizontal: 5,
  },
  body: {
    flex: 0.5,
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
