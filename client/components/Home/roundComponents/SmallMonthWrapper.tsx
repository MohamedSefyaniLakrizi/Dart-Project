import React from 'react';
import { View, StyleSheet } from 'react-native';
import Month from './Month';
import SmallMonth from './SmallMonth';
import SmallMonth2 from './SmallMonth2';
import SmallMonth3 from './SmallMonth3';
import SmallMonth4 from './SmallMonth4';

const SmallMonthWrapper = () => {
    return (
      <View style={styles.wrapper}>
        <Month />
        <SmallMonth />
        <SmallMonth2 />
        <SmallMonth3 />
        <SmallMonth4 />
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
