import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import ContactResidentialSellCard from '../../../../../src/screens/contacts/residential/buy/ContactResidentialSellCard';

jest.mock('@rneui/themed', () => ({
  CheckBox: ({ onPress, testID, checked }) => (
    <button accessibilityLabel={testID} testID={testID} onClick={onPress} aria-checked={!!checked} />
  ),
  Avatar: ({ title }) => <text>{title}</text>,
}));
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('react-native-vector-icons/AntDesign', () => 'Icon');
jest.mock('react-native-vector-icons/Feather', () => 'Icon');

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
function dataRefreshReducer(state = { refreshFlag: false }, action) { return state; }
const rootReducer = combineReducers({ AppReducer, dataRefreshReducer });
const makeStore = () => createStore(rootReducer);

const baseItem = {
  customer_id: 'CUS654321',
  agent_id: 'U1',
  match_count: 2,
  matched_percentage: 40,
  assigned_to_employee: [],
  assigned_to_employee_name: [],
  customer_status: 1,
  customer_details: { name: 'Sonal', mobile1: '9123456789' },
  customer_locality: {
    property_type: 'Residential',
    property_for: 'Buy',
    city: 'Pune',
    location_area: [{ main_text: 'Aundh' }],
  },
  customer_property_details: { bhk_type: '3BHK', furnishing_status: 'Semi' },
  customer_rent_details: { expected_rent: 0, expected_deposit: 0 },
  customer_buy_details: { expected_buy_price: 7500000 },
};

const nav = { navigate: jest.fn() };

function renderWithStore(ui, { store = makeStore() } = {}) {
  return render(<Provider store={store}>{ui}</Provider>);
}

describe('ContactResidentialSellCard', () => {
  it('renders details and supports navigation actions', () => {
    const { getByText } = renderWithStore(
      <ContactResidentialSellCard navigation={nav} item={baseItem} />
    );
    expect(getByText('Sonal')).toBeTruthy();
    expect(getByText('+91 9123456789')).toBeTruthy();
    expect(getByText('Aundh')).toBeTruthy();
    expect(getByText('3BHK')).toBeTruthy();
  });
});
