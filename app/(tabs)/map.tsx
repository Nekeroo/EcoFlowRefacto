import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MarkerList } from '../../components/marker/MarkerList';
import { Marker } from '@/types/Marker';

const sampleMarkers: Marker[] = [
  {
    title: 'Eiffel Tower',
    description: 'Famous landmark in Paris, France',
  },

  {
    title: 'Times Square',
    description: 'Bustling commercial intersection in New York City',
  },
  {
    title: 'Sydney Opera House',
    description: 'Iconic performing arts venue in Sydney, Australia',
  }
];

export default function MapScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <MarkerList markers={sampleMarkers} />
    </SafeAreaView>
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
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});
