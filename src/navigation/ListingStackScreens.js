import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Listing from "../screen/Listing";
import Meeting from "../screen/Meeting";
import PropDetailsFromListing from "../screen/PropDetailsFromListing";

const Stack = createStackNavigator();

const ListingStackScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
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
        name="Listing"
        component={Listing}
        options={{ headerShown: false }}
        // options={{ tabBarLabel: "Home!" }}
      />
      {/* <Stack.Screen
        name="Card"
        component={Card}
        options={{ title: "Meeting Schedules" }}
      /> */}

      <Stack.Screen
        name="Meeting"
        component={Meeting}
        options={{ title: "Reminders" }}
      />

      <Stack.Screen
        name="PropDetailsFromListing"
        component={PropDetailsFromListing}
        options={{ title: "Property details" }}
      />
    </Stack.Navigator>
  );
};

export default ListingStackScreens;
