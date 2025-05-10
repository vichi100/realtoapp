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
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

import { HelperText, useTheme } from "react-native-paper";
import Button from "../../components/Button";
import { Divider } from "react-native-paper";
import { SocialIcon } from "@rneui/themed";
import axios from "axios";
import { SERVER_URL } from "../../util/Constant";
import { getBottomSpace } from "react-native-iphone-x-helper";
import {
  setResidentialCustomerList,
  setAnyItemDetails
} from "../../reducers/Action";

const EmployeeList = props => {
  const { navigation } = props;
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // // console.log(
    //   "props.userDetail33 " +
    //     JSON.stringify(props.userDetails.works_for)
    // );
    if (
      props.userDetails &&
      props.userDetails.works_for !== null
    ) {
      getListing();
    }
    // console.log("residential Listing useEffect");
  }, [props.userDetails]);

 

  const getListing = () => {
    // const agentDetailsX = getAgentDetails();
    // console.log("props.userDetail3 " + JSON.stringify(props.userDetails));
    const user = {
      req_user_id: props.userDetails.works_for,
      agent_id: props.userDetails.works_for
    };
    setLoading(true);
    // console.log(JSON.stringify(user));
    axios(SERVER_URL + "/employeeList", {
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
        props.setResidentialCustomerList(response.data);
        setLoading(false);
      },
      error => {
        console.log(error);
        setLoading(false);
      }
    );
  };

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = props.residentialCustomerList.filter(function (item) {
        // Applying filter for the inserted text in search bar
        console.log(item)
        const itemData =
          item.customer_details.name +
          item.customer_details.address +
          item.customer_details.mobile1 +
          item.customer_locality.location_area.map(item => item.main_text).join(', ')
        // item.customer_locality.location_area;

        const textData = text.toUpperCase();
        return itemData.toUpperCase().indexOf(textData) > -1;
      });
      setData(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setData(props.residentialCustomerList);
      setSearch(text);
    }
  };

  const navigateToDetails = (item, propertyFor) => {
    props.setAnyItemDetails(item);
    if (propertyFor === "Rent") {
      navigation.navigate("CustomerDetailsResidentialRentFromList", {item:item,
        displayMatchCount: true, displayMatchPercent: false
      });
    } else if (propertyFor === "Buy") {
      navigation.navigate("CustomerDetailsResidentialBuyFromList", {item:item,
        displayMatchCount: true, displayMatchPercent: false
      });
    }
  };

  const deleteMe = (itemToDelete) =>{
    // console.log("props.setPropertyDetails(item: deleteMe: )", itemToDelete);
    setData((data) => data.filter((item) => item.customer_id !== itemToDelete.customer_id));
    //Fist delete for data
    

  }

  const ItemView = ({ item }) => {
    // // console.log(item);
    if (item.customer_locality.property_type === "Residential") {
      if (item.customer_locality.property_for === "Rent") {
        return (
          <TouchableOpacity onPress={() => navigateToDetails(item, "Rent")}>
            <ContactResidentialRentCard navigation={navigation} item={item} deleteMe={deleteMe}/>
          </TouchableOpacity>
        );
      } else if (item.customer_locality.property_for === "Buy") {
        return (
          <TouchableOpacity onPress={() => navigateToDetails(item, "Buy")}>
            <ContactResidentialSellCard navigation={navigation} item={item} deleteMe={deleteMe}/>
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

  const navigateTo = () => {
    navigation.navigate("AddNewCustomerStack");
  };


  useEffect(() => {
    if (props.residentialCustomerList.length > 0) {
      setData(props.residentialCustomerList)
    }

  }, [props.residentialCustomerList])

  return (
    loading ? <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(245,245,245, .4)'
      }}
    >
      <ActivityIndicator animating size="large" color={'#000'} />
      {/* <ActivityIndicator animating size="large" /> */}
    </View> :
      <View style={{ flex: 1 }}>
        
        <View style={styles.searchBar}>
        <AntDesign name="search1" size={20} color="#999" style={{marginRight: 5,}} />
          
          <TextInput
            style={styles.textInputStyle}
            onChangeText={text => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search by name, location"
            placeholderTextColor="#000" 
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
          <View style={styles.container}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
              }}
            >
              <Text style={{ textAlign: "center" }}>
                You have no Employee
              </Text>
              <TouchableOpacity onPress={() => navigateTo()}>
                <Text
                  style={{ color: "#00BFFF", textAlign: "center", marginTop: 20 }}
                >
                  Add New Employee
                </Text>
              </TouchableOpacity>
            </View>
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
          </View>)}
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
            backgroundColor: "rgba(0,191,255, .5)",
            borderRadius: 100
          }}
          onPress={() => navigation.navigate("AddNewCustomerStack")}
        >
          <AntDesign name="pluscircleo" size={40} color="#ffffff" />
          {/* <Image style={{ width: 50, height: 50, resizeMode: 'contain' }} source={require('assets/imgs/group.png')} /> */}
        </TouchableOpacity>
        {/* <Snackbar
        visible={isVisible}
        textMessage={errorMessage}
        position={"top"}
        actionHandler={() => dismissSnackBar()}
        actionText="OK"
      /> */}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5
    // alignContent: "center"
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
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
    height: "40%",
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
  residentialCustomerList: state.AppReducer.residentialCustomerList
});
const mapDispatchToProps = {
  setResidentialCustomerList,
  setAnyItemDetails
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeList);

// export default ListingResidential;
