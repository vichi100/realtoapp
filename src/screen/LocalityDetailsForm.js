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
import Button from "../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Snackbar from "../components/SnackbarComponent";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SERVER_URL, GOOGLE_PLACES_API_KEY } from "../util/constant";
import { connect } from "react-redux";
import { setPropertyType, setPropertyDetails } from "../reducers/Action";


const LocalityDetailsForm = props => {
  const { navigation } = props;
  const [city, setCity] = useState("");
  const [gLocation, setGLocation] = useState(null);
  const [flatNumber, setFlatNumber] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [landmark, setLandmark] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dismissSnackBar = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    // console.log("useEffect");
    // const property = await AsyncStorage.getItem("property");
    // // console.log(property);
  }, []);

  const onSubmit = async () => {
    if (city.trim() === "") {
      setErrorMessage("City is missing");
      setIsVisible(true);
      return;
    } else if (gLocation === null) {
      setErrorMessage("Area is missing");
      setIsVisible(true);
      return;
    } else if (flatNumber.trim() === "") {
      setErrorMessage("Flat Number is missing");
      setIsVisible(true);
      return;
    } else if (buildingName.trim() === "") {
      setErrorMessage("Building name is missing");
      setIsVisible(true);
      return;
    } else if (landmark.trim() === "") {
      setErrorMessage("Street/Landmark is missing");
      setIsVisible(true);
      return;
    }
    // const property = JSON.parse(await AsyncStorage.getItem("property"));
    const property = props.propertyDetails
    const propertyType = property.property_type;
    console.log("gLocation: ", gLocation);

    const property_address = {
      city: city.trim(),
      location_area: gLocation,
      flat_number: flatNumber.trim(),
      building_name: buildingName.trim(),
      landmark_or_street: landmark.trim(),
      pin: "123"
    };

    property["property_address"] = property_address;
    // // console.log(property_address);
    // AsyncStorage.setItem("property", JSON.stringify(property));
    props.setPropertyDetails(property);
    // console.log(JSON.stringify(property));
    if (propertyType.toLowerCase() === "Residential".toLowerCase()) {
      navigation.navigate("ResidentialPropertyDetailsForm");
    } else {
      navigation.navigate("CommercialPropertyDetailsForm");
    }
  };

  const onSelectPlace = (data, details) => {
    console.log("details: ", JSON.stringify(details.geometry.location))
    // console.log("data: ", JSON.stringify(dataX))

    const gLocation = {
      location: {
        type: "Point",
        coordinates: [details.geometry.location.lng, details.geometry.location.lat]
      },
      main_text: data.structured_formatting.main_text,
      formatted_address: details.formatted_address,
    }

    setGLocation(gLocation);
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "rgba(245,245,245, 0.2)" }}
    >
      <KeyboardAwareScrollView onPress={Keyboard.dismiss} keyboardShouldPersistTaps="handled">
        <ScrollView style={styles.container} keyboardShouldPersistTaps={'always'} listViewDisplayed={false}>
          <TextInput
            label="City*"
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
          <View style={{ marginTop: 25 }} />
          <GooglePlacesAutocomplete
            placeholder="Area / Location"
            minLength={2}
            query={{
              key: GOOGLE_PLACES_API_KEY,
              language: 'en', // language of the results
              components: 'country:in',
              // types: '(cities)'
              // types: ["address","cities", "locality", "sublocality"],
              // types: ["establishment"],
              // fields: ["formatted_address", "geometry", "name"],
              // fields: ["address_components"],
              // types: ["cities", "locality", "sublocality",]
            }}
            // currentLocation={true}
            isRowScrollable={true}
            fetchDetails={true}
            onPress={(data, details) => onSelectPlace(data, details)}
            styles={{
              textInputContainer: {
                // backgroundColor: 'grey',
                color: '#000000',
                // backgroundColor: 'grey',
                // borderLeftWidth: 4,
                // borderRightWidth: 4,
                // height: 70
              },
              textInput: {
                height: 45,
                color: '#000000',
                fontSize: 16,
                borderColor: "#C0C0C0",
                backgroundColor: "rgba(245,245,245, 0.2)",
                // borderLeftWidth: 1,
                // borderRightWidth: 1,
                borderBottomWidth: 1,
                // borderTopWidth: 1
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
          // this in only required for use on the web. See https://git.io/JflFv more for details.
          />
          {/* <TextInput
            label="Area / Location*"
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
          /> */}
          <TextInput
            label="Flat No and Wing*"
            value={flatNumber}
            onChangeText={text => setFlatNumber(text)}
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

          <TextInput
            label="Building Name / Society*"
            value={buildingName}
            onChangeText={text => setBuildingName(text)}
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

          <TextInput
            label="Street / Landmark*"
            value={landmark}
            onChangeText={text => setLandmark(text)}
            onFocus={() => setIsVisible(false)}
            style={{ backgroundColor: "rgba(245,245,245, 0.1)", marginTop: 8 }}
            theme={{
              colors: {
                // placeholder: "white",
                // text: "white",
                primary: "rgba(0,191,255, .9)",
                underlineColor: "transparent",
                backgroundColor: "rgba(245,245,245, 0.1)"
              }
            }}
          />
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
  }
});


const mapStateToProps = state => ({
  userDetails: state.AppReducer.userDetails,
  propertyDetails: state.AppReducer.propertyDetails,
});
const mapDispatchToProps = {
  setPropertyType,
  setPropertyDetails
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocalityDetailsForm);

// export default LocalityDetailsForm;
