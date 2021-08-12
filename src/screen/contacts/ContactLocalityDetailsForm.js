import React, { useState, useEffect, useRef } from "react";
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
import { TextInput, HelperText, useTheme } from "react-native-paper";
import Button from "../../components/Button";
import RadioButton from "../../components/RadioButtons";
import { ButtonGroup } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Snackbar from "../../components/SnackbarComponent";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SERVER_URL, GOOGLE_PLACES_API_KEY } from "../../util/constant";
import { connect } from "react-redux";
import { setPropertyType, setPropertyDetails, setCustomerDetails } from "../../reducers/Action";


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
  const ref = useRef();
  const { navigation } = props;
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState(null);
  const [gLocation, setGLocation] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [propertyForIndex, setPropertyForIndex] = useState(-1);
  const [selectedPropType, setSelectedPropType] = useState(null);
  const [SelectedLocationArray, setSelectedLocationArray] = useState([])

  const onSelectPropType = item => {
    // // console.log(item);
    if (selectedPropType && selectedPropType.key === item.key) {
      setSelectedPropType(null);
    } else {
      setSelectedPropType(item);
    }
    setIsVisible(false);
  };

  const selectPropertyForIndex = index => {
    // // console.log(index);
    // // console.log(propertyForArray[index]);
    setPropertyForIndex(index);
    setIsVisible(false);
  };

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
    } else if (selectedPropType === null) {
      setErrorMessage("Select Property type missing");
      setIsVisible(true);
      return;
    } else if (propertyForIndex === -1) {
      setErrorMessage("Select Property for missing");
      setIsVisible(true);
      return;
    }

    // const customer = JSON.parse(await AsyncStorage.getItem("customer"));
    const customer = props.customerDetails
    // const propertyType = property.property_type;
    // // console.log(property);

    const customer_locality = {
      city: city.trim(),
      location_area: SelectedLocationArray,
      property_type: selectedPropType.key,
      property_for: propertyForArray[propertyForIndex],
      pin: "123"
    };

    customer["customer_locality"] = customer_locality;
    // // console.log(property_address);
    const propertyType = selectedPropType.key;
    // AsyncStorage.setItem("customer", JSON.stringify(customer));
    props.setCustomerDetails(customer);
    // console.log(JSON.stringify(customer));
    if (propertyType.toLowerCase() === "Residential".toLowerCase()) {
      navigation.navigate("ContactResidentialPropertyDetailsForm");
    } else {
      navigation.navigate("CustomerCommercialPropertyDetailsForm");
    }
  };

  const onSelectPlace = (data, details) => {
    console.log("details: ", JSON.stringify(details.geometry.location))
    // console.log("data: ", JSON.stringify(dataX))
    const tempArray = []
    const gLocation = {
      location: {
        type: "Point",
        coordinates: [details.geometry.location.lng, details.geometry.location.lat]
      },
      main_text: data.structured_formatting.main_text
    }

    // tempArray.push(gLocation);
    setSelectedLocationArray([...SelectedLocationArray, gLocation])

    setGLocation(gLocation);
    ref.current?.setAddressText('');
  }

  const removeLocation = (loc) => {
    console.log("remove", JSON.stringify(loc))
    const arr = SelectedLocationArray.filter(item => item.main_text !== loc.main_text);
    setSelectedLocationArray(arr)
  }

  const renderSelectedLocation = ({ item }) => {
    console.log(JSON.stringify(item));
    return (
      <TouchableOpacity onPress={() => removeLocation(item)} style={{ backgroundColor: "#66CDAA", width: 100, borderRadius: 20, marginLeft: 10 }}>
        <Text numberOfLines={1} style={{ margin: 10, width: 70, overflow: "hidden" }}>{item.main_text}</Text>
        <Text style={{ color: "red", position: "absolute", right: 10, top: 8, marginLeft: 10, fontSize: 16 }}>x</Text>
      </TouchableOpacity>
    )

  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "rgba(245,245,245, 0.2)" }}
    >
      <KeyboardAwareScrollView onPress={Keyboard.dismiss} keyboardShouldPersistTaps="handled">
        <ScrollView style={styles.container} keyboardShouldPersistTaps={'always'} listViewDisplayed={false}>
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
          <View style={{ marginTop: 20 }} />
          <GooglePlacesAutocomplete
            ref={ref}
            placeholder="Add multiple locations"
            minLength={2}
            setAddressText={address}
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
          <View style={{ marginTop: 5 }} />
          <FlatList
            horizontal
            style={{ flex: 1 }}
            data={SelectedLocationArray}
            renderItem={(item) => renderSelectedLocation(item)}
            keyExtractor={(item, index) => index.toString()}
          />

          {/* <TextInput
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
          /> */}

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
)(ContactLocalityDetailsForm);

// export default ContactLocalityDetailsForm;
