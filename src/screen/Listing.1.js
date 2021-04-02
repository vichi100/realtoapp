import React from "react";
import { FlatList, View, Text, SafeAreaView, StyleSheet } from "react-native";
import Card from "./Card";

const data = [
  {
    id: "10000",
    property: "residential",
    property_type: "apartment",
    bhk: "2",
    washrooms: "2",
    furnishing: "full",
    parking: "2",
    parking_for: "car",
    property_age: "10",
    floor: "3 / 4",
    lift: "yes",
    property_area: "800",
    possession: "immediate",
    preferred_tenant: "anyone",
    rent: "15000",
    deposit: "90000",
    location: "Andheri west",
    address_line1: "Flat 305, ZA Tower",
    address_line2: "yarri road, versova"
  },
  {
    id: "10000",
    property: "residential",
    property_type: "apartment",
    bhk: "2",
    washrooms: "2",
    furnishing: "full",
    parking: "2",
    parking_for: "car",
    property_age: "10",
    floor: "3 / 4",
    lift: "yes",
    property_area: "800",
    possession: "immediate",
    preferred_tenant: "anyone",
    rent: "15000",
    deposit: "90000",
    location: "Andheri west",
    address_line1: "Flat 305, ZA Tower",
    address_line2: "yarri road, versova"
  },
  {
    id: "10000",
    property: "residential",
    property_type: "apartment",
    bhk: "2",
    washrooms: "2",
    furnishing: "full",
    parking: "2",
    parking_for: "car",
    property_age: "10",
    floor: "3 / 4",
    lift: "yes",
    property_area: "800",
    possession: "immediate",
    preferred_tenant: "anyone",
    rent: "15000",
    deposit: "90000",
    location: "Andheri west",
    address_line1: "Flat 305, ZA Tower",
    address_line2: "yarri road, versova"
  }
];

function Detail(props) {
  const ItemView = ({ item }) => {
    // console.log("hi");
    return (
      // Single Comes here which will be repeatative for the FlatListItems

      <Card>{item.id}</Card>
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={data}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.container}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 30
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});

export default Detail;
