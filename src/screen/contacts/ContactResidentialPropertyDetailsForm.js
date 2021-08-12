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
// ezora
// eza
import { ButtonGroup } from "react-native-elements";
import { TextInput, HelperText, useTheme } from "react-native-paper";
import Button from "../../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Snackbar from "../../components/SnackbarComponent";
import { connect } from "react-redux";
import { setPropertyType, setPropertyDetails, setCustomerDetails } from "../../reducers/Action";




const houseTypeArray = ["Apartment", "Villa", "Independent House"];
const bhkArray = ["1RK", "1BHK", "2BHK", "3BHK", "4+BHK"];
const washroomArray = ["1", "2", "3", "4", "4+"];
const furnishingStatusArray = ["Full", "Semi", "Empty"];
const parkingNumberArray = ["1", "2", "3", "4", "4+"];
const parkingTypeArray = ["Car", "Bike"];
const propertyAgeArray = ["1-5", "6-10", "11-15", "20+"];
const liftArray = ["Yes", "No"];

const ContactResidentialPropertyDetailsForm = props => {
  const { navigation } = props;
  // const [city, setCity] = React.useState("");
  // const [locality, setLocality] = React.useState("");
  // const [index, setIndex] = React.useState(null);
  // const [text, setText] = React.useState("");

  const [houseTypeIndex, setHouseTypeIndex] = useState(-1);
  const [bhkIndex, setBHKIndex] = useState(-1);
  const [furnishingIndex, setFurnishingIndex] = useState(-1);
  const [parkingIndex, setParkingIndex] = useState(-1);
  const [parkingTypeIndex, setParkingTypeIndex] = useState(-1);
  const [propertyAgeIndex, setPropertyAgeIndex] = useState(-1);
  const [liftIndex, setLiftIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dismissSnackBar = () => {
    setIsVisible(false);
  };

  const onSubmit = async () => {
    if (houseTypeIndex === -1) {
      setErrorMessage("House Type is missing");
      setIsVisible(true);
      return;
    } else if (bhkIndex === -1) {
      setErrorMessage("BHK is missing");
      setIsVisible(true);
      return;
    } else if (furnishingIndex === -1) {
      setErrorMessage("Furnishing status is missing");
      setIsVisible(true);
      return;
    } else if (furnishingIndex === -1) {
      setErrorMessage("Parking car/bike is missing");
      setIsVisible(true);
      return;
    } else if (liftIndex === -1) {
      setErrorMessage("Lift is missing");
      setIsVisible(true);
      return;
    }
    // const customer = JSON.parse(await AsyncStorage.getItem("customer"));
    const customer = props.customerDetails
    const propertyFor = customer.customer_locality.property_for;

    const customer_property_details = {
      house_type: houseTypeArray[houseTypeIndex],
      bhk_type: bhkArray[bhkIndex],
      furnishing_status: furnishingStatusArray[furnishingIndex],
      parking_type: parkingTypeArray[parkingTypeIndex],
      property_age: propertyAgeArray[propertyAgeIndex],
      lift: liftArray[liftIndex]
    };

    customer["customer_property_details"] = customer_property_details;
    // // console.log(property);
    // AsyncStorage.setItem("customer", JSON.stringify(customer));
    props.setCustomerDetails(customer);
    // console.log(JSON.stringify(customer));
    if (propertyFor.toLowerCase() === "Rent".toLowerCase()) {
      navigation.navigate("ContactRentDetailsForm");
    } else if (propertyFor.toLowerCase() === "Buy".toLowerCase()) {
      navigation.navigate("ContactBuyResidentialDetailsForm");
    }
  };

  const selectHouseTypeIndex = index => {
    setHouseTypeIndex(index);
    setIsVisible(false);
  };
  const selectBHkIndex = index => {
    setBHKIndex(index);
    setIsVisible(false);
  };

  const selectFurnishingIndex = index => {
    setFurnishingIndex(index);
    setIsVisible(false);
  };

  const selectParkingTypeIndex = index => {
    setParkingTypeIndex(index);
    setIsVisible(false);
  };

  const selectLiftIndex = index => {
    setLiftIndex(index);
    setIsVisible(false);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "rgba(245,245,245, 0.2)" }}
    >
      <KeyboardAwareScrollView onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <View style={{ paddingTop: 30, marginLeft: 20, marginRight: 20 }}>
            <Text style={{ marginBottom: 30 }}>
              Provide property details of which customer is looking for
            </Text>
            <Text>House Type*</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectHouseTypeIndex}
                selectedIndex={houseTypeIndex}
                buttons={houseTypeArray}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 310 }}
                containerBorderRadius={10}
              />
            </View>
            <Text>How many BHK*</Text>
            <View style={[styles.propSubSection, { margin: 10 }]}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectBHkIndex}
                selectedIndex={bhkIndex}
                buttons={bhkArray}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 300 }}
                containerBorderRadius={10}
              />
            </View>

            <Text>Furnishing*</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectFurnishingIndex}
                selectedIndex={furnishingIndex}
                buttons={furnishingStatusArray}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 200 }}
                containerBorderRadius={10}
              />
            </View>

            <Text>Parkings*</Text>
            <View style={styles.doubleColSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectParkingTypeIndex}
                selectedIndex={parkingTypeIndex}
                buttons={parkingTypeArray}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 150 }}
                containerBorderRadius={10}
              />
            </View>

            <Text>Lift Mandatory*</Text>
            <View style={[styles.propSubSection, {}]}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectLiftIndex}
                selectedIndex={liftIndex}
                buttons={liftArray}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 100 }}
                containerBorderRadius={10}
              // theme={{
              //   colors: {
              //     // placeholder: "white",
              //     // text: "white",
              //     primary: "rgba(0,191,255, .9)",
              //     underlineColor: "transparent",
              //     background: "#ffffff"
              //   }
              // }}
              />
            </View>

            <View style={{ marginTop: 15 }}>
              <Button title="NEXT" onPress={() => onSubmit()} />
            </View>
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
    flex: 1
    // paddingTop: 50,
    // marginLeft: 20,
    // marginRight: 20
  },
  inputContainerStyle: {
    margin: 8
  },
  propSubSection: {
    marginTop: 10,
    marginBottom: 15
  },
  doubleColSection: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 15
  }
});

const mapStateToProps = state => ({
  userDetails: state.AppReducer.userDetails,
  propertyDetails: state.AppReducer.propertyDetails,
  customerDetails: state.AppReducer.customerDetails
});
const mapDispatchToProps = {
  setPropertyType,
  setPropertyDetails,
  setCustomerDetails,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactResidentialPropertyDetailsForm);

// export default ContactResidentialPropertyDetailsForm;
