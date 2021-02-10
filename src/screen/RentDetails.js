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
import { DatePickerModal } from "react-native-paper-dates";
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

const RentDetails = props => {
  const { navigation } = props;
  const date = new Date();
  const [city, setCity] = React.useState("");
  const [locality, setLocality] = React.useState("");
  const [newDate, setNewDate] = React.useState("");
  const [index, setIndex] = React.useState(null);

  const [visible, setVisible] = React.useState(false);
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);
  const onChange = React.useCallback(({ date }) => {
    setVisible(false);
    setNewDate(date.toString());
    console.log({ date });
  }, []);

  const updateIndex = index => {
    setIndex(index);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView>
        <View style={styles.container}>
          <TextInputAvoidingView>
            <TextInput
              mode="outlined"
              style={styles.inputContainerStyle}
              label="Expected Rent*"
              placeholder="Expected Rent"
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
              style={styles.inputContainerStyle}
              label="Expected Deposit*"
              placeholder="Expected Deposit"
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
              style={styles.inputContainerStyle}
              label="Available From *"
              placeholder="Available From *"
              value={newDate}
              // onChangeText={newDate => setNewDate(newDate)}
              onFocus={() => setVisible(true)}
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
            <Text>Preferred Tenants*</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={updateIndex}
                selectedIndex={index}
                buttons={["Famliy", "Bachelors", "Any"]}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 300 }}
                containerBorderRadius={10}
              />
            </View>
            <Text>Nonveg Allowed*</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={updateIndex}
                selectedIndex={index}
                buttons={["Yes", "No"]}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 300 }}
                containerBorderRadius={10}
              />
            </View>
          </TextInputAvoidingView>

          <Button
            title="NEXT"
            onPress={() => navigation.navigate("AddImages")}
          />
        </View>
      </ScrollView>
      <DatePickerModal
        mode="single"
        visible={visible}
        onDismiss={onDismiss}
        date={date}
        onConfirm={onChange}
        saveLabel="Save" // optional
        label="Select date" // optional
        animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
        locale={"en"} // optional, default is automically detected by your system
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
  inputContainerStyle: {
    marginBottom: 20
  },
  propSubSection: {
    marginTop: 10,
    marginBottom: 15
  },
  doubleColSection: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5
  }
});

export default RentDetails;
