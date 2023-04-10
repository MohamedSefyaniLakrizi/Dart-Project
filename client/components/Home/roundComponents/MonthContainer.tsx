import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import Month from './Month';
import SmallMonth from './SmallMonth';

const MonthContainer = ({children}) => {
  return (
    <View style={styles.container}>
        {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // White with slight transparency
    borderRadius: 10, // Smooth rounded edges
    padding: 20, // Add some padding for the content
    width: Dimensions.get('window').width * 0.9, // 70% of the screen width
    alignSelf: 'auto', // Center the container horizontally
    ...Platform.select({ // Platform-specific shadow properties
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 5,
        },
      }),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    
  },
});

export default MonthContainer;