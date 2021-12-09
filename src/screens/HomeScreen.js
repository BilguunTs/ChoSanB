import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
  BounceInDown,
  BounceOutUp,
  SlideInUp,
  SlideOutUp,
  BounceOutLeft,
} from 'react-native-reanimated';
const {width, height} = Dimensions.get('window');
const PRIME_COLOR = '#fff176';
export default function HomeScreen(props) {
  const transitionAt = useSharedValue(1);
  useEffect(() => {
    // initView();
  }, []);
  const initView = () => {
    'worklet';
    transitionAt.value = withDelay(1000, withTiming(1));
  };
  const headerStyle = useAnimatedStyle(() => {
    const flexVal = interpolate(
      transitionAt.value,
      [0, 1],
      [1, 0.1],
      Extrapolate.CLAMP,
    );
    return {
      flex: flexVal,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: PRIME_COLOR,
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      elevation: 5,
      borderWidth: 5,
    };
  });
  const containerStyle = useAnimatedStyle(() => {
    const flexVal = interpolate(
      transitionAt.value,
      [0, 1],
      [0, 0.9],
      Extrapolate.CLAMP,
    );

    return {
      justifyContent: 'center',
      alignItems: 'center',
      flex: flexVal,
    };
  });

  return (
    <Animated.View style={{height}}>
      <Animated.View
        entering={SlideInUp.duration(500)}
        exiting={SlideOutUp.duration(500)}
        style={[headerStyle]}>
        <Text style={[styles.heroText]}>+ЧО3Б</Text>
      </Animated.View>
      <Animated.View style={[containerStyle]}>
        {['Тест', 'Бидний тухай'].map((o, i) => (
          <RenderCards
            onPress={() => {
              props.jumpTo(i + 1);
            }}
            key={i}
            title={o}
            onOrder={i + 1}
          />
        ))}
      </Animated.View>
    </Animated.View>
  );
}
const RenderCards = ({title = 'hi', onOrder, onPress = function () {}}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        exiting={BounceOutLeft.delay(10 * onOrder)}
        entering={BounceInDown.delay(300 * onOrder)}
        style={[styles.heroCard]}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#000', fontSize: 30, fontWeight: '500'}}>
            {title}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  heroText: {
    color: '#000',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  heroCard: {
    width: width * 0.9,
    height: 200,
    borderWidth: 5,
    marginBottom: 40,
    borderRadius: 25,
    backgroundColor: PRIME_COLOR,
  },
});
