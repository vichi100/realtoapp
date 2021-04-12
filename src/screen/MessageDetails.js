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
  style,
  FlatList,
  Linking
} from "react-native";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import PropDetailsFromListing from "./PropDetailsFromListing";

const MessageDetails = props => {
  const item = props.route.params.item;
  console.log("props.route.params: ", item);
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View style={{ padding: 10, fontSize: 16, paddingTop: 15 }}>
            <Text
              style={{
                fontSize: 15,
                // fontWeight: "600",
                color: "#424242"
              }}
            >
              I have customer for your {item.subject.location_area},
              {item.subject.city} property. Please call me on +91{" "}
              {item.sender_details.mobile} - {item.subject.name}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "flex-start" }}
            >
              <Text
                style={{ textAlign: "right", color: "#424242", fontSize: 12 }}
              >
                {new Date(item.create_date_time).toDateString()}
              </Text>
            </View>
          </View>

          <PropDetailsFromListing />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MessageDetails;
