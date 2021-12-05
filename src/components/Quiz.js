import React, {useState} from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import Animated, {
  LightSpeedInRight,
  LightSpeedOutLeft,
} from 'react-native-reanimated';
//import Card from '../components/Card';
import {ChoiceBtn} from './Buttons';

export default function ({quiz, actionHandler = () => {}}) {
  const [selected, setSelected] = useState([]);

  const getAnswerChoices = () => {
    return (
      <FlatList
        data={quiz.options}
        renderItem={({item, index}) => (
          <ChoiceBtn
            active={index + 1 == selected}
            onPress={() => {
              if (index + 1 == selected) {
                actionHandler(0, false);
                //setSelected(0);
              } else {
                actionHandler(index + 1, true);
                //setSelected(index + 1);
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
      <View style={styles.header}>
        <Text style={styles.question}>{quiz.question}</Text>
      </View>
      <View style={styles.body}>{getAnswerChoices()}</View>
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
    paddingHorizontal: 5,
  },
  body: {
    flex: 0.7,
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
