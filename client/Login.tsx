// src/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
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
import { useAuthContext } from './AuthContext';

type RootStackParamList = {
  Register: undefined;
  Home: undefined;
  Login: undefined; // Add more screen names and their respective params here
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type LoginProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Login'>;
  };

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const goToRegister = () => {
    navigation.navigate('Register');
  };
  const storeToken = async (token: string) => {
    try {
      await localStorage.setItem('token', token);
    } catch (error) {
      console.log('Error storing token:', error);
    }
  };   
  
  

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Login successful');
        // Store the JWT token and navigate to the Dashboard screen
        await storeToken(data.jwtToken);
        await AsyncStorage.setItem('token', data.jwtToken);
        console.log('Token stored:', data.jwtToken);
        setIsAuthenticated(true);
        navigation.navigate('Home');
        
        
      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (error) {
        setErrorMessage('Something went wrong');
        console.log('Error:', error);
        
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToRegister}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
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

export default Login;
