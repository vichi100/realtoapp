import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../screen/Profile";
import ManageEmployee from "../screen/ManageEmployee";

const Stack = createStackNavigator();
const ProfileStackScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",

        // headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#ffffff"
        },
        headerBackTitleVisible: false,
        headerTintColor: "rgba(105,105,105, .9)"
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Profile", headerShown: false }}
      />
      <Stack.Screen
        name="ManageEmployee"
        component={ManageEmployee}
        options={{ title: "Manage Employee" }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackScreens;
