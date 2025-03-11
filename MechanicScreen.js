import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MechanicDetails = ({ navigation }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    shopName: "",
    aadharNumber: "",
    shopLicense: "",
    experience: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    clearProfileData();
  }, []);

  const clearProfileData = async () => {
    try {
      await AsyncStorage.removeItem("mechanicProfile");
      setForm({
        name: "",
        phone: "",
        email: "",
        location: "",
        shopName: "",
        aadharNumber: "",
        shopLicense: "",
        experience: "",
      });
      setSelectedImage(null);
    } catch (error) {
      console.error("Error clearing profile data:", error);
    }
  };

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "Permission to access gallery is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const validateAndSubmit = async () => {
    navigation.navigate("MechanicHome");
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.match(/^\d{10}$/)) newErrors.phone = "Enter a valid 10-digit phone number";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Enter a valid email";
    if (!form.shopName.trim()) newErrors.shopName = "Shop Name is required";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!form.experience.trim()) newErrors.experience = "Experience is required";
    // if (!form.aadharNumber.match(/^[2-9]{1}[0-9]{11}$/)) newErrors.aadharNumber = "Enter a valid 12-digit Aadhar number";
    if (!form.shopLicense.match(/^[A-Za-z0-9]{5,15}$/)) newErrors.shopLicense = "5-15 alphanumeric characters required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const profileData = { ...form, image: selectedImage };
      await AsyncStorage.setItem("mechanicProfile", JSON.stringify(profileData));
      Alert.alert("Success", "Profile updated successfully!");
      
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          <Image source={selectedImage ? { uri: selectedImage } : require("./roadside/profile.jpg")} style={styles.profileImage} />
          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={18} color="white" />
          </View>
        </TouchableOpacity>
        <View style={styles.formContainer}>
          {Object.keys(form).map((field, index) => (
            <View key={index}>
              <TextInput
                style={[styles.input, errors[field] && styles.errorInput]}
                placeholder={field.replace(/([A-Z])/g, ' $1').trim()}
                value={form[field]}
                onChangeText={(value) => handleChange(field, value)}
                keyboardType={field.includes("phone") || field.includes("Number") ? "numeric" : "default"}
              />
              {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
            </View>
          ))}
        </View>
        <TouchableOpacity onPress={validateAndSubmit} style={styles.buttonContainer}>
          <LinearGradient colors={["#007bff", "#0056b3"]} style={styles.button}>
            <Text style={styles.buttonText}>Save Profile</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default MechanicDetails;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#007bff",
    borderRadius: 15,
    padding: 4,
  },
  formContainer: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
  buttonContainer: {
    width: "90%",
    marginTop: 20,
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
