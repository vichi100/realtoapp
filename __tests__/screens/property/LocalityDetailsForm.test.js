import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

// Stable react-native mocks (avoid RN warnings for tests)
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return { ...RN, Dimensions: { get: () => ({ width: 400, height: 800 }) } };
});

// Simplify react-native-paper to avoid icon imports
jest.mock('react-native-paper', () => {
  const RN = require('react-native');
  const TextInput = ({ testID, value, onChangeText, ...rest }) => (
    <RN.TextInput testID={testID} value={value} onChangeText={onChangeText} />
  );
  return {
    TextInput,
    HelperText: () => null,
    useTheme: () => ({}),
  };
});

// Mock app Button to a simple pressable
jest.mock('../../../src/components/Button', () => {
  const React = require('react');
  const { TouchableOpacity, Text } = require('react-native');
  return ({ title, onPress }) => (
    <TouchableOpacity accessibilityRole="button" onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
});

// Mock Snackbar to render nothing (avoid timer/animation noise)
jest.mock('../../../src/components/SnackbarComponent', () => ({ visible, actionText }) => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return visible ? (
    <View>
      <Text>{actionText || 'OK'}</Text>
    </View>
  ) : null;
});

// Mock KeyboardAwareScrollView to a pass-through to avoid ESM issues
jest.mock('react-native-keyboard-aware-scroll-view', () => ({
  KeyboardAwareScrollView: ({ children }) => children,
}));

// Mock GooglePlacesAutocomplete to expose onPress via a test button
jest.mock('react-native-google-places-autocomplete', () => {
  const React = require('react');
  const { View, Text, TouchableOpacity } = require('react-native');
  return {
    GooglePlacesAutocomplete: ({ onPress, textInputProps }) => (
      <View>
        <Text>{textInputProps?.testID || 'GooglePlacesInput'}</Text>
        <TouchableOpacity onPress={() => {
          const data = {
            structured_formatting: { main_text: 'Bandra West' },
          };
          const details = {
            formatted_address: 'Bandra West, Mumbai, Maharashtra, India',
            geometry: { location: { lat: 19.060, lng: 72.835 } },
          };
          onPress && onPress(data, details);
        }}>
          <Text>Pick Area</Text>
        </TouchableOpacity>
      </View>
    ),
  };
});

// Mock reducers/Action to track setPropertyDetails calls
jest.mock('../../../src/reducers/Action', () => {
  return {
    setPropertyType: jest.fn(),
    setPropertyDetails: jest.fn((payload) => ({ type: 'SET_PROPERTY_DETAILS', payload })),
  };
});

// Mock react-redux connect to inject props without real store
jest.mock('react-redux', () => {
  const actual = jest.requireActual('react-redux');
  return {
    ...actual,
    connect: () => (Component) => (props) => {
      const injected = {
        userDetails: {},
        propertyDetails: props.propertyDetails || { property_type: 'Residential' },
        setPropertyType: jest.fn(),
        setPropertyDetails: require('../../../src/reducers/Action').setPropertyDetails,
        navigation: props.navigation || { navigate: jest.fn() },
      };
      return <Component {...injected} {...props} />;
    },
  };
});

// Import after mocks
import LocalityDetailsForm from '../../../src/screens/property/LocalityDetailsForm';
import { setPropertyDetails as setPropertyDetailsAction } from '../../../src/reducers/Action';

describe('LocalityDetailsForm', () => {
  const fillBaseInputs = (screen) => {
    fireEvent.changeText(screen.getByTestId('cityInput'), 'Mumbai');
    fireEvent.press(screen.getByText('Pick Area')); // triggers GooglePlaces onPress
    fireEvent.changeText(screen.getByTestId('buildingNameInput'), 'Sea Breeze Society');
    fireEvent.changeText(screen.getByTestId('landmarkInput'), 'Near Carter Road');
  };

  test('shows validation errors when required fields missing', () => {
    const { getByText } = render(<LocalityDetailsForm navigation={{ navigate: jest.fn() }} />);
    fireEvent.press(getByText('NEXT'));
    // City missing first
    expect(getByText('OK')).toBeTruthy();
  });

  test('dispatches setPropertyDetails and navigates for Residential', () => {
    const navigate = jest.fn();
    const screen = render(<LocalityDetailsForm navigation={{ navigate }} propertyDetails={{ property_type: 'Residential' }} />);

    fillBaseInputs(screen);
    // Residential requires flat number
    fireEvent.changeText(screen.getByTestId('flatNumberInput'), '1203-A');

    fireEvent.press(screen.getByText('NEXT'));

    const { setPropertyDetails } = require('../../../src/reducers/Action');
    expect(setPropertyDetails).toHaveBeenCalled();
    const call = setPropertyDetails.mock.calls[0][0];
    expect(call.property_address).toBeTruthy();
    expect(call.property_address.city).toBe('Mumbai');
    expect(call.property_address.building_name).toBe('Sea Breeze Society');
    expect(call.property_address.landmark_or_street).toBe('Near Carter Road');
    expect(call.property_address.location_area).toBeTruthy();

    expect(navigate).toHaveBeenCalledWith('ResidentialPropertyDetailsForm');
  });

  test('navigates to Commercial flow when property_type is Commercial', () => {
    const navigate = jest.fn();
    const screen = render(<LocalityDetailsForm navigation={{ navigate }} propertyDetails={{ property_type: 'Commercial' }} />);

    fillBaseInputs(screen);
    // flatNumber not required for commercial
    fireEvent.press(screen.getByText('NEXT'));
    expect(navigate).toHaveBeenCalledWith('CommercialPropertyDetailsForm');
  });
});
