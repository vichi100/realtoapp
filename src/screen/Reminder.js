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
  FlatList
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

const Reminder = props => {
  const [reminderList, setReminderList] = useState([]);
  useEffect(() => {
    const agentId = {
      agent_id: "1234"
    };
    axios
      .post(
        "http://192.168.0.104:3000/getReminderList",
        // SERVER_URL + "/addNewResidentialRentProperty",
        // await AsyncStorage.getItem("property")
        // JSON.stringify({ vichi: "vchi" })
        agentId
      )
      .then(
        response => {
          console.log(response.data);
          setReminderList(response.data);
          // navigation.navigate("CardDetails");
        },
        error => {
          console.log(error);
        }
      );
  }, []);
  const ItemView = ({ item }) => {
    return (
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
            {item.client_name}
          </Text>
          <Text>+91 {item.client_mobile}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ padding: 10 }}>
            <Text>{item.reminder_for}</Text>
            <Text>{item.meeting_time}</Text>
            <Text>{item.meeting_date}</Text>
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView>
        <FlatList
          data={reminderList}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  verticalLine: {
    height: "100%",
    width: 2,
    backgroundColor: "#ffffff"
  }
});

export default Reminder;
