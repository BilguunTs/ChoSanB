import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Avatar from '../components/Avatar';
import Animated, {
  BounceOutDown,
  LightSpeedInRight,
} from 'react-native-reanimated';
import {members} from '../dummy';
import {FlatGrid} from 'react-native-super-grid';
const PRIME_COLOR = '#fff176';
export default class TeamIntroScreen extends Component {
  render() {
    const RenderAvatars = () => {
      return (
        <FlatGrid
          itemDimension={80}
          data={members}
          style={{flex: 0.5}}
          renderItem={({item, index}) => (
            <View style={{margin: 10}} key={index}>
              <Avatar order={index + 1} key={index} tag={item} />
            </View>
          )}
        />
      );
    };

    return (
      <Animated.View
        entering={LightSpeedInRight.duration(700)}
        exiting={BounceOutDown.delay(1000)}
        style={styles.container}>
        <Animated.View
          style={{
            flex: 0.1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: PRIME_COLOR,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            elevation: 5,
            borderWidth: 5,
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            +ЧО3Б
          </Text>
        </Animated.View>
        <View style={{paddingHorizontal: 10, marginVertical: 10}}>
          <Text style={{color: '#000', textAlign: 'center', fontWeight: '500'}}>
            Бид бол Монголын түүх
          </Text>
          <Text style={{color: 'gray', textAlign: 'center', fontWeight: '300'}}>
            +ЧО3Б нь Эрдэнэт цогцолбор дээд сургуулийн Монголын түүх хичээлийн
            нэгэн баг байсан юм.
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Avatar
            name="Энхцэцэг"
            isPro
            source={require('../assets/propics/enkhtsetseg.jpg')}
          />
        </View>
        <RenderAvatars />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
