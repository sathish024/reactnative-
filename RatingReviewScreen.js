import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";

const RatingReviewScreen = ({ initialRating = 0 }) => {
  const [rating, setRating] = useState(initialRating);
  const [review, setReview] = useState("");
  const navigation = useNavigation();

  const handleSubmit = () => {
    console.log("Rating:", rating);
    console.log("Review:", review);
    alert("Thank you for your feedback!");
    navigation.navigate("UserHome");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Image source={require("./roadside/profile.jpg")} style={styles.avatar} />
        <View>
          <Text style={styles.name}>Bosh Car Service</Text>
          <Text style={styles.location}>White Town, Pondicherry</Text>
        </View>
      </View>
      
      <Text style={styles.label}>Rate your experience</Text>
      <AirbnbRating
        count={5}
        defaultRating={initialRating}
        size={30}
        showRating={false}
        onFinishRating={(value) => setRating(value)}
      />

      <Text style={styles.label}>Write a Review</Text>
      <TextInput
        style={styles.input}
        placeholder="Share your experience..."
        multiline
        numberOfLines={4}
        value={review}
        onChangeText={setReview}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  location: {
    fontSize: 14,
    color: "gray",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    fontSize: 14,
    marginBottom: 20,
    textAlignVertical: "top",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  submitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RatingReviewScreen;
