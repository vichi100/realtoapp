import React, { Component } from "react";
import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
import Slideshow from "../components/Slideshow";

const PropDetailsFromListing = () => {
  return (
    <ScrollView style={[styles.container]}>
      <View style={[styles.headerContainer]}>
        <Text style={[styles.title]}>
          2 BHK For Rent In Anant Villa, Koregaon Park
        </Text>
        <Text style={[StyleSheet.subTitle]}>
          Meera Nagar, Near Marvel Exotica
        </Text>
      </View>
      {/* <Image
        source={require("../../assets/images/p1.jpg")}
        resizeMode={"stretch"}
        resizeMethod={"resize"}
        style={{ width: "100%", height: 200 }}
      /> */}
      <Slideshow
        dataSource={[
          { url: "http://placeimg.com/640/480/any" },
          { url: "http://placeimg.com/640/480/any" },
          { url: "http://placeimg.com/640/480/any" }
        ]}
      />
      <View style={[styles.detailsContainer]}>
        <View style={[styles.details]}>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>2</Text>
            <Text style={[styles.subDetailsTitle]}>BHK</Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>20000</Text>
            <Text style={[styles.subDetailsTitle]}>Rent</Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>90000</Text>
            <Text style={[styles.subDetailsTitle]}>Deposit</Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>Full</Text>
            <Text style={[styles.subDetailsTitle]}>Furnishing</Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>800 sqft</Text>
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
              <Text style={[styles.subDetailsValue]}>2</Text>
              <Text style={[styles.subDetailsTitle]}>Bathroom</Text>
            </View>
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>Immediately</Text>
              <Text style={[styles.subDetailsTitle]}>Possession</Text>
            </View>
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>Anyone</Text>
              <Text style={[styles.subDetailsTitle]}>Preferred Tenant</Text>
            </View>
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>Yes</Text>
              <Text style={[styles.subDetailsTitle]}>Lift</Text>
            </View>
          </View>
          <View style={styles.overviewRightColumn}>
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>1</Text>
              <Text style={[styles.subDetailsTitle]}>Parking</Text>
            </View>
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>3/6</Text>
              <Text style={[styles.subDetailsTitle]}>Floor</Text>
            </View>
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>Yes</Text>
              <Text style={[styles.subDetailsTitle]}>NonVeg</Text>
            </View>
            <View style={[styles.subDetails]}>
              <Text style={[styles.subDetailsValue]}>7 years</Text>
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
            <Text>Vichitra Rajan</Text>
            <Text>Flat 305, ZA tower, Yarri road, Mumbai</Text>
            <Text>+91 9833097595</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
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
    backgroundColor: "white"
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

export default PropDetailsFromListing;
