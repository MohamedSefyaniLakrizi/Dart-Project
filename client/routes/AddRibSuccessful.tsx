import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function AddRibSuccessful({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Rib Added Successfully!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MainTabs', { screen: 'Dart' })}
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
    backgroundColor: '#E5F4F8',
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#222E50',
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddRibSuccessful;
