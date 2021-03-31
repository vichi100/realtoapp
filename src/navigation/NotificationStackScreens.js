import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import NotificationTopTab from "./NotificationTopTab";
import CustomerMeetingDetails from "../screen/contacts/CustomerMeetingDetails";

const Stack = createStackNavigator();

const NotificationStackScreens = () => {
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
        name="NotificationTopTab"
        component={NotificationTopTab}
        options={{ headerShown: false }}
        // options={{ tabBarLabel: "Home!" }}
      />
      {/* <Stack.Screen
        name="Card"
        component={Card}
        options={{ title: "Meeting Schedules" }}
      /> */}

      <Stack.Screen
        name="CustomerMeetingDetails"
        component={CustomerMeetingDetails}
        options={{ title: "Meeting Details" }}
      />
    </Stack.Navigator>
  );
};

export default NotificationStackScreens;
