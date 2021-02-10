import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Platform } from "react-native";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import Residential from "../screens/Residential";
import PostNewProperty from "../screens/upload/PostNewProperty";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen //CreditOrderList
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `md-home${focused ? "" : "-outline"}`
          : "md-home"
      }
    />
  )
};

HomeStack.path = "";

const ResidentialStack = createStackNavigator(
  {
    Residential: Residential
  },
  config
);

ResidentialStack.navigationOptions = {
  tabBarLabel: "Residential",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "md-people" : "md-people"}
    />
  )
};

ResidentialStack.path = "";

const PostNewPropertyStack = createStackNavigator(
  {
    PostNewProperty: PostNewProperty
  },
  config
);

PostNewPropertyStack.navigationOptions = {
  tabBarLabel: "Post New Property",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "md-stats" : "md-stats"}
    />
  )
};

PostNewPropertyStack.path = "";

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ResidentialStack,
  PostNewPropertyStack
});

const AppStack = createStackNavigator({
  MainTabNavigator: {
    screen: tabNavigator,
    backBehavior: "history",
    headerMode: "none",
    headerBackTitle: null,
    headerLeft: null,

    navigationOptions: {
      header: null
    }
  }
});

export default createAppContainer(
  createSwitchNavigator(
    {
      //AuthLoading: MainTabNavigator,
      App: AppStack
      //Auth: AuthStack,
    },
    {
      //initialRouteName: 'AuthLoading',
      initialRouteName: "App",
      headerMode: "none"
    }
  )
);
