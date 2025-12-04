import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

// Mock axios for reminders fetch
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: [{ id: 1, note: 'Follow up' }] })),
}));

// Mock vector icons to simple components
jest.mock('react-native-vector-icons/Feather', () => 'Feather');
jest.mock('react-native-vector-icons/FontAwesome5', () => 'FontAwesome5');
jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: 'MaterialIcons',
}));

// Mock Slideshow and AccordionListItem and PropertyReminder to be lightweight
jest.mock('../../../../../src/components/Slideshow', () => {
  return function SlideshowMock() {
    return null;
  };
});

jest.mock('../../../../../src/components/AccordionListItem', () => {
  const React = require('react');
  const { View, Text, TouchableOpacity } = require('react-native');
  return function AccordionListItemMock({ title, children, testID }) {
    return (
      <View testID={testID}>
        <TouchableOpacity accessibilityRole="button">
          <Text>{title}</Text>
        </TouchableOpacity>
        <View>{children}</View>
      </View>
    );
  };
});

jest.mock('../../../../../src/screens/property/PropertyReminder', () => {
  const React = require('react');
  const { Text, View } = require('react-native');
  return function PropertyReminderMock({ reminderListX = [] }) {
    return (
      <View testID="property_reminder">
        <Text>Reminders: {reminderListX.length}</Text>
      </View>
    );
  };
});

// Mock react-redux connect to inject props without Provider
const mockUser = { id: 10, works_for: 10 };
const mockProperty = { property_id: 999 };
jest.mock('react-redux', () => ({
  connect: () => (Comp) => (props) => (
    <Comp {...props} userDetails={mockUser} anyItemDetails={{}} propertyDetails={mockProperty} />
  ),
}));

// Import after mocks
import axios from 'axios';
import PropDetailsFromListing from '../../../../../src/screens/property/residential/rent/PropDetailsFromListing';

describe('PropDetailsFromListing', () => {
  const baseItem = {
    property_id: 123,
    property_agent_id: 10,
    agent_id: 10,
    image_urls: [],
    match_count: 7,
    assigned_to_employee_name: ['Amit', 'Sara'],
    property_address: {
      building_name: 'Skyline',
      landmark_or_street: 'MG Road',
      formatted_address: 'Skyline, MG Road, Pune',
    },
    property_details: {
      bhk_type: '2 BHK',
      furnishing_status: 'Semi-Furnished',
      property_size: 850,
      washroom_numbers: 2,
      lift: 'Yes',
      parking_number: 1,
      parking_type: 'Covered',
      floor_number: 3,
      total_floor: 8,
      property_age: 5,
    },
    rent_details: {
      expected_rent: 23000,
      expected_deposit: 80000,
      available_from: '2024-01-10T00:00:00.000Z',
      preferred_tenants: 'Family',
      non_veg_allowed: 'Yes',
    },
    owner_details: {
      name: 'John Doe',
      mobile1: '9876543210',
      address: 'some address line',
    },
  };

  const setup = (overrides = {}) => {
    const navigation = { navigate: jest.fn() };
    const route = { params: { item: baseItem, displayMatchCount: true, displayMatchPercent: true, ...overrides } };
    const utils = render(<PropDetailsFromListing navigation={navigation} route={route} />);
    return { ...utils, navigation };
  };

  it('renders title, address, and key details', async () => {
    const { getByText } = setup();

    // Title and address
    expect(getByText('Rent In Skyline, MG Road')).toBeTruthy();
    expect(getByText('Skyline, MG Road, Pune')).toBeTruthy();

    // Key details present
    expect(getByText('2 BHK')).toBeTruthy();
    expect(getByText('Semi-Furnished')).toBeTruthy();
    expect(getByText('850sqft')).toBeTruthy();
  });

  it('shows match count and navigates to MatchedCustomers on press', async () => {
    const { getByText, navigation } = setup();
    // The badge shows the match count
    expect(getByText('7')).toBeTruthy();

    // Press on the area labeled Match
    fireEvent.press(getByText('Match'));
    expect(navigation.navigate).toHaveBeenCalledWith('MatchedCustomers', { matchedProprtyItem: baseItem });
  });

  it('navigates to EmployeeListOfListing when employee assign row pressed', () => {
    const { getByText, navigation } = setup();
    // Shows assigned employee names
    expect(getByText('Amit, Sara')).toBeTruthy();
    // Pressing the row should navigate
    fireEvent.press(getByText('Amit, Sara'));
    expect(navigation.navigate).toHaveBeenCalledWith('EmployeeListOfListing', {
      itemForAddEmplyee: baseItem,
      disableDrawer: true,
      displayCheckBox: true,
    });
  });

  it('fetches reminders on mount and renders PropertyReminder with data', async () => {
    const { getByTestId, getByText } = setup();

    // axios called with expected endpoint
    await waitFor(() => expect(axios.post).toHaveBeenCalled());

    // PropertyReminder mock renders with reminder count 1
    await waitFor(() => expect(getByTestId('property_reminder')).toBeTruthy());
    expect(getByText(/Reminders: 1/)).toBeTruthy();
  });
});
