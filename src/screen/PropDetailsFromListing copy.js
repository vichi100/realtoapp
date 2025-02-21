import React, { Component, useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
  useWindowDimensions,
  FlatList
} from "react-native";
import Slideshow from "../components/Slideshow";
import { numDifferentiation } from "../util/methods";
import Feather from "react-native-vector-icons/Feather";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import AccordionListItem from '../components/AccordionListItem';
import { TabView, SceneMap } from 'react-native-tab-view';

const PropDetailsFromListing = props => {
  const item = props.propertyDetails;
  const scrollViewRef = useRef();
  const tabViewRef = useRef();

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  const scrollToAccordion = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  const getMatched = () => {
    props.navigation.navigate('ResidentialMatchedCustomerList');
  }

  const FirstRoute = () => (
    <FlatList
      data={Array.from({ length: 100 }, (_, i) => ({ key: `Item ${i + 1}` }))}
      renderItem={({ item }) => <Text style={{ color: '#000', padding: 10 }}>{item.key}</Text>}
      keyExtractor={item => item.key}
      onScrollEndDrag={({ nativeEvent }) => {
        if (nativeEvent.contentOffset.y <= 0) {
          scrollViewRef.current?.scrollTo({ y: '50%', animated: true });
        }
      }}
    />
  );
  
  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7', padding: 20 }} >
      <Text style={{color:'#000'}}>Second</Text>
    </View>
  );
  
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <ScrollView style={[styles.container]} ref={scrollViewRef}>
      <View style={[styles.headerContainer]}>
        <Text style={[styles.title]}>
          Rent {item.property_address.flat_number},{" "} {item.property_address.building_name},{" "}
          {item.property_address.landmark_or_street}
        </Text>
        <Text style={[StyleSheet.subTitle]}>
          {item.property_address.formatted_address}
        </Text>
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
      <AccordionListItem title="Details" onPress={scrollToAccordion}>
        <View style={[styles.overviewContainer, { width: '100%' }]}>
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
      <AccordionListItem title="Owner" onPress={scrollToAccordion}>
        <View style={styles.ownerDetails}>
          <Text>{item.owner_details.name}</Text>
          <Text>{item.owner_details.address}</Text>
          <Text>+91 {item.owner_details.mobile1}</Text>
        </View>
      </AccordionListItem>
      <View style={{flexDirection:'row', justifyContent:'space-between', padding: 10}}>
        <Text style={{ color: "#000" }}>Mettings Details</Text>
        <Text style={{ color: "#000" }}>10:30</Text>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{ height: 900 }} // Ensure the TabView has a fixed height
        ref={tabViewRef}
      />
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
    flexDirection: "column",
    alignItems: "flex-start",
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    paddingTop: 16,
    backgroundColor: "#d1d1d1"
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
