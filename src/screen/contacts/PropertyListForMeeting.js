import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

import { BottomSheet } from "react-native-btr";
import { ButtonGroup } from "react-native-elements";
import { HelperText, useTheme } from "react-native-paper";
import Button from "../../components/Button";
import { Divider } from "react-native-paper";
import { SocialIcon } from "react-native-elements";
import Slider from "../../components/Slider";
import CardResidentialRent from "../Card";
import CardResidentialSell from "../CardSell";
import axios from "axios";
import SERVER_URL from "../../util/constant";
import { getBottomSpace } from "react-native-iphone-x-helper";

import CardRent from "../commercial/rent/Card";
import CardSell from "../commercial/sell/Card"; //"../commercial/sell/Card";

const PropertyListForMeeting = props => {
  const { navigation } = props;
  const propertyType = props.route.params.property_type;
  const propertyFor = props.route.params.property_for;
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [index, setIndex] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // console.log(
    //   "props.userDetail33 " +
    //     JSON.stringify(props.userDetails.user_details.works_for[0])
    // );
    if (
      props.userDetails &&
      props.userDetails.user_details.works_for[0] !== null
    ) {
      getListing();
    }
    console.log("residential Listing useEffect");
  }, [props.userDetails]);

  // const getAgentDetails = async () => {
  //   // AsyncStorage.setItem("agent_details", JSON.stringify(agentDetails));
  //   const agentDetailsStr = await AsyncStorage.getItem("user_details");
  //   console.log(agentDetailsStr);
  //   if (agentDetailsStr !== null) {
  //     return JSON.parse(agentDetailsStr);
  //   } else {
  //     return null;
  //   }
  // };

  const getListing = () => {
    // const agentDetailsX = getAgentDetails();
    console.log("props.userDetail3 " + JSON.stringify(props.userDetails));
    const user = {
      agent_id: props.userDetails.user_details.works_for[0],
      property_type: propertyType,
      property_for: propertyFor
    };
    console.log(JSON.stringify(user));
    axios("http://192.168.43.64:3000/getPropertyListingForMeeting", {
      // getPropertyListingForMeeting
      method: "post",
      headers: {
        "Content-type": "Application/json",
        Accept: "Application/json"
      },
      data: user
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
    // console.log(item);
    if (item.property_type === "Residential") {
      if (item.property_for === "Rent") {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate("PropDetailsFromListing", item)}
          >
            <CardResidentialRent
              navigation={navigation}
              item={item}
              disableDrawer={true}
              displayCheckBox={true}
            />
          </TouchableOpacity>
        );
      } else if (item.property_for === "Sell") {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("PropDetailsFromListingForSell", item)
            }
          >
            <CardResidentialSell
              navigation={navigation}
              item={item}
              disableDrawer={true}
              displayCheckBox={true}
            />
          </TouchableOpacity>
        );
      }
    } else if (item.property_type === "Commercial") {
      if (item.property_for === "Rent") {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CommercialRentPropDetails", item)
            }
          >
            <CardRent
              navigation={navigation}
              item={item}
              disableDrawer={true}
              displayCheckBox={true}
            />
          </TouchableOpacity>
        );
      } else if (item.property_for === "Sell") {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CommercialSellPropDetails", item)
            }
          >
            <CardSell
              navigation={navigation}
              item={item}
              disableDrawer={true}
              displayCheckBox={true}
            />
          </TouchableOpacity>
        );
      }
    }
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

  const navigateTo = () => {
    navigation.navigate("Add");
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
      {data.length > 0 ? (
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
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
          }}
        >
          <Text style={{ textAlign: "center" }}>
            You have no property listing
          </Text>
          <TouchableOpacity onPress={() => navigateTo()}>
            <Text
              style={{ color: "#00BFFF", textAlign: "center", marginTop: 20 }}
            >
              Add New Property
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
                buttons={["RENT", "Sell"]}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 350 }}
                containerBorderRadius={10}
              />
            </View>
            {/* <Text style={styles.marginBottom10}>Property type</Text>
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
            </View> */}
            <Text style={styles.marginBottom10}>Home type</Text>
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
            <Text style={styles.marginBottom10}>BHK type</Text>
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
            <Text style={styles.marginBottom10}>Furnishing</Text>
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
      <TouchableOpacity
        style={{
          // borderWidth: 1,
          // borderColor: "rgba(0,0,0,0.2)",
          alignItems: "center",
          justifyContent: "center",
          // width: 40,
          position: "absolute",
          bottom: 15,
          right: 10,
          // height: 40,
          backgroundColor: "#f73378",
          borderRadius: 100
        }}
        onPress={() => navigation.navigate("Add")}
      >
        <AntDesign name="pluscircleo" size={40} color="#ffffff" />
        {/* <Image style={{ width: 50, height: 50, resizeMode: 'contain' }} source={require('assets/imgs/group.png')} /> */}
      </TouchableOpacity>
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

const mapStateToProps = state => ({
  userDetails: state.AppReducer.userDetails
});
export default connect(
  mapStateToProps,
  null
)(PropertyListForMeeting);

// export default ListingResidential;
