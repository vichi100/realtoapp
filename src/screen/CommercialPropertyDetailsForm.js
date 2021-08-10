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
import Button from "../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Snackbar from "../components/SnackbarComponent";
import { setPropertyDetails } from "../reducers/Action";
import { connect } from "react-redux";

const propertyTypeArray = [
  "Shop",
  "Office",
  "Showroom",
  "Godown",
  "Restaurant/Cafe",
  "Pub/Night Club"
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

const parkingTypeArray = ["Public", "Private", "Both"];
const propertyAgeArray = ["1-5", "6-10", "11-15", "20+"];
const powerBackupkArray = ["Yes", "No"];

const PropertyDetails = props => {
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
    } else if (idealForSelectArray.length === 0) {
      setErrorMessage("Ideal for is missing");
      setIsVisible(true);
      return;
    } else if (parkingTypeIndex === -1) {
      setErrorMessage("Parking is missing");
      setIsVisible(true);
      return;
    } else if (propertyAgeIndex === -1) {
      setErrorMessage("Property age is missing");
      setIsVisible(true);
      return;
    } else if (powerBackupIndex === -1) {
      setErrorMessage("Power backup is missing");
      setIsVisible(true);
      return;
    } else if (propertySize.trim() === "") {
      setErrorMessage("Property size is missing");
      setIsVisible(true);
      return;
    }
    // const property = JSON.parse(await AsyncStorage.getItem("property"));
    const property = props.propertyDetails;
    const propertyFor = property.property_for;

    const property_details = {
      property_used_for: propertyTypeArray[propertyTypeIndex],
      building_type: buildingTypeArray[buildingIndex],
      ideal_for: idealForSelectArray,
      parking_type: parkingTypeArray[parkingTypeIndex],
      property_age: propertyAgeArray[propertyAgeIndex],
      power_backup: powerBackupkArray[powerBackupIndex],
      property_size: propertySize
    };

    property["property_details"] = property_details;
    // // console.log(property);
    // AsyncStorage.setItem("property", JSON.stringify(property));
    props.setPropertyDetails(property);
    // // console.log(property);
    if (propertyFor.toLowerCase() === "Rent".toLowerCase()) {
      navigation.navigate("RentDetailsForm");
    } else if (propertyFor.toLowerCase() === "Sell".toLowerCase()) {
      navigation.navigate("SellDetailsForm");
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
    // // console.log(index);
    const temp = [...idealForArray];
    // // console.log(temp[index]);
    const tempChecked = temp[index].checked;
    temp[index].checked = !tempChecked;
    // // console.log(temp);
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

            <Text>Ideal for*</Text>
            <View style={styles.propSubSection}>
              <FlatList
                data={idealForArray}
                renderItem={({ item, index }) => (
                  <View style={{ flex: 1, flexDirection: "column", margin: 1 }}>
                    {/* <Text>{item}</Text> */}
                    <CheckBox
                      title={item.name}
                      checked={item.checked}
                      onPress={() => onIdealForSelect(index)}
                      containerStyle={{
                        backgroundColor: "#ffffff",
                        borderColor: "#ffffff",
                        margin: 0
                      }}
                      textStyle={{
                        fontSize: 12,
                        fontWeight: "400"
                      }}
                    />
                  </View>
                )}
                //Setting the number of column
                numColumns={2}
                keyExtractor={(item, index) => index}
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
                containerStyle={{ borderRadius: 10, width: 250 }}
                containerBorderRadius={10}
              />
            </View>
            <Text>Property Age*</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectPropertyAgeIndex}
                selectedIndex={propertyAgeIndex}
                buttons={propertyAgeArray}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 300 }}
                containerBorderRadius={10}
              />
            </View>
            <Text>Power backup*</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectPowerBackupIndex}
                selectedIndex={powerBackupIndex}
                buttons={powerBackupkArray}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 300 }}
                containerBorderRadius={10}
              />
            </View>
            <TextInput
              mode="outlined"
              style={styles.inputContainerStyle}
              label="Property Size*"
              keyboardType={"numeric"}
              returnKeyType={"done"}
              placeholder="Property Size"
              value={propertySize}
              keyboardType={"numeric"}
              onChangeText={text => setPropertySize(text)}
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
  propertyDetails: state.AppReducer.propertyDetails,
  userDetails: state.AppReducer.userDetails
});
const mapDispatchToProps = {
  setPropertyDetails
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyDetails);

// export default PropertyDetails;
