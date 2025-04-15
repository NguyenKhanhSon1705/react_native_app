// components/LoadingOverlay.tsx

import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Portal } from 'react-native-paper';

type Props = {
  message?: string;
};

const LoadingOverlay = ({message }: Props) => {
  return (
    <Portal>
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#ff8c47" />
          {message && <Text style={styles.message}>{message}</Text>}
        </View>
      </View>
    </Portal>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // mờ toàn màn hình
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999, // ghi đè cả tabbar
  },
  loaderContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  message: {
    marginTop: 10,
    color: '#333',
    fontSize: 16,
  },
});
