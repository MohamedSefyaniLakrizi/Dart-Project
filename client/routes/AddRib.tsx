// src/InputForm.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AddRoundProps = {
    navigation: StackNavigationProp<any>;
  };
const AddRound: React.FC<AddRoundProps> = ({navigation}) => {
  const [rib, setRib] = useState('');



  const handleSubmit = async () => {
    // Implement your logic to handle form submission here
    Keyboard.dismiss();
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch('https://dart-d99e.onrender.com/user/add-Rib', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            token: token,
            },
            body: JSON.stringify({
            rib,
            }),
        });
        if (response.ok) {
            console.log('Rib entered successfully');
            console.log(response);
            
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
        value={rib}
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
    backgroundColor: '#E5F4F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#222E50',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#A3BAC3',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#F2F6FA',
    color: '#222E50',
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
    color: '#222E50',
  },
  picker: {
    width: 200,
    height: 50,
  },
});

export default AddRound;
