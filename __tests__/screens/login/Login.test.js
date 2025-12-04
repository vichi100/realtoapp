import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

// Mock expo-linear-gradient to simple View
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: (props) => {
    const ReactLocal = require('react');
    return ReactLocal.createElement('View', null, props.children);
  },
}));

// Mock vector icon
jest.mock('react-native-vector-icons/Entypo', () => {
  const ReactLocal = require('react');
  return (props) => ReactLocal.createElement('Text', null, props.name || 'icon');
});

// Mock ImageBackground to render children
jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  const ReactLocal = require('react');
  return {
    ...rn,
    ImageBackground: ({ children }) => ReactLocal.createElement('View', null, children),
  };
});

// Mock react-redux connect to inject actions
jest.mock('react-redux', () => {
  const ReactLocal = require('react');
  return ({
    connect: () => (Component) => (props) => ReactLocal.createElement(Component, {
      ...props,
      setUserMobile: jest.fn(),
      setUserDetails: jest.fn(),
    }),
  });
});

import Screen from '../../../src/screens/login/Login';

describe('Login screen', () => {
  const navigation = { navigate: jest.fn() };
  beforeEach(() => jest.clearAllMocks());

  it('renders input and play icon, navigates to OtpScreen on Next', () => {
    const { getByTestId, getByText } = render(<Screen navigation={navigation} />);
    const input = getByTestId('mobileInput');
    fireEvent.changeText(input, '9833097595');
    const play = getByTestId('controller_play_login_icon');
    fireEvent.press(play);
    expect(navigation.navigate).toHaveBeenCalledWith('OtpScreen', { needToEnterOTP: true });
  });

  it('navigates to BottomTabScreen on Skip', () => {
    const { getByText } = render(<Screen navigation={navigation} />);
    fireEvent.press(getByText('Skip'));
    expect(navigation.navigate).toHaveBeenCalledWith('BottomTabScreen');
  });
});
