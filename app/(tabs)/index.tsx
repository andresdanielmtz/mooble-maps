import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import MapComponent from '@/components/MapComponent';
import { useState } from 'react';
import { Button } from 'react-native-paper';

export default function HomeScreen() {
  const [showTraffic, setShowTraffic] = useState<boolean>(false);

  return (
    <ThemedView style={styles.container}>
      <MapComponent showTraffic={showTraffic}/>
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
          {showTraffic ? 'Hide traffic' : 'Show traffic'}
        </Button>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
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