import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';

// Mock react-native basics and suppress Dimensions issues
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Dimensions: { get: () => ({ width: 400, height: 800 }) },
  };
});

// Mock vector icons to simple components
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'MaterialCommunityIcons');
jest.mock('react-native-vector-icons/AntDesign', () => 'AntDesign');

// Mock BottomSheet to always render children
jest.mock('react-native-btr', () => ({
  BottomSheet: ({ children }) => children,
}));

// Mock @rneui ButtonGroup in sorting bottom sheet
jest.mock('@rneui/themed', () => ({
  ButtonGroup: ({ buttons = [], onPress }) => {
    const React = require('react');
    const { View, TouchableOpacity, Text } = require('react-native');
    return (
      <View>
        {buttons.map((b, idx) => (
          <TouchableOpacity key={idx} onPress={() => onPress(idx)}>
            <Text>{b}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  },
  SocialIcon: 'SocialIcon',
}));

// Mock app components
jest.mock('../../../../src/components/Slider', () => () => null);
jest.mock('../../../../src/components/SliderCr', () => () => null);
jest.mock('../../../../src/components/Button', () => {
  const React = require('react');
  const { Text, TouchableOpacity } = require('react-native');
  return function ButtonMock({ title, onPress, testID }) {
    return (
      <TouchableOpacity onPress={onPress} testID={testID || 'app_button'}>
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  };
});
jest.mock('../../../../src/components/SnackbarComponent', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return function SnackbarMock({ visible, textMessage }) {
    return <View testID="snackbar">{visible ? <Text>{textMessage}</Text> : null}</View>;
  };
});

// Mock CustomButtonGroup to expose accessibility labels
jest.mock('../../../../src/components/CustomButtonGroup', () => {
  const React = require('react');
  const { View, Text, TouchableOpacity } = require('react-native');
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

// Mock cards to simple placeholders exposing property id
jest.mock('../../../../src/screens/property/residential/rent/ResidentialRentCard', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return function RentCardMock({ item }) {
    return <View testID={`card_${item.property_id}`}><Text>RentCard</Text></View>;
  };
});
jest.mock('../../../../src/screens/property/residential/sell/ResidentialSellCard', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return function SellCardMock({ item }) {
    return <View testID={`card_${item.property_id}`}><Text>SellCard</Text></View>;
  };
});

// Mock axios (note: variable name starts with mock per Jest rule)
const mockAxios = jest.fn();
jest.mock('axios', () => (...args) => mockAxios(...args));

// Mock navigation focus hook
jest.mock('@react-navigation/native', () => ({
  useIsFocused: () => true,
}));

// Mock react-redux: connect + hooks
const mockSetResidentialPropertyList = jest.fn();
const mockSetAnyItemDetails = jest.fn();
const mockSetPropertyDetails = jest.fn();
const mockUseDispatch = jest.fn();
const mockUseSelector = jest.fn((selector) => selector({ dataRefresh: { shouldRefresh: false } }));
jest.mock('react-redux', () => ({
  connect: () => (Comp) => (props) => (
    <Comp
      {...props}
      userDetails={props.__user || { id: 1, works_for: null, user_type: 'owner', employee_role: '' }}
      residentialPropertyList={props.__initialList || []}
      setResidentialPropertyList={mockSetResidentialPropertyList}
      setAnyItemDetails={mockSetAnyItemDetails}
      setPropertyDetails={mockSetPropertyDetails}
    />
  ),
  useSelector: (cb) => cb({ dataRefresh: { shouldRefresh: false } }),
  useDispatch: () => mockUseDispatch,
}));

import ListingResidential from '../../../../src/screens/property/residential/ListingResidential';

const baseItem = {
  property_type: 'Residential',
  image_urls: [],
  owner_details: { name: 'Owner', mobile1: '9999999999' },
  property_address: {
    building_name: 'Skyline',
    landmark_or_street: 'MG Road',
    formatted_address: 'Skyline, MG Road, Pune',
  },
  property_details: { bhk_type: '2BHK', furnishing_status: 'Semi' },
  rent_details: { expected_rent: 23000, available_from: '2025-01-05T00:00:00.000Z' },
  sell_details: { expected_sell_price: 5500000, available_from: '2025-01-10T00:00:00.000Z' },
};

const makeItems = () => ([
  { ...baseItem, property_id: 'RENT123456', property_for: 'Rent' },
  { ...baseItem, property_id: 'SELL654321', property_for: 'Sell', property_address: { ...baseItem.property_address, building_name: 'Sunrise' } },
]);

const setup = (opts = {}) => {
  mockAxios.mockReset();
  mockSetResidentialPropertyList.mockClear();
  mockSetAnyItemDetails.mockClear();
  mockSetPropertyDetails.mockClear();

  const navigation = { navigate: jest.fn() };
  const route = { params: opts.params || {} };
  const list = opts.list || makeItems();
  const user = opts.user || undefined;
  if (opts.mockAxiosResponse !== undefined) {
    mockAxios.mockResolvedValue(opts.mockAxiosResponse);
  }

  // Pass initial list via special prop consumed by mocked connect
  const ui = render(<ListingResidential navigation={navigation} route={route} __initialList={list} __user={user} />);
  return { ...ui, navigation, list };
};

describe('ListingResidential', () => {
  it('renders list items for Rent and Sell', () => {
    const { getByTestId } = setup();
    expect(getByTestId('residential-rent-0')).toBeTruthy();
    expect(getByTestId('residential-rent-1')).toBeTruthy();
    // Card placeholders exist
    expect(getByTestId('card_RENT123456')).toBeTruthy();
    expect(getByTestId('card_SELL654321')).toBeTruthy();
  });

  it('navigates to details on item press (Rent and Sell)', () => {
    const { getByTestId, navigation, list } = setup();
    // Press Rent item index 0
    fireEvent.press(getByTestId('residential-rent-0'));
    expect(mockSetPropertyDetails).toHaveBeenCalledWith(list[0]);
    expect(navigation.navigate).toHaveBeenCalledWith('PropDetailsFromListing', expect.objectContaining({ item: list[0] }));

    // Press Sell item index 1
    fireEvent.press(getByTestId('residential-rent-1'));
    expect(mockSetPropertyDetails).toHaveBeenCalledWith(list[1]);
    expect(navigation.navigate).toHaveBeenCalledWith('PropDetailsFromListingForSell', expect.objectContaining({ item: list[1] }));
  });

  it('filters results via search box', () => {
    const { getByPlaceholderText, queryByTestId } = setup();
    fireEvent.changeText(getByPlaceholderText('Search By Name, Address, Id, Mobile'), 'Sunrise');
    // Should hide Skyline (rent) and keep Sunrise (sell)
    expect(queryByTestId('card_RENT123456')).toBeNull();
    expect(queryByTestId('card_SELL654321')).not.toBeNull();
  });

  it('shows Add New Property link when no listings and navigates to Add', async () => {
    // Ensure fetchData/getListing resolves to empty list
    const { findByText, navigation } = setup({ list: [], user: { id: 1, works_for: 1, user_type: 'owner', employee_role: '' }, mockAxiosResponse: { data: [] } });
    const link = await findByText('Add New Property');
    fireEvent.press(link);
    expect(navigation.navigate).toHaveBeenCalledWith('Add');
  });

  it('calls axios to fetch listings when works_for is present', async () => {
    // Re-mock react-redux connect to provide works_for id
    jest.doMock('react-redux', () => ({
      connect: () => (Comp) => (props) => (
        <Comp
          {...props}
          userDetails={{ id: 1, works_for: 1, user_type: 'owner', employee_role: '' }}
          residentialPropertyList={props.__initialList || []}
          setResidentialPropertyList={mockSetResidentialPropertyList}
          setAnyItemDetails={mockSetAnyItemDetails}
          setPropertyDetails={mockSetPropertyDetails}
        />
      ),
      useSelector: (cb) => cb({ dataRefresh: { shouldRefresh: true } }),
      useDispatch: () => mockUseDispatch,
    }));
    const ListingResidentialReloaded = require('../../../../src/screens/property/residential/ListingResidential').default;

    mockAxios.mockResolvedValueOnce({ data: [] });
    const navigation = { navigate: jest.fn() };
    render(<ListingResidentialReloaded navigation={navigation} route={{ params: {} }} __initialList={[]} />);

    await waitFor(() => expect(mockAxios).toHaveBeenCalled());
    const [url] = mockAxios.mock.calls[0];
    expect(String(url)).toContain('/residentialPropertyListings');
    expect(mockSetResidentialPropertyList).toHaveBeenCalled();
  });
});
