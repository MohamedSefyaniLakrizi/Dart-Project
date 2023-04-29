import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function AddRoundSuccessful({ navigation }) {
    const [invitation_code, setInvitationCode] = useState<number | null>(null);
    const fetchUserData = async () => {
        try {
          setInvitationCode(parseInt(await AsyncStorage.getItem('invitation_code'), 10));

    console.log(invitation_code);
    
    
} catch (error) {
    console.error('Error fetching user data:', error);
}
    };


    useEffect(() => {
        fetchUserData();
    }, []);
    

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Votre Code d'Invitation est:</Text>
        <Text style={styles.message}>{invitation_code}</Text>
        <Text style={styles.message}>Veulliez l'envoyer à tout votre groupe!</Text>
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

export default AddRoundSuccessful;
