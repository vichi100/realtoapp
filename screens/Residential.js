import * as React from "react";
import { Text, View, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import TopTabBar from "./TopTabBar";
import RentScreen from "./RentScreen";
import SellScreen from "./SellScreen";

const Tab = createMaterialTopTabNavigator();
const SCREEN_WIDTH = Dimensions.get("window").width;

const Residential = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: { fontSize: 12 },
          tabStyle: { width: SCREEN_WIDTH / 2 },
          style: { backgroundColor: "powderblue" }
        }}
      >
        <Tab.Screen name="Rent" component={RentScreen} />
        <Tab.Screen name="Sell" component={SellScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Residential;
