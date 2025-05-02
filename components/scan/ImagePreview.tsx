import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { AntDesign } from "@expo/vector-icons";
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

interface ImagePreviewProps {
  imageUri: string;
  onAnalyze: (uri: string) => void;
  onRetake: () => void;
}

export const ImagePreview = ({ imageUri, onAnalyze, onRetake }: ImagePreviewProps) => {
  return (
    <View style={styles.imageContent}>
      <View style={styles.imageFrame}>
        <Image source={{ uri: imageUri }} style={styles.capturedImage} />
      </View>
      
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.greenButton} onPress={() => onAnalyze(imageUri)}>
          <AntDesign name="search1" size={22} color="#FFFFFF" />
          <ThemedText style={styles.buttonText}>Analyser</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.lightButton} onPress={onRetake}>
          <AntDesign name="reload1" size={22} color={Colors.light.tint} />
          <ThemedText style={styles.lightButtonText}>Reprendre</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContent: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageFrame: {
    width: width * 0.85,
    aspectRatio: 4/3,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.tabIconDefault,
    marginBottom: 30
  },
  capturedImage: {
    width: '100%',
    height: '100%'
  },
  actionRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  greenButton: {
    backgroundColor: Colors.light.tint,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 8,
    flex: 1,
    marginRight: 10
  },
  lightButton: {
    backgroundColor: Colors.light.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8
  },
  lightButtonText: {
    color: Colors.light.tint,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8
  }
});
