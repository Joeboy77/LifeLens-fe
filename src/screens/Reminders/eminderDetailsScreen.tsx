import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ReminderDetailsScreen({ route, navigation }) {
  const { reminder } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{reminder.title}</Text>
      <Text style={styles.time}>⏰ {reminder.time}</Text>
      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("AddEditReminder", { reminder })}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  time: { fontSize: 18, color: "gray", marginVertical: 10 },
  editButton: { backgroundColor: "orange", padding: 15, alignItems: "center", borderRadius: 10 },
  editButtonText: { color: "white", fontWeight: "bold" },
});
