import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; // Importing icons

export default function SettingsScreen({ navigation }) {
  const handleLogout = () => {
    Alert.alert("Logged Out", "You have been logged out successfully.");
    navigation.replace("Auth");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Feature Coming Soon!")}>
        <MaterialIcons name="lock" size={28} color="white" />
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialIcons name="logout" size={28} color="white" />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },
  button: {
    flexDirection: 'row',
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    width: "80%",
    alignItems: "center",
    elevation: 5,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  },
});
