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
import { SERVER_URL, GOOGLE_PLACES_API_KEY } from "../../util/constant";
import { getBottomSpace } from "react-native-iphone-x-helper";
import {
  setResidentialPropertyList,
  setGlobalSearchResult
} from "../../reducers/Action";
import { addDays, numDifferentiation } from "../../util/methods";
import Snackbar from "../../components/SnackbarComponent";
// https://github.com/iRoachie/react-native-material-tabs
import MaterialTabs from "react-native-material-tabs";
// import {GooglePlacesAutocomplete} from '../GooglePlacesAutocomplete'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isShowingResults, setIsShowingResults] = useState(false);

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
      agent_id: props.userDetails.works_for[0],
      selectedTab: selectedTab,
      propertyTypeIndex: propertyTypeIndex
    };
    // // console.log(JSON.stringify(user));
    axios(SERVER_URL + "/getAllGlobalListingByLocations", {
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

  const searchLocation = async (text) => {
    console.log(GOOGLE_SEARCH_PLACES_API_KEY)
    setSearchKeyword(text)
    // this.setState({searchKeyword: text});
    axios
      .request({
        method: 'post',
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_SEARCH_PLACES_API_KEY}&input=${searchKeyword}`,
      })
      .then((response) => {
        // console.log(response.data);
        setSearchResults(response.data.predictions);
        setIsShowingResults(false)
        // this.setState({
        //   searchResults: response.data.predictions,
        //   isShowingResults: true,
        // });
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  const onSelectPlace = (data, details) => {
    console.log("details: ", JSON.stringify(details))
    console.log("data: ", JSON.stringify(data))
    // setSearchKeyword(item.description);
    // setIsShowingResults(false)
    // this.setState({
    //   searchKeyword: item.description,
    //   isShowingResults: false,
    // })
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#ffffff",
        flex: 1
      }}
    >
      {/* <ScrollView> */}
      <View style={{ marginLeft: 30, marginRight: 30, backgroundColor: "#f2eeeb" }}>
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
      <View style={{ backgroundColor: "#f2eeeb" }}>
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


      <View style={{
        flex: 1,
        margin: 5,
        // backgroundColor: "#A9A9A9"
      }}>
        <GooglePlacesAutocomplete
          placeholder="Search by area"
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: 'en', // language of the results
            components: 'country:in',
            // types: '(cities)'
            // types: ["address","cities", "locality", "sublocality"],
            // types: ["establishment"],
            // fields: ["formatted_address", "geometry", "name"],
            // fields: ["address_components"],
            // types: ["cities", "locality", "sublocality",]
          }}
          currentLocation={true}
          isRowScrollable={true}
          fetchDetails={true}
          onPress={(data, details) => onSelectPlace(data, details)}
          styles={{
            textInputContainer: {
              // backgroundColor: 'grey',
              // borderLeftWidth: 4,
              // borderRightWidth: 4,
              // height: 70
            },
            textInput: {
              height: 38,
              color: '#000000',
              fontSize: 16,
              borderColor: "#C0C0C0",
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderBottomWidth: 1,
              borderTopWidth: 1
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}

        // this in only required for use on the web. See https://git.io/JflFv more for details.
        />
        <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}>
          <Button title="SEARCH" onPress={() => onSubmit()} />
        </View>

      </View>
      {/* </ScrollView> */}
      <Snackbar
        visible={isVisible}
        textMessage={errorMessage}
        position={"top"}
        actionHandler={() => dismissSnackBar()}
        actionText="OK"
      />

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
