import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  AsyncStorage
} from "react-native";
import Button from "../../components/Button";
import axios from "axios";
import SERVER_URL from "../../util/constant";
import { numDifferentiation } from "../../util/methods";
import { Avatar } from "react-native-elements";

const AddNewCustomerRentResidentialFinalDetails = props => {
  const { navigation } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [customerFinalDetails, setCustomerFinalDetails] = useState(null);
  const [bhk, setBHK] = useState(null);
  const [possessionDate, setPossessionDate] = useState(null);

  useEffect(() => {
    if (customerFinalDetails === null) {
      getPropFinalDetails();
    }
  }, [customerFinalDetails]);

  useEffect(() => {
    if (customerFinalDetails !== null) {
      // let bhkTemp = customerFinalDetails.customer_property_details.bhk_type;
      // if (bhkTemp.indexOf("RK") > -1) {
      //   setBHK(bhkTemp);
      // } else {
      //   let x = bhkTemp.split("BHK");
      //   setBHK(x[0]);
      // }
      const availableDateStr =
        customerFinalDetails.customer_rent_details.available_from;
      const availableDate = new Date(availableDateStr);
      const t = convert(availableDate);
      var today = new Date();
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const diffDays = Math.round((today - new Date(t)) / oneDay);
      // console.log(diffDays);
      if (diffDays >= 0) {
        setPossessionDate("Immediately");
      } else {
        setPossessionDate(availableDateStr);
      }
    }
  }, [customerFinalDetails]);

  const getPropFinalDetails = async () => {
    const customer = JSON.parse(await AsyncStorage.getItem("customer"));
    setCustomerFinalDetails(customer);
    console.log(
      "AddNewCustomerFinalDetails customer:  " + JSON.stringify(customer)
    );
  };

  const convert = str => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };

  const dismissSnackBar = () => {
    setIsVisible(false);
  };

  const send = async () => {
    console.log(await AsyncStorage.getItem("customer"));
    console.log(
      "customerFinalDetails: " + JSON.stringify(customerFinalDetails)
    );
    axios
      .post(
        "http://192.168.43.64:3000/addNewResidentialCustomer",
        // SERVER_URL + "/addNewResidentialRentProperty",
        // await AsyncStorage.getItem("property")
        // JSON.stringify({ vichi: "vchi" })
        customerFinalDetails
      )
      .then(
        async response => {
          // console.log("vichi: " + response.data.customer_id);
          if (response.data.customer_id !== null) {
            // console.log("inside");
            await AsyncStorage.removeItem("customer");
            navigation.navigate("Contacts");
            // console.log("inside");
          } else {
            setErrorMessage(
              "Error: Seems there is some network issue, please try later"
            );
          }
        },
        error => {
          console.log(error);
        }
      );
  };

  return customerFinalDetails ? (
    <ScrollView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={[styles.headerContainer]}>
        <View
          style={[
            {
              flexDirection: "row",
              alignItems: "flex-start",
              paddingRight: 16,
              // paddingLeft: 16,
              // paddingBottom: 16,
              // paddingTop: 16,
              width: "100%",
              backgroundColor: "#d1d1d1"
            }
            // { backgroundColor: "rgba(245,245,245, 0.8)" }
          ]}
        >
          <Avatar
            square
            size={80}
            title={
              customerFinalDetails.customer_details.name &&
              customerFinalDetails.customer_details.name.slice(0, 2)
            }
            activeOpacity={0.7}
            titleStyle={{ color: "rgba(105,105,105, .9)" }}
            // source={{
            //   uri: props.item.photo
            // }}
            avatarStyle={{
              borderWidth: 1,
              borderColor: "rgba(127,255,212, .9)",
              // borderTopLeftRadius: 1,
              borderStyle: "solid"
            }}
          />
          <View style={{ paddingLeft: 20, paddingTop: 10 }}>
            <Text style={[styles.title]}>
              {customerFinalDetails.customer_details.name}
            </Text>
            <Text style={[StyleSheet.subTitle]}>
              {customerFinalDetails.customer_details.mobile1}
            </Text>
            <Text style={[StyleSheet.subTitle]}>
              {customerFinalDetails.customer_details.address}
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.detailsContainer]}>
        <View style={[styles.details]}>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>
              {customerFinalDetails.customer_property_details.bhk_type}
            </Text>
            <Text style={[styles.subDetailsTitle]}>Looking for</Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>
              {numDifferentiation(
                customerFinalDetails.customer_rent_details.expected_rent
              )}
            </Text>
            <Text style={[styles.subDetailsTitle]}>
              Max {customerFinalDetails.customer_locality.property_for}
            </Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>
              {numDifferentiation(
                customerFinalDetails.customer_rent_details.expected_deposit
              )}
            </Text>
            <Text style={[styles.subDetailsTitle]}>Max Deposit</Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>
              {customerFinalDetails.customer_property_details.furnishing_status}
            </Text>
            <Text style={[styles.subDetailsTitle]}>Furnishing</Text>
          </View>
          {/* <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>
              {customerFinalDetails.property_details.property_size}sqft
            </Text>
            <Text style={[styles.subDetailsTitle]}>Buildup</Text>
          </View> */}
        </View>
      </View>

      <View style={styles.margin1}></View>
      {/* property details */}
      <View style={styles.overviewContainer}>
        <View style={styles.overview}>
          <Text>Details</Text>
          <View style={styles.horizontalLine}></View>
        </View>
        <View style={styles.overviewColumnWrapper}>
          <View style={styles.overviewLeftColumn}>
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>
                {customerFinalDetails.customer_locality.city}
              </Text>
              <Text style={[styles.subDetailsTitle]}>City</Text>
            </View>
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>
                {customerFinalDetails.customer_locality.location_area}
              </Text>
              <Text style={[styles.subDetailsTitle]}>Locations</Text>
            </View>
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>{possessionDate}</Text>
              <Text style={[styles.subDetailsTitle]}>Possession</Text>
            </View>
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>
                {customerFinalDetails.customer_rent_details.preferred_tenants}
              </Text>
              <Text style={[styles.subDetailsTitle]}>Tenant Type</Text>
            </View>
          </View>
          <View style={styles.overviewRightColumn}>
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>
                {/* {customerFinalDetails.property_details.parking_number}{" "} */}
                {customerFinalDetails.customer_property_details.parking_type}
              </Text>
              <Text style={[styles.subDetailsTitle]}>Parking</Text>
            </View>
            {/* <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>
                {customerFinalDetails.property_details.floor_number}/
                {customerFinalDetails.property_details.total_floor}
              </Text>
              <Text style={[styles.subDetailsTitle]}>Floor</Text>
            </View> */}
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>
                {customerFinalDetails.customer_rent_details.non_veg_allowed}
              </Text>
              <Text style={[styles.subDetailsTitle]}>NonVeg</Text>
            </View>
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>
                {customerFinalDetails.customer_property_details.lift}
              </Text>
              <Text style={[styles.subDetailsTitle]}>Lift Mandatory</Text>
            </View>
            {/* <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>
                {customerFinalDetails.property_details.property_age}
              </Text>
              <Text style={[styles.subDetailsTitle]}>Age of Building</Text>
            </View> */}
          </View>
        </View>
      </View>
      {/* owner details */}
      <View style={styles.margin1}></View>
      {/* <View style={styles.overviewContainer}>
        <View style={styles.overview}>
          <Text>Owner</Text>
          <View style={styles.horizontalLine}></View>
          <View style={styles.ownerDetails}>
            <Text>{customerFinalDetails.owner_details.name}</Text>
            <Text>{customerFinalDetails.owner_details.address}</Text>
            <Text>+91 {customerFinalDetails.owner_details.mobile1}</Text>
          </View>
        </View>
      </View> */}

      <View style={{ margin: 20 }}>
        <Button title="ADD" onPress={() => send()} />
      </View>
    </ScrollView>
  ) : null;
};

