import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MarkerList } from "../../components/marker/MarkerList";
import { useLocation } from "@/hooks/useLocation";
import { useMarkerData } from "@/hooks/useMarkerData";
import React, { useEffect } from "react";
import { defineMarkerAdress } from "@/services/osmService";

export default function MapScreen() {
  const { location } = useLocation();
  const { markers, loading } = useMarkerData(
    location?.coords?.latitude,
    location?.coords?.longitude
  );

  useEffect( () => {
    markers.forEach(async (marker) => {
      marker.marker = {
        ...marker.marker,
        address: await defineMarkerAdress(marker)
      }
    })
  }, [markers])

  return (
    <>
      {loading && <ActivityIndicator size="large" color="#FFFFFF" />}
      {!loading && markers.length > 0 && (
        <SafeAreaView style={styles.container}>
          <MarkerList markers={markers} />
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
});
