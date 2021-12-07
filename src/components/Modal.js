import React from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';

const CancelModal = ({
  shouldRender = false,
  actionHandler = function () {},
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={shouldRender}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            position: 'absolute',
            top: 0,
            justifyContent: 'center',
            backgroundColor: '#00000080',
          },
        ]}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => actionHandler()}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    minWidth: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#000',
  },
});

export default CancelModal;
