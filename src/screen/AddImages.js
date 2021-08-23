import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  Platform,
  AsyncStorage,
  Dimensions
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import PhotoGrid from "../components/PhotoGrid";
import Button from "../components/Button";
import { connect } from "react-redux";
import { setPropertyDetails } from "../reducers/Action";

let width = Dimensions.get('screen').width / 2 - 8

const AddImages = props => {
  const { navigation } = props;
  const [image, setImage] = useState(null);
  const [imageArray, setImageArray] = useState([]);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      const imageArrayX = [...imageArray];
      imageArrayX.push(result.uri);
      setImageArray(imageArrayX);
    }
  };

  const onSubmit = async () => {
    // const property = JSON.parse(await AsyncStorage.getItem("property"));
    const property = props.propertyDetails;
    property["image_urls"] = imageArray;

    // AsyncStorage.setItem("property", JSON.stringify(property));
    props.setPropertyDetails(property)
    // console.log(JSON.stringify(property));
    if (property.property_type.toLowerCase() === "Residential".toLowerCase()) {
      if (property.property_for.toLowerCase() === "Rent".toLowerCase()) {
        navigation.navigate("AddNewPropFinalDetails");
      } else if (property.property_for.toLowerCase() === "Sell".toLowerCase()) {
        navigation.navigate("AddNewPropSellFinalDetails");
      }
    } else if (
      property.property_type.toLowerCase() === "Commercial".toLowerCase()
    ) {
      if (property.property_for.toLowerCase() === "Rent".toLowerCase()) {
        navigation.navigate("AddNewPropCommercialRentFinalDetails");
      } else if (property.property_for.toLowerCase() === "Sell".toLowerCase()) {
        navigation.navigate("AddNewPropCommercialSellFinalDetails");
      }
    }
  };

  const ItemView = ({ item }) => {
    // // console.log("hi");
    return (
      // Single Comes here which will be repeatative for the FlatListItems
      // <Text>vichi</Text>
      <View style={{ margin: 2 }}>
        <Image source={{ uri: item }} style={{ width: 100, height: 200, resizeMode: 'contain' }} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            // flex: 1,
            alignItems: "center",
            justifyContent: "center",
            height: 500
          }}
        >
          <Button title="Add Photos" onPress={pickImage} />
          {/* <View style={styles.imageContainer}> */}
          {/* <PhotoGrid source={imageArray} /> */}
          <FlatList
            // columnWrapperStyle={{ justifyContent: 'space-between', }}
            horizontal={false}
            numColumns={2}
            data={imageArray}
            //data defined in constructor
            // ItemSeparatorComponent={ItemSeparatorView}
            //Item Separator View
            renderItem={ItemView}
            keyExtractor={(item, index) => index.toString()}
          />
          {/* <FlatGrid
            // fixed={true}
            itemDimension={200}
            data={imageArray}
            renderItem={ItemView}

          /> */}

          {/* </View> */}
        </View>
        <Button title="NEXT" onPress={() => onSubmit()} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20
  },
  imageContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: "grey"
  }
});

const mapStateToProps = state => ({
  userDetails: state.AppReducer.userDetails,
  propertyType: state.AppReducer.propertyType,
  propertyDetails: state.AppReducer.propertyDetails,
});
const mapDispatchToProps = {
  setPropertyDetails
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddImages);

// export default AddImages;
