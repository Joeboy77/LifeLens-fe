import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../Home/DashboardScreen';
 import GoalsListScreen from '../Goals/GoalsListScreen';
// import HabitsListScreen from '../screens/Habits/HabitsListScreen';
// import ProfileScreen from '../screens/Profile/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import GoalsNavigator from './GoalsNavigator';
import HabitsNavigator from './HabitsNavigator';
import CommunityNavigator from './CommunityNavigator';
import ProfileNavigator from './ProfileNavigator';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={DashboardScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }} />
       <Tab.Screen name="Goals" component={GoalsNavigator} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="flag" size={size} color={color} /> }} />
       <Tab.Screen name="Habits" component={HabitsNavigator} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="bar-chart" size={size} color={color} /> }} />
       <Tab.Screen name='Posts' component={CommunityNavigator} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="attach" size={size} color={color} /> }}/>
       <Tab.Screen name="Profile" component={ProfileNavigator} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} /> }} />   
    </Tab.Navigator>
  );
}
