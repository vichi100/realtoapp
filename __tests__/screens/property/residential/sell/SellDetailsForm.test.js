import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';

// Lightweight mocks for stability similar to RentDetailsForm
jest.mock('react-native-paper-dates', () => ({ DatePickerModal: 'DatePickerModal' }));
jest.mock('react-native-paper', () => {
  const React = require('react');
  const { TextInput: RNTextInput, Text } = require('react-native');
  return {
    TextInput: RNTextInput,
    HelperText: ({ children }) => <Text>{children}</Text>,
    useTheme: () => ({ colors: { primary: '#000' } }),
  };
});

// Mock KeyboardAwareScrollView
jest.mock('react-native-keyboard-aware-scroll-view', () => ({
  KeyboardAwareScrollView: ({ children }) => children,
}));

// Mock app Button component
jest.mock('../../../../../src/components/Button', () => {
  const React = require('react');
  const { Text, TouchableOpacity } = require('react-native');
  return function ButtonMock({ title, onPress, testID }) {
    return (
      <TouchableOpacity onPress={onPress} testID={testID || 'app_button'}>
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  };
});

// Mock Snackbar to display the message for assertions
jest.mock('../../../../../src/components/SnackbarComponent', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return function SnackbarMock({ visible, textMessage }) {
    return (
      <View testID="snackbar">{visible ? <Text>{textMessage}</Text> : null}</View>
    );
  };
});

// Mock CustomButtonGroup to render tappable buttons with accessibility labels
jest.mock('../../../../../src/components/CustomButtonGroup', () => {
  const React = require('react');
  const { View, Text, TouchableOpacity } = require('react-native');
  return function CustomButtonGroupMock({ buttons = [], accessibilityLabelId, onButtonPress }) {
    return (
      <View>
        {buttons.map((btn, idx) => (
          <TouchableOpacity
            key={idx}
            accessibilityRole="button"
            accessibilityLabel={`${accessibilityLabelId}_${idx}`}
            onPress={() => onButtonPress(idx, btn)}
          >
            <Text>{btn.text || String(btn)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
});

// Mock react-native-neat-date-picker to expose confirm/cancel buttons when visible
jest.mock('react-native-neat-date-picker', () => {
  const React = require('react');
  const { View, Button } = require('react-native');
  return function DatePickerMock(props) {
    const confirmId = props.confirmButtonTestID || 'datePickerOk';
    const cancelId = props.cancelButtonTestID || 'datePickerCancel';
    if (!props.isVisible) return null;
    return (
      <View>
        <Button
          title="OK"
          testID={confirmId}
          onPress={() => props.onConfirm({ date: new Date('2025-01-10T00:00:00.000Z') })}
        />
        <Button title="Cancel" testID={cancelId} onPress={props.onCancel} />
      </View>
    );
  };
});

// Mock react-redux connect to inject props without Provider
const mockSetPropertyDetails = jest.fn();
jest.mock('react-redux', () => ({
  connect: () => (Comp) => (props) => (
    <Comp
      {...props}
      userDetails={{ id: 1, works_for: 1 }}
      propertyType={'Residential'}
      propertyDetails={{ propertyType: 'Residential', property_address: { city: 'Pune' } }}
      setPropertyDetails={mockSetPropertyDetails}
    />
  ),
}));

import SellDetailsForm from '../../../../../src/screens/property/residential/sell/SellDetailsForm';

describe('SellDetailsForm', () => {
  const setup = () => {
    mockSetPropertyDetails.mockClear();
    const navigation = { navigate: jest.fn() };
    const utils = render(<SellDetailsForm navigation={navigation} route={{ params: {} }} />);
    return { ...utils, navigation };
  };

  it('renders key inputs and negotiable section', () => {
    const { getByPlaceholderText, getByText } = setup();
    expect(getByPlaceholderText('Expected Sell Price*')).toBeTruthy();
    expect(getByPlaceholderText('Maintenance Charge')).toBeTruthy();
    expect(getByPlaceholderText('Available From *')).toBeTruthy();
    expect(getByText('Negotiable*')).toBeTruthy();
  });

  it('validates required fields with Snackbar messages', () => {
    const { getByText } = setup();
    fireEvent.press(getByText('NEXT'));
    expect(getByText('Expected sell price is missing')).toBeTruthy();
  });

  it('submits when valid, updates details and navigates', async () => {
    const { getByPlaceholderText, getByText, navigation } = setup();

    // Fill expected sell price
    fireEvent.changeText(getByPlaceholderText('Expected Sell Price*'), '5500000');
    fireEvent.press(getByText('NEXT'));
    expect(getByText('Maintenance charge is missing')).toBeTruthy();

    // Fill maintenance charge
    fireEvent.changeText(getByPlaceholderText('Maintenance Charge'), '1500');
    fireEvent.press(getByText('NEXT'));
    expect(getByText('Available from date is missing')).toBeTruthy();

    // Open date picker and confirm
    fireEvent(getByPlaceholderText('Available From *'), 'focus');
    fireEvent.press(screen.getByTestId('datePickerOk'));

    // Change negotiable to 'No' (index 1)
    const negBtn = screen.UNSAFE_getAllByProps({ accessibilityLabel: 'negotiable_option_1' })[0];
    fireEvent.press(negBtn);

    // Submit
    fireEvent.press(getByText('NEXT'));

    await waitFor(() => expect(mockSetPropertyDetails).toHaveBeenCalled());

    const payload = mockSetPropertyDetails.mock.calls[0][0];
    expect(payload).toHaveProperty('sell_details');
    expect(payload.sell_details).toMatchObject({
      expected_sell_price: '5500000',
      maintenance_charge: '1500',
      negotiable: 'No',
    });

    expect(navigation.navigate).toHaveBeenCalledWith('AddImages');
  });
});
