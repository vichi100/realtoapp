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
import Button from "../components/Button";
import { Divider } from "react-native-paper";
import { SocialIcon } from "react-native-elements";
import Slider from "../components/Slider";
import SliderX from "../components/SliderX";
import CardResidentialRent from "./Card";
import CardResidentialSell from "./CardSell";
import axios from "axios";
import { SERVER_URL } from "../util/constant";
import { getBottomSpace } from "react-native-iphone-x-helper";
import {
  setResidentialPropertyList,
  setAnyItemDetails,
  setPropertyDetails
} from "../reducers/Action";
import { addDays, numDifferentiation } from "../util/methods";
import Snackbar from "../components/SnackbarComponent";

// Dynamic query
// https://stackoverflow.com/questions/29831164/how-to-filter-in-mongodb-dynamically#:~:text=answer%20was%20accepted%E2%80%A6-,var%20fName%3D%22John%22%2C%20fCountry%3D%22US%22,fName%7D)%3B%20%7D%20if%20(fCountry%20!%3D%3D

const lookingForArray = ["Rent", "Sell"];
const homeTypeArray = ["Apartment", "Villa", "Independent House"];
const bhkTypeArray = ["1RK", "1BHK", "2BHK", "3BHK", "4BHK", "4+BHK"];
const availabilityArray = ["Immediate", "15 Days", "30 Days", "30+ Days"];
const furnishingStatusArray = ["Full", "Semi", "Empty"];
const lookingForArraySortBy = ["Rent", "Sell"];
const sortByRentArray = ["Lowest First", "Highest First"];
const sortByAvailabilityArray = ["Earliest First", "Oldest First"];
const sortByPostedDateArray = ["Recent First", "Oldest Fist"];

