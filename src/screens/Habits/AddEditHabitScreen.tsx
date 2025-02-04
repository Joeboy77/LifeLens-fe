import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  Alert
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function AddEditHabitScreen({ navigation, route }) {
  const [habit, setHabit] = useState(route.params?.habit || {
    name: "",
    description: "",
    frequency: "Daily",
    reminderTime: null,
    icon: null
  });

  const handleSave = () => {
    if (!habit.name.trim()) {
      Alert.alert("Validation Error", "Please enter a habit name");
      return;
    }

    // In a real app, this would save to a database or state management system
    navigation.navigate("HabitsList", { habit });
  };

  const updateHabit = (key, value) => {
    setHabit(prevHabit => ({
      ...prevHabit,
      [key]: value
    }));
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
          <Text style={styles.title}>
            {route.params?.habit ? "Edit Habit" : "Create Habit"}
          </Text>
        </BlurView>

        <ScrollView 
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Habit Name Input */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Habit Name</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="loyalty" size={24} color="#6a11cb" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="What habit do you want to build?"
                placeholderTextColor="#a0a0a0"
                value={habit.name}
                onChangeText={(text) => updateHabit('name', text)}
                maxLength={50}
              />
            </View>
          </View>

          {/* Description Input */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Description</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="notes" size={24} color="#6a11cb" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, styles.multilineInput]}
                placeholder="Why is this habit important to you?"
                placeholderTextColor="#a0a0a0"
                value={habit.description}
                onChangeText={(text) => updateHabit('description', text)}
                multiline
                numberOfLines={4}
                maxLength={200}
              />
            </View>
          </View>

          {/* Frequency Selection */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Frequency</Text>
            <View style={styles.statusButtons}>
              {['Daily', 'Weekly', 'Monthly'].map((frequency) => (
                <TouchableOpacity
                  key={frequency}
                  style={[
                    styles.statusButton,
                    habit.frequency === frequency && styles.selectedStatusButton
                  ]}
                  onPress={() => updateHabit('frequency', frequency)}
                >
                  <Text 
                    style={[
                      styles.statusButtonText,
                      habit.frequency === frequency && styles.selectedStatusButtonText
                    ]}
                  >
                    {frequency}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={handleSave}
          >
            <MaterialIcons name="save" size={24} color="white" style={styles.saveButtonIcon} />
            <Text style={styles.saveButtonText}>Save Habit</Text>
          </TouchableOpacity>
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
  inputSection: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 10,
    paddingLeft: 5
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 15,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5
  },
  inputIcon: {
    marginRight: 10
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333'
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
    paddingVertical: 15
  },
  statusButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  statusButton: {
    flex: 1,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center'
  },
  selectedStatusButton: {
    backgroundColor: 'white'
  },
  statusButtonText: {
    color: 'white',
    fontWeight: '600'
  },
  selectedStatusButtonText: {
    color: '#4568DC'
  },
  saveButton: {
    backgroundColor: '#4568DC',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6
  },
  saveButtonIcon: {
    marginRight: 10
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});