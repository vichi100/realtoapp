import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

// Mock vector icons
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => {
  const ReactLocal = require('react');
  return (props) => ReactLocal.createElement('Text', null, props.name || 'icon');
});

// Mock react-native-paper
jest.mock('react-native-paper', () => {
  const ReactLocal = require('react');
  return {
    TextInput: (props) => ReactLocal.createElement('Text', { onChangeText: props.onChangeText }, props.value || props.placeholder || props.label || 'TextInput'),
    HelperText: (props) => ReactLocal.createElement('Text', null, props.children || 'HelperText'),
    useTheme: () => ({ colors: { primary: '#000' } }),
  };
});

// Mock Button component
jest.mock('../../../src/components/Button', () => {
  const ReactLocal = require('react');
  return (props) => ReactLocal.createElement('Text', { onPress: props.onPress }, props.title || 'Button');
});

// Mock KeyboardAwareScrollView
jest.mock('react-native-keyboard-aware-scroll-view', () => ({
  KeyboardAwareScrollView: (props) => {
    const ReactLocal = require('react');
    return ReactLocal.createElement('View', null, props.children);
  },
}));

// Mock Snackbar
jest.mock('../../../src/components/SnackbarComponent', () => {
  const ReactLocal = require('react');
  return (props) => props.visible ? ReactLocal.createElement('Text', null, props.textMessage || 'Snackbar') : null;
});

// Mock CustomButtonGroup
jest.mock('../../../src/components/CustomButtonGroup', () => {
  const ReactLocal = require('react');
  return (props) => {
    const { buttons = [], accessibilityLabelId, onButtonPress, selectedIndices = [] } = props;
    return ReactLocal.createElement('View', { accessibilityLabel: `cbg-${accessibilityLabelId}` },
      buttons.map((b, i) => ReactLocal.createElement('Text', { key: `${b.text}-${i}`, onPress: () => onButtonPress(i, b) }, b.text))
    );
  };
});

// Mock GooglePlacesAutocomplete
jest.mock('react-native-google-places-autocomplete', () => ({
  GooglePlacesAutocomplete: (props) => {
    const ReactLocal = require('react');
    return ReactLocal.createElement('Text', { onPress: () => props.onPress?.({ structured_formatting: { main_text: 'Downtown' } }, { geometry: { location: { lat: 1, lng: 2 } } }) }, 'PlacesInput');
  },
}));

// Mock axios
jest.mock('axios', () => ({ __esModule: true, default: jest.fn(() => Promise.resolve({ data: [] })) }));

// Mock reducers actions usage via connect
jest.mock('react-redux', () => {
  const ReactLocal = require('react');
  return ({
    connect: () => (Component) => (props) => ReactLocal.createElement(Component, { ...props, userDetails: { id: 1, works_for: 1 }, setGlobalSearchResult: jest.fn(), setResidentialPropertyList: jest.fn(), setPropertyType: jest.fn(), setPropertyDetails: jest.fn(), setCustomerDetails: jest.fn() }),
  });
});

// Mock constants
jest.mock('../../../src/utils/Constant', () => ({ SERVER_URL: 'http://localhost', GOOGLE_PLACES_API_KEY: 'test' }));

// ModalActivityIndicator
jest.mock('react-native-modal-activityindicator', () => ({
  __esModule: true,
  default: (props) => null,
}));

import Screen from '../../../src/screens/search/GlobalSearch';

describe('GlobalSearch screen', () => {
  const navigation = { navigate: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows error when city missing', () => {
    const { getByText } = render(<Screen navigation={navigation} />);
    fireEvent.press(getByText('Search'));
    expect(getByText('City is missing')).toBeTruthy();
  });

  it('shows error when no locations selected', () => {
    const { getByText } = render(<Screen navigation={navigation} />);
    // Enter city: trigger TextInput change
    const cityInput = getByText('Enter city where customer wants property');
    fireEvent.changeText(cityInput, 'Mumbai');
    fireEvent.press(getByText('Search'));
    expect(getByText('Please add a location of your city')).toBeTruthy();
  });

  it('selects a place and navigates based on selections after search', async () => {
    const { getByText } = render(<Screen navigation={navigation} />);

    // Enter city
    const cityInput = getByText('Enter city where customer wants property');
    fireEvent.changeText(cityInput, 'Mumbai');

    // Add location via GooglePlacesAutocomplete mock
    fireEvent.press(getByText('PlacesInput'));

    // Default state: lookingFor=Property, whatType=Residential, purpose=Rent
    fireEvent.press(getByText('Search'));

    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('GlobalResidentialPropertySearchResult', expect.objectContaining({ searchGlobalResult: expect.any(Function) }));
    });
  });

  it('navigates to Commercial Customers when selections set', async () => {
    const { getByText } = render(<Screen navigation={navigation} />);

    // City and location
    const cityInput = getByText('Enter city where customer wants property');
    fireEvent.changeText(cityInput, 'Mumbai');
    fireEvent.press(getByText('PlacesInput'));

    // Select lookingFor=Customer, whatType=Commercial, purpose=Buy
    fireEvent.press(getByText('Customer'));
    fireEvent.press(getByText('Commercial'));
    fireEvent.press(getByText('Buy'));

    fireEvent.press(getByText('Search'));

    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('GlobalCommercialCustomersSearchResult', expect.objectContaining({ searchGlobalResult: expect.any(Function) }));
    });
  });
});
