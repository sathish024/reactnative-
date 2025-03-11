import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLanguage } from "./LanguageContext";

const UserScreen = ({ navigation }) => {
  const { language } = useLanguage();
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+91 ");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});

  const locations = ["Tamil Nadu", "Puducherry", "Kerala", "Karnataka", "Andhra Pradesh"];

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

  const validate = () => {
    let newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    else if (!/^[a-zA-Z\s]+$/.test(name)) newErrors.name = "Only letters & spaces allowed.";

    if (!phone.trim() || phone === "+91 ") newErrors.phone = "Phone number is required.";
    else if (!/^\+91 \d{10}$/.test(phone)) newErrors.phone = "Must be 10 digits after +91.";

    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email.";

    if (!gender) newErrors.gender = "Please select a gender.";
    if (!location) newErrors.location = "Please select a location.";

    if (!vehicleType.trim()) newErrors.vehicleType = "Vehicle type is required.";
    if (!vehicleModel.trim()) newErrors.vehicleModel = "Vehicle model is required.";

    if (!registrationNo.trim()) newErrors.registrationNo = "Registration number required.";
    else if (!/^[A-Z]{2}\s\d{2}\s[A-Z]{2}\s\d{4}$/.test(registrationNo))
      newErrors.registrationNo = "Format: TN02 BC 4859";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    navigation.navigate("UserHome");
    if (!validate()) return;

    const userData = {
      name,
      phone,
      email,
      gender,
      location,
      vehicleType,
      vehicleModel,
      registrationNo,
      profileImage: selectedImage,
    };

    try {
      await AsyncStorage.setItem("userProfile", JSON.stringify(userData));
      
      Alert.alert("Success", "Profile saved!");
      
    } catch (error) {
      Alert.alert("Error", "Failed to save.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          <Image source={selectedImage ? { uri: selectedImage } : require("./roadside/profile.jpg")} style={styles.profileImage} />
          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={18} color="white" />
          </View>
        </TouchableOpacity>
        <Text style={styles.imageText}>Tap to select an image</Text>

        <View style={styles.formContainer}>
          <TextInput style={[styles.input, errors.name && styles.inputError]} placeholder="Full Name" value={name} onChangeText={setName} />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(text) => {
              if (text.startsWith("+91 ")) setPhone(text);
            }}
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

          <TextInput style={[styles.input, errors.email && styles.inputError]} placeholder="Email ID" keyboardType="email-address" value={email} onChangeText={setEmail} />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <View style={[styles.pickerContainer, errors.gender && styles.inputError]}>
            <Picker selectedValue={gender} style={styles.picker} onValueChange={(itemValue) => setGender(itemValue)}>
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
          {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

          <View style={[styles.pickerContainer, errors.location && styles.inputError]}>
            <Picker selectedValue={location} style={styles.picker} onValueChange={(itemValue) => setLocation(itemValue)}>
              <Picker.Item label="Select Location" value="" />
              {locations.map((loc) => (
                <Picker.Item key={loc} label={loc} value={loc} />
              ))}
            </Picker>
          </View>
          {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

          <View style={[styles.pickerContainer, errors.vehicleType && styles.inputError]}>
  <Picker
    selectedValue={vehicleType}
    style={styles.picker}
    onValueChange={(itemValue) => setVehicleType(itemValue)}
  >
    <Picker.Item label="Select Vehicle Type" value="" />
    <Picker.Item label="2 Wheel" value="2 Wheel" />
    <Picker.Item label="3 Wheel" value="3 Wheel" />
    <Picker.Item label="4 Wheel" value="4 Wheel" />
  </Picker>
</View>
{errors.vehicleType && <Text style={styles.errorText}>{errors.vehicleType}</Text>}
          <TextInput style={[styles.input, errors.vehicleModel && styles.inputError]} placeholder="Vehicle Model" value={vehicleModel} onChangeText={setVehicleModel} />
          {errors.vehicleModel && <Text style={styles.errorText}>{errors.vehicleModel}</Text>}
          <TextInput style={[styles.input, errors.registrationNo && styles.inputError]} placeholder="Reg. No (TN 02 BC 4859)" value={registrationNo} onChangeText={setRegistrationNo} />
          {errors.registrationNo && <Text style={styles.errorText}>{errors.registrationNo}</Text>}
        </View>

        <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer}>
          <LinearGradient colors={["#007bff", "#0056b3"]} style={styles.button}>
            <Text style={styles.buttonText}>Save Profile</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, alignItems: "center", paddingVertical: 20 },
  container: { width: "90%", alignItems: "center", backgroundColor: "#f8f9fa" },
  imageContainer: { position: "relative", marginBottom: 15 },
  profileImage: { width: 110, height: 110, borderRadius: 55, borderWidth: 2, borderColor: "#ddd" },
  cameraIcon: { position: "absolute", bottom: 5, right: 5, backgroundColor: "#007bff", borderRadius: 15, padding: 4 },
  imageText: { fontSize: 14, color: "gray", marginBottom: 15 },
  formContainer: { width: "100%", backgroundColor: "#fff", padding: 20, borderRadius: 10, elevation: 5 },
  input: { width: "100%", height: 50, borderWidth: 1, borderColor: "#ddd", borderRadius: 8, paddingHorizontal: 15, backgroundColor: "#fff",marginBottom: 10},
  inputError: { borderColor: "red" },
  pickerContainer: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, marginBottom: 5 },
  picker: { width: "100%", height: 50 },
  errorText: { color: "red", fontSize: 12, marginBottom: 5 },
  buttonContainer: { width: "100%", alignItems: "center", marginTop: 15 },
  button: { width: "80%", paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  buttonText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
});
