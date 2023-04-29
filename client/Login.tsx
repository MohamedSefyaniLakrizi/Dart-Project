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
  Keyboard,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from './AuthContext';
import LoadingScreen from './components/LoadingScreen';
import Toast from 'react-native-toast-message';

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
  const [isLoading, setIsLoading] = useState(false);
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
    Keyboard.dismiss();
    setIsLoading(true);
    try {
      const response = await fetch('https://dart-d99e.onrender.com/auth/login', {
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
        Toast.show({
          type: 'success',
          text1: 'Login successful!',
          visibilityTime: 2000,
        });
        // Store the JWT token and navigate to the Dashboard screen
        await storeToken(data.jwtToken);
        await AsyncStorage.setItem('token', data.jwtToken);
        console.log('Token stored:', data.jwtToken);
        setIsAuthenticated(true);
        navigation.navigate('Home');
        
        
      } else {
        setErrorMessage(data.message || 'Login failed');
        setIsLoading(false);
      }
    } catch (error) {
        setErrorMessage('Something went wrong');
        console.log('Error:', error);
        
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
      <Image source={require('./assets/logo-color.png')} style={styles.logo}/>
      </View>
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
      <LoadingScreen isLoading={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#E5F4F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222E50',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#1B9AAA',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
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
  linkText: {
    color: '#1B9AAA',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  errorText: {
    color: '#222E50',
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

export default Login;
