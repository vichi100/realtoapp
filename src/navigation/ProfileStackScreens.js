import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

import Profile from "../screen/Profile";
import ManageEmployee from "../screen/ManageEmployee";
import EmployeeList from "../screen/employee/EmployeeList";
import ListingStackScreens from "./ListingStackScreens";
import ContactsStackScreens from "./ContactsStackScreens";
import ListingTopTab from "./ListingTopTab";
import ContactsTopTab from "./ContactsTopTab";

import PropDetailsFromListingForSell from "../screen/PropDetailsFromListingForSell";
import PropDetailsFromListing from "../screen/PropDetailsFromListing";
import CommercialRentPropDetails from "../screen/commercial/rent/CommercialRentPropDetails";
import CommercialSellPropDetails from "../screen/commercial/sell/CommercialSellPropDetails";

import CustomerDetailsResidentialRentFromList from "../screen/contacts/CustomerDetailsResidentialRentFromList";
import CustomerDetailsResidentialBuyFromList from "../screen/contacts/CustomerDetailsResidentialBuyFromList";
import CustomerDetailsCommercialRentFromList from "../screen/contacts/CustomerDetailsCommercialRentFromList";
import CustomerDetailsCommercialBuyFromList from "../screen/contacts/CustomerDetailsCommercialBuyFromList";

const Stack = createStackNavigator();

const ProfileStackScreens = ({ route }) => {
  const { displayCheckBox, disableDrawer, displayCheckBoxForEmployee, item } = route.params || {};
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerBackTitleVisible: false,
        headerTintColor: "rgba(105,105,105, .9)",
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Profile", headerShown: false }}
      />
      <Stack.Screen
        name="ManageEmployee"
        component={ManageEmployee}
        options={{ title: "Add New Employee" }}
      />
      <Stack.Screen
        name="EmployeeList"
        component={EmployeeList}
        options={{ title: "Employee" }}
      />
      <Stack.Screen
        name="PropertyListing"
        component={ListingTopTab}
        initialParams={{
          displayCheckBox: false, // Pass your argument here
          disableDrawer: true,
          displayCheckBoxForEmployee: true,
          // employeeObj: item,
        }}
        options={{ title: "Properties", headerShown: true, tabBarLabel: "Home!" }}
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
        name="ContactsListing"
        component={ContactsTopTab}
        options={{ title: "Customers", headerShown: true, tabBarLabel: "Home!" }}
        initialParams={{
          displayCheckBox: false, // Pass your argument here
          disableDrawer: true,
          displayCheckBoxForEmployee: true,
          // employeeObj: item,
        }}
      // options={{ tabBarLabel: "Home!" }}
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

export default ProfileStackScreens;