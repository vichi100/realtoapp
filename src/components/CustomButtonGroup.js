import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Switch } from 'react-native';

const CustomButtonGroup = ({
  buttons, // Array of button data (text, image, etc.)
  initialSelectedIndices = [], // Initial selected indices
  isMultiSelect: initialIsMultiSelect = false, // Initial multi-select mode
  buttonStyle, // Custom button styles
  selectedButtonStyle, // Custom selected button styles
  buttonTextStyle, // Custom button text styles
  selectedButtonTextStyle, // Custom selected button text styles
  buttonImageStyle, // Custom button image styles
  containerStyle, // Custom container styles
  toggleContainerStyle, // Custom toggle container styles
  selectedTextStyle, // Custom selected text styles
  onButtonPress,
}) => {
  const [isMultiSelect, setIsMultiSelect] = useState(initialIsMultiSelect);

  const [selectedIndices, setSelectedIndices] = useState(initialSelectedIndices);

  const handlePress = (index) => {
    let newSelectedIndices;
    if (isMultiSelect) {
      newSelectedIndices = [...selectedIndices];
      if (newSelectedIndices.includes(index)) {
        newSelectedIndices.splice(newSelectedIndices.indexOf(index), 1);
      } else {
        newSelectedIndices.push(index);
      }
    } else {
      newSelectedIndices = selectedIndices.includes(index) ? [] : [index];
    }
    setSelectedIndices(newSelectedIndices);
    console.log(`newSelectedIndices: ${newSelectedIndices}`);
    
    if (onButtonPress) {
        onButtonPress(index, buttons[index]);
      }
  };



  return (
    <View style={[styles.container, containerStyle]}>
      {/* Toggle for single/multi-select */}
      {/* <View style={[styles.toggleContainer, toggleContainerStyle]}>
        <Text>Multi-Select:</Text>
        <Switch
          value={isMultiSelect}
          onValueChange={(value) => {
            setIsMultiSelect(value);
            setSelectedIndices([]); // Reset selection when switching modes
          }}
        />
      </View> */}

      {/* Button Group with flexWrap */}
      <View style={[styles.buttonGroup, { flexWrap: 'wrap' }]}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              { width: 105, height: 40 },
              buttonStyle,
              selectedIndices.includes(index) && [styles.selectedButton, selectedButtonStyle],
            ]}
            onPress={() => handlePress(index)}
          >
            {button.image && (
              <Image source={button.image} style={[styles.buttonImage, buttonImageStyle]} />
            )}
            <Text
              style={[
                styles.buttonText,
                buttonTextStyle,
                selectedIndices.includes(index) && selectedButtonTextStyle,
              ]}
            >
              {button.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Display selected options */}
      {/* <Text style={[styles.selectedText, selectedTextStyle]}>
        Selected: {selectedIndices.map((i) => buttons[i].text).join(', ')}
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // padding: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignContent: 'flex-start',
    gap: 19,

    // borderWidth: 1,
    // borderColor: '#ccc',
  },
  button: {
    flexDirection: 'column',
    // alignItems: 'flex-start',
    justifyContent: 'center', 
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'rgba( 254, 254, 250, .9);',
    marginBottom: 1, // Add margin between rows
  },
  selectedButton: {
    backgroundColor: 'rgba(0, 163, 108, .2)',
  },
  buttonImage: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 14,
    // flexShrink: 1,
    textAlign: 'center',
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default CustomButtonGroup;