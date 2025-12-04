import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import CustomerCommercialRentCard from '../../../../../src/screens/contacts/commercial/rent/CustomerCommercialRentCard';

jest.mock('@rneui/themed', () => ({
  CheckBox: ({ onPress, testID, checked }) => (
    <button accessibilityLabel={testID} testID={testID} onClick={onPress} aria-checked={!!checked} />
  ),
  ButtonGroup: ({ onButtonPress }) => (
    <button onClick={() => onButtonPress(0, { text: 'Yes' })}>ButtonGroup</button>
  ),
  Avatar: ({ title }) => <text>{title}</text>,
}));

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('react-native-vector-icons/AntDesign', () => 'Icon');
jest.mock('react-native-vector-icons/Feather', () => 'Icon');

jest.mock('axios', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({ data: 'success' })),
}));

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
};

function AppReducer(state = initialAppState, action) { return state; }
function dataRefreshReducer(state = { refreshFlag: false }, action) { return state; }
const rootReducer = combineReducers({ AppReducer, dataRefreshReducer });
const makeStore = () => createStore(rootReducer);

const nav = { navigate: jest.fn() };

const item = {
  customer_id: 'COMRENT123456',
  agent_id: 'U1',
  match_count: 1,
  matched_percentage: 25,
  customer_status: 1,
  customer_details: { name: 'Beena', mobile1: '7776665555' },
  customer_locality: {
    property_type: 'Commercial',
    property_for: 'Rent',
    city: 'Pune',
    location_area: [{ main_text: 'Baner' }],
  },
  customer_property_details: { property_used_for: 'Office', building_type: 'Business Park' },
  customer_rent_details: { expected_rent: 90000, expected_deposit: 180000 },
};

function renderWithStore(ui) {
  return render(<Provider store={makeStore()}>{ui}</Provider>);
}

describe('CustomerCommercialRentCard', () => {
  it('renders details and supports key interactions', () => {
    const { getByText, getByTestId } = renderWithStore(
      <CustomerCommercialRentCard navigation={nav} item={item} displayMatchCount />
    );

    expect(getByText('Beena')).toBeTruthy();
    expect(getByText('+91 7776665555')).toBeTruthy();

    expect(getByTestId('ref_id_123456')).toBeTruthy();

    const chevron = getByTestId('chevron_left_icon_id_123456');
    fireEvent.press(chevron);

    const meeting = getByTestId('alarm_outline_icon_id_123456');
    fireEvent.press(meeting);
    expect(nav.navigate).toHaveBeenCalled();

    const call = getByTestId('call_icon_id_123456');
    fireEvent.press(call);
  });
});
 
