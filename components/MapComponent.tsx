import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

interface Props {
    showTraffic: boolean;
}

export default function MapComponent({ showTraffic }: Props) {
    return (
        <View style={styles.container}>
            <MapView style={styles.map} showsTraffic={showTraffic} />
        </View>
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

