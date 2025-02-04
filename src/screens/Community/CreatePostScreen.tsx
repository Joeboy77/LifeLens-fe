import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; // Importing icons

export default function CreatePostScreen({ navigation }) {
  const [postContent, setPostContent] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Post</Text>
      <View style={styles.inputContainer}>
        <MaterialIcons name="edit" size={24} color="#00796b" />
        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          value={postContent}
          onChangeText={setPostContent}
          multiline
          numberOfLines={4}
        />
      </View>
      <TouchableOpacity style={styles.postButton} onPress={() => navigation.goBack()}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#f5f5f5", 
    justifyContent: "center",
  },
  title: { 
    fontSize: 32, 
    fontWeight: "bold", 
    marginBottom: 20, 
    color: "#333" 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    marginBottom: 20,
  },
  input: { 
    flex: 1,
    padding: 10,
    marginLeft: 10,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  postButton: { 
    backgroundColor: "blue", 
    padding: 15, 
    alignItems: "center", 
    borderRadius: 10, 
    elevation: 3,
  },
  postButtonText: { 
    color: "white", 
    fontWeight: "bold", 
    fontSize: 16 
  },
});
