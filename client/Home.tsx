import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

const Home: React.FC = () => {
    const [user, setUser] = useState<{ username: string } | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    console.log("here");

    const fetchUserData = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
            
            
          if (token) {
            const response = await fetch('http://localhost:5000/home/', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            });
      
            const user = await response.json();
            console.log('User data:', user.user.username);
            if (response.ok) {
                setUser(user.user); 
                setUserId(user.user.id);
                setUserEmail(user.user.email);// Set the user state with the fetched user data
              } else {
                console.error('Failed to fetch user data');
              }
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
          
      };
      
      //call the fetchUserData function when the component mounts
        useEffect(() => {fetchUserData()}, []);

      return (
        <View style={styles.container}>
          {user ? (
            <View>
                <Text style={styles.text}>Hi {user.username}</Text>
            </View>
          ) : (
            <Text>Loading...</Text>
          )}
          
        </View>
      );
      
      
      
            
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default Home;

//{user ? <Text style={styles.text}>Hi {user.username}</Text> : <Text>Loading...</Text>}

/*
                <Text style={styles.text}>Hi {user}</Text>
              <Text style={styles.text}>User ID: {userId}</Text>
              <Text style={styles.text}>Email: {userEmail}</Text>
*/