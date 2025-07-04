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
import { ButtonGroup } from "@rneui/themed";
import { TextInput, HelperText, useTheme } from "react-native-paper";
import Button from "../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Snackbar from "../components/SnackbarComponent";
import { setPropertyDetails } from "../reducers/Action";
import { connect } from "react-redux";
import CustomButtonGroup from "../components/CustomButtonGroup";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


// const houseTypeArray = ["Apartment", "Villa", "Independent House"];
// const bhkArray = ["1RK", "1BHK", "2BHK", "3BHK", "4+BHK"];
// const washroomArray = ["1", "2", "3", "4", "4+"];
// const furnishingStatusArray = ["Full", "Semi", "Empty"];
// const parkingNumberArray = ["1", "2", "3", "4", "4+"];
// const parkingTypeArray = ["Car", "Bike"];
// const propertyAgeArray = ["1-5", "6-10", "11-15", "20+"];
// const liftArray = ["Yes", "No"];

const houseTypeOption = [
  { text: 'Apartment' },
  { text: 'Villa' },
  { text: 'Independent House' },
];

const bhkOption = [
  { text: '1RK' },
  { text: '1BHK' },
  { text: '2BHK' },
  { text: '3BHK' },
  { text: '4+BHK' },
];

const washroomOption = [
  { text: '1' },
  { text: '2' },
  { text: '3' },
  { text: '4' },
  { text: '4+' },
];

const furnishingStatusOption = [
  { text: 'Full' },
  { text: 'Semi' },
  { text: 'Empty' },
];

const parkingNumberOption = [
  { text: '1' },
  { text: '2' },
  { text: '3' },
  { text: '4' },
  { text: '4+' },
];

const parkingTypeOption = [
  { text: 'Car' },
  { text: 'Bike' },
];

const propertyAgeOption = [
  { text: '1-5' },
  { text: '6-10' },
  { text: '11-15' },
  { text: '20+' },
];

const liftAvailbleOption = [
  { text: 'Yes' },
  { text: 'No' },
];


