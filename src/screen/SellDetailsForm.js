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
import { numDifferentiation } from "../util/methods";
import { connect } from "react-redux";
import { setPropertyDetails } from "../reducers/Action";

const negotiableArray = ["Yes", "No"];

const SellDetails = props => {
  const { navigation } = props;
  const date = new Date();
  const [newDate, setNewDate] = React.useState("");

  const [expectedSellPrice, setExpectedSellPrice] = useState("");
  const [maintenanceCharge, setMaintenanceCharge] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [negotiableIndex, setNegotiableIndex] = useState(-1);
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
    const x = date.toString().split("00:00");
    setNewDate(x[0].toString().trim());
    // setNewDate(date.toString());
    // // console.log({ date });
  }, []);

  const selectNegotiableIndex = index => {
    setNegotiableIndex(index);
    setIsVisible(false);
  };

  const onSubmit = async () => {
    if (expectedSellPrice.trim() === "") {
      setErrorMessage("Expected sell price is missing");
      setIsVisible(true);
      return;
    } else if (maintenanceCharge.trim() === "") {
      setErrorMessage("Maintenance charge is missing");
      setIsVisible(true);
      return;
    } else if (newDate.trim() === "") {
      setErrorMessage("Available from date is missing");
      setIsVisible(true);
      return;
    } else if (negotiableIndex === -1) {
      setErrorMessage("Negotiable is missing");
      setIsVisible(true);
      return;
    }

    const sell_details = {
      expected_sell_price: expectedSellPrice,
      maintenance_charge: maintenanceCharge,
      available_from: newDate.trim(),
      negotiable: negotiableArray[negotiableIndex]
    };
    // const property = JSON.parse(await AsyncStorage.getItem("property"));
    const property = props.propertyDetails;
    property["sell_details"] = sell_details;
    // // console.log(property);
    // AsyncStorage.setItem("property", JSON.stringify(property));
    props.setPropertyDetails(property)

    navigation.navigate("AddImages");
  };

  // const numDifferentiation = value => {
  //   var val = Math.abs(value);
  //   if (val >= 10000000) {
  //     val = parseFloat((val / 10000000).toFixed(2)) + " Cr";
  //   } else if (val >= 100000) {
  //     val = parseFloat((val / 100000).toFixed(2)) + " Lac";
  //   } else if (val >= 1000) {
  //     val = parseFloat((val / 1000).toFixed(2)) + " K";
  //   }
  //   return val;
  // };

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
              label={
                expectedSellPrice.trim() === ""
                  ? "Expected Sell Price*"
                  : numDifferentiation(expectedSellPrice) +
                  " Expected Sell Price"
              }
              placeholder="Expected Sell Price*"
              value={expectedSellPrice}
              keyboardType={"numeric"}
              onChangeText={text => setExpectedSellPrice(text)}
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
              label={
                maintenanceCharge.trim() === ""
                  ? "Maintenance Charge/Month*"
                  : numDifferentiation(maintenanceCharge) +
                  " Maintenance Charge/Month"
              }
              placeholder="Maintenance Charge"
              value={maintenanceCharge}
              keyboardType={"numeric"}
              onChangeText={text => setMaintenanceCharge(text)}
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

            <Text>Negotiable*</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectNegotiableIndex}
                selectedIndex={negotiableIndex}
                buttons={negotiableArray}
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

const mapStateToProps = state => ({
  userDetails: state.AppReducer.userDetails,
  propertyType: state.AppReducer.propertyType,
  propertyDetails: state.AppReducer.propertyDetails,
});
const mapDispatchToProps = {
  setPropertyDetails
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellDetails);

// export default SellDetails;
