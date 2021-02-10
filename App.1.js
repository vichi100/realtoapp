import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MainStackNavigator from "./src/navigation/MainStackNavigator";
import MainScreen from "./src/navigation/MainScreen";

export default function App() {
  return <MainScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
