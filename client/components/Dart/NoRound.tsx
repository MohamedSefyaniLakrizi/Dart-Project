import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AddRound from '../../routes/AddRound';
import AsyncStorage from '@react-native-async-storage/async-storage';


type NoRoundProps = {
  navigation: StackNavigationProp<any>;
};


const NoRoundComponent: React.FC<NoRoundProps> = ({navigation}) => {
  const [hasRib, setHasRib] = useState(null);
  const [invitationCode, setInvitationCode] = useState('');

  const onCreateRound = () => {
    console.log('Create group clicked');
    // Add your logic to create a group here
    navigation.navigate('AppTabs', { screen: 'AddRound' });
  };

  const onInputChange = (text) => {
    setInvitationCode(text);
  };

  const sendInvitation = async () => {
    
    try{
      const token = await AsyncStorage.getItem('token');
      
      if (token) {
        const response = await fetch('https://dart-d99e.onrender.com/round/add-by-invitation-code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
          body: JSON.stringify({
            invitationCode,
          }),
        });
  
        const data = await response.json();
  
        console.log(data.user);
  
        if (response.ok) {
          navigation.navigate('AppTabs', { screen: 'AddRoundSuccessfulInvited' });
          } else {
          console.log(response);
          }
        } else {
          console.error('Failed to fetch group data');
        }
    } catch (err){
      console.log(err);
    }
    // Add your logic to send an invitation here
  };

  const goToRib = () => {
    console.log('Add Rib clicked');
    // Add your logic to send an invitation here
    navigation.navigate('AppTabs', { screen: 'AddRib' });
  }
  
  
  useFocusEffect(
    React.useCallback(() => {
      const checkRib = async () => {
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
  
            console.log(data.user);
  
            if (response.ok) {
              if (data.user.rib === null) {
                console.log('No Rib');
                setHasRib(false);
              } else {
                setHasRib(true);
              }
            } else {
              console.error('Failed to fetch group data');
            }
          }
        } catch (error) {
          console.error('Error fetching group data:', error);
        }
      };
  
      checkRib();
      return () => {};
    }, [])
  );
  

return (
  <View style={styles.container}>
    {hasRib === false ? (
      <>
        <Text style={styles.title}>Entrez Votre RIB pour commencer!</Text>
        <TouchableOpacity onPress={goToRib} style={styles.createGroupButton}>
          <Text style={styles.createGroupButtonText}>Ajouter le RIB</Text>
        </TouchableOpacity>
      </>
    ) : (
      <>
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
      </>
    )}
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#E5F4F8',
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
    borderColor: '#A3BAC3',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    backgroundColor: '#F2F6FA',
    color: '#222E50',
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default NoRoundComponent;
