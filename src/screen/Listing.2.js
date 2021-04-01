import React, { useState } from "react";
import {
  FlatList,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BottomSheet } from "react-native-btr";
import { ButtonGroup } from "react-native-elements";
import { TextInput, HelperText, useTheme } from "react-native-paper";
import Button from "../components/Button";

import { SocialIcon } from "react-native-elements";
import Slider from "../components/Slider";
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
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [index, setIndex] = React.useState(null);

  const updateIndex = index => {
    setIndex(index);
  };

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function(item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    console.log("hi");
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

  const [visible, setVisible] = useState(false);

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={text => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
          />
          <Icon.Button
            name="filter-variant"
            backgroundColor="transparent"
            color={"red"}
            onPress={() => toggleBottomNavigationView()}
            size={30}
          ></Icon.Button>
        </View>

        <FlatList
          data={data}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
        <View onPress={() => alert("FAB clicked")} style={styles.floating}>
          <Text>+</Text>
        </View>
        {/* <Text style={styles.floating}>vichi</Text> */}
      </View>

      <View style={styles.container}></View>

      <BottomSheet
        visible={visible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={toggleBottomNavigationView}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={toggleBottomNavigationView}
        //Toggling the visibility state on the clicking out side of the sheet
      >
        {/*Bottom Sheet inner View*/}
        <View style={styles.bottomNavigationView}>
          <Text>Looking For</Text>
          <View style={styles.propSubSection}>
            <ButtonGroup
              selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
              onPress={updateIndex}
              selectedIndex={index}
              buttons={["RENT", "Sell"]}
              // containerStyle={{ height: 30 }}
              textStyle={{ textAlign: "center" }}
              selectedTextStyle={{ color: "#fff" }}
              containerStyle={{ borderRadius: 10, width: 350 }}
              containerBorderRadius={10}
            />
          </View>
          <Text>Property type</Text>
          <View style={styles.propSubSection}>
            <ButtonGroup
              selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
              onPress={updateIndex}
              selectedIndex={index}
              buttons={["Residential", "Commercial", "Any"]}
              // containerStyle={{ height: 30 }}
              textStyle={{ textAlign: "center" }}
              selectedTextStyle={{ color: "#fff" }}
              containerStyle={{ borderRadius: 10, width: 350 }}
              containerBorderRadius={10}
            />
          </View>
          <Text>Home type</Text>
          <View style={styles.propSubSection}>
            <ButtonGroup
              selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
              onPress={updateIndex}
              selectedIndex={index}
              buttons={["Apartment", "Villa", "Independent House", "Any"]}
              // containerStyle={{ height: 30 }}
              textStyle={{ textAlign: "center" }}
              selectedTextStyle={{ color: "#fff" }}
              containerStyle={{ borderRadius: 10, width: 350 }}
              containerBorderRadius={10}
            />
          </View>
          <Text>BHK type</Text>
          <View style={styles.propSubSection}>
            <ButtonGroup
              selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
              onPress={updateIndex}
              selectedIndex={index}
              buttons={["1RK", "1BHK", "2BHK", "3BHK", "4BHK", "4+BHK"]}
              // containerStyle={{ height: 30 }}
              textStyle={{ textAlign: "center" }}
              selectedTextStyle={{ color: "#fff" }}
              containerStyle={{ borderRadius: 10, width: 350 }}
              containerBorderRadius={10}
            />
          </View>
          <Text>Rent Range</Text>
          <Slider />
          <Text>Availability</Text>
          <View style={styles.propSubSection}>
            <ButtonGroup
              selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
              onPress={updateIndex}
              selectedIndex={index}
              buttons={["Immediate", "15 Days", "30 Days", "30+ Days"]}
              // containerStyle={{ height: 30 }}
              textStyle={{ textAlign: "center" }}
              selectedTextStyle={{ color: "#fff" }}
              containerStyle={{ borderRadius: 10, width: 350 }}
              containerBorderRadius={10}
            />
          </View>
          <Text>Furnishing</Text>
          <View style={styles.propSubSection}>
            <ButtonGroup
              selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
              onPress={updateIndex}
              selectedIndex={index}
              buttons={["Full", "Semi", "Empty", "Any"]}
              // containerStyle={{ height: 30 }}
              textStyle={{ textAlign: "center" }}
              selectedTextStyle={{ color: "#fff" }}
              containerStyle={{ borderRadius: 10, width: 350 }}
              containerBorderRadius={10}
            />
          </View>
        </View>
      </BottomSheet>
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
    // backgroundColor: "white"
  },
  floating: {
    textAlign: "center",
    justifyContent: "space-around",
    marginBottom: 90,
    // margin: 20,
    width: 200,
    height: 50,
    backgroundColor: "#03A9F4"
  },
  fab: {
    // position: "relative",
    // flex: 1,
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    // right: 20,
    bottom: 60,
    backgroundColor: "#03A9F4",
    borderRadius: 30,
    elevation: 8
  },
  fabIcon: {
    fontSize: 30,
    color: "white"
  },
  searchBarContainer: {
    flexDirection: "row"
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  textInputStyle: {
    width: "90%",
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    marginBottom: 5,
    borderRadius: 10,
    borderColor: "#009688",
    backgroundColor: "#FFFFFF"
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Detail;
