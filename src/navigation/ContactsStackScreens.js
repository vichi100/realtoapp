import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Listing from "../screen/ListingResidential";
import Meeting from "../screen/Meeting";
import PropDetailsFromListing from "../screen/PropDetailsFromListing";
import PropDetailsFromListingForSell from "../screen/PropDetailsFromListingForSell";
import ContactsTopTab from "./ContactsTopTab";
import CommercialRentPropDetails from "../screen/commercial/rent/CommercialRentPropDetails";
import CommercialSellPropDetails from "../screen/commercial/sell/CommercialSellPropDetails";
import AddNewCustomer from "../screen/contacts/AddNewCustomer";
import ContactLocalityDetailsForm from "../screen/contacts/ContactLocalityDetailsForm";
import ContactResidentialPropertyDetailsForm from "../screen/contacts/ContactResidentialPropertyDetailsForm";
import ContactRentDetailsForm from "../screen/contacts/ContactRentDetailsForm";
import AddNewCustomerRentResidentialFinalDetails from "../screen/contacts/AddNewCustomerRentResidentialFinalDetails";
import ContactBuyResidentialDetailsForm from "../screen/contacts/ContactBuyResidentialDetailsForm";
import AddNewCustomerBuyResidentialFinalDetails from "../screen/contacts/AddNewCustomerBuyResidentialFinalDetails";
import CustomerCommercialPropertyDetailsForm from "../screen/contacts/CustomerCommercialPropertyDetailsForm";
import AddNewCustomerCommercialRentFinalDetails from "../screen/contacts/AddNewCustomerCommercialRentFinalDetails";
import CustomerCommercialRentDetailsForm from "../screen/contacts/CustomerCommercialRentDetailsForm";
import CustomerCommercialBuyDetailsForm from "../screen/contacts/CustomerCommercialBuyDetailsForm";
import AddNewCustomerCommercialBuyFinalDetails from "../screen/contacts/AddNewCustomerCommercialBuyFinalDetails";
import CustomerDetailsResidentialRentFromList from "../screen/contacts/CustomerDetailsResidentialRentFromList";
import CustomerDetailsResidentialBuyFromList from "../screen/contacts/CustomerDetailsResidentialBuyFromList";

import CustomerDetailsCommercialRentFromList from "../screen/contacts/CustomerDetailsCommercialRentFromList";
import CustomerDetailsCommercialBuyFromList from "../screen/contacts/CustomerDetailsCommercialBuyFromList";

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
        name="AddCustomer"
        component={AddNewCustomer}
        navigationOptions={{ tabBarVisible: false }}
        // options={{ headerShown: false, }}
        options={{
          title: "Add New Customer"
        }}
      />
      <Stack.Screen
        name="ContactLocalityDetailsForm"
        component={ContactLocalityDetailsForm}
        options={{ title: "Locality Details" }}
      />
      <Stack.Screen
        name="ContactResidentialPropertyDetailsForm"
        component={ContactResidentialPropertyDetailsForm}
        options={{ title: "Property Details" }}
      />
      <Stack.Screen
        name="ContactRentDetailsForm"
        component={ContactRentDetailsForm}
        options={{ title: "Rent Details" }}
      />
      <Stack.Screen
        name="AddNewCustomerRentResidentialFinalDetails"
        component={AddNewCustomerRentResidentialFinalDetails}
        options={{ title: "Customer Final Details" }}
      />

      <Stack.Screen
        name="ContactBuyResidentialDetailsForm"
        component={ContactBuyResidentialDetailsForm}
        options={{ title: "Buy Details" }}
      />

      <Stack.Screen
        name="AddNewCustomerBuyResidentialFinalDetails"
        component={AddNewCustomerBuyResidentialFinalDetails}
        options={{ title: "Customer Final Details" }}
      />

      <Stack.Screen
        name="CustomerCommercialPropertyDetailsForm"
        component={CustomerCommercialPropertyDetailsForm}
        options={{ title: "Customer Property Details" }}
      />

      <Stack.Screen
        name="AddNewCustomerCommercialRentFinalDetails"
        component={AddNewCustomerCommercialRentFinalDetails}
        options={{ title: "Customer Final Details" }}
      />

      <Stack.Screen
        name="CustomerCommercialRentDetailsForm"
        component={CustomerCommercialRentDetailsForm}
        options={{ title: "Rent Details" }}
      />

      <Stack.Screen
        name="CustomerCommercialBuyDetailsForm"
        component={CustomerCommercialBuyDetailsForm}
        options={{ title: "Buying Details" }}
      />
      <Stack.Screen
        name="AddNewCustomerCommercialBuyFinalDetails"
        component={AddNewCustomerCommercialBuyFinalDetails}
        options={{ title: "Buying Details" }}
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
    </Stack.Navigator>
  );
};

export default ContactsStackScreens;
