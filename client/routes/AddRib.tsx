// src/InputForm.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AddRoundProps = {
    navigation: StackNavigationProp<any>;
  };
const AddRound: React.FC<AddRoundProps> = ({navigation}) => {
  const [Rib, setRib] = useState('');



  const handleSubmit = async () => {
    // Implement your logic to handle form submission here
    
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch('https://dart-d99e.onrender.com/user/add-Rib', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            token: token,
            },
            body: JSON.stringify({
            Rib,
            }),
        });
        if (response.ok) {
            console.log('Rib entered successfully');
            navigation.navigate('AppTabs', { screen: 'AddRibSuccessful' });
        }
    } catch (error) {
        console.error('Error creating round:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Input Form</Text>

      <TextInput
        style={styles.input}
        placeholder="RIB"
        onChangeText={setRib}
        value={Rib}
        keyboardType="numeric"
      />
      

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },    
  text: {
    fontSize: 18,
  },
  picker: {
    width: 200,
    height: 50,
  },
});

export default AddRound;
