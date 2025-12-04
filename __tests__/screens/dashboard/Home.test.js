import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';

// Mock react-redux connect
jest.mock('react-redux', () => ({
  connect: () => (Component) => (props) => {
    const React = require('react');
    return React.createElement(Component, {
      ...props,
      userDetails: props.userDetails ?? { id: 1, works_for: 1, user_type: 'agent', user_status: 'active' },
      setUserDetails: props.setUserDetails || jest.fn(),
    });
  },
}));

// Mock navigation focus effect to no-op
jest.mock('@react-navigation/native', () => ({ useFocusEffect: () => {} }));

// Mock axios (function form)
const mockAxios = jest.fn();
jest.mock('axios', () => (...args) => mockAxios(...args));

// Mock AsyncStorage (internal storage contained within factory to satisfy jest scoping)
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  const __mockStorage = new Map();
  return {
    ...RN,
    AsyncStorage: {
      getItem: async (k) => __mockStorage.get(k) || null,
      setItem: async (k, v) => { __mockStorage.set(k, v); },
      __mockStorage,
    },
    StatusBar: { currentHeight: 0 },
    Dimensions: { get: () => ({ width: 400, height: 800 }) },
  };
});

// Constants
jest.mock('../../../src/utils/Constant', () => ({ SERVER_URL: 'http://example.com' }));

import Home from '../../../src/screens/dashboard/Home';

describe('Home', () => {
  beforeEach(() => {
    const { AsyncStorage } = require('react-native');
    AsyncStorage.__mockStorage.clear?.();
    mockAxios.mockReset();
  });

  test('shows loading then renders listing summary', async () => {
    mockAxios.mockResolvedValueOnce({
      data: {
        residentialPropertyRentCount: 2,
        residentialPropertySellCount: 3,
        residentialPropertyCustomerRentCount: 4,
        residentialPropertyCustomerBuyCount: 5,
        commercialPropertyRentCount: 6,
        commercialPropertySellCount: 7,
        commercialPropertyCustomerRentCount: 8,
        commercialPropertyCustomerBuyCount: 9,
      },
    });

    const { getByText, queryByText } = render(<Home navigation={{ navigate: jest.fn() }} />);
    // Initially loading indicator is shown implicitly; wait for counts
    await waitFor(() => {
      expect(getByText('Residential Listing Summary')).toBeTruthy();
      expect(getByText('2')).toBeTruthy();
      expect(getByText('3')).toBeTruthy();
      expect(getByText('4')).toBeTruthy();
      expect(getByText('5')).toBeTruthy();
      expect(getByText('Commercial Listing Summary')).toBeTruthy();
      expect(getByText('6')).toBeTruthy();
      expect(getByText('7')).toBeTruthy();
      expect(getByText('8')).toBeTruthy();
      expect(getByText('9')).toBeTruthy();
    });
  });

  test('when userDetails is null, shows empty listing and not loading', async () => {
    // Listing summary fetch returns empty when no works_for
    mockAxios.mockResolvedValueOnce({ data: {} });
    const { getByText, getAllByText } = render(<Home navigation={{}} userDetails={null} />);
    // First effect sets loading false and listingData []
    await waitFor(() => {
      expect(getByText('Residential Listing Summary')).toBeTruthy();
      // Counts fallback to 0; there can be multiple zeroes displayed
      expect(getAllByText('0').length).toBeGreaterThan(0);
    });
  });

  test('shows suspend modal for suspended agent and can reactivate', async () => {
    const { AsyncStorage } = require('react-native');
    await AsyncStorage.setItem('user_details', JSON.stringify({ user_details: { user_status: 'suspend' } }));
    // First listing fetch
    mockAxios.mockResolvedValueOnce({ data: {} });
    // Reactivate endpoint
    mockAxios.mockResolvedValueOnce({ data: 'success' });

    const userDetails = { id: 1, works_for: 1, user_type: 'agent', user_status: 'suspend' };
    const { getByText } = render(<Home navigation={{}} userDetails={userDetails} />);

    // Modal text should appear
    await waitFor(() => {
      expect(getByText('Your account is in suspend mode by you. Do you want to activate\nit ?')).toBeTruthy();
    });

    // Press Yes
    fireEvent.press(getByText('Yes'));

    await waitFor(() => {
      // Reactivation should call endpoint
      expect(mockAxios).toHaveBeenCalledWith('http://example.com/reactivateAccount', expect.any(Object));
      // AsyncStorage updated
      const { AsyncStorage } = require('react-native');
      const stored = AsyncStorage.__mockStorage.get('user_details');
      expect(stored).toContain('"user_status":"active"');
    });
  });
});
