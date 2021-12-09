import React from 'react';
import {StyleSheet, Image, TouchableHighlight} from 'react-native';

export default function Avatar({
  source = require('../assets/propics/batjargal.jpg'),
}) {
  return (
    <TouchableHighlight
      style={[
        styles.profileImgContainer,
        {borderColor: 'green', borderWidth: 1},
      ]}>
      <Image source={source} style={styles.profileImg} />
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  profileImgContainer: {
    marginLeft: 8,
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
});
