import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import auth from "./firebase"
import { onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Check if the user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Login Function
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in!");
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  // Logout Function
  const handleLogout = async () => {
    await signOut(auth);
    console.log("User logged out!");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {user ? (
        <>
          <Text>Welcome, {user.email}!</Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{ borderWidth: 1, padding: 8, width: 200, marginBottom: 10 }}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{ borderWidth: 1, padding: 8, width: 200, marginBottom: 10 }}
          />
          <Button title="Login" onPress={handleLogin} />
        </>
      )}
    </View>
  );
}
