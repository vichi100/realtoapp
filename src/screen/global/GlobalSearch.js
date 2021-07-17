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
import { ButtonGroup } from "react-native-elements";
import Button from "../../components/Button";
import axios from "axios";
import {SERVER_URL} from "../../util/constant";
import { getBottomSpace } from "react-native-iphone-x-helper";
import {
  setResidentialPropertyList,
  setGlobalSearchResult
} from "../../reducers/Action";
import { addDays, numDifferentiation } from "../../util/methods";
import Snackbar from "../../components/SnackbarComponent";
// https://github.com/iRoachie/react-native-material-tabs
import MaterialTabs from "react-native-material-tabs";
// import Button from "../../components/Button";
// Dynamic query
// https://stackoverflow.com/questions/29831164/how-to-filter-in-mongodb-dynamically#:~:text=answer%20was%20accepted%E2%80%A6-,var%20fName%3D%22John%22%2C%20fCountry%3D%22US%22,fName%7D)%3B%20%7D%20if%20(fCountry%20!%3D%3D

const propertyTypeArray = ["Residential", "Commercial"];

const GlobalSearch = props => {
  const { navigation } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [propertyTypeIndex, setPropertyTypeIndex] = useState(-1);
  const [selectedTab, setSelectedTab] = useState(0);

  const selectPropertyType = index => {
    setPropertyTypeIndex(index);
    setIsVisible(false);
  };

  const [message, setMessage] = useState(
    "Find matching properties posted by other agents"
  );

  const dismissSnackBar = () => {
    setIsVisible(false);
  };

  const onSubmit = () => {
    if (propertyTypeIndex === -1) {
      setErrorMessage("Please select a type Residential / Commercial");
      setIsVisible(true);
      return;
    }
    // const agentDetailsX = getAgentDetails();
    // console.log("props.userDetail3 " + JSON.stringify(props.userDetails));
    const user = {
      agent_id: props.userDetails.user_details.works_for[0],
      selectedTab: selectedTab,
      propertyTypeIndex: propertyTypeIndex
    };
    // // console.log(JSON.stringify(user));
    axios(SERVER_URL+"/getAllGlobalListingByLocations", {
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
        props.setGlobalSearchResult(response.data);
        if (selectedTab === 0) {
          if (propertyTypeIndex === 0) {
            navigation.navigate("GlobalResidentialPropertySearchResult");
          } else if (propertyTypeIndex === 1) {
            navigation.navigate("GlobalCommercialPropertySearchResult");
          }
        } else if (selectedTab == 1) {
          if (propertyTypeIndex === 0) {
            navigation.navigate("GlobalResidentialContactsSearchResult");
          } else if (propertyTypeIndex === 1) {
            navigation.navigate("GlobalCommercialCustomersSearchResult");
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  };

  const onTabSelect = index => {
    // console.log(index);
    setSelectedTab(index);
    setPropertyTypeIndex(-1);
    if (index === 0) {
      setMessage("Find matching properties posted by other agents");
    } else if (index === 1) {
      setMessage("Find matching customers posted by other agents");
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#ffffff",
        flex: 1
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          justifyContent: "center"
        }}
      >
        <View style={{ marginLeft: 30, marginRight: 30 }}>
          <MaterialTabs
            items={["Property", "Customer"]}
            selectedIndex={selectedTab}
            onChange={onTabSelect}
            barColor="#ffffff"
            textStyle={{ color: "#636466" }}
            indicatorColor="rgba(137, 196, 244, 1)"
            activeTextColor="white"
          />
        </View>

        <View style={{ backgroundColor: "#f2eeeb", marginBottom: "50%" }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ButtonGroup
              selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
              onPress={selectPropertyType}
              selectedIndex={propertyTypeIndex}
              buttons={propertyTypeArray}
              // containerStyle={{ height: 30 }}
              textStyle={{ textAlign: "center" }}
              selectedTextStyle={{ color: "#fff" }}
              containerStyle={{ borderRadius: 10, width: 350 }}
              containerBorderRadius={0}
            />
          </View>
          <Text
            style={{
              marginBottom: 10,
              color: "#636466",
              marginTop: 20,
              textAlign: "center"
            }}
          >
            {message}
          </Text>

          <View
            style={{
              flexDirection: "row",
              margin: 3
            }}
          >
            <TextInput
              style={styles.textInputStyle}
              onChangeText={text => searchFilterFunction(text)}
              value={search}
              underlineColorAndroid="transparent"
              placeholder="Global | Search by multiple locations"
            />
            <View style={{ position: "absolute", right: 5, paddingTop: 10 }}>
              <MaterialCommunityIcons
                name="search-web"
                color={"#86b9d4"}
                size={26}
              />
            </View>
          </View>
          <View style={{ marginTop: 40, marginLeft: 20, marginRight: 20 }}>
            <Button title="SEARCH" onPress={() => onSubmit()} />
          </View>
        </View>
        <Snackbar
          visible={isVisible}
          textMessage={errorMessage}
          position={"top"}
          actionHandler={() => dismissSnackBar()}
          actionText="OK"
        />
      </View>
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
  setGlobalSearchResult
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalSearch);

// export default ListingResidential;
