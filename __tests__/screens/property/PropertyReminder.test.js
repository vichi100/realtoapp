import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

// Base RN mock for stable Dimensions
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return { ...RN, Dimensions: { get: () => ({ width: 400, height: 800 }) } };
});

// Mock Ionicons to simple text
jest.mock('react-native-vector-icons/Ionicons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ name }) => <Text>{name}</Text>;
});

// Mock utils methods
jest.mock('../../../src/utils/methods', () => ({
  makeCall: jest.fn(),
  formatIsoDateToCustomString: (iso) => '2025-12-04',
  formatClientNameForDisplay: (name) => `Client: ${name}`,
  formatMobileNumber: (m) => `+91-${m}`,
}));

// Mock react-redux connect to inject props
jest.mock('react-redux', () => {
  const actual = jest.requireActual('react-redux');
  return {
    ...actual,
    connect: () => (Component) => (props) => {
      const injected = {
        navigation: props.navigation || { navigate: jest.fn() },
        propReminderList: props.propReminderList || [],
        reminderListX: props.reminderListX || [],
      };
      return <Component {...injected} {...props} />;
    },
  };
});

import PropertyReminder from '../../../src/screens/property/PropertyReminder';

const today = new Date();
const dateStr = today.toISOString();

const sampleFuture = {
  reminder_for: 'Meeting',
  client_name: 'Alice',
  client_mobile: '9999999999',
  property_reference_id: 'REF1',
  meeting_date: new Date(today.getTime() + 24*60*60*1000).toISOString(), // tomorrow
  meeting_time: '11:30 AM',
};

const samplePast = {
  reminder_for: 'Call',
  client_name: 'Bob',
  client_mobile: '8888888888',
  property_reference_id: 'REF2',
  meeting_date: new Date(today.getTime() - 24*60*60*1000).toISOString(), // yesterday
  meeting_time: '02:00 PM',
};

describe('PropertyReminder', () => {
  test('shows placeholders when no reminders', () => {
    const screen = render(<PropertyReminder propReminderList={[]} reminderListX={[]} />);
    expect(screen.getAllByText('No Meetings').length).toBeGreaterThan(0);
    expect(screen.getByText('Upcoming Meetings')).toBeTruthy();
    expect(screen.getByText('Past Meetings')).toBeTruthy();
  });

  test('renders future and past lists and navigates on item press', () => {
    const navigate = jest.fn();
    const screen = render(
      <PropertyReminder
        navigation={{ navigate }}
        propReminderList={[sampleFuture, samplePast]}
        reminderListX={[sampleFuture, samplePast]}
      />
    );

    // Future list should render Alice meeting
    expect(screen.getByText('Client: Alice')).toBeTruthy();
    expect(screen.getByText('+91-9999999999')).toBeTruthy();

    // Past list should render Bob call and footer End
    expect(screen.getByText('Client: Bob')).toBeTruthy();
    expect(screen.getByTestId('end_of_list')).toBeTruthy();

    // Press on Alice row to navigate
    fireEvent.press(screen.getByText('Client: Alice'));
    expect(navigate).toHaveBeenCalledWith('CustomerMeetingDetails', expect.objectContaining({ category: 'property' }));

    // Press call icon text to trigger makeCall
    const { makeCall } = require('../../../src/utils/methods');
    fireEvent.press(screen.getAllByText('call')[0]);
    expect(makeCall).toHaveBeenCalledWith('9999999999');
  });
});
