import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Animated from "react-native-reanimated";

import Card from "./Card";
import CardDetails from "./CardDetails";
import PostNewProperty from "./upload/PostNewProperty";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
      {/* <Card /> */}
      {/* <CardDetails /> */}
      <PostNewProperty />
    </View>
  );
};

export default HomeScreen;
