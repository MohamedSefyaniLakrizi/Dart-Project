import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home';
import Payment from '../Payment';
import Profile from '../Profile';
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();
//create a bottom navigation bar with 3 tabs (Home, Payment, Profile)
const Navbar: React.FC = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (rn === 'Payment') {
                            iconName = focused ? 'card' : 'card-outline';
                        } else if (rn === 'Profile') {
                            iconName = focused ? 'person' : 'person-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Payment" component={Payment} />
                <Tab.Screen name="Profile" component={Profile} />
                </Tab.Navigator>
        </NavigationContainer>
    );
}

/*const Navbar: React.FC = () => {
    return (
        <NavigationContainer>
            
            
        </NavigationContainer>
    );
};*/

export default Navbar;


/*<Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (rn === 'Payment') {
                            iconName = focused ? 'card' : 'card-outline';
                        } else if (rn === 'Profile') {
                            iconName = focused ? 'person' : 'person-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                screenOptions = {({ route }) =>({
                    tabBarActiveTintColor: '#efb810',
                    tabBarInactiveTintColor: 'black',
                    tabBarStyle: [
                      {
                        display: "flex"
                      },
                      null
                    ],
                tabBarIcon: ({ color }) => 
                screenOptions(route, color),
                  
              })}
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Payment" component={Payment} />
                <Tab.Screen name="Profile" component={Profile} />
                </Tab.Navigator>*/