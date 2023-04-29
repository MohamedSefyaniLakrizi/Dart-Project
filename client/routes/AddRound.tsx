import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AddRoundProps = {
  navigation: StackNavigationProp<any>;
};

const AddRound: React.FC<AddRoundProps> = ({navigation}) => {
  const [amount, setAmount] = useState('');
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const numbers = Array.from({length: 10}, (_, i) => i + 1);

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('https://dart-d99e.onrender.com/round/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify({
          amount,
          duration: selectedNumber,
          name,
        }),
      });
      if (response.ok) {
        console.log('Round created successfully');
        console.log(response);
        const res = await response.json();
        //await localStorage.setItem('invitation_code', res.invitation_code);
        await AsyncStorage.setItem('invitation_code', res.invitation_code.toString());
        setIsLoading(false);
        navigation.navigate('AppTabs', { screen: 'AddRoundSuccessful' });
      }
    } catch (error) {
      console.error('Error creating round:', error);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Input Form</Text>

      <TextInput
        style={styles.input}
        placeholder="Name (optional)"
        onChangeText={setName}
        value={name}
      />

      <TextInput
        style={styles.input}
        placeholder="Amount"
        onChangeText={setAmount}
        value={amount}
        keyboardType="numeric"
      />

      <Text style={styles.text}>Select a number:</Text>
      <Picker
        selectedValue={selectedNumber}
        style={styles.input}
        onValueChange={(itemValue) => setSelectedNumber(itemValue)}>
        {numbers.map((number) => (
          <Picker.Item key={number} label={number.toString()} value={number} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {isLoading && (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
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
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
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
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AddRound;
