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
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import OtpInputs from "./OtpInputs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Left } from "native-base";
import { setAgentMobile } from "../reducers/Action";
import { connect } from "react-redux";

const Login = props => {
  const { navigation } = props;
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    console.log("Login");
    // const userDetails = getUserDetails().then(console.log(userDetails));
    console.log("userDetails: " + JSON.stringify(userDetails));
    if (userDetails !== null) {
      if (userDetails.user_type === "agent") {
        const agentDetailsObj = {
          agent_id: String,
          expo_token: String,
          agent_name: String,
          company_name: String,
          agent_mobile: String,
          agent_address: String,
          agent_city: String
        };
      } else if (userDetails.user_type === "employee") {
      }

      navigation.navigate("BottomTabScreen");
    } else {
      getUserDetails();
    }
  }, [userDetails]);

  const getUserDetails = async () => {
    // AsyncStorage.setItem("agent_details", JSON.stringify(agentDetails));

    // AsyncStorage.clear();

    const userDetailsStr = await AsyncStorage.getItem("user_details");
    // console.log(userDetailsStr);
    if (userDetailsStr !== null) {
      setUserDetails(JSON.parse(userDetailsStr));
    }
  };

  const getOtp = otp => {
    console.log(otp);
    setOTP(otp);
  };

  const onSkip = () => {
    navigation.navigate("BottomTabScreen");
  };

  const onNext = () => {
    console.log(mobileNumber);
    props.setAgentMobile(mobileNumber);
    navigation.navigate("OtpScreen");
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
              onChangeText={text => setMobileNumber(text)}
              placeholder="Mobile"
            />
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginTop: 20
            }}
          >
            <TouchableOpacity
              onPress={() => onNext()}
              style={{
                padding: 5,
                // width: 200,
                justifyContent: "flex-end",
                flexDirection: "row",
                // backgroundColor: "rgba(60,179,113, .9)",
                left: 0
              }}
            >
              {/* <Text style={{ padding: 5, textAlign: "center" }}>NEXT</Text> */}
              <Ionicons
                name="caret-forward-circle"
                color={"#000000"}
                size={50}
                color={"rgba(60,179,113, .9)"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          margin: 20
          // backgroundColor: "rgba(60,179,113, .9)"
        }}
        onPress={() => onSkip()}
      >
        <Text
        // style={{ position: "absolute", bottom: 20, right: 20, margin: 20 }}
        >
          Skip
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  agentMobileNumber: state.AppReducer.agentMobileNumber
});
const mapDispatchToProps = {
  setAgentMobile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

// export default Login;
