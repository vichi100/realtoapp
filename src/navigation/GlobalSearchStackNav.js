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
        options={{ title: "Global Search" , tabBarLabel: "Home!", tabBarVisible: false, headerShown: false }}
      />
      <Stack.Screen
        name="GlobalResidentialPropertySearchResult"
        component={GlobalResidentialPropertySearchResult}
        options={{ title: "Results" , tabBarLabel: "Home!", tabBarVisible: false, headerShown: true }}
      />
      <Stack.Screen
        name="GlobalCommercialPropertySearchResult"
        component={GlobalCommercialPropertySearchResult}
        options={{ tabBarLabel: "Home!", tabBarVisible: false, headerShown: true }}
      />
      <Stack.Screen
        name="GlobalResidentialContactsSearchResult"
        component={GlobalResidentialContactsSearchResult}
        options={{ title: "Results" , tabBarLabel: "Home!", tabBarVisible: false, headerShown: true }}
      />
      <Stack.Screen
        name="GlobalCommercialCustomersSearchResult"
        component={GlobalCommercialCustomersSearchResult}
        options={{ title: "Results" , tabBarLabel: "Home!", tabBarVisible: false, headerShown: true }}
      />
      {/* <Stack.Screen
        name="PropDetailsFromListing"
        component={PropDetailsFromListing}
        navigationOptions={{ tabBarVisible: false }}
        options={{
          title: "Property details",
          headerShown: true
        }}
      /> */}
      <Stack.Screen
              name="CustomerMeetingDetails"
              component={CustomerMeetingDetails}
              options={{ title: "Meeting Details" ,  headerShown: true}}
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
                          options={{ title: "Matched Properties" }}
                        />
    </Stack.Navigator>
  );
};

export default GlobalSearchStackNav;
