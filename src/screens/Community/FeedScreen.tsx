import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; // Importing icons

const dummyPosts = [
  { id: "1", author: "John Doe", content: "Just achieved my goal of running 10km!" },
  { id: "2", author: "Jane Smith", content: "Meditation for 30 days straight! Feeling great. 😊" },
];

export default function FeedScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Community Feed</Text>

      {/* List of posts */}
      <FlatList
        data={dummyPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postItem}
            onPress={() => navigation.navigate("PostDetails", { post: item })}
          >
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.content}>{item.content}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Create Post Button */}
      <TouchableOpacity
        style={styles.createPostButton}
        onPress={() => navigation.navigate("CreatePost")}
      >
        <MaterialIcons name="add" size={24} color="white" />
        <Text style={styles.createPostText}>+ Create a Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 50, backgroundColor: "#f5f5f5" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#333" },
  postItem: { 
    padding: 15, 
    backgroundColor: "#fff", 
    borderRadius: 10, 
    marginBottom: 10, 
    elevation: 3 
  },
  author: { fontSize: 16, fontWeight: "bold" },
  content: { fontSize: 14, color: "#555" },
  createPostButton: {
    flexDirection: "row",
    backgroundColor: "blue",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    elevation: 3,
  },
  createPostText: { 
    color: "white", 
    fontWeight: "bold", 
    marginLeft: 10,
    fontSize: 16,
  },
});
