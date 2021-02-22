import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import AddNewProperty from "../screen/AddNewProperty";
import LocalityDetailsForm from "../screen/LocalityDetailsForm";
import ResidentialPropertyDetailsForm from "../screen/ResidentialPropertyDetailsForm";
import CommercialPropertyDetailsForm from "../screen/CommercialPropertyDetailsForm";

import RentDetailsForm from "../screen/RentDetailsForm";
import SellDetailsForm from "../screen/SellDetailsForm";
import AddImages from "../screen/AddImages";
import AddNewPropFinalDetails from "../screen/AddNewPropFinalDetails";
import AddNewPropSellFinalDetails from "../screen/AddNewPropSellFinalDetails";

import AddNewPropCommercialRentFinalDetails from "../screen/AddNewPropCommercialRentFinalDetails";

const Stack = createStackNavigator();
const AddNewPropStackScreens = () => {
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
        name="AddNewProperty"
        component={AddNewProperty}
        options={{ title: "Add New Property" }}
      />
      <Stack.Screen
        name="LocalityDetailsForm"
        component={LocalityDetailsForm}
        options={{ title: "Locality Details" }}
      />

      <Stack.Screen
        name="ResidentialPropertyDetailsForm"
        component={ResidentialPropertyDetailsForm}
        options={{ title: "Property Details" }}
      />

      <Stack.Screen
        name="CommercialPropertyDetailsForm"
        component={CommercialPropertyDetailsForm}
        options={{ title: "Property Details" }}
      />

      <Stack.Screen
        name="RentDetailsForm"
        component={RentDetailsForm}
        options={{ title: "Rent Details" }}
      />

      <Stack.Screen
        name="SellDetailsForm"
        component={SellDetailsForm}
        options={{ title: "Selling Details" }}
      />

      <Stack.Screen
        name="AddImages"
        component={AddImages}
        options={{ title: "Add Images" }}
      />
      <Stack.Screen
        name="AddNewPropFinalDetails"
        component={AddNewPropFinalDetails}
        options={{ title: "Final Details" }}
      />

      <Stack.Screen
        name="AddNewPropSellFinalDetails"
        component={AddNewPropSellFinalDetails}
        options={{ title: "Final Details" }}
      />

      <Stack.Screen
        name="AddNewPropCommercialRentFinalDetails"
        component={AddNewPropCommercialRentFinalDetails}
        options={{ title: "Final Details" }}
      />
    </Stack.Navigator>
  );
};

export default AddNewPropStackScreens;
