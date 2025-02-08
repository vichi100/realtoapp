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
  FlatList,
  Image
} from "react-native";
import { TextInput, HelperText, useTheme } from "react-native-paper";
import Button from "../../components/Button";
import RadioButton from "../../components/RadioButtons";
import { ButtonGroup } from "@rneui/themed";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Snackbar from "../../components/SnackbarComponent";
import CustomButtonGroup from "../../components/CustomButtonGroup";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SERVER_URL, GOOGLE_PLACES_API_KEY } from "../../util/constant";
import Slider from "../../components/Slider";
import { connect } from "react-redux";
import { setPropertyType, setPropertyDetails, setCustomerDetails } from "../../reducers/Action";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { SERVER_URL, GOOGLE_PLACES_API_KEY } from "../../util/constant";

// import Button from "../../components/Button";
// Dynamic query
// https://stackoverflow.com/questions/29831164/how-to-filter-in-mongodb-dynamically#:~:text=answer%20was%20accepted%E2%80%A6-,var%20fName%3D%22John%22%2C%20fCountry%3D%22US%22,fName%7D)%3B%20%7D%20if%20(fCountry%20!%3D%3D

const propertyTypeArray = ["Residential", "Commercial"];
const assetTypeArray = ["Property", "Customer"];
const whatTypeOptions = [
  { text: 'Residential' },
  { text: 'Commercial' },
];

const lookingForOptions = [
  { text: 'Property' },
  { text: 'Customer' },
];



const porposeForOptions = [
  { text: 'Rent' },
  { text: 'Buy' },
];

const bhkOption=[
  { text: '1 RK' },
  { text: '1 BHK' },
  { text: '2 BHK' },
  { text: '3 BHK' },
  { text: '3+ BHK' },
];
const reqWithinOptions = [
  { text: '7 Days' },
  { text: '15 Days' },
  { text: '30 Days' },
  { text: '60 Days' },
  { text: '60+ Days' },
];

const tenantOptions = [
  { text: 'Anyone' },
  { text: 'Famliy' },
  { text: 'Working Bachelor' },
];

const buildingTypeOption = [
  { text: 'Mall' },
  { text: 'Businesses Park' },
  { text: 'Stand Alone' },
  { text: 'Industrial' },
  { text: 'Shopping Complex' },
  { text: 'Commersial Complex' },
];

const requiredForOption = [
  { text: 'Shop' },
  { text: 'Office' },
  { text: 'Showroom' },
  { text: ' Restaurant Cafe ' },
  { text: 'Clinic' },
  { text: 'Godown' },
];

