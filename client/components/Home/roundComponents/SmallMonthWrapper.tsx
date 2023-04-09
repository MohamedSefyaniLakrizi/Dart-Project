import React from 'react';
import { View, StyleSheet } from 'react-native';
import Month from './Month';
import SmallMonth from './SmallMonth';

const SmallMonthWrapper = () => {
    return (
      <View style={styles.wrapper}>
        <Month />
        <SmallMonth />
        <SmallMonth />
        <SmallMonth />
        <SmallMonth />
      </View>
    );
  };

const styles = StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 0, // Add some padding to the sides for a smoother appearance
      marginHorizontal: 0, // Add some padding to the sides for a smoother appearance
    },
  });

export default SmallMonthWrapper;
