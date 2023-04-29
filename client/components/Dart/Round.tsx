import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import UserComponent from '../../routes/round/UserComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

type RoundProps = {
  navigation: StackNavigationProp<any>;
};

type UserDataItem = {
  user_id: number;
  username?: string;
};

const RoundComponent: React.FC<RoundProps> = ({ navigation }) => {
  const [userData, setUserData] = useState<UserDataItem[]>([]);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(
        'https://dart-d99e.onrender.com/round/get-participants',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
        }
      );
      const data = await response.json();
      console.log('data received');

      setUserData(data);
      console.log(data);
    } catch (error) {
      console.log('error fetching participants');
      console.log(error.message);
    }
  };

  const fetchUsername = async (userId: number) => {
    try {
      const response = await fetch(
        `https://dart-d99e.onrender.com/user/${userId}`
      );
      const data = await response.json();
      return data.username;
    } catch (error) {
      console.log(`error fetching username for user ID ${userId}`);
      console.log(error.message);
      return '';
    }
  };

  const renderItem = ({ item }: { item: UserDataItem }) => {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
      fetchUsername(item.user_id).then((username) => setUsername(username));
    }, [item.user_id]);

    if (!username) {
      return <Text>Loading username...</Text>;
    }

    return <UserComponent name={username} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Round Participants</Text>
      <FlatList
        data={userData}
        renderItem={renderItem}
        keyExtractor={(item) => item.user_id.toString()}
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