const GlobalSearch = props => {
  const ref = useRef();
  const { navigation } = props;
  const [city, setCity] = useState("");// when user input city
  const [area, setArea] = useState("");
  const [address, setAddress] = useState(null);
  const [gLocation, setGLocation] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [propertyForIndex, setPropertyForIndex] = useState(-1);
  const [selectedPropType, setSelectedPropType] = useState(null);
  const [selectedLocationArray, setSelectedLocationArray] = useState([]);// when add multiple location
  const [selectedIndex, setSelectedIndex] = React.useState([]);


  const [lookingFor, setLookingFor] = useState("Property");
  const [whatType, setWhatType] = useState("Residential");
  const [purpose, setPurpose] = useState("Rent");
  const [selectedBHK, setSelectedBHK] = useState(["1 RK".toLowerCase()]);
  const [selectedRequiredFor, setSelectedRequiredFor] = useState(["Shop".toLowerCase()]);
  const [selectedBuildingType, setSelectedBuildingType] = useState(["Mall".toLowerCase()]);
  const [priceRange, setPriceRange] = useState([]);
  const [reqWithin, setReqWithin] = useState("7 Days".toLowerCase());
  const [tenant, setTenant] = useState("Anyone".toLowerCase());
  
  
  
  


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
    } 

    if (selectedLocationArray.length === 0) {
      setErrorMessage("Please add a location of your city");
      setIsVisible(true);
      return;
    } 
    // const customer = JSON.parse(await AsyncStorage.getItem("customer"));
    const customer = props.customerDetails
    // const propertyType = property.property_type;
    // // console.log(property);

    const customer_locality = {
      city: city.trim(),
      location_area: selectedLocationArray,
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
    console.log("details: ", JSON.stringify(details))
    console.log("Lat Long: ", JSON.stringify(details.geometry.location))
    console.log("data: ", JSON.stringify(data))
    const tempArray = []
    const gLocation = {
      location: {
        type: "Point",
        coordinates: [details.geometry.location.lng, details.geometry.location.lat]
      },
      main_text: data.structured_formatting.main_text
    }

    // tempArray.push(gLocation);
    setSelectedLocationArray([...selectedLocationArray, gLocation])

    setGLocation(gLocation);
    ref.current?.setAddressText('');
  }

  const removeLocation = (loc) => {
    console.log("remove", JSON.stringify(loc))
    const arr = selectedLocationArray.filter(item => item.main_text !== loc.main_text);
    setSelectedLocationArray(arr)
  }

  const whatTypeButtonPress = (index, button) => {
    console.log(`Button pressed: ${button.text} (Index: ${index})`);
    setWhatType(button.text)
    // Add your custom logic here
  };

  const handleButtonPress = (index, button) => {
    console.log(`Button pressed: ${button.text} (Index: ${index})`);
    // setWhatType(button.text)
    // Add your custom logic here
  };

  

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
    <View
      style={{ flex: 1, backgroundColor: "rgba(245,245,245, 0.2)" }}
    >
      <View style={{ margin:10, flexDirection: 'row', justifyContent:'center' }}>
        <Image
          source={require('../../../assets/images/home.png')} // Path to your image
          style={{ width: 45, height: 45 , position: "absolute",
            // width: 130,
            // height: 35,
            // alignItems: "center",
            // justifyContent: "center",
            left: "2%",
            // left: 0,
            }}
        />
        <Text style={{ padding: 10, textAlign:'center', fontSize:16, fontWeight:500  }}>GLocal Search</Text>
        {/* <MaterialCommunityIcons name="facebook-messenger" color={"rgba(255, 76, 48, 1)"} size={35} /> */}
        {/* <Text>Realto</Text> */}
      </View>
      

      <KeyboardAwareScrollView onPress={Keyboard.dismiss} keyboardShouldPersistTaps="handled">

        <ScrollView style={styles.container} keyboardShouldPersistTaps={'always'} listViewDisplayed={false}>

          <TextInput
            label="City where you want to search*"
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
            placeholder="Add multiple locations within city"
            textInputProps={{
              placeholderTextColor: 'rgba(90, 90, 90,1)',
              returnKeyType: "search"
            }}
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
            data={selectedLocationArray}
            renderItem={(item) => renderSelectedLocation(item)}
            keyExtractor={(item, index) => index.toString()}
          />

          

          <View style={{ marginTop: 15, alignContent: "flex-start" }}>
            <Text style={{ padding: 10, backgroundColor: "rgba(229, 228, 226, .6)" }}>What you are looking for</Text>
          </View>
          <View
            style={[{ marginBottom: 10, marginTop: 15 }]}
          >
            {/* <Text>Select Property For</Text> */}
            <CustomButtonGroup
              buttons={lookingForOptions}
              initialSelectedIndices={[0]} // Initially select the first button
              isMultiSelect={false} // Enable multi-select by default
              onButtonPress={(index, button) => {
                // console.log(`Button pressed: ${button.text} (Index: ${index})`);
                setLookingFor(button.text.toLowerCase())
              }} // Pass the callback function

            />
          </View>

          <View style={styles.header}>
            <Text style={{ padding: 10, backgroundColor: "rgba(229, 228, 226, .6)" }}>What type</Text>
          </View>
          <View
            style={[{ marginBottom: 10, marginTop: 15 }]}
          >
            {/* <Text>Select Property For</Text> */}
            <CustomButtonGroup
              buttons={whatTypeOptions}
              initialSelectedIndices={[0]} // Initially select the first button
              isMultiSelect={false} // Enable multi-select by default
              onButtonPress={(index, button) => {
                console.log(`Button pressed: ${button.text} (Index: ${index})`);
                setWhatType(button.text.toLowerCase())
              }} // Pass the callback function
            />
          </View>

          <View style={styles.header}>
            <Text style={{ padding: 10, backgroundColor: "rgba(229, 228, 226, .6)" }}>What is purpose</Text>
          </View>
          <View
            style={[styles.propSubSection, { marginBottom: 10, marginTop: 15 }]}
          >
            {/* <Text>Select Property For</Text> */}
            <CustomButtonGroup
              buttons={porposeForOptions}
              initialSelectedIndices={[0]} // Initially select the first button
              isMultiSelect={false} // Enable multi-select by default
              onButtonPress={(index, button) => {
                console.log(`Button pressed: ${button.text} (Index: ${index})`);
                setPurpose(button.text.toLowerCase())
              }} // Pass the callback function
            // buttonStyle={styles.customButton}
            // selectedButtonStyle={styles.customSelectedButton}
            // buttonTextStyle={styles.customButtonText}
            // selectedButtonTextStyle={styles.customSelectedButtonText}
            // buttonImageStyle={styles.customButtonImage}
            // containerStyle={styles.customContainer}
            // toggleContainerStyle={styles.customToggleContainer}
            // selectedTextStyle={styles.customSelectedText}
            />
          </View>

          {whatType.toLocaleLowerCase() === "Residential".toLocaleLowerCase() ? (<View>
            <View style={styles.header}>
            <Text style={{ padding: 10, backgroundColor: "rgba(229, 228, 226, .6)" }}>BHK Size</Text>
          </View>
          <View
            style={[{ marginBottom: 10, marginTop: 15 }]}
          >
            {/* <Text>Select Property For</Text> */}
            <CustomButtonGroup
              buttons={bhkOption}
              initialSelectedIndices={[0]} // Initially select the first button
              isMultiSelect={true} // Enable multi-select by default
              onButtonPress={(index, button)=>{
                let newSelectedIndices;
                newSelectedIndices = [...selectedBHK];
                if (newSelectedIndices.includes(button.text.toLowerCase())) {
                  newSelectedIndices.splice(newSelectedIndices.indexOf(button.text.toLowerCase()), 1);
                } else {
                  newSelectedIndices.push(button.text.toLowerCase());
                }
                setSelectedBHK(newSelectedIndices);
                console.log(`newSelectedIndices: ${newSelectedIndices}`);
              }} // Pass the callback function
            />
          </View>
          </View>):(<View>
            <View style={styles.header}>
            <Text style={{ padding: 10, backgroundColor: "rgba(229, 228, 226, .6)" }}>Required For</Text>
          </View>
          <View
            style={[{ marginBottom: 10, marginTop: 15 }]}
          >
            {/* <Text>Select Property For</Text> */}
            <CustomButtonGroup
              buttons={requiredForOption}
              initialSelectedIndices={[0]} // Initially select the first button
              isMultiSelect={true} // Enable multi-select by default
              onButtonPress={(index, button)=>{
                let newSelectedIndices;
                newSelectedIndices = [...selectedRequiredFor];
                if (newSelectedIndices.includes(button.text.toLowerCase())) {
                  newSelectedIndices.splice(newSelectedIndices.indexOf(button.text.toLowerCase()), 1);
                } else {
                  newSelectedIndices.push(button.text.toLowerCase());
                }
                setSelectedRequiredFor(newSelectedIndices);
                console.log(`newSelectedIndices: ${newSelectedIndices}`);
              }} // Pass the callback function
            />
          </View>

          <View style={styles.header}>
            <Text style={{ padding: 10, backgroundColor: "rgba(229, 228, 226, .6)" }}>Building type</Text>
          </View>
          <View
            style={[{ marginBottom: 10, marginTop: 15 }]}
          >
            {/* <Text>Select Property For</Text> */}
            <CustomButtonGroup
              buttons={buildingTypeOption}
              initialSelectedIndices={[0]} // Initially select the first button
              isMultiSelect={true} // Enable multi-select by default
              onButtonPress={(index, button)=>{
                let newSelectedIndices;
                newSelectedIndices = [...selectedBuildingType];
                if (newSelectedIndices.includes(button.text.toLowerCase())) {
                  newSelectedIndices.splice(newSelectedIndices.indexOf(button.text.toLowerCase()), 1);
                } else {
                  newSelectedIndices.push(button.text.toLowerCase());
                }
                setSelectedBuildingType(newSelectedIndices);
                console.log(`newSelectedIndices: ${newSelectedIndices}`);
              }} // Pass the callback function
              
            />
          </View>
          </View>)}

          
          <View style={styles.header}>
            <Text style={{ padding: 10, backgroundColor: "rgba(229, 228, 226, .6)" }}>Price Range</Text>
          </View>
          <Slider
            min={10000}
            max={400000}
            // step={10000}
            onSlide={(values) => {
              setPriceRange(values)
              console.log(`values: ${values}`)
            }}
          />

          <View style={styles.header}>
            <Text style={{ padding: 10, backgroundColor: "rgba(229, 228, 226, .6)" }}>Required with in</Text>
          </View>
          <View
            style={[{ marginBottom: 10, marginTop: 15 }]}
          >
            {/* <Text>Select Property For</Text> */}
            <CustomButtonGroup
              buttons={reqWithinOptions}
              initialSelectedIndices={[0]} // Initially select the first button
              isMultiSelect={false} // Enable multi-select by default
              onButtonPress={(index, button) => {
                console.log(`Button pressed: ${button.text} (Index: ${index})`);
                setReqWithin(button.text.toLowerCase())
              }} // Pass the callback function

            />
          </View>

          {whatType.toLowerCase() === "Residential".toLowerCase() ? (<View>
            <View style={styles.header}>
            <Text style={{ padding: 10, backgroundColor: "rgba(229, 228, 226, .6)" }}>Preferd Tenants</Text>
          </View>
          <View
            style={[{ marginBottom: 5, marginTop: 15 }]}
          >
            {/* <Text>Select Property For</Text> */}
            <CustomButtonGroup
              buttons={tenantOptions}
              initialSelectedIndices={[0]} // Initially select the first button
              isMultiSelect={false} // Enable multi-select by default
              onButtonPress={(index, button) => {
                console.log(`Button pressed: ${button.text} (Index: ${index})`);
                setTenant(button.text.toLowerCase())
              }} // Pass the callback function

            />
          </View>
          </View>):(<View></View>)}

          


        </ScrollView>

      </KeyboardAwareScrollView>
      {/* Fixed button at the bottom */}
      

      <View style={[{ flexDirection: "column",  }]}>
          <View
            style={{
              
              marginBottom: 5,
              marginLeft: 10,
              marginRight: 10
            }}
          >
            <Button title="Search" onPress={() => onSubmit()} />
          </View>
        </View>
      
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
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 60,
  },
  header: {
    alignContent: "flex-start",
    marginTop: 10
  },
  propSection: {
    marginTop: 20
  },
  propSubSection: {
    // marginTop: 50,
    marginBottom: 10,
    marginLeft: 10
  },
  customButton: {
    backgroundColor: '#ffffff',
    // borderColor: '#999',
  },
  customSelectedButton: {
    backgroundColor: 'rgba(0, 163, 108, .2)',
    borderColor: 'rgba(0, 163, 108, .9)'

  },
  customButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  customSelectedButtonText: {
    color: '#0000000',
  },
  customButtonImage: {
    width: 30,
    height: 30,
  },
  customContainer: {
    padding: 10,
  },
  customToggleContainer: {
    marginBottom: 10,
  },
  customSelectedText: {
    color: 'green',
    fontSize: 18,
  },
  buttonContainer: {
    position: 'absolute', // Position the button absolutely
    bottom: 0, // Distance from the bottom
    left: 20, // Distance from the left
    right: 20, // Distance from the right
    alignItems: 'center', // Center the button horizontally
  },
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
)(GlobalSearch);

// export default ListingResidential;
