import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function GoalsListScreen({ navigation }) {
  // Dummy data for now (Will be replaced with API data)
  const [goals, setGoals] = useState([
    { id: "1", title: "Read 5 Books", status: "In Progress", progress: 0.6, color: "#007bff" },
    { id: "2", title: "Run 50km", status: "Completed", progress: 1.0, color: "#4CAF50" },
    { id: "3", title: "Save $500", status: "Planned", progress: 0.2, color: "#FF9800" },
  ]);

  const renderGoalItem = ({ item }) => (
    <TouchableOpacity
      style={styles.goalItem}
      onPress={() => navigation.navigate("GoalDetails", { goal: item })}
    >
      <View style={styles.goalItemContent}>
        <View style={styles.goalIcon}>
          <MaterialIcons 
            name={
              item.status === "Completed" ? "check-circle" : 
              item.status === "In Progress" ? "timer" : 
              "flag"
            } 
            size={24} 
            color={item.color} 
          />
        </View>
        <View style={styles.goalTextContainer}>
          <Text style={styles.goalTitle}>{item.title}</Text>
          <Text style={[styles.status, { color: item.color }]}>{item.status}</Text>
        </View>
        <View style={styles.progressContainer}>
          <View 
            style={[
              styles.progressBar, 
              { 
                width: `${item.progress * 100}%`, 
                backgroundColor: item.color 
              }
            ]} 
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#007bff', '#00bfff']}
        style={styles.header}
      >
        <Text style={styles.title}>Your Goals</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => navigation.navigate("AddEditGoal")}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={renderGoalItem}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    paddingTop: 40
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white"
  },
  addButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContainer: {
    padding: 20
  },
  goalItem: {
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5
  },
  goalItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15
  },
  goalIcon: {
    marginRight: 15
  },
  goalTextContainer: {
    flex: 1
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333"
  },
  status: {
    fontSize: 14,
    marginTop: 5
  },
  progressContainer: {
    width: 50,
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    borderRadius: 3
  }
});