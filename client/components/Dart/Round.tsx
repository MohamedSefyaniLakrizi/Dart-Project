import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import axios from 'axios';
import UserComponent from '../../routes/round/UserComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

type RoundProps = {
    navigation: StackNavigationProp<any>;
  };
const RoundComponent: React.FC<RoundProps> = ({navigation}) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('https://dart-d99e.onrender.com/round/get-participants', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      });
      const data = await response.json();
      console.log("data received");
      
      setParticipants(data);
      console.log(data);
      
    } catch (error) {
      console.log("error fetching participants");
        
      console.log(error.message);
    }
  };
  

  
  const renderItem = ({ item }: { item: any }) => (
    <UserComponent name={item.username} />
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Round Participants</Text>
      <FlatList
        data={participants}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default RoundComponent;
