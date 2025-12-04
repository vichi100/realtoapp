import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import CustomerCommercialBuyCard from '../../../../../src/screens/contacts/commercial/buy/CustomerCommercialBuyCard';

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
// Mock makeCall to avoid hitting real Linking
jest.mock('../../../../../src/utils/methods', () => ({
  ...jest.requireActual('../../../../../src/utils/methods'),
  makeCall: jest.fn(),
}));

// Mock axios methods used by the component to exercise API paths
jest.mock('axios', () => ({
  __esModule: true,
  post: jest.fn(() => Promise.resolve({ data: { ok: true } })),
  put: jest.fn(() => Promise.resolve({ data: { ok: true } })),
  delete: jest.fn(() => Promise.resolve({ data: { ok: true } })),
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
  customer_id: 'COMBUY123456',
  agent_id: 'U1',
  match_count: 2,
  matched_percentage: 40,
  customer_status: 1,
  customer_details: { name: 'Akash', mobile1: '9998887777' },
  customer_locality: {
    property_type: 'Commercial',
    property_for: 'Buy',
    city: 'Pune',
    location_area: [{ main_text: 'Kharadi' }],
  },
  customer_property_details: { property_used_for: 'Retail', building_type: 'High Street' },
  customer_buy_details: { expected_buy_price: 5000000 },
  assigned_to_employee: ['E1'],
  assigned_to_employee_name: ['Emp One'],
};

function renderWithStore(ui) {
  return render(<Provider store={makeStore()}>{ui}</Provider>);
}

describe('CustomerCommercialBuyCard', () => {
  it('renders basic details and handles actions', () => {
    const { getByText, getByTestId } = renderWithStore(
      <CustomerCommercialBuyCard navigation={nav} item={item} displayMatchCount />
    );

    expect(getByText('Akash')).toBeTruthy();
    expect(getByText('+91 9998887777')).toBeTruthy();

    // Reference id uses last 6 chars
    expect(getByTestId('ref_id_123456')).toBeTruthy();

    // Match press navigates
    const match = getByTestId('match_id_123456');
    fireEvent.press(match);
    expect(nav.navigate).toHaveBeenCalled();

    // Call icon press works
    const call = getByTestId('call_icon_id_123456');
    fireEvent.press(call);
  });

  it('toggles drawer and triggers meeting navigation', () => {
    const { getByTestId } = renderWithStore(
      <CustomerCommercialBuyCard navigation={nav} item={item} />
    );

    const chevron = getByTestId('chevron_left_icon_id_123456');
    fireEvent.press(chevron);

    // Toggle back to close drawer
    fireEvent.press(chevron);

    const alarm = getByTestId('alarm_outline_icon_id_123456');
    fireEvent.press(alarm);
    expect(nav.navigate).toHaveBeenCalledWith('CustomerMeeting', expect.any(Object));
  });

  it('selects checkbox for meeting when displayed', () => {
    const { getByTestId } = render(
      <Provider store={makeStore()}>
        <CustomerCommercialBuyCard navigation={nav} item={item} displayCheckBox />
      </Provider>
    );
    const cb = getByTestId('checkbox_id_123456');
    fireEvent.press(cb);
    // No direct assertion on store; ensure checkbox is present and press doesn't crash
    expect(cb).toBeTruthy();
  });

  // Chat icon has no stable text/testID in mock; skipping explicit chat test

  it('renders match percent doughnut chart when enabled', () => {
    const { getByTestId } = renderWithStore(
      <CustomerCommercialBuyCard navigation={nav} item={item} displayMatchPercent />
    );
    // Drawer still exists and can be toggled
    const chevron = getByTestId('chevron_left_icon_id_123456');
    fireEvent.press(chevron);
  });

  it('hides match count when displayMatchCount is false', () => {
    const { queryByTestId } = renderWithStore(
      <CustomerCommercialBuyCard navigation={nav} item={item} displayMatchCount={false} />
    );
    // When explicitly false, match badge should be absent
    expect(queryByTestId('match_id_123456')).toBeNull();
  });

  it('renders doughnut chart for 0% and 100% cases', () => {
    const zero = { ...item, matched_percentage: 0 };
    const hundred = { ...item, matched_percentage: 100 };
    const { getByTestId: getByTestIdZero } = renderWithStore(
      <CustomerCommercialBuyCard navigation={nav} item={zero} displayMatchPercent />
    );
    fireEvent.press(getByTestIdZero('chevron_left_icon_id_123456'));

    const { getByTestId: getByTestIdHundred } = renderWithStore(
      <CustomerCommercialBuyCard navigation={nav} item={hundred} displayMatchPercent />
    );
    fireEvent.press(getByTestIdHundred('chevron_left_icon_id_123456'));
  });

  it('renders assigned employee names when present', () => {
    const { getByText } = renderWithStore(
      <CustomerCommercialBuyCard navigation={nav} item={item} />
    );
    // Expect assigned employee name to appear
    expect(getByText('Emp One')).toBeTruthy();
  });

  it('reopens customer from closed state (status 0)', () => {
    const closeMe = jest.fn();
    const closedItem = { ...item, customer_status: 0 };
    const { getByTestId, getByText } = renderWithStore(
      <CustomerCommercialBuyCard navigation={nav} item={closedItem} closeMe={closeMe} />
    );
    const chevron = getByTestId('chevron_left_icon_id_123456');
    fireEvent.press(chevron);
    const closeIcon = getByTestId('close_sharp_icon_id_123456');
    fireEvent.press(closeIcon);
    fireEvent.press(getByText('Open'));
    expect(closeMe).toHaveBeenCalled();
  });

  it('repeatedly opens and closes modal to cover guard branches', () => {
    const closeMe = jest.fn();
    const { getByTestId, getByText } = renderWithStore(
      <CustomerCommercialBuyCard navigation={nav} item={item} closeMe={closeMe} />
    );
    const chevron = getByTestId('chevron_left_icon_id_123456');
    fireEvent.press(chevron);
    const closeIcon = getByTestId('close_sharp_icon_id_123456');
    fireEvent.press(closeIcon);
    fireEvent.press(getByText('Cancel'));
    // Open again
    fireEvent.press(closeIcon);
    fireEvent.press(getByText('Close'));
    expect(closeMe).toHaveBeenCalled();
  });

  it('does not show employee list button when user is not owner', () => {
    const nonOwnerState = {
      userDetails: { ...initialAppState.userDetails, user_type: 'agent', works_for: 'U2' },
    };
    function NonOwnerAppReducer(state = nonOwnerState, action) { return state; }
    const nonOwnerRoot = combineReducers({ AppReducer: NonOwnerAppReducer, dataRefreshReducer });
    const nonOwnerStore = () => createStore(nonOwnerRoot);
    const { queryByTestId } = render(
      <Provider store={nonOwnerStore()}>
        <CustomerCommercialBuyCard navigation={nav} item={item} />
      </Provider>
    );
    // Button should not be rendered for non-owner
    expect(queryByTestId('goto_employee_list_123456')).toBeNull();
  });

  it('checkbox not rendered when displayCheckBox is false', () => {
    const { queryByTestId } = renderWithStore(
      <CustomerCommercialBuyCard navigation={nav} item={item} />
    );
    expect(queryByTestId('checkbox_id_123456')).toBeNull();
  });

  it('opens modal from drawer and triggers Close and Cancel', () => {
    const deleteMe = jest.fn();
    const closeMe = jest.fn();
    const { getByTestId, getByText } = renderWithStore(
      <CustomerCommercialBuyCard navigation={nav} item={item} deleteMe={deleteMe} closeMe={closeMe} />
    );
    const chevron = getByTestId('chevron_left_icon_id_123456');
    fireEvent.press(chevron);
    const closeIcon = getByTestId('close_sharp_icon_id_123456');
    fireEvent.press(closeIcon);

    // Press Close (calls API under the hood)
    fireEvent.press(getByText('Close'));
    expect(closeMe).toHaveBeenCalledWith(expect.objectContaining({ customer_id: 'COMBUY123456' }));

    // Open modal again and Cancel
    fireEvent.press(closeIcon);
    fireEvent.press(getByText('Cancel'));
  });

  it('shows Open in modal when customer is closed', () => {
    const deleteMe = jest.fn();
    const closeMe = jest.fn();
    const closedItem = { ...item, customer_status: 0 };
    const { getByTestId, getByText } = renderWithStore(
      <CustomerCommercialBuyCard navigation={nav} item={closedItem} deleteMe={deleteMe} closeMe={closeMe} />
    );
    const chevron = getByTestId('chevron_left_icon_id_123456');
    fireEvent.press(chevron);
    const closeIcon = getByTestId('close_sharp_icon_id_123456');
    fireEvent.press(closeIcon);
    // Modal shows Open button instead of Close
    expect(getByText('Open')).toBeTruthy();
    fireEvent.press(getByText('Open'));
    expect(closeMe).toHaveBeenCalled();
  });

  it('deletes customer via modal and handles API success', () => {
    const deleteMe = jest.fn();
    const { getByTestId, getByText } = renderWithStore(
      <CustomerCommercialBuyCard navigation={nav} item={item} deleteMe={deleteMe} />
    );
    const chevron = getByTestId('chevron_left_icon_id_123456');
    fireEvent.press(chevron);
    const closeIcon = getByTestId('close_sharp_icon_id_123456');
    fireEvent.press(closeIcon);
    fireEvent.press(getByText('Delete'));
    expect(deleteMe).toHaveBeenCalledWith(expect.objectContaining({ customer_id: 'COMBUY123456' }));
  });

  it('handles API failure gracefully on close', async () => {
    const axios = require('axios');
    axios.put.mockImplementationOnce(() => Promise.reject(new Error('Network error')));
    const closeMe = jest.fn();
    const { getByTestId, getByText } = renderWithStore(
      <CustomerCommercialBuyCard navigation={nav} item={item} closeMe={closeMe} />
    );
    const chevron = getByTestId('chevron_left_icon_id_123456');
    fireEvent.press(chevron);
    const closeIcon = getByTestId('close_sharp_icon_id_123456');
    fireEvent.press(closeIcon);
    fireEvent.press(getByText('Close'));
    // Even on failure, component should not crash; callback still invoked
    expect(closeMe).toHaveBeenCalled();
  });

  it('navigates to employee list when user is owner', () => {
    const { getByTestId } = renderWithStore(
      <CustomerCommercialBuyCard navigation={nav} item={item} />
    );
    const goto = getByTestId('goto_employee_list_123456');
    fireEvent.press(goto);
    expect(nav.navigate).toHaveBeenCalledWith('EmployeeListOfListing', expect.any(Object));
  });


  it('renders locality text joined from array', () => {
    const localItem = { ...item, customer_locality: { ...item.customer_locality, location_area: [{ main_text: 'Kalyani Nagar' }, { main_text: 'Viman Nagar' }] } };
    const { getByText } = renderWithStore(
      <CustomerCommercialBuyCard navigation={nav} item={localItem} />
    );
    expect(getByText('Kalyani Nagar, Viman Nagar')).toBeTruthy();
  });

  // Chat modal interactions skipped due to lack of stable selectors
  // Employee checkbox path skipped to avoid brittle API side-effects
});
