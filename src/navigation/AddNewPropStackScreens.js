import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import AddNewProperty from "../screen/AddNewProperty";
import LocalityDetails from "../screen/LocalityDetails";
import PropertyDetails from "../screen/PropertyDetails";
import RentDetails from "../screen/RentDetails";
import AddImages from "../screen/AddImages";
import AddNewPropFinalDetails from "../screen/AddNewPropFinalDetails";

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
        name="LocalityDetails"
        component={LocalityDetails}
        options={{ title: "Locality Details" }}
      />

      <Stack.Screen
        name="PropertyDetails"
        component={PropertyDetails}
        options={{ title: "Property Details" }}
      />

      <Stack.Screen
        name="RentDetails"
        component={RentDetails}
        options={{ title: "Rent Details" }}
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
    </Stack.Navigator>
  );
};

export default AddNewPropStackScreens;
