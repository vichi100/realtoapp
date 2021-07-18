import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
  AsyncStorage,
  Modal,
  TouchableHighlight
} from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryLabel,
  VictoryLegend,
  VictoryContainer,
  VictoryAxis
} from "victory-native";
import { setUserDetails, setPropReminderList } from "../reducers/Action";
import axios from "axios";
import { connect } from "react-redux";
import {SERVER_URL} from "../util/constant";
// rezar
// rezo
// https://www.youtube.com/watch?v=mjJzaiGkaQA profile screen

const rent = [
  { quarter: "Jan", earnings: 13 },
  { quarter: "Feb", earnings: 1 },
  { quarter: "Mar", earnings: 0 },
  { quarter: "Apr", earnings: 0 }
];
const sell = [
  { quarter: "Jan", earnings: 10 },
  { quarter: "Feb", earnings: 0 },
  { quarter: "Mar", earnings: 0 },
  { quarter: "Apr", earnings: 0 }
];

const winDealData = [
  { quarter: "Jan", earnings: 13 },
  { quarter: "Feb", earnings: 16 },
  { quarter: "Mar", earnings: 14 },
  { quarter: "Apr", earnings: 19 }
];
const lostDealData = [
  { quarter: "Jan", earnings: 3 },
  { quarter: "Feb", earnings: 6 },
  { quarter: "Mar", earnings: 4 },
  { quarter: "Apr", earnings: 10 }
];

