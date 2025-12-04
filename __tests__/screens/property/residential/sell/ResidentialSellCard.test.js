import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

// Share mock needs to be available before mocking react-native
const mockShare = jest.fn().mockResolvedValue({ action: 'sharedAction' });

// Mock react-native Dimensions to avoid undefined in test env
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Dimensions: { get: () => ({ width: 400, height: 800 }) },
    Share: { share: (...args) => mockShare(...args) },
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

// Define a no-op alert to avoid ReferenceError if share throws
global.alert = global.alert || jest.fn();

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

import ResidentialSellCard from '../../../../../src/screens/property/residential/sell/ResidentialSellCard';

describe('ResidentialSellCard', () => {
  const item = {
    property_id: 'PROP123456',
    property_status: 1,
    agent_id: 10,
    property_for: 'Sell',
    property_type: 'Residential',
    image_urls: [],
    match_count: 5,
    matched_percentage: 70,
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
      property_size: 900,
    },
    sell_details: {
      expected_sell_price: 5500000,
    },
  };

  const setup = (extraProps = {}) => {
    mockSetPropListForMeeting.mockClear();
    mockSetCustomerDetailsForMeeting.mockClear();
    mockSetStartNavigationPoint.mockClear();
    mockSetPropertyDetails.mockClear();
    mockMakeCall.mockClear();
    mockShare.mockClear();

    const navigation = { navigate: jest.fn() };
    const props = {
      navigation,
      item,
      disableDrawer: false,
      displayCheckBox: true,
      displayChat: false,
      displayMatchCount: true,
      displayMatchPercent: true,
      deleteMe: jest.fn(),
      closeMe: jest.fn(),
      ...extraProps,
    };
    const utils = render(<ResidentialSellCard {...props} />);
    return { ...utils, navigation };
  };

  it('renders title, address and reference id', () => {
    const { getByText, getByTestId } = setup();
    expect(getByText('Sell Off In Skyline, MG Road')).toBeTruthy();
    expect(getByText('Skyline, MG Road, Pune')).toBeTruthy();
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

  it('triggers meeting, call and share actions via drawer buttons', () => {
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

    // Press share button
    fireEvent.press(getByTestId('share_social_icon_id_123456'));
    expect(mockShare).toHaveBeenCalled();
  });

  it('opens close/delete modal and calls corresponding callbacks', () => {
    const deleteMe = jest.fn();
    const closeMe = jest.fn();
    const { getByTestId, getByText } = setup({ deleteMe, closeMe });

    // Open modal via close-sharp icon
    fireEvent.press(getByTestId('close_sharp_icon_id_123456'));

    // Modal buttons
    fireEvent.press(getByText('Delete'));
    expect(deleteMe).toHaveBeenCalledWith(item);

    // Re-open and press Close button
    fireEvent.press(getByTestId('close_sharp_icon_id_123456'));
    fireEvent.press(getByText('Close'));
    expect(closeMe).toHaveBeenCalledWith(item);

    // Re-open and press Cancel
    fireEvent.press(getByTestId('close_sharp_icon_id_123456'));
    fireEvent.press(getByText('Cancel'));
  });
});
