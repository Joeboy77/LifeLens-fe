import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GoalsListScreen from "../Goals/GoalsListScreen";
import GoalDetailsScreen from "../Goals/GoalDetailsScreen";
import AddEditGoalScreen from "../Goals/AddEditGoalScreen";

// Define the type for the Goals Stack Navigator
export type GoalsStackParamList = {
  GoalsList: undefined;
  GoalDetails: { goal: any };
  AddEditGoal: { goal?: any };
};

const Stack = createStackNavigator<GoalsStackParamList>();

export default function GoalsNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="GoalsList"
      screenOptions={{ 
        headerShown: false // This will hide the default header
      }}
    >
      <Stack.Screen 
        name="GoalsList" 
        component={GoalsListScreen} 
      />
      <Stack.Screen 
        name="GoalDetails" 
        component={GoalDetailsScreen} 
      />
      <Stack.Screen 
        name="AddEditGoal" 
        component={AddEditGoalScreen} 
      />
    </Stack.Navigator>
  );
}