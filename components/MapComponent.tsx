import React, { useState, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Alert, ActivityIndicator, View, Text } from 'react-native';
import { ThemedView } from './ThemedView';
import * as Location from 'expo-location';

interface Props {
    showTraffic: boolean;
    showLocations?: boolean;
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

const GOOGLE_API_KEY = 'AIzaSyALarGzaHSHACPwUXtOLpHwqkSfKOlobvQ';

export default function MapComponent({ showTraffic, showLocations }: Props) {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [mapReady, setMapReady] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Error', 'Permiso de localización denegado.');
                    setLoading(false);
                    return;
                }

                let currentLocation = await Location.getCurrentPositionAsync({});
                setLocation(currentLocation);

                if (currentLocation) {
                    await getNearbyRestaurants(currentLocation.coords);
                }
            } catch (error) {
                console.error('Error al obtener ubicación:', error);
                Alert.alert('Error', 'No se pudo obtener la ubicación.');
            } finally {
                setLoading(false);
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
                    },
                }));
                setRestaurants(places);
            } else {
                console.error('Google Places API Error:', data.status, data.error_message);
                Alert.alert('Error', 'No se pudieron cargar restaurantes cercanos.');
            }
        } catch (error) {
            console.error('Error al obtener lugares:', error);
            Alert.alert('Error', 'No se pudieron cargar restaurantes cercanos.');
        }
    };

    const onMapReady = () => {
        setMapReady(true);
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Cargando ubicación...</Text>
            </View>
        );
    }

    if (!location) {
        return (
            <ThemedView style={[styles.container, styles.centered]}>
                <Text>No se pudo obtener la ubicación.</Text>
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
                    longitudeDelta: 0.02,
                }}
                showsUserLocation
                showsMyLocationButton
            >
                {mapReady && showLocations && 
                    restaurants.map((restaurant) => (
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
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
