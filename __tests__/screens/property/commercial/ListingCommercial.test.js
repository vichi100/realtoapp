import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ListingCommercial from '../../../../src/screens/property/commercial/ListingCommercial';
import axios from 'axios';

jest.mock('axios', () => jest.fn());

// Mock vector icons and bottom sheet to keep the tree lightweight
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'MaterialCommunityIcons');
jest.mock('react-native-vector-icons/AntDesign', () => 'AntDesign');
jest.mock('react-native-btr', () => ({
  BottomSheet: ({ children }) => children,
}));

// Mock react-native-paper basics used in this screen
jest.mock('react-native-paper', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    HelperText: ({ children }) => <Text>{children}</Text>,
    Divider: () => null,
    useTheme: () => ({ colors: {} }),
  };
});

// Mock navigation focus hook to avoid requiring a NavigationContainer
jest.mock('@react-navigation/native', () => ({
  useIsFocused: () => false,
}));

// Partially mock react-redux hooks while keeping Provider/connect working
const actualReactRedux = jest.requireActual('react-redux');
jest.mock('react-redux', () => {
  const actual = jest.requireActual('react-redux');
  return {
    ...actual,
    useSelector: (selector) => selector({ dataRefresh: { shouldRefresh: false } }),
    useDispatch: () => jest.fn(),
  };
});

// Mock heavy subcomponents
jest.mock('../../../../src/components/Slider', () => 'Slider');
jest.mock('../../../../src/components/SliderCr', () => 'SliderCr');
jest.mock('../../../../src/components/SliderSmallNum', () => 'SliderSmallNum');

jest.mock('../../../../src/components/SnackbarComponent', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ visible, textMessage }) => (visible ? <Text>{textMessage}</Text> : null);
});

// Cards simplified to identifiable nodes
jest.mock('../../../../src/screens/property/commercial/rent/CommercialRentCard', () => {
  const React = require('react');
  const { Text, View } = require('react-native');
  return ({ item }) => {
    const id = item.property_id.slice(-6);
    return (
      <View>
        <Text testID={`rent_card_${id}`}>{item.property_address.building_name}</Text>
      </View>
    );
  };
});

jest.mock('../../../../src/screens/property/commercial/sell/CommercialSellCard', () => {
  const React = require('react');
  const { Text, View } = require('react-native');
  return ({ item }) => {
    const id = item.property_id.slice(-6);
    return (
      <View>
        <Text testID={`sell_card_${id}`}>{item.property_address.building_name}</Text>
      </View>
    );
  };
});

// RNE UI ButtonGroup can be heavy; provide a noop stub
jest.mock('@rneui/themed', () => ({
  ButtonGroup: () => null,
}));

const mockStore = configureStore([]);

const buildItem = (overrides = {}) => ({
  property_id: overrides.property_id || 'prop-abcdef123456',
  property_type: 'Commercial',
  property_for: overrides.property_for || 'Rent',
  property_status: 1,
  property_details: {
    property_used_for: overrides.used_for || 'Shop',
    property_size: overrides.size || 900,
    building_type: overrides.building_type || 'Mall',
  },
  rent_details: {
    expected_rent: overrides.rent || 45000,
    available_from: '2025-01-01',
  },
  sell_details: {
    expected_sell_price: overrides.sell_price || 5000000,
    available_from: '2025-02-01',
  },
  property_address: {
    building_name: overrides.building_name || 'Anant Villa',
    landmark_or_street: 'MG Road',
    formatted_address: 'Koregaon Park',
  },
  owner_details: { name: 'Owner', mobile1: '9999999999' },
  image_urls: [{ url: '/images/1.jpg' }],
});

const buildStore = (overrides = {}) =>
  mockStore({
    AppReducer: {
      userDetails: overrides.userDetails ?? null,
      commercialPropertyList: overrides.commercialPropertyList ?? [],
    },
    dataRefresh: { shouldRefresh: false },
  });

const buildNav = () => ({ navigate: jest.fn() });

describe('ListingCommercial', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders list with cards and footer; search narrows results', () => {
    const items = [
      buildItem({ property_id: 'prop-aaaaaa', building_name: 'Anant Villa', property_for: 'Rent' }),
      buildItem({ property_id: 'prop-bbbbbb', building_name: 'Banyan House', property_for: 'Sell' }),
    ];
    // userDetails.works_for null to avoid auto-fetch in useEffect
    const store = buildStore({ userDetails: { id: 'u1', works_for: null }, commercialPropertyList: items });
    const navigation = buildNav();

    const { getByTestId, getByPlaceholderText, queryByTestId, getByText } = render(
      <Provider store={store}>
        <ListingCommercial navigation={navigation} route={{ params: {} }} />
      </Provider>
    );

    expect(getByTestId('rent_card_aaaaaa')).toBeTruthy();
    expect(getByTestId('sell_card_bbbbbb')).toBeTruthy();
    expect(getByText('End')).toBeTruthy();

    fireEvent.changeText(
      getByPlaceholderText('Search By Name, Address, Id, Mobile'),
      'Anant'
    );

    expect(getByTestId('rent_card_aaaaaa')).toBeTruthy();
    expect(queryByTestId('sell_card_bbbbbb')).toBeNull();
  });

  it('shows empty state and navigates to Add when permitted', () => {
    const user = { id: 'agent-1', works_for: 'agent-1', user_type: 'agent' };
    axios.mockResolvedValueOnce({ data: [] });
    const store = buildStore({ userDetails: user, commercialPropertyList: [] });
    const navigation = buildNav();

    const { getByText } = render(
      <Provider store={store}>
        <ListingCommercial navigation={navigation} route={{ params: {} }} />
      </Provider>
    );

    return waitFor(() => {
      expect(getByText('You have no property listing')).toBeTruthy();
    }).then(() => {
      fireEvent.press(getByText('Add New Property'));
      expect(navigation.navigate).toHaveBeenCalledWith('Add');
    });
  });

  it('shows validation error when applying filter without purpose', async () => {
    const items = [buildItem({ property_id: 'prop-cccccc', building_name: 'Cedar Place', property_for: 'Rent' })];
    const store = buildStore({ userDetails: { id: 'u1', works_for: null }, commercialPropertyList: items });
    const navigation = buildNav();

    const { getByText, queryAllByText } = render(
      <Provider store={store}>
        <ListingCommercial navigation={navigation} route={{ params: {} }} />
      </Provider>
    );

    fireEvent.press(getByText('Apply'));
    await waitFor(() => {
      expect(queryAllByText('Looking for is missing in filter').length).toBeGreaterThan(0);
    });
  });
});
