import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

// Basic RN mocks
jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({ get: () => ({ width: 375, height: 667 }) }));

// Icon mocks
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

// BottomSheet mock
jest.mock('react-native-btr', () => {
  const ReactLocal = require('react');
  return ({
    BottomSheet: ({ visible, children }) => (visible ? ReactLocal.createElement('View', null, children) : null),
  });
});

// RNE UI mocks
jest.mock('@rneui/themed', () => {
  const ReactLocal = require('react');
  return ({
    ButtonGroup: ({ buttons = [], onPress, vertical }) => (
      ReactLocal.createElement('View', { accessibilityLabel: vertical ? 'buttongroup-vertical' : 'buttongroup' },
        buttons.map((b, i) => ReactLocal.createElement('Text', { key: `${b}-${i}`, onPress: () => onPress(i) }, b))
      )
    ),
    SocialIcon: (props) => ReactLocal.createElement('Text', null, `social-${props.type || 'icon'}`),
  });
});

// react-native-paper mock
jest.mock('react-native-paper', () => {
  const ReactLocal = require('react');
  return {
    HelperText: (props) => ReactLocal.createElement('Text', null, props.children || 'HelperText'),
    Divider: () => ReactLocal.createElement('View', null),
    useTheme: () => ({ colors: { primary: '#000' } }),
  };
});

// Custom components mocks
jest.mock('../../../src/components/Button', () => {
  const ReactLocal = require('react');
  return (props) => ReactLocal.createElement('Text', { onPress: props.onPress, accessibilityLabel: `button-${props.title || 'Button'}` }, props.title || 'Button');
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

// Child cards mocks
jest.mock('../../../src/screens/property/residential/rent/ResidentialRentCard', () => {
  const ReactLocal = require('react');
  return (props) => ReactLocal.createElement('Text', { onPress: props.onPress }, `RentCard:${props.item?.owner_details?.name || 'item'}`);
});
jest.mock('../../../src/screens/property/residential/sell/ResidentialSellCard', () => {
  const ReactLocal = require('react');
  return (props) => ReactLocal.createElement('Text', { onPress: props.onPress }, `SellCard:${props.item?.owner_details?.name || 'item'}`);
});

// axios mock
jest.mock('axios', () => ({ __esModule: true, default: jest.fn(() => Promise.resolve({ data: [] })) }));

// navigation hooks mock
jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(() => false),
  useFocusEffect: jest.fn(() => {}),
}));

// redux mocks
jest.mock('react-redux', () => {
  const ReactLocal = require('react');
  return ({
    connect: () => (Component) => (props) => (
      ReactLocal.createElement(Component, {
        ...props,
        userDetails: { id: 1, works_for: 1 },
        residentialPropertyList: props.residentialPropertyList || [],
        globalSearchResult: props.globalSearchResult || [],
        setResidentialPropertyList: jest.fn(),
      })
    ),
    useSelector: jest.fn(() => false),
    useDispatch: jest.fn(() => jest.fn()),
  });
});

import Screen from '../../../src/screens/search/GlobalResidentialPropertySearchResult';

const sampleData = [
  {
    property_id: 1,
    property_type: 'Residential',
    property_for: 'Rent',
    create_date_time: '2023-01-01T00:00:00Z',
    property_address: { building_name: 'Alpha', landmark_or_street: 'Main', location_area: 'Downtown' },
    owner_details: { name: 'Alice', mobile1: '1111111111' },
    rent_details: { expected_rent: 20000, available_from: '2024-12-01T00:00:00Z' },
    sell_details: { expected_sell_price: 1000000 },
    property_details: { house_type: 'Apartment', bhk_type: '2BHK', furnishing_status: 'Semi' },
    property_status: 0,
  },
  {
    property_id: 2,
    property_type: 'Residential',
    property_for: 'Sell',
    create_date_time: '2023-01-02T00:00:00Z',
    property_address: { building_name: 'Beta', landmark_or_street: '2nd', location_area: 'Uptown' },
    owner_details: { name: 'Bob', mobile1: '2222222222' },
    rent_details: { expected_rent: 50000, available_from: '2025-01-01T00:00:00Z' },
    sell_details: { expected_sell_price: 5000000 },
    property_details: { house_type: 'Villa', bhk_type: '3BHK', furnishing_status: 'Full' },
    property_status: 0,
  },
];

describe('GlobalResidentialPropertySearchResult screen', () => {
  const navigation = { navigate: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows empty state when no data', () => {
    const route = { params: {} };
    const { getByText } = render(<Screen navigation={navigation} route={route} globalSearchResult={[]} />);
    expect(getByText('You have no property listing')).toBeTruthy();
  });

  it('renders items and navigates on press', () => {
    const route = { params: {} };
    const { getByText } = render(<Screen navigation={navigation} route={route} globalSearchResult={sampleData} />);
    expect(getByText('RentCard:Alice')).toBeTruthy();
    expect(getByText('SellCard:Bob')).toBeTruthy();

    fireEvent.press(getByText('RentCard:Alice'));
    expect(navigation.navigate).toHaveBeenCalledWith('PropDetailsFromListing', expect.objectContaining({ item: expect.objectContaining({ owner_details: expect.objectContaining({ name: 'Alice' }) }) }));

    fireEvent.press(getByText('SellCard:Bob'));
    expect(navigation.navigate).toHaveBeenCalledWith('PropDetailsFromListingForSell', expect.objectContaining({ item: expect.objectContaining({ owner_details: expect.objectContaining({ name: 'Bob' }) }) }));
  });

  it('opens sorting and filter bottom sheets via FAB', () => {
    const route = { params: {} };
    const { getAllByText, getByText } = render(<Screen navigation={navigation} route={route} globalSearchResult={sampleData} />);

    const sortIcon = getAllByText('sort')[0];
    fireEvent.press(sortIcon);
    expect(getByText('Sort By')).toBeTruthy();

    const filterIcon = getAllByText('filter-variant-plus')[0];
    fireEvent.press(filterIcon);
    expect(getByText('Filter')).toBeTruthy();
  });

  it('filters by Rent and shows only rent card', async () => {
    const route = { params: {} };
    const { getAllByText, getByText, queryByText } = render(
      <Screen navigation={navigation} route={route} globalSearchResult={sampleData} residentialPropertyList={sampleData} />
    );

    const filterIcon = getAllByText('filter-variant-plus')[0];
    fireEvent.press(filterIcon);
    expect(getByText('Filter')).toBeTruthy();

    const rentOption = getAllByText('Rent')[0];
    fireEvent.press(rentOption);

    fireEvent.press(getByText('Apply'));

    await waitFor(() => {
      expect(getByText('RentCard:Alice')).toBeTruthy();
      expect(queryByText('SellCard:Bob')).toBeNull();
    });
  });
});
