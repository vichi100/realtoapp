import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import getFocusedRouteNameFromRoute from "@react-navigation/native";
import Home from "../screen/Home";

import Login from "../screen/Login";

const HomeStack = createStackNavigator();

const HomeStackNav = () => {
  return (
    <HomeStack.Navigator
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
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: "Home!", tabBarVisible: false }}
        // options={({ route }) => ({
        //   tabBarVisible: (route => {
        //     const routeName = "Login";
        //     // getFocusedRouteNameFromRoute(route);

        //     if (routeName === "Login") {
        //       return false;
        //     }

        //     return true;
        //   })(route)
        // })}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNav;
