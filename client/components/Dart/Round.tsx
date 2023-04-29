import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import UserComponent from '../../routes/round/UserComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';

type RoundProps = {
  navigation: StackNavigationProp<any>;
};

type UserDataItem = {
  user_id: number;
  username?: string;
};

const RoundComponent: React.FC<RoundProps> = ({ navigation }) => {
  const [userData, setUserData] = useState<UserDataItem[]>([]);
  const [usernameMap, setUsernameMap] = useState<Record<number, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const handleStartDart = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(
        'https://dart-d99e.onrender.com/user/startRound',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: token,
            },
        }
    );
    const data = await response.json();
    console.log('data received');
    navigation.navigate('MainTabs', { screen: 'Dart' })
  };


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
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsername = async (user_id: number) => {
    try {
      const response = await fetch(
        `https://dart-d99e.onrender.com/user/${user_id}`
      );
      const data = await response.json();
      return data.username;
    } catch (error) {
      console.log(`error fetching username for user ID ${user_id}`);
      console.log(error.message);
      return '';
    }
  };

  const renderUser = (user_id: number) => {
    const username = usernameMap[user_id];
    if (!username) {
      return <Text>Loading username...</Text>;
    }



    return <UserComponent name={username} />;
  };

  useEffect(() => {
    const fetchAllUsernames = async () => {
      const usernames: Record<number, string> = {};
      for (const user of userData) {
        const username = await fetchUsername(user.user_id);
        usernames[user.user_id] = username;
      }
      setUsernameMap(usernames);
    };

    fetchAllUsernames();
  }, [userData]);

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Round Participants</Text>
        <FlatList
          data={userData}
          renderItem={({ item }) => renderUser(item.user_id)}
          keyExtractor={(item) => item.user_id.toString()}
          style={styles.list}
        />
    <TouchableOpacity style={styles.button} onPress={handleStartDart}>
        <Text style={styles.buttonText}>Start Dart</Text>
      </TouchableOpacity>
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
    marginTop: 100,
  },
  list: {
    width: '100%',
    paddingHorizontal: 20,
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
});

export default RoundComponent;
