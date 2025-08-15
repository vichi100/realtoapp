import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GlobalSearch from "../screen/global/GlobalSearch";
import GlobalResidentialPropertySearchResult from "../screen/global/GlobalResidentialPropertySearchResult";
import GlobalCommercialPropertySearchResult from "../screen/global/GlobalCommercialPropertySearchResult";
import GlobalResidentialContactsSearchResult from "../screen/global/GlobalResidentialContactsSearchResult";
import GlobalCommercialCustomersSearchResult from "../screen/global/GlobalCommercialCustomersSearchResult";
import PropDetailsFromListing from "../screen/PropDetailsFromListing";
import PropDetailsFromListingForSell from "../screen/PropDetailsFromListingForSell";
import CustomerMeetingDetails from "../screen/contacts/CustomerMeetingDetails";
import MatchedCustomers from "../screen/contacts/MatchedCustomers";
import MatchedProperties from "../screen/MatchedProperties";
import CustomerDetailsResidentialRentFromList from "../screen/contacts/CustomerDetailsResidentialRentFromList";
import CustomerDetailsResidentialBuyFromList from "../screen/contacts/CustomerDetailsResidentialBuyFromList";

const Stack = createStackNavigator();

const GlobalSearchStackNav = () => {
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
        name="GlobalSearch"
        component={GlobalSearch}
        options={{ title: "Global Search", tabBarLabel: "Home!", tabBarVisible: false, headerShown: false , headerBackTitle: "Back"}}
      />
      <Stack.Screen
        name="GlobalResidentialPropertySearchResult"
        component={GlobalResidentialPropertySearchResult}
        options={{ title: "Results", tabBarLabel: "Home!", tabBarVisible: false, headerShown: true }}
      />
      <Stack.Screen
        name="GlobalCommercialPropertySearchResult"
        component={GlobalCommercialPropertySearchResult}
        options={{ tabBarLabel: "Home!", tabBarVisible: false, headerShown: true }}
      />
      <Stack.Screen
        name="GlobalResidentialContactsSearchResult"
        component={GlobalResidentialContactsSearchResult}
        options={{ title: "Results", tabBarLabel: "Home!", tabBarVisible: false, headerShown: true }}
      />
      <Stack.Screen
        name="GlobalCommercialCustomersSearchResult"
        component={GlobalCommercialCustomersSearchResult}
        options={{ title: "Results", tabBarLabel: "Home!", tabBarVisible: false, headerShown: true }}
      />
      {/* <Stack.Screen
        name="PropDetailsFromListing"
        component={PropDetailsFromListing}
        navigationOptions={{ tabBarVisible: false }}
        options={{
          title: "Property Details",
          headerShown: true
        }}
      /> */}
      <Stack.Screen
        name="CustomerMeetingDetails"
        component={CustomerMeetingDetails}
        options={{ title: "Meeting Details", headerShown: true , headerBackTitle: "Back"}}
      />

      <Stack.Screen
        name="MatchedCustomers"
        component={MatchedCustomers}
        options={{
          title: "Matched Customers",
          tabBarStyle: {
            display: "none",
          },
          tabBarButton: () => null,
        }}

      />
      <Stack.Screen
        name="MatchedProperties"
        component={MatchedProperties}
        options={{ title: "Matched Properties" , headerBackTitle: "Back"}}
      />

      <Stack.Screen
        name="CustomerDetailsResidentialRentFromList"
        component={CustomerDetailsResidentialRentFromList}
        options={{ title: "Customer Details" , headerBackTitle: "Back"}}
      />
      <Stack.Screen
        name="CustomerDetailsResidentialBuyFromList"
        component={CustomerDetailsResidentialBuyFromList}
        options={{ title: "Customer Details" , headerBackTitle: "Back"}}
      />
      <Stack.Screen
        name="PropDetailsFromListing"
        component={PropDetailsFromListing}
        navigationOptions={{ tabBarVisible: false }}
        options={{
          title: "Property Details", headerBackTitle: "Back"
        }}
      />

      <Stack.Screen
        name="PropDetailsFromListingForSell"
        component={PropDetailsFromListingForSell}
        navigationOptions={{ tabBarVisible: false }}
        options={{
          title: "Property Details", headerBackTitle: "Back"
        }}
      />

    </Stack.Navigator>
  );
};

export default GlobalSearchStackNav;
