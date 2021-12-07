import React, {useState} from 'react';
import {FlatList, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
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

export default function ({answers, actionHandler = () => {}}) {
  const [showResult, setShowResult] = useState(false);
  const handleNextAction = () => {
    actionHandler(selected);
  };
  // const getAnswerChoices = () => {
  //   return (
  //     <FlatList
  //       data={quiz.options}
  //       renderItem={({item, index}) => (
  //         <ChoiceBtn
  //           active={selected == quiz.options[index]}
  //           onPress={() => {
  //             if (quiz.options[index] == selected) {
  //               setSelected(null);
  //             } else {
  //               setSelected(quiz.options[index]);
  //             }
  //           }}
  //           text={item}
  //         />
  //       )}
  //       numColumns={2}
  //       keyExtractor={(_item, index) => index.toString()}
  //     />
  //   );
  // };

  const handlePress = () => {
    setShowResult(true);
  };

  return showResult ? (
    <RenderResultList />
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
            height: 100,
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
const RenderResultList = () => {
  return (
    <Animated.View
      entering={FadeInDown.duration(600)}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: '#000'}}>hi</Text>
    </Animated.View>
  );
};
