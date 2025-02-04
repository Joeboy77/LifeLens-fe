import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  Alert,
  Dimensions
} from "react-native";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function AddEditGoalScreen({ navigation, route }) {
  const [goal, setGoal] = useState(route.params?.goal || {
    title: "",
    description: "",
    status: "Planned",
    targetDate: new Date(),
    progress: 0
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    if (!goal.title.trim()) {
      Alert.alert("Validation Error", "Please enter a goal title");
      return;
    }

    navigation.navigate("GoalsList", { goal });
  };

  const updateGoal = (key, value) => {
    setGoal(prevGoal => ({
      ...prevGoal,
      [key]: value
    }));
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || goal.targetDate;
    setShowDatePicker(false);
    updateGoal('targetDate', currentDate);
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
            {route.params?.goal ? "Edit Goal" : "Create Goal"}
          </Text>
        </BlurView>

        <ScrollView 
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Goal Title Input */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Goal Title</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="flag" size={24} color="#6a11cb" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="What's your goal?"
                placeholderTextColor="#a0a0a0"
                value={goal.title}
                onChangeText={(text) => updateGoal('title', text)}
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
                placeholder="Describe your goal in detail"
                placeholderTextColor="#a0a0a0"
                value={goal.description}
                onChangeText={(text) => updateGoal('description', text)}
                multiline
                numberOfLines={4}
                maxLength={200}
              />
            </View>
          </View>

          {/* Status Selection */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Goal Status</Text>
            <View style={styles.statusButtons}>
              {['Planned', 'In Progress', 'Completed'].map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.statusButton,
                    goal.status === status && styles.selectedStatusButton
                  ]}
                  onPress={() => updateGoal('status', status)}
                >
                  <Text 
                    style={[
                      styles.statusButtonText,
                      goal.status === status && styles.selectedStatusButtonText
                    ]}
                  >
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Target Date */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Target Date</Text>
            <TouchableOpacity 
              style={styles.dateContainer}
              onPress={() => setShowDatePicker(true)}
            >
              <MaterialIcons name="calendar-today" size={24} color="#6a11cb" style={styles.inputIcon} />
              <Text style={styles.dateText}>
                {goal.targetDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={goal.targetDate}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onDateChange}
              />
            )}
          </View>

          {/* Progress Input */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Progress</Text>
            <View style={styles.progressContainer}>
              <TouchableOpacity 
                style={styles.progressButton} 
                onPress={() => updateGoal('progress', Math.max(0, goal.progress - 0.1))}
              >
                <MaterialIcons name="remove" size={24} color="white" />
              </TouchableOpacity>
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar, 
                    { width: `${goal.progress * 100}%` }
                  ]} 
                />
              </View>
              <TouchableOpacity 
                style={styles.progressButton} 
                onPress={() => updateGoal('progress', Math.min(1, goal.progress + 0.1))}
              >
                <MaterialIcons name="add" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.progressText}>
                {Math.round(goal.progress * 100)}%
              </Text>
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={handleSave}
          >
            <MaterialIcons name="save" size={24} color="white" style={styles.saveButtonIcon} />
            <Text style={styles.saveButtonText}>Save Goal</Text>
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5
  },
  dateText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333'
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5
  },
  progressBarContainer: {
    flex: 1,
    height: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 5,
    marginHorizontal: 10
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4568DC',
    borderRadius: 5
  },
  progressButton: {
    backgroundColor: '#4568DC',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  progressText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
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