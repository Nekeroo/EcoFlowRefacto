import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../ThemedText';
import { Marker } from '@/types/Marker';

interface MarkerDetailsProps {
  markerItem: Marker;
}

export function MarkerDetails({ markerItem }: MarkerDetailsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{markerItem.title}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.description}>{markerItem.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  body: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});
