import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

// Mock paper components used by ProfileForm
jest.mock('react-native-paper', () => {
  const ReactLocal = require('react');
  return {
    TextInput: ({ value, onChangeText, placeholder, testID }) =>
      ReactLocal.createElement('Text', { onPress: () => onChangeText && onChangeText(''), testID }, placeholder || String(value || '')),
    HelperText: (props) => ReactLocal.createElement('Text', null, props.children || ''),
    Button: ({ onPress, children, testID }) => ReactLocal.createElement('Text', { onPress, testID }, children || 'Button'),
    Divider: () => ReactLocal.createElement('Text', null, 'Divider'),
    useTheme: () => ({ colors: { primary: '#000' } }),
  };
});

// Mock icons
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => {
  const ReactLocal = require('react');
  return (props) => ReactLocal.createElement('Text', null, props.name || 'icon');
});

// Mock axios
jest.mock('axios', () => ({ __esModule: true, default: jest.fn(() => Promise.resolve({ status: 200, data: 'success' })) }));

// Mock internal Button and Snackbar components
jest.mock('../../../src/components/Button', () => {
  const ReactLocal = require('react');
  return ({ onPress, title, children, testID }) => ReactLocal.createElement('Text', { onPress, testID }, title || children || 'Button');
});
jest.mock('../../../src/components/SnackbarComponent', () => {
  const ReactLocal = require('react');
  return () => ReactLocal.createElement('Text', null, 'Snackbar');
});

// Mock KeyboardAwareScrollView to avoid ESM issues
jest.mock('react-native-keyboard-aware-scroll-view', () => ({
  KeyboardAwareScrollView: ({ children }) => {
    const ReactLocal = require('react');
    return ReactLocal.createElement('View', null,
      ReactLocal.createElement('Text', null, 'KeyboardAwareScrollView'),
      children
    );
  },
}));

// Mock redux connect to inject minimal props
jest.mock('react-redux', () => {
  const ReactLocal = require('react');
  return ({
    connect: () => (Component) => (props) => ReactLocal.createElement(Component, {
      ...props,
      userDetails: props.userDetails || {
        id: 1,
        name: 'Alice Agent',
        works_for: 1,
        company_name: 'Acme Realty',
        city: 'Mumbai',
        mobile: '+911234567890',
        email: 'alice@example.com',
        user_type: 'agent',
      },
      setUserDetails: jest.fn(),
    }),
  });
});

import ProfileForm from '../../../src/screens/profile/ProfileForm';

describe('ProfileForm screen', () => {
  const navigation = { goBack: jest.fn(), navigate: jest.fn(), addListener: jest.fn(() => jest.fn()) };
  const route = { params: { updateDbCall: jest.fn() } };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { getByText } = render(<ProfileForm navigation={navigation} route={route} />);
    expect(getByText('KeyboardAwareScrollView')).toBeTruthy();
  });

  it('submits with DONE and navigates to Profile on success', async () => {
    const { getByText } = render(<ProfileForm navigation={navigation} route={route} />);
    // Fields are already filled from userDetails; pressing DONE should submit
    fireEvent.press(getByText('DONE'));
    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('Profile');
    });
  });

  it('invokes back handler subscription via addListener', () => {
    render(<ProfileForm navigation={navigation} route={route} />);
    expect(navigation.addListener).toHaveBeenCalledWith('beforeRemove', expect.any(Function));
  });
});
