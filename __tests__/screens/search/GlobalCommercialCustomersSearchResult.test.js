import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

// Stable RN Dimensions
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return { ...RN, Dimensions: { get: () => ({ width: 400, height: 800 }) } };
});

// Mock vector icons to text
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ name }) => <Text>{name}</Text>;
});
jest.mock('react-native-vector-icons/AntDesign', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ name }) => <Text>{name}</Text>;
});

// Mock BottomSheet render children when visible
jest.mock('react-native-btr', () => ({
  BottomSheet: ({ visible, children }) => (visible ? children : null),
}));

// Mock @rneui/themed ButtonGroup + CheckBox
jest.mock('@rneui/themed', () => {
  const React = require('react');
  const { View, Text, TouchableOpacity } = require('react-native');
  return {
    ButtonGroup: ({ buttons = [], onPress }) => (
      <View>
        {buttons.map((b, i) => (
          <TouchableOpacity key={i} onPress={() => onPress && onPress(i)}>
            <Text>{b}</Text>
          </TouchableOpacity>
        ))}
      </View>
    ),
    CheckBox: ({ title, onPress }) => (
      <TouchableOpacity onPress={onPress}><Text>{title}</Text></TouchableOpacity>
    ),
    SocialIcon: () => null,
  };
});

// Mock app components
jest.mock('../../../src/components/Button', () => {
  const React = require('react');
  const { TouchableOpacity, Text } = require('react-native');
  return ({ title, onPress }) => (
    <TouchableOpacity accessibilityRole="button" onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
});
jest.mock('../../../src/components/Slider', () => () => null);
jest.mock('../../../src/components/SliderX', () => () => null);
jest.mock('../../../src/components/SnackbarComponent', () => ({ visible, textMessage, actionText }) => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return visible ? (
    <View>
      <Text>{textMessage || 'OK'}</Text>
      <Text>{actionText || 'OK'}</Text>
    </View>
  ) : null;
});

// Mock child cards to simple touchables with labels
jest.mock('../../../src/screens/contacts/commercial/rent/CustomerCommercialRentCard', () => {
  const React = require('react');
  const { TouchableOpacity, Text } = require('react-native');
  return ({ item }) => (
    <TouchableOpacity>
      <Text>{`RentCard:${item.customer_details.name}`}</Text>
    </TouchableOpacity>
  );
});
jest.mock('../../../src/screens/contacts/commercial/buy/CustomerCommercialBuyCard', () => {
  const React = require('react');
  const { TouchableOpacity, Text } = require('react-native');
  return ({ item }) => (
    <TouchableOpacity>
      <Text>{`BuyCard:${item.customer_details.name}`}</Text>
    </TouchableOpacity>
  );
});

// Mock axios
jest.mock('axios', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({ data: [] })),
}));

// Mock react-redux connect to inject props
jest.mock('react-redux', () => {
  const actual = jest.requireActual('react-redux');
  return {
    ...actual,
    connect: () => (Component) => (props) => {
      const injected = {
        navigation: props.navigation || { navigate: jest.fn() },
        route: props.route || { params: {} },
        userDetails: props.userDetails || { id: 'u1', works_for: 'a1' },
        commercialCustomerList: props.commercialCustomerList || [],
        globalSearchResult: props.globalSearchResult || [],
        setCommercialCustomerList: jest.fn(),
      };
      return <Component {...injected} {...props} />;
    },
    useSelector: (fn) => fn({ dataRefresh: { shouldRefresh: false } }),
    useDispatch: () => jest.fn(),
  };
});

import GlobalCommercialCustomersSearchResult from '../../../src/screens/search/GlobalCommercialCustomersSearchResult';
// Mock navigation hooks to avoid needing NavigationContainer
jest.mock('@react-navigation/native', () => ({
  useIsFocused: () => false,
  useFocusEffect: () => {},
}));

const sampleRent = {
  customer_id: 'c1',
  customer_details: { name: 'Alice', address: 'Addr1', mobile1: '9999' },
  customer_locality: { property_type: 'Commercial', property_for: 'Rent', location_area: 'Area1' },
  customer_rent_details: { expected_rent: 25000 },
  rent_details: { available_from: new Date().toISOString() },
  create_date_time: new Date().toISOString(),
};
const sampleBuy = {
  customer_id: 'c2',
  customer_details: { name: 'Bob', address: 'Addr2', mobile1: '8888' },
  customer_locality: { property_type: 'Commercial', property_for: 'Buy', location_area: 'Area2' },
  customer_buy_details: { expected_buy_price: 5000000 },
  rent_details: { available_from: new Date().toISOString() },
  create_date_time: new Date().toISOString(),
};

describe('GlobalCommercialCustomersSearchResult', () => {
  test('shows empty state when no data', () => {
    const screen = render(<GlobalCommercialCustomersSearchResult globalSearchResult={[]} />);
    expect(screen.getByText('You have no property listing')).toBeTruthy();
  });

  test('renders list and navigates to rent/buy details on press', () => {
    const navigate = jest.fn();
    const screen = render(
      <GlobalCommercialCustomersSearchResult
        navigation={{ navigate }}
        globalSearchResult={[sampleRent, sampleBuy]}
      />
    );

    // Cards rendered via mocks
    expect(screen.getByText('RentCard:Alice')).toBeTruthy();
    expect(screen.getByText('BuyCard:Bob')).toBeTruthy();

    // Press on rent card container touchable by pressing its label inside
    fireEvent.press(screen.getByText('RentCard:Alice'));
    expect(navigate).toHaveBeenCalledWith('CustomerDetailsCommercialRentFromList', expect.objectContaining({ displayMatchCount: true }));

    fireEvent.press(screen.getByText('BuyCard:Bob'));
    expect(navigate).toHaveBeenCalledWith('CustomerDetailsCommercialBuyFromList', expect.objectContaining({ displayMatchCount: true }));
  });

  test('opens sorting and filter sheets from fab', () => {
    const screen = render(<GlobalCommercialCustomersSearchResult globalSearchResult={[sampleRent]} />);
    // Open sorting
    fireEvent.press(screen.getByText('sort'));
    // Sorting sheet content visible
    expect(screen.getByText('Customer Looking For')).toBeTruthy();
    expect(screen.getByText('Rent')).toBeTruthy();

    // Open filter
    fireEvent.press(screen.getByText('filter-variant-plus'));
    expect(screen.getByText('Filter')).toBeTruthy();
    expect(screen.getByText('Prop type')).toBeTruthy();
    expect(screen.getByText('Building type')).toBeTruthy();
  });

  test('applies simple filter by Looking For = Rent', () => {
    const screen = render(<GlobalCommercialCustomersSearchResult globalSearchResult={[sampleRent, sampleBuy]} commercialCustomerList={[sampleRent, sampleBuy]} />);
    // Open filter
    fireEvent.press(screen.getByText('filter-variant-plus'));
    // Choose Looking For = Rent
    fireEvent.press(screen.getByText('Rent'));
    // Apply
    fireEvent.press(screen.getByText('Apply'));
    // Only rent card should remain
    expect(screen.getByText('RentCard:Alice')).toBeTruthy();
  });
});
