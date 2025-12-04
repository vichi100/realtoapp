import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';

// Mock react-native Dimensions to avoid undefined in test env
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Dimensions: { get: () => ({ width: 400, height: 800 }) },
  };
});

// Mock vector icons and heavy components
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'MaterialCommunityIcons');
jest.mock('react-native-vector-icons/Feather', () => 'Feather');
jest.mock('react-native-vector-icons/Ionicons', () => 'Ionicons');
jest.mock('react-native-vector-icons/AntDesign', () => 'AntDesign');

// Mock @rneui/themed CheckBox
jest.mock('@rneui/themed', () => ({
  CheckBox: ({ onPress, accessibilityLabel, testID }) => {
    const React = require('react');
    const { TouchableOpacity, Text } = require('react-native');
    return (
      <TouchableOpacity accessibilityLabel={accessibilityLabel} testID={testID} onPress={onPress}>
        <Text>Check</Text>
      </TouchableOpacity>
    );
  },
  ButtonGroup: 'ButtonGroup',
}));

// Mock app components
jest.mock('../../../../../src/components/DoughnutChart', () => 'DoughnutChart');
jest.mock('../../../../../src/components/Slideshow', () => () => null);
jest.mock('../../../../../src/components/CustomButtonGroup', () => () => null);

// Mock methods: makeCall
const mockMakeCall = jest.fn();
jest.mock('../../../../../src/utils/methods', () => ({
  ...jest.requireActual('../../../../../src/utils/methods'),
  makeCall: (...args) => mockMakeCall(...args),
}));

// Mock react-redux connect to inject store props and action creators
const mockSetPropListForMeeting = jest.fn();
const mockSetCustomerDetailsForMeeting = jest.fn();
const mockSetStartNavigationPoint = jest.fn();
const mockSetPropertyDetails = jest.fn();
jest.mock('react-redux', () => ({
  connect: () => (Comp) => (props) => (
    <Comp
      {...props}
      userDetails={{ id: 10, works_for: 10, user_type: 'owner', employee_role: '' }}
      propReminderList={[]}
      propListForMeeting={[]}
      setPropListForMeeting={mockSetPropListForMeeting}
      setCustomerDetailsForMeeting={mockSetCustomerDetailsForMeeting}
      setStartNavigationPoint={mockSetStartNavigationPoint}
      setPropertyDetails={mockSetPropertyDetails}
    />
  ),
}));

import ResidentialRentCard from '../../../../../src/screens/property/residential/rent/ResidentialRentCard';

describe('ResidentialRentCard', () => {
  const item = {
    property_id: 'PROP123456',
    property_status: 1,
    agent_id: 10,
    property_for: 'Rent',
    property_type: 'Residential',
    image_urls: [],
    match_count: 3,
    matched_percentage: 60,
    assigned_to_employee: [],
    assigned_to_employee_name: ['Amit'],
    property_address: {
      building_name: 'Skyline',
      landmark_or_street: 'MG Road',
      city: 'Pune',
      location_area: 'Central',
      formatted_address: 'Skyline, MG Road, Pune',
    },
    owner_details: {
      name: 'John Doe',
      mobile1: '9876543210',
    },
    property_details: {
      bhk_type: '2 BHK',
      furnishing_status: 'Semi-Furnished',
    },
    rent_details: {
      expected_rent: 23000,
      expected_deposit: 80000,
    },
  };

  const setup = (extraProps = {}) => {
    mockSetPropListForMeeting.mockClear();
    mockSetCustomerDetailsForMeeting.mockClear();
    mockSetStartNavigationPoint.mockClear();
    mockSetPropertyDetails.mockClear();
    mockMakeCall.mockClear();

    const navigation = { navigate: jest.fn() };
    const props = {
      navigation,
      item,
      disableDrawer: false,
      displayCheckBox: true,
      displayChat: false,
      displayMatchCount: true,
      displayMatchPercent: true,
      ...extraProps,
    };
    const utils = render(<ResidentialRentCard {...props} />);
    return { ...utils, navigation };
  };

  it('renders title, address and reference id', () => {
    const { getByText, getByTestId } = setup();
    expect(getByText('Rent In Skyline, MG Road')).toBeTruthy();
    expect(getByText('Skyline, MG Road, Pune')).toBeTruthy();
    // Reference id uses last 6 chars
    expect(getByTestId('ref_id_123456')).toBeTruthy();
  });

  it('navigates to MatchedCustomers when Match pressed', () => {
    const { navigation, getByText } = setup();
    fireEvent.press(getByText('Match'));
    expect(navigation.navigate).toHaveBeenCalledWith('MatchedCustomers', { matchedProprtyItem: item });
  });

  it('shows employee assignment row and navigates to EmployeeListOfListing on press', () => {
    const { navigation, getByText } = setup();
    expect(getByText('Amit')).toBeTruthy();
    fireEvent.press(getByText('Amit'));
    expect(navigation.navigate).toHaveBeenCalledWith('EmployeeListOfListing', {
      itemForAddEmplyee: item,
      disableDrawer: true,
      displayCheckBox: true,
    });
  });

  it('toggles meeting checkbox and dispatches setPropListForMeeting', () => {
    const { getByTestId } = setup({ displayCheckBox: true });
    const checkbox = getByTestId('checkbox_id_123456');
    fireEvent.press(checkbox);
    expect(mockSetPropListForMeeting).toHaveBeenCalled();
    const arg = mockSetPropListForMeeting.mock.calls[0][0];
    expect(Array.isArray(arg)).toBe(true);
    expect(arg[0]).toHaveProperty('id', item.property_id);
  });

  it('triggers meeting and call actions via drawer buttons', () => {
    const { navigation, getByTestId } = setup();

    // Press meeting button
    fireEvent.press(getByTestId('alarm_outline_icon_id_123456'));
    expect(mockSetCustomerDetailsForMeeting).toHaveBeenCalledWith(null);
    expect(mockSetPropertyDetails).toHaveBeenCalledWith(item);
    expect(mockSetStartNavigationPoint).toHaveBeenCalledWith('CustomerListForMeeting');
    expect(navigation.navigate).toHaveBeenCalledWith('Meeting', { item, category: 'property' });

    // Press call button
    fireEvent.press(getByTestId('call_icon_id_123456'));
    expect(mockMakeCall).toHaveBeenCalledWith(item.owner_details.mobile1);
  });

  it('opens close/delete modal and calls corresponding callbacks', () => {
    const deleteMe = jest.fn();
    const closeMe = jest.fn();
    const { getByTestId, getByText, rerender } = setup({ deleteMe, closeMe });

    // Open modal via close-sharp icon
    fireEvent.press(getByTestId('close_sharp_icon_id_123456'));

    // Modal buttons
    fireEvent.press(getByText('Delete'));
    expect(deleteMe).toHaveBeenCalledWith(item);

    // Re-open and press Close button
    // Need to re-open since previous press closed it
    fireEvent.press(getByTestId('close_sharp_icon_id_123456'));
    fireEvent.press(getByText('Close'));
    expect(closeMe).toHaveBeenCalledWith(item);

    // Re-open and press Cancel
    fireEvent.press(getByTestId('close_sharp_icon_id_123456'));
    fireEvent.press(getByText('Cancel'));
  });
});
