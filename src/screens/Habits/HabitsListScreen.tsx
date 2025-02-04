import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BarChart } from "react-native-chart-kit";
import { Ionicons } from '@expo/vector-icons';

export default function HabitsListScreen({ navigation }) {
  // Dummy habit data (Will be replaced with API data)
  const [habits, setHabits] = useState([
    { id: "1", name: "Drink Water", streak: 10, color: "#3498db" },
    { id: "2", name: "Morning Exercise", streak: 5, color: "#2ecc71" },
    { id: "3", name: "Meditation", streak: 15, color: "#9b59b6" },
  ]);

  // Chart configuration
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  const chartData = {
    labels: habits.map(habit => habit.name.split(" ")[0]),
    datasets: [
      {
        data: habits.map(habit => habit.streak)
      }
    ]
  };

  const renderHabitItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.habitItem, { borderLeftColor: item.color }]}
      onPress={() => navigation.navigate("TrackHabit", { habit: item })}
    >
      <View style={styles.habitContent}>
        <Text style={styles.habitName}>{item.name}</Text>
        <View style={styles.streakContainer}>
          <Text style={styles.streak}>🔥 {item.streak} Days</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#f6f8f9', '#e5ebee']}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Your Habits</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => navigation.navigate("AddEditHabit")}
        >
          <Ionicons name="add" color="white" size={24} />
        </TouchableOpacity>
      </View>

      {/* Progress Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Habit Progress</Text>
        <BarChart
          data={chartData}
          width={Dimensions.get("window").width - 40}
          height={220}
          yAxisLabel=""
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          fromZero={true}
          style={styles.chart}
        />
      </View>

      {/* Habits List */}
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={renderHabitItem}
        contentContainerStyle={styles.listContainer}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2c3e50',
  },
  addButton: {
    backgroundColor: 'green',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  habitItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
  },
  habitContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  habitName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  streakContainer: {
    backgroundColor: '#f1f2f6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  streak: {
    fontSize: 14,
    color: '#57606f',
  },
  chartContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2c3e50',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});