import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoRoundComponent from './components/Dart/NoRound';
import AddRound from './routes/AddRound';
import { StackNavigationProp } from '@react-navigation/stack';
import Swiper from 'react-native-swiper';
import Month from './components/Home/roundComponents/Month';
type HomeProps = {
  navigation: StackNavigationProp<any>;
};

const Dart: React.FC<HomeProps> = ({navigation}) => {
    const [user, setUser] = useState<{ username: string } | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [hasGroup, setHasGroup] = useState<number | null>(null);




    const fetchUserData = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
            
            
          if (token) {
            const response = await fetch('https://dart-d99e.onrender.com/home/', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                token: token,
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


      const checkGroup = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
    
          if (token) {
            // Replace this with your actual API endpoint to check if a group is created
            const response = await fetch('https://dart-d99e.onrender.com/home', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                token: token,
              },
            });
    
            const data = await response.json();
            
            console.log(data.participants);
            
            
            if (response.ok) {
              if (data.participants === undefined){
                if(data.user.rib === null)
                setHasGroup(0);
                else setHasGroup(2);
              }
              
              else setHasGroup(1);
            } else {
              console.error('Failed to fetch group data');
            }
          }
        } catch (error) {
          console.error('Error fetching group data:', error);
        }
      };
      
      //call the fetchUserData function when the component mounts
      useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // screen is focused, so trigger the fetchUserData and checkGroup functions
          fetchUserData();
          checkGroup();
        });
    
        // return a cleanup function to remove the listener
        return unsubscribe;
      }, [navigation]);


        return (
            <View style={styles.container}>
            {user ? (
              hasGroup === null ? (
                <Text>Loading...</Text>
              ) : hasGroup === 0 ? (
                <View style={styles.container}>
                  <NoRoundComponent navigation={navigation}/>
                </View>
              ) : hasGroup === 1 ? (
                <View style={styles.container}>
                  <Text> You Already have your Dart!</Text>
                </View>
              ) : (
                <View style={styles.container}>
                  <NoRoundComponent navigation={navigation}/>
                </View>
              )
            ) : (
              <Text>Loading...</Text>
            )}
          </View>
    ) ;
      };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5F4F8',
  },
  text: {
    fontSize: 24,
    color: '#222E50',
    fontWeight: 'bold',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5F4F8',
  },
});

export default Dart;
