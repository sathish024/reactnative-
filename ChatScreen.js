import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [recording, setRecording] = useState(null);
  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, sender: "user", type: "text" }]);
      setInputText("");
    }
  };
  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setMessages([...messages, { image: result.assets[0].uri, sender: "user", type: "image" }]);
    }
  };
  const handleVoiceMessage = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setMessages([...messages, { audio: uri, sender: "user", type: "voice" }]);
        setRecording(null);
      } else {
        const { granted } = await Audio.requestPermissionsAsync();
        if (!granted) return;

        const newRecording = new Audio.Recording();
        await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        await newRecording.startAsync();
        setRecording(newRecording);
      }
    } catch (error) {
      console.error("Recording error:", error);
    }
  };
  const handleCall = () => {
    Linking.openURL("tel:+916381338346");
  };
  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>

        <View style={styles.profileContainer}>
          <Image source={require("./roadside/profile.jpg")} style={styles.profileImage} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Ravi's Auto Service</Text>
            <Text style={styles.phoneNumber}>+91 6381338346</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleCall}>
          <Ionicons name="call" size={28} color="green" />
        </TouchableOpacity>
      </View>

      {/* Message List */}
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.sender === "user" ? styles.userMessage : styles.mechanicMessage,
            ]}
          >
            {item.type === "text" && <Text style={styles.messageText}>{item.text}</Text>}
            {item.type === "voice" && <Text style={styles.messageText}>🎤 Voice Message</Text>}
            {item.type === "image" && <Image source={{ uri: item.image }} style={styles.messageImage} />}
          </View>
        )}
        ListEmptyComponent={<Text style={[styles.noMessages, { textAlign: 'center', alignSelf: 'center' }]}>No messages</Text>
      }
        contentContainerStyle={{ flexGrow: 1, justifyContent: messages.length ? "flex-start" : "center" }}
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handleImageUpload} style={styles.iconButton}>
          <Ionicons name="image" size={26} color="gray" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.iconButton}>
          <Ionicons name="send" size={26} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleVoiceMessage} style={styles.iconButton}>
          <Ionicons name={recording ? "mic-off" : "mic"} size={26} color={recording ? "red" : "gray"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    justifyContent: "space-between",
    marginTop:30,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  phoneNumber: {
    fontSize: 14,
    color: "gray",
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 12,
    marginVertical: 5,
    borderRadius: 12,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007bff",
    borderTopRightRadius: 0,
  },
  mechanicMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ddd",
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: "white",
  },
  messageImage: {
    width: 160,
    height: 160,
    borderRadius: 10,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  iconButton: {
    padding: 8,
  },
});
