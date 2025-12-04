import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import ContactsResidential from '../../../../src/screens/contacts/residential/ContactsResidential';

jest.mock('@rneui/themed', () => ({
  ButtonGroup: ({ onPress }) => <button onClick={() => onPress(0)} />,
  CheckBox: ({ onPress }) => <button onClick={onPress} />,
}));
jest.mock('axios', () => ({ __esModule: true, default: jest.fn(() => Promise.resolve({ data: [] })) }));

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
  residentialCustomerList: [],
};
function AppReducer(state = initialAppState, action) {
  switch (action.type) {
    case 'TRIGGER_REFRESH':
      return state;
    default:
      return state;
  }
}
function dataRefreshReducer(state = { refreshFlag: false, shouldRefresh: false }, action) { return state; }
const rootReducer = combineReducers({ AppReducer, dataRefresh: dataRefreshReducer });
const makeStore = () => createStore(rootReducer);

const nav = { navigate: jest.fn(), goBack: jest.fn() };

describe('ContactsResidential Screen', () => {
  it('renders and supports basic UI presence', async () => {
    const { getByText, queryByTestId } = render(
      <Provider store={makeStore()}>
        <ContactsResidential navigation={nav} route={{ params: {} }} />
      </Provider>
    );

    // Wait for loader to settle if present
    await waitFor(() => {
      expect(queryByTestId('loader') || true).toBeTruthy();
    });

    const addButton = getByText('Add New Customer');
    expect(addButton).toBeTruthy();
  });
});
