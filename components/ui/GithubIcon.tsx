import { StyleSheet, Image } from 'react-native';
import { Card, ActivityIndicator } from "react-native-paper";
import { useState, useEffect } from "react";
import { ThemedText } from '../ThemedText';

export default function GitHubAvatarComponent() {
  const [avatar, setAvatar] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://github.com/andresdanielmtz.png?size=200")
      .then((response) => response.blob())
      .then((blob) => {
        setAvatar(URL.createObjectURL(blob));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Card style={styles.cardContainer}>
      <Card.Content>
        <ThemedText> 
          Andrés Martínez - A00227463

          </ThemedText>

        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Image source={{ uri: avatar }} style={styles.cardImage} />
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    maxWidth: 500,
    marginVertical: 10,
    elevation: 5,
    borderRadius: 10,
  },
  cardImage: {
    marginTop: 10,
    height: 300,
    borderRadius: 10,
  },
});