const chartHeight = Dimensions.get("window").height * 0.3;
const chartWidth = Dimensions.get("window").width;
const Home = props => {
  const { navigation } = props;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // console.log("home1: " + JSON.stringify(props.userDetails));
    if (
      props.userDetails.user_status === "suspend" &&
      props.userDetails.user_type === "agent"
    ) {
      // console.log("home2");
      setModalVisible(true);
    }
    // else if (props.userDetails.user_status === "suspend" &&
    //   props.userDetails.user_type === "agent"){

    // }
    // navigation.navigate("Login");
  }, [props.userDetails]);

  useEffect(() => {
    getTotalListingSummary();
  }, []);

  const getTotalListingSummary = () => {
    const agent = {
      agent_id: props.userDetails.works_for[0]
    };
    axios(SERVER_URL+"/getTotalListingSummary", {
      method: "post",
      headers: {
        "Content-type": "Application/json",
        Accept: "Application/json"
      },
      data: agent
    }).then(
      response => {
        if (response.data) {
        }
      },
      error => {
        // console.log(error);
      }
    );
  };

  const reactivateAccount = () => {
    const agent = {
      agent_id: props.userDetails.id
    };
    axios(SERVER_URL+"/reactivateAccount", {
      method: "post",
      headers: {
        "Content-type": "Application/json",
        Accept: "Application/json"
      },
      data: agent
    }).then(
      response => {
        if (response.data === "success") {
          // console.log("1: " + JSON.stringify(props.userDetails));
          props.userDetails["user_status"] = "active";

          setModalVisible(!modalVisible);
          updateAsyncStorageData();
          // navigation.navigate("Profile");
        }
      },
      error => {
        // console.log(error);
      }
    );
  };

  const updateAsyncStorageData = async () => {
    const userDetailsDataX = await AsyncStorage.getItem("user_details");
    // console.log("userDetailsDataX: " + userDetailsDataX);
    const userDetailsData = JSON.parse(userDetailsDataX);
    userDetailsData.user_details["user_status"] = "active";
    AsyncStorage.setItem("user_details", JSON.stringify(userDetailsData));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={[
              styles.componentContainer,
              { marginLeft: 10, marginRight: 10 }
            ]}
          >
            <View style={styles.bar}>
              <Text style={styles.barHeader}>Listing Summary</Text>
            </View>
            <View
              style={[
                styles.cardContainer,
                { marginLeft: 10, marginRight: 10 }
              ]}
            >
              <View style={styles.card}>
                <Text style={styles.cardHeader1}>Residential</Text>
                <View style={styles.cardContent}>
                  <View style={styles.innerCard}>
                    <Text>20</Text>
                    <Text>Rent</Text>
                  </View>
                  <View style={styles.space} />
                  <View style={styles.innerCard}>
                    <Text>10</Text>
                    <Text>Sell</Text>
                  </View>
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardHeader2}>Commercial</Text>
                <View style={styles.cardContent}>
                  <View style={styles.innerCard}>
                    <Text>20</Text>
                    <Text>Rent</Text>
                  </View>
                  <View style={styles.space} />
                  <View style={styles.innerCard}>
                    <Text>10</Text>
                    <Text>Sell</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          

          <VictoryChart
            // height={chartHeight}
            // width={chartWidth}
            containerComponent={<VictoryContainer responsive={true} />}
            // minDomain={{ y: 0 }}
            // domainPadding={{ y: 1 }}
          >
            <VictoryGroup offset={20}>
              <VictoryBar
                horizontal
                data={rent}
                // barRatio={0.8}
                // barWidth={({ index }) => index * 2 + 8}
                x="quarter"
                y="earnings"
                labels={({ datum }) => datum.earnings}
                // style={{
                //   data: {
                //     fill: "#00b0ff"
                //   }
                // }}
                offsetY={20}
                // padding={{ top: 50, bottom: 60 }}
                style={{
                  data: { fill: "#00b0ff" }
                  // parent: { border: "1px solid #ccc" }
                }}
                // labelComponent={<VictoryLabel dy={30} />}
              />
              {/* <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            dependentAxis
            style={{
              tickLabels: { fontSize: 15, padding: 15, width: 60 }
            }}
            tickValues={[1, 2, 3, 4]}
            tickFormat={["Yes", "No", "Probably", "Never"]}
          /> */}
              <VictoryBar
                data={sell}
                // barWidth={({ index }) => index * 2 + 8}
                x="quarter"
                y="earnings"
                labels={({ datum }) => datum.earnings}
                style={{
                  data: {
                    fill: "#d500f9"
                  }
                }}
              />
            </VictoryGroup>

            <VictoryLegend
              x={200}
              y={20}
              // title="Legend"
              centerTitle
              orientation="horizontal"
              // gutter={10}
              style={{
                // border: { stroke: "black" },
                // title: { fontSize: 20 },
                margin: 30
              }}
              data={[
                // { name: "Rent", symbol: { fill: "tomato", type: "star" } },
                { name: "Rent", symbol: { fill: "#00b0ff" } },
                { name: "Sell", symbol: { fill: "#d500f9" } }
              ]}
            />
          </VictoryChart>
          
          
          
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "rgba(128,128,128, .9)",
              marginBottom: 20
            }}
          >
            Listing Summary / Months
          </Text>

