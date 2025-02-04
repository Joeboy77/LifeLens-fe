import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function AddEditReminderScreen({ route, navigation }) {
  const reminderToEdit = route.params?.reminder;
  const [title, setTitle] = useState(reminderToEdit?.title || "");
  const [time, setTime] = useState(reminderToEdit?.time || "");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add/Edit Reminder</Text>
      <TextInput style={styles.input} placeholder="Reminder Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Time (e.g., 7:30 AM)" value={time} onChangeText={setTime} />
      <TouchableOpacity style={styles.saveButton} onPress={() => navigation.goBack()}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  saveButton: { backgroundColor: "green", padding: 15, alignItems: "center", borderRadius: 10, marginTop: 20 },
  saveButtonText: { color: "white", fontWeight: "bold" },
});
