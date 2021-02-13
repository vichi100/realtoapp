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
  Keyboard
} from "react-native";
// ezora
// eza
import { ButtonGroup } from "react-native-elements";
import { TextInput, HelperText, useTheme } from "react-native-paper";
import Button from "../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Snackbar from "../components/SnackbarComponent";

const PropertyDetails = props => {
  const { navigation } = props;
  // const [city, setCity] = React.useState("");
  // const [locality, setLocality] = React.useState("");
  // const [index, setIndex] = React.useState(null);
  // const [text, setText] = React.useState("");

  const [houseTypeIndex, setHouseTypeIndex] = useState(-1);
  const [bhkIndex, setBHKIndex] = useState(-1);
  const [washroomIndex, setWashroomIndex] = useState(-1);
  const [furnishingIndex, setFurnishingIndex] = useState(-1);
  const [parkingIndex, setParkingIndex] = useState(-1);
  const [parkingTypeIndex, setParkingTypeIndex] = useState(-1);
  const [propertyAgeIndex, setPropertyAgeIndex] = useState(-1);
  const [floor, setFloor] = useState("");
  const [totalFloor, setTotalFloor] = useState("");
  const [liftIndex, setLiftIndex] = useState(-1);
  const [propertySize, setPropertySize] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dismissSnackBar = () => {
    setIsVisible(false);
  };

  const onSubmit = () => {
    if (houseTypeIndex === -1) {
      setErrorMessage("House Type is missing");
      setIsVisible(true);
      return;
    } else if (bhkIndex === -1) {
      setErrorMessage("BHK is missing");
      setIsVisible(true);
      return;
    } else if (washroomIndex === -1) {
      setErrorMessage("Wash rooms number is missing");
      setIsVisible(true);
      return;
    } else if (furnishingIndex === -1) {
      setErrorMessage("Furnishing status is missing");
      setIsVisible(true);
      return;
    } else if (parkingIndex === -1) {
      setErrorMessage("Parking is missing");
      setIsVisible(true);
      return;
    } else if (furnishingIndex === -1) {
      setErrorMessage("Parking car/bike is missing");
      setIsVisible(true);
      return;
    } else if (propertyAgeIndex === -1) {
      setErrorMessage("Property age is missing");
      setIsVisible(true);
      return;
    } else if (floor.trim() === "") {
      setErrorMessage("Floor is missing");
      setIsVisible(true);
      return;
    } else if (totalFloor.trim() === "") {
      setErrorMessage("Total floors is missing");
      setIsVisible(true);
      return;
    } else if (liftIndex === -1) {
      setErrorMessage("Lift is missing");
      setIsVisible(true);
      return;
    } else if (propertySize.trim() === "") {
      setErrorMessage("Property size is missing");
      setIsVisible(true);
      return;
    }

    navigation.navigate("RentDetails");
  };

  const selectHouseTypeIndex = index => {
    setHouseTypeIndex(index);
    setIsVisible(false);
  };
  const selectBHkIndex = index => {
    setBHKIndex(index);
    setIsVisible(false);
  };
  const selectWashroomIndex = index => {
    setWashroomIndex(index);
    setIsVisible(false);
  };
  const selectFurnishingIndex = index => {
    setFurnishingIndex(index);
    setIsVisible(false);
  };
  const selectParkingIndex = index => {
    setParkingIndex(index);
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
  const selectLiftIndex = index => {
    setLiftIndex(index);
    setIsVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <KeyboardAwareScrollView onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <View style={{ paddingTop: 30, marginLeft: 20, marginRight: 20 }}>
            <Text>House Type*</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectHouseTypeIndex}
                selectedIndex={houseTypeIndex}
                buttons={["Appartment", "Villa", "Independent House"]}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 350 }}
                containerBorderRadius={10}
              />
            </View>
            <Text>How many BHK*</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectBHkIndex}
                selectedIndex={bhkIndex}
                buttons={["1RK", "1BHK", "2BHK", "3BHK", "4BHK", "4+BHK"]}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 350 }}
                containerBorderRadius={10}
              />
            </View>

            <Text>How many wash rooms*</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectWashroomIndex}
                selectedIndex={washroomIndex}
                buttons={["1", "2", "3", "4"]}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 200 }}
                containerBorderRadius={10}
              />
            </View>
            <Text>Furnishing*</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectFurnishingIndex}
                selectedIndex={furnishingIndex}
                buttons={["Full", "Semi", "Empty"]}
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
                onPress={selectParkingIndex}
                selectedIndex={parkingIndex}
                buttons={["1", "2", "3", "4", "4+"]}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 5, width: 150 }}
                containerBorderRadius={5}
              />
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectParkingTypeIndex}
                selectedIndex={parkingTypeIndex}
                buttons={["Car", "Bike"]}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 150 }}
                containerBorderRadius={10}
              />
            </View>
            <Text>Property Age*</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectPropertyAgeIndex}
                selectedIndex={propertyAgeIndex}
                buttons={["1-5", "6-10", "11-15", "20+"]}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 300 }}
                containerBorderRadius={10}
              />
            </View>

            <View
              style={[
                styles.doubleColSection,
                { marginBottom: 5, marginTop: 5 }
              ]}
            >
              <TextInput
                mode="outlined"
                style={[
                  styles.inputContainerStyle,
                  { width: "20%", backgroundColor: "#ffffff" }
                ]}
                label="Floor*"
                placeholder="Floor"
                value={floor}
                keyboardType={"numeric"}
                returnKeyType={"done"}
                onChangeText={text => setFloor(text)}
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
                style={[
                  styles.inputContainerStyle,
                  { width: "30%", backgroundColor: "#ffffff" }
                ]}
                keyboardType={"numeric"}
                returnKeyType={"done"}
                label="Total Floor*"
                placeholder="Total Floor"
                value={totalFloor}
                keyboardType={"numeric"}
                onChangeText={text => setTotalFloor(text)}
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

              <View style={[styles.propSubSection, { marginLeft: 15 }]}>
                <Text>Lift*</Text>
                <ButtonGroup
                  selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                  onPress={selectLiftIndex}
                  selectedIndex={liftIndex}
                  buttons={["Yes", "No"]}
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

export default PropertyDetails;
