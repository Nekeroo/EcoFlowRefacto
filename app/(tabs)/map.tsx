import { ActivityIndicator, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MarkerList } from "@/components/marker/MarkerList";
import { useLocation } from "@/hooks/useLocation";
import { useMarkerData } from "@/hooks/useMarkerData";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from '@expo/vector-icons';

export default function MapScreen() {
  const { location } = useLocation();
  const { markers, loading } = useMarkerData(
    location?.coords?.latitude,
    location?.coords?.longitude
  );
  const [showMap, setShowMap] = useState(true);

  useEffect(() => {
    console.log("Markers:", markers);
    console.log("Location:", location);
  }, [markers, location]);

  const toggleView = () => setShowMap(!showMap);

  if (loading) {
    return <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleView} style={styles.toggleButton}>
          <Ionicons name={showMap ? "list" : "map"} size={24} color="#4CAF50" />
          <ThemedText style={styles.toggleText}>
            {showMap ? "Vue liste" : "Vue carte"}
          </ThemedText>
        </TouchableOpacity>
      </View>

      {markers.length > 0 && (
        <View style={styles.contentContainer}>
          {showMap ? (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location?.coords?.latitude || 48.8566,
                longitude: location?.coords?.longitude || 2.3522,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation={true}
              followsUserLocation={true}
            >
              {/* User location marker */}
              {location && (
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                  }}
                  title="Ma position"
                  pinColor="blue"
                />
              )}
              
              {/* Collection points markers */}
              {markers.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.marker.lat,
                    longitude: marker.marker.lon
                  }}
                  title={marker.marker.name}
                  description={marker.marker.address + " - " + marker.distance}
                />
              ))}
            </MapView>
          ) : (
            <MarkerList markers={markers} />
          )}
        </View>
      )}
    </SafeAreaView>
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
    borderBottomColor: '#E0E0E0',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  toggleText: {
    marginLeft: 8,
    color: '#4CAF50',
    fontWeight: '600',
  },
  map: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1
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
