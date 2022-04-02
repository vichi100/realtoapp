import * as React from "react";
import { Text, View, SafeAreaView, TextInput, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ListingResidential from "../screen/ListingResidential";
import ListingCommercial from "../screen/ListingCommercial";

const Tab = createMaterialTopTabNavigator();

const ListingTopTab = () => {
  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      {/* <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => searchFilterFunction(text)}
          value={"search"}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
      </View> */}
      <Tab.Navigator
        activeColor="rgb(135,206,235)"
        inactiveColor="rgb(105,105,105)"
        tabBarOptions={{
          // showIcon: true,
          showLabel: true,
          style: {
            // backgroundColor: "rgba(105,105,105, 0.1)",
            // flex: 1,
            flexDirection: "column"
          }
        }}
      // style={{
      //   backgroundColor: "#000000",
      //   height: 165,
      //   borderBottomColor: "#D3D3D3"
      // }}
      >
        <Tab.Screen
          name="Residential"
          component={ListingResidential}
          // color={"rgba(50, 195, 77, 0.59)"}
          options={{
            tabBarLabel: () => (
              <View
                style={{
                  flexDirection: "row"
                  // backgroundColor: "rgba(50, 195, 77, 0.59)"
                }}
              >
                <Ionicons name="home-outline" color="#616161" size={24} />
                <Text
                  style={{
                    marginLeft: 5,
                    paddingTop: 5,
                    fontSize: 12,
                    color: "#616161"
                  }}
                >
                  RESIDENTIAL PROPERTY
                </Text>
              </View>
            )
            // tabBarIcon: ({ color }) => (
            //   <Ionicons name="notifications-outline" color={color} size={20} />
            // )
          }}
        />
        <Tab.Screen
          name="Commercial"
          component={ListingCommercial}
          options={{
            tabBarLabel: () => (
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="city-variant-outline"
                  color="#616161"
                  size={24}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    paddingTop: 5,
                    fontSize: 12,
                    color: "#616161"
                  }}
                >
                  COMMERCIAL PROPERTY
                </Text>
              </View>
            )
            // tabBarIcon: ({ color }) => (
            //   <Ionicons name="notifications-outline" color={color} size={20} />
            // )
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5
    // alignContent: "center"
  },
  fab: {
    flexDirection: "row",
    position: "absolute",
    width: 130,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    right: "33%",
    // left: 0,
    bottom: 10,
    backgroundColor: "rgba(128,128,128, 0.8)",
    borderRadius: 30,
    elevation: 8
  },
  verticalLine: {
    height: "100%",
    width: 2,
    backgroundColor: "#ffffff"
  },
  fabIcon1: {
    paddingRight: 20
  },
  fabIcon2: {
    paddingLeft: 20
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: "70%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  sortingBottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: "45%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  propSubSection: {
    marginBottom: 20
  },
  title: {
    fontSize: 16,
    fontWeight: "600"
  },
  bottomNavigationViewHeader: {
    position: "absolute",
    width: 130,
    // height: 35,
    alignItems: "center",
    justifyContent: "center",
    right: "33%",
    // left: 0,
    top: 10,
    marginBottom: 30
  },
  horizontal: {
    borderBottomColor: "black",
    borderBottomWidth: 5,
    marginLeft: 5,
    marginRight: 5
  },
  textInputStyle: {
    width: "98%",
    height: 40,
    // borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    // marginBottom: 5,
    borderRadius: 10,
    // borderColor: "#009688",
    backgroundColor: "#FFFFFF"
  },
  marginBottom10: {
    marginBottom: 10
  }
});

export default ListingTopTab;
