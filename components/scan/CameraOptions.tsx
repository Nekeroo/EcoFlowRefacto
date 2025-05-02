import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { AntDesign } from "@expo/vector-icons";
import { Colors } from '@/constants/Colors';

interface CameraOptionsProps {
  onTakePhoto: () => void;
  onPickImage: () => void;
}

export const CameraOptions = ({ onTakePhoto, onPickImage }: CameraOptionsProps) => {
  return (
    <View style={styles.choiceContainer}>
      <TouchableOpacity style={styles.cameraButton} onPress={onTakePhoto}>
        <View style={styles.iconCircle}>
          <AntDesign name="camerao" size={26} color="#FFFFFF" />
        </View>
        <ThemedText style={styles.choiceText}>Appareil photo</ThemedText>
      </TouchableOpacity>
      
      <View style={styles.divider}>
        <View style={styles.line} />
        <ThemedText style={styles.orText}>OU</ThemedText>
        <View style={styles.line} />
      </View>
      
      <TouchableOpacity style={styles.galleryButton} onPress={onPickImage}>
        <View style={styles.iconCircle}>
          <AntDesign name="picture" size={26} color="#FFFFFF" />
        </View>
        <ThemedText style={styles.choiceText}>Galerie</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  choiceContainer: {
    marginBottom: 40
  },
  cameraButton: {
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20
  },
  galleryButton: {
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center'
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.light.tint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  choiceText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.light.text
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.light.tabIconDefault
  },
  orText: {
    marginHorizontal: 12,
    color: Colors.light.tabIconDefault,
    fontWeight: '500'
  }
});
