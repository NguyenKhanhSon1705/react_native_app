import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const LoadingRotate = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 200,
    zIndex: 999, // đảm bảo nằm trên cùng
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingRotate;
