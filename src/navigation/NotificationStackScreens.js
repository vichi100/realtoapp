import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import NotificationTopTab from "./NotificationTopTab";
import CustomerMeetingDetails from "../screen/contacts/CustomerMeetingDetails";
import PropDetailsFromListing from "../screen/PropDetailsFromListing";
import PropDetailsFromListingForSell from "../screen/PropDetailsFromListingForSell";
import CommercialRentPropDetails from "../screen/commercial/rent/CommercialRentPropDetails";
import CommercialSellPropDetails from "../screen/commercial/sell/CommercialSellPropDetails";

import MessageDetails from "../screen/MessageDetails";
// import Message from "";

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
      <Stack.Screen
        name="MessageDetails"
        component={MessageDetails}
        options={{ title: "Message Details" }}
      />
      <Stack.Screen
        name="PropDetailsFromListing"
        component={PropDetailsFromListing}
        navigationOptions={{ tabBarVisible: false }}
        options={{
          title: "Property details"
        }}
      />
      <Stack.Screen
        name="PropDetailsFromListingForSell"
        component={PropDetailsFromListingForSell}
        navigationOptions={{ tabBarVisible: false }}
        options={{
          title: "Property details"
        }}
      />

      <Stack.Screen
        name="CommercialRentPropDetails"
        component={CommercialRentPropDetails}
        navigationOptions={{ tabBarVisible: false }}
        options={{
          title: "Property details"
        }}
      />
      <Stack.Screen
        name="CommercialSellPropDetails"
        component={CommercialSellPropDetails}
        navigationOptions={{ tabBarVisible: false }}
        options={{
          title: "Property details"
        }}
      />
    </Stack.Navigator>
  );
};

export default NotificationStackScreens;
