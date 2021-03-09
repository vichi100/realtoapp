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

const OtpScreen = props => {
  const { navigation } = props;
  const [otp, setOTP] = useState("");

  const getOtp = otp => {
    console.log(otp);
    setOTP(otp);
  };
  const onSubmit = () => {
    const agentObj = {
      user_mobile: props.agentMobileNumber
    };
    axios
      .post(
        "http://192.168.1.103:3000/checkLoginRole",
        // SERVER_URL + "/addNewResidentialRentProperty",
        // await AsyncStorage.getItem("property")
        // JSON.stringify({ vichi: "vchi" })
        agentObj
      )
      .then(
        response => {
          console.log(response.data);
          // check response data here is 3 possibilty
          // 1) a first time install app n logging as agent.
          // 2) a first time install app n logging as employee.
          // 3) already have installed app n logged in as agent but now recommanded as employee
          // 4)

          save(response.data.agent_id).then(() => {
            navigation.navigate("BottomTabScreen");
          });
        },
        error => {
          console.log(error);
        }
      );
  };

  const save = async agentId => {
    const agentDetails = {
      agent_id: agentId,
      expo_token: null,
      agent_name: null,
      company_name: null,
      agent_mobile: props.agentMobileNumber,
      agent_address: null,
      agent_city: null
    };
    AsyncStorage.setItem("user_details", JSON.stringify(agentDetails));
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
  agentMobileNumber: state.AppReducer.agentMobileNumber
});
// const mapDispatchToProps = {
//   setAgentMobile
// };

export default connect(
  mapStateToProps,
  null
)(OtpScreen);
// export default OtpScreen;
