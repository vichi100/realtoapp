import React, { Component } from "react";
import { StyleSheet, View, Image, Text, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../components/Button";
import Slideshow from "../components/Slideshow";

const Card = props => {
  const { navigation } = props;
  return (
    <View style={styles.card}>
      <Slideshow
        dataSource={[
          { url: "http://placeimg.com/640/480/any" },
          { url: "http://placeimg.com/640/480/any" },
          { url: "http://placeimg.com/640/480/any" }
        ]}
      />
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "rgba(220,220,220, .9)"
        }}
      >
        <View style={[styles.headerContainer]}>
          <Text style={[styles.title]}>Rent In Anant Villa, Koregaon Park</Text>
          <Text style={[StyleSheet.subTitle]}>
            Meera Nagar, Near Marvel Exotica
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            height: "70%",
            width: 1,
            backgroundColor: "#ffffff"
          }}
        />
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "rgba(220,220,220, .9)",
            justifyContent: "center",
            alignItems: "center",
            paddingRight: 10
          }}
        >
          <Icon.Button
            name="alarm-outline"
            backgroundColor="transparent"
            color={"#ff4081"}
            onPress={() => navigation.navigate("Meeting")}
            size={30}
          />
          {/* <Icon.Button
            name="share-social-outline"
            backgroundColor="transparent"
            color={"red"}
            onPress={() => navigation.navigate("Meeting")}
            size={30}
          /> */}
        </View>
      </View>

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
            <Text style={[styles.subDetailsValue]}>Furnished</Text>
            <Text style={[styles.subDetailsTitle]}>Status</Text>
          </View>
          {/* <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>800 sqft</Text>
            <Text style={[styles.subDetailsTitle]}>Buildup</Text>
          </View> */}
        </View>
      </View>
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
    width: "93%"
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
  }
});

export default Card;
