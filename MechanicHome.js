import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MechanicHome = ({ navigation }) => {
  const [isActivated, setIsActivated] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    checkActivation();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkActivation();
    });

    return unsubscribe;
  }, [navigation]);

  const checkActivation = async () => {
    try {
      const activationStatus = await AsyncStorage.getItem("isActivated");
      if (activationStatus === "true") {
        setIsActivated(true);
        loadUserRequest();
      } else {
        setIsActivated(false);
        setRequests([]);
      }
    } catch (error) {
      console.error("Error fetching activation status:", error);
    }
  };

  const loadUserRequest = async () => {
    const userRequests = [
      {
        id: "1",
        name: "John Doe",
        location: "Downtown",
        phone: "+1 234 567 890",
        distance: "3 km",
        timeTaken: "15 min",
        vehicleType: "Sedan",
        vehicleModel: "Toyota Corolla",
        serviceType: "Engine Repair",
        requiredTools: ["Wrench", "Oil Filter", "Screwdriver"],
        paymentType: "Cash",
      },
      {
        id: "2",
        name: "Emma Johnson",
        location: "Market Street",
        phone: "+1 987 654 321",
        distance: "5 km",
        timeTaken: "20 min",
        vehicleType: "SUV",
        vehicleModel: "Honda CR-V",
        serviceType: "Tire Change",
        requiredTools: ["Jack", "Lug Wrench"],
        paymentType: "Card",
      },
    ];
    
    await AsyncStorage.setItem("requests", JSON.stringify(userRequests));
    setRequests(userRequests);
  };

  const handleAccept = async (selectedRequest) => {
    await AsyncStorage.setItem("selectedRequest", JSON.stringify(selectedRequest));
    navigation.navigate("RequestDetails");
  };

  const handleReject = (id) => {
    setRequests(requests.filter((request) => request.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Profile Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("SettingsPage")}>
          <Ionicons name="person-circle-outline" size={40} color="white" />
        </TouchableOpacity>

        <Text style={styles.title}>Dashboard</Text>

        {/* History, Activation & Notifications */}
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate("HistoryScreen")}>
            <Ionicons name="time-outline" size={26} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ActivationPage")}>
            <Ionicons name="flash-outline" size={26} color={isActivated ? "#32CD32" : "white"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("NotificationScreen")}>
            <Ionicons name="notifications" size={26} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Activation Prompt */}
      {!isActivated ? (
        <View style={styles.activationPrompt}>
          <Text style={styles.activationText}>Activate your profile to view requests.</Text>
          <TouchableOpacity style={styles.activateButton} onPress={() => navigation.navigate("ActivationPage")}>
            <Text style={styles.buttonText}>Activate Now</Text>
          </TouchableOpacity>
        </View>
      ) : requests.length === 0 ? (
        <Text style={styles.noRequestText}>No service requests at the moment.</Text>
      ) : (
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.requestCard}>
              <View style={styles.cardContent}>
                <Ionicons name="person-circle" size={50} color="#007bff" style={styles.userIcon} />
                <View style={styles.requestDetails}>
                  <Text style={styles.requestText}>Name: {item.name}</Text>
                  <Text style={styles.requestText}>Location: {item.location}</Text>
                  <Text style={styles.requestText}>Service: {item.serviceType}</Text>
                  <Text style={styles.requestText}>Distance: {item.distance}</Text>
                </View>
              </View>
              
              {/* Accept/Reject Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => handleAccept(item)}>
                  <Ionicons name="checkmark-circle" size={34} color="green" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleReject(item.id)}>
                  <Ionicons name="close-circle" size={34} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#007bff",
    borderRadius:50
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 15,
  },
  requestCard: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  userIcon: {
    marginRight: 15,
  },
  requestDetails: {
    flex: 1,
  },
  requestText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});

export default MechanicHome;