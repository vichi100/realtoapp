import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Animated
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Sliding_Drawer_Width = 300;

const App = () => {
  let Animation = new Animated.Value(0);

  let Sliding_Drawer_Toggle = true;

  const ShowSlidingDrawer = () => {
    if (Sliding_Drawer_Toggle === true) {
      Animated.timing(Animation, {
        toValue: 1,
        duration: 500
      }).start(() => {
        Sliding_Drawer_Toggle = false;
      });
    } else {
      Animated.timing(Animation, {
        toValue: 0,
        duration: 500
      }).start(() => {
        Sliding_Drawer_Toggle = true;
      });
    }
  };

  const Animation_Interpolate = Animation.interpolate({
    inputRange: [0, 1],
    outputRange: [Sliding_Drawer_Width - 90, 0]
  });

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Animated Sliding Drawer Tutorial.</Text>
      <Animated.View
        style={[
          styles.drawer,
          { transform: [{ translateX: Animation_Interpolate }] }
        ]}
      >
        <TouchableOpacity onPress={ShowSlidingDrawer} style={{ padding: 8 }}>
          <MaterialCommunityIcons
            name="chevron-left"
            color={"#000000"}
            size={30}
          />
        </TouchableOpacity>
        <View style={styles.drawerContainer}>
          <Text style={styles.menuLayout}>Buy Now</Text>
          <Text style={styles.menuLayout}>Offer Zone</Text>
          <Text style={styles.menuLayout}>Qualty Product</Text>
          <Text style={styles.menuLayout}>50% Off</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40
  },
  headerText: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    color: "black",
    fontWeight: "bold"
  },
  drawer: {
    position: "absolute",
    top: Platform.OS == "ios" ? 20 : 0,
    right: 0,
    bottom: 0,
    width: Sliding_Drawer_Width,
    flexDirection: "row"
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: "#f53b3b",
    alignItems: "center"
  },
  menuLayout: {
    marginBottom: 1,
    backgroundColor: "#4CAF50",
    width: "100%",
    fontSize: 25,
    color: "white",
    padding: 10
  }
});

export default App;
