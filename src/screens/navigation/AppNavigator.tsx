import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "./AuthNavigator";
import BottomTabNavigator from "./BottomNavigator";

const Stack = createStackNavigator();

export default function AppNavigator() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
        <Stack.Screen name="Auth" component={AuthNavigator} />
      
        <Stack.Screen name="Main" component={BottomTabNavigator} />
    
    </Stack.Navigator>
  );
}