{/*           

          <VictoryChart
            // height={chartHeight}
            // width={chartWidth}
            containerComponent={<VictoryContainer responsive={true} />}
          >
            <VictoryGroup offset={20}>
              <VictoryBar
                horizontal
                data={winDealData}
                x="quarter"
                y="earnings"
                labels={({ datum }) => datum.earnings}
                style={{
                  data: {
                    fill: "#6fbf73"
                  }
                }}
                // labelComponent={<VictoryLabel dy={30} />}
              />
              <VictoryBar
                data={lostDealData}
                x="quarter"
                y="earnings"
                labels={({ datum }) => datum.earnings}
                style={{
                  data: {
                    fill: "#ff9100"
                  }
                }}
              />
            </VictoryGroup>

            <VictoryLegend
              x={200}
              y={4}
              // title="Legend"
              centerTitle
              orientation="horizontal"
              gutter={20}
              // style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
              data={[
                // { name: "One", symbol: { fill: "tomato", type: "star" } },
                { name: "Won", symbol: { fill: "#6fbf73" } },
                { name: "Lost", symbol: { fill: "#ff9100" } }
              ]}
            />
          </VictoryChart>
          
           */}
          
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "rgba(128,128,128, .9)",
              marginBottom: 20
            }}
          >
            Deal Summary / Months
          </Text>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView1}>
            <View style={styles.modalView}>
              <Text style={{ color: "rgba(255,0,0, .9)", marginBottom: 10 }}>
                Your account is in suspend mode by you. Do you want to activate
                it ?
              </Text>
              {/* <Text style={styles.modalText}>
                Your account is in suspend mode by you. Do you want to activate it
              </Text> */}

              <View
                style={{
                  position: "absolute",
                  flexDirection: "row",
                  right: 0,
                  bottom: 0,
                  // marginTop: 20,
                  marginBottom: 20,
                  padding: 20
                  // justifyContent: "flex-end"
                }}
              >
                {/* <TouchableHighlight
                  style={{ ...styles.cancelButton }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>No</Text>
                </TouchableHighlight> */}
                <TouchableHighlight
                  style={{ ...styles.applyButton }}
                  onPress={() => {
                    reactivateAccount();
                  }}
                >
                  <Text style={styles.textStyle}>Yes</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  userDetails: state.AppReducer.userDetails
});
const mapDispatchToProps = {
  setUserDetails
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  dealChart: {
    marginTop: 10
  },
  componentContainer: {
    // flex: 1,
    marginBottom: 20
  },
  cardContainer: {
    flexDirection: "row",
    margin: (10, 10, 10, 3)
    // width: "90%"
  },
  bar: {
    shadowOpacity: 0.0015 * 5 + 0.18,
    shadowRadius: 0.54 * 1,
    shadowOffset: {
      height: 0.6 * 1
    },
    backgroundColor: "#ffffff"
    // width: "90%"
    // marginLeft: 15,
    // marginRight: 15
  },
  barHeader: {
    fontSize: 16,
    fontWeight: "600",
    alignContent: "center",
    padding: 5,
    width: "100%",
    textAlign: "center"
  },
  card: {
    padding: 15,
    shadowOpacity: 0.0015 * 5 + 0.18,
    shadowRadius: 0.54 * 5,
    shadowOffset: {
      height: 0.6 * 5
    },
    backgroundColor: "#ffffff"
  },
  cardContent: {
    flexDirection: "row",
    margin: 10
  },
  innerCard: {
    shadowOpacity: 0.0015 * 5 + 0.18,
    shadowRadius: 0.54 * 5,
    shadowOffset: {
      height: 0.6 * 5
    },
    backgroundColor: "#ffffff",
    padding: 20
  },
  cardHeader1: {
    fontSize: 16,
    fontWeight: "600",
    alignContent: "center",
    textAlign: "left"
  },
  cardHeader2: {
    fontSize: 16,
    fontWeight: "600",
    alignContent: "center",
    textAlign: "right"
  },
  text: {
    color: "#101010",
    fontSize: 24,
    fontWeight: "bold",
    margin: 5
  },
  space: {
    margin: 5
  },
  buttonContainer: {
    backgroundColor: "#222",
    borderRadius: 5,
    padding: 10,
    margin: 20
  },
  buttonText: {
    fontSize: 20,
    color: "#fff"
  },
  modalView: {
    margin: 20,
    height: 230,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  applyButton: {
    // backgroundColor: "#F194FF",
    // width: 150,
    // textAlign: "center",
    // borderRadius: 20,
    // paddingLeft: 60,
    // paddingRight: 20,
    // paddingTop: 10,
    // paddingBottom: 10,
    // elevation: 2,
    // marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },

  cancelButton: {
    // backgroundColor: "#F194FF",
    // width: 150,
    // textAlign: "center",
    // borderRadius: 20,
    // paddingLeft: 55,
    // paddingRight: 20,
    // paddingTop: 10,
    // paddingBottom: 10,
    // elevation: 2,
    // marginTop: 20,
    marginLeft: 10,
    marginRight: 30
  },
  modalText: {
    // marginBottom: 15,
    textAlign: "center"
  },
  centeredView1: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginTop: 22,
    marginBottom: 20
  }
});
