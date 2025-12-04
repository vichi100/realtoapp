import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

// Mock vector icons and paper components
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => {
  const ReactLocal = require('react');
  return (props) => ReactLocal.createElement('Text', null, props.name || 'icon');
});
jest.mock('react-native-vector-icons/MaterialIcons', () => {
  const ReactLocal = require('react');
  return (props) => ReactLocal.createElement('Text', null, props.name || 'icon');
});
jest.mock('react-native-vector-icons/AntDesign', () => {
  const ReactLocal = require('react');
  return (props) => ReactLocal.createElement('Text', null, props.name || 'icon');
});
jest.mock('react-native-paper', () => {
  const ReactLocal = require('react');
  return {
    Title: (props) => ReactLocal.createElement('Text', null, props.children),
    Caption: (props) => ReactLocal.createElement('Text', null, props.children),
    Text: (props) => ReactLocal.createElement('Text', null, props.children),
    TouchableRipple: (props) => ReactLocal.createElement('Text', { onPress: props.onPress }, props.children ? 'TouchableRipple' : 'TouchableRipple'),
  };
});

// Mock RNE Avatar
jest.mock('@rneui/themed', () => ({
  Avatar: (props) => {
    const ReactLocal = require('react');
    return ReactLocal.createElement('Text', null, `Avatar:${props.title || ''}`);
  },
}));

// Mock Home component to avoid heavy render
jest.mock('../../../src/screens/dashboard/Home', () => {
  const ReactLocal = require('react');
  return () => ReactLocal.createElement('Text', null, 'HomeComponent');
});

// Mock navigation focus hooks
jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(() => {}),
}));

// Mock axios
jest.mock('axios', () => ({ __esModule: true, default: jest.fn(() => Promise.resolve({ status: 200, data: {} })) }));

// Mock makeCall
jest.mock('../../../src/utils/methods', () => ({ makeCall: jest.fn() }));

// Mock react-redux connect
jest.mock('react-redux', () => {
  const ReactLocal = require('react');
  return ({
    connect: () => (Component) => (props) => ReactLocal.createElement(Component, {
      ...props,
      userDetails: props.userDetails || {
        id: 1,
        works_for: 1,
        name: 'Alice Agent',
        company_name: 'Acme Realty',
        city: 'Mumbai',
        mobile: '+911234567890',
        user_type: 'agent',
      },
      setUserDetails: jest.fn(),
    }),
  });
});

import Screen from '../../../src/screens/profile/Profile';
import { makeCall } from '../../../src/utils/methods';

describe('Profile screen', () => {
  const navigation = { navigate: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders user info and shows MY EMPLOYEE button for agent-owner', () => {
    const route = { params: { didDbCall: false } };
    const { getByText } = render(<Screen navigation={navigation} route={route} />);
    expect(getByText('Avatar:A')).toBeTruthy();
    expect(getByText('Alice Agent')).toBeTruthy();
    expect(getByText('Acme Realty')).toBeTruthy();
    expect(getByText('Mumbai')).toBeTruthy();
    expect(getByText('+911234567890')).toBeTruthy();
    // Button text
    expect(getByText('MY EMPLOYEE')).toBeTruthy();
  });

  it('presses Support and calls makeCall', () => {
    const route = { params: { didDbCall: false } };
    const { getAllByText } = render(<Screen navigation={navigation} route={route} />);
    // TouchableRipple is mocked to simple Text; there are multiple, pick first occurrence for Support row
    const touchables = getAllByText('TouchableRipple');
    // Second ripple is Support based on render order: Share, Support, Email (conditional), Privacy
    fireEvent.press(touchables[1]);
    expect(makeCall).toHaveBeenCalledWith('+919833097595');
  });

  it('renders for employee user without crashing', () => {
    const route = { params: { didDbCall: false } };
    const employeeDetails = {
      id: 2,
      works_for: 1,
      name: 'Bob Emp',
      company_name: 'Acme Realty',
      city: 'Pune',
      mobile: '+919999999999',
      user_type: 'employee',
      employee_role: 'manager',
    };
    const { getByText } = render(<Screen navigation={navigation} route={route} userDetails={employeeDetails} />);
    expect(getByText('Avatar:B')).toBeTruthy();
    expect(getByText('Bob Emp')).toBeTruthy();
  });
});
