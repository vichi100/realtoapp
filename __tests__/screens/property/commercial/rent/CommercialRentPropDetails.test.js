import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import CommercialRentPropDetails from '../../../../../src/screens/property/commercial/rent/CommercialRentPropDetails';

// Stub heavy UI components
jest.mock('../../../../../src/components/Slideshow', () => 'Slideshow');

// Render children for accordion and expose testIDs
jest.mock('../../../../../src/components/AccordionListItem', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return ({ children, title, testID }) => (
    <View testID={testID}>
      <Text>{title}</Text>
      {children}
    </View>
  );
});

// Show reminder list size to assert async load
jest.mock('../../../../../src/screens/property/PropertyReminder', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return ({ reminderListX }) => (
    <View testID="property_reminders">
      <Text>Reminders: {Array.isArray(reminderListX) ? reminderListX.length : 0}</Text>
    </View>
  );
});

// Spy on makeCall from utils
jest.mock('/Users/vichi/Documents/workspace/realtoapp/src/utils/methods.js', () => ({
  ...jest.requireActual('/Users/vichi/Documents/workspace/realtoapp/src/utils/methods.js'),
  makeCall: jest.fn(),
}));

const mockStore = configureStore([]);

const baseItem = {
  property_id: 'prop-xyz123456',
  property_type: 'Commercial',
  property_for: 'Rent',
  agent_id: 'agent-1',
  match_count: 3,
  image_urls: [{ url: '/images/1.jpg' }],
  property_details: {
    building_type: 'Commercial',
    property_used_for: 'Shop',
    property_size: 1200,
    ideal_for: ['Retail', 'Cafe'],
    parking_type: 'Open',
    property_age: '5-10',
    power_backup: 'Full',
  },
  rent_details: {
    expected_rent: 45000,
    expected_deposit: 100000,
    available_from: '2025-01-01',
  },
  property_address: {
    flat_number: 'A-101 ',
    building_name: 'Anant Villa',
    landmark_or_street: 'MG Road',
    formatted_address: 'Koregaon Park',
    city: 'Pune',
    location_area: { name: 'KP' },
  },
  owner_details: {
    name: 'Owner Name',
    address: 'Owner Address',
    mobile1: '9999999999',
  },
  assigned_to_employee: [],
  assigned_to_employee_name: [],
};

const buildStore = (overrides = {}) =>
  mockStore({
    AppReducer: {
      userDetails: { id: 'agent-1', works_for: 'agent-1', user_type: 'agent' },
      propertyDetails: null,
      ...overrides,
    },
  });

const buildNav = () => ({ navigate: jest.fn() });

describe('CommercialRentPropDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders fields and loads reminders', async () => {
    axios.post.mockResolvedValueOnce({ data: [{ id: 1 }] });
    const store = buildStore();
    const navigation = buildNav();
    const route = { params: { item: { ...baseItem }, displayMatchCount: true, displayMatchPercent: true } };

    const { getByText, findByTestId } = render(
      <Provider store={store}>
        <CommercialRentPropDetails navigation={navigation} route={route} />
      </Provider>
    );

    expect(getByText(/Rent in A-101 Anant Villa, MG Road/i)).toBeTruthy();
    expect(getByText(/Koregaon Park/i)).toBeTruthy();
    expect(getByText('Shop')).toBeTruthy();
    expect(getByText('Prop Type')).toBeTruthy();
    expect(getByText('45 K')).toBeTruthy();
    expect(getByText('Rent')).toBeTruthy();
    expect(getByText('1 Lac')).toBeTruthy();
    expect(getByText('Deposit')).toBeTruthy();
    expect(getByText('1200sqft')).toBeTruthy();
    expect(getByText('Building Type')).toBeTruthy();
    expect(getByText('Parking')).toBeTruthy();
    expect(getByText('Age Of Building')).toBeTruthy();
    expect(getByText('Power Backup')).toBeTruthy();

    // Property reminders loaded
    const reminders = await findByTestId('property_reminders');
    expect(reminders).toBeTruthy();
    expect(getByText('Reminders: 1')).toBeTruthy();
  });

  it('navigates to matched customers when tapping match banner', () => {
    axios.post.mockResolvedValueOnce({ data: [] });
    const store = buildStore();
    const navigation = buildNav();
    const route = { params: { item: { ...baseItem }, displayMatchCount: true } };

    const { getByText } = render(
      <Provider store={store}>
        <CommercialRentPropDetails navigation={navigation} route={route} />
      </Provider>
    );

    fireEvent.press(getByText('Match'));
    expect(navigation.navigate).toHaveBeenCalledWith('MatchedCustomers', expect.objectContaining({ matchedProprtyItem: expect.any(Object) }));
  });

  it('exports component for basic presence', () => {
    expect(CommercialRentPropDetails).toBeDefined();
  });

  it('calls owner using the phone button', () => {
    const { makeCall } = require('/Users/vichi/Documents/workspace/realtoapp/src/utils/methods.js');
    axios.post.mockResolvedValueOnce({ data: [] });
    const store = buildStore();
    const navigation = buildNav();
    const route = { params: { item: { ...baseItem } } };

    const { getByTestId } = render(
      <Provider store={store}>
        <CommercialRentPropDetails navigation={navigation} route={route} />
      </Provider>
    );

    fireEvent.press(getByTestId('owner_phone'));
    expect(makeCall).toHaveBeenCalledWith(baseItem.owner_details.mobile1);
  });
});
