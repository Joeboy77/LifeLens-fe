import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../Profile/ProfileScreen";
import SettingsScreen from "../Profile/SettingsScreen";

const Stack = createStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
