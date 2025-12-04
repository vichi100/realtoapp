import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CommercialPropertyDetailsForm from '../../../../src/screens/property/commercial/CommercialPropertyDetailsForm';
import { ACTION_TYPES } from '../../../../src/reducers/ActionType';

// Lightweight mocks for heavy UI pieces
jest.mock('react-native-segmented-control-tab', () => 'SegmentedControlTab');
jest.mock('react-native-keyboard-aware-scroll-view', () => ({
  KeyboardAwareScrollView: ({ children }) => children,
}));

jest.mock('react-native-paper', () => {
  const React = require('react');
  const { TextInput: RNTextInput, Text } = require('react-native');
  const MockTextInput = ({ label, ...props }) => (
    <RNTextInput accessibilityLabel={label} {...props} />
  );
  return {
    TextInput: MockTextInput,
    HelperText: ({ children }) => <Text>{children}</Text>,
    useTheme: () => ({ colors: {} }),
  };
});

jest.mock('../../../../src/components/SnackbarComponent', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ visible, textMessage }) => (visible ? <Text>{textMessage}</Text> : null);
});

const mockStore = configureStore([]);

const buildStore = (overrides = {}) =>
  mockStore({
    AppReducer: {
      userDetails: { id: 'agent-1' },
      propertyDetails: {
        property_for: 'Rent',
      },
      ...overrides,
    },
  });

const buildNav = () => ({ navigate: jest.fn() });

describe('CommercialPropertyDetailsForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders key sections and NEXT button', () => {
    const store = buildStore();
    const navigation = buildNav();

    const { getByText } = render(
      <Provider store={store}>
        <CommercialPropertyDetailsForm navigation={navigation} />
      </Provider>
    );

    expect(getByText('Property Type*')).toBeTruthy();
    expect(getByText('Building Type*')).toBeTruthy();
    expect(getByText('Ideal For*(Multi Select)')).toBeTruthy();
    expect(getByText('Parkings')).toBeTruthy();
    expect(getByText('Property Age*')).toBeTruthy();
    expect(getByText('Power Backup*')).toBeTruthy();
    expect(getByText('NEXT')).toBeTruthy();
  });

  it('shows error when property size is missing', async () => {
    const store = buildStore();
    const navigation = buildNav();

    const { getByText } = render(
      <Provider store={store}>
        <CommercialPropertyDetailsForm navigation={navigation} />
      </Provider>
    );

    fireEvent.press(getByText('NEXT'));

    await waitFor(() => {
      expect(getByText('Property size is missing')).toBeTruthy();
    });
  });

  it('submits with selections and navigates to RentDetailsForm', async () => {
    const store = buildStore({
      AppReducer: {
        userDetails: { id: 'agent-1' },
        propertyDetails: { property_for: 'Rent' },
      },
    });
    const navigation = buildNav();

    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <CommercialPropertyDetailsForm navigation={navigation} />
      </Provider>
    );

    // Change property type to Office
    fireEvent.press(getByLabelText('commercial_property_type_office'));
    // Change building type to StandAlone
    fireEvent.press(getByLabelText('commercial_property_building_type_standalone'));
    // Multi-select add Bank to Ideal For
    fireEvent.press(getByLabelText('commercial_property_ideal_for_bank'));
    // Set parking to Private
    fireEvent.press(getByLabelText('commercial_parking_type_private'));
    // Set property age to 11-15
    fireEvent.press(getByLabelText('property_age_11-15'));
    // Set power backup to No
    fireEvent.press(getByLabelText('power_backup_no'));

    // Enter property size
    fireEvent.changeText(getByLabelText('Property Size*'), '1500');

    fireEvent.press(getByText('NEXT'));

    const actions = store.getActions();
    const setDetailsAction = actions.find(a => a.type === ACTION_TYPES.SET_PROPERTY_DETAILS);
    expect(setDetailsAction).toBeTruthy();
    expect(setDetailsAction.payload).toEqual(
      expect.objectContaining({
        property_details: expect.objectContaining({
          property_used_for: 'Office',
          building_type: 'StandAlone',
          parking_type: 'Private',
          property_age: '11-15',
          power_backup: 'No',
          property_size: '1500',
          ideal_for: expect.arrayContaining(['Shop', 'Bank']),
        }),
      })
    );

    expect(navigation.navigate).toHaveBeenCalledWith('RentDetailsForm');
  });

  it('navigates to SellDetailsForm when property_for is Sell', () => {
    const store = buildStore({ propertyDetails: { property_for: 'Sell' } });
    const navigation = buildNav();

    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <CommercialPropertyDetailsForm navigation={navigation} />
      </Provider>
    );

    fireEvent.changeText(getByLabelText('Property Size*'), '1000');
    fireEvent.press(getByText('NEXT'));

    expect(navigation.navigate).toHaveBeenCalledWith('SellDetailsForm');
  });
});
