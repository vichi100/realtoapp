import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LocalityDetails from "../screen/LocalityDetails";

const Stack = createStackNavigator();

function LocalityDetailsNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LocalityDetails"
        component={LocalityDetails}
        options={{ title: "Locality Details" }}
      />
    </Stack.Navigator>
  );
}

export default LocalityDetailsNav;
