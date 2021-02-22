import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Keyboard,
  AsyncStorage
} from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import { ButtonGroup } from "react-native-elements";
import { TextInput, HelperText, useTheme } from "react-native-paper";
import Button from "../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Snackbar from "../components/SnackbarComponent";

const preferredTenantsArray = ["Family", "Bachelors", "Any"];
const nonvegAllowedArray = ["Yes", "No"];

const RentDetailsForm = props => {
  const { navigation } = props;
  const date = new Date();
  const [newDate, setNewDate] = React.useState("");

  const [expectedRent, setExpectedRent] = useState("");
  const [expectedDeposit, setExpectedDeposit] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [preferredTenantsIndex, setPreferredTenantsIndex] = useState(-1);
  const [nonvegAllowedIndex, setNonvegAllowedIndex] = useState(-1);
  const [visible, setVisible] = React.useState(false);

  const dismissSnackBar = () => {
    setIsVisible(false);
  };

  const onDismiss = React.useCallback(() => {
    setVisible(false);
    setIsVisible(false);
  }, [setVisible]);

  const onChange = React.useCallback(({ date }) => {
    setVisible(false);
    setIsVisible(false);
    // const x = date.toString().split("00:00");
    setNewDate(
      date
        .toString()
        .slice(0, 16)
        .trim()
    );
    // setNewDate(date.toString());
    // console.log({ date });
  }, []);

  const selectedPreferredTenantsIndex = index => {
    setPreferredTenantsIndex(index);
    setIsVisible(false);
  };

  const selectNonvegAllowedIndex = index => {
    setNonvegAllowedIndex(index);
    setIsVisible(false);
  };

  const onSubmit = async () => {
    if (expectedRent.trim() === "") {
      setErrorMessage("Expected rent is missing");
      setIsVisible(true);
      return;
    } else if (expectedDeposit.trim() === "") {
      setErrorMessage("Expected deposit is missing");
      setIsVisible(true);
      return;
    } else if (newDate.trim() === "") {
      setErrorMessage("Available date is missing");
      setIsVisible(true);
      return;
    } else if (preferredTenantsIndex === -1) {
      setErrorMessage("Preferred tenants is missing");
      setIsVisible(true);
      return;
    } else if (nonvegAllowedIndex === -1) {
      setErrorMessage("Nonveg allowed is missing");
      setIsVisible(true);
      return;
    }

    const rent_details = {
      expected_rent: expectedRent,
      expected_deposit: expectedDeposit,
      available_from: newDate.trim(),
      preferred_tenants: preferredTenantsArray[preferredTenantsIndex],
      non_veg_allowed: nonvegAllowedArray[nonvegAllowedIndex]
    };
    const property = JSON.parse(await AsyncStorage.getItem("property"));
    property["rent_details"] = rent_details;
    // console.log(property);
    AsyncStorage.setItem("property", JSON.stringify(property));

    navigation.navigate("AddImages");
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <KeyboardAwareScrollView onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.container}>
            <TextInput
              mode="outlined"
              keyboardType={"numeric"}
              returnKeyType={"done"}
              style={styles.inputContainerStyle}
              label="Expected Rent*"
              placeholder="Expected Rent"
              value={expectedRent}
              keyboardType={"numeric"}
              onChangeText={text => setExpectedRent(text)}
              onFocus={() => setIsVisible(false)}
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
              mode="outlined"
              style={styles.inputContainerStyle}
              keyboardType={"numeric"}
              returnKeyType={"done"}
              label="Expected Deposit*"
              placeholder="Expected Deposit"
              value={expectedDeposit}
              keyboardType={"numeric"}
              onChangeText={text => setExpectedDeposit(text)}
              onFocus={() => setIsVisible(false)}
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
              mode="outlined"
              style={styles.inputContainerStyle}
              label="Available From *"
              placeholder="Available From *"
              value={newDate}
              // onChangeText={newDate => setNewDate(newDate)}
              onFocus={() => setVisible(true)}
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
            <Text>Preferred Tenants*</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectedPreferredTenantsIndex}
                selectedIndex={preferredTenantsIndex}
                buttons={preferredTenantsArray}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 300 }}
                containerBorderRadius={10}
              />
            </View>
            <Text>Nonveg Allowed*</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectNonvegAllowedIndex}
                selectedIndex={nonvegAllowedIndex}
                buttons={nonvegAllowedArray}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 300 }}
                containerBorderRadius={10}
              />
            </View>

            <Button title="NEXT" onPress={() => onSubmit()} />
          </View>
        </ScrollView>
        <DatePickerModal
          mode="single"
          visible={visible}
          onDismiss={onDismiss}
          date={date}
          onConfirm={onChange}
          saveLabel="Ok" // optional
          label="Select date" // optional
          animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
          locale={"en"} // optional, default is automically detected by your system
        />
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
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  inputContainerStyle: {
    marginBottom: 20
  },
  propSubSection: {
    marginTop: 10,
    marginBottom: 15
  },
  doubleColSection: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5
  }
});

export default RentDetailsForm;
