import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, 
  KeyboardAvoidingView, Platform, ActivityIndicator, Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
const API_KEY = "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";
const API_URL = "https://api.openai.com/v1/chat/completions";
export default function ChatbotScreen() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I assist you with your vehicle issue?", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSend = async () => {
    if (inputText.trim() === "") return;

    setLoading(true);
    setMessages((prevMessages) => [...prevMessages, { id: prevMessages.length + 1, text: inputText, sender: "user" }]);
    setInputText("");
    try {
        const response = await axios.post(
            API_URL,
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: inputText }],
            },
            {
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const botReply = response.data.choices[0]?.message?.content || "⚠️ No response received.";
        setMessages((prevMessages) => [...prevMessages, { id: prevMessages.length + 1, text: botReply, sender: "bot" }]);
    } catch (error) {
        console.error("Error fetching AI response:", error);
        Alert.alert("Error", "Failed to fetch AI response. Please try again.");
        setMessages((prevMessages) => [...prevMessages, { id: prevMessages.length + 1, text: "⚠️ Error fetching response.", sender: "bot" }]);
    } finally {
        setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.chatContainer} keyboardShouldPersistTaps="handled">
        {messages.map((msg) => (
          <View key={msg.id} style={[styles.messageBubble, msg.sender === "user" ? styles.userMessage : styles.botMessage]}>
            <Text style={[styles.messageText, msg.sender === "bot" ? styles.botText : styles.userText]}>{msg.text}</Text>
          </View>
        ))}
        {loading && <ActivityIndicator size="small" color="#007bff" />}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
          editable={!loading}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend} disabled={loading}>
          <Ionicons name="paper-plane-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  chatContainer: { padding: 15, flexGrow: 1 },
  messageBubble: { padding: 12, borderRadius: 10, maxWidth: "75%", marginBottom: 10 },
  userMessage: { backgroundColor: "#007bff", alignSelf: "flex-end" },
  botMessage: { backgroundColor: "#e9ecef", alignSelf: "flex-start" },
  messageText: { fontSize: 16 },
  userText: { color: "#fff" },
  botText: { color: "#333" },
  inputContainer: { flexDirection: "row", alignItems: "center", padding: 10, backgroundColor: "#fff", borderTopWidth: 1, borderColor: "#ddd" },
  input: { flex: 1, padding: 14, borderRadius: 25, borderWidth: 1, borderColor: "#ccc", marginRight: 10, backgroundColor: "#fff" },
  sendButton: { backgroundColor: "#007bff", padding: 14, borderRadius: 50 },
});
