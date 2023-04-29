import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import axios from 'axios';
import UserComponent from '../../routes/round/UserComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Round = () => {
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
      setParticipants(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  

  const renderItem = ({ item }) => (
    <UserComponent name={item.username} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Round Participants</Text>
      <FlatList
        data={participants}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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

export default Round;
