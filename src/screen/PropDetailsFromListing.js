import React, { Component, useRef , useState, useEffect} from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  ActivityIndicator
} from "react-native";
import Slideshow from "../components/Slideshow";
import { numDifferentiation } from "../util/methods";
import Feather from "react-native-vector-icons/Feather";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import AccordionListItem from '../components/AccordionListItem';
import { MaterialIcons } from "@expo/vector-icons";
import PropertyReminder from './PropertyReminder';
import { SERVER_URL } from "../util/constant";
import axios from "axios";

const PropDetailsFromListing = props => {
  const { navigation } = props;
  const item = props.propertyDetails;
  const scrollViewRef = useRef();
  const [reminderListX, setReminderListX] = useState([]);
  const [loading, setLoading] = useState(false);

  const scrollToAccordion = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  const getMatched = () => {
    props.navigation.navigate('ResidentialMatchedCustomerList');
  }

  const getPropReminders = () => {
    // console.log("item getPropReminders: " + propertyIdX);
    const propertyId = {
      property_id: item.property_id
    };
    setLoading(true);

    axios
      .post(
        SERVER_URL + "/getPropReminderList",
        // SERVER_URL + "/addNewResidentialRentProperty",
        // await AsyncStorage.getItem("property")
        // JSON.stringify({ vichi: "vchi" })
        propertyId
      )
      .then(
        response => {
          // console.log("response.data.length: " + response.data.length);
          // navigation.navigate("CardDetails");
          if (response.data && response.data.length > 0) {
            // const x = [...props.propReminderList, ...response.data];
            // // console.log("X: " + x);
            // props.setPropReminderList(response.data);
            setReminderListX(response.data);
            setLoading(false);
          } else {
            setReminderListX([]);
            setLoading(false);
          }
        },
        error => {
          setLoading(false);
          console.log(error);
        }
      );
  };
  useEffect(() => {
      // console.log("useEffect called: " + props.propReminderList.length);
      // if (props.propReminderList.length === 0) {
      // console.log("getPropReminders called");
      getPropReminders();
      // }
    }, []);

  return (
    <ScrollView style={[styles.container]} ref={scrollViewRef}>
      <View style={{ flexDirection: 'row', flex: 1, }}>
        <View style={{ flex: 1, minHeight: 100 }}>
          <View style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "flex-start",
            paddingRight: 16,
            paddingLeft: 16,
            // paddingBottom: 25,
            paddingTop: 16,
            // backgroundColor: "#d1d1d1",
          }}>
            <Text style={[styles.title]}>
              Rent {item.property_address.flat_number},{" "} {item.property_address.building_name},{" "}
              {item.property_address.landmark_or_street}
            </Text>
            <Text style={[StyleSheet.subTitle]}>
              {item.property_address.formatted_address}
            </Text>
          </View>
          <View style={{  flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginTop: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: '300', color: '#000' }}>Next Meeting </Text>
            <MaterialIcons name="alarm" size={20} color="black" />
            <Text style={{ fontSize: 14, fontWeight: '300', color: '#000' }}> 10:30</Text>
          </View>

        </View>

        <TouchableOpacity
          onPress={() => getMatched()}
          style={{ flexDirection: 'row', marginTop:8}}
        >
          <View style={{
            backgroundColor: 'rgba(234, 155, 20, 0.7)', position: 'absolute', right: 0, top: 0, alignItems: 'center', justifyContent: 'center',
            width: 38, height: 20, marginRight: 0
          }}>
            <Text style={{ fontSize: 15, fontWeight: '500', color: '#000', paddingLeft: 0 }}>20</Text>
          </View>
          <View style={{
            position: 'absolute', right: 0, top: 20, transform: [{ rotate: '270deg' }],
            backgroundColor: 'rgba(80, 200, 120, 0.7)', alignItems: 'center', justifyContent: 'center',
            width: 70, height: 35, padding: 0, marginRight: -15, marginTop: 20, marginBottom: 15,
          }}>
            <Text style={{ fontSize: 14, fontWeight: '300', color: '#000' }}>Matched</Text>
          </View>


        </TouchableOpacity>
      </View>
      <Slideshow
        dataSource={item.image_urls}
      />
      <View style={[styles.detailsContainer]}>
        <View style={[styles.details]}>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue, { paddingTop: 5 }]}>
              {item.property_details.bhk_type}
            </Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>
              {numDifferentiation(item.rent_details.expected_rent)}
            </Text>
            <Text style={[styles.subDetailsTitle]}>Rent</Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>
              {numDifferentiation(item.rent_details.expected_deposit)}
            </Text>
            <Text style={[styles.subDetailsTitle]}>Deposit</Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>
              {item.property_details.furnishing_status}
            </Text>
            <Text style={[styles.subDetailsTitle]}>Furnishing</Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={[styles.subDetails]}>
            <Text style={[styles.subDetailsValue]}>
              {item.property_details.property_size}sqft
            </Text>
            <Text style={[styles.subDetailsTitle]}>Buildup</Text>
          </View>
        </View>
      </View>

      <View style={styles.margin1}></View>
      <AccordionListItem title="Details" onPress={scrollToAccordion} open = {true}> 
        <View style={styles.overviewContainer}>
          {/* <View style={styles.overview}>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Text>Details</Text>
            <TouchableOpacity
              onPress={() => toggleBottomNavigationView()}
              style={styles.fabIcon2}
            >
              <Feather
                name="edit"
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalLine}></View>
        </View> */}
          <View style={styles.overviewColumnWrapper}>
            <View style={styles.overviewLeftColumn}>
              <View style={[styles.subDetails]}>
                <Text style={[styles.subDetailsValue]}>
                  {item.property_details.washroom_numbers}
                </Text>
                <Text style={[styles.subDetailsTitle]}>Bathroom</Text>
              </View>
              <View style={[styles.subDetails]}>
                <Text style={[styles.subDetailsValue]}>
                  {item.rent_details.available_from}
                </Text>
                <Text style={[styles.subDetailsTitle]}>Possession</Text>
              </View>
              <View style={[styles.subDetails]}>
                <Text style={[styles.subDetailsValue]}>
                  {item.rent_details.preferred_tenants}
                </Text>
                <Text style={[styles.subDetailsTitle]}>Preferred Tenant</Text>
              </View>
              <View style={[styles.subDetails]}>
                <Text style={[styles.subDetailsValue]}>
                  {item.property_details.lift}
                </Text>
                <Text style={[styles.subDetailsTitle]}>Lift</Text>
              </View>
            </View>
            <View style={styles.overviewRightColumn}>
              <View style={[styles.subDetails]}>
                <Text style={[styles.subDetailsValue]}>
                  {item.property_details.parking_number}{" "}
                  {item.property_details.parking_type}
                </Text>
                <Text style={[styles.subDetailsTitle]}>Parking</Text>
              </View>
              <View style={[styles.subDetails]}>
                <Text style={[styles.subDetailsValue]}>
                  {item.property_details.floor_number}/
                  {item.property_details.total_floor}
                </Text>
                <Text style={[styles.subDetailsTitle]}>Floor</Text>
              </View>
              <View style={[styles.subDetails]}>
                <Text style={[styles.subDetailsValue]}>
                  {item.rent_details.non_veg_allowed}
                </Text>
                <Text style={[styles.subDetailsTitle]}>NonVeg</Text>
              </View>
              <View style={[styles.subDetails]}>
                <Text style={[styles.subDetailsValue]}>
                  {item.property_details.property_age} years
                </Text>
                <Text style={[styles.subDetailsTitle]}>Age of Building</Text>
              </View>
            </View>
          </View>
        </View>
      </AccordionListItem>
      <View style={styles.margin1}></View>
      <AccordionListItem title="Owner" open = {false} onPress={scrollToAccordion}>
        <View style={styles.ownerDetails}>
          <Text>{item.owner_details.name}</Text>
          <Text>{item.owner_details.address}</Text>
          <Text>+91 {item.owner_details.mobile1}</Text>
        </View>
      </AccordionListItem>
      {/* <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
        <Text style={{ color: "#000" }}>Mettings Details</Text>
      </View> */}
      {loading ? <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(245,245,245, .4)'
                  }}
                >
                  <ActivityIndicator animating size="large" color={'#000'} />
                  {/* <ActivityIndicator animating size="large" /> */}
                </View> : <PropertyReminder navigation={navigation} reminderListX={reminderListX}/>}
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
        <Text style={{ color: "#000" }}>Matched Customer</Text>
        <Text style={{ color: "#000" }}>20</Text>
      </View> */}
      {/* <View style={[styles.media]}>

        <TouchableOpacity
          onPress={() => getMatched()}
          style={{ padding: 15, backgroundColor: 'rgba(80, 200, 120, 0.7)' }}
        >
          <Text style={{ color: "#000" }}>Matched Customers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onClickMeeting(item)}
          style={{ padding: 15, backgroundColor: "#ffd600", marginLeft: 5 }}
        >
          <Text style={{ color: "#000" }}>Mettings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => makeCall(item.owner_details.mobile1)}
          style={{ padding: 15, backgroundColor: "#00bfa5" }}
        >
          <Ionicons name="call" color={"#ffffff"} size={30} />
        </TouchableOpacity>
      </View> */}

      {/* <View style={[styles.media]}>

        <TouchableOpacity
          onPress={() => onShare()}
          style={{ padding: 15, backgroundColor: "#0091ea" }}
        >
          <Ionicons name="share-social" color={"#ffffff"} size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onClickMeeting(item)}
          style={{ padding: 15, backgroundColor: "#ffd600" }}
        >
          <Ionicons
            name="alarm-outline"
            color={"#ffffff"}
            size={35}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => makeCall(item.owner_details.mobile1)}
          style={{ padding: 15, backgroundColor: "#00bfa5" }}
        >
          <Ionicons name="call" color={"#ffffff"} size={30} />
        </TouchableOpacity>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  media: {
    padding: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
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
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 25,
    paddingTop: 16,
    backgroundColor: "#d1d1d1",

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
    flex: 1,
    width: "100%",
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
  },
  ownerDetails: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 20,
    width: "100%",
  }
});

const mapStateToProps = state => ({
  userDetails: state.AppReducer.userDetails,
  anyItemDetails: state.AppReducer.anyItemDetails,
  propertyDetails: state.AppReducer.propertyDetails
});
export default connect(
  mapStateToProps,
  null
)(PropDetailsFromListing);
