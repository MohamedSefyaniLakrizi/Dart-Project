import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="rgba(34, 46, 80, 1)" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default LoadingScreen;
