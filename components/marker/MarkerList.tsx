import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { MarkerItem } from "./MarkerItem";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MarkerDetails } from "./MarkerDetails";
import { SafeAreaView } from "react-native-safe-area-context";
import { Marker } from "@/types/Marker";
import React from "react";
import { defineMarkerAdress } from "@/services/osmService";

interface MarkerListProps {
  markers: Array<Marker>;
}

export function MarkerList({ markers }: MarkerListProps) {
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "70%", "90%"], []);

  // When a marker is clicked, select it and show the bottom sheet
  const handleMarkerPress = useCallback(async (item: Marker) => {
    setSelectedMarker(item);
    bottomSheetRef.current?.snapToIndex(1);
  }, []);

  // Reset selected marker when bottom sheet is closed
  const handleSheetClose = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  // Effect to log selected marker after state update
  useEffect(() => {
    console.log("Selected marker:", selectedMarker);
  }, [selectedMarker]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={markers}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              // TODO : Add the refresh of the List
            }}
          ></RefreshControl>
        }
        keyExtractor={(marker, index) => `${marker.marker?.id ?? index}-${index}`}
        renderItem={({ item }) => (
          item.marker && (
            <MarkerItem marker={item} onPress={() => handleMarkerPress(item)} />
          )
        )}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={handleSheetClose}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.bottomSheetIndicator}
      >
        <BottomSheetView style={styles.bottomSheetView}>
          {selectedMarker ? (
            <MarkerDetails markerItem={selectedMarker} />
          ) : (
            <View style={styles.noMarkerContainer}>
              <Text style={styles.noMarkerText}>No marker selected</Text>
            </View>
          )}
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "transparent",
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  bottomSheetView: {
    flex: 1,
  },
  bottomSheetBackground: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  bottomSheetIndicator: {
    backgroundColor: "#999",
    width: 40,
  },
  noMarkerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  noMarkerText: {
    fontSize: 16,
    color: "#666",
  },
});
