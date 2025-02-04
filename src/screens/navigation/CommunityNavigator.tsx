import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FeedScreen from "../Community/FeedScreen";
import CreatePostScreen from "../Community/CreatePostScreen";
import PostDetailsScreen from "../Community/PostDetailsScreen";

const Stack = createStackNavigator();

export default function CommunityNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      <Stack.Screen name="PostDetails" component={PostDetailsScreen} />
    </Stack.Navigator>
  );
}
