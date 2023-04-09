import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoRoundComponent from './components/Dart/NoRound';
import AddRound from './routes/AddRound';
import { StackNavigationProp } from '@react-navigation/stack';
import Swiper from 'react-native-swiper';
import NoMonth from './components/Home/roundComponents/NoMonth';
import MonthContainer from './components/Home/roundComponents/MonthContainer';
import SmallMonthWrapper from './components/Home/roundComponents/SmallMonthWrapper';
import LoadingScreen from './components/LoadingScreen';

type HomeProps = {
  navigation: StackNavigationProp<any>;
};



const Home: React.FC<HomeProps> = ({navigation}) => {
    const [hasGroup, setHasGroup] = useState<number | null>(null);
    const [user, setUser] = useState<any>(null);


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
          
          console.log(data.user.username);
          setUser(data.user.username);
          
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
          // screen is focused, so trigger the checkGroup function
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
            <View style={styles.container2}>
              <NoMonth />
              <Text style={styles.text}>Hi {user} !</Text>
            </View>
          ) : hasGroup === 1 ? (
            <View style={styles.container2}>
              <MonthContainer>
                <SmallMonthWrapper />
              </MonthContainer>
              <Text>Ad Space</Text>
            </View>
          ) : (
            <View style={styles.container2}>
              <NoMonth />
              <Text style={styles.text}>Hi {user} ! No rib?</Text>
            </View>
          )
        ) : (
          <LoadingScreen isLoading={true} />
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
  container2: {
    flex: 1,
    justifyContent: 'space-around',
    
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

export default Home;

//{user ? <Text style={styles.text}>Hi {user.username}</Text> : <Text>Loading...</Text>}

/*
                <Text style={styles.text}>Hi {user}</Text>
              <Text style={styles.text}>User ID: {userId}</Text>
              <Text style={styles.text}>Email: {userEmail}</Text>
*/

/*      
      */