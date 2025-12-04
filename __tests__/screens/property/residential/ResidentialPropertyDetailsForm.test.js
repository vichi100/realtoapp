import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

// Lightweight react-native mock to stabilize Dimensions and icons
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return { ...RN, Dimensions: { get: () => ({ width: 400, height: 800 }) } };
});

jest.mock('react-native-vector-icons/MaterialIcons', () => 'MaterialIcons');

// Mock react-native-paper inputs
jest.mock('react-native-paper', () => {
  const React = require('react');
  const { TextInput: RNTextInput, View, Text } = require('react-native');
  const TextInput = ({ value, onChangeText, placeholder, label, testID, style }) => (
    <RNTextInput
      testID={testID}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder || label}
      style={style}
    />
  );
  return { TextInput, HelperText: ({ children }) => <Text>{children}</Text>, useTheme: () => ({ colors: {} }) };
});

// Mock KeyboardAwareScrollView to simple View
jest.mock('react-native-keyboard-aware-scroll-view', () => ({
  KeyboardAwareScrollView: ({ children, testID }) => {
    const { View } = require('react-native');
    return <View testID={testID || 'kav'}>{children}</View>;
  },
}));

// Mock CustomButtonGroup for single-select
jest.mock('../../../../src/components/CustomButtonGroup', () => {
  const React = require('react');
  const { View, TouchableOpacity, Text } = require('react-native');
  return function CustomButtonGroupMock({ buttons = [], accessibilityLabelId, onButtonPress }) {
    return (
      <View>
        {buttons.map((btn, idx) => (
          <TouchableOpacity
            key={idx}
            accessibilityRole="button"
            accessibilityLabel={`${accessibilityLabelId}_${idx}`}
            onPress={() => onButtonPress(idx, btn)}
          >
            <Text>{btn.text || String(btn)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
});

// Mock Button component
jest.mock('../../../../src/components/Button', () => {
  const React = require('react');
  const { TouchableOpacity, Text } = require('react-native');
  return function ButtonMock({ title, onPress, testID }) {
    return (
      <TouchableOpacity onPress={onPress} testID={testID || 'app_button'}>
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  };
});

// Mock Snackbar component
jest.mock('../../../../src/components/SnackbarComponent', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return function SnackbarMock({ visible, textMessage }) {
    return <View testID="snackbar">{visible ? <Text>{textMessage}</Text> : null}</View>;
  };
});

// Mock AppConstant options referenced by the form
jest.mock('../../../../src/utils/AppConstant', () => ({
  HOUSE_TYPE_OPTION: [{ text: 'Apartment' }, { text: 'Villa' }, { text: 'Independent House' }],
  BHK_OPTION: [{ text: '1BHK' }, { text: '2BHK' }, { text: '3BHK' }],
  FURNISHING_STATUS_OPTION: [{ text: 'Full' }, { text: 'Semi' }, { text: 'Empty' }],
  PARKING_OPTION: [{ text: 'Car' }, { text: 'Bike' }],
  LIFT_AVAILBLE_OPTION: [{ text: 'Yes' }, { text: 'No' }],
}));

// Mock react-redux connect
const mockSetPropertyDetails = jest.fn();
jest.mock('react-redux', () => ({
  connect: () => (Comp) => (props) => (
    <Comp
      {...props}
      propertyDetails={props.__property || { property_for: 'Rent' }}
      setPropertyDetails={mockSetPropertyDetails}
    />
  ),
}));

import ResidentialPropertyDetailsForm from '../../../../src/screens/property/residential/ResidentialPropertyDetailsForm';

const setup = (opts = {}) => {
  mockSetPropertyDetails.mockClear();
  const navigation = { navigate: jest.fn() };
  const ui = render(
    <ResidentialPropertyDetailsForm navigation={navigation} route={{ params: {} }} __property={opts.property} />
  );
  return { ...ui, navigation };
};

describe('ResidentialPropertyDetailsForm', () => {
  it('shows validation errors sequentially when required fields are missing', () => {
    const { getByText, getByTestId } = setup();
    // Press NEXT initially with all empty -> Floor missing
    fireEvent.press(getByText('NEXT'));
    expect(getByTestId('snackbar').children[0].props.children).toBe('Floor is missing');

    // Fill floor, press NEXT -> Total floors missing
    fireEvent.changeText(getByTestId('floorInput'), '3');
    fireEvent.press(getByText('NEXT'));
    expect(getByTestId('snackbar').children[0].props.children).toBe('Total floors is missing');

    // Fill total floor, press NEXT -> Property size missing
    fireEvent.changeText(getByTestId('totalFloorInput'), '12');
    fireEvent.press(getByText('NEXT'));
    expect(getByTestId('snackbar').children[0].props.children).toBe('Property size is missing');
  });

  it('updates selections and dispatches setPropertyDetails with composed property_details', () => {
    const { getByTestId, getByLabelText, getByText, navigation } = setup({ property: { property_for: 'Rent' } });

    // Change button selections via accessibility labels
    fireEvent.press(getByLabelText('house_type_1')); // Villa
    fireEvent.press(getByLabelText('bhk_type_0'));    // 1BHK
    fireEvent.press(getByLabelText('washroom_number_3')); // 4
    fireEvent.press(getByLabelText('furnishing_status_0')); // Full
    fireEvent.press(getByLabelText('parking_number_2')); // 3
    fireEvent.press(getByLabelText('parking_type_1')); // Bike
    fireEvent.press(getByLabelText('property_age_0')); // 1-5
    fireEvent.press(getByLabelText('lift_available_1')); // No

    // Fill numeric fields
    fireEvent.changeText(getByTestId('floorInput'), '5');
    fireEvent.changeText(getByTestId('totalFloorInput'), '10');
    fireEvent.changeText(getByTestId('propertySizeInput'), '950');

    fireEvent.press(getByText('NEXT'));

    expect(mockSetPropertyDetails).toHaveBeenCalledTimes(1);
    const updated = mockSetPropertyDetails.mock.calls[0][0];
    expect(updated.property_details).toEqual({
      house_type: 'Villa',
      bhk_type: '1BHK',
      washroom_numbers: '4',
      furnishing_status: 'Full',
      parking_type: 'Bike',
      parking_number: '3',
      property_age: '1-5',
      floor_number: '5',
      total_floor: '10',
      lift: 'No',
      property_size: '950',
    });

    expect(navigation.navigate).toHaveBeenCalledWith('RentDetailsForm');
  });

  it('navigates to SellDetailsForm when property_for is Sell', () => {
    const { getByText, getByTestId, navigation } = setup({ property: { property_for: 'Sell' } });

    // Minimal valid input
    fireEvent.changeText(getByTestId('floorInput'), '1');
    fireEvent.changeText(getByTestId('totalFloorInput'), '2');
    fireEvent.changeText(getByTestId('propertySizeInput'), '500');

    fireEvent.press(getByText('NEXT'));
    expect(navigation.navigate).toHaveBeenCalledWith('SellDetailsForm');
  });
});
