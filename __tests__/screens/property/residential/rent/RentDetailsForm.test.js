import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';

// Lightweight mocks for stability
jest.mock('@expo/vector-icons', () => ({ MaterialIcons: 'MaterialIcons' }));
jest.mock('react-native-elements', () => ({ ButtonGroup: 'ButtonGroup' }));
jest.mock('react-native-paper-dates', () => ({ DatePickerModal: 'DatePickerModal' }));
jest.mock('react-native-paper', () => {
  const React = require('react');
  const { TextInput: RNTextInput, View, Text } = require('react-native');
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
      <View testID="snackbar">
        {visible ? <Text>{textMessage}</Text> : null}
      </View>
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

// Mock react-native-neat-date-picker to expose confirm/cancel buttons
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
          onPress={() => props.onConfirm({ date: new Date('2024-01-10T00:00:00.000Z') })}
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
      propertyDetails={{ propertyType: 'Residential' }}
      setPropertyDetails={mockSetPropertyDetails}
    />
  ),
}));

import RentDetailsForm from '../../../../../src/screens/property/residential/rent/RentDetailsForm';

describe('RentDetailsForm', () => {
  const setup = () => {
    mockSetPropertyDetails.mockClear();
    const navigation = { navigate: jest.fn() };
    const utils = render(<RentDetailsForm navigation={navigation} route={{ params: {} }} />);
    return { ...utils, navigation };
  };

  it('renders inputs and tenant selectors for Residential', () => {
    const { getByTestId, getByText } = setup();
    expect(getByTestId('expectedRent')).toBeTruthy();
    expect(getByTestId('expectedDeposit')).toBeTruthy();
    expect(getByTestId('availableFrom')).toBeTruthy();
    expect(getByText('Preferred Tenants*')).toBeTruthy();
    expect(getByText('Nonveg Allowed*')).toBeTruthy();
  });

  it('validates required fields and shows Snackbar messages', () => {
    const { getByText } = setup();
    fireEvent.press(getByText('NEXT'));
    expect(getByText('Expected rent is missing')).toBeTruthy();
  });

  it('submits when fields are valid, dispatches and navigates', async () => {
    const { getByTestId, getByText, navigation } = setup();

    // Fill expected rent
    fireEvent.changeText(getByTestId('expectedRent'), '23000');
    fireEvent.press(getByText('NEXT'));
    expect(getByText('Expected deposit is missing')).toBeTruthy();

    // Fill expected deposit
    fireEvent.changeText(getByTestId('expectedDeposit'), '80000');
    fireEvent.press(getByText('NEXT'));
    expect(getByText('Available date is missing')).toBeTruthy();

    // Open date picker then confirm
    fireEvent(getByTestId('availableFrom'), 'focus');
    fireEvent.press(screen.getByTestId('datePickerOk'));

    // Adjust tenant and non-veg selections
    // Preferred tenants: select Bachelors (index 1)
    fireEvent.press(screen.UNSAFE_getAllByProps({ accessibilityLabel: 'preferred_tenants_1' })[0]);
    // Non-veg: select No (index 1)
    fireEvent.press(screen.UNSAFE_getAllByProps({ accessibilityLabel: 'non_veg_allowed_1' })[0]);

    // Submit
    fireEvent.press(getByText('NEXT'));

    await waitFor(() => expect(mockSetPropertyDetails).toHaveBeenCalled());

    const payload = mockSetPropertyDetails.mock.calls[0][0];
    expect(payload).toHaveProperty('rent_details');
    expect(payload.rent_details).toMatchObject({
      expected_rent: '23000',
      expected_deposit: '80000',
      preferred_tenants: 'Bachelors',
      non_veg_allowed: 'No',
    });

    expect(navigation.navigate).toHaveBeenCalledWith('AddImages');
  });
});
