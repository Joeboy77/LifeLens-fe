import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

export default function RemindersListScreen({ navigation }) {
  const [reminders, setReminders] = useState([
    { id: "1", title: "Drink Water", time: "9:00 AM" },
    { id: "2", title: "Workout", time: "6:00 PM" },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Reminders</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.reminderItem}
            onPress={() => navigation.navigate("ReminderDetails", { reminder: item })}
          >
            <Text style={styles.reminderTitle}>{item.title}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddEditReminder")}>
        <Text style={styles.addButtonText}>+ Add Reminder</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  reminderItem: { padding: 15, backgroundColor: "#fff", borderRadius: 10, marginBottom: 10, elevation: 3 },
  reminderTitle: { fontSize: 18 },
  time: { fontSize: 14, color: "gray" },
  addButton: { backgroundColor: "blue", padding: 15, alignItems: "center", borderRadius: 10, marginTop: 20 },
  addButtonText: { color: "white", fontWeight: "bold" },
});
