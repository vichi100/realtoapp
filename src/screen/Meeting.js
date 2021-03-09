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
  Keyboard
} from "react-native";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { TextInput, Divider } from "react-native-paper";
import Button from "../components/Button";
import { ButtonGroup } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Snackbar from "../components/SnackbarComponent";
import axios from "axios";

const reminderForArray = ["Call", "Meeting", "Property Visit"];

const Meeting = ({ route, navigation }) => {
  // const { navigation } = props;
  const item = route.params;
  // console.log(item);
  const date = new Date();
  const [newDate, setNewDate] = React.useState("");
  const [newTime, setNewTime] = React.useState("");
  const [clientName, setClientName] = useState("");
  const [clientMobile, setClientMobile] = useState("");

  const [reminderForIndex, setReminderForIndex] = React.useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    }
    // else if (newTime.trim() === "") {
    //   setErrorMessage("Time is missing");
    //   setIsVisible(true);
    //   return;
    // }
    // navigation.navigate("AddImages");
    send();
  };

  const send = async () => {
    const reminderDetails = {
      agent_id: item.agent_id,
      property_id: item.property_id,
      property_type: item.property_type,
      reminder_for: reminderForArray[reminderForIndex],
      client_name: clientName.trim(),
      client_mobile: clientMobile.trim(),
      meeting_date: newDate.trim(),
      meeting_time: "12:40" // newTime.trim()
    };
    axios
      .post(
        "http://192.168.1.103:3000/addNewReminder",
        // SERVER_URL + "/addNewResidentialRentProperty",
        // await AsyncStorage.getItem("property")
        // JSON.stringify({ vichi: "vchi" })
        reminderDetails
      )
      .then(
        response => {
          console.log(response.data);
          // navigation.navigate("CardDetails");
        },
        error => {
          console.log(error);
        }
      );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <KeyboardAwareScrollView onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <View>
            <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 14 }}>
              Create a call/visiting schedule to show property to client and get
              reminder on time
            </Text>
            <Divider />
            <Text style={{ marginTop: 20, marginBottom: 10, fontSize: 14 }}>
              Reminder for ?
            </Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectReminderForIndex}
                selectedIndex={reminderForIndex}
                buttons={reminderForArray}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 300 }}
                containerBorderRadius={10}
              />
            </View>

            <TextInput
              label="Client Name*"
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
              label="Client Mobile*"
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

            <View style={{ flexDirection: "row", marginTop: 25 }}>
              <TextInput
                mode="outlined"
                style={styles.inputContainerStyle}
                label="Date*"
                placeholder="Date*"
                value={newDate}
                // onChangeText={newDate => setNewDate(newDate)}
                onFocus={() => setVisible(true)}
                style={{ width: "50%" }}
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
              {/* <TextInput
                mode="outlined"
                style={styles.inputContainerStyle}
                label="Time*"
                placeholder="Time*"
                value={newTime}
                // onChangeText={newDate => setNewDate(newDate)}
                onFocus={() => setTimeVisible(true)}
                style={{ width: "30%", marginLeft: 10 }}
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
            </View>
            <View
              style={{
                marginTop: 20,
                marginBottom: 20
                // marginLeft: 10,
                // marginRight: 10
              }}
            >
              <Button title="Save" onPress={() => onSubmit()} />
            </View>
          </View>
          {/* Property releted reminder list */}

          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
              backgroundColor: "rgba(135,206,250, 0.5)",
              borderRadius: 5
              // alignContent: "center"
              // alignItems: "center"
            }}
          >
            <View style={{ padding: 10, fontSize: 16, paddingTop: 15 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "rgba(0,0,0, 0.7)"
                }}
              >
                Vichi
              </Text>
              <Text>91 9833097595</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ padding: 10 }}>
                <Text>Meeting</Text>
                <Text>12:30 PM</Text>
                <Text>12 Jun 2021</Text>
              </View>
              <View style={styles.verticalLine} />
              <TouchableOpacity
                onPress={() => toggleSortingBottomNavigationView()}
                style={{ padding: 10 }}
              >
                <Ionicons name="call" color={"#ffffff"} size={26} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ margin: 1 }} />

          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
              backgroundColor: "rgba(64,224,208, 0.5)",
              borderRadius: 5
            }}
          >
            <View style={{ padding: 10, fontSize: 16, alignContent: "center" }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "rgba(128,128,128, 0.9)"
                }}
              >
                Vichi
              </Text>
              <Text>91 9833097595</Text>
            </View>
            <View style={{ padding: 10 }}>
              <Text>Call</Text>
              <Text>12:30 PM</Text>
              <Text>12 Jun 2021</Text>
            </View>
          </View>
          <View style={{ margin: 1 }} />
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
              backgroundColor: "rgba(255,182,193, 0.5)",
              borderRadius: 5
            }}
          >
            <View style={{ padding: 10, fontSize: 16 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "rgba(128,128,128, 0.9)"
                }}
              >
                Vichi
              </Text>
              <Text>91 9833097595</Text>
            </View>
            <View style={{ padding: 10 }}>
              <Text>12:30 PM</Text>
              <Text>12 Jun 2021</Text>
            </View>
          </View>
        </ScrollView>
        <DatePickerModal
          mode="single"
          visible={visible}
          onDismiss={onDismiss}
          date={date}
          onConfirm={onChange}
          saveLabel="OK" // optional
          label="Select date" // optional
          animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
          locale={"en"} // optional, default is automically detected by your system
        />
        <TimePickerModal
          visible={timeVisible}
          onDismiss={onDismissTimePicker}
          onConfirm={onConfirmTimePicker}
          hours={12} // default: current hours
          minutes={15} // default: current minutes
          label="Select time" // optional, default 'Select time'
          cancelLabel="Cancel" // optional, default: 'Cancel'
          confirmLabel="Ok" // optional, default: 'Ok'
          animationType="fade" // optional, default is 'none'
          locale={"en"} // optional, default is automically detected by your system
        />
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

export default Meeting;
