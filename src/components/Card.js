import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

//const {width,height}=Dimensions.get("window");
export default function Card({style = {}, ...props}) {
  return <View style={[styles.container, style]}>{props.children}</View>;
}
const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 310,
    padding: 25,
    borderRadius: 10,
    borderWidth: 1,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 10,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 10,
  },
});
