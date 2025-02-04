import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView 
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default function TrackHabitScreen({ route, navigation }) {
  const { habit } = route.params;
  const [streak, setStreak] = useState(habit.streak || 0);

  // Sample streak data (you would replace this with actual data)
  const streakData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [streak, streak - 1, streak - 2, streak - 1, streak, streak - 1, streak - 2]
          .map(val => Math.max(0, val)) // Ensure no negative values
      }
    ]
  };

  const handleMarkCompleted = () => {
    // Increment streak
    setStreak(prevStreak => prevStreak + 1);
    // In a real app, you'd also update this in your backend/storage
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4568DC', '#B06AB3']}
        style={StyleSheet.absoluteFill}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <BlurView intensity={50} style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Track Habit</Text>
        </BlurView>

        <ScrollView 
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Habit Details */}
          <View style={styles.habitDetailsContainer}>
            <Text style={styles.habitName}>{habit.name}</Text>
            <View style={styles.streakContainer}>
              <MaterialIcons name="local-fire-department" size={24} color="#FF6B6B" />
              <Text style={styles.streak}>Streak: {streak} Days</Text>
            </View>
            <Text style={styles.info}>
              Mark your progress daily to keep the streak alive and build a lasting habit!
            </Text>
          </View>

          {/* Streak Chart */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Weekly Progress</Text>
            <BarChart
              data={streakData}
              width={Dimensions.get("window").width - 40}
              height={220}
              yAxisLabel=""
              chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                color: () => '#4568DC',
                strokeWidth: 2,
                barPercentage: 0.5,
              }}
              verticalLabelRotation={30}
              fromZero={true}
              style={styles.chart}
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            <TouchableOpacity 
              style={styles.completeButton} 
              onPress={handleMarkCompleted}
            >
              <MaterialIcons name="check" size={24} color="white" style={styles.buttonIcon} />
              <Text style={styles.completeButtonText}>Mark as Completed</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.skipButton} 
              onPress={() => {
                // Potential logic for skipping a day
                navigation.goBack();
              }}
            >
              <MaterialIcons name="close" size={24} color="#4568DC" style={styles.buttonIcon} />
              <Text style={styles.skipButtonText}>Skip Today</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  backButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    flex: 1
  },
  content: {
    padding: 20,
    paddingBottom: 40
  },
  habitDetailsContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5
  },
  habitName: {
    fontSize: 24,
    fontWeight: "bold",
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center'
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  streak: {
    fontSize: 18,
    color: '#4568DC',
    marginLeft: 10,
    fontWeight: '600'
  },
  info: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 24
  },
  chartContainer: {
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2c3e50',
    textAlign: 'center'
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16
  },
  actionContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  completeButton: {
    backgroundColor: '#4568DC',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6
  },
  skipButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#4568DC',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  completeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10
  },
  skipButtonText: {
    color: '#4568DC',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10
  },
  buttonIcon: {
    marginRight: 5
  }
});