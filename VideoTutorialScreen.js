import React, { useEffect, useState } from "react";
import { 
  View, Text, StyleSheet, ScrollView, Image, 
  TouchableOpacity, ActivityIndicator, Linking 
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const YOUTUBE_API_KEY = "AIzaSyCdTAiA1wzxZtnmQN_A4eNYVV_R91RNpis"; // Replace with your API key

export default function VideoTutorialScreen() {
  const route = useRoute();
  const { issue } = route.params;
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos(issue);
  }, [issue]);

  const fetchVideos = async (query) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}+car+repair&type=video&maxResults=5&key=${YOUTUBE_API_KEY}`
      );
      const data = await response.json();
      setVideos(data.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const openYouTube = (videoId) => {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    Linking.openURL(url).catch((err) => console.error("Failed to open YouTube:", err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {issue.charAt(0).toUpperCase() + issue.slice(1)} Video Tutorials
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : (
        videos.map((video, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.card} 
            onPress={() => openYouTube(video.id.videoId)}
            activeOpacity={0.8}
          >
            <Image source={{ uri: video.snippet.thumbnails.high.url }} style={styles.thumbnail} />
            <View style={styles.textContainer}>
              <Text style={styles.videoTitle} numberOfLines={2}>
                {video.snippet.title}
              </Text>
              <TouchableOpacity 
                style={styles.watchButton} 
                onPress={() => openYouTube(video.id.videoId)}
              >
                <Ionicons name="logo-youtube" size={20} color="white" />
                <Text style={styles.watchText}>Watch</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff", 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  loader: {
    marginTop: 50,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
    elevation: 3,
  },
  thumbnail: {
    width: 130,
    height: 90,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  watchButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff0000",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  watchText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

