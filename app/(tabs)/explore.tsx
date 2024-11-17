import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as React from "react";
import { Card, Text, ActivityIndicator } from "react-native-paper";
import { useState } from "react";
import { Image, View, ImageBackground } from "react-native";
import { BlurView } from 'expo-blur';

export default function TabTwoScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const githubAvatarUrl = "https://github.com/andresdanielmtz.png?size=200";

  return (
    <ThemedView style={styles.container}>
      <ImageBackground
        source={{ uri: githubAvatarUrl }}
        style={styles.backgroundImage}
        blurRadius={50}
      >
        <BlurView intensity={40} style={styles.blurContainer}>
          <ThemedText type="title" style={styles.screenTitle}>
            Credits
          </ThemedText>
          
          <Card style={styles.cardContainer}>
            <View style={styles.cardContent}>
              <View style={styles.imageContainer}>
                {loading && (
                  <ActivityIndicator
                    style={styles.loader}
                    size="small"
                    color="#000"
                  />
                )}
                <Image
                  source={{ uri: githubAvatarUrl }}
                  style={styles.cardImage}
                  onLoadStart={() => setLoading(true)}
                  onLoadEnd={() => setLoading(false)}
                  onError={() => setLoading(false)}
                />
              </View>
              
              <View style={styles.textContainer}>
                <Text variant="headlineMedium" style={styles.name}>
                  Andrés Martínez
                </Text>
                <Text variant="bodyMedium" style={styles.id}>
                  A00227463
                </Text>
                <Text variant="bodyLarge" style={styles.subtitle}>
                  CS Student @ ITESM
                </Text>
                <Text variant="bodyMedium" style={styles.thankYou}>
                  Thank you for using my app!
                </Text>
              </View>
            </View>
          </Card>
        </BlurView>
      </ImageBackground>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  blurContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  screenTitle: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  cardContainer: {
    width: "100%",
    maxWidth: 500,
    marginVertical: 10,
    elevation: 8,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  cardContent: {
    flexDirection: "row",
    padding: 16,
  },
  imageContainer: {
    width: 120,
    marginRight: 16,
  },
  cardImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontWeight: "bold",
    marginBottom: 4,
    color: '#000',
  },
  subtitle: {
    color: '#333',
    marginBottom: 2,
    fontWeight: '500',
  },
  id: {
    color: '#666',
    marginBottom: 4,
  },
  thankYou: {
    marginTop: 8,
    color: '#444',
    fontStyle: 'italic',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 1,
  }
});