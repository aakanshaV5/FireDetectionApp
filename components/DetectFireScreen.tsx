import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { useState } from 'react';
import { NavigationContainer , useNavigation } from '@react-navigation/native';

const DetectFireScreen = ({ navigation }) => {


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={()=> navigation.navigate('Camera')}
      >
        <Text style={styles.buttonText}>Detect Fire</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 100,
    width: 200,
    backgroundColor: '#EF9595',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 30,
  },


});

export default DetectFireScreen;
