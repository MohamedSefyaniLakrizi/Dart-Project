// src/Register.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';



type RootStackParamList = {
    Register: undefined;
    Login: undefined;
  };
  

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type RegisterProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Register'>;
    onRegistred: () => void;
  };

  type LoginProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Login'>;
  };


const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const goToLogin = () => {
    navigation.navigate('Login');
  };
  const handleSubmit = async () => {
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Registration successful');
        await AsyncStorage.setItem('userStatus', 'registered');
        navigation.navigate('Login'); // Navigate to the Login screen if you have one
      } else {
        if (data === 'This email already exists') {
            setErrorMessage(data || 'This email already exists');
        } else if (data === 'This username is Taken') {
            setErrorMessage(data || 'This username is Taken');
        } else if (data === 'Passwords do not match') {
            setErrorMessage(data || 'Passwords do not match');
        } else {
            setErrorMessage(data || 'Registration failed');
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
          }
      
      }
    } catch (error) {
        setErrorMessage('Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToLogin}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
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
  linkText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Register;
