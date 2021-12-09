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
            <Text style={styles.modalTitle}>
              Та гарахдаа итгэлтэй байна уу?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Pressable
                style={[styles.button]}
                onPress={() => actionHandler(true)}>
                <Text style={[styles.textStyle, {color: 'red', fontSize: 20}]}>
                  Тийм
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button]}
                onPress={() => actionHandler(false)}>
                <Text style={[styles.textStyle, {color: '#000', fontSize: 20}]}>
                  Үгүй
                </Text>
              </Pressable>
            </View>
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
    padding: 25,
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
    borderRadius: 15,
    padding: 15,
    margin: 15,
    backgroundColor: '#f5f5f5',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
});

export default CancelModal;
