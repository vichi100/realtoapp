import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Listing from "../screen/ListingResidential";
import Meeting from "../screen/Meeting";
import CustomerMeeting from "../screen/contacts/CustomerMeeting";
import PropDetailsFromListing from "../screen/PropDetailsFromListing";
import PropDetailsFromListingForSell from "../screen/PropDetailsFromListingForSell";
import ContactsTopTab from "./ContactsTopTab";
import CommercialRentPropDetails from "../screen/commercial/rent/CommercialRentPropDetails";
import CommercialSellPropDetails from "../screen/commercial/sell/CommercialSellPropDetails";
import CustomerDetailsResidentialRentFromList from "../screen/contacts/CustomerDetailsResidentialRentFromList";
import CustomerDetailsResidentialBuyFromList from "../screen/contacts/CustomerDetailsResidentialBuyFromList";

import CustomerDetailsCommercialRentFromList from "../screen/contacts/CustomerDetailsCommercialRentFromList";
import CustomerDetailsCommercialBuyFromList from "../screen/contacts/CustomerDetailsCommercialBuyFromList";
import PropertyListForMeeting from "../screen/contacts/PropertyListForMeeting";
import CustomerMeetingDetails from "../screen/contacts/CustomerMeetingDetails";
import AddNewContactsStackScreens from "./AddNewCustomerStackScreens";
import AddNewPropStackScreens from "./AddNewPropStackScreens"

const Stack = createStackNavigator();
export const hideTabBarComponents = ["ProductDetails"];

const ContactsStackScreens = () => {
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
        name="Contacts"
        component={ContactsTopTab}
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
        name="CustomerMeeting"
        component={CustomerMeeting}
        options={{ title: "Reminders", tabBarVisible: false }}
        navigationOptions={{ tabBarVisible: false }}
      />

      <Stack.Screen
        name="PropertyListForMeeting"
        component={PropertyListForMeeting}
        options={{ title: "Property List", tabBarVisible: false }}
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
        name="CustomerDetailsResidentialRentFromList"
        component={CustomerDetailsResidentialRentFromList}
        options={{ title: "Customer Details" }}
      />
      <Stack.Screen
        name="CustomerDetailsResidentialBuyFromList"
        component={CustomerDetailsResidentialBuyFromList}
        options={{ title: "Customer Details" }}
      />

      <Stack.Screen
        name="CustomerDetailsCommercialRentFromList"
        component={CustomerDetailsCommercialRentFromList}
        options={{ title: "Customer Details" }}
      />
      <Stack.Screen
        name="CustomerDetailsCommercialBuyFromList"
        component={CustomerDetailsCommercialBuyFromList}
        options={{ title: "Customer Details" }}
      />

      <Stack.Screen
        name="CustomerMeetingDetails"
        component={CustomerMeetingDetails}
        options={{ title: "Meeting Details" }}
      />

      <Stack.Screen
        name="AddNewCustomerStack"
        component={AddNewContactsStackScreens}
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

export default ContactsStackScreens;
