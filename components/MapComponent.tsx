<<<<<<< Updated upstream
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function MapComponent() {
    return (
        <View style={styles.container}>
            <MapView style={styles.map} />
        </View>
=======
import React, { useState, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Alert } from 'react-native';
import { ThemedView } from './ThemedView';
import * as Location from 'expo-location';

interface Props {
    showTraffic: boolean;
}

interface Restaurant {
    id: string;
    name: string;
    address: string;
    location: {
        latitude: number;
        longitude: number;
    };
}


// Replace with your Google Places API key
const GOOGLE_API_KEY = 'AIzaSyALarGzaHSHACPwUXtOLpHwqkSfKOlobvQ';

export default function MapComponent({ showTraffic }: Props) {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [mapReady, setMapReady] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Error', 'Permiso de localización negado');
                    return;
                }

                let currentLocation = await Location.getCurrentPositionAsync({});
                setLocation(currentLocation);

                // Get nearby restaurants once we have location
                if (currentLocation) {
                    getNearbyRestaurants(currentLocation.coords);
                }
            } catch (error) {
                console.error('Location error:', error);
                Alert.alert('Error', 'No se pudo obtener la ubicación');
            }
        })();
    }, []);

    const getNearbyRestaurants = async (coords: { latitude: number; longitude: number }) => {
        try {
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.latitude},${coords.longitude}&radius=1000&type=restaurant&key=${GOOGLE_API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.status === 'OK') {
                const places = data.results.map((place: any) => ({
                    id: place.place_id,
                    name: place.name,
                    address: place.vicinity,
                    location: {
                        latitude: place.geometry.location.lat,
                        longitude: place.geometry.location.lng,
                    }
                }));

                setRestaurants(places);
            }
        } catch (error) {
            console.error('Places API error:', error);
            Alert.alert('Error', 'No se pudieron obtener los restaurantes cercanos');
        }
    };

    const onMapReady = () => {
        setMapReady(true);
    };

    if (!location) {
        return (
            <ThemedView style={styles.container}>
                {/* You could add a loading indicator here */}

                It is loading...
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsTraffic={showTraffic}
                zoomEnabled={true}
                onMapReady={onMapReady}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02
                }}
                showsUserLocation
                showsMyLocationButton
            >
                {mapReady && restaurants.map((restaurant) => (
                    <Marker
                        key={restaurant.id}
                        coordinate={restaurant.location}
                        title={restaurant.name}
                        description={restaurant.address}
                        pinColor="red"
                    />
                ))}
            </MapView>
        </ThemedView>

>>>>>>> Stashed changes
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});