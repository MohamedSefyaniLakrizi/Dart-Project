import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Signout from './components/Profile/Signout';
const Profile: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      <Signout />
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

export default Profile;
