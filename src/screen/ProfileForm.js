import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage
} from "react-native";
import { TextInput, HelperText, useTheme } from "react-native-paper";
import Button from "../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Snackbar from "../components/SnackbarComponent";
import { setUserDetails } from "../reducers/Action";
import { connect } from "react-redux";

import axios from "axios";

const ProfileForm = props => {
  const { navigation } = props;

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const dismissSnackBar = () => {
    setIsVisible(false);
  };

  const onSubmit = () => {
    if (name.trim() === "") {
      setErrorMessage("Name is missing");
      setIsVisible(true);
      return;
    } else if (city.trim() === "") {
      setErrorMessage("City is missing");
      setIsVisible(true);
      return;
    }
    // console.log("0");
    const profileDetails = {
      user_id: props.userDetails.user_details.id,
      name: name.trim(),
      company: company.trim(),
      city: city.trim(),
      email: email.trim()
    };
    // console.log(property);

    updateUserProfile(profileDetails);
  };
  const updateUserProfile = profileDetails => {
    axios("http://192.168.1.103:3000/updateUserProfile", {
      method: "post",
      headers: {
        "Content-type": "Application/json",
        Accept: "Application/json"
      },
      data: profileDetails
    }).then(
      response => {
        if (response.data === "success") {
          // AsyncStorage.setItem("property", JSON.stringify(property));
          console.log("1: " + JSON.stringify(props.userDetails.user_details));
          props.userDetails.user_details["name"] = profileDetails.name;
          props.userDetails.user_details["city"] = profileDetails.city;
          props.userDetails.user_details["company_name"] =
            profileDetails.company;
          props.userDetails.user_details["email"] = profileDetails.email;
          props.setUserDetails({ ...props.userDetails });

          updateAsyncStorageData(profileDetails);
          navigation.navigate("Profile");
        }
      },
      error => {
        console.log(error);
      }
    );
  };

  const updateAsyncStorageData = async profileDetails => {
    const userDetailsDataX = await AsyncStorage.getItem("user_details");
    console.log("userDetailsDataX: " + userDetailsDataX);
    const userDetailsData = JSON.parse(userDetailsDataX);
    userDetailsData["name"] = profileDetails.name;
    userDetailsData["city"] = profileDetails.city;
    userDetailsData["company_name"] = profileDetails.company;
    userDetailsData["email"] = profileDetails.email;
    AsyncStorage.setItem("user_details", JSON.stringify(userDetailsData));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <KeyboardAwareScrollView onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          {/* <View style={[styles.header, { marginTop: 30 }]}>
            <Text>Update Details</Text>
          </View> */}
          <View style={styles.propSection}>
            <TextInput
              label="Name*"
              value={name}
              // returnKeyType={"done"}
              onChangeText={text => setName(text)}
              onFocus={() => setIsVisible(false)}
              style={{ backgroundColor: "#ffffff" }}
              theme={{
                colors: {
                  // placeholder: "white",
                  // text: "white",
                  primary: "rgba(0,191,255, .9)",
                  underlineColor: "transparent",
                  background: "#ffffff"
                }
              }}
            />
            <TextInput
              label="City*"
              value={city}
              // returnKeyType={"done"}
              onChangeText={text => setCity(text)}
              onFocus={() => setIsVisible(false)}
              style={{ backgroundColor: "#ffffff", marginTop: 8 }}
              theme={{
                colors: {
                  // placeholder: "white",
                  // text: "white",
                  primary: "rgba(0,191,255, .9)",
                  underlineColor: "transparent",
                  background: "#ffffff"
                }
              }}
            />
            <TextInput
              label="Company"
              value={company}
              // returnKeyType={"done"}
              onChangeText={text => setCompany(text)}
              onFocus={() => setIsVisible(false)}
              style={{ backgroundColor: "#ffffff", marginTop: 8 }}
              theme={{
                colors: {
                  // placeholder: "white",
                  // text: "white",
                  primary: "rgba(0,191,255, .9)",
                  underlineColor: "transparent",
                  background: "#ffffff"
                }
              }}
            />
            <TextInput
              label="Email"
              value={email}
              // returnKeyType={"done"}
              onChangeText={text => setEmail(text)}
              onFocus={() => setIsVisible(false)}
              style={{ backgroundColor: "#ffffff", marginTop: 8 }}
              theme={{
                colors: {
                  // placeholder: "white",
                  // text: "white",
                  primary: "rgba(0,191,255, .9)",
                  underlineColor: "transparent",
                  background: "#ffffff"
                }
              }}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Button title="DONE" onPress={() => onSubmit()} />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <Snackbar
        visible={isVisible}
        textMessage={errorMessage}
        position={"top"}
        actionHandler={() => dismissSnackBar()}
        actionText="OK"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20
  },
  header: {
    alignContent: "flex-start"
  },
  propSection: {
    marginTop: 20
  },
  propSubSection: {
    // marginTop: 50,
    marginBottom: 10,
    marginLeft: 10
  },
  inputContainerStyle: {
    margin: 8,
    backgroundColor: "#ffffff"
    // borderColor: "black",
    // borderWidth: 1
  }
  // propSubSection: {
  //   marginTop: 5,
  //   marginBottom: 5
  // },
});

const mapStateToProps = state => ({
  userDetails: state.AppReducer.userDetails
});
const mapDispatchToProps = {
  setUserDetails
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm);

// export default ProfileForm;
