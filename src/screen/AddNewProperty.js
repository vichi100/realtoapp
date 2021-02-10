import React, { Component } from "react";
import { StyleSheet, View, Image, Text, SafeAreaView } from "react-native";
import { TextInput, HelperText, useTheme } from "react-native-paper";
import RadioButton from "../components/RadioButtons";
import { ButtonGroup } from "react-native-elements";
import Button from "../components/Button";
import { ScrollView } from "react-native-gesture-handler";

const options = [
  {
    key: "Residential",
    text: "Residential"
  },
  {
    key: "Commercial",
    text: "Commercial"
  }
];

const AddNewProperty = props => {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [index, setIndex] = React.useState(null);
  const [locality, setLocality] = React.useState("");
  const [text, setText] = React.useState("");
  const { navigation } = props;
  const onSelect = item => {
    if (selectedOption && selectedOption.key === item.key) {
      setSelectedOption(null);
    } else {
      setSelectedOption(item);
    }
  };

  const updateIndex = index => {
    setIndex(index);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text>Select Property Type</Text>
        </View>
        <View style={styles.propSection}>
          <RadioButton
            selectedOption={selectedOption}
            onSelect={onSelect}
            options={options}
          />
        </View>
        <View style={styles.header}>
          <Text>Select Property For</Text>
        </View>
        <View
          style={[styles.propSubSection, { marginBottom: 10, marginTop: 15 }]}
        >
          {/* <Text>Select Property For</Text> */}
          <ButtonGroup
            selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
            onPress={updateIndex}
            selectedIndex={index}
            buttons={["Rent", "Sell"]}
            // containerStyle={{ height: 30 }}
            textStyle={{ textAlign: "center" }}
            selectedTextStyle={{ color: "#fff" }}
            containerStyle={{ borderRadius: 10, width: 300 }}
            containerBorderRadius={10}
          />
        </View>

        <View style={[styles.header, { marginTop: 30 }]}>
          <Text>Owner Details</Text>
        </View>
        <View style={styles.propSection}>
          <TextInput
            label="Name*"
            value={text}
            onChangeText={text => setText(text)}
            style={{ backgroundColor: "#ffffff" }}
            theme={{
              colors: {
                // placeholder: "white",
                // text: "white",
                primary: "rgba(0,191,255, .9)",
                underlineColor: "transparent",
                background: "#ffffff"
              }
            }}
          />
          <TextInput
            label="Mobile*"
            value={text}
            onChangeText={text => setText(text)}
            style={{ backgroundColor: "#ffffff", marginTop: 8 }}
            theme={{
              colors: {
                // placeholder: "white",
                // text: "white",
                primary: "rgba(0,191,255, .9)",
                underlineColor: "transparent",
                background: "#ffffff"
              }
            }}
          />
          <TextInput
            label="Address*"
            value={text}
            onChangeText={text => setText(text)}
            style={{ backgroundColor: "#ffffff", marginTop: 8 }}
            theme={{
              colors: {
                // placeholder: "white",
                // text: "white",
                primary: "rgba(0,191,255, .9)",
                underlineColor: "transparent",
                background: "#ffffff"
              }
            }}
          />
          {/* <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            label="Address"
            placeholder="Address"
            value={locality}
            keyboardType={"numeric"}
            returnKeyType={"done"}
            onChangeText={locality => setLocality(locality)}
          /> */}
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            title="NEXT"
            onPress={() => navigation.navigate("LocalityDetails")}
          />
        </View>
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
  header: {
    alignContent: "flex-start"
  },
  propSection: {
    marginTop: 20
  },
  propSubSection: {
    // marginTop: 50,
    marginBottom: 10,
    marginLeft: 10
  },
  inputContainerStyle: {
    margin: 8,
    backgroundColor: "#ffffff"
    // borderColor: "black",
    // borderWidth: 1
  }
  // propSubSection: {
  //   marginTop: 5,
  //   marginBottom: 5
  // },
});

export default AddNewProperty;
