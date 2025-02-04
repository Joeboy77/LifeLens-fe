import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { LineChart, ProgressChart, PieChart } from 'react-native-chart-kit';

export default function DashboardScreen({ navigation }) {
  const [goals, setGoals] = useState([
    { id: "1", title: "Read 5 books", progress: 0.6, status: "In Progress" },
    { id: "2", title: "Exercise 3x per week", progress: 1.0, status: "Completed" },
  ]);

  const [habits, setHabits] = useState([
    { id: "1", name: "Meditate", streak: 7, color: "#FF6384" },
    { id: "2", name: "Drink Water", streak: 15, color: "#36A2EB" },
    { id: "3", name: "Reading", streak: 10, color: "#FFCE56" },
  ]);

  const [progressData, setProgressData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Progress Tracking"]
  });

  const screenWidth = Dimensions.get("window").width;

  const renderGoalProgress = () => (
    <ProgressChart
      data={{
        labels: goals.map(goal => goal.title),
        data: goals.map(goal => goal.progress)
      }}
      width={screenWidth - 40}
      height={220}
      strokeWidth={16}
      radius={32}
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
      hideLegend={false}
    />
  );

  const renderHabitPieChart = () => (
    <PieChart
      data={habits.map(habit => ({
        name: habit.name,
        population: habit.streak,
        color: habit.color,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      }))}
      width={screenWidth - 40}
      height={220}
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
      accessor={"population"}
      backgroundColor={"transparent"}
      paddingLeft={"15"}
      center={[10, 50]}
      absolute
    />
  );

  const renderProgressLineChart = () => (
    <LineChart
      data={progressData}
      width={screenWidth - 40}
      height={220}
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.profileInfo}>
          <Text style={styles.header}>Welcome Back, User!</Text>
          <Text style={styles.subHeader}>Let's track your progress today</Text>
        </View>
        <TouchableOpacity style={styles.profileIcon}>
          <MaterialIcons name="account-circle" size={50} color="#007bff" />
        </TouchableOpacity>
      </View>

      {/* Summary Section */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <MaterialIcons name="flag" size={24} color="#007bff" />
          <Text style={styles.summaryTitle}>Goals</Text>
          <Text style={styles.summaryValue}>{goals.length}</Text>
        </View>
        <View style={styles.summaryCard}>
          <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
          <Text style={styles.summaryTitle}>Habits</Text>
          <Text style={styles.summaryValue}>{habits.length}</Text>
        </View>
        <View style={styles.summaryCard}>
          <MaterialIcons name="notifications" size={24} color="#FF9800" />
          <Text style={styles.summaryTitle}>Reminders</Text>
          <Text style={styles.summaryValue}>2</Text>
        </View>
      </View>

      {/* Charts Section */}
      <View style={styles.chartSection}>
        <Text style={styles.sectionTitle}>Goal Progress</Text>
        {renderGoalProgress()}
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.sectionTitle}>Habit Streaks</Text>
        {renderHabitPieChart()}
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.sectionTitle}>Monthly Progress</Text>
        {renderProgressLineChart()}
      </View>

      {/* Quick Actions Section */}
      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionButtons}>
          <TouchableOpacity 
            style={styles.quickActionButton} 
            onPress={() => navigation.navigate("AddEditGoal")}
          >
            <MaterialIcons name="add-circle" size={24} color="#007bff" />
            <Text style={styles.quickActionText}>Add Goal</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate("AddEditHabit")}
          >
            <MaterialIcons name="add-task" size={24} color="#4CAF50" />
            <Text style={styles.quickActionText}>Track Habit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate("AddEditReminder")}
          >
            <MaterialIcons name="alarm-add" size={24} color="#FF9800" />
            <Text style={styles.quickActionText}>Set Reminder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f0f4f8" 
  },
  profileHeader: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 40, 
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5
  },
  profileInfo: {
    flex: 1
  },
  header: { 
    fontSize: 28, 
    fontWeight: "bold", 
    color: "#333" 
  },
  subHeader: {
    fontSize: 16,
    color: "#666"
  },
  profileIcon: {
    padding: 10
  },
  summaryContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    padding: 15
  },
  summaryCard: {
    backgroundColor: 'white', 
    borderRadius: 10, 
    padding: 15, 
    alignItems: 'center',
    width: '30%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  summaryTitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 5
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#333"
  },
  chartSection: {
    backgroundColor: 'white', 
    borderRadius: 15, 
    padding: 15, 
    margin: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5
  },
  sectionTitle: {
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 15, 
    color: "#333"
  },
  quickActionsSection: {
    backgroundColor: 'white', 
    borderRadius: 15, 
    padding: 15, 
    margin: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5
  },
  quickActionButtons: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: 10,
    borderRadius: 10,
    width: '30%'
  },
  quickActionText: {
    marginLeft: 5,
    fontSize: 12,
    color: "#333"
  }
});