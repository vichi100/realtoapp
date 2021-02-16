import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Switch
} from "react-native";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { TextInput, Divider } from "react-native-paper";
import Button from "../components/Button";
import { ButtonGroup } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Snackbar from "../components/SnackbarComponent";
import EmployeeList from "./EmployeeList";

const ManageEmployee = props => {
  const { navigation } = props;
  const date = new Date();
  const [newDate, setNewDate] = React.useState("");
  const [newTime, setNewTime] = React.useState("");
  const [clientName, setClientName] = useState("");
  const [clientMobile, setClientMobile] = useState("");
  const [reminderForIndex, setReminderForIndex] = React.useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isReadEnabled, setIsReadEnabled] = useState(false);
  const [isEditEnabled, setIsEditEnabled] = useState(false);

  const toggleReadSwitch = () =>
    setIsReadEnabled(previousState => !previousState);

  const toggleEditSwitch = () =>
    setIsEditEnabled(previousState => !previousState);

  const selectReminderForIndex = index => {
    setReminderForIndex(index);
    setIsVisible(false);
  };

  const dismissSnackBar = () => {
    setIsVisible(false);
  };

  const [visible, setVisible] = React.useState(false);
  const onDismiss = React.useCallback(() => {
    setVisible(false);
    setIsVisible(false);
  }, [setVisible]);
  const onChange = React.useCallback(({ date }) => {
    setVisible(false);
    setIsVisible(false);
    const x = date.toString().split("00:00");
    setNewDate(x[0]);
    console.log(new Date(date).getDay());
    console.log(date.toString());
  }, []);

  const [timeVisible, setTimeVisible] = React.useState(false);
  const onDismissTimePicker = React.useCallback(() => {
    setTimeVisible(false);
    // setIsVisible(false);
  }, [setTimeVisible]);

  const onConfirmTimePicker = React.useCallback(
    ({ hours, minutes }) => {
      setTimeVisible(false);
      // setIsVisible(false);
      console.log({ hours, minutes });
      setNewTime(hours + ":" + minutes);
    },
    [setTimeVisible]
  );

  const onSubmit = () => {
    if (reminderForIndex === -1) {
      setErrorMessage("Reminder type is missing");
      setIsVisible(true);
      return;
    } else if (clientName.trim() === "") {
      setErrorMessage("Client name is missing");
      setIsVisible(true);
      return;
    } else if (clientMobile.trim() === "") {
      setErrorMessage("Client mobile is missing");
      setIsVisible(true);
      return;
    } else if (newDate.trim() === "") {
      setErrorMessage("Date is missing");
      setIsVisible(true);
      return;
    } else if (newTime.trim() === "") {
      setErrorMessage("Time is missing");
      setIsVisible(true);
      return;
    }
    navigation.navigate("AddImages");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <KeyboardAwareScrollView onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <View>
            <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 14 }}>
              Add employees so they can have access/edit rights for your
              properties listing, you can any time change any employees rights
            </Text>
            <Divider />

            <TextInput
              label="Employee Name*"
              value={clientName}
              onChangeText={text => setClientName(text)}
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
              label="Employee Mobile*"
              value={clientMobile}
              onChangeText={text => setClientMobile(text)}
              onFocus={() => setIsVisible(false)}
              keyboardType={"numeric"}
              returnKeyType={"done"}
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

            <Text style={{ marginTop: 20, marginBottom: 10, fontSize: 14 }}>
              Grant access right
            </Text>
            <View style={styles.propSubSection}>
              <View style={{ flexDirection: "row", marginLeft: 5 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text>Read</Text>
                  <Switch
                    trackColor={{
                      false: "#767577",
                      true: "rgba(0,250,154, .5)"
                    }}
                    thumbColor={isReadEnabled ? "#ffffff" : "#f4f3f4"}
                    ios_backgroundColor="rgba(211,211,211, .3)"
                    onValueChange={toggleReadSwitch}
                    value={isReadEnabled}
                    style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 30
                  }}
                >
                  <Text>Edit</Text>
                  <Switch
                    trackColor={{
                      false: "#767577",
                      true: "rgba(0,250,154, .5)"
                    }}
                    thumbColor={isEditEnabled ? "#ffffff" : "#f4f3f4"}
                    ios_backgroundColor="rgba(211,211,211, .3)"
                    onValueChange={toggleEditSwitch}
                    value={isEditEnabled}
                    style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                marginTop: 20,
                marginBottom: 20
                // marginLeft: 10,
                // marginRight: 10
              }}
            >
              <Button title="ADD" onPress={() => onSubmit()} />
            </View>
          </View>
          {/* Property releted reminder list */}

          <EmployeeList />
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
    // padding: 10,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#ffffff"
  },
  inputContainerStyle: {
    margin: 8
  },
  separator: {
    width: "80%",
    height: 1,
    borderWidth: 1
  },
  verticalLine: {
    height: "100%",
    width: 2,
    backgroundColor: "#ffffff"
  }
});

export default ManageEmployee;
