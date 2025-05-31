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
import { makeCall } from "../util/methods";
import {formatIsoDateToCustomString} from "../util/methods"; 

const PropertyReminder = props => {
  const {
    navigation,
    reminderListX,

  } = props;
  const [reminderList, setReminderList] = useState([]);
  const [futureReminderList, setFutureReminderList] = useState([]);
  const [pastReminderList, setPastReminderList] = useState([]);


  useEffect(() => {
    // console.log("props.propReminderList: ", props.propReminderList);
    const dataArr = reminderListX;
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
    setReminderList(props.propReminderList);
  }, [props.propReminderList]);



  // useEffect(() => {
  //   if(reminderList.length > 0){
  //     return;
  //   }
  //   const agentId = {
  //     agent_id: props.userDetails.works_for
  //   };
  //   axios
  //     .post(
  //       SERVER_URL+"/getReminderList",
  //       // SERVER_URL + "/addNewResidentialRentProperty",
  //       // await AsyncStorage.getItem("property")
  //       // JSON.stringify({ vichi: "vchi" })
  //       agentId
  //     )
  //     .then(
  //       response => {
  //         // console.log(response.data);
  //         setReminderList(response.data);
  //         // navigation.navigate("CardDetails");
  //       },
  //       error => {
  //         // console.log(error);
  //       }
  //     );
  // }, []);

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
              category: "property"
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
              category: "property"
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
              category: "property"
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
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView>
        <Text style={{ textAlign: "center", fontSize: 16, fontWeight: 500, marginTop: 10, marginBottom: 10 }}>
          Upcoming Meetings
        </Text>
        {futureReminderList.length > 0 ? <FlatList
          data={futureReminderList}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        /> :
          <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: "rgba(239, 239, 240, .9)" }}>
            <Text style={{ textAlign: "center", fontSize: 15, fontWeight: 300, marginTop: 0, marginBottom: 20, marginTop: 20 }}>
              No Meetings
            </Text>
          </View>
        }
        <Text style={{ textAlign: "center", fontSize: 16, fontWeight: 500, marginTop: 15, marginBottom: 10 }}>
          Past Meetings
        </Text>
        {pastReminderList.length > 0 ? <FlatList
          data={pastReminderList}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        /> : <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: "rgba(239, 239, 240, .9)" }}>
          <Text style={{ textAlign: "center", fontSize: 15, fontWeight: 300, marginTop: 0, marginBottom: 20, marginTop: 20 }}>
            No Meetings
          </Text>
        </View>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  verticalLine: {
    height: "100%",
    width: 2,
    backgroundColor: "#ffffff"
  }
});

const mapStateToProps = state => ({
  userDetails: state.AppReducer.userDetails,
  propReminderList: state.AppReducer.propReminderList
});
export default connect(
  mapStateToProps,
  null
)(PropertyReminder);

// export default Reminder;
