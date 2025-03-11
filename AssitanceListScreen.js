import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import axios from "axios";
export default function AssistanceListScreen() {
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mechanics, setMechanics] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Location permission is required to show nearby mechanics.");
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
      fetchMechanics(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const fetchMechanics = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://overpass-api.de/api/interpreter?data=[out:json];node(around:30000,${lat},${lon})["shop"="car_repair"];out;`
      );

      const mechanicsData = response.data.elements
        .map((shop) => ({
          id: shop.id.toString(),
          name: shop.tags?.name || "Unnamed Mechanic",
          lat: shop.lat,
          lon: shop.lon,
          distance: getDistance(lat, lon, shop.lat, shop.lon),
          time: calculateTime(getDistance(lat, lon, shop.lat, shop.lon)),
          estimatedFee: calculateEstimatedCost(getDistance(lat, lon, shop.lat, shop.lon)),
          rating: generateRandomRating(),
        }))
        .filter((shop) => shop.name !== "Unnamed Mechanic")
        .sort((a, b) => a.distance - b.distance);

      setMechanics(mechanicsData);
    } catch (error) {
      console.error("Error fetching mechanics:", error);
    }
    setLoading(false);
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const calculateTime = (distance) => {
    return (distance / 40) * 60;
  };

  const calculateEstimatedCost = (distance) => {
    const time = calculateTime(distance);
    return `₹${(distance * 50 + time * 20 + 100).toFixed(2)}`;
  };

  const generateRandomRating = () => {
    return (Math.random() * (5 - 3.5) + 3.5).toFixed(1) + " ★";
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Available Assistance Near You</Text>
      <Text style={styles.nearbyTitle}>Nearby Mechanics</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
        {mechanics.slice(0, 5).map((mechanic) => (
          <TouchableOpacity key={mechanic.id} style={styles.nearbyCard}>
            <Image source={require("./roadside/profile.jpg")} style={styles.avatarSmall} />
            <Text style={styles.nearbyName}>{mechanic.name}</Text>
            <Text style={styles.nearbyDistance}>{mechanic.distance.toFixed(1)} km away</Text>
            <View style={styles.greenDot} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
        data={mechanics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate("AssistanceDetailsScreen", { item })}>
              <View style={styles.header}>
                <Image source={require("./roadside/profile.jpg")} style={styles.avatar} />
                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.rating}>Rating: {item.rating}</Text>
                  <Text style={styles.rating}>Distance: {item.distance.toFixed(1)} km</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.details}>
              <Text style={styles.detailValue}>Time: {item.time.toFixed(1)} min</Text>
              <Text style={styles.detailValue}>Estimated Fee: {item.estimatedFee}</Text>
            </View>
            <View style={styles.greenDot} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  nearbyTitle: { fontSize: 16, fontWeight: "bold", marginTop: 15 },
  horizontalList: { marginBottom: 15 },
  nearbyCard: { flex: 1, flexDirection: "row", alignItems: "center", backgroundColor: "#f8f8f8", padding: 10, borderRadius: 10, margin: 5 },
  avatarSmall: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  greenDot: { width: 12, height: 12, backgroundColor: "green", borderRadius: 6, position: "absolute", right: 10, top: 10 },
  card: { backgroundColor: "#f8f8f8", borderRadius: 10, padding: 15, marginBottom: 10, elevation: 3 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  name: { fontSize: 16, fontWeight: "bold" },
  rating: { fontSize: 14, color: "#555" },
  details: { flexDirection: "row", justifyContent: "space-between" },
  detailValue: { fontSize: 16, fontWeight: "bold" },
});