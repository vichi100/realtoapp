import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import { ACTION_TYPES } from '../../../../../src/reducers/ActionType';
import AddNewPropCommercialRentFinalDetails from '../../../../../src/screens/property/commercial/rent/AddNewPropCommercialRentFinalDetails';

jest.mock('axios');

// Simplify heavy UI deps
jest.mock('../../../../../src/components/Slideshow', () => 'Slideshow');
jest.mock('../../../../../src/components/SnackbarComponent', () => 'Snackbar');
jest.mock('react-native-modal-activityindicator', () => 'ModalActivityIndicator');

const mockStore = configureStore([]);

const buildPropertyDetails = () => ({
  property_details: {
    property_used_for: 'Shop',
    property_size: 1200,
    building_type: 'Commercial',
    ideal_for: ['Retail'],
    power_backup: 'Full',
    parking_type: 'Open',
    property_age: '5-10 Years',
  },
  rent_details: {
    expected_rent: 50000,
    expected_deposit: 150000,
    available_from: '2025-01-01',
  },
  property_address: {
    building_name: 'Anant Villa',
    landmark_or_street: 'MG Road',
    location_area: { formatted_address: 'Koregaon Park' },
  },
  property_for: 'Rent',
  owner_details: {
    name: 'Owner Name',
    address: 'Owner Address',
    mobile1: '9999999999',
  },
  image_urls: [{ url: '/images/1.jpg' }],
});

const buildStore = (overrides = {}) => {
  const defaultState = {
    AppReducer: {
      userDetails: null,
      propertyType: 'Commercial',
      propertyDetails: buildPropertyDetails(),
      commercialPropertyList: [],
      startNavigationPoint: null,
      ...overrides,
    },
  };
  return mockStore(defaultState);
};

const buildNav = () => ({ navigate: jest.fn() });

describe('AddNewPropCommercialRentFinalDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders summary and ADD button', () => {
    const store = buildStore();
    const navigation = buildNav();

    const { getByText } = render(
      <Provider store={store}>
        <AddNewPropCommercialRentFinalDetails navigation={navigation} />
      </Provider>
    );

    expect(getByText(/For Rent In/i)).toBeTruthy();
    expect(getByText('ADD')).toBeTruthy();
    expect(getByText('Owner')).toBeTruthy();
  });

  it('prompts login when user is not logged in', async () => {
    const store = buildStore({ userDetails: null });
    const navigation = buildNav();

    const { getByText } = render(
      <Provider store={store}>
        <AddNewPropCommercialRentFinalDetails navigation={navigation} />
      </Provider>
    );

    fireEvent.press(getByText('ADD'));

    await waitFor(() => {
      expect(getByText('You are not logged in, please login.')).toBeTruthy();
    });

    fireEvent.press(getByText('Login'));
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });

  it('submits property and navigates to Listing when logged in', async () => {
    const store = buildStore({
      userDetails: { works_for: ['agent-1'] },
      commercialPropertyList: [],
      startNavigationPoint: null,
    });
    const navigation = buildNav();

    axios.mockResolvedValueOnce({
      data: {
        ...buildPropertyDetails(),
        image_urls: [{ url: '/images/1.jpg' }],
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <AddNewPropCommercialRentFinalDetails navigation={navigation} />
      </Provider>
    );

    fireEvent.press(getByText('ADD'));

    await waitFor(() => {
      expect(axios).toHaveBeenCalled();
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

  it('navigates to PropertyListForMeeting when startNavigationPoint exists', async () => {
    const store = buildStore({
      userDetails: { works_for: ['agent-1'] },
      startNavigationPoint: { from: 'meeting' },
    });
    const navigation = buildNav();

    axios.mockResolvedValueOnce({ data: { ...buildPropertyDetails(), image_urls: [{ url: '/images/1.jpg' }] } });

    const { getByText } = render(
      <Provider store={store}>
        <AddNewPropCommercialRentFinalDetails navigation={navigation} />
      </Provider>
    );

    fireEvent.press(getByText('ADD'));

    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('PropertyListForMeeting');
    });
  });
});
