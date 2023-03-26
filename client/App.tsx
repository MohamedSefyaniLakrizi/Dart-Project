import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Payment from './Payment';
import Profile from './Profile';
import NavBar from './components/Navbar';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const App = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const registered = await AsyncStorage.getItem('isRegistered');
        if (registered !== null) {
          setIsRegistered(true);
        }
      } catch (error) {
        console.error('Error reading AsyncStorage:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const onRegistered = () => {
    setIsRegistered(true);
  };


  const renderContent = () => {
    if (isLoading) {
      return null;
    }

    if (!isRegistered) {
      return <Register onRegistered={handleRegistration} />;
    }

    return <MainTabs />;
  };

  const handleRegistration = () => {
    setIsRegistered(true);
  };

  return <NavigationContainer>{renderContent()}</NavigationContainer>;
};

export default App;

























/*type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Home: undefined;
  Payment: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();



const App = () => {
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const onRegistrationSuccess = () => {
    setUserStatus('registered');
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const status = await AsyncStorage.getItem('userStatus');
      if (status !== null) {
        setUserStatus(status);
      } else {
        setUserStatus('firstTime');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
        <Stack.Screen name="Payment" component={Payment} options={{ title: 'Payment' }} />
        <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;*/
