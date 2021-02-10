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

const LocalityDetails = props => {
  const [city, setCity] = React.useState("");
  const [locality, setLocality] = React.useState("");
  const [text, setText] = React.useState("");
  const { navigation } = props;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView style={styles.container}>
        <TextInputAvoidingView>
          <TextInput
            label="City*"
            value={text}
            onChangeText={text => setText(text)}
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
          />
          <TextInput
            label="Flat No/Building Name*"
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
          />

          <TextInput
            label="Street/Landmark*"
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
          />
        </TextInputAvoidingView>
        <View style={{ marginTop: 20 }}>
          <Button
            title="NEXT"
            onPress={() => navigation.navigate("PropertyDetails")}
          />
        </View>
      </ScrollView>
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
  inputContainerStyle: {
    margin: 8
  }
});

export default LocalityDetails;
