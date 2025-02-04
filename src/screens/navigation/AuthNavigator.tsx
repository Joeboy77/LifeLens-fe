import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../Auth/LoginScreen"
import SignupScreen from "../Auth/SignupScreen";
import ForgotPasswordScreen from "../Auth/ForgotPasswordScreen";

const AuthStack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </AuthStack.Navigator>
  );
}
