import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

// Mock icons and external UI libs
jest.mock('react-native-vector-icons/AntDesign', () => {
  const ReactLocal = require('react');
  return (props) => ReactLocal.createElement('Text', null, props.name || 'icon');
});
jest.mock('@rneui/themed', () => ({
  ButtonGroup: ({ buttons = [], onPress }) => {
    const ReactLocal = require('react');
    return ReactLocal.createElement('Text', { onPress: () => onPress && onPress(0) }, `ButtonGroup:${buttons.join(',')}`);
  },
}));

// Mock paper components used in Meeting
jest.mock('react-native-paper', () => {
  const ReactLocal = require('react');
  return {
    TextInput: ({ value, onFocus, placeholder, label, testID }) => ReactLocal.createElement('Text', { onPress: onFocus, testID }, label || placeholder || String(value || '')),
    Divider: () => ReactLocal.createElement('Text', null, 'Divider'),
  };
});

// Mock KeyboardAwareScrollView
jest.mock('react-native-keyboard-aware-scroll-view', () => ({
  KeyboardAwareScrollView: ({ children }) => {
    const ReactLocal = require('react');
    return ReactLocal.createElement('View', null,
      ReactLocal.createElement('Text', null, 'KeyboardAwareScrollView'),
      children
    );
  },
}));

// Mock DatePicker and TimePicker
jest.mock('react-native-neat-date-picker', () => {
  const ReactLocal = require('react');
  const DatePickerMock = ({ isVisible, onConfirm, onCancel }) => null;
  return DatePickerMock;
});
jest.mock('react-native-paper-dates', () => ({
  DatePickerModal: () => null,
  TimePickerModal: () => null,
}));

// Mock Snackbar
jest.mock('../../../src/components/SnackbarComponent', () => {
  const ReactLocal = require('react');
  return ({ visible, textMessage }) => visible ? ReactLocal.createElement('Text', null, `Snackbar:${textMessage}`) : null;
});

// Mock CustomButtonGroup
jest.mock('../../../src/components/CustomButtonGroup', () => {
  const ReactLocal = require('react');
  return ({ buttons = [], onButtonPress, accessibilityLabelId }) => ReactLocal.createElement('Text', { onPress: () => onButtonPress && onButtonPress(0, buttons[0]) }, `CustomButtonGroup:${accessibilityLabelId}`);
});

// Mock child PropertyReminder
jest.mock('../../../src/screens/property/PropertyReminder', () => {
  const ReactLocal = require('react');
  return () => ReactLocal.createElement('Text', null, 'PropertyReminder');
});

// Mock axios
jest.mock('axios', () => ({ __esModule: true, default: { post: jest.fn(() => Promise.resolve({ status: 200, data: [] })) } }));

// Mock dateFormat
jest.mock('../../../src/utils/methods', () => ({
  dateFormat: jest.fn((s) => '01-Jan-2025'),
}));

// Mock react-redux connect injection
jest.mock('react-redux', () => {
  const ReactLocal = require('react');
  return ({
    connect: () => (Component) => (props) => ReactLocal.createElement(Component, {
      ...props,
      userDetails: props.userDetails || { id: 1, works_for: 1 },
      propReminderList: props.propReminderList || [],
      customerDetailsForMeeting: props.customerDetailsForMeeting || null,
      setPropReminderList: jest.fn(),
      setCustomerDetailsForMeeting: jest.fn(),
    }),
  });
});

import Screen from '../../../src/screens/meeting/Meeting';

describe('Meeting screen', () => {
  const navigation = { navigate: jest.fn() };
  const baseRoute = { params: { item: { property_id: 5, property_type: 'Residential', property_for: 'Rent' }, category: 'property' } };

  beforeEach(() => jest.clearAllMocks());

  it('renders and allows selecting reminder type via CustomButtonGroup', () => {
    const { getByText } = render(<Screen navigation={navigation} route={baseRoute} />);
    expect(getByText('KeyboardAwareScrollView')).toBeTruthy();
    const reminderGroup = getByText('CustomButtonGroup:reminder_type');
    fireEvent.press(reminderGroup);
  });

  it('navigates to CustomerListForMeeting when Add Customer is pressed', () => {
    const { getByText } = render(<Screen navigation={navigation} route={baseRoute} />);
    const addText = getByText('Add Customer For Meeting.');
    fireEvent.press(addText);
    expect(navigation.navigate).toHaveBeenCalledWith('CustomerListForMeeting', expect.objectContaining({ displayMatchCount: false, displayMatchPercent: true }));
  });

  it('shows validation error when submitting with missing fields and sets date when Date input focused', () => {
    const { getByText, queryByText } = render(<Screen navigation={navigation} route={baseRoute} />);
    // Focus Date input (mock Text acts as focus trigger)
    fireEvent.press(getByText('Date*'));
    // dateFormat mocked returns '01-Jan-2025' via onChange path (we only verify focusing path here)
    // Try to submit without client and date/time
    fireEvent.press(getByText('Save'));
    expect(getByText('Snackbar:Client name is missing')).toBeTruthy();
  });
});
