import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

// Stub FormData in Jest env
global.FormData = class {
  constructor() { this._data = []; }
  append(key, value) { this._data.push([key, value]); }
};

// Mocks
jest.mock('axios', () => jest.fn());
jest.mock('../../../../../src/components/Slideshow', () => () => null);
jest.mock('react-native-modal-activityindicator', () => () => null);
jest.mock('../../../../../src/components/Button', () => {
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

// Mock react-redux connect to inject props
let mockUserDetails = { id: 5, works_for: 5 };
let mockPropertyDetails = null;
let mockResidentialPropertyList = [];
let mockStartNavigationPoint = null;
const mockSetPropertyDetails = jest.fn();
const mockSetResidentialPropertyList = jest.fn();
const mockSetStartNavigationPoint = jest.fn();

jest.mock('react-redux', () => ({
  connect: () => (Comp) => (props) => (
    <Comp
      {...props}
      userDetails={mockUserDetails}
      propertyDetails={mockPropertyDetails}
      residentialPropertyList={mockResidentialPropertyList}
      startNavigationPoint={mockStartNavigationPoint}
      setPropertyDetails={mockSetPropertyDetails}
      setResidentialPropertyList={mockSetResidentialPropertyList}
      setStartNavigationPoint={mockSetStartNavigationPoint}
    />
  ),
}));

import axios from 'axios';
import AddNewPropSellFinalDetails from '../../../../../src/screens/property/residential/sell/AddNewPropSellFinalDetails';

const baseProperty = {
  property_for: 'Sell',
  property_type: 'Residential',
  property_address: {
    flat_number: '101',
    building_name: 'Sunrise',
    landmark_or_street: 'MG Road',
    location_area: { formatted_address: 'MG Road, Pune' },
  },
  image_urls: [{ url: 'file:///img1.jpg' }, { url: 'file:///img2.jpg' }],
  owner_details: { name: 'John Doe', address: 'Somewhere', mobile1: '9999999999' },
  property_details: {
    bhk_type: '2 BHK',
    property_size: 900,
    furnishing_status: 'Semi-Furnished',
    washroom_numbers: 2,
    lift: 'Yes',
    parking_number: 1,
    parking_type: 'Covered',
    floor_number: 3,
    total_floor: 8,
    property_age: 4,
  },
  sell_details: {
    expected_sell_price: 5500000,
    available_from: new Date(Date.now() - 24*60*60*1000).toISOString(), // yesterday => Immediately
    maintenance_charge: 1500,
    negotiable: 'Yes',
  },
};

describe('AddNewPropSellFinalDetails', () => {
  const setup = (overrides = {}) => {
    mockSetPropertyDetails.mockClear();
    mockSetResidentialPropertyList.mockClear();
    mockSetStartNavigationPoint.mockClear();
    axios.mockReset();

    mockPropertyDetails = { ...baseProperty, ...overrides };
    const navigation = { navigate: jest.fn() };
    const utils = render(
      <AddNewPropSellFinalDetails navigation={navigation} route={{ params: {} }} />
    );
    return { ...utils, navigation };
  };

  it('renders header, address, and key details', async () => {
    const { getByText } = setup();
    // Title
    await waitFor(() => expect(getByText('Sell Off 101,Sunrise,')).toBeTruthy());
    // Address
    expect(getByText('MG Road,MG Road, Pune')).toBeTruthy();
    // BHK and furnishing
    expect(getByText('2 BHK')).toBeTruthy();
    expect(getByText('Semi-Furnished')).toBeTruthy();
    // Possession shows Immediately (since available_from was yesterday)
    expect(getByText('Immediately')).toBeTruthy();
  });

  it('shows login modal when unauthenticated and navigates to Login', async () => {
    mockUserDetails = null;
    const { getByText } = setup();

    fireEvent.press(getByText('ADD'));
    await waitFor(() => expect(getByText('You are not logged in, please login.')).toBeTruthy());
    fireEvent.press(getByText('Login'));
  });

  it('submits successfully and navigates to Listing when startNavigationPoint is null', async () => {
    mockUserDetails = { id: 5, works_for: 5 };
    mockStartNavigationPoint = null;
    mockResidentialPropertyList = [];
    const responseProp = { ...baseProperty, property_id: 'P1', image_urls: [{ url: '/uploads/1.jpg' }] };
    const { getByText, navigation } = setup();
    axios.mockResolvedValue({ data: responseProp });
    fireEvent.press(getByText('ADD'));

    await waitFor(() => expect(axios).toHaveBeenCalled());
    expect(mockSetPropertyDetails).toHaveBeenCalledWith(null);
    expect(mockSetResidentialPropertyList).toHaveBeenCalled();
    expect(mockSetStartNavigationPoint).toHaveBeenCalledWith(null);
    expect(navigation.navigate).toHaveBeenCalledWith('Listing', { didDbCall: true });
  });

  it('submits successfully and navigates to PropertyListForMeeting when startNavigationPoint is set', async () => {
    mockUserDetails = { id: 5, works_for: 5 };
    mockStartNavigationPoint = 'CustomerListForMeeting';
    mockResidentialPropertyList = [{ property_id: 'OLD' }];
    const responseProp = { ...baseProperty, property_id: 'P2', image_urls: [{ url: '/uploads/2.jpg' }] };
    const { getByText, navigation } = setup();
    axios.mockResolvedValue({ data: responseProp });
    fireEvent.press(getByText('ADD'));

    await waitFor(() => expect(axios).toHaveBeenCalled());
    expect(navigation.navigate).toHaveBeenCalledWith('PropertyListForMeeting');
    expect(mockSetStartNavigationPoint).toHaveBeenCalledWith(null);
  });
});
