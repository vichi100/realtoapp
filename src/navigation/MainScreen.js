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
import Login from "../screen/Login";
import BottomTabScreen from "./BottomTabScreen";

export default function MainScreen() {
  const RootStack = createStackNavigator();

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          headerTitleAlign: "center",
          // headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#ffffff"
          },
          headerBackTitleVisible: false,
          headerTintColor: "rgba(105,105,105, .9)"
        }}
      >
        <RootStack.Screen name="BottomTabScreen" component={BottomTabScreen} />
        <RootStack.Screen
          name="Login"
          component={Login}
          screenOptions={{
            headerShown: false,
            headerTitleAlign: "center",
            // headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#ffffff"
            },
            headerBackTitleVisible: false,
            headerTintColor: "rgba(105,105,105, .9)"
          }}
        />
      </RootStack.Navigator>
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
