import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ProgressChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";

export default function GoalDetailsScreen({ route, navigation }) {
  const { goal } = route.params;
  const [progress, setProgress] = useState(goal.progress || 0.6);

  const screenWidth = Dimensions.get("window").width;

  const updateProgress = (newProgress) => {
    setProgress(Math.max(0, Math.min(1, newProgress)));
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[goal.color || '#007bff', '#00bfff']}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{goal.title}</Text>
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => navigation.navigate("AddEditGoal", { goal })}
        >
          <MaterialIcons name="edit" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.statusContainer}>
          <Text style={[styles.status, { color: goal.color }]}>{goal.status}</Text>
        </View>

        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>Progress</Text>
          <ProgressChart
            data={{
              labels: [goal.title],
              data: [progress]
            }}
            width={screenWidth - 40}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={{
              backgroundColor: goal.color,
              backgroundGradientFrom: goal.color,
              backgroundGradientTo: goal.color,
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            hideLegend={false}
          />
          <View style={styles.progressControls}>
            <TouchableOpacity 
              style={styles.progressButton} 
              onPress={() => updateProgress(progress - 0.1)}
            >
              <MaterialIcons name="remove" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.progressText}>
              {Math.round(progress * 100)}% Complete
            </Text>
            <TouchableOpacity 
              style={styles.progressButton} 
              onPress={() => updateProgress(progress + 0.1)}
            >
              <MaterialIcons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Goal Details</Text>
          <View style={styles.detailItem}>
            <MaterialIcons name="calendar-today" size={24} color="#007bff" />
            <Text style={styles.detailText}>Started: January 1, 2024</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialIcons name="schedule" size={24} color="#4CAF50" />
            <Text style={styles.detailText}>Target Date: June 30, 2024</Text>
          </View>
        </View>
      </ScrollView>
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
  backButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  editButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    flex: 1,
    textAlign: 'center'
  },
  content: {
    padding: 20
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  status: {
    fontSize: 18,
    fontWeight: "bold"
  },
  progressSection: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333"
  },
  progressControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15
  },
  progressButton: {
    backgroundColor: "#007bff",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  progressText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  detailsSection: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#666"
  }
});