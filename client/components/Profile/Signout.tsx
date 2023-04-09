import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../../AuthContext';



const Signout: React.FC = () => {
  const { setIsAuthenticated } = useAuthContext();

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('jwtToken');
      setIsAuthenticated(false);
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleSignOut}>
      <Text style={styles.buttonText}>Sign Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1B9AAA',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Signout;
