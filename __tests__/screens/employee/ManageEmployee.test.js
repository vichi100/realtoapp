import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

// Mock react-redux connect
jest.mock('react-redux', () => ({
  connect: () => (Component) => (props) => {
    const React = require('react');
    return React.createElement(Component, {
      ...props,
      employeeList: props.employeeList || [],
      userDetails: props.userDetails || { id: 1, works_for: 1, company_name: 'MyCo', address: 'Addr', city: 'City' },
      setEmployeeList: props.setEmployeeList || jest.fn(),
    });
  },
}));

// Mock axios function form
const mockAxios = jest.fn();
jest.mock('axios', () => (...args) => mockAxios(...args));

// Mock components that can cause RN/Jest issues
jest.mock('react-native-keyboard-aware-scroll-view', () => ({
  KeyboardAwareScrollView: ({ children }) => {
    const React = require('react');
    const { View } = require('react-native');
    return React.createElement(View, null, children);
  },
}));

// Mock Button and Snackbar to simple outputs
jest.mock('../../../src/components/Button', () => ({ title, onPress, accessibilityLabel, testID }) => {
  const React = require('react');
  const { Text } = require('react-native');
  return React.createElement(Text, { onPress, accessibilityLabel, testID }, title);
});
jest.mock('../../../src/components/SnackbarComponent', () => ({ visible, textMessage }) => {
  const React = require('react');
  const { Text } = require('react-native');
  return visible ? React.createElement(Text, { testID: 'snackbar' }, textMessage) : null;
});

// Mock icons
jest.mock('react-native-vector-icons/Ionicons', () => (props) => {
  const React = require('react');
  const { Text } = require('react-native');
  return React.createElement(Text, null, props.name || 'icon');
});

// Constants
jest.mock('../../../src/utils/Constant', () => ({ SERVER_URL: 'http://example.com' }));

import ManageEmployee from '../../../src/screens/employee/ManageEmployee';
// Mock react-native-paper to avoid SafeAreaProvider
jest.mock('react-native-paper', () => {
  const React = require('react');
  const { TextInput: RNTextInput, View, Text } = require('react-native');
  const TextInput = ({ label, value, onChangeText, onFocus, keyboardType, returnKeyType, style, theme }) => (
    React.createElement(RNTextInput, { accessibilityLabel: label, value, onChangeText, onFocus, keyboardType, returnKeyType, style })
  );
  return {
    TextInput,
    Divider: () => React.createElement(Text, null, 'Divider'),
    useTheme: () => ({ colors: { primary: '#000' } }),
  };
});

describe('ManageEmployee', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default axios response for initial getEmployeeList call
    mockAxios.mockResolvedValue({ data: [] });
  });

  test('shows validation errors when fields empty', async () => {
    const { getByTestId, getByText } = render(
      <ManageEmployee navigation={{ goBack: jest.fn(), navigate: jest.fn() }} route={{ params: {} }} />
    );
    fireEvent.press(getByTestId('manage_employee_add_button'));
    await waitFor(() => {
      expect(getByTestId('snackbar')).toBeTruthy();
      expect(getByText('Employee name is missing')).toBeTruthy();
    });
  });

  test('submits addEmployee and navigates back on success', async () => {
    mockAxios.mockResolvedValueOnce({ data: { id: 2, name: 'Emp', mobile: '9999999999' } });
    const goBack = jest.fn();
    const { getByTestId, getByLabelText } = render(
      <ManageEmployee navigation={{ goBack }} route={{ params: {} }} />
    );
    // Fill inputs
    fireEvent.changeText(getByLabelText('Employee Name*'), 'John');
    fireEvent.changeText(getByLabelText('Employee Mobile*'), '9999999999');
    fireEvent.press(getByTestId('manage_employee_add_button'));
    await waitFor(() => {
      expect(mockAxios).toHaveBeenCalledWith('http://example.com/addEmployee', expect.any(Object));
      expect(goBack).toHaveBeenCalled();
    });
  });

  test('edit mode calls updateEmployeeDetails', async () => {
    mockAxios.mockResolvedValueOnce({ data: { id: 3, name: 'Emp2', mobile: '8888888888' } });
    const goBack = jest.fn();
    const route = { params: { editEmp: true, empData: { id: 3, name: 'Old', mobile: '8888888888', employee_role: 'view' } } };
    const { getByTestId } = render(
      <ManageEmployee navigation={{ goBack }} route={route} />
    );
    fireEvent.press(getByTestId('manage_employee_update_button'));
    await waitFor(() => {
      expect(mockAxios).toHaveBeenCalledWith('http://example.com/updateEmployeeDetails', expect.any(Object));
      expect(goBack).toHaveBeenCalled();
    });
  });

  test('toggling role switches affects calculated role used in submission', async () => {
    mockAxios.mockResolvedValueOnce({ data: { id: 4, name: 'Emp3', mobile: '7777777777' } });
    const goBack = jest.fn();
    const { getByTestId, getByLabelText } = render(
      <ManageEmployee navigation={{ goBack }} route={{ params: {} }} />
    );
    fireEvent.changeText(getByLabelText('Employee Name*'), 'RoleUser');
    fireEvent.changeText(getByLabelText('Employee Mobile*'), '7777777777');
    // Enable Add, Master, Admin switches via accessibilityLabel
    fireEvent(getByLabelText('emp_role_add'), 'valueChange', true);
    fireEvent(getByLabelText('emp_role_master'), 'valueChange', true);
    fireEvent(getByLabelText('emp_role_admin'), 'valueChange', true);
    fireEvent.press(getByTestId('manage_employee_add_button'));
    await waitFor(() => {
      const call = mockAxios.mock.calls.find(c => c[0] === 'http://example.com/addEmployee');
      expect(call).toBeTruthy();
      const options = call[1];
      expect(options.data.employee_role).toBe('admin');
      expect(goBack).toHaveBeenCalled();
    });
  });
});
