import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import MapComponent from '@/components/MapComponent';
import { useState } from 'react';
import { Button } from 'react-native-paper';

export default function HomeScreen() {
  const [showTraffic, setShowTraffic] = useState<boolean>(false);
  const [showLocations, setShowLocations] = useState<boolean>(false);


  return (
    <ThemedView style={styles.container}>
      <MapComponent showTraffic={showTraffic} showLocations={showLocations} />
      <ThemedView style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => setShowTraffic(!showTraffic)}
          icon={showTraffic ? "eye-off" : "eye"}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          style={styles.button}
          compact={true}
          uppercase={false}
        >
        </Button>

        <ThemedView style={styles.locationButton}>
          <Button
            id='location-button'
            mode="contained"
            onPress={() => setShowLocations(!showLocations)}
            icon={showLocations ? "eye-off" : "eye"}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            style={styles.button}
            compact={true}
            uppercase={false}

          >
            {showLocations ? 'Hide nearby restaurants' : 'Show nearby restaurants'}
          </Button>
        </ThemedView>


      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  locationButton: {
    marginTop: 2
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    top: 64,
    right: 16,
    zIndex: 1,

  },
  button: {
    borderRadius: 8,
    elevation: 2,
  },
  buttonContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
});