import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

// Mock icons
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => {
  const ReactLocal = require('react');
  return (props) => ReactLocal.createElement('Text', null, props.name || 'icon');
});
jest.mock('react-native-vector-icons/AntDesign', () => {
  const ReactLocal = require('react');
  return (props) => ReactLocal.createElement('Text', null, props.name || 'icon');
});

// Mock BottomSheet and RNE components if used
jest.mock('react-native-btr', () => ({ BottomSheet: ({ children }) => children }));
jest.mock('@rneui/themed', () => ({
  ButtonGroup: ({ buttons = [], onPress }) => {
    const ReactLocal = require('react');
    return ReactLocal.createElement('Text', { onPress: () => onPress && onPress(0) }, `ButtonGroup:${buttons.join(',')}`);
  },
  SocialIcon: () => { const ReactLocal = require('react'); return ReactLocal.createElement('Text', null, 'SocialIcon'); },
}));

// Mock paper components
jest.mock('react-native-paper', () => {
  const ReactLocal = require('react');
  return {
    HelperText: (props) => ReactLocal.createElement('Text', null, props.children || ''),
    useTheme: () => ({ colors: { primary: '#000' } }),
    Divider: () => ReactLocal.createElement('Text', null, 'Divider'),
  };
});

// Mock list item cards as simple text elements we can query
jest.mock('../../../src/screens/contacts/residential/rent/ContactResidentialRentCard', () => {
  const ReactLocal = require('react');
  return ({ item }) => ReactLocal.createElement('Text', null, `ResRent:${item.customer_details.name}`);
});
jest.mock('../../../src/screens/contacts/residential/buy/ContactResidentialSellCard', () => {
  const ReactLocal = require('react');
  return ({ item }) => ReactLocal.createElement('Text', null, `ResBuy:${item.customer_details.name}`);
});
jest.mock('../../../src/screens/contacts/commercial/rent/CustomerCommercialRentCard', () => {
  const ReactLocal = require('react');
  return ({ item }) => ReactLocal.createElement('Text', null, `ComRent:${item.customer_details.name}`);
});
jest.mock('../../../src/screens/contacts/commercial/buy/CustomerCommercialBuyCard', () => {
  const ReactLocal = require('react');
  return ({ item }) => ReactLocal.createElement('Text', null, `ComBuy:${item.customer_details.name}`);
});

// Mock axios
jest.mock('axios', () => ({ __esModule: true, default: jest.fn(() => Promise.resolve({ status: 200, data: [] })) }));

// Mock react-redux connect to inject props
jest.mock('react-redux', () => {
  const ReactLocal = require('react');
  return ({
    connect: () => (Component) => (props) => ReactLocal.createElement(Component, {
      ...props,
      userDetails: props.userDetails || {
        id: 1,
        works_for: 1,
        user_type: 'agent',
      },
      propertyDetails: props.propertyDetails || {
        property_type: 'Residential',
        property_for: 'Rent',
        property_id: 10,
        agent_id: 1,
      },
      customerListForMeeting: props.customerListForMeeting || [],
      commercialCustomerList: props.commercialCustomerList || [],
      residentialCustomerList: props.residentialCustomerList || [],
      setCustomerListForMeeting: jest.fn(),
    }),
  });
});

import Screen from '../../../src/screens/meeting/CustomerListForMeeting';

describe('CustomerListForMeeting', () => {
  const navigation = { navigate: jest.fn() };
  beforeEach(() => jest.clearAllMocks());

  const makeItem = (type, purpose, name = 'John Doe') => ({
    customer_details: { name, address: 'Addr', mobile1: '9999999999' },
    customer_locality: { property_type: type, property_for: purpose, location_area: [{ main_text: 'Area' }] },
    customer_id: 'C123',
  });

  it('shows empty state and Add New Customer for owner/employee', () => {
    const { getByText } = render(<Screen navigation={navigation} />);
    expect(getByText('You have no customer')).toBeTruthy();
    expect(getByText('Add New Customer')).toBeTruthy();
  });

  it('renders Residential Rent list and navigates on item press', async () => {
    const items = [makeItem('Residential', 'Rent', 'Alice')];
    const { getByText, getByPlaceholderText } = render(
      <Screen navigation={navigation} customerListForMeeting={items} userDetails={{ id: 1, works_for: null }} />
    );
    // Trigger setting data from props via searchFilterFunction with empty text
    const input = getByPlaceholderText('Search By Name, Address, Id, Mobile');
    fireEvent.changeText(input, '');

    const cardText = await waitFor(() => getByText('ResRent:Alice'));
    fireEvent.press(cardText);
    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('CustomerDetailsResidentialRentFromList', expect.objectContaining({ item: expect.any(Object), displayMatchCount: false }));
    });
  });

  it('search filters list by customer details content', () => {
    const items = [makeItem('Residential', 'Buy', 'Bob'), makeItem('Commercial', 'Rent', 'Charlie')];
    const { getByPlaceholderText, queryByText } = render(
      <Screen navigation={navigation} customerListForMeeting={items} />
    );
    const input = getByPlaceholderText('Search By Name, Address, Id, Mobile');
    fireEvent.changeText(input, 'Bob');
    expect(queryByText('ResBuy:Bob')).toBeTruthy();
    expect(queryByText('ComRent:Charlie')).toBeFalsy();
  });
});
