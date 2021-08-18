import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Share,
  Linking,
  AsyncStorage
} from "react-native";
import {
  // Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple
} from "react-native-paper";
import { Avatar } from "react-native-elements";
import { connect } from "react-redux";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  setUserMobile,
  setUserDetails,
  setPropReminderList
} from "../reducers/Action";
import axios from "axios";
import { SERVER_URL } from "../util/constant";

// import Share from "react-native-share";

// import files from '../assets/filesBase64';

// https://github.com/itzpradip/Food-Finder-React-Native-App/blob/master/screens/EditProfileScreen.js
// https://www.youtube.com/watch?v=mjJzaiGkaQA

const Profile = props => {
  const { navigation } = props;
  const [modalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //   // console.log(JSON.stringify(props.userDetails));
  // }, [props.userDetails]);

  const makeCall = async () => {
    const url = "tel://9833097595";
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

  const onSubmit = () => {
    navigation.navigate("ManageEmployee");
  };
  const myCustomShare = async () => {
    const shareOptions = {
      message:
        "Order your next meal from FoodFinder App. I've already ordered more than 10 meals on it."
      // url: files.appLogo,
      // urls: [files.image1, files.image2]
    };

    try {
      //   const ShareResponse = await Share.open(shareOptions);
      //   // console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      // console.log("Error => ", error);
    }
  };

  const deleteAgentAccount = () => {
    const agent = {
      agent_id: props.userDetails.id
    };
    axios(SERVER_URL + "/deleteAgentAccount", {
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
          props.userDetails["user_status"] = "suspend";

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
    userDetailsData.user_details["user_status"] = "suspend";
    AsyncStorage.setItem("user_details", JSON.stringify(userDetailsData));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          {/* <Avatar.Image
            source={{
              // uri: "https://api.adorable.io/avatars/80/abott@adorable.png"
            }}
            size={80}
          /> */}
          <Avatar
            rounded
            size={80}
            title={
              props.userDetails &&
                props.userDetails.name
                ? props.userDetails.name.slice(0, 1)
                : "Guest".slice(0, 1)
              // item.customer_details.name &&
              // item.customer_details.name.slice(0, 1)
            }
            activeOpacity={0.7}
            titleStyle={{ color: "rgba(105,105,105, .9)" }}
            // source={{
            //   uri: props.item.photo
            // }}
            avatarStyle={{
              borderWidth: 2,
              borderColor: "rgba(127,255,212, .9)",
              // borderTopLeftRadius: 1,
              borderStyle: "solid"
            }}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5
                }
              ]}
            >
              {props.userDetails &&
                props.userDetails.name
                ? props.userDetails.name
                : "Guest"}
            </Title>
            <Caption style={styles.caption}>
              {props.userDetails &&
                props.userDetails.company_name
                ? props.userDetails.company_name
                : "Company"}
            </Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {props.userDetails &&
              props.userDetails.city
              ? props.userDetails.city
              : "Guest City"}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            +91{" "}
            {" " + props.userDetails &&
              props.userDetails.mobile}
          </Text>
        </View>
        {/* <View style={styles.row}>
          <Icon name="email" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            john_doe@email.com
          </Text>
        </View> */}
      </View>
      {props.userDetails &&
        props.userDetails.user_type === "agent" ? (
        <View
          style={{
            flexDirection: "row",
            // flex: 1,
            justifyContent: "space-between",
            marginLeft: 40,
            marginRight: 40,
            marginBottom: 10
          }}
        >
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon name="account-off" color="#777777" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ProfileForm")}>
            <Icon name="account-edit" color="#777777" size={20} />
          </TouchableOpacity>
        </View>
      ) : null}

      {props.userDetails &&
        props.userDetails.user_type === "agent" ? (
        <View style={[{ flexDirection: "column", marginTop: 20 }]}>
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 10,
              marginRight: 10
            }}
          >
            <Button title="ADD EMPLOYEE" onPress={() => onSubmit()} />
          </View>
        </View>
      ) : (
        <View
          style={{
            borderBottomColor: "rgba(211,211,211, 0.5)",
            borderBottomWidth: 1,
            marginTop: 30,
            marginLeft: 10,
            marginRight: 10
          }}
        />
      )}

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => onShare()}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => makeCall()}>
          <View style={styles.menuItem}>
            <AntDesign name="customerservice" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => { }}>
          <View style={styles.menuItem}>
            <Icon name="settings-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => { }}>
          <View style={styles.menuItem}>
            <MaterialIcons name="local-police" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Privacy Policy</Text>
          </View>
        </TouchableRipple>
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
              Do you really want to delete your account ?
            </Text>
            <Text style={styles.modalText}>
              Your account will be in suspended mode for 15 days after that it
              will be permanently removed. Please note once it removed, it can
              not be recovered.
            </Text>

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
              <TouchableHighlight
                style={{ ...styles.cancelButton }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>No</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.applyButton }}
                onPress={() => {
                  deleteAgentAccount();
                }}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  userDetails: state.AppReducer.userDetails
});

const mapDispatchToProps = {
  // setUserMobile,
  // setUserDetails,
  // setPropReminderList
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25
  },
  title: {
    fontSize: 24,
    fontWeight: "bold"
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500"
  },
  row: {
    flexDirection: "row",
    marginBottom: 10
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center"
  },
  menuWrapper: {
    marginTop: 10
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26
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
    width: "100%",
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
    borderTopColor: "#fff59d",
    borderTopWidth: 1
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
  }
});
