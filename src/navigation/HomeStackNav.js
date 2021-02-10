import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screen/Home";

const HomeStack = createStackNavigator();

function HomeStackNav() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: "Home!" }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackNav;
