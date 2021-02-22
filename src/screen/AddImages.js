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
  Platform,
  AsyncStorage
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import PhotoGrid from "../components/PhotoGrid";
import Button from "../components/Button";

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
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      const imageArrayX = [...imageArray];
      imageArrayX.push(result.uri);
      setImageArray(imageArrayX);
    }
  };

  const onSubmit = async () => {
    const property = JSON.parse(await AsyncStorage.getItem("property"));
    property["image_urls"] = imageArray;
    // console.log(property);
    AsyncStorage.setItem("property", JSON.stringify(property));
    if (property.property_type.toLowerCase() === "Residential".toLowerCase()) {
      if (property.property_for.toLowerCase() === "Rent".toLowerCase()) {
        navigation.navigate("AddNewPropFinalDetails");
      } else if (property.property_for.toLowerCase() === "Sell".toLowerCase()) {
        navigation.navigate("AddNewPropSellFinalDetails");
      }
    }
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
          <View style={styles.imageContainer}>
            <PhotoGrid source={imageArray} />
          </View>
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

export default AddImages;
