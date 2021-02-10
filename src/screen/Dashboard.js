import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView
} from "react-native";

const Dashboard = props => {
  return (
    <ScrollView>
      <View>
        <Text>Dashboard</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowOpacity: 0.0015 * 5 + 0.18,
    shadowRadius: 0.54 * 5,
    shadowOffset: {
      height: 0.6 * 5
    },
    backgroundColor: "#ffffff"
  }
});

export default Dashboard;
