import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoRoundComponent from './components/NoRound';
import AddRound from './routes/AddRound';
import { StackNavigationProp } from '@react-navigation/stack';
import Swiper from 'react-native-swiper';

type HomeProps = {
  navigation: StackNavigationProp<any>;
};



const Home: React.FC<HomeProps> = ({navigation}) => {
    const [user, setUser] = useState<{ username: string } | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [hasGroup, setHasGroup] = useState<number | null>(null);




    const fetchUserData = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
            
            
          if (token) {
            const response = await fetch('http://localhost:5000/home/', {
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
            const response = await fetch('http://localhost:5000/home', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                token: token,
              },
            });
    
            const data = await response.json();
            
            
            if (response.ok) {
              if (data.participants !== undefined){
                setHasGroup(0);
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
          fetchUserData();
          checkGroup();
        }, []);


        return (
          <View style={styles.container}>
            {user ? (
              hasGroup === null ? (
                <Text>Loading...</Text>
              ) : (
                <Swiper showsButtons={false} loop={false}>
                  <View style={styles.slide}>
                    <Text style={styles.text}>Hi {user.username}</Text>
                  </View>
                  {hasGroup === 0 && (
                    <View style={styles.slide}>
                      <NoRoundComponent navigation={navigation} />
                    </View>
                  )}
                </Swiper>
              )
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
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;

//{user ? <Text style={styles.text}>Hi {user.username}</Text> : <Text>Loading...</Text>}

/*
                <Text style={styles.text}>Hi {user}</Text>
              <Text style={styles.text}>User ID: {userId}</Text>
              <Text style={styles.text}>Email: {userEmail}</Text>
*/

/*      return (
        <View style={styles.container}>
      {user ? (
        hasGroup === null ? (
          <Text>Loading...</Text>
        ) : hasGroup === 0 ? (
          <Text style={styles.text}>Hi {user.username}</Text>
        ) : (
          <NoRoundComponent navigation={navigation}/>
        )
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
      */