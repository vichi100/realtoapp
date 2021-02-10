import React, { Component, useState } from "react";
import {
  AppRegistry,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const DRAWER_WIDTH = 300;

const App = props => {
  const [disabled, setDisabled] = useState(false);
  let animatedValue = new Animated.Value(0);
  let toggleFlag = 0;

  const toggleDrawer = () => {
    if (toggleFlag == 0) {
      setDisabled(true),
        () => {
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 250
          }).start(() => {
            setDisabled(false);
            toggleFlag = 1;
          });
        };
    } else {
      setDisabled(true),
        () => {
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 250
          }).start(() => {
            setDisabled(false);
            toggleFlag = 0;
          });
        };
    }
  };

  animatedValue = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [DRAWER_WIDTH - 46, 0]
  });

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Animated Sliding Drawer Tutorial.</Text>
      <Animated.View
        style={[styles.drawer, { transform: [{ translateX: animatedValue }] }]}
      >
        <TouchableOpacity
          disabled={disabled}
          onPress={toggleDrawer}
          style={{ padding: 8 }}
        >
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
    alignItems: "center"
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
    width: DRAWER_WIDTH,
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
