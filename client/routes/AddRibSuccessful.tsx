import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function AddRibSuccessful({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Rib Added Successfully!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AppTabs', { screen: 'Home' })}
      >
        <Text style={styles.buttonText}>Okay</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddRibSuccessful;
