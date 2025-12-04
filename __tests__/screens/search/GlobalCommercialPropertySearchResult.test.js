import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

// Basic RN mocks to keep environment stable
jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({ get: () => ({ width: 375, height: 667 }) }));

// Mock icons as simple text components
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => {
  const ReactLocal = require('react');
  return (props) => {
    const { name, color, size } = props;
    return ReactLocal.createElement('Text', { accessibilityLabel: `icon-${name}` }, name || `icon-${color}-${size}`);
  };
});
jest.mock('react-native-vector-icons/AntDesign', () => {
  const ReactLocal = require('react');
  return (props) => {
    const { name } = props;
    return ReactLocal.createElement('Text', { accessibilityLabel: `icon-${name}` }, name || 'icon');
  };
});

// BottomSheet: render children when visible
jest.mock('react-native-btr', () => {
  const ReactLocal = require('react');
  return ({
    BottomSheet: ({ visible, children }) => (visible ? ReactLocal.createElement('View', null, children) : null),
  });
});

// RNE components simplified
jest.mock('@rneui/themed', () => {
  const ReactLocal = require('react');
  return ({
    ButtonGroup: ({ buttons = [], selectedIndex, onPress, vertical }) => (
      ReactLocal.createElement('View', { accessibilityLabel: vertical ? 'buttongroup-vertical' : 'buttongroup' },
        buttons.map((b, i) => ReactLocal.createElement('Text', {
          key: `${b}-${i}`,
          onPress: () => onPress(i),
        }, b))
      )
    ),
    CheckBox: ({ title, checked, onPress }) => (
      ReactLocal.createElement('Text', { onPress, accessibilityLabel: `checkbox-${title}` }, `${title}${checked ? '-checked' : ''}`)
    ),
    SocialIcon: (props) => ReactLocal.createElement('Text', null, `social-${props.type || 'icon'}`),
  });
});

// Mock custom components with minimal behavior
jest.mock('../../../src/components/Button', () => {
  const ReactLocal = require('react');
  return (props) => {
    const { title = 'Button', onPress } = props;
    return ReactLocal.createElement('Text', { onPress, accessibilityLabel: `button-${title}` }, title);
  };
});
jest.mock('../../../src/components/Slider', () => {
  const ReactLocal = require('react');
  return (props) => ReactLocal.createElement('Text', null, `slider-${props.min}-${props.max}`);
});
jest.mock('../../../src/components/SliderX', () => {
  const ReactLocal = require('react');
  return (props) => ReactLocal.createElement('Text', null, `sliderx-${props.min}-${props.max}`);
});
jest.mock('../../../src/components/SnackbarComponent', () => {
  const ReactLocal = require('react');
  return (props) => props.visible ? ReactLocal.createElement('Text', null, props.textMessage || 'Snackbar') : null;
});

// Mock child cards to simple touchables
jest.mock('../../../src/screens/property/commercial/rent/CommercialRentCard', () => {
  const ReactLocal = require('react');
  return (props) => {
    const { item } = props;
    return ReactLocal.createElement('Text', { onPress: props.onPress, accessibilityLabel: `rent-card-${item?.owner_details?.name || 'item'}` }, `RentCard:${item?.owner_details?.name || 'item'}`);
  };
});
jest.mock('../../../src/screens/property/commercial/sell/CommercialSellCard', () => {
  const ReactLocal = require('react');
  return (props) => {
    const { item } = props;
    return ReactLocal.createElement('Text', { onPress: props.onPress, accessibilityLabel: `sell-card-${item?.owner_details?.name || 'item'}` }, `SellCard:${item?.owner_details?.name || 'item'}`);
  };
});

// Mock axios
jest.mock('axios', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({ data: [] })),
}));

// Mock navigation hooks to avoid NavigationContainer requirements
jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(() => false),
  useFocusEffect: jest.fn(() => {}),
}));

// Mock redux connect and hooks
jest.mock('react-redux', () => {
  const ReactLocal = require('react');
  return ({
    connect: () => (Component) => (props) => (
      ReactLocal.createElement(Component, {
        ...props,
        userDetails: { id: 1, works_for: 1 },
        commercialPropertyList: props.commercialPropertyList || [],
        globalSearchResult: props.globalSearchResult || [],
        setCommercialPropertyList: jest.fn(),
      })
    ),
    useSelector: jest.fn(() => false),
    useDispatch: jest.fn(() => jest.fn()),
  });
});

import Screen from '../../../src/screens/search/GlobalCommercialPropertySearchResult';