const styles = StyleSheet.create({
  card: {
    shadowOpacity: 0.0015 * 5 + 0.18,
    shadowRadius: 0.54 * 5,
    shadowOffset: {
      height: 0.6 * 5
    },
    backgroundColor: "#ffffff"
  },
  cardImage: {
    alignSelf: "stretch",
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "stretch"
  },
  headerContainer: {
    // flexDirection: "column",
    // alignItems: "flex-start",
    // paddingRight: 16,
    // paddingLeft: 16,
    // paddingBottom: 16,
    // paddingTop: 16,
    // backgroundColor: "#d1d1d1"
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
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#C0C0C0",
    backgroundColor: "rgba(220,220,220, 0.80)"
  },

  details: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  subDetails: {
    paddingBottom: 20
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
    height: "70%",
    width: 1,
    backgroundColor: "#909090"
  },

  horizontalLine: {
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 10
  },
  overviewContainer: {
    shadowOpacity: 0.0015 * 5 + 0.18,
    shadowRadius: 0.54 * 5,
    shadowOffset: {
      height: 0.6 * 5
    },
    backgroundColor: "#ffffff"
  },
  overview: {
    padding: 10
  },
  overviewSubDetailsRow: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 15
  },

  overviewColumnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10
  },
  overviewLeftColumn: {
    flexDirection: "column",
    justifyContent: "center"
  },
  overviewRightColumn: {
    flexDirection: "column",
    justifyContent: "center"
  },
  margin1: {
    marginTop: 2
    // paddingTop: 5
  },
  ownerDetails: {
    paddingTop: 10,
    paddingBottom: 10
  }
});

export default AddNewCustomerRentResidentialFinalDetails;
