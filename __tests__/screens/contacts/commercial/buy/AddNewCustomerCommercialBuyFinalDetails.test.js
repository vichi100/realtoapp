import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import AddNewCustomerCommercialBuyFinalDetails from '../../../../../src/screens/contacts/commercial/buy/AddNewCustomerCommercialBuyFinalDetails';

jest.mock('@rneui/themed', () => ({
  Avatar: ({ title }) => <text>{title}</text>,
}));

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    post: jest.fn(() => Promise.resolve({ data: { customer_id: 'NEW123', customer_details: { name: 'Added' } } })),
  },
}));

jest.mock('react-native-modal-activityindicator', () => 'ModalActivityIndicator');

const baseCustomer = {
  customer_id: 'CUS123456',
  customer_details: {
    name: 'Ravi',
    mobile1: '+91 9000000000',
    address: 'MG Road',
  },
  customer_locality: {
    property_type: 'Commercial',
    property_for: 'Buy',
    city: 'Pune',
    location_area: [{ main_text: 'Koregaon Park' }, { main_text: 'Bund Garden' }],
  },
  customer_property_details: {
    property_used_for: 'Office',
    property_size: 1200,
    building_type: 'Business Park',
    parking_type: 'Covered',
  },
  customer_buy_details: {
    expected_buy_price: 2500000,
    available_from: '2025-01-15',
  },
};

const initialAppState = {
  userDetails: null,
  customerDetails: baseCustomer,
  startNavigationPoint: null,
  commercialCustomerList: [],
};

function AppReducer(state = initialAppState, action) {
  switch (action.type) {
    case 'SET_CUSTOMER_DETAILS':
      return { ...state, customerDetails: action.payload };
    case 'SET_START_NAVIGATION_POINT':
      return { ...state, startNavigationPoint: action.payload };
    case 'SET_COMMERCIAL_CUSTOMER_LIST':
      return { ...state, commercialCustomerList: action.payload };
    default:
      return state;
  }
}

function dataRefreshReducer(state = { refreshFlag: false }, action) { return state; }
const rootReducer = combineReducers({ AppReducer, dataRefreshReducer });
const makeStore = (preloaded = initialAppState) => createStore(rootReducer, { AppReducer: preloaded, dataRefreshReducer: { refreshFlag: false } });

function renderWithStore(ui, store) {
  return render(<Provider store={store}>{ui}</Provider>);
}

describe('AddNewCustomerCommercialBuyFinalDetails', () => {
  it('renders summary details and locations', () => {
    const navigation = { navigate: jest.fn() };
    const store = makeStore(initialAppState);
    const { getByText } = renderWithStore(
      <AddNewCustomerCommercialBuyFinalDetails navigation={navigation} />, store
    );

    expect(getByText('Ravi')).toBeTruthy();
    expect(getByText('+91 9000000000')).toBeTruthy();
    expect(getByText('MG Road')).toBeTruthy();
    expect(getByText('Office')).toBeTruthy();
    expect(getByText('Buy')).toBeTruthy();
    expect(getByText('1200sqft')).toBeTruthy();
    expect(getByText('Pune')).toBeTruthy();
    expect(getByText('Koregaon Park, Bund Garden')).toBeTruthy();
    expect(getByText('Business Park')).toBeTruthy();
    expect(getByText('Covered')).toBeTruthy();
  });

  it('shows login modal when not logged in and navigates to Login', () => {
    const navigation = { navigate: jest.fn() };
    const store = makeStore(initialAppState);
    const { getByText } = renderWithStore(
      <AddNewCustomerCommercialBuyFinalDetails navigation={navigation} />, store
    );

    fireEvent.press(getByText('ADD'));
    expect(getByText('You are not logged in, please login.')).toBeTruthy();

    // Press Login button within modal
    fireEvent.press(getByText('Login'));
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });

  it('adds customer when logged-in and navigates to Contacts', async () => {
    const navigation = { navigate: jest.fn() };
    const loggedInState = {
      ...initialAppState,
      userDetails: { id: 'U1', works_for: 'U1', name: 'Agent' },
    };
    const store = makeStore(loggedInState);
    const { getByText } = renderWithStore(
      <AddNewCustomerCommercialBuyFinalDetails navigation={navigation} />, store
    );

    fireEvent.press(getByText('ADD'));
    // axios.post is mocked to resolve; navigation should go to Contacts when startNavigationPoint is null
    // Using a tick to allow any microtasks to settle
    await Promise.resolve();

    expect(navigation.navigate).toHaveBeenCalledWith('Contacts', { didDbCall: true });
  });

  it('navigates to CustomerListForMeeting when startNavigationPoint is set', async () => {
    const navigation = { navigate: jest.fn() };
    const state = {
      ...initialAppState,
      userDetails: { id: 'U1', works_for: 'U1', name: 'Agent' },
      startNavigationPoint: 'CustomerListForMeeting',
    };
    const store = makeStore(state);
    const { getByText } = renderWithStore(
      <AddNewCustomerCommercialBuyFinalDetails navigation={navigation} />, store
    );

    fireEvent.press(getByText('ADD'));
    await Promise.resolve();
    expect(navigation.navigate).toHaveBeenCalledWith('CustomerListForMeeting');
  });
});
 
