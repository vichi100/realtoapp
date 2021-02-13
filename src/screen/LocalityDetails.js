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
import { TextInput, HelperText, useTheme } from "react-native-paper";
import Button from "../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Snackbar from "../components/SnackbarComponent";

const LocalityDetails = props => {
  const { navigation } = props;
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [landmark, setLandmark] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dismissSnackBar = () => {
    setIsVisible(false);
  };

  const onSubmit = () => {
    if (city.trim() === "") {
      setErrorMessage("City is missing");
      setIsVisible(true);
      return;
    } else if (area.trim() === "") {
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

    navigation.navigate("PropertyDetails");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <KeyboardAwareScrollView onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <TextInput
            label="City*"
            value={city}
            onChangeText={text => setCity(text)}
            onFocus={() => setIsVisible(false)}
            style={{ backgroundColor: "#ffffff", marginTop: 0 }}
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
            label="Area*"
            value={area}
            onChangeText={text => setArea(text)}
            onFocus={() => setIsVisible(false)}
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
          />
          <TextInput
            label="Flat No*"
            value={flatNumber}
            onChangeText={text => setFlatNumber(text)}
            onFocus={() => setIsVisible(false)}
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
          />

          <TextInput
            label="Building Name*"
            value={buildingName}
            onChangeText={text => setBuildingName(text)}
            onFocus={() => setIsVisible(false)}
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
          />

          <TextInput
            label="Street/Landmark*"
            value={landmark}
            onChangeText={text => setLandmark(text)}
            onFocus={() => setIsVisible(false)}
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

export default LocalityDetails;
