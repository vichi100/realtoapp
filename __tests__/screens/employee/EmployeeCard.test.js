import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
// Ensure Dimensions.get is available in tests
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Dimensions = {
    get: () => ({ width: 400, height: 800 })
  };
  return RN;
});
jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: () => ({ width: 400, height: 800 })
}));

// Mock react-redux connect to inject props
jest.mock('react-redux', () => ({
  connect: () => (Component) => (props) => {
    const React = require('react');
    return React.createElement(Component, {
      ...props,
      userDetails: props.userDetails || { id: 99, name: 'Me', mobile: '+919990000001', works_for: 77, city: 'City', company_name: 'MyCo' },
      employeeList: props.employeeList || [],
      setCustomerDetailsForMeeting: props.setCustomerDetailsForMeeting || jest.fn(),
      setStartNavigationPoint: props.setStartNavigationPoint || jest.fn(),
      setCustomerDetails: props.setCustomerDetails || jest.fn(),
    });
  },
}));

// Mock axios as function since component uses axios(url, options)
const mockAxios = jest.fn();
jest.mock('axios', () => (...args) => mockAxios(...args));

// Mock icons and Avatar
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => (props) => {
  const React = require('react');
  const { Text } = require('react-native');
  return React.createElement(Text, { accessibilityLabel: props.name, testID: props.name }, props.name);
});
jest.mock('react-native-vector-icons/Ionicons', () => (props) => {
  const React = require('react');
  const { Text } = require('react-native');
  return React.createElement(Text, { accessibilityLabel: props.name, testID: props.name }, props.name);
});
jest.mock('@rneui/themed', () => ({
  Avatar: (props) => {
    const React = require('react');
    const { View } = require('react-native');
    return React.createElement(View, { testID: 'avatar' });
  },
  CheckBox: ({ onPress, checked }) => {
    const React = require('react');
    const { Text } = require('react-native');
    return React.createElement(Text, { testID: 'checkbox', accessibilityState: { checked }, onPress }, checked ? 'checked' : 'unchecked');
  },
  ButtonGroup: ({ onPress }) => {
    const React = require('react');
    const { Text } = require('react-native');
    return React.createElement(Text, { testID: 'buttongroup', onPress: () => onPress(0) }, 'Yes');
  },
}));

// Mock utilities
const mockMakeCall = jest.fn();
const mockCamalize = jest.fn((s) => s);
jest.mock('../../../src/utils/methods', () => ({
  makeCall: (...args) => mockMakeCall(...args),
  camalize: (s) => s,
}));
jest.mock('../../../src/utils/Constant', () => ({ SERVER_URL: 'http://example.com' }));

// Import component lazily after mocks for Dimensions are set
const loadComponent = () => require('../../../src/screens/employee/EmployeeCard').default;

const itemBase = {
  id: 2,
  name: 'Bob',
  mobile: '2222222222',
  company_name: 'Acme Inc',
  employee_role: 'admin',
  assigned_residential_rent_properties: [],
  assigned_residential_sell_properties: [],
  assigned_commercial_rent_properties: [],
  assigned_commercial_sell_properties: [],
  assigned_residential_rent_customers: [],
  assigned_residential_buy_customers: [],
  assigned_commercial_rent_customers: [],
  assigned_commercial_buy_customers: [],
};

describe('EmployeeCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders name, mobile and company', () => {
    const EmployeeCard = loadComponent();
    const { getByText } = render(<EmployeeCard item={itemBase} navigation={{ navigate: jest.fn() }} />);
    expect(getByText('Bob')).toBeTruthy();
    expect(getByText('2222222222')).toBeTruthy();
    expect(getByText('Acme Inc')).toBeTruthy();
  });

  test('navigates to PropertyListing on add property press', () => {
    const EmployeeCard = loadComponent();
    const navigate = jest.fn();
    const { getByTestId } = render(<EmployeeCard item={itemBase} navigation={{ navigate }} />);
    fireEvent.press(getByTestId(`add_property_icon_id_${itemBase.mobile.slice(-6)}`));
    expect(navigate).toHaveBeenCalledWith('PropertyListing', expect.objectContaining({ item: itemBase }));
  });

  test('navigates to ContactsListing on add customer press', () => {
    const EmployeeCard = loadComponent();
    const navigate = jest.fn();
    const { getByTestId } = render(<EmployeeCard item={itemBase} navigation={{ navigate }} />);
    fireEvent.press(getByTestId(`add_customer_icon_id_${itemBase.mobile.slice(-6)}`));
    expect(navigate).toHaveBeenCalledWith('ContactsListing', expect.objectContaining({ item: itemBase }));
  });

  test('call icon triggers makeCall', () => {
    const EmployeeCard = loadComponent();
    const { getByTestId } = render(<EmployeeCard item={itemBase} navigation={{ navigate: jest.fn() }} />);
    fireEvent.press(getByTestId('call'));
    expect(mockMakeCall).toHaveBeenCalledWith('2222222222');
  });

  test('checkbox reflects isChecked and toggles update via API', async () => {
    const EmployeeCard = loadComponent();
    const itemForAddEmplyee = { property_id: 10, property_for: 'Rent', property_type: 'Residential', assigned_to_employee: [], assigned_to_employee_name: [] };
    mockAxios.mockResolvedValueOnce({ data: 'success' });
    const { getByTestId } = render(
      <EmployeeCard item={itemBase} navigation={{ navigate: jest.fn() }} displayCheckBox itemForAddEmplyee={itemForAddEmplyee} />
    );
    // Initially unchecked; press to toggle
    fireEvent.press(getByTestId('checkbox'));
    await waitFor(() => {
      expect(mockAxios).toHaveBeenCalledWith('http://example.com/updatePropertiesForEmployee', expect.any(Object));
    });
  });
});
