import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
  SafeAreaView
} from 'react-native-safe-area-context';
// https://stackoverflow.com/questions/71199630/react-native-tab-navigator-empty-space-at-bottom-of-tab-bar
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import Login from "../screen/login/Login";
import OtpScreen from "../screen/login/OtpScreen";
import BottomTabScreen from "./BottomTabScreen";
import ProfileForm from "../screen/ProfileForm";
import { DefaultTheme, Provider } from 'react-native-paper';

{/* <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 20 : 0 }} /> */ }

export default function MainScreen() {
  const RootStack = createStackNavigator();
  // const theme = {
  //   ...DefaultTheme,
  //   colors: {
  //     ...DefaultTheme.colors,
  //     secondaryContainer: 'transparent', // Use transparent to disable the little highlighting oval
  //   },
  //   SafeAreaView:{
  //     styleflex:0
  //   }
  // };

  return (
    // <SafeAreaProvider>
    //   <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>

        <SafeAreaView 
            style={{ flex: 1, backgroundColor:"#ffffff" }} 
            // edges={["right", "top", "left"]}
            forceInset={{ top: "always", bottom: "never" }}
        > 
        <NavigationContainer>
          <RootStack.Navigator
            screenOptions={{
              headerShown: false,
              headerBackTitleVisible: false,
              headerTitleAlign: "center",
              headerTintColor: "#fff",
              headerStyle: {
                backgroundColor: "#ffffff"
              },
              // headerBackTitleVisible: true,
              headerTintColor: "rgba(105,105,105, .9)",
              gestureEnabled: false
            }}
          >
            <RootStack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
                headerBackTitleVisible: false
              }}
            />
            <RootStack.Screen
              name="BottomTabScreen"
              component={BottomTabScreen}
              options={{
                headerShown: false,
                headerBackTitleVisible: false
              }}
            />

            <RootStack.Screen
              name="OtpScreen"
              component={OtpScreen}
              options={{
                headerTitle: "OTP Screen",
                headerShown: true,
                // tabBarLabel: "Home!",
                // tabBarVisible: false,
                // headerTintColor: "rgba(0,0,0, .9)",
                headerBackTitleVisible: false
              }}
            />
            <RootStack.Screen
              name="ProfileForm"
              component={ProfileForm}
              options={{
                headerTitle: "Profile Form",
                headerShown: true,
                // tabBarLabel: "Home!",
                // tabBarVisible: false,
                // headerTintColor: "rgba(0,0,0, .9)",
                headerBackTitleVisible: false
              }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    // </SafeAreaProvider>
    // </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
