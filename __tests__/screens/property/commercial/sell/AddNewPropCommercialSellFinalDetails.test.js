import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import AddNewPropCommercialSellFinalDetails from '../../../../../src/screens/property/commercial/sell/AddNewPropCommercialSellFinalDetails';
import { ACTION_TYPES } from '../../../../../src/reducers/ActionType';

// Lighten heavy components
jest.mock('../../../../../src/components/Slideshow', () => 'Slideshow');
// Mock ESM-only dependency to avoid transform issues in Jest
jest.mock('react-native-modal-activityindicator', () => 'ModalActivityIndicator');

const mockStore = configureStore([]);

const baseProperty = {
  property_id: 'prop-sell-aaaaaa',
  property_type: 'Commercial',
  property_for: 'Sell',
  image_urls: [{ url: '/images/1.jpg' }],
  property_details: {
    building_type: 'Commercial',
    property_used_for: 'Shop',
    property_size: 1200,
    ideal_for: ['Retail', 'Cafe'],
    power_backup: 'Full',
    parking_type: 'Open',
    property_age: '5-10 Years',
  },
  sell_details: {
    expected_sell_price: 5000000, // 50 Lac
    maintenance_charge: 2000,     // 2 K
    available_from: '2025-02-01',
  },
  property_address: {
    building_name: 'Anant Villa',
    landmark_or_street: 'MG Road',
    location_area: { formatted_address: 'Koregaon Park' },
  },
  owner_details: {
    name: 'Owner Name',
    address: 'Owner Address',
    mobile1: '9999999999',
  },
};

const buildStore = (overrides = {}) =>
  mockStore({
    AppReducer: {
      userDetails: { id: 'agent-1', works_for: 'agent-1', user_type: 'agent' },
      propertyDetails: { ...baseProperty },
      commercialPropertyList: [],
      startNavigationPoint: null,
      ...overrides,
    },
  });

const buildNav = () => ({ navigate: jest.fn() });

describe('AddNewPropCommercialSellFinalDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders summary and details correctly', () => {
    const store = buildStore();
    const navigation = buildNav();

    const { getByText } = render(
      <Provider store={store}>
        <AddNewPropCommercialSellFinalDetails navigation={navigation} />
      </Provider>
    );

    expect(getByText(/Shop For Sell In Anant Villa/i)).toBeTruthy();
    expect(getByText(/MG Road,\s*Koregaon Park/i)).toBeTruthy();

    // Details cards
    expect(getByText('Shop')).toBeTruthy();
    expect(getByText('Prop Type')).toBeTruthy();
    expect(getByText('50 Lac')).toBeTruthy();
    expect(getByText('Sell')).toBeTruthy();
    expect(getByText('2 K')).toBeTruthy();
    expect(getByText('Maintenance')).toBeTruthy();
    expect(getByText('1200sqft')).toBeTruthy();
    expect(getByText('Builtup')).toBeTruthy();

    // Overview labels
    expect(getByText('Details')).toBeTruthy();
    expect(getByText('Building Type')).toBeTruthy();
    expect(getByText('Possession')).toBeTruthy();
    expect(getByText('Ideal For')).toBeTruthy();
    expect(getByText('Power Backup')).toBeTruthy();
    expect(getByText('Parking')).toBeTruthy();
    expect(getByText('Age Of Building')).toBeTruthy();

    // Owner section
    expect(getByText('Owner')).toBeTruthy();
    expect(getByText('Owner Name')).toBeTruthy();
    expect(getByText('Owner Address')).toBeTruthy();
    expect(getByText('+91 9999999999')).toBeTruthy();
  });

  it('prompts login when user is null and navigates to Login', async () => {
    const store = buildStore({ userDetails: null });
    const navigation = buildNav();

    const { getByText } = render(
      <Provider store={store}>
        <AddNewPropCommercialSellFinalDetails navigation={navigation} />
      </Provider>
    );

    fireEvent.press(getByText('ADD'));
    // Modal should appear with this text
    expect(getByText(/You are not logged in, please login/i)).toBeTruthy();

    fireEvent.press(getByText('Login'));
    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('Login');
    });
  });

  it('submits successfully and navigates to Listing when startNavigationPoint is null', async () => {
    axios.mockResolvedValueOnce({
      data: { property_id: 'server-prop-1', image_urls: [{ url: '/images/1.jpg' }] },
    });

    const store = buildStore({ startNavigationPoint: null });
    const navigation = buildNav();

    const { getByText } = render(
      <Provider store={store}>
        <AddNewPropCommercialSellFinalDetails navigation={navigation} />
      </Provider>
    );

    fireEvent.press(getByText('ADD'));

    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('Listing', { didDbCall: true });
    });

    const actions = store.getActions();
    expect(actions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: ACTION_TYPES.SET_PROPERTY_DETAILS, payload: null }),
        expect.objectContaining({ type: ACTION_TYPES.SET_COMMERCIAL_PROPERTY_LIST }),
        expect.objectContaining({ type: ACTION_TYPES.SET_START_NAVIGATION_POINT, payload: null }),
      ])
    );
  });

  it('submits successfully and navigates to PropertyListForMeeting when startNavigationPoint is set', async () => {
    axios.mockResolvedValueOnce({
      data: { property_id: 'server-prop-2', image_urls: [{ url: '/images/1.jpg' }] },
    });

    const store = buildStore({ startNavigationPoint: { from: 'somewhere' } });
    const navigation = buildNav();

    const { getByText } = render(
      <Provider store={store}>
        <AddNewPropCommercialSellFinalDetails navigation={navigation} />
      </Provider>
    );

    fireEvent.press(getByText('ADD'));

    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('PropertyListForMeeting');
    });

    const actions = store.getActions();
    expect(actions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: ACTION_TYPES.SET_PROPERTY_DETAILS, payload: null }),
        expect.objectContaining({ type: ACTION_TYPES.SET_COMMERCIAL_PROPERTY_LIST }),
        expect.objectContaining({ type: ACTION_TYPES.SET_START_NAVIGATION_POINT, payload: null }),
      ])
    );
  });
});
