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
  Linking,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { SERVER_URL } from "../util/constant";

const Reminder = props => {
  const { navigation } = props;
  const [reminderList, setReminderList] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (reminderList.length > 0) {
      return;
    }
    setLoading(true);
    const agentId = {
      agent_id: props.userDetails.works_for[0]
    };
    axios
      .post(
        SERVER_URL + "/getReminderList",
        // SERVER_URL + "/addNewResidentialRentProperty",
        // await AsyncStorage.getItem("property")
        // JSON.stringify({ vichi: "vchi" })
        agentId
      )
      .then(
        response => {
          // console.log("getReminderList:   ", response.data);
          setReminderList(response.data);
          setLoading(false);
          // navigation.navigate("CardDetails");
        },
        error => {
          setLoading(false);
          console.log(error);

        }
      );
  }, []);

  const makeCall = mobile => {
    const url = "tel://" + mobile;
    Linking.openURL(url);
  };

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
              <Text>{item.meeting_date}</Text>
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
              <Text>{item.meeting_date}</Text>
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
              <Text>{item.meeting_date}</Text>
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
    loading ? <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(245,245,245, .4)'
      }}
    >
      <ActivityIndicator animating size="large" color={'#000'} />
      {/* <ActivityIndicator animating size="large" /> */}
    </View> :
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        {reminderList.length > 0 ? (<View>
          <FlatList
            data={reminderList}
            //data defined in constructor
            ItemSeparatorComponent={ItemSeparatorView}
            //Item Separator View
            renderItem={ItemView}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>) : (<View style={styles.container}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center"
            }}
          >
            <Text style={{ textAlign: "center" }}>
              You have no reminder
            </Text>

          </View>

        </View>)}
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5
    // alignContent: "center"
  },
  verticalLine: {
    height: "100%",
    width: 2,
    backgroundColor: "#ffffff"
  }
});

const mapStateToProps = state => ({
  userDetails: state.AppReducer.userDetails
});
export default connect(
  mapStateToProps,
  null
)(Reminder);

// export default Reminder;
