import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

// Mock react-redux connect to inject props
jest.mock('react-redux', () => ({
  connect: () => (Component) => (props) => {
    const React = require('react');
    return React.createElement(Component, {
      ...props,
      userDetails: props.userDetails || { id: 1, works_for: 1, user_type: 'employee', employee_role: 'admin' },
      residentialCustomerList: props.residentialCustomerList || [],
      employeeList: props.employeeList || [
        { id: 11, name: 'Alice', mobile: '1111111111' },
        { id: 22, name: 'Bob', mobile: '2222222222' },
      ],
      setEmployeeList: props.setEmployeeList || jest.fn(),
    });
  },
  useDispatch: () => () => {},
}));

// Mock navigation hooks
jest.mock('@react-navigation/native', () => ({ useFocusEffect: () => {} }));

// Mock axios (function form)
const mockAxios = jest.fn();
jest.mock('axios', () => (...args) => mockAxios(...args));

// Mock icons and paper components to simple text
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => (props) => {
  const React = require('react');
  const { Text } = require('react-native');
  return React.createElement(Text, { accessibilityLabel: props.name }, props.name);
});
jest.mock('react-native-vector-icons/AntDesign', () => (props) => {
  const React = require('react');
  const { Text } = require('react-native');
  return React.createElement(Text, { accessibilityLabel: props.name, testID: props.name }, props.name);
});

jest.mock('../../../src/utils/Constant', () => ({ SERVER_URL: 'http://example.com' }));
jest.mock('../../../src/utils/AppConstant', () => ({ EMPLOYEE_ROLE: ['admin','master','add'] }));

// Mock EmployeeCard to a simple representation to avoid deep tree
jest.mock('../../../src/screens/employee/EmployeeCard', () => ({ item }) => {
  const React = require('react');
  const { Text } = require('react-native');
  return React.createElement(Text, { testID: `employee-${item.id}` }, item.name);
});

import EmployeeList from '../../../src/screens/employee/EmployeeList';
// Mock react-native-paper components to avoid SafeAreaProvider issues
jest.mock('react-native-paper', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    HelperText: (props) => React.createElement(Text, null, props.children || 'HelperText'),
    Divider: () => React.createElement(Text, null, 'Divider'),
    useTheme: () => ({ colors: { primary: '#000' } }),
  };
});

describe('EmployeeList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders list with employees and footer', async () => {
    // Mock initial listing fetch
    mockAxios.mockResolvedValueOnce({ data: [{ id: 11, name: 'Alice', mobile: '1111111111' }] });
    const navigation = { navigate: jest.fn() };
    const { getByTestId, getByText } = render(
      <EmployeeList navigation={navigation} route={{ params: {} }} />
    );

    await waitFor(() => {
      expect(getByTestId('employee-11')).toBeTruthy();
      expect(getByText('End')).toBeTruthy();
    });
  });

  test('empty state shows Add New Employee and navigates on press', async () => {
    mockAxios.mockResolvedValueOnce({ data: [] });
    const navigation = { navigate: jest.fn() };
    const { getByText } = render(
      <EmployeeList navigation={navigation} route={{ params: {} }} />
    );

    await waitFor(() => getByText('You have no Employee'));
    fireEvent.press(getByText('Add New Employee'));
    expect(navigation.navigate).toHaveBeenCalledWith('ManageEmployee');
  });

  test('search filters list by name/mobile', async () => {
    mockAxios.mockResolvedValueOnce({ data: [
      { id: 11, name: 'Alice', mobile: '1111111111' },
      { id: 22, name: 'Bob', mobile: '2222222222' },
    ] });
    const { getByPlaceholderText, queryByTestId, findByPlaceholderText } = render(
      <EmployeeList navigation={{ navigate: jest.fn() }} route={{ params: {} }} />
    );

    const input = await findByPlaceholderText('Search By Name, Mobile');
    fireEvent.changeText(input, 'Bob');
    await waitFor(() => {
      expect(queryByTestId('employee-22')).toBeTruthy();
    });
  });

  test('floating add button navigates to ManageEmployee', async () => {
    mockAxios.mockResolvedValueOnce({ data: [{ id: 11, name: 'Alice', mobile: '1111111111' }] });
    const navigation = { navigate: jest.fn() };
    const { getByLabelText } = render(
      <EmployeeList navigation={navigation} route={{ params: {} }} />
    );
    await waitFor(() => getByLabelText('add_employee_icon'));
    fireEvent.press(getByLabelText('add_employee_icon'));
    expect(navigation.navigate).toHaveBeenCalledWith('ManageEmployee');
  });
});
