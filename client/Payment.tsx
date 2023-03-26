import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Payment: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Payment</Text>
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
