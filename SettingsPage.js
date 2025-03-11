import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
const SettingsPage = () => {
  const navigation = useNavigation();

  const settingsOptions = [
    { name: "Profile Settings", icon: "person", screen: "MechanicProfile" },
    { name: "Savings & Earnings", icon: "attach-money", screen: "Earnings" },
    { name: "Ratings & Reviews", icon: "star", screen: "Ratings" },
    { name: "Payment Settings", icon: "credit-card", screen: "Payments" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      {settingsOptions.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionCard}
          onPress={() => navigation.navigate(item.screen)}
        >
          <Icon name={item.icon} size={24} color="#007bff" style={styles.icon} />
          <Text style={styles.optionText}>{item.name}</Text>
          <Icon name="chevron-right" size={24} color="#aaa" />
        </TouchableOpacity>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});

export default SettingsPage;
