import React, { useState } from "react";
import { Alert, View, StyleSheet, Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ThemedText } from "@/components/ThemedText";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from '@/constants/Colors';
import { LoadingView } from "@/components/scan/LoadingView";
import { ImagePreview } from "@/components/scan/ImagePreview";
import { CameraOptions } from "@/components/scan/CameraOptions";
import { ProcessSteps } from "@/components/scan/ProcessSteps";
import { analyzeWasteImage } from "@/services/openaiAPI";
import { saveToHistory } from "@/services/historyService";
import { router } from "expo-router";


declare global {
  var wasteInfo: any | null
}


export default function ScanScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "Camera permission is needed to take photos"
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "Gallery permission is needed to pick photos"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const analyzeWaste = async (uri: string) => {
    try {
      setLoading(true)
      setImage(uri)
      const result = await analyzeWasteImage(uri)
      global.wasteInfo = result

      if (!result.erreur?.présent) {
        await saveToHistory(uri, result)
      }

      router.push('/waste-details')
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'analyser l\'image. Veuillez réessayer.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <LoadingView />
      ) : image ? (
        <ImagePreview 
          imageUri={image}
          onAnalyze={analyzeWaste}
          onRetake={takePhoto}
        />
      ) : (
        <View style={styles.content}>
          <ThemedText style={styles.headline}>Identifiez vos déchets</ThemedText>
          <ThemedText style={styles.subheadline}>
            Prenez une photo claire de votre déchet pour savoir comment le recycler
          </ThemedText>
          
          <CameraOptions 
            onTakePhoto={takePhoto}
            onPickImage={pickImage}
          />
          
          <ProcessSteps />
        </View>
      )}
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background
  },
  content: {
    flex: 1,
    padding: 16,
    paddingTop: 40
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginBottom: 8,
    textAlign: 'center'
  },
  subheadline: {
    fontSize: 16,
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22
  }
})