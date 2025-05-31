import React, { useState, useEffect, useCallback } from "react";
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
  Linking,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { SERVER_URL } from "../util/Constant";
import { useIsFocused } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import {formatIsoDateToCustomString} from "../util/methods"; // Assuming this is the correct path to your method
import { makeCall } from "../util/methods";

const Reminder = props => {
  const {
    navigation,
    customerData,
    isSpecificRemider = false,
  } = props;
  const { didDbCall = true } = props.route?.params || {}; // Use optional chaining and fallback
  const [reminderList, setReminderList] = useState([]);
  const [futureReminderList, setFutureReminderList] = useState([]);
  const [pastReminderList, setPastReminderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ dbCall, setDbCall ] = useState(didDbCall);

  const updateDbCall = useCallback((value) => {
    // console.log(`Function 'a' in Screen A called with value: ${value}`);
    setDbCall(value); // Update state to show the effect
    // Perform any other actions needed in Screen A
  }, []); // useCallback ensures this function remains stable across re-renders

  

  useFocusEffect(
      useCallback(() => {
        // This function will be called when Screen A comes into focus
        console.log("useFocusEffect")
        if (dbCall && !isSpecificRemider && customerData == null) {
          getReminderList();
          
        }
  
        // Optional: Return a cleanup function if needed
        return () => {
          // This function will be called when Screen A loses focus
          // You can perform cleanup here if necessary
          setDbCall(true); // Set dbCall to false after fetching data
        };
      }, [dbCall]) // Re-run the effect if fetchData function changes (unlikely here)
    );


  useEffect(() => {
    // if (!isFocused) {
    //   return
    // }
    // if (reminderList.length > 0) {
    //   return;
    // }
    // setLoading(true);

    if (customerData != null) {
      getReminderListById(customerData)

    } else if (!isSpecificRemider) {

      getReminderList();

    }
    setLoading(false);


  }, [props.userDetails]);

  const getReminderListById = (customerData) => {

    if (props.userDetails === null) {
      setFutureReminderList([]);
      setPastReminderList([]);
      setReminderList([]);
      return;
    }

    const customerDatax = {
      req_user_id: props.userDetails.works_for,
      customer_id: customerData.customer_id,
      property_type: customerData.customer_locality.property_type,// Residential, commercial
      property_for: customerData.customer_locality.property_for,// Rent, sell

    };

    setLoading(true);

    axios
      .post(
        SERVER_URL + "/getReminderListByCustomerId",
        // SERVER_URL + "/addNewResidentialRentProperty",
        // await AsyncStorage.getItem("property")
        // JSON.stringify({ vichi: "vchi" })
        customerDatax
      )
      .then(
        response => {
          const dataArr = response.data;
          const future = [];
          const past = [];
          for (const value of dataArr) {
            console.log(value);
            const todayDate = new Date();
            const meetingDate = new Date(value.meeting_date.toString());
            if (todayDate < meetingDate) {
              // console.log("date1 is earlier than date2");
              future.push(value);
            } else if (todayDate > meetingDate) {
              // console.log("date1 is later than date2");
              past.push(value);
            } else {
              // console.log("Both dates are equal");
              future.push(value);
            }

          }
          // console.log("getReminderList:   ", response.data);
          setFutureReminderList(future);
          setPastReminderList(past);
          setReminderList(response.data);
          setLoading(false);
          // navigation.navigate("CardDetails");
        },
        error => {
          setLoading(false);
          console.log(error);

        }
      );
  }

  const getReminderList = () => {
    if (props.userDetails === null) {
      setFutureReminderList([]);
      setPastReminderList([]);
      setReminderList([]);
      return;
    }

    const userData = {
      req_user_id: props.userDetails.id,
      agent_id: props.userDetails.works_for
    };
    setLoading(true);

    axios
      .post(
        SERVER_URL + "/getReminderList",
        // SERVER_URL + "/addNewResidentialRentProperty",
        // await AsyncStorage.getItem("property")
        // JSON.stringify({ vichi: "vchi" })
        userData
      )
      .then(
        response => {
          const dataArr = response.data;
          const future = [];
          const past = [];
          for (const value of dataArr) {
            console.log(value);
            const todayDate = new Date();
            const meetingDate = new Date(value.meeting_date.toString());
            if (todayDate < meetingDate) {
              // console.log("date1 is earlier than date2");
              future.push(value);
            } else if (todayDate > meetingDate) {
              // console.log("date1 is later than date2");
              past.push(value);
            } else {
              // console.log("Both dates are equal");
              future.push(value);
            }

          }
          // console.log("getReminderList:   ", response.data);
          setFutureReminderList(future);
          setPastReminderList(past);
          setReminderList(response.data);
          setLoading(false);
          // navigation.navigate("CardDetails");
        },
        error => {
          setLoading(false);
          console.log(error);

        }
      );
  }

  // const makeCall = mobile => {
  //   const url = "tel://" + mobile;
  //   Linking.openURL(url);
  // };

  const ItemView = ({ item }) => {
    return item.reminder_for.toLowerCase() === "meeting".toLowerCase() ? (
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
          backgroundColor: "rgba(135,206,250, 0.5)",
          borderRadius: 5,
          marginTop: 2
          // alignContent: "center"
          // alignItems: "center"
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CustomerMeetingDetails", {
              item: item,
              category: "property",
              updateDbCall: updateDbCall
            })
          }
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "80%"
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
              {item.client_name}
            </Text>
            <Text>+91 {item.client_mobile}</Text>
          </View>
          <View>
            <View style={{ padding: 10 }}>
              <Text>{item.reminder_for}</Text>
              <Text>{item.meeting_time}</Text>
              <Text>{formatIsoDateToCustomString(item.meeting_date)}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.verticalLine} />
        <TouchableOpacity
          onPress={() => makeCall(item.client_mobile)}
          style={{
            padding: 15,
            marginTop: 7,
            paddingRight: 20
          }}
        >
          <Ionicons name="call" color={"#ffffff"} size={26} />
        </TouchableOpacity>
      </View>
    ) : item.reminder_for.toLowerCase() === "call".toLowerCase() ? (
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
          backgroundColor: "rgba(64,224,208, 0.5)",
          borderRadius: 5,
          marginTop: 2
          // alignContent: "center"
          // alignItems: "center"
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CustomerMeetingDetails", {
              item: item,
              category: "property",
              updateDbCall: updateDbCall
            })
          }
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "80%"
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
              {item.client_name}
            </Text>
            <Text>+91 {item.client_mobile}</Text>
          </View>
          <View>
            <View style={{ padding: 10 }}>
              <Text>{item.reminder_for}</Text>
              <Text>{item.meeting_time}</Text>
              <Text>{formatIsoDateToCustomString(item.meeting_date)}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.verticalLine} />
        <TouchableOpacity
          onPress={() => makeCall(item.client_mobile)}
          style={{
            padding: 15,
            marginTop: 7,
            paddingRight: 20
          }}
        >
          <Ionicons name="call" color={"#ffffff"} size={26} />
        </TouchableOpacity>
      </View>
    ) : (
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
          backgroundColor: "rgba(255,182,193, 0.5)",
          borderRadius: 5,
          marginTop: 2

          // alignContent: "center"
          // alignItems: "center"
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CustomerMeetingDetails", {
              item: item,
              category: "property",
              updateDbCall: updateDbCall
            })
          }
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "80%"
          }}
        >
          <View
            style={{
              padding: 10,
              fontSize: 16,
              paddingTop: 15
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "rgba(0,0,0, 0.7)"
              }}
            >
              {item.client_name}
            </Text>
            <Text>+91 {item.client_mobile}</Text>
          </View>
          <View>
            <View style={{ padding: 10 }}>
              <Text>{item.reminder_for}</Text>
              <Text>{item.meeting_time}</Text>
              <Text>{formatIsoDateToCustomString(item.meeting_date)}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.verticalLine} />
        <TouchableOpacity
          onPress={() => makeCall(item.client_mobile)}
          style={{
            padding: 15,
            marginTop: 7,
            paddingRight: 20
          }}
        >
          <Ionicons name="call" color={"#ffffff"} size={26} />
        </TouchableOpacity>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      //Item Separator
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "#C8C8C8" }}
      />
    );
  };

  return (
    loading ? (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(245,245,245, .4)",
        }}
      >
        <ActivityIndicator animating size="large" color={"#000"} />
      </View>
    ) : (
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#ffffff" }}>
        {reminderList.length > 0 ? (
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "500",
                marginTop: 15,
                marginBottom: 10,
              }}
            >
              Upcoming Meetings
            </Text>
            {futureReminderList.length > 0 ? (
              <FlatList
                data={futureReminderList}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={ItemView}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : (
              <View
                style={{
                  alignContent: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(239, 239, 240, .9)",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    fontWeight: "300",
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                >
                  No Meetings
                </Text>
              </View>
            )}
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "500",
                marginTop: 15,
                marginBottom: 10,
              }}
            >
              Past Meetings
            </Text>
            {pastReminderList.length > 0 ? (
              <FlatList
                data={pastReminderList}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={ItemView}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : (
              <View
                style={{
                  alignContent: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(239, 239, 240, .9)",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    fontWeight: "300",
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                >
                  No Meetings
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ textAlign: "center", fontSize: 16, color: "#777777" }}>
              You have no reminder
            </Text>
          </View>
        )}
      </ScrollView>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    margin: 5,
  },
  verticalLine: {
    height: "100%",
    width: 2,
    backgroundColor: "#ffffff",
  },
});

const mapStateToProps = state => ({
  userDetails: state.AppReducer.userDetails
});
export default connect(
  mapStateToProps,
  null
)(Reminder);

// export default Reminder;
