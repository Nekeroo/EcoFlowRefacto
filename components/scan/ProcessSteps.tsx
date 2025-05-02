import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

export const ProcessSteps = () => {
  return (
    <View style={styles.helpSection}>
      <ThemedText style={styles.helpTitle}>Processus simple</ThemedText>
      
      <View style={styles.stepRow}>
        <ThemedText style={styles.stepNumber}>1.</ThemedText>
        <ThemedText style={styles.stepText}>Prenez une photo de votre déchet</ThemedText>
      </View>
      
      <View style={styles.stepRow}>
        <ThemedText style={styles.stepNumber}>2.</ThemedText>
        <ThemedText style={styles.stepText}>Laissez l'IA identifier le type de déchet</ThemedText>
      </View>
      
      <View style={styles.stepRow}>
        <ThemedText style={styles.stepNumber}>3.</ThemedText>
        <ThemedText style={styles.stepText}>Recevez les consignes de tri adaptées</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  helpSection: {
    backgroundColor: Colors.light.background,
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: Colors.light.tint
  },
  helpTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginBottom: 12
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 8
  },
  stepNumber: {
    width: 24,
    fontWeight: 'bold',
    color: Colors.light.tint
  },
  stepText: {
    flex: 1,
    color: Colors.light.text
  }
});
