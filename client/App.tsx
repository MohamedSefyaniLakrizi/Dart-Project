import React, { useState, useEffect } from 'react';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createStackNavigator,  } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Payment from './Payment';
import Profile from './Profile';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import AuthContext from './AuthContext';
import AddRound from './routes/AddRound';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

type AppTabsProps = {
  navigation: NavigationProp<any>;
};
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

const MainTabs: React.FC = () => {
  return (
    <BottomTab.Navigator screenOptions={{ headerShown: false }}>
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Payment" component={Payment} />
      <BottomTab.Screen name="Profile" component={Profile} />
    </BottomTab.Navigator>
  );
};

const AppTabs: React.FC<AppTabsProps> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="AddRound" component={AddRound} options={{ headerShown: true, title: 'Add Round' }} />
    </Stack.Navigator>
  );
};


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  console.log("checking authentication");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch('https://dart-d99e.onrender.com/auth/is-verify', {
        method: 'GET',
        headers: {
          'token': token,
        },
      });
      
        if (response.ok) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log('Error retrieving authentication token:', error);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Auth" component={AuthStack} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="AppTabs" component={AppTabs} />
            
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
