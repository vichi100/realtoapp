import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import axios from 'axios';

// Lighten heavy UI deps used by the screen
jest.mock('../../../../../src/components/Slideshow', () => 'Slideshow');

// Mock the reminder list component to assert its presence
jest.mock('../../../../../src/screens/property/PropertyReminder', () => {
  const React = require('react');
  const { View } = require('react-native');
  return function MockReminder() {
    return <View testID="property_reminder" />;
  };
});

// Spy makeCall so we can verify owner call action
jest.mock('../../../../../src/utils/methods', () => {
  const actual = jest.requireActual('../../../../../src/utils/methods');
  return {
    ...actual,
    makeCall: jest.fn(),
  };
});

import CommercialSellPropDetails from '../../../../../src/screens/property/commercial/sell/CommercialSellPropDetails';
import { makeCall } from '../../../../../src/utils/methods';

jest.mock('axios');

const mockStore = configureStore([]);

const baseItem = {
  property_id: 'prop-sell-aaaaaa',
  property_type: 'Commercial',
  property_for: 'Sell',
  agent_id: 'agent-1',
  image_urls: [{ url: '/images/1.jpg' }],
  match_count: 3,
  property_address: {
    flat_number: 'A-1 ',
    building_name: 'Anant Villa',
    landmark_or_street: 'MG Road',
    formatted_address: 'Koregaon Park',
  },
  property_details: {
    property_used_for: 'Shop',
    property_size: 1200,
    building_type: 'Commercial',
    ideal_for: ['Retail'],
    parking_type: 'Open',
    property_age: '5-10',
    power_backup: 'Full',
  },
  sell_details: {
    expected_sell_price: 5000000,
    negotiable: 'Yes',
    available_from: '2025-02-01',
  },
  owner_details: {
    name: 'Owner Name',
    address: 'Owner Address',
    mobile1: '9999999999',
  },
  assigned_to_employee_name: [],
};

const buildStore = (overrides = {}) =>
  mockStore({
    AppReducer: {
      userDetails: { id: 'agent-1', works_for: 'agent-1', user_type: 'agent' },
      propertyDetails: baseItem,
      ...overrides,
    },
  });

const buildNav = () => ({ navigate: jest.fn() });

describe('CommercialSellPropDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders header, address and key detail fields', async () => {
    axios.post.mockResolvedValueOnce({ data: [] });

    const store = buildStore();
    const navigation = buildNav();
    const route = { params: { item: baseItem } };

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <CommercialSellPropDetails navigation={navigation} route={route} />
      </Provider>
    );

    expect(getByText(/Sell Off In/i)).toBeTruthy();
    expect(getByText(/Anant Villa/i)).toBeTruthy();
    expect(getByText(/Koregaon Park/i)).toBeTruthy();

    expect(getByText('Shop')).toBeTruthy();
    expect(getByText('Prop Type')).toBeTruthy();
    expect(getByText('Price')).toBeTruthy();
    expect(getByText('Building Type')).toBeTruthy();
    expect(getByText('1200sqft')).toBeTruthy();

    // Owner accordion header and phone action element
    expect(getByText('Owner')).toBeTruthy();

    // Wait for reminders to load
    await waitFor(() => {
      expect(getByTestId('property_reminder')).toBeTruthy();
    });
  });

  it('exports component for basic presence', () => {
    expect(CommercialSellPropDetails).toBeDefined();
  });

  it('calls the owner when phone is pressed', async () => {
    axios.post.mockResolvedValueOnce({ data: [] });

    const store = buildStore();
    const navigation = buildNav();
    const route = { params: { item: baseItem } };

    const { getByTestId } = render(
      <Provider store={store}>
        <CommercialSellPropDetails navigation={navigation} route={route} />
      </Provider>
    );

    const phone = getByTestId('owner_phone');
    fireEvent.press(phone);
    expect(makeCall).toHaveBeenCalledWith(baseItem.owner_details.mobile1);
  });
});
