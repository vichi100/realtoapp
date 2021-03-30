import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage
} from "react-native";
import axios from "axios";
import ContactResidentialRentCard from "./ContactResidentialRentCard";
import CardResidentialRent from "../Card";

const CustomerMeetingDetails = props => {
  const { navigation } = props;
  const item = props.route.params.item;
  const category = props.route.params.category;

  const [reminderObj, setReminderObj] = useState(item);
  const [customerMeetingDetailsObj, setCustomerMeetingDetailsObj] = useState(
    null
  );
  useEffect(() => {
    console.log("item:     ", item);
    getCustomerAndMeetingDetails();
  }, [reminderObj]);

  const getCustomerAndMeetingDetails = () => {
    console.log("reminderObj:     ", reminderObj);
    const queryObj = {
      client_id: reminderObj.client_id,
      category_ids: reminderObj.category_ids,
      category: reminderObj.category,
      category_type: reminderObj.category_type,
      category_for: reminderObj.category_for
    };
    axios
      .post(
        "http://192.168.43.64:3000/getCustomerAndMeetingDetails",
        // SERVER_URL + "/addNewResidentialRentProperty",
        // await AsyncStorage.getItem("property")
        // JSON.stringify({ vichi: "vchi" })
        queryObj
      )
      .then(
        response => {
          console.log("response.data:    ", response.data);
          // navigation.navigate("CardDetails");
          if (response.data !== "fail") {
            setCustomerMeetingDetailsObj(response.data);
          }
        },
        error => {
          console.log(error);
        }
      );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "rgba(254,254,250, 0.1)" }}
    >
      <ScrollView>
        {customerMeetingDetailsObj ? (
          <View>
            <ContactResidentialRentCard
              navigation={navigation}
              item={customerMeetingDetailsObj.customer_details}
              disableDrawer={true}
              displayCheckBox={false}
            />
            <View
              style={{
                backgroundColor: "#ffffff",
                marginBottom: 1,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text style={{ padding: 10 }}>{reminderObj.reminder_for}</Text>
              <Text style={{ padding: 10 }}>{reminderObj.meeting_date}</Text>
              <Text style={{ padding: 10 }}>{reminderObj.meeting_time}</Text>
            </View>
            <View
              style={{
                backgroundColor: "rgba(0,255,255, 0.1)"
                // marginTop: 1
              }}
            >
              <Text style={{ padding: 10, textAlign: "center" }}>
                Related properties for this reminder
              </Text>
            </View>

            {customerMeetingDetailsObj.property_details.map(item => (
              <View>
                <CardResidentialRent
                  navigation={navigation}
                  item={item}
                  disableDrawer={true}
                  displayCheckBox={false}
                />
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomerMeetingDetails;
