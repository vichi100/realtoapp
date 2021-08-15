import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  Animated,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Dimensions,
  Share,
  Linking,
  TextInput
} from "react-native";
import { CheckBox } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ButtonGroup } from "react-native-elements";
import axios from "axios";
import Slideshow from "../../../components/Slideshow";
import AntDesign from "react-native-vector-icons/AntDesign";
import { numDifferentiation } from "../../../util/methods";
import { connect } from "react-redux";
// import { CheckBox } from "react-native-elements";
import {
  setUserMobile,
  setUserDetails,
  setPropReminderList,
  setPropListForMeeting,
  setStartNavigationPoint,
  setCustomerDetailsForMeeting
} from "../../../reducers/Action";
import { SERVER_URL } from "../../../util/constant";

// https://reactnativecode.com/create-custom-sliding-drawer-using-animation/
// https://www.skptricks.com/2019/05/react-native-custom-animated-sliding-drawer.html

const Sliding_Drawer_Width = 250;
const width = Dimensions.get("window").width;

const Card = props => {
  const {
    navigation,
    item,
    disableDrawer,
    displayCheckBox,
    displayChat
  } = props;
  let animatedValue = new Animated.Value(0);
  let toggleFlag = 0;
  let Animation = new Animated.Value(0);
  let Sliding_Drawer_Toggle = true;
  const [disabled, setDisabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = React.useState(null);
  const [chatModalVisible, setChatModalVisible] = useState(false);
  // const [text, onChangeText] = React.useState("I have customer for this property. Please call me.");
  const [message, setMessage] = React.useState(
    "I have customer for this property. Please call me. "
  );

  const onChangeText = text => {
    console.log(text);
    setMessage(text);
  };

  const onChat = () => {
    setChatModalVisible(true);
  };

  const sendMessage = () => {
    console.log("userDetails: ", props.userDetails);
    console.log("Property details: ", item);
    const sender_details = {
      id: props.userDetails.id,
      name: props.userDetails.name,
      mobile: props.userDetails.mobile,
      city: props.userDetails.city,
      company_name: props.userDetails.company_name
    };
    const receiver_details = {
      id: item.agent_id
    };
    const subject = {
      subject_id: item.property_id, // property_id or buyer_id
      subject_category: "property", // property, customer
      subject_type: item.property_type, // commercial, residential
      subject_for: item.property_for, // buy, sell, rent
      city: item.property_address.city,
      location_area: item.property_address.location_area
    };

    const messageDetails = {
      // agent_id: props.userDetails.works_for[0]
      sender_details: sender_details,
      receiver_details: receiver_details,
      subject: subject,
      message: message
    };

    axios(SERVER_URL + "/sendMessage", {
      method: "post",
      headers: {
        "Content-type": "Application/json",
        Accept: "Application/json"
      },
      data: messageDetails
    }).then(
      response => {
        console.log(response.data);
        // props.setCommercialCustomerList(response.data);
        setData(response.data);
      },
      error => {
        console.log(error);
      }
    );
    setChatModalVisible(false);
  };

  const updateIndex = index => {
    setIndex(index);
  };

  const makeCall = mobile => {
    const url = "tel://" + mobile;
    Linking.openURL(url);
  };

  const onShare = async () => {
    // https://docs.expo.io/versions/latest/react-native/share/
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React"
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const ShowSlidingDrawer = () => {
    // // console.log(Sliding_Drawer_Toggle);
    if (Sliding_Drawer_Toggle === true) {
      Animated.timing(Animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start(() => {
        Sliding_Drawer_Toggle = false;
      });
    } else {
      Animated.timing(Animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start(() => {
        Sliding_Drawer_Toggle = true;
      });
    }
  };

  const Animation_Interpolate = Animation.interpolate({
    inputRange: [0, 1],
    // outputRange: [370, 135]
    // outputRange: [-(Sliding_Drawer_Width - width * 1.55), 135]
    // outputRange: ["330%", "100%"]
    // outputRange: ["250%", "100%"]
    outputRange: [Sliding_Drawer_Width - 33, -15]
  });

  const onClickCheckBox = item => {
    // // console.log("onClickCheckBox", JSON.stringify(item));
    const name =
      item.property_for +
      " in " +
      item.property_address.building_name +
      ", " +
      item.property_address.landmark_or_street;

    const obj = {
      id: item.property_id,
      name: name
    };

    if (props.propListForMeeting.some(y => y.id === item.property_id)) {
      // // console.log("remove: ", checkBoxList);
      const x = props.propListForMeeting.filter(z => z.id !== item.property_id);
      // setCheckBoxList(x);
      props.setPropListForMeeting(x);
    } else {
      const x = [obj, ...props.propListForMeeting];
      // // console.log("add: X :  ", x);
      // setCheckBoxList(x);
      props.setPropListForMeeting(x);
    }
    // console.log(
    //   "setPropListForMeeting: ",
    //   JSON.stringify(props.propListForMeeting)
    // );
  };

  const onClickMeeting = item => {
    props.setCustomerDetailsForMeeting(null);
    props.setPropListForMeeting([]);
    navigation.navigate("Meeting", {
      item: item,
      category: "property"
    });
    props.setStartNavigationPoint("CustomerListForMeeting");
  };

  return (
    <View style={styles.card}>
      <Slideshow
        dataSource={[
          { url: "http://placeimg.com/640/480/house" },
          { url: "http://placeimg.com/640/480/any" },
          { url: "http://placeimg.com/640/480/any" }
        ]}
      />

      <View style={styles.MainContainer}>
        <View
          style={[
            {
              backgroundColor: "rgba(245,245,245, 0.8)",
              flexDirection: "row",
              justifyContent: "space-between"
            }
          ]}
        >
          <View style={[styles.headerContainer]}>
            <Text style={[styles.title]}>
              Sell in {item.property_address.building_name},{" "}
              {item.property_address.landmark_or_street}
            </Text>
            <Text style={[StyleSheet.subTitle]}>
              {item.property_address.formatted_address}
            </Text>
          </View>
          {displayCheckBox ? (
            <View
              style={{
                backgroundColor: "rgba(108, 198, 114, 0.2)",
                justifyContent: "center"
              }}
            >
              <CheckBox
                onPress={() => onClickCheckBox(item)}
                center
                // title="Select"
                checked={
                  props.propListForMeeting.some(s => s.id === item.property_id)
                    ? true
                    : false
                }
                containerStyle={{
                  // backgroundColor: "rgba(108, 198, 114, 0.3)",
                  borderWidth: 0,
                  margin: 0,
                  // padding: 30,
                  borderRadius: 10
                  // width: 60
                }}
              />
            </View>
          ) : null}
          {displayChat ? (
            <TouchableOpacity
              onPress={() => onChat(item)}
              style={{ paddingTop: 15 }}
            >
              <View
                style={{
                  // backgroundColor: "rgba(108, 198, 114, 0.2)",
                  justifyContent: "center",
                  marginRight: 15
                }}
              >
                <AntDesign name="message1" color={"#86b9d4"} size={30} />
              </View>
            </TouchableOpacity>
          ) : null}
        </View>

        {disableDrawer ? null : (
          <Animated.View
            style={[
              styles.drawer,
              { transform: [{ translateX: Animation_Interpolate }] }
            ]}
          >
            <View style={styles.Main_Sliding_Drawer_Container}>
              {/* Put All Your Components Here Which You Want To Show Inside Sliding Drawer. */}
              <TouchableOpacity
                onPress={ShowSlidingDrawer}
                style={{ paddingTop: 20 }}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  color={"#ffffff"}
                  size={30}
                />
              </TouchableOpacity>
              <View style={styles.verticalLine} />
              <TouchableOpacity
                // disabled={Sliding_Drawer_Toggle}
                onPress={() => {
                  setModalVisible(true);
                }}
                style={{ padding: 15, backgroundColor: "#e57373" }}
              >
                <Ionicons name="close-sharp" color={"#ffffff"} size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onShare()}
                style={{ padding: 15, backgroundColor: "#0091ea" }}
              >
                <Ionicons name="share-social" color={"#ffffff"} size={30} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  onClickMeeting(item)
                }
                style={{ padding: 15, backgroundColor: "#ffd600" }}
              >
                <Ionicons
                  name="ios-alarm-outline"
                  color={"#ffffff"}
                  size={30}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => makeCall(item.owner_details.mobile1)}
                style={{ padding: 15, backgroundColor: "#00bfa5" }}
              >
                <Ionicons name="call" color={"#ffffff"} size={30} />
                <Text style={{ fontSize: 8, paddingTop: 5 }}>OWNER</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </View>

      <View style={[styles.detailsContainer]}>
        <View style={[styles.details]}>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue, { marginTop: 5 }]}>
              {item.property_details.property_used_for}
            </Text>
            <Text style={[styles.subDetailsTitle]}>Prop Type</Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>
              {numDifferentiation(item.sell_details.expected_sell_price)}
            </Text>
            <Text style={[styles.subDetailsTitle]}>Price</Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>
              {item.property_details.building_type}
            </Text>
            <Text style={[styles.subDetailsTitle]}>Building Type</Text>
          </View>
          {/* <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>
              {item.property_details.furnishing_status}
            </Text>
            <Text style={[styles.subDetailsTitle]}>Furnishing</Text>
          </View> */}
          <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>800 sqft</Text>
            <Text style={[styles.subDetailsTitle]}>Buildup</Text>
          </View>
        </View>
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
            <Text style={styles.modalText}>
              Did you win deal for this property?
            </Text>
            <ButtonGroup
              selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
              onPress={updateIndex}
              selectedIndex={index}
              buttons={["Yes", "No"]}
              // containerStyle={{ height: 30 }}
              textStyle={{ textAlign: "center" }}
              selectedTextStyle={{ color: "#fff" }}
              containerStyle={{ borderRadius: 10, width: 300 }}
              containerBorderRadius={10}
            />

            <View
              style={{
                position: "absolute",
                flexDirection: "row",
                right: 0,
                bottom: 0,
                marginTop: 20,
                marginBottom: 20,
                padding: 20
                // justifyContent: "flex-end"
              }}
            >
              <TouchableHighlight
                style={{ ...styles.cancelButton }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.applyButton }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Apply</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      {/* close property modal  */}
      {/* message modal  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={chatModalVisible}
        onRequestClose={() => {
          setChatModalVisible(false);
        }}
      >
        <View style={styles.centeredView1}>
          <View style={styles.modalView}>
            <Text style={{ color: "616161", fontSize: 16 }}>
              Enter your message
            </Text>
            <TextInput
              style={{
                height: 90,
                width: "95%",
                margin: 12,
                borderWidth: 1,
                borderColor: "rgba(191, 191, 191, 1)",
                padding: 7,
                color: "#616161"
              }}
              multiline
              numberOfLines={10}
              onChangeText={onChangeText}
              value={message}
              placeholder={message}
            // keyboardType="numeric"
            />

            <View
              style={{
                position: "absolute",
                flexDirection: "row",
                right: 0,
                bottom: 0,
                marginTop: 20,
                marginBottom: 20,
                padding: 20
                // justifyContent: "flex-end"
              }}
            >
              <TouchableHighlight
                style={{ ...styles.cancelButton }}
                onPress={() => {
                  setChatModalVisible(!chatModalVisible);
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.applyButton }}
                onPress={() => sendMessage()}
              >
                <Text style={styles.textStyle}>Send</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    shadowOpacity: 0.0015 * 5 + 0.18,
    shadowRadius: 0.54 * 5,
    shadowOffset: {
      height: 0.6 * 5
    },
    backgroundColor: "white"
  },
  cardImage: {
    // alignSelf: "stretch",
    marginBottom: 16,
    flex: 1,
    width: "100%",
    height: "auto"
    // justifyContent: "center",
    // alignItems: "stretch"
  },
  headerContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    paddingTop: 16,
    // width: "100%",
    backgroundColor: "#ffffff"
  },
  title: {
    fontSize: 16,
    fontWeight: "600"
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(255 ,255 ,255 , 0.87)"
  },
  detailsContainer: {
    // borderBottomWidth: 1,
    borderTopColor: "#DCDCDC",
    borderBottomColor: "#DCDCDC",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 3
  },

  details: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  subDetailsTitle: {
    fontSize: 12,
    fontWeight: "400"
  },
  subDetailsValue: {
    fontSize: 14,
    fontWeight: "600"
  },
  verticalLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#909090"
  },
  MainContainer: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center"
  },

  Root_Sliding_Drawer_Container: {
    position: "absolute",
    flexDirection: "row",
    // left: 0,
    // bottom: 0,
    // top: Platform.OS == "ios" ? 20 : 0,
    width: Sliding_Drawer_Width
  },

  Main_Sliding_Drawer_Container: {
    // flex: 1,
    flexDirection: "row",
    backgroundColor: "#616161",
    height: 67
    // paddingHorizontal: 10
    // justifyContent: "center",
    // alignItems: "center"
  },

  TextStyle: {
    fontSize: 25,
    padding: 10,
    textAlign: "center",
    color: "#FF5722"
  },
  centeredView1: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginTop: 22,
    marginBottom: 20
  },
  modalView: {
    margin: 20,
    height: 250,
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
    marginLeft: 10,
    marginRight: 30
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  drawer: {
    position: "absolute",
    // top: Platform.OS == "ios" ? 20 : 0,
    right: 0,
    bottom: 0,
    width: Sliding_Drawer_Width,
    flexDirection: "row"
  }
});

const mapStateToProps = state => ({
  userDetails: state.AppReducer.userDetails,
  propReminderList: state.AppReducer.propReminderList,
  propListForMeeting: state.AppReducer.propListForMeeting
});

const mapDispatchToProps = {
  setUserMobile,
  setUserDetails,
  setPropReminderList,
  setPropListForMeeting,
  setStartNavigationPoint,
  setCustomerDetailsForMeeting
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);
