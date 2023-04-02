import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AddRound from '../routes/AddRound';


type NoRoundProps = {
  navigation: StackNavigationProp<any>;
};


const NoRoundComponent: React.FC<NoRoundProps> = ({navigation}) => {
  const [invitationCode, setInvitationCode] = useState('');

  const onCreateRound = () => {
    console.log('Create group clicked');
    // Add your logic to create a group here
    navigation.navigate('AppTabs', { screen: 'AddRound' });
  };

  const onInputChange = (text) => {
    setInvitationCode(text);
  };

  const sendInvitation = () => {
    console.log('Send invitation clicked');
    // Add your logic to send an invitation here
  };
  console.log("in the no round component");
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onCreateRound} style={styles.createGroupButton}>
        <Text style={styles.createGroupButtonText}>Create Group</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onInputChange}
          value={invitationCode}
          placeholder="Enter Invitation Code"
        />
        <TouchableOpacity style={styles.button} onPress={sendInvitation}>
              <Text style={styles.buttonText}>Send Invitation Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  createGroupButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  createGroupButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NoRoundComponent;
