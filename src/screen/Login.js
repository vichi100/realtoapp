// import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import OtpInputs from "./OtpInputs";

const Login = props => {
  const { navigation } = props;
  const [otp, setOTP] = useState("");
  useEffect(() => {
    console.log("Login");
  }, []);

  const getOtp = otp => {
    console.log(otp);
    setOTP(otp);
  };

  const onSkip = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView
      // contentContainerStyle={{
      //   flexGrow: 1,
      //   justifyContent: "center",
      //   alignItems: "center"
      // }}
      >
        <View
          style={{
            flex: 1,
            // width: "100%",
            marginTop: "30%",
            marginLeft: 30,
            marginRight: 30,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            style={{ width: 200, height: 200 }}
            source={require("../../assets/images/logo.png")}
          />
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={{
                borderWidth: 1, // size/width of the border
                borderColor: "lightgrey", // color of the border
                backgroundColor: "lightgrey",
                paddingLeft: 10,
                width: 60,
                height: 45,
                // borderRadius: 5
                color: "#000000",
                fontSize: 16
              }}
              // placeholder="+91"
              value="+91"
            />
            <TextInput
              style={{
                borderWidth: 1, // size/width of the border
                borderColor: "lightgrey", // color of the border
                paddingLeft: 10,
                width: "80%",
                height: 45,
                // borderRadius: 5
                fontSize: 16
              }}
              placeholder="Mobile"
            />
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              width: "100%",
              marginTop: 20
            }}
          >
            <OtpInputs getOtp={otp => getOtp(otp)} />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => onSkip()}>
        <Text
          style={{ position: "absolute", bottom: 20, right: 20, margin: 20 }}
        >
          Skip
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
