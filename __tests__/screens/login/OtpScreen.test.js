import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';

// Mock react-redux connect to inject props directly
jest.mock('react-redux', () => ({
  connect: () => (Component) => (props) => {
    const React = require('react');
    const [ud, setUd] = React.useState(props.userDetails || null);
    const setUserDetails = props.setUserDetails || ((data) => setUd(data));
    return React.createElement(Component, {
      ...props,
      userDetails: ud,
      country: props.country || 'India',
      countryCode: props.countryCode || '+91',
      userMobileNumber: props.userMobileNumber || '9999999999',
      setUserDetails,
    });
  },
}));

// Mock axios with post method
const mockPost = jest.fn();
jest.mock('axios', () => ({
  post: (...args) => mockPost(...args),
}));

// Mock Counter to expose a clickable Resend (avoid out-of-scope vars)
jest.mock('../../../src/screens/common/Counter', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ resendOTP }) => (
    React.createElement(React.Fragment, null,
      React.createElement(Text, null, 'Resend OTP'),
      React.createElement(Text, { testID: 'resend', onPress: resendOTP }, 'Resend')
    )
  );
});

// Mock OTP input to allow triggering onFilled
jest.mock('react-native-otp-entry', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    OtpInput: ({ onFilled, textInputProps }) => (
      React.createElement(Text, {
        accessibilityLabel: (textInputProps && textInputProps.accessibilityLabel) || 'One-Time Password',
        testID: 'otp-input',
        onPress: () => onFilled && onFilled('999999')
      }, 'OTP Input')
    ),
  };
});

// React Native paper-dates locale mock (used by file)
jest.mock('react-native-paper-dates', () => ({ en: {} }));

// Import after mocks
import { Text } from 'react-native';
import OtpScreen from '../../../src/screens/login/OtpScreen';

describe('OtpScreen', () => {
  const navigation = { navigate: jest.fn(), addListener: jest.fn(), goBack: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders and shows mobile number after initial load', async () => {
    // First axios call for generateOTP resolves and ends loading
    mockPost.mockResolvedValueOnce({ data: { ok: true } });

    const { getByText } = render(
      <OtpScreen navigation={navigation} route={{ params: { needToEnterOTP: true } }} />
    );

    // Wait for loading to end and text to appear
    await waitFor(() => {
      expect(getByText('+91 9999999999')).toBeTruthy();
      expect(getByText('OTP Sent To Mobile')).toBeTruthy();
    });
  });

  test('entering correct OTP submits and navigates to BottomTabScreen when userDetails set', async () => {
    // generateOTP call
    mockPost.mockResolvedValueOnce({ data: { ok: true } });
    // getUserDetails call
    mockPost.mockResolvedValueOnce({ data: { id: 1, name: 'Test User' } });

    const { getByTestId } = render(
      <OtpScreen
        navigation={navigation}
        route={{ params: { needToEnterOTP: true } }}
      />
    );

    // Trigger OTP filled to call handleSubmit -> onSubmit -> axios -> save -> setUserDetails
    await waitFor(() => getByTestId('otp-input'));
    // Simulate pressing mocked OTP input which calls onFilled('999999')
    fireEvent.press(getByTestId('otp-input'));

    // Wait for user details being saved and navigation effect
    // Internal mocked connect updates userDetails state when save() calls setUserDetails

    // After state updates, effect navigates to BottomTabScreen
    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('BottomTabScreen');
    });
  });

  test('resend triggers generateOTP API call', async () => {
    // initial generateOTP
    mockPost.mockResolvedValueOnce({ data: { ok: true } });

    const { getByTestId } = render(
      <OtpScreen navigation={navigation} route={{ params: { needToEnterOTP: true } }} />
    );

    // Wait for initial call
    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledTimes(1);
    });

    // Next call for resend
    mockPost.mockResolvedValueOnce({ data: { ok: true } });

    fireEvent.press(getByTestId('resend'));

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledTimes(2);
      expect(mockPost.mock.calls[1][0]).toContain('/generateOTP');
    });
  });

  test('Skip navigates to BottomTabScreen', async () => {
    mockPost.mockResolvedValueOnce({ data: { ok: true } });

    const { getByText } = render(
      <OtpScreen navigation={navigation} route={{ params: { needToEnterOTP: true } }} />
    );

    await waitFor(() => getByText('Skip >>'));
    fireEvent.press(getByText('Skip >>'));

    expect(navigation.navigate).toHaveBeenCalledWith('BottomTabScreen');
  });
});
