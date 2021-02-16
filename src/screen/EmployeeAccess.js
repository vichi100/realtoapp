import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Switch
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";

const EmployeeAccess = props => {
  const [isReadEnabled, setIsReadEnabled] = useState(false);
  const [isEditEnabled, setIsEditEnabled] = useState(false);

  const toggleReadSwitch = () =>
    setIsReadEnabled(previousState => !previousState);

  const toggleEditSwitch = () =>
    setIsEditEnabled(previousState => !previousState);

  return (
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
          title={props.item.name.slice(0, 2)}
          activeOpacity={0.7}
          titleStyle={{ color: "rgba(105,105,105, .9)" }}
          source={{
            uri: props.item.photo
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
                +91 9833097595
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
      </View>

      <TouchableOpacity
        style={{
          height: 50,
          width: 50,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Ionicons name="md-call" color={"rgba(30,144,255,.7)"} size={26} />
      </TouchableOpacity>
    </View>
  );
};

export default EmployeeAccess;
