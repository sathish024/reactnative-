import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function AssistanceDetailsScreen({ route }) {
  const navigation = useNavigation();
  const { item } = route.params;

  // Function to generate random values for missing details
  const getRandomValue = (type) => {
    switch (type) {
      case "phone":
        return `+91 ${Math.floor(9000000000 + Math.random() * 99999999)}`;
      case "experience":
        return Math.floor(Math.random() * 15) + 1; // 1 to 15 years
      case "serviceCost":
        return `₹${Math.floor(Math.random() * 500) + 200}`; // ₹200 - ₹700
      case "travelCost":
        return `₹${Math.floor(Math.random() * 300) + 100}`; // ₹100 - ₹400
      case "platformFee":
        return `₹${Math.floor(Math.random() * 100) + 50}`; // ₹50 - ₹150
      case "location":
        return "Pondicherry";
      default:
        return "Not Available";
    }
  };

  const phone = item.phone || getRandomValue("phone");
  const experience = item.experience || getRandomValue("experience");
  const serviceCost = item.serviceCost || getRandomValue("serviceCost");
  const travelCost = item.travelCost || getRandomValue("travelCost");
  const platformFee = item.platformFee || getRandomValue("platformFee");
  const address = item.address || getRandomValue("location");
  const estimatedFee = `₹${parseInt(serviceCost.replace("₹", "")) + parseInt(travelCost.replace("₹", "")) + parseInt(platformFee.replace("₹", ""))}`;

  // Store latitude and longitude in the backend
  const lat = item.lat;
  const lon = item.lon;
  
  fetch("https://your-backend-api.com/store-location", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: item.name, lat, lon }),
  });

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileCard}>
        <Image source={require("./roadside/profile.jpg")} style={styles.avatar} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.info}>📍 {address}</Text>
      </View>

      {/* Service Details */}
      <View style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>🔍 Details</Text>
        <Text style={styles.info}>📞 Phone: {phone}</Text>
        <Text style={styles.info}>⭐ Rating: {item.rating} / 5</Text>
        <Text style={styles.info}>💼 Experience: {experience} years</Text>
        <Text style={styles.info}>📏 Distance: {parseFloat(item.distance).toFixed(1)} km</Text>
        <Text style={styles.info}>⏳ Time Taken: {parseFloat(item.time).toFixed(1)} min</Text>
      </View>

      {/* Invoice Section */}
      <View style={styles.invoiceCard}>
        <Text style={styles.sectionTitle}>💰 Invoice</Text>
        <Text style={styles.info}>🔧 Service Cost: {serviceCost}</Text>
        <Text style={styles.info}>🚗 Travel Cost: {travelCost}</Text>
        <Text style={styles.info}>💻 Platform Fee: {platformFee}</Text>
        <Text style={styles.totalCost}>💵 Estimated Fee: {estimatedFee}</Text>
      </View>

      {/* Request Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("TimeoutScreen", {
            name: item.name,
            location: address,
            estimatedFee: estimatedFee,
          })
        }
      >
        <Text style={styles.buttonText}>Request Assistance</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f8",
    padding: 20,
    alignItems: "center",
  },
  profileCard: {
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 15,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
    borderColor: "#007bff",
    borderWidth: 2,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  detailsCard: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 15,
  },
  invoiceCard: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  totalCost: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#28a745",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 15,
    shadowColor: "#007bff",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});