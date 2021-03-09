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
import RadioButton from "../components/RadioButtons";
import { ButtonGroup } from "react-native-elements";
import Button from "../components/Button";
import { Formik } from "formik";
import * as yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Snackbar from "../components/SnackbarComponent";

const ProfileForm = props => {
  const { navigation } = props;
  const [propertyForIndex, setPropertyForIndex] = useState(-1);
  const [selectedPropType, setSelectedPropType] = useState(null);
  const [ownerName, setOwnerName] = useState("");
  const [ownerMobile, setOwnerMobile] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const onSelectPropType = item => {
    // console.log(item);
    if (selectedPropType && selectedPropType.key === item.key) {
      setSelectedPropType(null);
    } else {
      setSelectedPropType(item);
    }
    setIsVisible(false);
  };

  const selectPropertyForIndex = index => {
    // console.log(index);
    // console.log(propertyForArray[index]);
    setPropertyForIndex(index);
    setIsVisible(false);
  };

  const dismissSnackBar = () => {
    setIsVisible(false);
  };

  const onSubmit = () => {
    console.log("-1");
    if (ownerName.trim() === "") {
      setErrorMessage("Owner name is missing");
      setIsVisible(true);
      return;
    } else if (ownerMobile.trim() === "") {
      setErrorMessage("Owner mobile is missing");
      setIsVisible(true);
      return;
    }
    // console.log("0");
    const profileDetails = {
      name: ownerName.trim(),
      mobile: ownerMobile.trim(),
      city: ownerMobile.trim(),
      email: ownerAddress.trim()
    };
    // console.log(property);
    AsyncStorage.setItem("property", JSON.stringify(property));
    // console.log("1");
    navigation.navigate("LocalityDetailsForm");
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
              value={ownerName}
              // returnKeyType={"done"}
              onChangeText={text => setOwnerName(text)}
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
              value={ownerAddress}
              // returnKeyType={"done"}
              onChangeText={text => setOwnerAddress(text)}
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
              value={ownerAddress}
              // returnKeyType={"done"}
              onChangeText={text => setOwnerAddress(text)}
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
              value={ownerAddress}
              // returnKeyType={"done"}
              onChangeText={text => setOwnerAddress(text)}
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

export default ProfileForm;