const ListingResidential = props => {
  const { navigation } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleSorting, setVisibleSorting] = useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [index, setIndex] = useState(null);
  const [data, setData] = useState([]);
  const [lookingForIndex, setLookingForIndex] = useState(-1);
  const [homeTypeIndex, setHomeTypeIndex] = useState(-1);
  const [bhkTypeIndex, setBHKTypeIndex] = useState(-1);
  const [availabilityIndex, setAvailabilityIndex] = useState(-1);
  const [furnishingIndex, setFurnishingIndex] = useState(-1);
  const [minRent, setMinRent] = useState(5000);
  const [maxRent, setMaxRent] = useState(500000);
  const [minSell, setMinSell] = useState(1000000);
  const [maxSell, setMaxSell] = useState(100000000);
  const [sortByRentIndex, setSortByRentIndex] = useState(-1);
  const [sortByAvailabilityIndex, setSortByAvailabilityIndex] = useState(-1);
  const [sortByPostedDateIndex, setSortByPostedDateIndex] = useState(-1);
  const [lookingForIndexSortBy, setLookingForIndexSortBy] = useState(-1);

  const resetSortBy = () => {
    setLookingForIndexSortBy(-1);
    setSortByRentIndex(-1);
    setSortByAvailabilityIndex(-1);
    setSortByPostedDateIndex(-1);
    setData(props.residentialPropertyList);
  };

  const sortByPostedDate = index => {
    if (lookingForIndexSortBy === -1) {
      setErrorMessage("Looking for is missing in filter");
      setIsVisible(true);
      return;
    }
    setSortByPostedDateIndex(index);
    setSortByRentIndex(-1);
    setSortByAvailabilityIndex(-1);
    setVisibleSorting(false);
    let filterList = props.residentialPropertyList;
    if (lookingForIndexSortBy === 0) {
      filterList = filterList.filter(item => item.property_for === "Rent");
      if (sortByPostedDateArray[index] === "Recent First") {
        filterList.sort((a, b) => {
          return (
            new Date(a.create_date_time).getTime() -
            new Date(b.create_date_time).getTime()
          );
        });
      } else if (sortByPostedDateArray[index] === "Oldest Fist") {
        filterList.sort(
          (a, b) =>
            new Date(b.create_date_time).getTime() -
            new Date(a.create_date_time).getTime()
        );
      }
      setData(filterList);
    } else if (lookingForIndexSortBy === 1) {
      filterList = filterList.filter(item => item.property_for === "Sell");
      if (sortByPostedDateArray[index] === "Recent First") {
        filterList.sort((a, b) => {
          // console.log("a", a);
          return (
            new Date(a.create_date_time).getTime() -
            new Date(b.create_date_time).getTime()
          );
        });
      } else if (sortByPostedDateArray[index] === "Oldest Fist") {
        filterList.sort(
          (a, b) =>
            new Date(b.create_date_time).getTime() -
            new Date(a.create_date_time).getTime()
        );
      }
      setData(filterList);
    }
  };

  const sortByAvailability = index => {
    if (lookingForIndexSortBy === -1) {
      setErrorMessage("Looking for is missing in filter");
      setIsVisible(true);
      return;
    }
    setSortByAvailabilityIndex(index);
    setSortByRentIndex(-1);
    setSortByPostedDateIndex(-1);
    setVisibleSorting(false);
    let filterList = props.residentialPropertyList;
    if (lookingForIndexSortBy === 0) {
      filterList = filterList.filter(item => item.property_for === "Rent");
      if (sortByAvailabilityArray[index] === "Earliest First") {
        filterList.sort((a, b) => {
          // console.log("a", a);
          return (
            new Date(a.rent_details.available_from).getTime() -
            new Date(b.rent_details.available_from).getTime()
          );
        });
      } else if (sortByAvailabilityArray[index] === "Oldest First") {
        filterList.sort(
          (a, b) =>
            new Date(b.rent_details.available_from).getTime() -
            new Date(a.rent_details.available_from).getTime()
        );
      }
      setData(filterList);
    } else if (lookingForIndexSortBy === 1) {
      filterList = filterList.filter(item => item.property_for === "Sell");
      if (sortByAvailabilityArray[index] === "Earliest First") {
        filterList.sort((a, b) => {
          // console.log("a", a);
          return (
            new Date(a.rent_details.available_from).getTime() -
            new Date(b.rent_details.available_from).getTime()
          );
        });
      } else if (sortByAvailabilityArray[index] === "Oldest First") {
        filterList.sort(
          (a, b) =>
            new Date(b.rent_details.available_from).getTime() -
            new Date(a.rent_details.available_from).getTime()
        );
      }
      setData(filterList);
    }
  };

  const sortByRent = index => {
    console.log("onFilter:     ", props.residentialPropertyList);
    if (lookingForIndexSortBy === -1) {
      setErrorMessage("Looking for is missing in filter");
      setIsVisible(true);
      return;
    }
    setSortByRentIndex(index);
    setSortByAvailabilityIndex(-1);
    setSortByPostedDateIndex(-1);
    setVisibleSorting(false);
    let filterList = props.residentialPropertyList;
    if (lookingForIndexSortBy === 0) {
      filterList = filterList.filter(item => item.property_for === "Rent");
      // const x = filterList;
      console.log("filterList:   ", filterList);
      if (sortByRentArray[index] === "Lowest First") {
        filterList.sort((a, b) => {
          // console.log("a", a);
          return (
            parseFloat(a.rent_details.expected_rent) -
            parseFloat(b.rent_details.expected_rent)
          );
        });
      } else if (sortByRentArray[index] === "Highest First") {
        filterList.sort(
          (a, b) =>
            parseFloat(b.rent_details.expected_rent) -
            parseFloat(a.rent_details.expected_rent)
        );
      }
      setData(filterList);
    } else if (lookingForIndexSortBy === 1) {
      filterList = filterList.filter(item => item.property_for === "Sell");
      // const x = filterList;
      // console.log("filterList:   ", filterList);
      if (sortByRentArray[index] === "Lowest First") {
        filterList.sort((a, b) => {
          // console.log("a", a);
          return (
            parseFloat(a.sell_details.expected_sell_price) -
            parseFloat(b.sell_details.expected_sell_price)
          );
        });
      } else if (sortByRentArray[index] === "Highest First") {
        filterList.sort(
          (a, b) =>
            parseFloat(b.sell_details.expected_sell_price) -
            parseFloat(a.sell_details.expected_sell_price)
        );
      }
      setData(filterList);
    }
  };

  const resetFilter = () => {
    setLookingForIndex(-1);
    setHomeTypeIndex(-1);
    setBHKTypeIndex(-1);
    setAvailabilityIndex(-1);
    setFurnishingIndex(-1);
    setData(props.residentialPropertyList);
    setVisible(false);
    setMinRent(5000);
    setMaxRent(500000);
    setMinSell(1000000);
    setMaxSell(100000000);
  };

  const onFilter = () => {
    console.log("onFilter:     ", props.residentialPropertyList);
    if (lookingForIndex === -1) {
      setErrorMessage("Looking for is missing in filter");
      setIsVisible(true);
      return;
    }
    let filterList = props.residentialPropertyList;
    if (lookingForIndex > -1) {
      filterList = filterList.filter(
        item => item.property_for === lookingForArray[lookingForIndex]
      );
    }
    if (homeTypeIndex > -1) {
      filterList = filterList.filter(
        item =>
          item.property_details.house_type === homeTypeArray[homeTypeIndex]
      );
    }
    if (bhkTypeIndex > -1) {
      filterList = filterList.filter(
        item => item.property_details.bhk_type === bhkTypeArray[bhkTypeIndex]
      );
    }

    if (availabilityIndex > -1) {
      const oneDay = 24 * 60 * 60 * 1000;
      let possessionDate = new Date();
      const today = new Date();
      if (availabilityArray[availabilityIndex] === "Immediate") {
        possessionDate = addDays(today, 7); //new Date(today.getTime() + 15*24*60*60*1000)
        filterList = filterList.filter(
          item => possessionDate > new Date(item.rent_details.available_from)
        );
        // console.log(
        //   "possessionDate: ",
        //   new Date(filterList[0].rent_details.available_from)
        // );
      } else if (availabilityArray[availabilityIndex] === "15 Days") {
        possessionDate = addDays(today, 15);
        filterList = filterList.filter(
          item => possessionDate > new Date(item.rent_details.available_from)
        );
      } else if (availabilityArray[availabilityIndex] === "30 Days") {
        possessionDate = addDays(today, 30);
        filterList = filterList.filter(
          item => possessionDate > new Date(item.rent_details.available_from)
        );
      } else if (availabilityArray[availabilityIndex] === "30+ Days") {
        possessionDate = addDays(today, 30);
        filterList = filterList.filter(
          item => new Date(item.rent_details.available_from) > possessionDate
        );
      }
    }

    if (furnishingIndex > -1) {
      filterList = filterList.filter(
        item =>
          item.property_details.furnishing_status ===
          furnishingStatusArray[furnishingIndex]
      );
    }
    // // console.log("rent", minRent);
    // // console.log("rent", maxRent);
    // if (minRent > 5000 || maxRent < 500000) {
    //   // // console.log("rent");
    //   filterList = filterList.filter(
    //     item =>
    //       item.rent_details.expected_rent >= minRent &&
    //       item.rent_details.expected_rent <= maxRent
    //   );
    // }

    if (lookingForIndex === 0) {
      if (minRent > 5000 || maxRent < 500000) {
        // console.log("rent");
        filterList = filterList.filter(
          item =>
            item.rent_details.expected_rent >= minRent &&
            item.rent_details.expected_rent <= maxRent
        );
      }
    } else if (lookingForIndex === 1) {
      if (minSell > 1000000 || maxSell < 100000000) {
        // console.log("rent");
        filterList = filterList.filter(
          item =>
            item.sell_details.expected_sell_price >= minRent &&
            item.sell_details.expected_sell_price <= maxRent
        );
      }
    }

    setData(filterList);
    setVisible(false);
  };

  const dismissSnackBar = () => {
    setIsVisible(false);
  };
  const selectFurnishingIndex = index => {
    setFurnishingIndex(index);
  };

  const selectAvailabilityIndex = index => {
    setAvailabilityIndex(index);
  };

  const selectBHKTypeIndex = index => {
    setBHKTypeIndex(index);
  };

  const selectHomeTypeIndex = index => {
    setHomeTypeIndex(index);
  };

  const selectLookingForIndex = index => {
    setLookingForIndex(index);
    setIsVisible(false);
  };

  const selectLookingForIndexSortBy = index => {
    setLookingForIndexSortBy(index);
    setSortByRentIndex(-1);
    setSortByAvailabilityIndex(-1);
    setSortByPostedDateIndex(-1);
    setIsVisible(false);
  };

  useEffect(() => {
    // // console.log(
    //   "props.userDetail33 " +
    //     JSON.stringify(props.userDetails.works_for[0])
    // );
    if (
      props.userDetails &&
      props.userDetails.works_for[0] !== null
    ) {
      getListing();
    }
    // console.log("residential Listing useEffect");
  }, [props.userDetails]);

  const getListing = () => {
    // const agentDetailsX = getAgentDetails();
    // console.log("props.userDetail3 " + JSON.stringify(props.userDetails));
    const user = {
      agent_id: props.userDetails.works_for[0]
    };
    // // console.log(JSON.stringify(user));
    axios(SERVER_URL + "/residentialPropertyListings", {
      method: "post",
      headers: {
        "Content-type": "Application/json",
        Accept: "Application/json"
      },
      data: user
    }).then(
      response => {
        // console.log("response.data:      ", response.data);
        setData(response.data);
        props.setResidentialPropertyList(response.data);
      },
      error => {
        // console.log(error);
      }
    );
  };

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = props.residentialPropertyList.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData =
          item.property_address.building_name +
          item.property_address.landmark_or_street +
          item.property_address.formatted_address +
          item.owner_details.name +
          item.owner_details.mobile1;

        const textData = text.toUpperCase();
        return itemData.toUpperCase().indexOf(textData) > -1;
      });
      setData(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setData(props.residentialPropertyList);
      setSearch(text);
    }
  };

  const navigateToDetails = (item, propertyFor) => {
    // props.setAnyItemDetails(item);
    console.log("props.setPropertyDetails(item: )", item);
    props.setPropertyDetails(item);

    if (propertyFor === "Rent") {
      navigation.navigate("PropDetailsFromListing", item);
    } else if (propertyFor === "Sell") {
      navigation.navigate("PropDetailsFromListingForSell", item);
    }

  };

  const ItemView = ({ item }) => {
    // // console.log(item);
    if (item.property_type === "Residential") {
      if (item.property_for === "Rent") {
        return (
          <TouchableOpacity onPress={() => navigateToDetails(item, "Rent")}>
            <CardResidentialRent navigation={navigation} item={item} />
          </TouchableOpacity>
        );
      } else if (item.property_for === "Sell") {
        return (
          <TouchableOpacity onPress={() => navigateToDetails(item, "Sell")}>
            <CardResidentialSell navigation={navigation} item={item} />
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

  const setRentRange = values => {
    // // console.log("slider value min: ", values[0]);
    // // console.log("slider value max: ", values[1]);
    setMinRent(values[0]);
    setMaxRent(values[1]);
  };

  const setSellRange = values => {
    // console.log("slider value min: ", values[0]);
    // console.log("slider value max: ", values[1]);
    setMinSell(values[0]);
    setMaxSell(values[1]);
  };

  useEffect(() => {
    if (props.residentialPropertyList.length > 0) {
      setData(props.residentialPropertyList)
    }

  }, [props.residentialPropertyList])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="My property | Search by property address, owner"
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
            onPress={() => resetFilter()}
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            <MaterialCommunityIcons
              name="restart"
              color={"#000000"}
              size={30}
            />
          </TouchableOpacity>
          <ScrollView style={{ marginTop: 20, marginBottom: 20 }}>
            <Text style={styles.marginBottom10}>Looking For</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectLookingForIndex}
                selectedIndex={lookingForIndex}
                buttons={lookingForArray}
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
                onPress={selectHomeTypeIndex}
                selectedIndex={homeTypeIndex}
                buttons={homeTypeArray}
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
                onPress={selectBHKTypeIndex}
                selectedIndex={bhkTypeIndex}
                buttons={bhkTypeArray}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 350 }}
                containerBorderRadius={10}
              />
            </View>
            {/* <Text>Rent Range</Text>
            <Slider
              min={5000}
              max={500000}
              step={5000}
              onSlide={values => setMultiSliderValue(values)}
            /> */}
            {lookingForIndex === -1 ? null : lookingForIndex === 0 ? (
              <View>
                <Text>Rent Range</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10
                  }}
                >
                  <View>
                    <Text style={{ color: "rgba(108, 122, 137, 1)" }}>
                      {numDifferentiation(minRent)}
                    </Text>
                    <Text style={{ color: "rgba(108, 122, 137, 1)" }}>Min</Text>
                  </View>
                  <View>
                    <Text style={{ color: "rgba(108, 122, 137, 1)" }}>
                      {numDifferentiation(maxRent)}
                    </Text>
                    <Text style={{ color: "rgba(108, 122, 137, 1)" }}>Max</Text>
                  </View>
                </View>

                <Slider
                  min={5000}
                  max={500000}
                  step={5000}
                  onSlide={values => setRentRange(values)}
                />
              </View>
            ) : (
              <View>
                <Text>Sell Price Range</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10
                  }}
                >
                  <View>
                    <Text style={{ color: "rgba(108, 122, 137, 1)" }}>
                      {numDifferentiation(minSell)}
                    </Text>
                    <Text style={{ color: "rgba(108, 122, 137, 1)" }}>Min</Text>
                  </View>
                  <View>
                    <Text style={{ color: "rgba(108, 122, 137, 1)" }}>
                      {numDifferentiation(maxSell)}
                    </Text>
                    <Text style={{ color: "rgba(108, 122, 137, 1)" }}>Max</Text>
                  </View>
                </View>
                <SliderX
                  min={minSell}
                  max={maxSell}
                  step={500000}
                  onSlide={values => setSellRange(values)}
                />
              </View>
            )}
            <Text style={styles.marginBottom10}>Availability</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectAvailabilityIndex}
                selectedIndex={availabilityIndex}
                buttons={availabilityArray}
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
                onPress={selectFurnishingIndex}
                selectedIndex={furnishingIndex}
                buttons={furnishingStatusArray}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 350 }}
                containerBorderRadius={10}
              />
            </View>
            <Button title="Apply" onPress={() => onFilter()} />
          </ScrollView>
          <Snackbar
            visible={isVisible}
            textMessage={errorMessage}
            position={"top"}
            actionHandler={() => dismissSnackBar()}
            actionText="OK"
          />
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
          <TouchableOpacity
            onPress={() => resetSortBy()}
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            <MaterialCommunityIcons
              name="restart"
              color={"#000000"}
              size={30}
            />
          </TouchableOpacity>
          <ScrollView style={{ marginTop: 15, marginBottom: 20 }}>
            <Text style={styles.marginBottom10}>Looking For</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={selectLookingForIndexSortBy}
                selectedIndex={lookingForIndexSortBy}
                buttons={lookingForArraySortBy}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 350 }}
                containerBorderRadius={10}
              />
            </View>
            <Text style={styles.marginBottom10}>Rent</Text>
            <View style={styles.propSubSection}>
              <ButtonGroup
                selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
                onPress={sortByRent}
                selectedIndex={sortByRentIndex}
                buttons={sortByRentArray}
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
                onPress={sortByAvailability}
                selectedIndex={sortByAvailabilityIndex}
                buttons={sortByAvailabilityArray}
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
                onPress={sortByPostedDate}
                selectedIndex={sortByPostedDateIndex}
                buttons={sortByPostedDateArray}
                // containerStyle={{ height: 30 }}
                textStyle={{ textAlign: "center" }}
                selectedTextStyle={{ color: "#fff" }}
                containerStyle={{ borderRadius: 10, width: 350 }}
                containerBorderRadius={10}
              />
            </View>
          </ScrollView>
          <Snackbar
            visible={isVisible}
            textMessage={errorMessage}
            position={"top"}
            actionHandler={() => dismissSnackBar()}
            actionText="OK"
          />
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
          backgroundColor: "rgba(50, 195, 77, 0.59)",
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
  userDetails: state.AppReducer.userDetails,
  residentialPropertyList: state.AppReducer.residentialPropertyList
});
const mapDispatchToProps = {
  setResidentialPropertyList,
  setAnyItemDetails,
  setPropertyDetails
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingResidential);

// export default ListingResidential;
