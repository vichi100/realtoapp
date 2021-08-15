import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  AsyncStorage
} from "react-native";
import Slideshow from "../components/Slideshow";
import Button from "../components/Button";
import axios from "axios";
import { SERVER_URL } from "../util/constant";
import { numDifferentiation } from "../util/methods";
import Snackbar from "../components/SnackbarComponent";
import { setPropertyDetails, setResidentialPropertyList } from "../reducers/Action";
import { connect } from "react-redux";

const AddNewPropFinalDetails = props => {
  const { navigation } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [propertyFinalDetails, setPropertyFinalDetails] = useState(null);
  const [bhk, setBHK] = useState(null);
  const [possessionDate, setPossessionDate] = useState(null);

  useEffect(() => {
    if (propertyFinalDetails === null) {
      getPropFinalDetails();
    }
  }, [propertyFinalDetails]);

  useEffect(() => {
    if (propertyFinalDetails !== null) {
      let bhkTemp = propertyFinalDetails.property_details.bhk_type;
      if (bhkTemp.indexOf("RK") > -1) {
        setBHK(bhkTemp);
      } else {
        let x = bhkTemp.split("BHK");
        setBHK(x[0]);
      }
      const availableDateStr = propertyFinalDetails.rent_details.available_from;
      const availableDate = new Date(availableDateStr);
      const t = convert(availableDate);
      var today = new Date();
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const diffDays = Math.round((today - new Date(t)) / oneDay);
      // // console.log(diffDays);
      if (diffDays >= 0) {
        setPossessionDate("Immediately");
      } else {
        setPossessionDate(availableDateStr);
      }
    }
  }, [propertyFinalDetails]);

  const getPropFinalDetails = async () => {
    // const property = JSON.parse(await AsyncStorage.getItem("property"));
    const property = props.propertyDetails;
    setPropertyFinalDetails(property);
    // console.log(property);
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
    // console.log(await AsyncStorage.getItem("property"));
    // // console.log(
    //   "propertyFinalDetails: " + JSON.stringify(propertyFinalDetails)
    // );
    axios
      .post(
        SERVER_URL + "/addNewResidentialRentProperty",
        // SERVER_URL + "/addNewResidentialRentProperty",
        // await AsyncStorage.getItem("property")
        // JSON.stringify({ vichi: "vchi" })
        propertyFinalDetails
      )
      .then(
        response => {
          // console.log(response.data);
          if (response.data !== null) {
            // await AsyncStorage.removeItem("property");
            props.setPropertyDetails(null);
            props.setResidentialPropertyList([...props.residentialPropertyList, response.data])
            navigation.navigate("Listing");
          } else {
            setErrorMessage(
              "Error: Seems there is some network issue, please try later"
            );
          }
        },
        error => {
          // console.log(error);
        }
      );
  };

  return propertyFinalDetails ? (
    <ScrollView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={[styles.headerContainer]}>
        <Text style={[styles.title]}>
          {"Rent "}{propertyFinalDetails.property_address.flat_number},
          {propertyFinalDetails.property_address.building_name},

          {/* 2 BHK For Rent In Anant Villa, Koregaon Park */}
        </Text>
        <Text style={[StyleSheet.subTitle]}>
          {propertyFinalDetails.property_address.landmark_or_street},
          {propertyFinalDetails.property_address.location_area.formatted_address}
          {/* Meera Nagar, Near Marvel Exotica */}
        </Text>
      </View>
      <Slideshow
        dataSource={[
          { url: "http://placeimg.com/640/480/any" },
          { url: "http://placeimg.com/640/480/any" },
          { url: "http://placeimg.com/640/480/any" }
        ]}
      />
      {/* <Image
        source={require("../../assets/images/p1.jpg")}
        resizeMode={"stretch"}
        resizeMethod={"resize"}
        style={[StyleSheet.cardImage]}
      /> */}
      <View style={[styles.detailsContainer]}>
        <View style={[styles.details]}>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>{bhk}</Text>
            <Text style={[styles.subDetailsTitle]}>BHK</Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>
              {numDifferentiation(
                propertyFinalDetails.rent_details.expected_rent
              )}
            </Text>
            <Text style={[styles.subDetailsTitle]}>
              {propertyFinalDetails.property_for}
            </Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>
              {numDifferentiation(
                propertyFinalDetails.rent_details.expected_deposit
              )}
            </Text>
            <Text style={[styles.subDetailsTitle]}>Deposit</Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>
              {propertyFinalDetails.property_details.furnishing_status}
            </Text>
            <Text style={[styles.subDetailsTitle]}>Furnishing</Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>
              {propertyFinalDetails.property_details.property_size}sqft
            </Text>
            <Text style={[styles.subDetailsTitle]}>Buildup</Text>
          </View>
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
                {propertyFinalDetails.property_details.washroom_numbers}
              </Text>
              <Text style={[styles.subDetailsTitle]}>Bathroom</Text>
            </View>
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>{possessionDate}</Text>
              <Text style={[styles.subDetailsTitle]}>Possession</Text>
            </View>
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>
                {propertyFinalDetails.rent_details.preferred_tenants}
              </Text>
              <Text style={[styles.subDetailsTitle]}>Preferred Tenant</Text>
            </View>
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>
                {propertyFinalDetails.property_details.lift}
              </Text>
              <Text style={[styles.subDetailsTitle]}>Lift</Text>
            </View>
          </View>
          <View style={styles.overviewRightColumn}>
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>
                {propertyFinalDetails.property_details.parking_number}{" "}
                {propertyFinalDetails.property_details.parking_type}
              </Text>
              <Text style={[styles.subDetailsTitle]}>Parking</Text>
            </View>
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>
                {propertyFinalDetails.property_details.floor_number}/
                {propertyFinalDetails.property_details.total_floor}
              </Text>
              <Text style={[styles.subDetailsTitle]}>Floor</Text>
            </View>
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>
                {propertyFinalDetails.rent_details.non_veg_allowed}
              </Text>
              <Text style={[styles.subDetailsTitle]}>NonVeg</Text>
            </View>
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>
                {propertyFinalDetails.property_details.property_age}
              </Text>
              <Text style={[styles.subDetailsTitle]}>Age of Building</Text>
            </View>
          </View>
        </View>
      </View>
      {/* owner details */}
      <View style={styles.margin1}></View>
      <View style={styles.overviewContainer}>
        <View style={styles.overview}>
          <Text>Owner</Text>
          <View style={styles.horizontalLine}></View>
          <View style={styles.ownerDetails}>
            <Text>{propertyFinalDetails.owner_details.name}</Text>
            <Text>{propertyFinalDetails.owner_details.address}</Text>
            <Text>+91 {propertyFinalDetails.owner_details.mobile1}</Text>
          </View>
        </View>
      </View>

      <View style={{ margin: 20 }}>
        <Button title="ADD" onPress={() => send()} />
      </View>
      <Snackbar
        visible={isVisible}
        textMessage={errorMessage}
        position={"top"}
        actionHandler={() => dismissSnackBar()}
        actionText="OK"
      />
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
    flexDirection: "column",
    alignItems: "flex-start",
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    paddingTop: 16,
    backgroundColor: "#d1d1d1"
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


const mapStateToProps = state => ({
  propertyDetails: state.AppReducer.propertyDetails,
  userDetails: state.AppReducer.userDetails,
  residentialPropertyList: state.AppReducer.residentialPropertyList
});
const mapDispatchToProps = {
  setPropertyDetails,
  setResidentialPropertyList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewPropFinalDetails);



// export default AddNewPropFinalDetails;
