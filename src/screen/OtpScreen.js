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
import { connect } from "react-redux";
import OtpInputs from "./OtpInputs";
import Counter from "./Counter";
import Button from "../components/Button";
import axios from "axios";
import { setUserDetails } from "../reducers/Action";
import {SERVER_URL} from "../util/constant";

const OtpScreen = props => {
  const { navigation } = props;
  const [otp, setOTP] = useState("");

  const getOtp = otp => {
    // console.log(otp);
    setOTP(otp);
  };
  const onSubmit = () => {
    // console.log("onSubmit");
    const userObj = {
      user_mobile: props.userMobileNumber
    };
    axios
      .post(
        SERVER_URL+"/checkLoginRole",
        // SERVER_URL + "/addNewResidentialRentProperty",
        // await AsyncStorage.getItem("property")
        // JSON.stringify({ vichi: "vchi" })
        userObj
      )
      .then(
        response => {
          // console.log(response.data);
          // check response data here is 3 possibilty
          // 1) a first time install app n logging as agent.
          // 2) a first time install app n logging as employee.
          // 3) already have installed app n logged in as agent but now recommanded as employee
          // 4)

          save(response.data).then(() => {
            navigation.navigate("BottomTabScreen");
          });
        },
        error => {
          // console.log(error);
        }
      );
  };

  const save = async userData => {
    // console.log("userData: " + JSON.stringify(userData));
    // const userDetails = {
    //   user_id: userData.user_details.id,
    //   user_type: userData.user_details.user_type, // agent, employee
    //   expo_token: userData.user_details.expo_token,
    //   user_name: userData.user_details.user_name,
    //   company_name: userData.user_details.company_name,
    //   user_mobile: props.userMobileNumber.user_mobile,
    //   user_city: userData.user_details.user_city,
    //   works_for: userData.user_details.works_for // agent_id
    // };
    AsyncStorage.setItem("user_details", JSON.stringify(userData));
    props.setUserDetails(userData);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            width: "100%",
            marginTop: 40
          }}
        >
          <OtpInputs mobile={""} getOtp={otp => getOtp(otp)} />
        </View>

        <View style={{ margin: 20 }}>
          {/* <Text>Resend OTP in </Text> */}
          <Counter />
          {/* <Text>s</Text> */}
          <Button title="NEXT" onPress={() => onSubmit()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  userMobileNumber: state.AppReducer.userMobileNumber
});
const mapDispatchToProps = {
  setUserDetails
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OtpScreen);
// export default OtpScreen;
