import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import RadioButton from "./RadioButtons";
import { ButtonGroup } from "react-native-elements";

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

const PostNewProperty = () => {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [index, setIndex] = React.useState(null);

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
    <View style={styles.container}>
      <Text>Select Property Type</Text>
      <RadioButton
        selectedOption={selectedOption}
        onSelect={onSelect}
        options={options}
      />

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default PostNewProperty;
