import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { ThemedView } from './ThemedView';

interface Props {
    showTraffic: boolean;
}

export default function MapComponent({ showTraffic }: Props) {
    return (
        <ThemedView style={styles.container}>
            <MapView style={styles.map} showsTraffic={showTraffic} zoomEnabled={true} region={{
                latitude: 20.6690547,
                longitude: -103.3836232,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05
            }} />
        </ThemedView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

