import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput
} from "react-native";
import { CheckBox } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BottomSheet } from "react-native-btr";
import { ButtonGroup } from "react-native-elements";
import { HelperText, useTheme } from "react-native-paper";
import Button from "../components/Button";
import { Divider } from "react-native-paper";
import { SocialIcon } from "react-native-elements";
import Slider from "../components/Slider";
import CardRent from "./commercial/rent/Card";
import CardSell from "./commercial/sell/Card";
import axios from "axios";
import SERVER_URL from "../util/constant";

const buildingTypeArray = [
  "Businesses park ",
  "Mall",
  "StandAlone",
  "Industrial",
  "Shopping complex"
];

const dataX = [
  {
    id: "10000",
    property: "commercial",
    property_type: "shop",
    furnishing: "full",
    parking: "private", // private or public
    parking_for: "car",
    property_age: "10",
    floor: "3 / 4",
    lift: "yes",
    property_area: "800",
    possession: "immediate",
    building_type: "anyone",
    last_used_for: "shop",
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

const ListingCommercial = props => {
  const { navigation } = props;
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [index, setIndex] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    getListing();
    console.log("commercial Listing useEffect");
  }, []);

  const getListing = () => {
    const user = {
      name: "tom"
    };

    axios("http://172.20.10.2:3000/commercialPropertyListings", {
      method: "post",
      headers: {
        "Content-type": "Application/json",
        Accept: "Application/json"
      },
      data: { user }
    }).then(
      response => {
        // console.log(response.data);
        setData(response.data);
      },
      error => {
        console.log(error);
      }
    );
  };

  const getListingX = async () => {
    const filter = {
      agent_id: "123"
    };
    fetch(SERVER_URL + "addNewProperty", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => setData(json.movies))
      .catch(error => console.error(error))
      .finally(() => setIndex(0));
  };

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
    if (item.property_type === "Commercial") {
      if (item.property_for === "Rent") {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CommercialRentPropDetails", item)
            }
          >
            <CardRent navigation={navigation} item={item} />
          </TouchableOpacity>
        );
      } else if (item.property_for === "Sell") {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CommercialSellPropDetails", item)
            }
          >
            <CardSell navigation={navigation} item={item} />
          </TouchableOpacity>
        );
      }
    }

    // console.log("hi");
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
  const [visibleSorting, setVisibleSorting] = useState(false);

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

  const toggleSortingBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisibleSorting(!visibleSorting);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={data}
          //data defined in constructor
          // ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.fab}>
          <TouchableOpacity
            onPress={() => toggleSortingBottomNavigationView()}
            style={styles.fabIcon1}
          >
            <MaterialCommunityIcons name="sort" color={"#ffffff"} size={26} />
          </TouchableOpacity>
          <View style={styles.verticalLine}></View>
          <TouchableOpacity
            onPress={() => toggleBottomNavigationView()}
            style={styles.fabIcon2}
          >
            <MaterialCommunityIcons
              name="filter-variant-plus"
              color={"#ffffff"}
              size={26}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Bottom for filters */}
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
          <Text style={{ marginTop: 15, fontSize: 16, fontWeight: "600" }}>
            Filter
          </Text>

          <TouchableOpacity
            onPress={() => toggleBottomNavigationView()}
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            <MaterialCommunityIcons
              name="restart"
              color={"#000000"}
              size={30}
            />
          </TouchableOpacity>
          <ScrollView style={{ marginTop: 10, marginBottom: 20 }}>
            <Text style={styles.marginBottom10}>Looking For</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={updateIndex}
                selectedIndex={index}
                buttons={["Rent", "Sell"]}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 350 }}
                containerBorderRadius={10}
              />
            </View>

            <Text style={styles.marginBottom10}>Prop type</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={updateIndex}
                selectedIndex={index}
                buttons={[
                  "Shop",
                  "Office",
                  "Showroom",
                  "Godown",
                  "Restaurant/Cafe"
                ]}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 350 }}
                containerBorderRadius={10}
              />
            </View>
            <Text style={styles.marginBottom10}>Building type</Text>
            <View style={styles.propSubSection}>
              <FlatList
                data={buildingTypeArray}
                renderItem={({ item }) => (
                  <View style={{ flex: 1, flexDirection: "column", margin: 1 }}>
                    {/* <Text>{item}</Text> */}
                    <CheckBox
                      title={item}
                      checked={false}
                      onPress={() => onPess()}
                      containerStyle={{
                        backgroundColor: "#ffffff",
                        borderColor: "#ffffff",
                        margin: 0
                      }}
                      textStyle={{
                        fontSize: 12,
                        fontWeight: "400"
                      }}
                    />
                  </View>
                )}
                //Setting the number of column
                numColumns={2}
                keyExtractor={(item, index) => index}
              />
              {/* <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={updateIndex}
                selectedIndex={index}
                buttons={[
                  "Businesses park ",
                  "Mall",
                  "StandAlone",
                  "Industrial",
                  "Shopping complex"
                ]}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 350 }}
                containerBorderRadius={10}
              /> */}
            </View>
            <Text>Rent Range</Text>
            <Slider />
            <Text>Buildup area Range</Text>
            <Slider />
            <Text style={styles.marginBottom10}>Availability</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={updateIndex}
                selectedIndex={index}
                buttons={["Imidiate", "15 Days", "30 Days", "30+ Days"]}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 350 }}
                containerBorderRadius={10}
              />
            </View>

            <Button
              title="Apply"
              onPress={() => navigation.navigate("AddImages")}
            />
          </ScrollView>
        </View>
      </BottomSheet>

      {/* Bottom sheet for sorting */}
      <BottomSheet
        visible={visibleSorting}
        //setting the visibility state of the bottom shee
        onBackButtonPress={toggleSortingBottomNavigationView}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={toggleSortingBottomNavigationView}
        //Toggling the visibility state on the clicking out side of the sheet
      >
        {/*Bottom Sheet inner View*/}

        <View style={styles.sortingBottomNavigationView}>
          <Text style={{ marginTop: 15, fontSize: 16, fontWeight: "600" }}>
            Sort By
          </Text>

          <ScrollView style={{ marginTop: 10, marginBottom: 20 }}>
            <Text style={styles.marginBottom10}>Rent</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={updateIndex}
                selectedIndex={index}
                buttons={["Lowest First", "Highest First"]}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 350 }}
                containerBorderRadius={10}
              />
            </View>
            <Text style={styles.marginBottom10}>Availability</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={updateIndex}
                selectedIndex={index}
                buttons={["Earliest First", "Oldest First"]}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 350 }}
                containerBorderRadius={10}
              />
            </View>

            <Text style={styles.marginBottom10}>Posted date</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={updateIndex}
                selectedIndex={index}
                buttons={["Recent First", "Oldest Fist"]}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 350 }}
                containerBorderRadius={10}
              />
            </View>
          </ScrollView>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5
    // alignContent: "center"
  },
  fab: {
    flexDirection: "row",
    position: "absolute",
    width: 130,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    right: "33%",
    // left: 0,
    bottom: 10,
    backgroundColor: "rgba(128,128,128, 0.8)",
    borderRadius: 30,
    elevation: 8
  },
  verticalLine: {
    height: "100%",
    width: 2,
    backgroundColor: "#ffffff"
  },
  fabIcon1: {
    paddingRight: 20
  },
  fabIcon2: {
    paddingLeft: 20
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: "70%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  sortingBottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: "45%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  propSubSection: {
    marginBottom: 20
  },
  title: {
    fontSize: 16,
    fontWeight: "600"
  },
  bottomNavigationViewHeader: {
    position: "absolute",
    width: 130,
    // height: 35,
    alignItems: "center",
    justifyContent: "center",
    right: "33%",
    // left: 0,
    top: 10,
    marginBottom: 30
  },
  horizontal: {
    borderBottomColor: "black",
    borderBottomWidth: 5,
    marginLeft: 5,
    marginRight: 5
  },
  textInputStyle: {
    width: "98%",
    height: 40,
    // borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    // marginBottom: 5,
    borderRadius: 10,
    // borderColor: "#009688",
    backgroundColor: "#FFFFFF"
  },
  marginBottom10: {
    marginBottom: 10
  }
});

export default ListingCommercial;
