import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

// Mock redux connect to inject props
jest.mock('react-redux', () => ({
  connect: () => (Component) => (props) => {
    const React = require('react');
    return React.createElement(Component, {
      ...props,
      employeeList: props.employeeList || [
        { id: 1, name: 'Alice', mobile: '1111111111', photo: '', access_rights: 'read' },
        { id: 2, name: 'Bob', mobile: '2222222222', photo: '', access_rights: 'edit' },
      ],
      userDetails: props.userDetails || { id: 99, works_for: 77 },
      setEmployeeList: props.setEmployeeList || jest.fn(),
    });
  },
}));

// Mock axios
const mockAxios = jest.fn();
jest.mock('axios', () => (...args) => mockAxios(...args));

// Mock expo icons and RNE Avatar to simple components
jest.mock('@expo/vector-icons', () => ({
  Ionicons: ({ name, color, size }) => {
    const React = require('react');
    const { Text } = require('react-native');
    return React.createElement(Text, { accessibilityLabel: name }, name);
  },
}));
jest.mock('@rneui/themed', () => ({
  Avatar: (props) => {
    const React = require('react');
    const { View } = require('react-native');
    return React.createElement(View, { testID: 'avatar' });
  },
}));

// Mock makeCall
const mockMakeCall = jest.fn();
jest.mock('../../../src/utils/methods', () => ({ makeCall: (...args) => mockMakeCall(...args) }));

// SERVER_URL constant
jest.mock('../../../src/utils/Constant', () => ({ SERVER_URL: 'http://example.com' }));

import EmployeeAccess from '../../../src/screens/employee/EmployeeAccess';

describe('EmployeeAccess', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const baseItem = { id: 2, name: 'Bob', mobile: '2222222222', photo: '', access_rights: 'edit' };

  test('renders employee row when not current user', () => {
    const { getByText } = render(<EmployeeAccess item={baseItem} />);
    expect(getByText('Bob')).toBeTruthy();
    expect(getByText('+91 2222222222')).toBeTruthy();
  });

  test('returns null when item is current user', () => {
    const { toJSON } = render(
      <EmployeeAccess item={{ id: 99, name: 'Me', mobile: '9999999999', access_rights: 'read' }} />
    );
    expect(toJSON()).toBeNull();
  });

  test('removeEmployee posts and updates list', async () => {
    mockAxios.mockResolvedValueOnce({ data: 'success' });
    const setEmployeeList = jest.fn();
    const employeeList = [
      { id: 1, name: 'Alice', mobile: '1111111111', photo: '', access_rights: 'read' },
      baseItem,
    ];

    const { getByLabelText } = render(
      <EmployeeAccess item={baseItem} setEmployeeList={setEmployeeList} employeeList={employeeList} />
    );

    // Remove button is the Ionicons with name md-remove-circle-outline
    fireEvent.press(getByLabelText('md-remove-circle-outline'));

    await waitFor(() => {
      expect(mockAxios).toHaveBeenCalledWith('http://example.com/removeEmployee', expect.any(Object));
      expect(setEmployeeList).toHaveBeenCalledWith([
        { id: 1, name: 'Alice', mobile: '1111111111', photo: '', access_rights: 'read' },
      ]);
    });
  });

  test('Edit switch toggles via API success', async () => {
    mockAxios.mockResolvedValueOnce({ data: 'success' });
    const { getAllByRole } = render(<EmployeeAccess item={baseItem} />);
    // Two switches: [0] Read (disabled), [1] Edit (active)
    const switches = getAllByRole('switch');
    fireEvent(switches[1], 'valueChange', true);
    await waitFor(() => {
      expect(mockAxios).toHaveBeenCalledWith('http://example.com/updateEmployeeEditRights', expect.any(Object));
    });
  });

  test('call button invokes makeCall with mobile', () => {
    const { getByLabelText } = render(<EmployeeAccess item={baseItem} />);
    fireEvent.press(getByLabelText('md-call'));
    expect(mockMakeCall).toHaveBeenCalledWith('2222222222');
  });
});
