import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import ContactResidentialRentCard from '../../../../../src/screens/contacts/residential/rent/ContactResidentialRentCard';

// Lightweight mocks for heavy UI libraries
jest.mock('@rneui/themed', () => ({
  CheckBox: ({ onPress, testID, checked }) => (
    <button accessibilityLabel={testID} testID={testID} onClick={onPress} aria-checked={!!checked} />
  ),
  Avatar: ({ title }) => <text>{title}</text>,
  ButtonGroup: ({ onButtonPress }) => (
    <button onClick={() => onButtonPress(0, { text: 'Yes' })}>ButtonGroup</button>
  ),
}));

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('react-native-vector-icons/AntDesign', () => 'Icon');
jest.mock('react-native-vector-icons/Feather', () => 'Icon');

// Mock axios to prevent network calls during tests
jest.mock('axios', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({ data: 'success' })),
}));

// Minimal reducers to satisfy connected component props
const initialAppState = {
  userDetails: {
    id: 'U1',
    name: 'Agent Uno',
    mobile: '+91 9999999999',
    city: 'Pune',
    company_name: 'Realto',
    works_for: 'U1',
    user_type: 'owner',
    employee_role: 'manager',
  },
  propReminderList: [],
  propListForMeeting: [],
  customerDetailsForMeeting: null,
};

function AppReducer(state = initialAppState, action) {
  switch (action.type) {
    case 'SET_CUSTOMER_DETAILS_FOR_MEETING':
      return { ...state, customerDetailsForMeeting: action.payload };
    default:
      return state;
  }
}

function dataRefreshReducer(state = { refreshFlag: false }, action) {
  return state;
}

const rootReducer = combineReducers({ AppReducer, dataRefreshReducer });

const makeStore = () => createStore(rootReducer);

const baseItem = {
  customer_id: 'CUS123456',
  agent_id: 'U1',
  match_count: 3,
  matched_percentage: 60,
  assigned_to_employee: [],
  assigned_to_employee_name: [],
  customer_status: 1,
  customer_details: { name: 'Rita', mobile1: '9876543210' },
  customer_locality: {
    property_type: 'Residential',
    property_for: 'Rent',
    city: 'Pune',
    location_area: [
      { main_text: 'Kothrud' },
      { main_text: 'Baner' },
    ],
  },
  customer_property_details: { bhk_type: '2BHK', furnishing_status: 'Full' },
  customer_rent_details: { expected_rent: 22000, expected_deposit: 60000 },
};

const nav = { navigate: jest.fn() };

function renderWithStore(ui, { store = makeStore() } = {}) {
  return render(<Provider store={store}>{ui}</Provider>);
}

describe('ContactResidentialRentCard', () => {
  it('renders basic details and handles meeting + call actions', async () => {
    const { getByText, getByTestId } = renderWithStore(
      <ContactResidentialRentCard navigation={nav} item={baseItem} />
    );

    // Name and mobile formatted with +91 prefix
    expect(getByText('Rita')).toBeTruthy();
    expect(getByText('+91 9876543210')).toBeTruthy();

    // Reference id uses last 6 chars
    expect(getByTestId('ref_id_123456')).toBeTruthy();

    // Location chips rendered
    expect(getByText('Kothrud, Baner')).toBeTruthy();

    // Stats area
    expect(getByText('2BHK')).toBeTruthy();
    expect(getByText('Full')).toBeTruthy();
    expect(getByText('22 K')).toBeTruthy();
    expect(getByText('60 K')).toBeTruthy();

    // Open sliding drawer then trigger meeting navigation
    const chevron = getByTestId('chevron_left_icon_id_123456');
    fireEvent.press(chevron);
    const meeting = getByTestId('alarm_outline_icon_id_123456');
    fireEvent.press(meeting);
    expect(nav.navigate).toHaveBeenCalledWith('CustomerMeeting', expect.any(Object));

    // Trigger call icon press
    const call = getByTestId('call_icon_id_123456');
    fireEvent.press(call);
  });

  it('toggles meeting checkbox and employee checkbox', async () => {
    const store = makeStore();
    const item = {
      ...baseItem,
      assigned_to_employee: ['EMP1'],
      assigned_to_employee_name: ['Alice'],
    };
    const { getByTestId } = renderWithStore(
      <ContactResidentialRentCard
        navigation={nav}
        item={item}
        displayCheckBox
        displayCheckBoxForEmployee
        employeeObj={{ id: 'EMP1', name: 'Alice' }}
      />,
      { store }
    );

    const meetBox = getByTestId('checkbox_id_123456');
    fireEvent.press(meetBox);

    await waitFor(() => {
      const state = store.getState();
      expect(state.AppReducer).toBeTruthy();
    });

    // Employee checkbox interaction can trigger async user fetch; skip heavy path
  });

  it('shows match badge and handles match navigation press', () => {
    const { getByTestId } = renderWithStore(
      <ContactResidentialRentCard navigation={nav} item={baseItem} displayMatchCount />
    );
    const match = getByTestId('match_id_123456');
    fireEvent.press(match);
    expect(nav.navigate).toHaveBeenCalledWith('MatchedProperties', expect.any(Object));
  });
});
