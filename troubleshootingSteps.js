import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
export default function TroubleshootingSteps() {
  const route = useRoute();
  const navigation = useNavigation();
  const { issue } = route.params;
  const troubleshootingData = {
    engine: {
      tools: ["Wrench", "Engine Oil", "OBD Scanner"],
      quickFix: [
        "Check if the engine oil level is low.",
        "Ensure the fuel tank is not empty.",
        "Look for any warning lights on the dashboard.",
      ],
      advancedRepair: [
        "Use an OBD scanner to diagnose error codes.",
        "Check spark plugs and ignition coils.",
        "Inspect the air filter and fuel injectors.",
      ],
      tutorial: "https://www.youtube.com/watch?v=engine_fix_guide",
    },
    battery: {
      tools: ["Jumper Cables", "Battery Tester", "Gloves"],
      quickFix: [
        "Check if the battery terminals are corroded.",
        "Try jump-starting the battery.",
        "Ensure all lights and accessories are turned off when starting.",
      ],
      advancedRepair: [
        "Use a battery tester to check voltage.",
        "Replace old battery if necessary.",
        "Inspect the alternator and charging system.",
      ],
      tutorial: "https://www.youtube.com/watch?v=battery_fix_guide",
    },
    tire: {
      tools: ["Spare Tire", "Jack", "Lug Wrench"],
      quickFix: [
        "Inspect the tire for visible punctures.",
        "Use a spare tire if available.",
        "Call roadside assistance if necessary.",
      ],
      advancedRepair: [
        "Use a tire repair kit for minor punctures.",
        "Check tire pressure and reinflate if needed.",
        "Replace with a new tire if damage is severe.",
      ],
      tutorial: "https://www.youtube.com/watch?v=tire_fix_guide",
    },
  };
  const issueData = troubleshootingData[issue] || troubleshootingData["engine"];
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{issue.charAt(0).toUpperCase() + issue.slice(1)} Troubleshooting</Text>

      {/* Required Tools Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}><FontAwesome5 name="tools" size={20} color="#007bff" /> Required Tools</Text>
        {issueData.tools.map((tool, index) => (
          <Text key={index} style={styles.item}>🔧 {tool}</Text>
        ))}
      </View>

      {/* Quick Fix Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}><Ionicons name="time-outline" size={20} color="#28a745" /> Quick Fix</Text>
        {issueData.quickFix.map((step, index) => (
          <Text key={index} style={styles.item}>⏳{step}</Text>
        ))}
      </View>
      {/* Advanced Repair Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}><FontAwesome5 name="wrench" size={20} color="#dc3545" /> Advanced Repair</Text>
        {issueData.advancedRepair.map((step, index) => (
          <Text key={index} style={styles.item}>🛠️ {step}</Text>
        ))}
      </View>
      {/* Tutorial Link */}
      <TouchableOpacity style={styles.tutorialButton}  onPress={() => navigation.navigate("VideoTutorialScreen", { issue})}>
        <Text style={styles.tutorialText}>📺 Watch Tutorial</Text>
      </TouchableOpacity>
      {/* Search Assistant Button */}
      <TouchableOpacity style={styles.assistanceButton} onPress={() => navigation.navigate("AssitanceListScreen")}>
        <Text style={styles.assistanceText}>🔍 Search Assistance</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.chatbotButton} onPress={() => navigation.navigate("ChatbotScreen")}>
        <Text style={styles.chatbotText}>🤖 Open Chatbot</Text>
      </TouchableOpacity>
    </ScrollView>
  ); 

}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#007bff",
  },
  item: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  tutorialButton: {
    backgroundColor: "#ffc107",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  tutorialText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  assistanceButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  assistanceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  chatbotButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    top:10,
  },
  chatbotText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
