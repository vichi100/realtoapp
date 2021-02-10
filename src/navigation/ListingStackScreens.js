import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Listing from "../screen/Listing";
import Meeting from "../screen/Meeting";
import CardDetails from "../screen/CardDetailsFromCard";

const Stack = createStackNavigator();

const ListingStackScreens = () => {
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
        name="Listing"
        component={Listing}
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
        name="CardDetailsFromCard"
        component={CardDetails}
        options={{ title: "Property details" }}
      />
    </Stack.Navigator>
  );
};

export default ListingStackScreens;
