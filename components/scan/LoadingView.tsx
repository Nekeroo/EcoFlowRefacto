import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

export const LoadingView = () => {
  return (
    <View style={styles.loadingContainer}>
      <View style={styles.loadingCircle}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
      <ThemedText style={styles.loadingText}>Analyse en cours</ThemedText>
      <ThemedText style={styles.loadingSubtext}>Identification du déchet...</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  loadingCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24
  },
  loadingText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginBottom: 8
  },
  loadingSubtext: {
    fontSize: 16,
    color: Colors.light.text,
    textAlign: 'center'
  }
});
