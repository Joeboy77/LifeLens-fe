import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HabitsListScreen from "../Habits/HabitsListScreen";
import TrackHabitScreen from "../Habits/TrackHabitScreen";
import AddEditHabitScreen from "../Habits/AddEditHabitScreen";

const Stack = createStackNavigator();

export default function HabitsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HabitsList" component={HabitsListScreen} />
      <Stack.Screen name="TrackHabit" component={TrackHabitScreen} />
      <Stack.Screen name="AddEditHabit" component={AddEditHabitScreen} />
    </Stack.Navigator>
  );
}
