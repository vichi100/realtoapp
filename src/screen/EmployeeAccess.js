import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Switch,
  Linking
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import { setEmployeeList } from "../reducers/Action";
import { connect } from "react-redux";
import axios from "axios";

const EmployeeAccess = props => {
  const [isReadEnabled, setIsReadEnabled] = useState(false);
  const [isEditEnabled, setIsEditEnabled] = useState(false);

  useEffect(() => {
    if (props.item.access_rights === "read") {
      setIsReadEnabled(true);
    }

    if (props.item.access_rights === "edit") {
      setIsEditEnabled(true);
    }
  }, []);

  const makeCall = mobile => {
    const url = "tel://" + mobile;
    Linking.openURL(url);
  };

  const toggleReadSwitch = () =>
    setIsReadEnabled(previousState => !previousState);

  // const toggleEditSwitch = () =>{

  //   updateEmployeeEditRights
  // }

  const removeEmployee = empIdToBeRemoved => {
    const user = {
      agent_id: props.userDetails.user_details.works_for[0],
      employee_id: empIdToBeRemoved
    };
    axios("http://172.20.10.2:3000/removeEmployee", {
      method: "post",
      headers: {
        "Content-type": "Application/json",
        Accept: "Application/json"
      },
      data: user
    }).then(
      response => {
        console.log(response.data);
        if (response.data === "success") {
          const x = props.employeeList.filter(function(el) {
            return el.id !== empIdToBeRemoved;
          });
          props.setEmployeeList([...x]);
        }
        // setData(response.data);
      },
      error => {
        console.log(error);
      }
    );
  };

  const updateEmployeeEditRights = employeeId => {
    const user = {
      employee_id: employeeId,
      access_rights: isEditEnabled ? "read" : "edit"
    };
    axios("http://172.20.10.2:3000/updateEmployeeEditRights", {
      method: "post",
      headers: {
        "Content-type": "Application/json",
        Accept: "Application/json"
      },
      data: user
    }).then(
      response => {
        console.log(response.data);
        if (response.data === "success") {
          setIsEditEnabled(!isEditEnabled);
        }
      },
      error => {
        console.log(error);
      }
    );
  };

  return props.userDetails.user_details.id === props.item.id ? null : (
    <View
      style={{
        flex: 1,
        // marginLeft: 10,
        // marginRight: 10,
        marginTop: 2,
        padding: 10,
        backgroundColor: "#FFF",
        flexDirection: "row",
        justifyContent: "space-between"
        // borderRadius: 10
      }}
    >
      <View
        style={{
          flexDirection: "row",
          // width: 180,
          justifyContent: "space-between"
        }}
      >
        <Avatar
          rounded
          size={60}
          title={props.item.name && props.item.name.slice(0, 1)}
          activeOpacity={0.7}
          titleStyle={{ color: "rgba(105,105,105, .9)" }}
          source={{
            uri: props.item.photo
          }}
          avatarStyle={{
            borderWidth: 1,
            borderColor: "rgba(127,255,212, .9)",
            // borderTopLeftRadius: 1,
            borderStyle: "solid"
          }}
        />
        {/* <Image
          source={{ uri: props.item.photo }}
          style={{ width: 60, height: 60, borderRadius: 30 }}
        /> */}
        <View style={{ alignItems: "left", marginLeft: 15 }}>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={{ fontWeight: "bold", textAlign: "left" }}>
                {props.item.name}
              </Text>
              <Text style={{ fontSize: 12, textAlign: "left" }}>
                +91 {props.item.mobile}
              </Text>
            </View>
            <View style={{ marginLeft: 5 }}>
              <TouchableOpacity
                style={{
                  height: 30,
                  width: 30,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => removeEmployee(props.item.id)}
              >
                <Ionicons
                  name="md-remove-circle-outline"
                  color={"rgba(250,128,114,.7)"}
                  size={26}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginLeft: 5, marginTop: 3 }}>
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
                onValueChange={() => updateEmployeeEditRights(props.item.id)}
                value={isEditEnabled}
                style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
              />
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={{
          height: 50,
          width: 50,
          justifyContent: "center",
          alignItems: "center"
        }}
        onPress={() => makeCall(props.item.mobile)}
      >
        <Ionicons name="md-call" color={"rgba(30,144,255,.7)"} size={26} />
      </TouchableOpacity>
    </View>
  );
};

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
)(EmployeeAccess);
