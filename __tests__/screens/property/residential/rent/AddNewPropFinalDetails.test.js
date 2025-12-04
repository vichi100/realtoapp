import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import { ACTION_TYPES } from '../../../../../src/reducers/ActionType';
import AddNewPropFinalDetails from '../../../../../src/screens/property/residential/rent/AddNewPropFinalDetails';

jest.mock('axios');

// Simplify heavy UI deps
jest.mock('../../../../../src/components/Slideshow', () => 'Slideshow');
jest.mock('../../../../../src/components/SnackbarComponent', () => 'Snackbar');
jest.mock('react-native-modal-activityindicator', () => 'ModalActivityIndicator');

const mockStore = configureStore([]);

const buildPropertyDetails = () => ({
  property_details: {
    bhk_type: '2BHK',
    furnishing_status: 'Semi',
    property_size: 1200,
    washroom_numbers: 2,
    lift: 'Yes',
    parking_number: 1,
    parking_type: 'Car',
    floor_number: 3,
    total_floor: 10,
    property_age: '5-10 Years',
  },
  rent_details: {
    expected_rent: 50000,
    expected_deposit: 150000,
    available_from: '2025-01-01',
    preferred_tenants: 'Family',
    non_veg_allowed: 'Yes',
  },
  property_address: {
    flat_number: 'A-1',
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
      propertyType: 'Residential',
      propertyDetails: buildPropertyDetails(),
      residentialPropertyList: [],
      startNavigationPoint: null,
      ...overrides,
    },
  };
  return mockStore(defaultState);
};

const buildNav = () => ({ navigate: jest.fn() });

describe('AddNewPropFinalDetails (Residential Rent)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders summary and ADD button', () => {
    const store = buildStore();
    const navigation = buildNav();

    const { getByText } = render(
      <Provider store={store}>
        <AddNewPropFinalDetails navigation={navigation} />
      </Provider>
    );

    expect(getByText(/Rent In/i)).toBeTruthy();
    expect(getByText('ADD')).toBeTruthy();
    expect(getByText('Owner')).toBeTruthy();
  });

  it('prompts login when user is not logged in', async () => {
    const store = buildStore({ userDetails: null });
    const navigation = buildNav();

    const { getByText } = render(
      <Provider store={store}>
        <AddNewPropFinalDetails navigation={navigation} />
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
      residentialPropertyList: [],
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
        <AddNewPropFinalDetails navigation={navigation} />
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
        expect.objectContaining({ type: ACTION_TYPES.SET_RESIDENTIAL_PROPERTY_LIST }),
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
        <AddNewPropFinalDetails navigation={navigation} />
      </Provider>
    );

    fireEvent.press(getByText('ADD'));

    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('PropertyListForMeeting');
    });
  });
});
