import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { MarkerItem } from './MarkerItem';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MarkerDetails } from './MarkerDetails';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Marker } from '@/types/Marker';

interface MarkerListProps {
  markers: Array<Marker>;
}

export function MarkerList({ markers }: MarkerListProps) {
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  const handleMarkerPress = useCallback((item: Marker) => {
    setSelectedMarker(item);
    bottomSheetRef.current?.snapToIndex(1);
  }, []);

  // Effect to log selected marker after state update
  useEffect(() => {
    console.log('Selected marker:', selectedMarker);
  }, [selectedMarker]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={markers}
        refreshControl={<RefreshControl refreshing={false} onRefresh={() => {
          
          // TODO : Add the refresh of the List
 
        }}></RefreshControl>}
        keyExtractor={(marker, index) => `${marker.title}-${index}`}
        renderItem={({ item }) => (
          <MarkerItem
            marker={item}
            onPress={() => handleMarkerPress(item)}
          />
        )}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={() => setSelectedMarker(null)}
        style={styles.bottomSheet}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.bottomSheetIndicator}
      >
        {selectedMarker ? (
          <MarkerDetails markerItem={selectedMarker} />
        ) : (
          <View style={styles.noMarkerContainer}>
            <Text style={styles.noMarkerText}>No marker selected</Text>
          </View>
        )}
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  bottomSheet: {
    flex: 1,
  },
  bottomSheetBackground: {
    backgroundColor: '#fff',
  },
  bottomSheetIndicator: {
    backgroundColor: '#999',
    width: 40,
  },
  noMarkerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  noMarkerText: {
    fontSize: 16,
    color: '#666',
  },
});
