import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useLanguage } from "./LanguageContext";
import { FontAwesome5 } from "@expo/vector-icons";

const SelectionPage = ({ navigation }) => {
  const { language, toggleLanguage } = useLanguage();
  const [showLanguages, setShowLanguages] = useState(false);

  return (
    <View style={styles.container}>
      {/* 🌍 Language Selector */}
      <TouchableOpacity style={styles.languageSelector} onPress={() => setShowLanguages(!showLanguages)}>
        <FontAwesome5 name="language" size={22} color="#333" />
      </TouchableOpacity>

      {showLanguages && (
        <View style={styles.languageDropdown}>
          <TouchableOpacity onPress={() => { toggleLanguage("EN"); setShowLanguages(false); }}>
            <Text style={styles.languageText}>🇺🇸 English</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { toggleLanguage("HI"); setShowLanguages(false); }}>
            <Text style={styles.languageText}>🇮🇳 हिंदी</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* 🛠️ Admin Icon */}
      <TouchableOpacity style={styles.adminIcon} onPress={() => navigation.navigate("AdminLoginPage")}>
        <FontAwesome5 name="user-cog" size={28} color="#007bff" />
      </TouchableOpacity>
      {/* 🚗 Illustration */}
      <Image source={require("./roadside/illustration.png")} style={styles.illustration} />
      {/* 🚀 App Title */}
      <Text style={styles.header}>RAVB Assistance</Text>
      <Text style={styles.subHeader}>{language === "EN" ? "Choose Your Role" : "अपनी भूमिका चुनें"}</Text>
      {/* 👤 User Login */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("User")}>
        <FontAwesome5 name="user" size={20} color="#fff" />
        <Text style={styles.buttonText}>{language === "EN" ? "USER LOGIN" : "उपयोगकर्ता लॉगिन"}</Text>
      </TouchableOpacity>
      {/* 🛠️ Mechanic Login */}
      <TouchableOpacity style={[styles.button, { backgroundColor: "#ff6f00" }]} onPress={() => navigation.navigate("Mechanic")}>
        <FontAwesome5 name="tools" size={20} color="#fff" />
        <Text style={styles.buttonText}>{language === "EN" ? "MECHANIC LOGIN" : "मेकैनिक लॉगिन"}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default SelectionPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },
  languageSelector: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  languageDropdown: {
    position: "absolute",
    top: 70,
    left: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 8,
    elevation: 5,
  },
  languageText: {
    fontSize: 16,
    paddingVertical: 5,
    fontWeight: "bold",
    color: "#333",
  },
  adminIcon: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  illustration: {
    width: 300,
    height: 200,
    marginBottom: 20,
    resizeMode: "contain",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 18,
    color: "#666",
    marginBottom: 30,
  },
  button: {
    width: "85%",
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
