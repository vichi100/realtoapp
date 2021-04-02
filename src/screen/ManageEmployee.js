import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { setEmployeeList } from "../reducers/Action";
import { connect } from "react-redux";

const ManageEmployee = props => {
  const { navigation } = props;
  const [employeeName, setEmployeeName] = useState("");
  const [employeeMobile, setEmployeeMobile] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isReadEnabled, setIsReadEnabled] = useState(false);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [employeeList, setEmployeeList] = useState([]);

  const toggleReadSwitch = () =>
    setIsReadEnabled(previousState => !previousState);

  const toggleEditSwitch = () =>
    setIsEditEnabled(previousState => !previousState);

  const dismissSnackBar = () => {
    setIsVisible(false);
  };

  const onSubmit = () => {
    if (employeeName.trim() === "") {
      setErrorMessage("Client name is missing");
      setIsVisible(true);
      return;
    } else if (employeeMobile.trim() === "") {
      setErrorMessage("Client mobile is missing");
      setIsVisible(true);
      return;
    }
    const user = {
      user_id: props.userDetails.user_details.works_for[0],
      company_name: props.userDetails.user_details.company_name,
      address: props.userDetails.user_details.address,
      city: props.userDetails.user_details.city,
      name: employeeName.trim(),
      mobile: employeeMobile.trim(),
      access_rights: isEditEnabled ? "edit" : "read"
    };
    axios("http://172.20.10.2:3000/addEmployee", {
      method: "post",
      headers: {
        "Content-type": "Application/json",
        Accept: "Application/json"
      },
      data: user
    }).then(
      response => {
        // console.log(response.data);
        if (response.data) {
          const empObj = {
            id: response.data,
            name: employeeName.trim(),
            mobile: employeeMobile.trim(),
            access_rights: isEditEnabled ? "edit" : "read"
          };
          const x = [empObj, ...props.employeeList];
          props.setEmployeeList(x);
        }
      },
      error => {
        // console.log(error);
      }
    );
  };

  useEffect(() => {
    getEmployeeList();
  }, []);

  const getEmployeeList = () => {
    // console.log("user_id: " + JSON.stringify(props.userDetails));
    const user = { user_id: props.userDetails.user_details.id };
    axios("http://172.20.10.2:3000/getEmployeeList", {
      method: "post",
      headers: {
        "Content-type": "Application/json",
        Accept: "Application/json"
      },
      data: user
    }).then(
      response => {
        // console.log("emp list: " + JSON.stringify(response.data));
        props.setEmployeeList(response.data);
      },
      error => {
        // console.log(error);
      }
    );
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
              value={employeeName}
              onChangeText={text => setEmployeeName(text)}
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
              value={employeeMobile}
              onChangeText={text => setEmployeeMobile(text)}
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
                    // onValueChange={toggleReadSwitch}
                    value={true} //{isReadEnabled}
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

          <EmployeeList employeeList={props.employeeList} />
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

// export default ManageEmployee;

const mapStateToProps = state => ({
  employeeList: state.AppReducer.employeeList,
  userDetails: state.AppReducer.userDetails
});
const mapDispatchToProps = {
  setEmployeeList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageEmployee);