const ResidentialPropertyDetailsForm = props => {
  const { navigation } = props;
  // const [city, setCity] = React.useState("");
  // const [locality, setLocality] = React.useState("");
  // const [index, setIndex] = React.useState(null);
  // const [text, setText] = React.useState("");

  // const [houseTypeIndex, setHouseTypeIndex] = useState(-1);
  // const [bhkIndex, setBHKIndex] = useState(-1);
  // const [washroomIndex, setWashroomIndex] = useState(-1);
  // const [furnishingIndex, setFurnishingIndex] = useState(-1);
  // const [parkingIndex, setParkingIndex] = useState(-1);
  // const [parkingTypeIndex, setParkingTypeIndex] = useState(-1);
  // const [propertyAgeIndex, setPropertyAgeIndex] = useState(-1);
  const [floor, setFloor] = useState("");
  const [totalFloor, setTotalFloor] = useState("");
  // const [liftIndex, setLiftIndex] = useState(-1);
  const [propertySize, setPropertySize] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const [houseType, setHouseType] = useState("Apartment");
  const [bhkType, setBHKType] = useState("2BHK");
  const [washroomNumber, setWashroomNumber] = useState("2");
  const [furnishingStatus, setFurnishingStatus] = useState("Semi");
  const [parkingNumber, setParkingNumber] = useState("1");
  const [parkingType, setParkingType] = useState("Car");
  const [propertyAge, setPropertyAge] = useState("6-10");
  const [liftOption, setLiftOption] = useState("Yes");
  
  






  const dismissSnackBar = () => {
    setIsVisible(false);
  };

  const onSubmit = async () => {
    // if (houseTypeIndex === -1) {
    //   setErrorMessage("House Type is missing");
    //   setIsVisible(true);
    //   return;
    // } else if (bhkIndex === -1) {
    //   setErrorMessage("BHK is missing");
    //   setIsVisible(true);
    //   return;
    // } else if (washroomIndex === -1) {
    //   setErrorMessage("Wash rooms number is missing");
    //   setIsVisible(true);
    //   return;
    // } else if (furnishingIndex === -1) {
    //   setErrorMessage("Furnishing status is missing");
    //   setIsVisible(true);
    //   return;
    // } else if (parkingIndex === -1) {
    //   setErrorMessage("Parking is missing");
    //   setIsVisible(true);
    //   return;
    // } else if (furnishingIndex === -1) {
    //   setErrorMessage("Parking car/bike is missing");
    //   setIsVisible(true);
    //   return;
    // } else if (propertyAgeIndex === -1) {
    //   setErrorMessage("Property age is missing");
    //   setIsVisible(true);
    //   return;
    // } else 
    
    if (floor.trim() === "") {
      setErrorMessage("Floor is missing");
      setIsVisible(true);
      return;
    } else if (totalFloor.trim() === "") {
      setErrorMessage("Total floors is missing");
      setIsVisible(true);
      return;
    } 
    // else if (liftIndex === -1) {
    //   setErrorMessage("Lift is missing");
    //   setIsVisible(true);
    //   return;
    // } else 
    
    if (propertySize.trim() === "") {
      setErrorMessage("Property size is missing");
      setIsVisible(true);
      return;
    }
    // const property = JSON.parse(await AsyncStorage.getItem("property"));
    const property = props.propertyDetails;
    const propertyFor = property.property_for;

    const property_details = {
      house_type: houseType,
      bhk_type: bhkType,
      washroom_numbers: washroomNumber,
      furnishing_status: furnishingStatus,
      parking_type: parkingType,
      parking_number: parkingNumber,
      property_age: propertyAge,
      floor_number: floor,
      total_floor: totalFloor,
      lift: liftOption,
      property_size: propertySize
    };

    property["property_details"] = property_details;
    // // console.log(property);
    // AsyncStorage.setItem("property", JSON.stringify(property));
    props.setPropertyDetails(property);
    // console.log(JSON.stringify(property));
    if (propertyFor.toLowerCase() === "Rent".toLowerCase()) {
      navigation.navigate("RentDetailsForm");
    } else if (propertyFor.toLowerCase() === "Sell".toLowerCase()) {
      navigation.navigate("SellDetailsForm");
    }
  };

  // const selectHouseTypeIndex = index => {
  //   setHouseTypeIndex(index);
  //   setIsVisible(false);
  // };
  // const selectBHkIndex = index => {
  //   setBHKIndex(index);
  //   setIsVisible(false);
  // };
  // const selectWashroomIndex = index => {
  //   setWashroomIndex(index);
  //   setIsVisible(false);
  // };
  // const selectFurnishingIndex = index => {
  //   setFurnishingIndex(index);
  //   setIsVisible(false);
  // };
  // const selectParkingIndex = index => {
  //   setParkingIndex(index);
  //   setIsVisible(false);
  // };
  // const selectParkingTypeIndex = index => {
  //   setParkingTypeIndex(index);
  //   setIsVisible(false);
  // };
  // const selectPropertyAgeIndex = index => {
  //   setPropertyAgeIndex(index);
  //   setIsVisible(false);
  // };
  // const selectLiftIndex = index => {
  //   setLiftIndex(index);
  //   setIsVisible(false);
  // };

  return (
    <View
      style={{ flex: 1, backgroundColor: "rgba(245,245,245, 0.2)" }}
    >
      <KeyboardAwareScrollView onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <View style={{ paddingTop: 30, padding: 10 }}>
            <Text>House Type*</Text>
            <View style={styles.propSubSection}>

              <CustomButtonGroup
                buttons={houseTypeOption}
                accessibilityLabelId="house_type"
                selectedIndices={[houseTypeOption.findIndex(option => option.text === houseType)]}
                isMultiSelect={false}
                buttonStyle={{ backgroundColor: '#fff' }}
                selectedButtonStyle={{ backgroundColor: 'rgba(0, 163, 108, .2)' }}
                buttonTextStyle={{ color: '#000' }}
                selectedButtonTextStyle={{ color: '#000' }}
                onButtonPress={(index, button) => {
                  console.log(`Button pressed: ${button.text} (Index: ${index})`);
                  setHouseType(button.text);
                  // Query update is handled by useEffect after state change
                }}
              />


              {/* <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectHouseTypeIndex}
                selectedIndex={houseTypeIndex}
                buttons={houseTypeArray}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 310 }}
                containerBorderRadius={10}
              /> */}
            </View>
            <Text>How many BHK*</Text>
            <View style={styles.propSubSection}>

              <CustomButtonGroup
                buttons={bhkOption}
                accessibilityLabelId="bhk_type"
                selectedIndices={[bhkOption.findIndex(option => option.text === bhkType)]}
                isMultiSelect={false}
                buttonStyle={{ backgroundColor: '#fff' }}
                selectedButtonStyle={{ backgroundColor: 'rgba(0, 163, 108, .2)' }}
                buttonTextStyle={{ color: '#000' }}
                selectedButtonTextStyle={{ color: '#000' }}
                onButtonPress={(index, button) => {
                  console.log(`Button pressed: ${button.text} (Index: ${index})`);
                  setBHKType(button.text);
                  // Query update is handled by useEffect after state change
                }}
              />

              {/* <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectBHkIndex}
                selectedIndex={bhkIndex}
                buttons={bhkArray}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 300 }}
                containerBorderRadius={10}
              /> */}
            </View>

            <Text>How many wash rooms*</Text>
            <View style={styles.propSubSection}>

              <CustomButtonGroup
                buttons={washroomOption}
                accessibilityLabelId="washroom_number"
                selectedIndices={[washroomOption.findIndex(option => option.text === washroomNumber)]}
                isMultiSelect={false}
                buttonStyle={{ backgroundColor: '#fff' }}
                selectedButtonStyle={{ backgroundColor: 'rgba(0, 163, 108, .2)' }}
                buttonTextStyle={{ color: '#000' }}
                selectedButtonTextStyle={{ color: '#000' }}
                onButtonPress={(index, button) => {
                  console.log(`Button pressed: ${button.text} (Index: ${index})`);
                  setWashroomNumber(button.text);
                  // Query update is handled by useEffect after state change
                }}
              />

              {/* <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectWashroomIndex}
                selectedIndex={washroomIndex}
                buttons={washroomArray}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 200 }}
                containerBorderRadius={10}
              /> */}
            </View>
            <Text>Furnishing*</Text>
            <View style={styles.propSubSection}>

              <CustomButtonGroup
                buttons={furnishingStatusOption}
                accessibilityLabelId="furnishing_status"
                selectedIndices={[furnishingStatusOption.findIndex(option => option.text === furnishingStatus)]}
                isMultiSelect={false}
                buttonStyle={{ backgroundColor: '#fff' }}
                selectedButtonStyle={{ backgroundColor: 'rgba(0, 163, 108, .2)' }}
                buttonTextStyle={{ color: '#000' }}
                selectedButtonTextStyle={{ color: '#000' }}
                onButtonPress={(index, button) => {
                  console.log(`Button pressed: ${button.text} (Index: ${index})`);
                  setFurnishingStatus(button.text);
                  // Query update is handled by useEffect after state change
                }}
              />

              {/* <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectFurnishingIndex}
                selectedIndex={furnishingIndex}
                buttons={furnishingStatusArray}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 200 }}
                containerBorderRadius={10}
              /> */}
            </View>

            <Text>Parkings*</Text>
            <View style={styles.propSubSection}>
              <CustomButtonGroup
                buttons={parkingNumberOption}
                accessibilityLabelId="parking_number"
                selectedIndices={[parkingNumberOption.findIndex(option => option.text === parkingNumber)]}
                isMultiSelect={false}
                buttonStyle={{ backgroundColor: '#fff' }}
                selectedButtonStyle={{ backgroundColor: 'rgba(0, 163, 108, .2)' }}
                buttonTextStyle={{ color: '#000' }}
                selectedButtonTextStyle={{ color: '#000' }}
                onButtonPress={(index, button) => {
                  console.log(`Button pressed: ${button.text} (Index: ${index})`);
                  setParkingNumber(button.text);
                  // Query update is handled by useEffect after state change
                }}
              />

              {/* <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectParkingIndex}
                selectedIndex={parkingIndex}
                buttons={parkingNumberArray}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 5, width: 150 }}
                containerBorderRadius={5}
              /> */}

              <View style={{marginLeft: 20, marginTop:15, flexDirection: 'row', alignItems: 'center'}}>
                <View>
                
                <MaterialIcons name="directions-car" color={"#000"} size={26} />

                <MaterialIcons name="directions-bike" color={"#000"} size={26} />
                </View>
              <CustomButtonGroup
                buttons={parkingTypeOption}
                accessibilityLabelId="parking_type"
                selectedIndices={[parkingTypeOption.findIndex(option => option.text === parkingType)]}
                isMultiSelect={false}
                buttonStyle={{ backgroundColor: '#fff' }}
                selectedButtonStyle={{ backgroundColor: 'rgba(0, 163, 108, .2)' }}
                buttonTextStyle={{ color: '#000' }}
                selectedButtonTextStyle={{ color: '#000' }}
                onButtonPress={(index, button) => {
                  console.log(`Button pressed: ${button.text} (Index: ${index})`);
                  setParkingType(button.text);
                  // Query update is handled by useEffect after state change
                }}
              />
              </View>

              {/* <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectParkingTypeIndex}
                selectedIndex={parkingTypeIndex}
                buttons={parkingTypeArray}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 150 }}
                containerBorderRadius={10}
              /> */}
            </View>
            <Text>Property Age*</Text>
            <View style={styles.propSubSection}>
            <CustomButtonGroup
                buttons={propertyAgeOption}
                accessibilityLabelId="property_age"
                selectedIndices={[propertyAgeOption.findIndex(option => option.text === propertyAge)]}
                isMultiSelect={false}
                buttonStyle={{ backgroundColor: '#fff' }}
                selectedButtonStyle={{ backgroundColor: 'rgba(0, 163, 108, .2)' }}
                buttonTextStyle={{ color: '#000' }}
                selectedButtonTextStyle={{ color: '#000' }}
                onButtonPress={(index, button) => {
                  console.log(`Button pressed: ${button.text} (Index: ${index})`);
                  setPropertyAge(button.text);
                  // Query update is handled by useEffect after state change
                }}
              />
              {/* <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectPropertyAgeIndex}
                selectedIndex={propertyAgeIndex}
                buttons={propertyAgeArray}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 300 }}
                containerBorderRadius={10}
              /> */}
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
                  { width: "20%", backgroundColor: "rgba(245,245,245, 0.2)" }
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
                  { width: "30%", backgroundColor: "rgba(245,245,245, 0.2)" }
                ]}
                keyboardType={"numeric"}
                returnKeyType={"done"}
                label="Total Floor*"
                placeholder="Total Floor"
                value={totalFloor}
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

              <View style={[styles.propSubSection, { marginLeft: 10 }]}>
                <Text style={{marginBottom:10}}>Lift*</Text>
                <CustomButtonGroup
                buttons={liftAvailbleOption}
                accessibilityLabelId="lift_available"
                selectedIndices={[liftAvailbleOption.findIndex(option => option.text === liftOption)]}
                isMultiSelect={false}
                buttonStyle={{ backgroundColor: '#fff' }}
                selectedButtonStyle={{ backgroundColor: 'rgba(0, 163, 108, .2)' }}
                buttonTextStyle={{ color: '#000' }}
                selectedButtonTextStyle={{ color: '#000' }}
                onButtonPress={(index, button) => {
                  console.log(`Button pressed: ${button.text} (Index: ${index})`);
                  setLiftOption(button.text);
                  // Query update is handled by useEffect after state change
                }}
                width={50}
                height={40}
              />
                {/* <ButtonGroup
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
                /> */}
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
              onChangeText={text => setPropertySize(text)}
              onFocus={() => setIsVisible(false)}
              theme={{
                colors: {
                  // placeholder: "white",
                  // text: "white",
                  primary: "rgba(0,191,255, .9)",
                  underlineColor: "transparent",
                  backgroundColor: "rgba(245,245,245, 0.2)"
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
    </View>
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
)(ResidentialPropertyDetailsForm);

// export default ResidentialPropertyDetailsForm;
