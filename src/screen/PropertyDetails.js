import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView
} from "react-native";
// ezora
// eza
import { ButtonGroup } from "react-native-elements";
import { TextInput, HelperText, useTheme } from "react-native-paper";
import Button from "../components/Button";

const TextInputAvoidingView = ({ children }) => {
  return Platform.OS === "ios" ? (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior="padding"
      keyboardVerticalOffset={80}
    >
      {children}
    </KeyboardAvoidingView>
  ) : (
    <>{children}</>
  );
};

const PropertyDetails = props => {
  const { navigation } = props;
  const [city, setCity] = React.useState("");
  const [locality, setLocality] = React.useState("");
  const [index, setIndex] = React.useState(null);
  const [text, setText] = React.useState("");

  const updateIndex = index => {
    setIndex(index);
  };
  const data = [
    {
      id: "10000",
      property: "residential",
      property_type: "apartment",
      bhk: "2",
      washrooms: "2",
      furnishing: "full",
      parking: "2",
      parking_for: "car",
      property_age: "10",
      floor: "3 / 4",
      lift: "yes",
      property_area: "800",
      possession: "immediate",
      preferred_tenant: "anyone",
      rent: "15000",
      deposit: "90000",
      location: "Andheri west",
      address_line1: "Flat 305, ZA Tower",
      address_line2: "yarri road, versova"
    },
    {
      id: "10000",
      property: "residential",
      property_type: "apartment",
      bhk: "2",
      washrooms: "2",
      furnishing: "full",
      parking: "2",
      parking_for: "car",
      property_age: "10",
      floor: "3 / 4",
      lift: "yes",
      property_area: "800",
      possession: "immediate",
      preferred_tenant: "anyone",
      rent: "15000",
      deposit: "90000",
      location: "Andheri west",
      address_line1: "Flat 305, ZA Tower",
      address_line2: "yarri road, versova"
    },
    {
      id: "10000",
      property: "residential",
      property_type: "apartment",
      bhk: "2",
      washrooms: "2",
      furnishing: "full",
      parking: "2",
      parking_for: "car",
      property_age: "10",
      floor: "3 / 4",
      lift: "yes",
      property_area: "800",
      possession: "immediate",
      preferred_tenant: "anyone",
      rent: "15000",
      deposit: "90000",
      location: "Andheri west",
      address_line1: "Flat 305, ZA Tower",
      address_line2: "yarri road, versova"
    }
  ];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView style={styles.container}>
        <View style={{ paddingTop: 30, marginLeft: 20, marginRight: 20 }}>
          <TextInputAvoidingView>
            <Text>House Type*</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={updateIndex}
                selectedIndex={index}
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
                onPress={updateIndex}
                selectedIndex={index}
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
                onPress={updateIndex}
                selectedIndex={index}
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
                onPress={updateIndex}
                selectedIndex={index}
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
                onPress={updateIndex}
                selectedIndex={index}
                buttons={["1", "2", "3", "4"]}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 5, width: 150 }}
                containerBorderRadius={5}
              />
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={updateIndex}
                selectedIndex={index}
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
                onPress={updateIndex}
                selectedIndex={index}
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
              {/* <TextInput
              label="Floor*"
              value={text}
              onChangeText={text => setText(text)}
              style={{ backgroundColor: "#ffffff", marginTop: 8 }}
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
                mode="outlined"
                style={[
                  styles.inputContainerStyle,
                  { width: "20%", backgroundColor: "#ffffff" }
                ]}
                label="Floor*"
                placeholder="Floor"
                value={locality}
                keyboardType={"numeric"}
                onChangeText={locality => setLocality(locality)}
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
                label="Total Floor*"
                placeholder="Total Floor"
                value={locality}
                keyboardType={"numeric"}
                onChangeText={locality => setLocality(locality)}
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
                  onPress={updateIndex}
                  selectedIndex={index}
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
              placeholder="Type something"
              value={locality}
              keyboardType={"numeric"}
              onChangeText={locality => setLocality(locality)}
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
          </TextInputAvoidingView>

          <View style={{ marginTop: 15 }}>
            <Button
              title="NEXT"
              onPress={() => navigation.navigate("RentDetails")}
            />
          </View>
        </View>
      </ScrollView>
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
