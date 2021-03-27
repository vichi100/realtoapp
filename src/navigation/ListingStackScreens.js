import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Listing from "../screen/ListingResidential";
import Meeting from "../screen/Meeting";
import PropDetailsFromListing from "../screen/PropDetailsFromListing";
import PropDetailsFromListingForSell from "../screen/PropDetailsFromListingForSell";
import ListingTopTab from "./ListingTopTab";
import CommercialRentPropDetails from "../screen/commercial/rent/CommercialRentPropDetails";
import CommercialSellPropDetails from "../screen/commercial/sell/CommercialSellPropDetails";
import AddNewPropStackScreens from "./AddNewPropStackScreens";

const Stack = createStackNavigator();
export const hideTabBarComponents = ["ProductDetails"];

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
        component={ListingTopTab}
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
        options={{ title: "Reminders", tabBarVisible: false }}
        navigationOptions={{ tabBarVisible: false }}
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

      <Stack.Screen
        name="Add"
        component={AddNewPropStackScreens}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="view-grid-plus-outline"
              color={color}
              size={26}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
};

export default ListingStackScreens;
