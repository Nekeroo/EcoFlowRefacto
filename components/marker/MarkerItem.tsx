import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from '../ThemedText';
import { Marker } from '@/types/Marker';
import React from 'react';

export interface MarkerItemProps {
  marker: Marker,
  onPress?: () => void;
}

export function MarkerItem({ marker, onPress }: MarkerItemProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{marker.marker.name ?? ""}</Text>
        <Text style={styles.description}>{marker.marker.address}</Text>
        <Text style={styles.description}>{marker.marker.tags?.recycling_type || ""}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 4,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
