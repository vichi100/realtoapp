import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GlobalSearch from "../screen/global/GlobalSearch";
import GlobalResidentialPropertySearchResult from "../screen/global/GlobalResidentialPropertySearchResult";
import GlobalCommercialPropertySearchResult from "../screen/global/GlobalCommercialPropertySearchResult";
import GlobalResidentialContactsSearchResult from "../screen/global/GlobalResidentialContactsSearchResult";
import GlobalCommercialCustomersSearchResult from "../screen/global/GlobalCommercialCustomersSearchResult";

const Stack = createStackNavigator();

const GlobalSearchStackNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
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
        name="GlobalSearch"
        component={GlobalSearch}
        options={{ tabBarLabel: "Home!", tabBarVisible: false }}
      />
      <Stack.Screen
        name="GlobalResidentialPropertySearchResult"
        component={GlobalResidentialPropertySearchResult}
        options={{ tabBarLabel: "Home!", tabBarVisible: false }}
      />
      <Stack.Screen
        name="GlobalCommercialPropertySearchResult"
        component={GlobalCommercialPropertySearchResult}
        options={{ tabBarLabel: "Home!", tabBarVisible: false }}
      />
      <Stack.Screen
        name="GlobalResidentialContactsSearchResult"
        component={GlobalResidentialContactsSearchResult}
        options={{ tabBarLabel: "Home!", tabBarVisible: false }}
      />
      <Stack.Screen
        name="GlobalCommercialCustomersSearchResult"
        component={GlobalCommercialCustomersSearchResult}
        options={{ tabBarLabel: "Home!", tabBarVisible: false }}
      />
    </Stack.Navigator>
  );
};

export default GlobalSearchStackNav;
