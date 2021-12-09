import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  BackHandler,
  Alert,
} from 'react-native';
import QuizScreen from './screens/QuizScreen';
import TeamIntroScreen from './screens/TeamIntroScreen';
import HomeScreen from './screens/HomeScreen';
const {width, height} = Dimensions.get('window');
export default function main() {
  const [screenAt, setScreenAt] = useState(0);
  const backAction = () => {
    Alert.alert('✋Байз!', 'Та гарах гэж байгаадаа итгэлтэй байна уу?', [
      {
        text: 'Үгүй',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'Тийм', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  const handleScreenSwitch = e => {
    setScreenAt(e);
  };

  const RenderScreens = val => {
    switch (val) {
      case 0:
        return <HomeScreen jumpTo={e => handleScreenSwitch(e)} />;
      case 1:
        return <QuizScreen jumpTo={e => handleScreenSwitch(e)} />;
      case 2:
        return <TeamIntroScreen jumpTo={e => handleScreenSwitch(e)} />;
      default:
        return <View></View>;
    }
  };

  return <View style={styles.container}>{RenderScreens(screenAt)}</View>;
}
const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#fff',
  },
});
