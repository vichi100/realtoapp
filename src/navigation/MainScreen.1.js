import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeStackNav from "./HomeStackNav";
import AddNewPropStackScreens from "./AddNewPropStackScreens";
import ListingStackScreens from "./ListingStackScreens";
import Notification from "../screen/Notification";
import ProfileStackScreens from "./ProfileStackScreens";
import NotificationTopTab from "./NotificationTopTab";

export default function MainScreen() {
  const Tab = createMaterialBottomTabNavigator();
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="rgb(135,206,235)"
        inactiveColor="rgb(105,105,105)"
        barStyle={{ backgroundColor: "#ffffff", paddingBottom: 0 }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackNav}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            )
          }}
        />
        <Tab.Screen
          name="Listing"
          component={ListingStackScreens}
          title="My Properties"
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="view-grid-outline"
                color={color}
                size={26}
              />
            )
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddNewPropStackScreens}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="view-grid-plus-outline"
                color={color}
                size={26}
              />
            )
          }}
        />

        <Tab.Screen
          name="Notification"
          component={NotificationTopTab}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color }) => (
              <Ionicons name="notifications-outline" color={color} size={26} />
            )
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileStackScreens}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
