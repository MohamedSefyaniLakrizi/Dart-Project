import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MonthContainer from './components/roundComponents/MonthContainer';
import Month from './components/roundComponents/Month';
import SmallMonth from './components/roundComponents/SmallMonth';
import SmallMonthWrapper from './components/roundComponents/SmallMonthWrapper';
const Payment: React.FC = () => {
  return (
    <View style={styles.container}>
      <MonthContainer>
        <SmallMonthWrapper />
      </MonthContainer>
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

export default Payment;
