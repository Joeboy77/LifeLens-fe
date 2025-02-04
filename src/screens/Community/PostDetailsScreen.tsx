import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function PostDetailsScreen({ route }) {
  const { post } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.author}'s Post</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.content}>{post.content}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.likeButton}>
          <Text style={styles.buttonText}>👍 Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commentButton}>
          <Text style={styles.buttonText}>💬 Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
  },
  contentContainer: {
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 20,
  },
  content: {
    fontSize: 18,
    color: "#34495e",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeButton: {
    backgroundColor: "#4caf50",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  commentButton: {
    backgroundColor: "#2196f3",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