// Mock react-native-paper to avoid SafeAreaProvider dependency
jest.mock('react-native-paper', () => {
  const ReactLocal = require('react');
  return {
    HelperText: (props) => ReactLocal.createElement('Text', null, props.children || 'HelperText'),
    Divider: () => ReactLocal.createElement('View', null),
    useTheme: () => ({ colors: { primary: '#000' } }),
  };
});

const sampleData = [
  {
    property_id: 1,
    property_type: 'Commercial',
    property_for: 'Rent',
    create_date_time: '2023-01-01T00:00:00Z',
    property_address: { building_name: 'Alpha', landmark_or_street: 'Main', location_area: 'Downtown' },
    owner_details: { name: 'Alice', mobile1: '1111111111' },
    rent_details: { expected_rent: 20000, available_from: '2024-12-01T00:00:00Z' },
    sell_details: { expected_sell_price: 1000000 },
    property_details: { property_used_for: 'Shop', ideal_for: ['Shop'], building_type: 'Mall', property_size: 500 },
    property_status: 0,
  },
  {
    property_id: 2,
    property_type: 'Commercial',
    property_for: 'Sell',
    create_date_time: '2023-01-02T00:00:00Z',
    property_address: { building_name: 'Beta', landmark_or_street: '2nd', location_area: 'Uptown' },
    owner_details: { name: 'Bob', mobile1: '2222222222' },
    rent_details: { expected_rent: 50000, available_from: '2025-01-01T00:00:00Z' },
    sell_details: { expected_sell_price: 5000000 },
    property_details: { property_used_for: 'Office', ideal_for: ['Office'], building_type: 'StandAlone', property_size: 1200 },
    property_status: 0,
  },
];

describe('GlobalCommercialPropertySearchResult screen', () => {
  const navigation = { navigate: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows empty state when no data', () => {
    const route = { params: {} };
    const { getByText } = render(<Screen navigation={navigation} route={route} globalSearchResult={[]} />);
    expect(getByText('You have no property listing')).toBeTruthy();
  });

  it('renders list items and navigates on press', async () => {
    const route = { params: {} };
    const { getByText } = render(<Screen navigation={navigation} route={route} globalSearchResult={sampleData} />);

    // Cards rendered via FlatList
    expect(getByText('RentCard:Alice')).toBeTruthy();
    expect(getByText('SellCard:Bob')).toBeTruthy();

    // Press rent card -> navigate to CommercialRentPropDetails
    fireEvent.press(getByText('RentCard:Alice'));
    expect(navigation.navigate).toHaveBeenCalledWith('CommercialRentPropDetails', expect.objectContaining({ item: expect.objectContaining({ owner_details: expect.objectContaining({ name: 'Alice' }) }) }));

    // Press sell card -> navigate to CommercialSellPropDetails
    fireEvent.press(getByText('SellCard:Bob'));
    expect(navigation.navigate).toHaveBeenCalledWith('CommercialSellPropDetails', expect.objectContaining({ item: expect.objectContaining({ owner_details: expect.objectContaining({ name: 'Bob' }) }) }));
  });

  it('opens sorting and filter bottom sheets via FAB', () => {
    const route = { params: {} };
    const { getAllByText, getByText } = render(<Screen navigation={navigation} route={route} globalSearchResult={sampleData} />);

    // Open sorting sheet via sort icon
    const sortIcon = getAllByText('sort')[0];
    fireEvent.press(sortIcon);
    // Sorting sheet content should be visible
    expect(getByText('Sort By')).toBeTruthy();

    // Open filter sheet via filter icon
    const filterIcon = getAllByText('filter-variant-plus')[0];
    fireEvent.press(filterIcon);
    expect(getByText('Filter')).toBeTruthy();
  });

  it('applies filter for Rent via ButtonGroup and shows only rent card', async () => {
    const route = { params: {} };
    const { getAllByText, queryByText, getByText } = render(
      <Screen navigation={navigation} route={route} globalSearchResult={sampleData} commercialPropertyList={sampleData} />
    );

    // Open filter sheet
    const filterIcon = getAllByText('filter-variant-plus')[0];
    fireEvent.press(filterIcon);
    expect(getByText('Filter')).toBeTruthy();

    // Select Looking For -> Rent
    const rentOption = getAllByText('Rent')[0];
    fireEvent.press(rentOption);

    // Apply filter
    fireEvent.press(getByText('Apply'));

    await waitFor(() => {
      expect(getByText('RentCard:Alice')).toBeTruthy();
      expect(queryByText('SellCard:Bob')).toBeNull();
    });
  });
});
