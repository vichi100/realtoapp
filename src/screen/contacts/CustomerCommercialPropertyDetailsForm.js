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
  AsyncStorage,
  FlatList
} from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
// ezora
// eza
import { ButtonGroup, CheckBox } from "react-native-elements";
import { TextInput, HelperText, useTheme } from "react-native-paper";
import Button from "../../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Snackbar from "../../components/SnackbarComponent";

const propertyTypeArray = [
  "Shop",
  "Office",
  "Showroom",
  "Godown",
  "Restaurant / Cafe",
  "Pub / Night Club"
];
const buildingTypeArray = [
  "Businesses park ",
  "Mall",
  "StandAlone",
  "Industrial",
  "Shopping complex"
];
const idealForArrayDict = [
  { name: "Shop", checked: false },
  { name: "Bank", checked: false },
  { name: "ATM", checked: false },
  { name: "Restaurant/Cafe", checked: false },
  { name: "Pub/Night Club", checked: false },
  { name: "Office", checked: false },
  { name: "Showroom", checked: false },
  { name: "Godown", checked: false }
];

const parkingTypeArray = ["Must", "Doesn't matter"];
const propertyAgeArray = ["1-5", "6-10", "11-15", "20+"];
const powerBackupkArray = ["Yes", "No"];

const CustomerCommercialPropertyDetailsForm = props => {
  const { navigation } = props;

  const [propertyTypeIndex, setHouseTypeIndex] = useState(-1);
  const [buildingIndex, setBuildingIndex] = useState(-1);
  const [parkingTypeIndex, setParkingTypeIndex] = useState(-1);
  const [propertyAgeIndex, setPropertyAgeIndex] = useState(-1);
  const [powerBackupIndex, setPowerBackupIndex] = useState(-1);
  const [propertySize, setPropertySize] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [idealForSelectArray, setIdealForSelectArray] = useState([]);
  const [idealForArray, setIdealForArray] = useState(idealForArrayDict);

  const dismissSnackBar = () => {
    setIsVisible(false);
  };

  const onSubmit = async () => {
    if (propertyTypeIndex === -1) {
      setErrorMessage("Property type is missing");
      setIsVisible(true);
      return;
    } else if (buildingIndex === -1) {
      setErrorMessage("Building type is missing");
      setIsVisible(true);
      return;
    } else if (parkingTypeIndex === -1) {
      setErrorMessage("Parking is missing");
      setIsVisible(true);
      return;
    }
    const customer = JSON.parse(await AsyncStorage.getItem("customer"));
    const propertyFor = customer.customer_locality.property_for;

    const customer_property_details = {
      property_used_for: propertyTypeArray[propertyTypeIndex],
      building_type: buildingTypeArray[buildingIndex],
      // ideal_for: idealForSelectArray,
      parking_type: parkingTypeArray[parkingTypeIndex]
      // property_age: propertyAgeArray[propertyAgeIndex],
      // power_backup: powerBackupkArray[powerBackupIndex],
      // property_size: propertySize
    };

    customer["customer_property_details"] = customer_property_details;
    // console.log(property);
    AsyncStorage.setItem("customer", JSON.stringify(customer));
    // console.log(property);
    if (propertyFor.toLowerCase() === "Rent".toLowerCase()) {
      navigation.navigate("CustomerCommercialRentDetailsForm");
    } else if (propertyFor.toLowerCase() === "Buy".toLowerCase()) {
      navigation.navigate("CustomerCommercialBuyDetailsForm");
    }
  };

  const selectPropertyTypeIndex = index => {
    setHouseTypeIndex(index);
    setIsVisible(false);
  };
  const selectBuildingIndex = index => {
    setBuildingIndex(index);
    setIsVisible(false);
  };

  const selectParkingTypeIndex = index => {
    setParkingTypeIndex(index);
    setIsVisible(false);
  };
  const selectPropertyAgeIndex = index => {
    setPropertyAgeIndex(index);
    setIsVisible(false);
  };
  const selectPowerBackupIndex = index => {
    setPowerBackupIndex(index);
    setIsVisible(false);
  };

  const onIdealForSelect = index => {
    // console.log(index);
    const temp = [...idealForArray];
    // console.log(temp[index]);
    const tempChecked = temp[index].checked;
    temp[index].checked = !tempChecked;
    // console.log(temp);
    setIdealForArray(temp);
    if (!tempChecked === true) {
      idealForSelectArray.push(temp[index].name);
    } else {
      var filteredAry = ary.filter(e => e !== temp[index].name);
      setIdealForSelectArray(filteredAry);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <KeyboardAwareScrollView onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <View style={{ paddingTop: 30, marginLeft: 20, marginRight: 20 }}>
            <Text>Property Type*</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectPropertyTypeIndex}
                selectedIndex={propertyTypeIndex}
                buttons={propertyTypeArray}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{
                  width: 360
                }}
                // containerBorderRadius={10}
                buttonStyle={{ height: 30 }}
                vertical={true}
              />
            </View>
            <Text>Building type*</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectBuildingIndex}
                selectedIndex={buildingIndex}
                buttons={buildingTypeArray}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ width: 350 }}
                // buttonContainerStyle={{ flex: 1, flexWrap: "wrap", flexDirection:"" }}
                containerBorderRadius={10}
                vertical={true}
              />
            </View>

            <Text>Parkings</Text>
            <View style={styles.doubleColSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectParkingTypeIndex}
                selectedIndex={parkingTypeIndex}
                buttons={parkingTypeArray}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 300 }}
                containerBorderRadius={10}
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

export default CustomerCommercialPropertyDetailsForm;
