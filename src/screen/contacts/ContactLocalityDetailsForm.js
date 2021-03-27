import React, { useState, useEffect } from "react";
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
import { TextInput, HelperText, useTheme } from "react-native-paper";
import Button from "../../components/Button";
import RadioButton from "../../components/RadioButtons";
import { ButtonGroup } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Snackbar from "../../components/SnackbarComponent";

const options = [
  {
    key: "Residential",
    text: "Residential"
  },
  {
    key: "Commercial",
    text: "Commercial"
  }
];

const propertyForArray = ["Rent", "Buy"];

const ContactLocalityDetailsForm = props => {
  const { navigation } = props;
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [propertyForIndex, setPropertyForIndex] = useState(-1);
  const [selectedPropType, setSelectedPropType] = useState(null);

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

  useEffect(() => {
    console.log("useEffect");
    // const property = await AsyncStorage.getItem("property");
    // console.log(property);
  }, []);

  const onSubmit = async () => {
    if (city.trim() === "") {
      setErrorMessage("City is missing");
      setIsVisible(true);
      return;
    } else if (area.trim() === "") {
      setErrorMessage("Area is missing");
      setIsVisible(true);
      return;
    } else if (selectedPropType === null) {
      setErrorMessage("Select Property type missing");
      setIsVisible(true);
      return;
    } else if (propertyForIndex === -1) {
      setErrorMessage("Select Property for missing");
      setIsVisible(true);
      return;
    }

    const customer = JSON.parse(await AsyncStorage.getItem("customer"));
    // const propertyType = property.property_type;
    // console.log(property);

    const customer_locality = {
      city: city.trim(),
      location_area: area.trim(),
      property_type: selectedPropType.key,
      property_for: propertyForArray[propertyForIndex],
      pin: "123"
    };

    customer["customer_locality"] = customer_locality;
    // console.log(property_address);
    const propertyType = selectedPropType.key;
    AsyncStorage.setItem("customer", JSON.stringify(customer));
    console.log(JSON.stringify(customer));
    if (propertyType.toLowerCase() === "Residential".toLowerCase()) {
      navigation.navigate("ContactResidentialPropertyDetailsForm");
    } else {
      navigation.navigate("CustomerCommercialPropertyDetailsForm");
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "rgba(245,245,245, 0.2)" }}
    >
      <KeyboardAwareScrollView onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
        <Text>Enter city and locations where customer wants the property</Text> 
          <TextInput
            label="City*"
            placeholder="Enter city where customer wants property"
            value={city}
            onChangeText={text => setCity(text)}
            onFocus={() => setIsVisible(false)}
            style={{ backgroundColor: "rgba(245,245,245, 0.1)", marginTop: 0 }}
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
            label="Area / Location*"
            placeholder="Add locations where customer wants property"
            value={area}
            onChangeText={text => setArea(text)}
            onFocus={() => setIsVisible(false)}
            style={{ backgroundColor: "rgba(245,245,245, 0.1)", marginTop: 8 }}
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

          <View style={styles.header}>
            <Text>Select Property Type</Text>
          </View>
          <View style={styles.propSection}>
            <RadioButton
              selectedOption={selectedPropType}
              onSelect={onSelectPropType}
              options={options}
            />
          </View>
          <View style={{ alignContent: "flex-start" }}>
            <Text>Select Property For</Text>
          </View>
          <View
            style={[styles.propSubSection, { marginBottom: 10, marginTop: 15 }]}
          >
            {/* <Text>Select Property For</Text> */}
            <ButtonGroup
              selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
              onPress={selectPropertyForIndex}
              selectedIndex={propertyForIndex}
              buttons={propertyForArray}
              // containerStyle={{ height: 30 }}
              textStyle={{ textAlign: "center" }}
              selectedTextStyle={{ color: "#fff" }}
              containerStyle={{
                borderRadius: 10,
                width: 300
                // borderColor: "red"
              }}
              containerBorderRadius={10}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <Button title="NEXT" onPress={() => onSubmit()} />
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
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  header: {
    alignContent: "flex-start",
    marginTop: 30
  },
  propSection: {
    marginTop: 20
  },
  propSubSection: {
    // marginTop: 50,
    marginBottom: 10,
    marginLeft: 10
  }
});

export default ContactLocalityDetailsForm;
